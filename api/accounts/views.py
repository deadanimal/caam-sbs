import datetime, pandas, time
from django.db.models import Count, Q, Sum
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from accounts.serializers import (
    StatementSerializer
)

from accounts.models import Statements

class StatementViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Statements.objects.all()
    serializer_class = StatementSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]   


    def get_queryset(self):
        queryset = Statements.objects.all()
        return queryset
    



