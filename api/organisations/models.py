#  -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class Organisation(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    shortname = models.CharField(max_length=6, default='NA')
    cid = models.CharField(max_length=4, default='NA', unique=True)
    is_active = models.BooleanField(default=True)
    
    ORGANISATION_TYPE = [
        ('AG', 'Agent'),
        ('AL', 'Airline'),
        ('MN', 'Manufacturer'),
        ('OT', 'Others')
    ]
    organisation_type = models.CharField(max_length=2, choices=ORGANISATION_TYPE, default='OT')

    email_1 = models.CharField(max_length=100, default='NA')
    email_2 = models.CharField(max_length=100, default='NA')
    email_3 = models.CharField(max_length=100, default='NA')
    email_4 = models.CharField(max_length=100, default='NA')

    office_num = models.CharField(max_length=100, default='NA')
    mobile_num = models.CharField(max_length=100, default='NA')
    fax_number = models.CharField(max_length=100, default='NA')

    pic_name = models.CharField(max_length=100, default='NA')
    pic_num = models.CharField(max_length=100, default='NA')

    address_line_1 = models.CharField(max_length=200, default='NA')
    address_line_2 = models.CharField(max_length=200, default='NA')
    address_line_3 = models.CharField(max_length=200, default='NA')
    postcode = models.CharField(max_length=100, default='NA')
    city = models.CharField(max_length=100, default='NA')
    state = models.CharField(max_length=100, default='NA')
    country = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

