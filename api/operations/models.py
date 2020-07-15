from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from aircrafts.models import (
    Aircraft
)

from airports.models import (
    Airport
)

from organisations.models import (
    Organisation
)

from users.models import (
    CustomUser
)

class Charge(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) #
    name = models.CharField(max_length=100, default='NA') #
    rate_id = models.CharField(max_length=100, default='NA') #
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, related_name='charge_aircraft') #
    charge_rate = models.FloatField(default=0, blank=True) # Auto gen from calculation table
    charge_min = models.FloatField(default=10, blank=True) # If < 10 akan masuk
 
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.rate_id


class Callsign(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) #
    callsign = models.CharField(max_length=100, default='NA') #
    cid = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name='callsign_organisation',
        limit_choices_to={
            'organisation_type': 'AL'
        }
    )
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, related_name='callsign') #

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.callsign


class Rate(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    lower_weight_limit = models.CharField(max_length=100, default='NA')
    upper_weight_limit = models.CharField(max_length=100, default='NA')
    rate = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.name


class Route(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) #
    name = models.CharField(max_length=100, default='NA') #
    description = models.CharField(max_length=100, default='NA') #
    rtid = models.CharField(max_length=100, default='NA') #
    distance = models.FloatField(default=0, blank=True) #
    
    location_departure = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='route_departure') #
    location_destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='route_destination') #
    total_distance = models.FloatField(default=0, blank=True) #
    
    FLIGHT_TYPE = [
        ('D', 'Domestic'),
        ('I', 'International'),
        ('NA', 'Not Available')
    ]
    flight_type = models.CharField(max_length=2, choices=FLIGHT_TYPE, default='NA') #

    CATEGORY_TYPE = [
        ('SC1', 'Sector 1'),
        ('SC2', 'Sector 2'),
        ('SC3', 'Sector 3'),
        ('NA', 'Not Available')
    ]
    category_type = models.CharField(max_length=3, choices=CATEGORY_TYPE, default='NA') #

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


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

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.name

