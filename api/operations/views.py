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
    Charge,
    Callsign,
    Rate,
    Route,
    FileUpload
)

from .serializers import (
    ChargeSerializer,
    ChargeExtendedSerializer,
    CallsignSerializer,
    CallsignExtendedSerializer,
    RateSerializer,
    RouteSerializer,
    RouteExtendedSerializer,
    FileUploadSerializer,
    FileUploadExtendedSerializer
)

class RateViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'lower_weight_limit',
        'upper_weight_limit',
        'rate',
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Rate.objects.all()
        return queryset


class ChargeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Charge.objects.all()
    serializer_class = ChargeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'aircraft',
        'rate', 
        'charge_rate', 
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Charge.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Charge.objects.all()
            else:
                queryset = Charge.objects.filter(company=company.id)
        """
        return queryset    


    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Charge.objects.all()
        serializer_class = ChargeExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data) 


class CallsignViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Callsign.objects.all()
    serializer_class = CallsignSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = Callsign.objects.all()
        return queryset    


    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Callsign.objects.all()
        serializer_class = CallsignExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)
 
 
class RouteViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'location_departure',
        'location_destination',
        'distance',
        'created_at',
        'site'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Route.objects.all()
        return queryset


    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Route.objects.all()
        serializer_class = RouteExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data) 
 
 
class FileUploadViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = FileUpload.objects.all()
    serializer_class = FileUploadSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'data_type',
        'uploaded_by',
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = FileUpload.objects.all()
        return queryset    


    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = FileUpload.objects.all()
        serializer_class = FileUploadExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data) 

