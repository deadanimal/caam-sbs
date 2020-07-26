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
    FileUpload
)

from aircrafts.serializers import (
    AircraftExtendedSerializer
)

from airports.serializers import (
    AirportSerializer
)

from organisations.serializers import (
    OrganisationSerializer
)

from users.serializers import (
    CustomUserSerializer
)

class RateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rate
        fields = '__all__'
        read_only_fields = ['id']


class ChargeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Charge
        fields = '__all__'
        read_only_fields = ['id']


class ChargeExtendedSerializer(serializers.ModelSerializer):
    aircraft = AircraftExtendedSerializer(read_only=True)
    rate = RateSerializer(read_only=True)

    class Meta:
        model = Charge
        fields = '__all__'
        read_only_fields = ['id']


class CallsignSerializer(serializers.ModelSerializer):

    class Meta:
        model = Callsign
        fields = '__all__'
        read_only_fields = ['id']


class CallsignExtendedSerializer(serializers.ModelSerializer):
    cid = OrganisationSerializer(read_only=True)
    aircraft = AircraftExtendedSerializer(read_only=True)

    class Meta:
        model = Callsign
        fields = '__all__'
        read_only_fields = ['id']
    

class RouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route
        fields = '__all__'
        read_only_fields = ['id']
    

class RouteExtendedSerializer(serializers.ModelSerializer):
    location_departure = AirportSerializer(read_only=True)
    location_destination = AirportSerializer(read_only=True)
    
    class Meta:
        model = Route
        fields = '__all__'
        read_only_fields = ['id']
    

class FileUploadSerializer(serializers.ModelSerializer):

    class Meta:
        model = FileUpload
        fields = '__all__'
        read_only_fields = ['id']
    

class FileUploadExtendedSerializer(serializers.ModelSerializer):
    route = RouteExtendedSerializer(read_only=True)
    operator = OrganisationSerializer(read_only=True)
    aircraft = AircraftExtendedSerializer(read_only=True)
    charge = ChargeExtendedSerializer(read_only=True)
    uploaded_by = CustomUserSerializer(read_only=True)

    class Meta:
        model = FileUpload
        fields = '__all__'
        read_only_fields = ['id']
    
