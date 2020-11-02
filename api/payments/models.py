from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from aircrafts.models import (
    Aircraft
)

from organisations.models import (
    Organisation
)

from users.models import (
    CustomUser
)

from operations.models import (
    FileUpload, 
    Fpldata
)

class Invoice(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    amount = models.IntegerField(default=0, blank=True)
    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        null=True
        # related_name='reminder_operator',
        # limit_choices_to={
        #     'organisation_type': 'AL'
        # }
    )
    STATUS = [
        ('CR', 'Created'),
        ('PD', 'Paid'),

        ('NA', 'Not Available'),
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='NA')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.amount

class InvoiceItem(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    amount = models.IntegerField(default=0, blank=True)
    item = models.ForeignKey(
        Fpldata,
        on_delete=models.CASCADE,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.amount


class Payment(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    invoice = models.ForeignKey(
        Invoice,
        on_delete=models.CASCADE,
        related_name='payment_invoice'
    )
    amount_paid = models.FloatField(default=0, blank=True)
    debit_note = models.FloatField(default=0, blank=True)
    credit_note = models.FloatField(default=0, blank=True)

    PAYMENT_METHOD = [
        ('CH', 'Cheque'),
        ('EF', 'EFT'),
        ('TT', 'Telegraphic Transfer'),
        ('OT', 'Others')
    ]
    payment_method = models.CharField(max_length=2, choices=PAYMENT_METHOD, default='OT')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.invoice


class Receipt(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    payment = models.ForeignKey(
        Payment,
        on_delete=models.CASCADE,
        related_name='receipt_payment'
    )
    uploaded_data = models.ForeignKey(
        FileUpload,
        on_delete=models.CASCADE,
        related_name='receipt_uploaded_data',
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.payment


class Reminder(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.CharField(max_length=255, default='NA', blank=True)
    operator = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name='reminder_operator',
        limit_choices_to={
            'organisation_type': 'AL'
        }
    )
    invoice = models.ForeignKey(
        Invoice,
        on_delete=models.CASCADE,
        related_name='reminder_invoice'
    )
    days = models.IntegerField(default=0, blank=True)

    STATUS = [
        ('PA', 'Paid'),
        ('PE', 'Pending')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='PE')

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return self.operator

