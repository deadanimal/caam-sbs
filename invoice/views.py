import os, io
import xlsxwriter
import datetime, pandas, time
from datetime import timezone, datetime, timedelta
from django.db.models import Count, Q, Sum
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django.core.files.storage import default_storage
from weasyprint import HTML, CSS
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
from django.http import JsonResponse, HttpResponse
import pandas
import json
import re

# import settings
from core.settings import BASE_DIR 

from invoice.models import Invoices

from invoice.serializers import (
    InvoiceSerializer
)

from organisations.serializers import (
    OrganisationSerializer
)

from organisations.models import (
    Organisation
)

from operations.models import (
    Fpldata
)

from accounts.models import (
    Statements
)

from accounts.serializers import (
    StatementSerializer
)

from payments.models import Deposits 

def changeFormat(fpl_date):
    fpl_date = re.sub(r'/', '-', fpl_date)
    fpl_date = datetime.strptime(fpl_date, '%Y-%m-%d')
    fpl_date = fpl_date.strftime('%Y-%b')
    return fpl_date
        

class InvoiceViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Invoices.objects.all()
    serializer_class = InvoiceSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]   


    def get_queryset(self):
        queryset = Invoices.objects.all()
        return queryset
    
    # auto call when outstanding page is refreshed
    @action(methods=['GET'], detail=False)
    def check_outstanding(self, request, *args, **kwargs):
        invoice = Invoices.objects.filter(status='UNPAID', invoice_total__gt=0).values()
        for i in invoice:
            gap = datetime.utcnow()-datetime.strptime(i['inv_period'], "%Y-%b")
            print("gap", gap)
            print(type(i['created_at']))
            if gap > timedelta(days=30):
                Invoices.objects.filter(id=i['id']).update(status="OUTSTANDING")
                print("here")
        
        queryset = Invoices.objects.filter(status="OUTSTANDING", invoice_total__gt=0).values()
        serializer_class = InvoiceSerializer(queryset, many=True)
        return Response(serializer_class.data)

        
    

    @action(methods=['POST', 'GET'], detail=False)
    def generate(self, request, *args, **kwargs):
        
        fpl_ids = []
        temp = {}
        init_running_no = Invoices.objects.all().count()
        ctgs = ['DOM', 'INB', 'LOC', 'OUB', 'OVF', 'NA']
        print(f"total_flight_with_cid: {Fpldata.objects.filter(cid__isnull=False).count()}")

        cids = [dict(t) for t in {tuple(d.items()) for d in Fpldata.objects.values('cid').filter(cid__isnull=False)}]

        fpldatas = Fpldata.objects.filter(Q(status='FPL4') & Q(computed=False))
        date_group  = list(set([changeFormat(i.fpl_date) for i in fpldatas]))
        
        print(f"cid_group: {len(cids)}")
        print(f"periods: {date_group}")
        print(f"len_periods: {len(date_group)}")
        
        for c in cids:
            org = Organisation.objects.get(cid=c["cid"])
            fpldatas = Fpldata.objects.filter(Q(cid=c["cid"]) & Q(status='FPL4') & Q(computed=False))
            total_flight = fpldatas.count()
            for period in date_group:
                for i in ctgs:
                    temp[i] = 0
                    for j in fpldatas:
                        if changeFormat(j.fpl_date) == period:
                            if j.ctg == i:
                                temp[i] += round(j.rate * j.dist, 2)

                        fpl_ids.append(j.id)
                
                sub_total = sum(temp.values())
                surcharge = 0

                running_no = init_running_no + 1
                init_running_no = running_no

                created_at_str = datetime.now().strftime("%d/%m/%Y")
                due_at_str = (datetime.now() + timedelta(days=30)).strftime("%d/%m/%Y")

                temp_obj = {
                    "cid":org.cid,
                    "inv_period": period,
                    "created_at_str":created_at_str,
                    "total_flight": total_flight,
                    "due_at_str":due_at_str,
                    "invoice_no": f"{init_running_no+1}/{datetime.now().strftime('Y')}",
                    "company_name": org.name,
                    "company_address": org.address_line_1,
                    "company_email": org.email_1,
                    "office_num": org.office_num,
                    "fax_number": org.fax_number,
                    "domestic_flight": temp['DOM'],
                    "inbound_flight": temp['INB'],
                    "inbound_flight": temp['LOC'],
                    "outbound_flight": temp['OUB'],
                    "over_flight": temp['OVF'],
                    "other_flight": temp['NA'],
                    "subtotal": sub_total,
                    "surcharge": surcharge,
                    "invoice_total": sub_total + surcharge
                }

                serializer = InvoiceSerializer(data=temp_obj)
                valid = serializer.is_valid(raise_exception=True)
                serializer.save()

                # bulk update on fpl_ids
                if valid:
                    for fpl in fpl_ids:
                        Fpldata.objects.filter(id=fpl).update(computed=True)


                # create statement objects

                temp_obj2 = {
                    "cid": org.cid,
                    "company_name": org.name,
                    "created_at_str": created_at_str,
                    "transaction": "INVOICE",
                    "transaction_number": init_running_no+1,
                    "debit": sub_total + surcharge,
                    "credit": 0,
                    "balance": sub_total + surcharge,
                    "credit_code": "3610/000",
                    "credit_account": "ABT URUSNIAGA PERTUKARAN",
                    "debit_code": "8203/000",
                    "debit_account": "ANFC",
                }

                stmt_serializer = StatementSerializer(data=temp_obj2)
                valid = stmt_serializer.is_valid(raise_exception=True)
                stmt_serializer.save()

        deposits = Deposits.objects.filter(amount_receive__gt = 0).values()
        for i in deposits:
            deposit_amount = i['amount_receive']
            invoices = Invoices.objects.exclude(status='PAID').filter(cid=i['company_id'])
            for j in invoices:
                deposit_amount = deposit_amount - j.invoice_total
                
                if deposit_amount >= 0:
                    j.status = 'PAID'
                    j.paid_amount = j.invoice_total
                    j.save()

                elif deposit_amount < 0:
                    j.status = 'PARTIAL'
                    j.paid_amount = abs(deposit_amount)
                    j.save()

            depo = Deposits.objects.get(company_id=i['company_id'])

            deposit_amount =  deposit_amount if deposit_amount >= 0 else 0
            depo.amount_receive = deposit_amount
            depo.updated_at_str = datetime.now().strftime("%d/%m/%Y")
            depo.save()

        return Response(status.HTTP_200_OK)

    @action(methods=['POST', 'GET'], detail=False)
    def downloadpdf(self, request, *args, **kwargs):
        print(request.data)

        invoice_data = Invoices.objects.filter(id = request.data['id']).values()[0]   
        print(invoice_data)

        file_name = "invoice.pdf"
        data_loaded = {}
        css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css' 
        
        flight_type = ["Domestic Flight", "Inbound Flight", "Outbound Flight", "Over Flight", "Others"]
        flight_amount = [invoice_data['domestic_flight'], invoice_data['inbound_flight'], invoice_data['outbound_flight'], invoice_data['over_flight'], invoice_data['other_flight']]
        total_type = ["", "Sub Total", "Invoice Total", "Surcharge Amount", "Invoice Total"]
        first_table = zip(flight_type, flight_amount)

        item = ["" for i in range(3)]
        item[0] = f"Bill for Invoice Period: {invoice_data['inv_period']}"
        amount = [f"Subtotal: {invoice_data['sub_total']}", f"Surcharge: {invoice_data['surchage']}", f"Invoice Total: {invoice_data['invoice_total']}"]
        second_table = zip(item, amount)

        html_string = render_to_string('invoice_en_2.html', {'first_table':first_table, 'second_table':second_table, 'invoice':invoice_data})
        
        css_path = f"{BASE_DIR}/templates/custom.css"
        pdf = HTML(string=html_string).write_pdf(stylesheets=[CSS(css_path)])
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="' + file_name +'"'
        return response

    @action(methods=['GET'], detail=False)
    def aging(self, request, *args, **kwargs):
        invoices = Invoices.objects.filter(Q(status='OUTSTANDING') & Q(invoice_total__gt=0) | Q(status='PARTIAL')).values()
        for i in invoices:
            print(i)
            gap = datetime.now()-datetime.strptime(i['inv_period'], "%Y-%b")

            if gap < timedelta(days=30):
                Invoices.objects.filter(id=i['id']).update(month_0_1=i['invoice_total'])
            
            elif gap > timedelta(days=30) and gap < timedelta(90):
                Invoices.objects.filter(id=i['id']).update(month_0_1=0.0, month_1_3=i['invoice_total'])

            elif gap > timedelta(days=90) and gap < timedelta(180):
                Invoices.objects.filter(id=i['id']).update(month_1_3=0.0, month_4_6=i['invoice_total'])

            elif gap > timedelta(days=180) and gap < timedelta(360):
                Invoices.objects.filter(id=i['id']).update(month_4_6=0.0, month_7_12=i['invoice_total'])

            elif gap > timedelta(days=360) and gap < timedelta(720):
                Invoices.objects.filter(id=i['id']).update(month_7_12=0.0, month_13_36=i['invoice_total'])

            elif gap > timedelta(days=720) and gap < timedelta(2160):
                Invoices.objects.filter(id=i['id']).update(month_13_36=0.0, month_37_72=i['invoice_total'])

            elif gap > timedelta(days=2160):
                Invoices.objects.filter(id=i['id']).update(month_37_72=0.0, month_73=i['invoice_total'])
        

        company_list = list(set([i['company_name'] for i in invoices]))
        cid_list = list(set([i['cid_id'] for i in invoices]))
        print(company_list)
        aging = []
        count = 0

        for company, cid in zip(company_list, cid_list):

            # compute subtotal by age 

            subtotal_month_0_1 = 0
            subtotal_month_1_3 = 0
            subtotal_month_4_6 = 0
            subtotal_month_7_12 = 0
            subtotal_month_13_36 = 0
            subtotal_month_37_72 = 0
            subtotal_month_73 = 0
            subtotal_invoice = 0
            inv_list = []
            
            for i in invoices:
                if i['company_name'] == company:
                    subtotal_month_0_1 += i['month_0_1']
                    subtotal_month_1_3 += i['month_1_3']
                    subtotal_month_4_6 += i['month_4_6'] 
                    subtotal_month_7_12 += i['month_7_12']
                    subtotal_month_13_36 += i['month_13_36']
                    subtotal_month_37_72 += i['month_37_72']
                    subtotal_month_73 += i['month_73']
                    subtotal_invoice += i['invoice_total']
                    inv_list.append(i)


            temp = {
                "company_name": company,
                "cid": cid,
                "subtotal_month_0_1" : subtotal_month_0_1,
                "subtotal_month_1_3" : subtotal_month_1_3,
                "subtotal_month_4_6" : subtotal_month_4_6,
                "subtotal_month_7_12" : subtotal_month_7_12,
                "subtotal_month_13_36" : subtotal_month_13_36,
                "subtotal_month_37_72" : subtotal_month_37_72,
                "subtotal_month_73" : subtotal_month_73,
                "subtotal_invoice" : subtotal_invoice,
                "invoices": inv_list,
            }

            count += 1

            aging.append(temp)

        print(count)
        print(len(aging))
        return Response({'data':aging})

    # insertion
    @action(methods=['POST'], detail=False)
    def insertion(self, request, *args, **kwargs):
        reader = pandas.read_excel("/home/lenovo/Invoice.xlsx")
        inv_periods = pandas.date_range('2019-01-01', datetime.now().strftime("%Y-%m-%d"), freq='MS').strftime("%Y-%b").tolist()
        pool_dict = [i for i in json.loads(reader.to_json(orient='records'))]
        for period in inv_periods:
            for i in pool_dict:
                if datetime.fromtimestamp(i['created_at']/1000).strftime("%Y-%b") == period:
                    try:
                        org = Organisation.objects.get(cid=i['cid'])
                        created_at_str = datetime.fromtimestamp(i['created_at']/1000).strftime("%Y-%m-%d")
                        temp_obj = {
                            "cid":i['cid'],
                            "inv_period": period,
                            "invoice_no": i['invoice_no'],
                            "company_name": org.name,
                            "created_at_str": created_at_str,
                            "status": i['status'].upper(),
                            "company_address": org.address_line_1,
                            "company_email": org.email_1,
                            "office_num": org.office_num,
                            "fax_number": org.fax_number,
                            "subtotal": i['sub_total'],
                            "invoice_total": i['invoice_total']
                        }

                        serializer = InvoiceSerializer(data=temp_obj)
                        valid = serializer.is_valid(raise_exception=True)
                        serializer.save()
                    
                    except Exception as e:
                        print(e)
                        print(i['cid'])
        
        return Response({"tinky winky"})

    @action(methods=['POST'], detail=False)
    def autoPaid(self, request, *args, **kwargs):
        # fetch deposit list
        # treat as payment
        # update invoice
        # update deposit list
        pass

    @action(methods=['POST'], detail=False)
    def getfilteredcid(self, request, *args, **kwargs):
        cid_id = request.data['cid_id']
        queryset = Invoices.objects.filter(cid=cid_id).values()
        serializer_class = InvoiceSerializer(queryset, many=True)
        return Response(serializer_class.data)

    @action(methods=['POST', 'GET'], detail=False)
    def export(self, request, *args, **kwargs):
        report = Invoices.objects.all().values()
        report_list = [i for i in report]
        export_type = request.data['file_type']

        if export_type == "PDF":
            file_name = 'InvoiceList.pdf'
            css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'
            ctime = datetime.today().strftime('%Y-%m-%d-%H:%M:%S')
            html_string = render_to_string('invoice_list.html', {'report': report, 'ctime':ctime})
            pdf = HTML(string=html_string).write_pdf(stylesheets=[CSS(css_file)])
            response = HttpResponse(pdf, content_type='application/pdf')

        elif export_type == "XLSX":

            output = io.BytesIO()
            file_name = 'invoice_list.xlsx'
            workbook = xlsxwriter.Workbook(output)
            worksheet = workbook.add_worksheet('Sheet One')
            
            # get header 
            header = [*report_list[0]]

            first_row = 0
            for h in header:
                col = header.index(h)
                worksheet.write(first_row, col, h)

            row = 1
            for i in report_list:
                for _key, _value in i.items():
                    col = header.index(_key)
                    worksheet.write(row, col, str(_value))
                row+=1

            workbook.close()
            output.seek(0)
             
            response = HttpResponse(
                output,
                content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
        response['Content-Disposition'] = 'attachment; filename="' + file_name +'"'
        return response

