import os
import datetime, pandas, time
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
    

    @action(methods=['POST', 'GET'], detail=False)
    def generate(self, request, *args, **kwargs):
        
        temp = {}
        init_running_no = 6543
        ctgs = ['DOM', 'INB', 'LOC', 'OUB', 'OVF', 'NA']
        print(f"total_flight_with_cid: {Fpldata.objects.filter(cid__isnull=False).count()}")
        cids = [dict(t) for t in {tuple(d.items()) for d in Fpldata.objects.values('cid').filter(cid__isnull=False)}]
        
        # brute force approach - can be optimize later ba
        for c in cids:
            org = Organisation.objects.get(cid=c["cid"])
            fpldatas = Fpldata.objects.filter(cid=c["cid"])
            total_flight = fpldatas.count()
            for i in ctgs:
                temp[i] = 0
                for j in fpldatas:
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

