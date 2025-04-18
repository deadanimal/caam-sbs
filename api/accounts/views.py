import datetime, pandas, time
from django.db.models import Count, Q, Sum
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin
import os, io
import xlsxwriter
from django.http import JsonResponse, HttpResponse

from weasyprint import HTML, CSS
from django.template.loader import render_to_string


from users.models import CustomUser

from accounts.serializers import (
    StatementSerializer,
    LedgerSerializer
)

from accounts.models import (
    Statements,
    Ledgers
)

class StatementViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Statements.objects.all()
    serializer_class = StatementSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]   


    def get_queryset(self):
        queryset = Statements.objects.all()
        return queryset

    @action(methods=['POST'], detail=False)
    def getfiltered(self, request, *args, **kwargs):
        cid = CustomUser.objects.filter(id=request.data['user_id']).values()[0]['cid_id']
        queryset = Statements.objects.filter(cid=cid).values()
        return Response(queryset)

    @action(methods=['POST', 'GET'], detail=False)
    def export(self, request, *args, **kwargs):
        report = Statements.objects.all().values()
        report_list = [i for i in report]
        export_type = request.data['file_type']

        if export_type == "PDF":
            file_name = 'Statements.pdf'
            css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'
            ctime = datetime.datetime.today().strftime('%Y-%m-%d-%H:%M:%S')
            html_string = render_to_string('statement_list.html', {'report': report, 'ctime':ctime})
            pdf = HTML(string=html_string).write_pdf(stylesheets=[CSS(css_file)])
            response = HttpResponse(pdf, content_type='application/pdf')

        elif export_type == "XLSX":

            output = io.BytesIO()
            file_name = 'statements_list.xlsx'
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



class LedgerViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Ledgers.objects.all()
    serializer_class = LedgerSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]   


    def get_queryset(self):
        queryset = Ledgers.objects.all()
        return queryset

    @action(methods=['POST'], detail=False)
    def updateLedger(self, request, *args, **kwargs):
        # reset ledger
        print(Ledgers.objects.all().delete())
        stmt = Statements.objects.all()
        for i in stmt:
            if i.transaction == "INVOICE":
                credit = i.debit
                debit = i.debit

            if i.transaction == "PAYMENT":
                credit = i.credit
                debit = i.credit

            credit_obj = {
                # "cid":i.cid,
                "company_name":i.company_name,
                "created_at_str": i.created_at_str,
                "transaction": i.transaction,
                "transaction_number": i.transaction,
                "credit": credit,
                "balance": i.balance,
                "account": i.credit_account,
                "code": i.credit_code
            }

            debit_obj = {
                # "cid":i.cid,
                "company_name":i.company_name,
                "created_at_str": i.created_at_str,
                "transaction": i.transaction,
                "transaction_number": i.transaction,
                "debit": debit,
                "balance": i.balance,
                "account": i.debit_account,
                "code": i.debit_code
            }

            ledgerObj = [debit_obj, credit_obj]
            for obj in ledgerObj:
                # can be optimize later ba (bulk serialize, bulk create)
                ledger_serializer = LedgerSerializer(data=obj)
                valid = ledger_serializer.is_valid(raise_exception=True)
                ledger_serializer.save()


        return Response(status.HTTP_200_OK)


    



