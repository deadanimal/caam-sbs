# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class Organisation(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    cid = models.CharField(max_length=4, default='NA')
    
    ORGANISATION_TYPE = [
        ('AL', 'Airline'),
        ('OT', 'Others')
    ]
    organisation_type = models.CharField(max_length=2, choices=ORGANISATION_TYPE, default='OT')
    # i_code = models.CharField(max_length=100, default='NA')
    # iata = models.CharField(max_length=100, default='NA')
    email = models.EmailField(max_length=255, null=True)
    office_num = models.CharField(max_length=12, blank=True)
    mobile_num = models.CharField(max_length=12, blank=True)
    fax_number = models.CharField(max_length=12, blank=True)
    pic_name = models.CharField(max_length=100, blank=True)
    pic_num = models.CharField(max_length=12, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postcode = models.CharField(max_length=5, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']


    def __str__(self):
        return self.name

