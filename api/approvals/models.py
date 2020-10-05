from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.contrib.postgres.fields import JSONField
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class Approval(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    TYPES = [
        ('RA', 'Rate'),
        ('AL', 'Airline'),
        ('CS', 'Callsign'),
        ('AC', 'Aircraft'),
        ('AP', 'Airport'),
        ('RO', 'Route'),
        ('EX', 'Exemptions'),
        ('NA', 'Not Available')
    ]
    type = models.CharField(max_length=2, choices=TYPES, default='NA')
    description = models.CharField(max_length=100, default='NA')
    STATUSES = [
        ('AP', 'Approve'),
        ('RE', 'Reject'),
        ('NA', 'Not Available'),
    ]
    status = models.CharField(max_length=2, choices=STATUSES, default='NA')
    json_data = models.CharField(max_length=500, default='NA')

    # created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE) # equal to officer/staff name
    created_at = models.DateTimeField(auto_now_add=True) # equal to submission date
    # modified_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    modified_at = models.DateTimeField(auto_now=True)