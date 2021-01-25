import datetime

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from payments.models import (
        Payments,
        Deposits
)

from invoice.models import Invoices

from payments.serializers import (
    PaymentSerializer,
    DepositsSerializer
)

from organisations.models import Organisation

from users.models import CustomUser

from accounts.models import Statements

from accounts.serializers import (
    StatementSerializer
)

class PaymentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Payments.objects.all()
    serializer_class = PaymentSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]   


    def get_queryset(self):
        queryset = Payments.objects.all()
        return queryset

    @action(methods=['POST'], detail=False)
    def getFilteredCID(self, request):
        cid_id = CustomUser.objects.filter(id=request.data['cid']).values()[0]['cid_id']
        queryset = Payments.objects.filter(company_id=cid_id)
        serializer_class = PaymentSerializer(queryset, many=True)
        return Response(serializer_class.data)


    @action(methods=['POST'], detail=False)
    def manual(self, request, *args, **kwargs):
        print(request.data)
        # this boy will deal with attachment
        cid_id = CustomUser.objects.filter(id=request.data['cid']).values()[0]['cid_id']
        orgs = Organisation.objects.filter(cid_id=cid_id)
        print(orgs)
        temp_obj = {
            "online":False,
            "amount_receive":request.data["amount_receive"],
            "remark": request.data["remark"],
            "company_id": cid_id,
            "company_name": orgs.values()[0]['name'],
            "approved":False
        }

        serializer = PaymentSerializer(data=temp_obj)
        test = serializer.is_valid(raise_exception=True)
        print(test)
        serializer.save()

        return Response(status.HTTP_200_OK)
    

    @action(methods=['POST'], detail=False)
    def online(self, request, *args, **kwargs):
        temp_obj = {
            "online":True,
            "amount_receive":request.data["amount_receive"],
            "payment_method":request.data["payment_method"],
            "company_name": request.data["company"],
            "approved":False

        }

        serializer = PaymentSerializer(data=temp_obj)
        print(serializer)
        test = serializer.is_valid(raise_exception=True)
        print(test)
        serializer.save()

        return Response(status.HTTP_200_OK)

    @action(methods=['PATCH'], detail=False)
    def approve(self, request, *args, **kwargs):
        payment_obj = Payments.objects.get(id=request.data['payment_id'])
        payment_obj.approved = True
        payment_obj.status = "APPROVED"
        payment_obj.save()

        print("paymentObj", payment_obj.company_id)
        # update invoice
        invoices = Invoices.objects.exclude(status='PAID').filter(cid=payment_obj.company_id)
        balance = float(payment_obj.amount_receive)
        for i in invoices:
            balance =  balance - float(i.invoice_total)
            
            if balance >= 0:
                # means paid la
                i.status = 'PAID'
                i.paid_amount = i.invoice_total
                i.save()

            else:
                i.status='PARTIAL'
                i.paid_amount = abs(balance)
                i.save()

        if balance >= 0:

            print("MURDA")
            deposit = {
                    'company_name': payment_obj.company_name, 
                    'company_id': payment_obj.company_id,
                    'amount_receive': balance 
            }

            serializer_class = DepositsSerializer(data = deposit)
            valid = serializer_class.is_valid(raise_exception=True)
            if valid:
                serializer_class.save()

        # create statement for payment
        temp_obj2 = {
                "cid": payment_obj.company_id,
                "company_name": payment_obj.company_name,
                "created_at_str": datetime.datetime.now().strftime("%d/%m/%Y"),
                "transaction": "PAYMENT",
                "transaction_number": request.data["payment_id"],
                "debit": 0,
                "credit": payment_obj.amount_receive,
                "balance": payment_obj.amount_receive,
                "credit_code": "3102/000",
                "credit_account": "BANK (TERIMAAN)",
                "debit_code": "3610/000",
                "debit_account": "ABT URUSNIAGA PERTUKARAN",
            }
        print(temp_obj2)

        stmt_serializer = StatementSerializer(data=temp_obj2)
        valid = stmt_serializer.is_valid(raise_exception=True)
        stmt_serializer.save()

        return Response(status.HTTP_200_OK)

    
class DepositsViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Deposits.objects.all()
    serializer_class = DepositsSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]   


    def get_queryset(self):
        queryset = Deposits.objects.all()
        return queryset


