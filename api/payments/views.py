from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Invoice,
    Payment,
    Receipt,
    Reminder
)

from .serializers import (
    InvoiceSerializer,
    InvoiceExtendedSerializer,
    PaymentSerializer,
    PaymentExtendedSerializer,
    ReceiptSerializer,
    ReceiptExtendedSerializer,
    ReminderSerializer,
    ReminderExtendedSerializer
)

class InvoiceViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'amount',
        'debit_note', 
        'credit_note', 
        'total_amount'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Invoice.objects.all()
        return queryset    


    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Invoice.objects.all()
        serializer_class = InvoiceExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data) 
 
 
class PaymentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'invoice',
        'amount_paid', 
        'debit_note', 
        'credit_note',
        'payment_method'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Payment.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Invoice.objects.all()
            else:
                queryset = Invoice.objects.filter(company=company.id)
        """
        return queryset    
 
    
    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Payment.objects.all()
        serializer_class = PaymentExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data) 

class ReceiptViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Receipt.objects.all()
    serializer_class = ReceiptSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'payment',
        'uploaded_data'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Receipt.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Invoice.objects.all()
            else:
                queryset = Invoice.objects.filter(company=company.id)
        """
        return queryset    
    

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Receipt.objects.all()
        serializer_class = ReceiptExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data) 
 

class ReminderViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'operator',
        'invoice', 
        'days', 
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Reminder.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Invoice.objects.all()
            else:
                queryset = Invoice.objects.filter(company=company.id)
        """
        return queryset    
    

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Reminder.objects.all()
        serializer_class = ReminderExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data) 
 