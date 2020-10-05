from __future__ import unicode_literals
import json
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.postgres.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from organisations.models import (
    Organisation
)

class CustomUser(AbstractUser):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(blank=True, max_length=255)
    mobile = models.CharField(blank=True, max_length=100)

    position = models.CharField(blank=True, max_length=100)
    department = models.CharField(blank=True, max_length=100)

    # HOD/Finance/Operation/Airport/Airline/SAF
    USER_TYPE = [
        ('HOD', 'Head of Department'),
        ('FIN', 'Finance'),
        ('OPS', 'Operation'),
        ('APT', 'Airport'),
        ('ALN', 'Airline'),
        ('SAF', 'SAF'),
        ('NAV', 'Not Available')
    ]
    user_type = models.CharField(max_length=3, choices=USER_TYPE, default='NAV')

    organisation = models.ForeignKey(
        Organisation, 
        on_delete=models.SET_NULL,
        related_name='user_organisation',
        blank=True,
        null=True
    )

    profile_picture = models.ImageField(null=True, upload_to=PathAndRename('images'))

    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return self.email

