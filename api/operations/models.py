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


class Charge(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    aircraft = models.ForeignKey(
        Aircraft,
        on_delete=models.CASCADE,
        related_name='charge_aircraft'
    )
    rate = models.ForeignKey(
        Rate,
        on_delete=models.CASCADE,
        related_name='charge_rate'
    )
    charge_rate = models.FloatField(default=0)
    charge_minimum = models.FloatField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return "{}".format(self.aircraft.name)


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
        ('SC4', 'Sector 4'),
        ('SC5', 'Sector 5'),
        ('ALN', 'ALN'),
        ('ALS', 'ALS'),
        ('NA', 'Not Available')
    ]
    category_type = models.CharField(max_length=3, choices=CATEGORY_TYPE, default='NA') #

    SITE = [
        ('KUL', 'Kuala Lumpur'),
        ('KCH', 'Kuching'),
        ('BKI', 'Kota Kinabalu'),
        ('NA', 'Not Available')
    ]
    site = models.CharField(max_length=3, choices=SITE, default='NA') #

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.name


class FileUpload(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')

    DATA_TYPE = [
        ('TFL', 'TFL'),
        ('VFR', 'VFR'),
        ('NA', 'Not Available')
    ]
    data_type = models.CharField(max_length=3, choices=DATA_TYPE, default='NA')
    data_file_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('data_upload'))
    
    route = models.ForeignKey(
        Route,
        on_delete=models.CASCADE,
        related_name='file_upload_route'
    )
    operator = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name='file_upload_operator',
        limit_choices_to={
            'organisation_type': 'AL'
        }
    )
    aircraft = models.ForeignKey(
        Aircraft,
        on_delete=models.CASCADE,
        related_name='file_upload_aircraft'
    )
    charge = models.ForeignKey(
        Charge,
        on_delete=models.CASCADE,
        related_name='file_upload_charge'
    )
    uploaded_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='file_upload_uploaded_by',
        limit_choices_to={
            'user_type': 'ST'
        }
    )

    FLIGHT_RULE = [
        ('I', 'Instrument'),
        ('V', 'Visual')
    ]
    flight_rule = models.CharField(max_length=1, choices=FLIGHT_RULE, default='I')
    remarks = models.TextField(blank=True, null=True)
    touchdown = models.IntegerField(default=0, blank=True)
    approval_permit_num = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.name

