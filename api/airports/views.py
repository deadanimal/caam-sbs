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
    Airport
)

from .serializers import (
    AirportSerializer
)

class AirportViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'country', 
        'country_code', 
        'airport_category', 
        'pic_name', 
        'is_active',
        'created_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        user = self.request.user
        queryset = Airport.objects.all()

        # if user.user_type == 'CL':
        #     ueryset = Airport.objects.all()
        # elif user.user_type == 'ST':
        #     queryset = Airport.objects.all()
        # elif user.user_type == 'AD':
        #     queryset = Airport.objects.all()              
        # else:
        #     queryset = Airport.objects.none()


        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Aircraft.objects.all()
            else:
                queryset = Aircraft.objects.filter(company=company.id)
        """
        return queryset    
 
 