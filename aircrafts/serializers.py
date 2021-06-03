from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Aircraft
)

from organisations.serializers import (
    OrganisationSerializer
)

class AircraftSerializer(serializers.ModelSerializer):

    class Meta:
        model = Aircraft
        fields = '__all__'
        read_only_fields = ['id']


class AircraftExtendedSerializer(serializers.ModelSerializer):
    manufacturer = OrganisationSerializer()
    operator = OrganisationSerializer()

    class Meta:
        model = Aircraft
        fields = '__all__'
        read_only_fields = ['id']
    
