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

from dispute.serializers import DisputeSerializer

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
        temp_obj = {
            'cid' : request.data['cid'],
            'fpl_ids' : request.data['fpl_ids'],
            'remarks' : request.data['remarks'],
        }

        serializer = DisputeSerializer(data = temp_obj)
        valid = serializer.is_valid(raise_exception = True)
        serializer.save()

        return Response({'msg':'jokes on u madafaka'})

    @action(methods=['POST', 'GET'], detail=False)
    def getFilteredCID(self, request, *args, **kwargs):
        cid = request.data['cid']
        queryset = Dispute.objects.filter(cid=cid) 
        serializer_class = DisputeSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    # filter using assign_to (for ops and airport)
    @action(methods=['POST', 'GET'], detail=False)
    def getFilteredAssignTo(self, request, *args, **kwargs):
        pass

    # show dispute-specific fpl data
    @action(methods=['POST', 'GET'], detail=False)
    def getdisputedfpls(self, request, *args, **kwargs):
        queryset = [Fpldata.objects.filter(id=i).values()[0] for i in request.data['fpl_ids']]
        return Response(queryset)

    # update fpls using id 
    # when ops/apt update the fpls that has error
    @action(methods=['POST', 'GET'], detail=False)
    def updateFpls(self, request, *args, **kwargs):
        # get fpls using ids of of disputed
        pass


     
    

