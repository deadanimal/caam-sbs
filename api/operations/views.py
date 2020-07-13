from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from operations.models import (
    Callsign,
    Rate,
    Route,
    Upload
)

from operations.serializers import (
    CallsignSerializer,
    RateSerializer,
    RouteSerializer,
    UploadSerializer
)

class CallsignViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Callsign.objects.all()
    serializer_class = CallsignSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'organisation_id',
        'created_date'
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
 
 
class RateViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'lower_weight_limit',
        'upper_weight_limit',
        'rate',
        'created_date'
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
 
 
class RouteViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'location_departure',
        'location_destination',
        'distance',
        'category',
        'created_date'
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
 
 
class UploadViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Upload.objects.all()
    serializer_class = UploadSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'data_type',
        'uploaded_by',
        'created_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Upload.objects.all()
        return queryset    
 
 