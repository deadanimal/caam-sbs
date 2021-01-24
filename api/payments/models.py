import uuid, datetime

from django.contrib.gis.db import models

from organisations.models import (
    Organisation
)

class Payments(models.Model):
    
    STATUSES = [
        ('APPROVED', 'Approved'),
        ('UNAPPROVED', 'Unapproved'),
    ]


    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cid = models.ForeignKey(Organisation, to_field='cid', on_delete=models.CASCADE, null=True, blank=True)
    online = models.BooleanField()
    company_name = models.CharField(max_length=200, default='NA', blank=True)
    company_id = models.CharField(max_length=200, default='NA', blank=True)
    approved = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)
    code = models.CharField(max_length=200, default='NA', blank=True)
    payment_method = models.CharField(max_length=200, default='NA', blank=True)
    remark = models.TextField(null=True, blank=True, default='No remark for online transaction')
    attachment = models.FileField(null=True, blank=True) #, upload_to=PathAndRename('data_upload'))
    amount_receive = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    summary = models.TextField(default='NA', null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUSES, default='UNAPPROVED')
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.cid
   
