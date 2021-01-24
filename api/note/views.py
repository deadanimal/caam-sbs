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

from note.serializers import NoteSerializer
from note.models import Note

class NoteViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]   

    # display all for hod, finance, ops, apt
    def get_queryset(self):
        queryset = Note.objects.all()
        return queryset

    # user specific display for airline
    @action(methods=['POST', 'GET'], detail=False)
    def getFilteredCID(self, request, *args, **kwargs):
        cid = request.data['cid']
        queryset = Note.objects.filter(cid=cid) 
        serializer_class = NoteSerializer(queryset, many=True)
        return Response(serializer_class.data)

    @action(methods=['POST', 'GET'], detail=False)
    def submit(self, request, *args, **kwargs):
        data = request.data

        temp_obj = {
            'amount': data['amount'],
            'remarks': data['remarks'],
            'cid_id': data['cid_id'],
            'note_type': data['note_type']
        }

        serializer_class = NoteSerializer(data = temp_obj)
        valid = serializer_class.is_valid(raise_exception=True) 
        serializer_class.save()
        return Response(status.HTTP_200_OK)
