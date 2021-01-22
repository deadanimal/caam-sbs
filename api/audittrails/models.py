from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import Q

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class AuditTrail(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='audit_trail_user_id'
    )

    class_involve = models.CharField(max_length=100, default='NA')

    ACTIONS = [
        ('CRT', 'Create'),
        ('EDT', 'Edit'),
        ('DLT', 'Delete'),
        ('DWL', 'Download'),
        ('UPL', 'Upload'),
        ('EXP', 'Export'),
        ('PRT', 'Print'),
        ('NA', 'Not Available')
    ]

    action_done = models.CharField(max_length=3, choices=ACTIONS, default='NAN')
    origin_info = models.CharField(max_length=100, default='NA')
    updated_info = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.class_involve
