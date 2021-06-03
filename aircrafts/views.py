from django.shortcuts import render
from rest_framework_extensions.mixins import NestedViewSetMixin
from django.http import HttpResponse
import xlsxwriter
import io
from datetime import datetime as dt

from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status

from django.core.files.storage import default_storage
from weasyprint import HTML, CSS
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
import os

from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    Aircraft
)

from .serializers import (
    AircraftSerializer,
    AircraftExtendedSerializer
)

class AircraftViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Aircraft.objects.all()
    serializer_class = AircraftSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'model', 
        'manufacturer', 
        'aircraft_type',
        'weight_category',
        'weight',
        'operator',
        'is_active',
        'created_at'
    ]

    def get_permissions(self):
        # permission_classes = [IsAuthenticated] # IsAuthenticated IsAuthenticated
        if self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        user = self.request.user
        queryset = Aircraft.objects.all()

        # if user.user_type == 'CL':
        #     queryset = Aircraft.objects.filter(
        #         operator = user.organisation
        #     )
        # elif user.user_type == 'ST':
        #     queryset = Aircraft.objects.all()
        # elif user.user_type == 'AD':
        #     queryset = Aircraft.objects.all()              
        # else:
        #     queryset = Aircraft.objects.none()

        return queryset 
        

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Aircraft.objects.all()
        serializer_class = AircraftExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)
 
    @action(methods=['POST', 'GET'], detail=False)
    def export(self, request, *args, **kwargs):
        
        report = Aircraft.objects.all().values()
        report_list = [i for i in report]
        export_type = request.data['file_type']

        if export_type == "PDF":
            file_name = 'AircraftsList.pdf'
            ctime = dt.today().strftime('%Y-%m-%d-%H:%M:%S')
            css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'
            html_string = render_to_string('aircrafts_en.html', {'report': report, 'ctime':ctime})
            pdf = HTML(string=html_string).write_pdf(stylesheets=[CSS(css_file)])
            response = HttpResponse(pdf, content_type='application/pdf')

        elif export_type == "XLSX":

            output = io.BytesIO()
            file_name = '/home/lenovo/Desktop/AircraftList.xlsx'
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

