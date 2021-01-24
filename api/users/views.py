from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['user_type'] = user.user_type

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


from django.shortcuts import render
from django.db.models import Q
from django.utils.html import strip_tags

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from django.template import Context, Template
from django.core.mail import send_mail, EmailMultiAlternatives

from users.models import (
    CustomUser
)

from users.serializers import (
    CustomUserSerializer
)

class CustomUserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'position',
        'department',
        'organisation',
        'user_type',
        'is_active',
        'date_joined'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]


    def get_queryset(self):
        queryset = CustomUser.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def getFiltered(self, request, *args, **kwargs):
        queryset = CustomUser.objects.all().exclude(position__exact='')
        print(queryset)
        serializer_class = CustomUserSerializer(queryset, many=True)
        return Response(serializer_class.data)
    
    @action(methods=['GET'], detail=False)
    def getExplicit(self, request, *args, **kwargs):
        queryset = CustomUser.objects.filter(Q(user_type='OPS') | Q(user_type='APT'))
        print(queryset)
        serializer_class = CustomUserSerializer(queryset, many=True)
        return Response(serializer_class.data)

    @action(methods=['POST'], detail=False)
    def notification(self, request, *args, **kwargs):
        print("REQ", request.data)
        token = request.data['token']
        email = request.data['user']['email']
        print(token)

        sub = "CAAM Single Billing System"
        links = "http://localhost:4200/#/change_password/"
        plain_msg =f"You have been registered and eligible to use this software. Attached is your token and links to update your credentials. Thank you"

        t = Template(f"Dear {request.data['user']['username']},<br><br> {plain_msg}<br><br> <b>Registration Token: </b> {token} <br><br> <a clicktracking=off href='http://localhost:4200/#/auth/forgot'>CAAM SBS DASHBOARD</a>")
        c = Context()
        html_message = t.render(c)
        to = [email]

        try:
            send_mail(sub, plain_msg, None, to, html_message=html_message, fail_silently=False)
            return Response(status.HTTP_200_OK)

        except Exception as e:
            print(e) 
            return Response(status.HTTP_400_BAD_REQUEST)


