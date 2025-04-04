import uuid, datetime

from django.contrib.gis.db import models

from organisations.models import (
    Organisation
)

class Statements(models.Model):
    TRANSACTIONS = [
        ('INVOICE', 'Invoice'),
        ('PAYMENT', 'Payment'),
        ('FOREX', 'Forex'),
        ('NA', 'Other')
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cid = models.ForeignKey(Organisation, to_field='cid', on_delete=models.CASCADE, null=True)    
    company_name = models.CharField(max_length=200, default='NA', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_at_str = models.CharField(max_length=200, default='NA', blank=True, null=True)
    transaction = models.CharField(max_length=20, choices=TRANSACTIONS, default='NA')
    transaction_number = models.CharField(max_length=200, default='NA', blank=True)
    debit = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    credit = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    credit_code = models.CharField(max_length=200, default='NA', blank=True, null=True)
    debit_code = models.CharField(max_length=200, default='NA', blank=True, null=True)
    credit_account = models.CharField(max_length=200, default='NA', blank=True, null=True)
    debit_account = models.CharField(max_length=200, default='NA', blank=True, null=True)

    class Meta:
        ordering = ['company_name']

    def __str__(self):
        return f"cid: {self.cid} transaction: {self.transaction}"


class Ledgers(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cid = models.ForeignKey(Organisation, to_field='cid', on_delete=models.CASCADE, null=True)    
    company_name = models.CharField(max_length=200, default='NA', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_at_str = models.CharField(max_length=200, default='NA', blank=True, null=True)
    transaction = models.CharField(max_length=20, default='NA')
    transaction_number = models.CharField(max_length=200, default='NA', blank=True)
    debit = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    credit = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    account = models.CharField(max_length=200, default='NA', blank=True, null=True)
    code = models.CharField(max_length=200, default='NA', blank=True, null=True)

    class Meta:
        ordering = ['company_name']

    def __str__(self):
        return f"cid: {self.cid} transaction: {self.transaction}"








