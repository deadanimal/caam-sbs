import uuid, datetime
from django.contrib.postgres.fields import ArrayField
from django.contrib.gis.db import models

class Dispute(models.Model):

    STATUSES = [
            ('OPEN', 'Open'),
            ('REJECTED', 'Rejected'),
            ('ACCEPTED', 'Accepted'),
            ('PROCESSED', 'Processed'),
            ('CLOSED', 'Closed')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dispute_no = models.CharField(max_length=20, default='NA', blank=True)
    cid = models.CharField(max_length=20, default='NA', blank=True)
    status = models.CharField(max_length=20, choices=STATUSES, default='OPEN')


    created_at = models.DateTimeField(auto_now_add=True)
    due_at = models.DateTimeField(null=True,blank=True)
    created_at_str = models.CharField(max_length=200, default='NA', blank=True, null=True)
    due_at_str = models.CharField(max_length=200, default='NA', blank=True, null=True)

    company_name = models.CharField(max_length=200, default='NA', blank=True)
    remarks = models.TextField(default='NA', blank=True)
    fpl_ids = ArrayField(models.CharField(max_length=200), blank=True)
    assign_to = models.CharField(max_length=200, default='NA', blank=True) # user email

    def  __str__(self):
        return self.dispute_no
    

