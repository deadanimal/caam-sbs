from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import Q

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from aircrafts.models import (
    Aircraft
)

from airports.models import (
    Airport
)

from organisations.models import (
    Organisation
)

from users.models import (
    CustomUser
)

class Rate(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')
    lower_weight_limit = models.CharField(max_length=100, default='NA')
    upper_weight_limit = models.CharField(max_length=100, default='NA')
    rate = models.CharField(max_length=100, default='NA')

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['name']


    def __str__(self):
        return self.name


class Charge(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    aircraft = models.ForeignKey(
        Aircraft,
        on_delete=models.CASCADE,
        related_name='charge_aircraft'
    )
    rate = models.ForeignKey(
        Rate,
        on_delete=models.CASCADE,
        related_name='charge_rate'
    )
    charge_rate = models.FloatField(default=0)
    charge_minimum = models.FloatField(default=0)

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return "{}".format(self.aircraft.name)


class Callsign(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) #
    callsign = models.CharField(max_length=100, default='NA') #
    cid = models.ForeignKey(
        Organisation,
        to_field='cid',
        on_delete=models.CASCADE,
        null=True
    )
    CALLSIGN_TYPE = [
        ('1', 'ICAO'),
        ('2', 'IATA'),
        ('3', 'CALLSIGN'),
        ('NA', 'Not Available')
    ]
    callsign_type = models.CharField(max_length=2, choices=CALLSIGN_TYPE, default='NA')
    # aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, related_name='callsign') #

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.callsign


class Route(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) #
    description = models.CharField(max_length=100, default='NA') #
    rtid = models.CharField(max_length=100, default='NA') #
    distance = models.FloatField(default=0, blank=True) #
    
    # departure = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='route_departure') #
    # destination = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='route_destination') #
    departure = models.CharField(max_length=50, default='NA')
    destination = models.CharField(max_length=50, default='NA')
    
    FLIGHT_TYPE = [
        ('D', 'Domestic'),
        ('I', 'International'),
        ('NA', 'Not Available')
    ]
    flight_type = models.CharField(max_length=2, choices=FLIGHT_TYPE, default='NA') #

    CATEGORY = [
        ('SC1', 'Sector 1'),
        ('SC2', 'Sector 2'),
        ('SC3', 'Sector 3'),
        ('SC4', 'Sector 4'),
        ('SC5', 'Sector 5'),
        ('ALN', 'ALN'),
        ('ALS', 'ALS'),
        ('NA', 'Not Available')
    ]
    category = models.CharField(max_length=3, choices=CATEGORY, default='NA') #

    SITE = [
        ('KUL', 'Kuala Lumpur'),
        ('KCH', 'Kuching'),
        ('BKI', 'Kota Kinabalu'),
        ('NA', 'Not Available')
    ]
    site = models.CharField(max_length=3, choices=SITE, default='NA') #

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        ordering = ['-created_at']


    # def __str__(self):
    #     return self.name


class FileUpload(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, default='NA')

    DATA_TYPE = [
        ('TFL', 'TFL'),
        ('VFR', 'VFR'),
        ('NA', 'Not Available')
    ]
    data_type = models.CharField(max_length=3, choices=DATA_TYPE, default='NA')
    data_file_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('data_upload'))
    file_date = models.CharField(max_length=8, default='NA')
    total_data = models.IntegerField(default=0)

    STATUSES = [
        ('FIL0', 'Draf'),
        ('FIL1', 'Processing'),
        ('FIL2', 'Checked'),
        ('FIL3', 'Approved')
    ]
    status = models.CharField(max_length=4, choices=STATUSES, default='FIL0')
    
    uploaded_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='file_upload_uploaded_by',
        limit_choices_to=Q(user_type='OPS') | Q(user_type='APT')
    )
    checked_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='file_upload_checked_by',
        limit_choices_to={
            'user_type': 'OPS'
        },
        null=True
    )
    approved_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='file_upload_approved_by',
        limit_choices_to={
            'user_type': 'HOD'
        },
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, null=True)
    checked_at = models.DateTimeField(null=True)
    approved_at = models.DateTimeField(null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class Fpldata(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    invoice_no = models.CharField(max_length=25, default='NA') # invoice number 
    invoice_period = models.CharField(max_length=6, default='NA') # invoice period
    # cid = models.CharField(max_length=5, default='NA')
    cid = models.ForeignKey(
        Organisation,
        to_field='cid',
        on_delete=models.CASCADE,
        null=True
    )

    FPLCATEGORY = [
        ('DOM', 'Domestic Flight'),
        ('INB', 'Inbound Flight'),
        ('LOC', 'Local Flight'),
        ('OUB', 'Outbound Flight'),
        ('OVF', 'Over Flight'),
        ('NA', 'Not Available')
    ]
    ctg = models.CharField(max_length=3, choices=FPLCATEGORY, default='NA')

    FRTYPE = [
        ('I', 'Instrument'),
        ('V', 'Visual'),
        ('Y', 'Combination'),
        ('NA', 'Not Available')
    ]
    fr = models.CharField(max_length=2, choices=FRTYPE, default='NA') # flight rule

    FPLTYPE = [
        ('VFR', 'VFR'),
        ('TFL', 'TFL'),
        ('SCS', 'Addon From PUMA'),
        ('NA', 'Not Available')
    ]
    fpl_type = models.CharField(max_length=3, choices=FPLTYPE, default='NA')

    fpl_date = models.CharField(max_length=20) 
    fpl_no = models.CharField(max_length=10, default='NA') # refer table callsign
    aircraft_model = models.CharField(max_length=10, default='NA') # refer table aircraft
    dep = models.CharField(max_length=10, default='NA') # departure
    dest = models.CharField(max_length=10, default='NA') # destination
    route = models.CharField(max_length=100, default='NA') # route taken
    rate = models.DecimalField(max_digits=3, decimal_places=2, default=0.00) # refer table rate
    dist = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) # formula: dist * rate = amount
    error_remark = models.CharField(max_length=100, blank=True, null=True)
    reason = models.CharField(max_length=300, default="NA")
    remark = models.CharField(max_length=300, default="NA")

    STATUSES = [
        ('FPL0', 'Draf'),
        ('FPL1', 'Processing'),
        ('FPL2', 'Checked'),
        ('FPL3', 'Archived'),
        ('FPL4', 'Approved')
    ]
    status = models.CharField(max_length=4, choices=STATUSES, default='FPL0')

    fileupload = models.ForeignKey(
        FileUpload,
        on_delete=models.CASCADE,
        related_name='file_upload_id',
        null=True
    )

    uploaded_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='fpl_data_uploaded_by',
        limit_choices_to=Q(user_type='OPS') | Q(user_type='APT')
    )
    checked_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='fpl_data_checked_by',
        limit_choices_to={
            'user_type': 'OPS'
        },
        null=True
    )
    archived_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='fpl_data_archived_by',
        limit_choices_to={
            'user_type': 'OPS'
        },
        null=True
    )
    approved_by = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='fpl_data_approved_by',
        limit_choices_to={
            'user_type': 'HOD'
        },
        null=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    submitted_at = models.DateTimeField(null=True)
    checked_at = models.DateTimeField(null=True)
    archived_at = models.DateTimeField(null=True)
    approved_at = models.DateTimeField(null=True)

    # class Meta:
        # ordering = ['fpl_date']

    def __str__(self):
        return self.fpl_no

class FpldataHistory(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='fpl_data_history_user'
    )
    master_data_id = models.ForeignKey(
        Fpldata,
        on_delete=models.CASCADE,
        related_name='fpl_data_history_master_data_id'
    )
    data_changes = models.CharField(max_length=300, default="NA")
    reason = models.CharField(max_length=300, default="NA")
    remark = models.CharField(max_length=300, default="NA")
    
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.data_changes

