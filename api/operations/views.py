from django.shortcuts import render, get_object_or_404
from django.db.models import Count, Q, Sum
from django.db.models.functions import Substr
from django.utils import timezone
import json, os, regex, pandas, csv

from django.core import serializers
from django.http import HttpResponse

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import FileUploadParser, JSONParser
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from aircrafts.models import Aircraft

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
        serializer_class = CallsignSerializer(queryset, many=True)
        #serializer_class = CallsignExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)
 
 
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
        
        queryset = FileUpload.objects.all()
        serializer_class = FileUploadExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data) 

    # to upload the VFR (excel) and TFL (csv) data into database
    @action(methods=['POST'], detail=False)
    def upload(self, request, *args, **kwargs):

        data_type = request.data['data_type']
        data_file_link = request.FILES['data_file_link']
        fileupload_id = request.data['id']

        # to get file extension
        extension = os.path.splitext(str(data_file_link))[1]
        
        # read upload file
        if extension == '.xlsx' or extension == '.xls':
            reader = pandas.read_excel(data_file_link)
        else:
            reader = pandas.read_csv(data_file_link)

        # if VFR, make a readable format
        if data_type == 'VFR':
            response_array = []
            error_data = 0
            total_data = 0
            file_date = ''
            for json_dict in json.loads(reader.to_json(orient='records')):
                # for key,value in json_dict.items(): 
                if json_dict['DATE']:
                    temp_obj = {
                        'fpl_date': json_dict['DATE'],
                        'fpl_no': json_dict['CALLSIGN'],
                        'fr': json_dict['FR'],
                        'aircraft_model': json_dict['TYPE'],
                        'dep': json_dict['DEP'],
                        'dest': json_dict['DEST'],
                        'ctg': json_dict['CTG'],
                        'dist': json_dict['DIST'],
                        'fpl_type': 'VFR',
                        'uploaded_by': request.data['uploaded_by'],
                        'fileupload': fileupload_id,
                        'status': 'FPL0'
                    }
                    response_array.append(temp_obj)

                    serializer = FpldataSerializer(data=temp_obj)
                    total_data += 1
                    # file_date = array_tfl[2][0:8]

                    if serializer.is_valid():
                        serializer.save()
                    else:
                        error_data += 1

        # if TFL, make a readable format
        elif data_type == 'TFL':
            response_array = []
            error_data = 0
            total_data = 0
            file_date = ''
            for json_dict in json.loads(reader.to_json(orient='records')):
                for key,value in json_dict.items():
                    # print("key: {0} | value: {1}".format(key, regex.sub(' +', '|', value)))
                    array_tfl = regex.sub(' +', '|', value).split('|')
                    if (array_tfl[1].isnumeric()):
                        
                        if (array_tfl[4] == 'IS'):

                            error_remark1 = ""
                            error_remark2 = ""

                            rate = 0.00
                            aircraft_exist = Aircraft.objects.filter(model=array_tfl[7]).values()
                            if len(aircraft_exist) > 0:
                                rate =  aircraft_exist[0]['rate']
                            else:
                                error_remark1 = 'Please check the aircraft model.'

                            route_exist = Route.objects.filter(departure=array_tfl[10],destination=array_tfl[13]).values()
                            if len(route_exist) > 0:
                                distance = route_exist[0]['distance']
                            else:
                                error_remark2 = 'Please check the departure and destination.'

                            temp_obj = {
                                'fpl_date': array_tfl[2],
                                'fpl_no': array_tfl[3],
                                'fr': 'I',
                                'aircraft_model': array_tfl[7],
                                'dep': array_tfl[10],
                                'dest': array_tfl[13],
                                'ctg': array_tfl[15],
                                'dist': array_tfl[17],
                                'route': array_tfl[18],
                                'rate': rate,
                                'fpl_type': 'TFL',
                                'uploaded_by': request.data['uploaded_by'],
                                'error_remark': ' '.join((error_remark1, error_remark2)),
                                'fileupload': fileupload_id,
                                'status': 'FPL0'
                            }

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
                                error_remark1 = 'Please check the aircraft model.'

                            route_exist = Route.objects.filter(departure=array_tfl[11],destination=array_tfl[14]).values()
                            if len(route_exist) > 0:
                                distance = route_exist[0]['distance']
                            else:
                                error_remark2 = 'Please check the departure and destination.'

                            temp_obj = {
                                'fpl_date': array_tfl[2],
                                'fpl_no': array_tfl[3],
                                'fr': 'I',
                                'aircraft_model': array_tfl[8],
                                'dep': array_tfl[11],
                                'dest': array_tfl[14],
                                'ctg': array_tfl[16],
                                'dist': array_tfl[18],
                                'route': icao_route,
                                'rate': rate,
                                'fpl_type': 'TFL',
                                'uploaded_by': request.data['uploaded_by'],
                                'error_remark': ' '.join((error_remark1, error_remark2)),
                                'fileupload': fileupload_id,
                                'status': 'FPL0'
                            }

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

                        serializer = FpldataSerializer(data=temp_obj)
                        total_data += 1
                        file_date = array_tfl[2][0:8]

                        if serializer.is_valid():
                            serializer.save()
                        else:
                            print(serializer.errors)
                            error_data += 1

        fileupload = FileUpload.objects.filter(id=fileupload_id)
        fileupload.update(total_data=total_data,file_date=file_date)
        if error_data > 0:
            return Response(status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status.HTTP_200_OK)


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
        queryset = Fpldata.objects.all()
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

        submit_fpldatas = Fpldata.objects.filter(uploaded_by=request.data['uploaded_by'],submitted_at__isnull=True,fileupload_id=request.data['fileupload_id']).values()
        for fpldata in submit_fpldatas:
            fpldata_item = Fpldata.objects.filter(id=fpldata['id'])

            # to find company using callsign (3 front letters)
            callsign = Callsign.objects.filter(callsign__startswith=fpldata['fpl_no'][0:3]).values()
            if len(callsign) > 0:
                fpldata_item.update(cid=callsign[0]['cid_id'])
            else:
                if len(fpldata['error_remark']) > 0:
                    fpldata_item.update(error_remark=' '.join((fpldata['error_remark'], 'Please check callsign.')))
                else:
                    fpldata_item.update(error_remark='Please check callsign.')

            fpldata_item.update(submitted_at=timezone.now(), status='FPL1')

        # change the status of file upload from draft into processing
        fileupload = FileUpload.objects.filter(id=request.data['fileupload_id'])
        fileupload.update(status='FIL1')

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

        response_array = []
        results = Fpldata.objects.values('cid').filter(cid__isnull=False).annotate(total_flight=Count('cid_id'), total_amount=Sum('amount'))
        
        for result in results:
            temp = {
                'cid': result['cid'],
                'total_flight': result['total_flight'],
                'total_amount': result['total_amount'],
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
