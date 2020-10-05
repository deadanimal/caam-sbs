from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

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
        # permission_classes = [AllowAny] # AllowAny IsAuthenticated
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

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
 
 