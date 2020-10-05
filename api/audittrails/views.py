from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from django.utils import timezone
import json, os, regex, pandas, csv

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import FileUploadParser, JSONParser
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    AuditTrail
)

from .serializers import (
    AuditTrailSerializer,
    AuditTrailExtendedSerializer
)
 
class AuditTrailViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = AuditTrail.objects.all()
    serializer_class = AuditTrailSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'user_id',
        'class_involve',
        'action_done'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = AuditTrail.objects.all()
        return queryset    


    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = AuditTrail.objects.all()
        serializer_class = AuditTrailExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)
