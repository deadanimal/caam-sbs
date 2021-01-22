from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from organisations.models import (
    Organisation
)

from users.models import (
    CustomUser
)

class Airport(models.Model): #

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) #
    aid = models.CharField(max_length=4, default='NA')
    name = models.CharField(max_length=100, default='NA') #
    icao_code = models.CharField(max_length=100, default='NA') #
    iata_code = models.CharField(max_length=100, default='NA') #
    country = models.CharField(max_length=100, default='NA') #
    country_code = models.CharField(max_length=100, default='NA') #

    AIRPORT_CATEGORY = [
        ('D', 'Domestic'),
        ('I', 'International'),
        ('NA', 'Not Available')
    ]
    airport_category = models.CharField(max_length=2, choices=AIRPORT_CATEGORY, default='NA') #
    office_num = models.CharField(max_length=100, default='NA') #
    mobile_num = models.CharField(max_length=100, default='NA') #
    fax_num = models.CharField(max_length=100, default='NA') #

    pic_name = models.CharField(max_length=100, default='NA') #
    pic_num = models.CharField(max_length=11, default='NA') #
    is_active = models.BooleanField(default=True) #

    created_at = models.DateTimeField(auto_now_add=True, null=True) #
    modified_at = models.DateTimeField(auto_now=True, null=True) #

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.name

