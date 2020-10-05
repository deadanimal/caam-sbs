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
    description = models.CharField(max_length=255, default='NA')
    registration_num = models.CharField(max_length=100, default='NA')
    model = models.CharField(max_length=100, default='NA')
    # syarikat yang membuat kapal terbang / helikopter
    manufacturer = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name='aircraft_airline',
        limit_choices_to={
            'organisation_type': 'MN'
        },
        blank=True,
        null=True
    )

    AIRCRAFT_TYPE = [
        ('H', 'Chopper'),
        ('FW', 'Fixed Wing'),
        ('NA', 'Not Available')
    ]
    aircraft_type = models.CharField(max_length=2, choices=AIRCRAFT_TYPE, default='NA')
    
    WEIGHT_CATEGORY = [
        ('L', 'Light'),
        ('M', 'Medium'),
        ('H', 'Heavy'),
        ('NA', 'Not Available')
    ]
    weight_category = models.CharField(max_length=2, choices=WEIGHT_CATEGORY, default='NA')
    weight = models.IntegerField(blank=True, default=0)
    rate = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    # min_weight = models.IntegerField(blank=True, default=0)
    # max_weight = models.IntegerField(blank=True, default=0)

    # pemilik kapal terbang / helikopter
    operator = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name='aircraft_operator',
        limit_choices_to={
            'organisation_type': 'AL'
        },
        blank=True,
        null=True
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['created_at']


    def __str__(self):
        return self.registration_num

