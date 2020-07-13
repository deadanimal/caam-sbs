from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from airports.models import (
    Airport
)

from organisations.models import (
    Organisation
)

from users.models import (
    CustomUser
)

class Callsign(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    callsign = models.CharField(max_length=100, default='NA')
    organisation_id = models.ForeignKey(Organisation, on_delete=models.CASCADE, related_name='callsign_organisation')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']


    def __str__(self):
        return self.callsign


class Rate(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    lower_weight_limit = models.CharField(max_length=100, default='NA')
    upper_weight_limit = models.CharField(max_length=100, default='NA')
    rate = models.CharField(max_length=100, default='NA')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']


    def __str__(self):
        return self.name


class Route(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=100, default='NA')
    location_departure = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='route_departure')
    location_destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='route_destination')
    distance = models.IntegerField(default=0)
    
    CATEGORY = [
        ('D', 'Domestic'),
        ('I', 'International'),
        ('NA', 'Not Available')
    ]
    category = models.CharField(max_length=2, choices=CATEGORY, default='NA')
    # cs = models.CharField(max_length=100, default='NA')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']


    def __str__(self):
        return self.name


class Upload(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')

    DATA_TYPE = [
        ('TFL', 'TFL'),
        ('VFR', 'VFR'),
        ('NA', 'Not Available')
    ]
    data_type = models.CharField(max_length=3, choices=DATA_TYPE, default='NA')
    document_url = models.FileField(null=True, blank=True, upload_to=PathAndRename('document'))
    # model = models.CharField()
    # operator = models.CharField()
    uploaded_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='upload_by')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']


    def __str__(self):
        return self.name

