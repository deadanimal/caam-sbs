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

class Aircraft(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    registration_num = models.CharField(max_length=100, default='NA')
    model = models.CharField(max_length=100, default='NA')
    manufacturer = models.CharField(max_length=100, default='NA')
    airline = models.ForeignKey(Organisation, on_delete=models.CASCADE, related_name='aircraft_airline')
    description = models.CharField(max_length=255, default='NA')
    mtow = models.IntegerField(default=0)

    AIRCRAFT_TYPE = [
        ('H', 'Choppper'),
        ('FW', 'Fixed Wing'),
        ('NA', 'Not Available')
    ]
    aircraft_type = models.CharField(max_length=2, choices=AIRCRAFT_TYPE, default='NA')
    
    AIRCRAFT_CATEGORY = [
        ('L', 'Light'),
        ('M', 'Medium'),
        ('H', 'Heavy'),
        ('NA', 'Not Available')
    ]
    aircraft_category = models.CharField(max_length=2, choices=AIRCRAFT_CATEGORY, default='NA')
    rate = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']


    def __str__(self):
        return self.registration_num

