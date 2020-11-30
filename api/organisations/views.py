from django.shortcuts import render
from django.db.models import Q
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template import Context, Template

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from organisations.models import (
    Organisation
)

from organisations.serializers import (
    OrganisationSerializer
)

class OrganisationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'organisation_type',
        'postcode', 
        'city', 
        'state', 
        'country', 
        'is_active'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Organisation.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Organisation.objects.all()
            else:
                queryset = Organisation.objects.filter(company=company.id)
        """
        return queryset    

    @action(methods=['POST'], detail=False)
    def addairline(self, request, *args, **kwargs):

        serializer = OrganisationSerializer(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        
        if valid:
            serializer.save()

            sub = "CAAM Single Billing System"
            plain_msg = 'Youre company have been registered and eligible to use this software, please go to this link for confirmation purpose'
            t = Template(f"{plain_msg} <a clicktracking=off href='https://caam-sbs.pipe.my/#/auth/login'>CAAM SBS DASHBOARD</a>")
            c = Context()
            html_message = t.render(c)
            to = [request.data['email_1']] 

            try:
                send_mail(sub, plain_msg, None, to, html_message=html_message)
                return Response(status=status.HTTP_200_OK, data="succeed")

            except Exception as e:
                return Response(status=status.HTTP_400_BAD_REQUEST, data=str(e))
                
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)
 
 