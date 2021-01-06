from django.shortcuts import render, get_object_or_404
from django.db.models import Count, Q, Sum
from django.db.models.functions import Substr
from django.utils import timezone
import json, os, regex, pandas, csv

from datetime import datetime as dt
from django.core import serializers
from django.http import HttpResponse
import io
import xlsxwriter

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import FileUploadParser, JSONParser
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django.core.files.storage import default_storage
from weasyprint import HTML, CSS
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
import os

from django_filters.rest_framework import DjangoFilterBackend

from aircrafts.models import Aircraft

from datetime import datetime

from .models import (
    Charge,
    Callsign,
    Rate,
    Route,
    FileUpload,
    Fpldata,
    FpldataHistory,
    CustomUser
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
    FileUploadExtendedSerializer,
    FpldataSerializer,
    FpldataHistorySerializer,
    FpldataHistoryExtendedSerializer
)


def change_time_format(str_date, change_to_time=False):
    if change_to_time:
        split_points = [0,4,6,8]
        date = [str_date[i:j] for i,j in zip(split_points, split_points[1:] + [None])][0:3] 
        date = "/".join(date)
        modifier = '%Y-%m-%dT%H:%M:%S'
        date = change_time_modifier(str(date), modifier)
        return date
    else:
        split_points = [0,4,6,8]
        date = [str_date[i:j] for i,j in zip(split_points, split_points[1:] + [None])][0:3] 
        date = "/".join(date)
        return date

def change_time_modifier(str_date, modifier):
    datetime_obj = datetime.strptime(str_date, '%Y/%m/%d')
    datetime_obj = datetime.strftime(datetime_obj, modifier)
    return datetime_obj


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
    
    @action(methods=['POST', 'GET'], detail=False)
    def export(self, request, *args, **kwargs):
        
        report = Rate.objects.all().values()[:50]
        report_list = [i for i in report]
        export_type = request.data['file_type']

        if export_type == "PDF":
            file_name = 'RateList.pdf'
            css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'
            ctime = dt.today().strftime('%Y-%m-%d-%H:%M:%S')
            html_string = render_to_string('rate_en.html', {'report': report, 'ctime':ctime})
            pdf = HTML(string=html_string).write_pdf(stylesheets=[CSS(css_file)])
            response = HttpResponse(pdf, content_type='application/pdf')

        elif export_type == "XLSX":

            output = io.BytesIO()
            file_name = '/home/lenovo/Desktop/RateList.xlsx'
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
        serializer_class = CallsignSerializer(queryset, many=True)
        #serializer_class = CallsignExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)

    @action(methods=['POST', 'GET'], detail=False)
    def export(self, request, *args, **kwargs):
        
        report = Callsign.objects.all().values()[:50]
        report_list = [i for i in report]
        export_type = request.data['file_type']

        if export_type == "PDF":
            file_name = 'CallsignList.pdf'
            css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'
            ctime = dt.today().strftime('%Y-%m-%d-%H:%M:%S')
            html_string = render_to_string('callsign_en.html', {'report': report, 'ctime':ctime})
            pdf = HTML(string=html_string).write_pdf(stylesheets=[CSS(css_file)])
            response = HttpResponse(pdf, content_type='application/pdf')

        elif export_type == "XLSX":

            output = io.BytesIO()
            file_name = '/home/lenovo/Desktop/CallsignList.xlsx'
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
 
class RouteViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'departure',
        'destination',
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

    @action(methods=['POST', 'GET'], detail=False)
    def export(self, request, *args, **kwargs):
        
        report = Route.objects.all().values()[:50]
        report_list = [i for i in report]
        export_type = request.data['file_type']

        if export_type == "PDF":
            file_name = 'RouteList.pdf'
            css_file = 'https://pipeline-project.sgp1.digitaloceanspaces.com/mbpp-elatihan/css/template.css'
            ctime = dt.today().strftime('%Y-%m-%d-%H:%M:%S')
            html_string = render_to_string('route_en.html', {'report': report, 'ctime':ctime})
            pdf = HTML(string=html_string).write_pdf(stylesheets=[CSS(css_file)])
            response = HttpResponse(pdf, content_type='application/pdf')

        elif export_type == "XLSX":

            output = io.BytesIO()
            file_name = '/home/lenovo/Desktop/RouteList.xlsx'
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
 
 
class FileUploadViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    parser_class = (FileUploadParser,)
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
        field_by = self.request.query_params.get('field_by')
        field = self.request.query_params.get('field')

        if field_by and field:
            if field_by == 'name':
                queryset = FileUpload.objects.filter(name__icontains=field).all()
            elif field_by == 'created_at':
                modifier = '%Y-%m-%d'
                date = change_time_modifier(field, modifier)
                queryset = FileUpload.objects.filter(created_at__date=date).all()
            elif field_by == 'file_date':
                modifier = '%Y-%m-%d'
                date = change_time_modifier(field, modifier)
                queryset = FileUpload.objects.filter(file_date_ts__date=date).all()
            elif field_by == 'uploaded_by':
                queryset = FileUpload.objects.filter(uploaded_by__user_type__icontains=field).all()

            serializer_class = FileUploadExtendedSerializer(queryset, many=True)

            return Response(serializer_class.data) 
        else:
            queryset = FileUpload.objects.all()
            serializer_class = FileUploadExtendedSerializer(queryset, many=True)
            
            return Response(serializer_class.data)

    # to upload the VFR (excel) and TFL (csv) data into database
    @action(methods=['POST'], detail=False)
    def upload(self, request, *args, **kwargs):

        data_type = request.data['data_type']
        print(data_type)
        data_file_link = request.FILES['data_file_link']
        print(data_file_link)
        fileupload_id = request.data['id']

        # to get file extension
        extension = os.path.splitext(str(data_file_link))[1]
        
        # read upload file
        if extension == '.xlsx' or extension == '.xls':
            reader = pandas.read_excel(data_file_link)
        else:
            reader = pandas.read_csv(data_file_link)

        # if VFR, make a readable format
        item_saved = 0
        if data_type == 'VFR':
            response_array = []
            error_data = 0
            total_data = 0
            file_date = ''
            loop_count = 0
            pool_dict = [i for i in json.loads(reader.to_json(orient='records')) if i['DATETIME'] is not None]
            for json_dict in pool_dict:
                # print("json dict", json_dict.items())
                # for key,value in json_dict.items(): 
                #     loop_count += 1
                if json_dict['DATETIME']:
                    dt = str(json_dict['DATETIME'])
                    temp_obj = {
                        'fpl_date': change_time_format(dt),
                        'fpl_date_ts': change_time_format(dt, change_to_time=True),
                        'fpl_no': json_dict['CALLSIGN'],
                        # 'fr': json_dict['FR'],
                        'aircraft_model': json_dict['TYPE'],
                        'dep': json_dict['DEP'],
                        'dest': json_dict['DEST'],
                        'ctg': json_dict['CTG'],
                        'dist': json_dict['DIST'],
                        'route': json_dict['ROUTE'],
                        'fpl_type': 'VFR',
                        'uploaded_by': request.data['uploaded_by'],
                        'fileupload': fileupload_id,
                        'status': 'FPL0'
                    }

                    response_array.append(temp_obj)

                    serializer = FpldataSerializer(data=temp_obj)
                    total_data += 1

                    file_date_ts = change_time_format(dt, change_to_time=True)

                    if serializer.is_valid():
                        serializer.save()
                    else:
                        print(serializer.errors)
                        error_data += 1
            
            print("loop count", loop_count)

        # if TFL, make a readable format
        elif data_type == 'TFL':

            response_array = []
            error_data = 0
            total_data = 0
            file_date = ''
            FplObjs = []

            print(reader)
            print("len data: ", len(reader))
            for json_dict in json.loads(reader.to_json(orient='records')):
                for key,value in json_dict.items():
                    # print("key: {0} | value: {1}".format(key, regex.sub(' +', '|', value)))
                    array_tfl = regex.sub(' +', '|', value).split('|')
                    if (array_tfl[1].isnumeric()):
                        
                        if (array_tfl[4] == 'IS'):

                            error_remark = []

                            rate = 0.00
                            aircraft_exist = Aircraft.objects.filter(model=array_tfl[7]).values()
                            if len(aircraft_exist) > 0:
                                rate =  aircraft_exist[0]['rate']
                            else:
                                error_remark.append('PLEASE CHECK THE AIRCRAFT MODEL.')

                            route_exist = Route.objects.filter(departure=array_tfl[10],destination=array_tfl[13]).values()
                            if len(route_exist) > 0:
                                distance = route_exist[0]['distance']
                            else:
                                error_remark.append('PLEASE CHECK THE DEPARTURE AND DESTINATION.')
                            
                            distance = 0
                            for i in route_exist:
                                tt = i['description'].split(" ")
                                for j in tt:
                                    if j == array_tfl[18]:
                                        distance = i['distance']
                            
                            # if no routes in database
                            if distance == 0:
                                error_remark.append('PLEASE CHECK THE ROUTE. CURRENT ROUTE IS NOT IN DATABASE')

                            temp_obj = {
                                'fpl_date': change_time_format(array_tfl[2]),
                                'fpl_date_ts': change_time_format(array_tfl[2], change_to_time=True),
                                'fpl_no': array_tfl[3],
                                'fr': 'I',
                                'aircraft_model': array_tfl[7],
                                'dep': array_tfl[10],
                                'dest': array_tfl[13],
                                'ctg': array_tfl[15],
                                'dist': distance, 
                                'route': array_tfl[18],
                                'rate': rate,
                                'fpl_type': 'TFL',
                                'uploaded_by': request.data['uploaded_by'],
                                'error_remark': ''.join(error_remark),
                                'fileupload': fileupload_id,
                                'status': 'FPL0'
                            }

                            FplObjs.append(Fpldata(
                                fpl_date = change_time_format(array_tfl[2]),
                                fpl_date_ts = change_time_format(array_tfl[2], change_to_time=True),
                                fpl_no = array_tfl[3],
                                fr = 'I',
                                aircraft_model = array_tfl[7],
                                dep = array_tfl[10],
                                dest = array_tfl[13],
                                ctg = array_tfl[15],
                                dist = distance, 
                                route = array_tfl[18],
                                rate = rate,
                                fpl_type = 'TFL',
                                uploaded_by = CustomUser(id=request.data['uploaded_by']),
                                error_remark = ''.join(error_remark),
                                fileupload = FileUpload(id=fileupload_id),
                                status = 'FPL0'

                            ))

                            # test

                            # 'num': array_tfl[1],
                            # 'fpl_date': array_tfl[2],
                            # 'fpl_no': array_tfl[3],
                            # 'ssr': '',
                            # 'fr': array_tfl[4],
                            # 'f': array_tfl[5],
                            # 't': array_tfl[6],
                            # 'aircraft_model': array_tfl[7],
                            # 'rlv': array_tfl[8],
                            # 'plv': array_tfl[9],
                            # 'dep': array_tfl[10],
                            # 'drw': array_tfl[11],
                            # 'off_blow_time': array_tfl[12],
                            # 'dest': array_tfl[13],
                            # 'arw': array_tfl[14],
                            # 'ctg': array_tfl[15],
                            # 'dur': array_tfl[16],
                            # 'dist': array_tfl[17],
                            # 'route': array_tfl[18]

                        else:
                            # to concat array for get icao route
                            error_remark = []

                            temp_array = []
                            for x in range(19, len(array_tfl)):
                                temp_array.append(array_tfl[x])

                            icao_route = ' '.join(temp_array)
                            error_remark1 = "" # to find if the aircraft type/model existed
                            error_remark2 = "" # to find if the departure and destination existed

                            rate = 0.00
                            aircraft_exist = Aircraft.objects.filter(model=array_tfl[8]).values()
                            if len(aircraft_exist) > 0:
                                rate =  aircraft_exist[0]['rate']
                            else:
                                error_remark.append('PLEASE CHECK THE AIRCRAFT MODEL.')

                            route_exist = Route.objects.filter(departure=array_tfl[11],destination=array_tfl[14]).values()
                            if len(route_exist) > 0:
                                distance = route_exist[0]['distance']
                            else:
                                error_remark.append('PLEASE CHECK THE DEPARTURE AND DESTINATION.')
                        
                            un_match = 0
                            distance = 0
                            for i in route_exist:
                                tt = i['description'].split(" ")
                                for j in tt:
                                    if temp_array.count(j) == 0:
                                        un_match += 1

                                if un_match == 0:
                                    distance = i['distance']

                            # if no routes in database
                            if distance == 0:
                                error_remark.append('PLEASE CHECK THE ROUTE. CURRENT ROUTE IS NOT IN DATABASE')

                            temp_obj = {
                                'fpl_date': change_time_format(array_tfl[2]),
                                'fpl_date_ts': change_time_format(array_tfl[2], change_to_time=True),
                                'fpl_no': array_tfl[3],
                                'fr': 'I',
                                'aircraft_model': array_tfl[8],
                                'dep': array_tfl[11],
                                'dest': array_tfl[14],
                                'ctg': array_tfl[16],
                                'dist': distance,
                                'route': icao_route,
                                'rate': rate,
                                'fpl_type': 'TFL',
                                'uploaded_by': request.data['uploaded_by'],
                                'error_remark': ''.join(error_remark),
                                'fileupload': fileupload_id,
                                'status': 'FPL0'
                            }
                            FplObjs.append(Fpldata(
                                fpl_date = change_time_format(array_tfl[2]),
                                fpl_date_ts = change_time_format(array_tfl[2], change_to_time=True),
                                fpl_no = array_tfl[3],
                                fr = 'I',
                                aircraft_model = array_tfl[7],
                                dep = array_tfl[10],
                                dest = array_tfl[13],
                                ctg = array_tfl[15],
                                dist = distance, 
                                route = array_tfl[18],
                                rate = rate,
                                fpl_type = 'TFL',
                                uploaded_by = CustomUser(id=request.data['uploaded_by']),
                                error_remark = ''.join(error_remark),
                                fileupload = FileUpload(id=fileupload_id),
                                status = 'FPL0'

                            ))

                            print(temp_obj)

                            # 'num': array_tfl[1],
                            # 'fpl_date': array_tfl[2],
                            # 'fpl_no': array_tfl[3],
                            # 'ssr': array_tfl[4],
                            # 'fr': array_tfl[5],
                            # 'f': array_tfl[6],
                            # 't': array_tfl[7],
                            # 'aircraft_model': array_tfl[8],
                            # 'rlv': array_tfl[9],
                            # 'plv': array_tfl[10],
                            # 'dep': array_tfl[11],
                            # 'drw': array_tfl[12],
                            # 'off_blow_time': array_tfl[13],
                            # 'dest': array_tfl[14],
                            # 'arw': array_tfl[15],
                            # 'ctg': array_tfl[16],
                            # 'dur': array_tfl[17],
                            # 'dist': array_tfl[18],
                            # 'route': icao_route
                        
                        response_array.append(temp_obj)
                        # print('response_array: ', response_array)

                        ### starts here
                        ### ends here

                        serializer = FpldataSerializer(data=temp_obj)
                        total_data += 1
                        file_date = array_tfl[2][0:8]
                        file_date_ts = change_time_format(array_tfl[2], change_to_time=True)



                        """
                        if serializer.is_valid():
                            serializer.save()
                        else:
                            print(serializer.errors)
                            error_data += 1
                        """

        # to do :
        # bulk create

        print(FplObjs)
        bulkCreate_status = Fpldata.objects.bulk_create(FplObjs)
        #print("bulkCreate", bulkCreate_status)

        fileupload = FileUpload.objects.filter(id=fileupload_id)
        print("fileupload", fileupload)
        print("len",len(fileupload))
        fileupload.update(total_data=total_data,file_date=file_date,file_date_ts=file_date_ts)
        if error_data > 0:
            return Response(status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status.HTTP_200_OK)

    @action(methods=['GET'], detail=False)
    def file_upload_filter(self, request, *args, **kwargs):
        uploaded_by = self.request.query_params.get('uploaded_by')
        print(uploaded_by)
        queryset = FileUpload.objects.filter(uploaded_by_id=uploaded_by).order_by('-created_at').values().first()
        print("Culprit", queryset)

        return Response(queryset)


class FpldataViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Fpldata.objects.all()
    serializer_class = FpldataSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'invoice_no',
        'cid',
        'ctg',
        'dep',
        'dest',
        'fpl_no',
        'uploaded_by',
        'submitted_at',
        'fileupload_id',
        'archived_at'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        # uploaded_by = self.request.query_params.get('uploaded_by')
        # submitted_at = self.request.query_params.get('submitted_at')
        # fileupload_id = self.request.query_params.get('fileupload_id')

        # if submitted_at == '' and uploaded_by != '':
        #     queryset = Fpldata.objects.filter(uploaded_by=uploaded_by,submitted_at__isnull=True)
        # elif uploaded_by != '':
        #     queryset = Fpldata.objects.filter(uploaded_by=uploaded_by)
        # elif uploaded_by != '' and fileupload_id != '':
        #     print("masuk sini")
        #     queryset = Fpldata.objects.filter(uploaded_by=uploaded_by, fileupload=fileupload_id)
        # else:
        #     queryset = Fpldata.objects.all()
        queryset = Fpldata.objects.all().order_by('-created_at')
        return queryset

    # @action(methods=['POST'], detail=False)
    # def data_put(self, request, *args, **kwargs, pk=None):
    #     print("hello")
    #     fpldata = self.get_object()
    #     serializer = FpldataSerializer(fpldata, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=['GET'], detail=False)
    def file_filter(self, request, *args, **kwargs):
        uploaded_by = self.request.query_params.get('uploaded_by')
        print(uploaded_by)
        # submitted_at = self.request.query_params.get('submitted_at')
        fileupload = self.request.query_params.get('fileupload_id')

        if fileupload and uploaded_by:
            queryset = Fpldata.objects.filter(uploaded_by_id=uploaded_by, fileupload_id=fileupload).values()
            total = Fpldata.objects.filter(uploaded_by_id=uploaded_by, fileupload_id=fileupload).count()
        else:
            queryset = Fpldata.objects.all().values()
            total = Fpldata.objects.all().count()

        print("Total : {}".format(total))
        return Response(queryset)

    #  to filter table master data   
    @action(methods=['GET'], detail=False)
    def filter_masterdata(self, request, *args, **kwargs):
        field_by = self.request.query_params.get('field_by')
        field = self.request.query_params.get('field')
        field2 = self.request.query_params.get('field2')

        print(field)
        print(field_by)

        if field_by and field:
            print("ke masuk sini")
            if field_by == 'fpl_no':
                queryset = Fpldata.objects.filter(Q(fpl_no__icontains=field) &(Q(status='FPL3') | Q(status='FPL4'))).all()
            elif field_by == 'fpl_date_ts':
                modifier = '%Y-%m-%d'
                field = change_time_modifier(field, modifier)
                field2 = change_time_modifier(field2, modifier)
                queryset = Fpldata.objects.filter(fpl_date_ts__range=[field,field2]).all()
            elif field_by == 'aircraft_model':
                queryset = Fpldata.objects.filter(Q(aircraft_model__icontains=field) &(Q(status='FPL3') | Q(status='FPL4'))).all()
            elif field_by == 'dept':
                queryset = Fpldata.objects.filter(Q(dep__icontains=field) &(Q(status='FPL3') | Q(status='FPL4'))).all()
            elif field_by == 'dest':
                queryset = Fpldata.objects.filter(Q(dest__icontains=field) & (Q(status='FPL3') | Q(status='FPL4'))).all()
            elif field_by == 'ctg':
                queryset = Fpldata.objects.filter(Q (ctg__icontains=field) &(Q(status='FPL3') | Q(status='FPL4'))).all()

            serializer_class = FpldataSerializer(queryset, many=True)
            return Response(serializer_class.data) 

        elif field_by:
            if field_by == 'all':
                queryset = Fpldata.objects.filter(Q(status='FPL3') | Q(status='FPL4')).all()

            serializer_class = FpldataSerializer(queryset, many=True)
            return Response(serializer_class.data) 

        # elif field_by and field and field2:
        #     if field_by == 'fpl_date_ts':
        #         modifier = '%Y-%m-%d'
        #         date = change_time_modifier(field, modifier)
        #         queryset = Fpldata.objects.filter(fpl_date_ts__range=[field,field2]).all()

        else:
            print("masuk tak")
            queryset = Fpldata.objects.filter(Q(status='FPL3') | Q(status='FPL4')).all()[:50]
            serializer_class = FpldataSerializer(queryset, many=True)
            
            return Response(serializer_class.data) 

    @action(methods=['GET'], detail=False)
    def movement_report(self, request, *args, **kwargs):
        print("user", request.user)
        return Response({})

    def partial_update(self, request, pk=None):
        fpldata = self.get_object()
        serializer = FpldataSerializer(fpldata, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            fpldata_history = {
                'data_changes': json.dumps(request.data),
                'user': self.request.user.id,
                'master_data_id': request.data['id']
            }
            serializer_history = FpldataHistorySerializer(data=fpldata_history)
            if serializer_history.is_valid():
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                print(serializer_history.errors)
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        
        fpldata = Fpldata.objects.filter(id=pk)
        if fpldata:
            fpldata.update(archived_by=self.request.user.id, archived_at=timezone.now())
            return Response(status.HTTP_200_OK)
        else:
            return Response(status.HTTP_400_BAD_REQUEST)

    # to submit the flight plan data after airport or operation upload the VFR / TFL data
    @action(methods=['POST'], detail=False)
    def submit(self, request, *args, **kwargs):

        uploaded_by = request.data['uploaded_by']
        submit_fpldatas = Fpldata.objects.filter(uploaded_by=uploaded_by,submitted_at__isnull=True,fileupload_id=request.data['fileupload_id']).values()
        for fpldata in submit_fpldatas:
            fpldata_item = Fpldata.objects.filter(id=fpldata['id'],status='FPL0')

            # to find company using callsign (3 front letters)
            callsign = Callsign.objects.filter(callsign__startswith=fpldata['fpl_no'][0:3]).values()
            if len(callsign) > 0:
                fpldata_item.update(cid=callsign[0]['cid_id'])
            
            else:
                if len(fpldata['error_remark']) > 0:
                    fpldata_item.update(error_remark=' '.join((fpldata['error_remark'], 'Please check callsign.')))
                else:
                    fpldata_item.update(error_remark='Please check callsign.')

            fpldata_item.update(submitted_at=timezone.now(), status='FPL1', modified_by = uploaded_by)

        # change the status of file upload from draft into processing
        fileupload = FileUpload.objects.filter(id=request.data['fileupload_id'])
        fileupload.update(status='FIL1', modified_by = uploaded_by)

        return Response(status.HTTP_200_OK)

    # to approve the VFR / TFL data 
    @action(methods=['POST'], detail=False)
    def approve(self, request, *args, **kwargs):

        uploaded_by = request.data['uploaded_by']
        fileupload_id=request.data['fileupload_id']
        print("Uploaded by "+ str(uploaded_by))
        print("File by "+ str(fileupload_id)) 

        # approve_fpldatas = Fpldata.objects.filter(uploaded_by=uploaded_by,submitted_at__isnull=False,fileupload_id=request.data['fileupload_id']).values()
        # for fpldata in approve_fpldatas:
        #     print('hello1')
        #     fpldata_item = Fpldata.objects.filter(id=fpldata['id']).filter(status='FPL1')
        #     print('hello')
        #     print(len(fpldata_item))
        #     fpldata_item.update(submitted_at=timezone.now(), status='FPL4', modified_by = uploaded_by, archived_by=uploaded_by, approved_by=uploaded_by )
        

        Fpldata.objects.filter(uploaded_by=uploaded_by,fileupload_id=fileupload_id,status='FPL1').update(submitted_at=timezone.now(), status='FPL4',approved_by=uploaded_by)

        # change the status of file upload from proccessing to into approved
        fileupload = FileUpload.objects.filter(id=request.data['fileupload_id'])
        fileupload.update(status='FIL3', modified_by = uploaded_by,approved_by=uploaded_by )
        print(fileupload)

        return Response(status.HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def check(self, request, *args, **kwargs):

        check_fpldatas = Fpldata.objects.filter(fileupload_id=request.data['fileupload_id']).values()
        for fpldata in check_fpldatas:
            fpldata_item = Fpldata.objects.filter(id=fpldata['id'])
            fpldata_item.update(status='FPL2',checked_by=request.data['checked_by'], checked_at=timezone.now())
        
        file_fpl = FileUpload.objects.filter(id=request.data['fileupload_id']).values()
        file_fpl.update(status='FIL2',checked_by=request.data['checked_by'], checked_at=timezone.now())

        return Response(status.HTTP_200_OK)

    @action(methods=['GET'], detail=False)
    def invoice(self, request, *args, **kwargs):
        # this goes to generate invoice task 
        # use this on invoice app

        response_array = []
        results = Fpldata.objects.values('cid').filter(cid__isnull=False).annotate(total_flight=Count('cid_id'), total_amount=Sum('amount'))
        results2 = Fpldata.objects.filter(cid__isnull=False).all().values()

        for result in results:
            temp = {
                'cid': result['cid'],
                'total_flight': result['total_flight'], # return non-zero
                'total_amount': result['total_amount'], # return zero
            }
            response_array.append(temp)
        
        print(response_array)
        return Response(response_array)


    @action(methods=['GET'], detail=False)
    def single_invoice(self, request, *args, **kwargs):

        cid=self.request.query_params.get('cid') # param

        response_array = []
        results = Fpldata.objects.filter(cid=cid).all().values()
        
        for result in results:
            charge = float(result['rate']) * float(result['dist'])
            temp = {
                'cid': result['cid_id'],
                'charge': charge
            }
            response_array.append(temp)

        return Response(response_array)

    @action(methods=['POST'], detail=False)
    def generate(self, request, *args, **kwargs):

        cid = request.data['cid']
        results = Fpldata.objects.filter(invoice_no='NA', cid=cid).distinct(Substr('fpl_date', 1, 8))
        print(str(results.query))

        return Response(str(results.query))


class FpldataHistoryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = FpldataHistory.objects.all()
    serializer_class = FpldataHistorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'user',
        'master_data_id',
        'data_changes'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = FpldataHistory.objects.all()
        return queryset    


    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = FpldataHistory.objects.all()
        serializer_class = FpldataHistoryExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


    @action(methods=['POST'], detail=False)
    def add_history(self, request, *args, **kwargs):
        user_id = request.data['user_id']
        master_id = request.data['master_data_id']
        remark = request.data['remark']
        reason = request.data['reason']

        user_obj = CustomUser.objects.get(id=user_id)
        master_obj = Fpldata.objects.get(id=master_id)
        
        new_history = FpldataHistory.objects.create(user=user_obj, master_data_id=master_obj, reason = reason, remark=remark)

        return Response(status.HTTP_200_OK)
