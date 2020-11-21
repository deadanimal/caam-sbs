import uuid, datetime

from django.contrib.gis.db import models

from organisations.models import (
    Organisation
)

class Payments(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cid = models.ForeignKey(Organisation, to_field='cid', on_delete=models.CASCADE, null=True)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)
    code = models.CharField(max_length=200, default='NA', blank=True)
    remark = models.TextField(null=True, blank=True)
    attachment = models.FileField(null=True, blank=True, upload_to=PathAndRename('data_upload'))
    amount_receive = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    summary = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.cid



#   public id: string;
#   public date: any;
#   public amount: number;
#   public status: string;
#   public summary: number;
#   public remark: string;
#   public paymentmethod: string;
#   public attachment: any;

