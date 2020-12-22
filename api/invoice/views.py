import os
import datetime, pandas, time
from datetime import timezone
from django.db.models import Count, Q, Sum
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django.core.files.storage import default_storage
from weasyprint import HTML, CSS
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
from django.http import JsonResponse
import pandas
import json


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

class InvoiceViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Invoices.objects.all()
    serializer_class = InvoiceSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]   


    def get_queryset(self):
        queryset = Invoices.objects.all()
        return queryset
    
    # auto call when outstanding page is refreshed
    @action(methods=['GET'], detail=False)
    def check_outstanding(self, request, *args, **kwargs):
        invoice = Invoices.objects.filter(status='UNPAID', invoice_total__gt=0).values()
        for i in invoice:
            gap = datetime.datetime.utcnow()-datetime.datetime.strptime(i['created_at_str'], "%Y-%m-%d")
            print(type(i['created_at']))
            if gap > datetime.timedelta(days=30):
                Invoices.objects.filter(id=i['id']).update(status="OUTSTANDING")
                print("here")
        
        queryset = Invoices.objects.filter(status="OUTSTANDING", invoice_total__gt=0).values()
        serializer_class = InvoiceSerializer(queryset, many=True)
        return Response(serializer_class.data)

        
    

    @action(methods=['POST', 'GET'], detail=False)
    def generate(self, request, *args, **kwargs):
        
        temp = {}
        init_running_no = 6543
        ctgs = ['DOM', 'INB', 'LOC', 'OUB', 'OVF', 'NA']
        print(f"total_flight_with_cid: {Fpldata.objects.filter(cid__isnull=False).count()}")
        cids = [dict(t) for t in {tuple(d.items()) for d in Fpldata.objects.values('cid').filter(cid__isnull=False)}]

        inv_periods = pandas.date_range('2019-01-01', datetime.datetime.now().strftime("%Y-%m-%d"), freq='MS').strftime("%Y-%b").tolist()
        
        for c in cids:
            org = Organisation.objects.get(cid=c["cid"])
            fpldatas = Fpldata.objects.filter(cid=c["cid"])
            total_flight = fpldatas.count()
            for period in inv_periods:
                for i in ctgs:
                    temp[i] = 0
                    for j in fpldatas:
                        if j.created_at.strftime("%Y-%b") == period:
                            if j.ctg == i:
                                temp[i] += round(j.rate * j.dist, 2)
                
                sub_total = sum(temp.values())
                surcharge = 0

                running_no = init_running_no + 1
                init_running_no = running_no

                created_at_str = datetime.datetime.now().strftime("%d/%m/%Y")
                due_at_str = (datetime.datetime.now() + datetime.timedelta(days=30)).strftime("%d/%m/%Y")

                temp_obj = {
                    "cid":org.cid,
                    "inv_period": period,
                    "created_at_str":created_at_str,
                    "total_flight": total_flight,
                    "due_at_str":due_at_str,
                    "invoice_no": init_running_no+1,
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

        
        return Response(status.HTTP_200_OK)

    @action(methods=['POST', 'GET'], detail=False)
    def downloadpdf(self, request, *args, **kwargs):
        data_loaded = {}
        html_string = render_to_string('invoice_en.html', {'data': data_loaded})
        html = HTML(string=html_string)
        pdf_file = html.write_pdf()
        dirname = os.path.dirname(__file__)
        f = open(os.path.join(dirname, 'mypdf.pdf'), 'wb')
        f.write(pdf_file)

    @action(methods=['GET'], detail=False)
    def aging(self, request, *args, **kwargs):
        invoices = Invoices.objects.filter(status='OUTSTANDING', invoice_total__gt=0).values()
        print(invoices)
        for i in invoices:
            print(i)
            gap = datetime.datetime.now()-datetime.datetime.strptime(i['inv_period'], "%Y-%b")

            if gap < datetime.timedelta(days=30):
                Invoices.objects.filter(id=i['id']).update(month_0_1=i['invoice_total'])
            
            elif gap > datetime.timedelta(days=30) and gap < datetime.timedelta(90):
                Invoices.objects.filter(id=i['id']).update(month_0_1=0.0, month_1_3=i['invoice_total'])

            elif gap > datetime.timedelta(days=90) and gap < datetime.timedelta(180):
                Invoices.objects.filter(id=i['id']).update(month_1_3=0.0, month_4_6=i['invoice_total'])

            elif gap > datetime.timedelta(days=180) and gap < datetime.timedelta(360):
                Invoices.objects.filter(id=i['id']).update(month_4_6=0.0, month_7_12=i['invoice_total'])

            elif gap > datetime.timedelta(days=360) and gap < datetime.timedelta(720):
                Invoices.objects.filter(id=i['id']).update(month_7_12=0.0, month_13_36=i['invoice_total'])

            elif gap > datetime.timedelta(days=720) and gap < datetime.timedelta(2160):
                Invoices.objects.filter(id=i['id']).update(month_13_36=0.0, month_37_72=i['invoice_total'])

            elif gap > datetime.timedelta(days=2160):
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
        reader = pandas.read_excel("/home/lenovo/Desktop/unpaid_invoice.xlsx")
        inv_periods = pandas.date_range('2019-01-01', datetime.datetime.now().strftime("%Y-%m-%d"), freq='MS').strftime("%Y-%b").tolist()
        pool_dict = [i for i in json.loads(reader.to_json(orient='records'))]
        for period in inv_periods:
            for i in pool_dict:
                if datetime.datetime.fromtimestamp(i['created_at']/1000).strftime("%Y-%b") == period:
                    try:
                        org = Organisation.objects.get(cid=i['cid'])
                        created_at_str = datetime.datetime.fromtimestamp(i['created_at']/1000).strftime("%Y-%m-%d")
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
