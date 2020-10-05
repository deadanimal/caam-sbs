from django.shortcuts import render
from django.db.models import Q
import datetime

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Approval
)

from .serializers import (
    ApprovalSerializer
)

class ApprovalViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Approval.objects.all()
    serializer_class = ApprovalSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'type',
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Approval.objects.all()
        return queryset

    @action(methods=['PATCH'], detail=True)
    def approve(self, request, *args, **kwargs):
        approval = self.get_object()
        approval.status = 'AP'
        # approval.approval_by = self.request.user
        # approval.approval_at = datetime.now()
        approval.save()

        serializer = ApprovalSerializer(approval)
        return Response(serializer.data)

    @action(methods=['PATCH'], detail=True)
    def reject(self, request, *args, **kwargs):
        approval = self.get_object()
        approval.status = 'RE'
        # approval.approval_by = self.request.user
        # approval.approval_at = datetime.now()
        approval.save()

        serializer = ApprovalSerializer(approval)
        return Response(serializer.data)