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

class NoteViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]   

    # display all for hod, finance, ops, apt
    def get_queryset(self):
        queryset = Notes.objects.all()
        return queryset

    # user specific display for airline
    @action(methods=['POST', 'GET'], detail=False)
    def getFilteredCID(self, request, *args, **kwargs):
        cid = request.data['cid']
        queryset = Notes.objects.filter(cid=cid) 
        serializer_class = NoteSerializer(queryset, many=True)
        return Response(serializer_class.data)


    
