from __future__ import unicode_literals
import json
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.postgres.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class CustomUser(AbstractUser):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(blank=True, max_length=255)
    email = models.CharField(blank=True, max_length=100)
    mobile_num = models.CharField(blank=True, max_length=100)
    position = models.CharField(blank=True, max_length=100)
    department = models.CharField(blank=True, max_length=100)
    birth_date = models.DateTimeField(null=True)
    age = models.IntegerField(default=0)
    address = models.CharField(blank=True, max_length=255)
    postcode = models.CharField(blank=True, max_length=5)
    city = models.CharField(blank=True, max_length=100)
    state = models.CharField(blank=True, max_length=100)
    country = models.CharField(blank=True, max_length=100)

    USER_TYPE = [
        ('AD', 'Administrator'),
        ('CL', 'Client'),
        ('ST', 'Staff')
    ]
    user_type = models.CharField(max_length=2, choices=USER_TYPE, default='CS')

    GENDER_TYPE = [
        ('FM', 'Female'),
        ('ML', 'Male'),
        ('NA', 'Not Available')
    ]
    gender_type = models.CharField(max_length=2, choices=GENDER_TYPE, default='NA')

    RACE_TYPE = [
        ('CN', 'Chinese'),
        ('ID', 'Indian'),
        ('ML', 'Malay'),
        ('NA', 'Not Available')
    ]
    race_type = models.CharField(max_length=2, choices=RACE_TYPE, default='NA')

    # profile_picture = models.ImageField(null=True, upload_to=PathAndRename('images'))

    class Meta:
        ordering = ['-date_joined']


    def __str__(self):
        return self.email

