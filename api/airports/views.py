from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django.core.files.storage import default_storage
from weasyprint import HTML, CSS
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
from django.http import HttpResponse
import os

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
    
    @action(methods=['POST'], detail=False)
    def downloadpdf(self, request, *args, **kwargs):
        report = Airport.objects.all().values()[:10]
        file_name = 'AirportsList.pdf'
        css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'
        html_string = render_to_string('airport_en.html', {'report': report})
        pdf = HTML(string=html_string).write_pdf(stylesheets=[CSS(css_file)])
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="' + file_name +'"'
        return response

 
 