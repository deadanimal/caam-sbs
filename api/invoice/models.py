import uuid, datetime

from django.contrib.gis.db import models

from organisations.models import (
    Organisation
)

class Invoices(models.Model):

    STATUSES = [
        ('PAID', 'Paid'),
        ('PARTIAL', 'Partially Paid'),
        ('OUTSTANDING', 'Outstanding'),
        ('UNPAID', 'Unpaid')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    invoice_no = models.CharField(max_length=20, default='NA', blank=True)
    company_name = models.CharField(max_length=200, default='NA', blank=True)
    company_address = models.CharField(max_length=200, default='NA', blank=True)
    company_email = models.CharField(max_length=100, default='NA', blank=True)
    office_num = models.CharField(max_length=100, default='NA', blank=True)
    fax_number = models.CharField(max_length=100, default='NA', blank=True)
    
    cid = models.ForeignKey(Organisation, to_field='cid', on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=20, choices=STATUSES, default='UNPAID')
    created_at = models.DateTimeField(auto_now_add=True)
    due_at = models.DateTimeField(default=datetime.datetime.now()+datetime.timedelta(days=30))
    domestic_flight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    inbound_flight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    outbound_flight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    over_flight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    other_flight = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) 
    sub_total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    surchage = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    invoice_total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    class Meta:
        ordering = ['cid__name']

    def __str__(self):
        return self.id





