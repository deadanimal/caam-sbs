import uuid, datetime
from django.contrib.gis.db import models

class Note(models.Model):

    TYPE = [
            ('DEBIT', 'Debit'),
            ('CREDIT', 'Credit'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    note_no = models.CharField(max_length=20, default='NA', blank=True)
    cid_id = models.CharField(max_length=20, default='NA', blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    due_at = models.DateTimeField(null=True,blank=True)
    created_at_str = models.CharField(max_length=200, default='NA', blank=True, null=True)
    due_at_str = models.CharField(max_length=200, default='NA', blank=True, null=True)

    # orgs detail
    company_name = models.CharField(max_length=200, default='NA', blank=True)
    company_address = models.CharField(max_length=200, default='NA', blank=True)
    company_email = models.CharField(max_length=200, default='NA', blank=True)
    company_tel = models.CharField(max_length=200, default='NA', blank=True)
    company_fax = models.CharField(max_length=200, default='NA', blank=True)

    # invoice detail
    invoice_id = models.CharField(max_length=200, default='NA', blank=True)
    invoice_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    invoice_period = models.CharField(max_length=200, default='NA', blank=True)


    remarks = models.TextField(default='NA', blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    note_type = models.CharField(max_length=20, choices=TYPE, default='DEBIT')

    def  __str__(self):
        return self.note_no
    

