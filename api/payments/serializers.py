from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Invoice,
    InvoiceItem,
    Payment,
    Receipt,
    Reminder
)

from aircrafts.serializers import (
    AircraftSerializer
)

from operations.serializers import (
    FileUploadSerializer
)

from organisations.serializers import (
    OrganisationSerializer
)

class InvoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invoice
        fields = '__all__'
        read_only_fields = ['id']

class InvoiceItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = InvoiceItem
        fields = '__all__'
        read_only_fields = ['id']


class InvoiceExtendedSerializer(serializers.ModelSerializer):
    #uploaded_data = FileUploadSerializer(read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'
        read_only_fields = ['id']


class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['id']

class PaymentExtendedSerializer(serializers.ModelSerializer):
    invoice = InvoiceExtendedSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['id']


class ReceiptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Receipt
        fields = '__all__'
        read_only_fields = ['id']


class ReceiptExtendedSerializer(serializers.ModelSerializer):
    payment = PaymentExtendedSerializer(read_only=True)
    uploaded_data = FileUploadSerializer(read_only=True)

    class Meta:
        model = Receipt
        fields = '__all__'
        read_only_fields = ['id']


class ReminderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reminder
        fields = '__all__'
        read_only_fields = ['id']


class ReminderExtendedSerializer(serializers.ModelSerializer):
    operator = OrganisationSerializer(read_only=True)
    invoice = InvoiceExtendedSerializer(read_only=True)
    
    class Meta:
        model = Reminder
        fields = '__all__'
        read_only_fields = ['id']