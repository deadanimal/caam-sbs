import os
import datetime, pandas, time
from datetime import timezone
from django.db.models import Count, Q, Sum
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django.core.files.storage import default_storage
from weasyprint import HTML, CSS
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
from django.http import JsonResponse, HttpResponse
import pandas
import json

# import settings
from core.settings import BASE_DIR 

from dispute.models import (
   Dispute 
)

from operations.models import (
   Fpldata
)

from users.models import CustomUser
from organisations.models import Organisation

from dispute.serializers import DisputeSerializer
from note.serializers import NoteSerializer

class DisputeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Dispute.objects.all()
    serializer_class = DisputeSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]   

    def get_queryset(self):
        queryset = Dispute.objects.all()
        return queryset

    @action(methods=['POST', 'GET'], detail=False)
    def reject(self, request, *args, **kwargs):
        queryset = Dispute.objects.filter(id=request.data['id'])
        queryset.update(status = "REJECTED")
        return Response(status.HTTP_200_OK)


    @action(methods=['POST', 'GET'], detail=False)
    def submit(self, request, *args, **kwargs):

        init_running_no = 1000
        running_no = init_running_no + 1
        init_running_no = running_no

        orgs = Organisation.objects.filter(cid_id=request.data['cid'])
        temp_obj = {
            "company_name": orgs.values()[0]['name'],
            "created_at_str": datetime.datetime.now().strftime("%d/%m/%Y"),
            'cid' : request.data['cid'],
            'fpl_ids' : request.data['fpl_ids'],
            'remarks' : request.data['remarks'],
            'dispute_no': init_running_no + 1
        }

        serializer = DisputeSerializer(data = temp_obj)
        valid = serializer.is_valid(raise_exception = True)
        serializer.save()

        return Response({'msg':'jokes on u madafaka'})

    @action(methods=['POST', 'GET'], detail=False)
    def getFilteredCID(self, request, *args, **kwargs):
        cid_id = CustomUser.objects.filter(id=request.data['id']).values()[0]['cid_id']
        queryset = Dispute.objects.filter(cid=cid_id) 
        serializer_class = DisputeSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    @action(methods=['POST', 'GET'], detail=False)
    def getdisputedfpls(self, request, *args, **kwargs):
        queryset = [Fpldata.objects.filter(id=i).values()[0] for i in request.data['fpl_ids']]
        return Response(queryset)

    @action(methods=['POST', 'GET'], detail=False)
    def getdisputedfpls_2(self, request, *args, **kwargs):
        queryset = [Fpldata.objects.filter(id=i).values()[0] for i in request.data['arch_ids']]
        return Response(queryset)
    
    @action(methods=['POST', 'GET'], detail=False)
    def assignDispute(self, request, *args, **kwargs):
        queryset = Dispute.objects.filter(id = request.data['id'])
        queryset.update(assign_to = request.data['user'], status = "PROCESSED")
        return Response(status.HTTP_200_OK)

    @action(methods=['POST', 'GET'], detail=False)
    def archive(self, request, *args, **kwargs):
        id_to_archieve = request.data['fpl_id']

        dispute = Dispute.objects.filter(id=request.data['dispute_id']) 

        # fpl_ids
        fpl_list = dispute.values()[0]['fpl_ids']
        fpl_list.remove(id_to_archieve)

        # archive_list
        arch_list = dispute.values()[0]['arch_ids']

        if arch_list is None:
            arch_list = [id_to_archieve]
        else:
            arch_list.append(id_to_archieve)

        dispute.update(fpl_ids = fpl_list, arch_ids = arch_list)
        return Response(dispute.values()[0])


    @action(methods=['POST', 'GET'], detail=False)
    def getfilter(self, request, *args, **kwargs):
        utype = request.data['type']
        queryset = []
        if utype == 'ops':
            queryset = Dispute.objects.filter(assign_to = request.data['email'])
    
        elif utype == 'aln':
            queryset = Dispute.objects.filter(cid = request.data['cid'])
        
        serializer_class = DisputeSerializer(queryset, many = True)
        return Response(serializer_class.data)

    @action(methods=['POST', 'GET'], detail=False)
    def createnote(self, request, *args, **kwargs):

        dispute = Dispute.objects.filter(id=request.data['id']).values()[0]
        queryset = [Fpldata.objects.filter(id=i).values()[0] for i in dispute['arch_ids']]
        total_amt = sum([i['amount'] for i in queryset])
        
        # create debit
        debit_cid = queryset[0]['cid_id']
        org = Organisation.objects.get(cid=debit_cid)
        debit = {
                    "cid_id": debit_cid, 
                    "created_at_str": datetime.datetime.now().strftime("%d/%m/%Y"),
                    "company_name": org.name,
                    "note_type": 'DEBIT'
                }

        serializer_class = NoteSerializer(data = debit)
        valid = serializer_class.is_valid(raise_exception=True)
        serializer_class.save()
        
        # create credit
        credit_cid = dispute['cid']
        org = Organisation.objects.get(cid=credit_cid)
        credit = {
                    "cid_id": credit_cid,
                    "created_at_str": datetime.datetime.now().strftime("%d/%m/%Y"),
                    "company_name": org.name,
                    "note_type": 'CREDIT'
                }

        serializer_class = NoteSerializer(data = credit)
        valid = serializer_class.is_valid(raise_exception=True)
        serializer_class.save()
        return Response(status.HTTP_200_OK)

