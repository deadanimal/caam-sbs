from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Charge,
    Callsign,
    Rate,
    Route,
    Upload
)

class ChargeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Charge
        fields = '__all__'
        read_only_fields = ['id']

class CallsignSerializer(serializers.ModelSerializer):

    class Meta:
        model = Callsign
        fields = '__all__'
        read_only_fields = ['id']
    

class RateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rate
        fields = '__all__'
        read_only_fields = ['id']
    

class RouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route
        fields = '__all__'
        read_only_fields = ['id']
    

class UploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Upload
        fields = '__all__'
        read_only_fields = ['id']
    
