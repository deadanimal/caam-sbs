import datetime, pandas, time
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

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


    @action(methods=['POST','GET'], detail=False)
    def generate(self, request, *args, **kwargs):
        
        # params
        init_running_no = 6543
        temp = {}
        ctgs = ['DOM', 'INB', 'LOC', 'OUB', 'OVF', 'NA']

        orgs = Organisation.objects.all()[:10]
        for org in orgs:
            fpldatas = Fpldata.objects.all()
            for i in ctgs:
                temp[i] = 0

            # Main Logic
            # for fpldata in fpldatas:
            #     for i in ctgs:
            #         temp[i]=0
            #         if fpldata.ctg == i:
            #             temp[i] += round(fpldata.rate * fpldata.dist, 2) # figure out unit 
        
            sub_total = sum(temp.values())
            surcharge = 0

            # created_at = int(time.time())
            # due_at = created_at + 30*(86400)
            # print(f"created_at: {datetime.datetime.fromtimestamp(created_at)}, due_at: {datetime.datetime.fromtimestamp(due_at)}")    
        
            running_no = init_running_no + 1
            init_running_no = running_no

            temp_obj = {
                "cid":org.cid,
                # "created_at":datetime.datetime.fromtimestamp(created_at),
                # "due_at":datetime.datetime.fromtimestamp(due_at),
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

            print(temp_obj)
            serializer = InvoiceSerializer(data=temp_obj)
            valid = serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(status.HTTP_200_OK)

