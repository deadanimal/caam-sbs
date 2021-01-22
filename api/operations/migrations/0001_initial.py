# Generated by Django 2.2.6 on 2020-11-12 08:25

import core.helpers
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Callsign',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('callsign', models.CharField(default='NA', max_length=100)),
                ('callsign_type', models.CharField(choices=[('1', 'ICAO'), ('2', 'IATA'), ('3', 'CALLSIGN'), ('NA', 'Not Available')], default='NA', max_length=2)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Charge',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('charge_rate', models.FloatField(default=0)),
                ('charge_minimum', models.FloatField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='FileUpload',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='NA', max_length=100)),
                ('data_type', models.CharField(choices=[('TFL', 'TFL'), ('VFR', 'VFR'), ('NA', 'Not Available')], default='NA', max_length=3)),
                ('data_file_link', models.FileField(blank=True, null=True, upload_to=core.helpers.PathAndRename('data_upload'))),
                ('file_date', models.CharField(default='NA', max_length=8)),
                ('total_data', models.IntegerField(default=0)),
                ('status', models.CharField(choices=[('FIL0', 'Draf'), ('FIL1', 'Processing'), ('FIL2', 'Checked'), ('FIL3', 'Approved')], default='FIL0', max_length=4)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
                ('checked_at', models.DateTimeField(null=True)),
                ('approved_at', models.DateTimeField(null=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Fpldata',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('invoice_no', models.CharField(default='NA', max_length=25)),
                ('invoice_period', models.CharField(default='NA', max_length=6)),
                ('ctg', models.CharField(choices=[('DOM', 'Domestic Flight'), ('INB', 'Inbound Flight'), ('LOC', 'Local Flight'), ('OUB', 'Outbound Flight'), ('OVF', 'Over Flight'), ('NA', 'Not Available')], default='NA', max_length=3)),
                ('fr', models.CharField(choices=[('I', 'Instrument'), ('V', 'Visual'), ('Y', 'Combination'), ('NA', 'Not Available')], default='NA', max_length=2)),
                ('fpl_type', models.CharField(choices=[('VFR', 'VFR'), ('TFL', 'TFL'), ('SCS', 'Addon From PUMA'), ('NA', 'Not Available')], default='NA', max_length=3)),
                ('fpl_date', models.CharField(max_length=20)),
                ('fpl_no', models.CharField(default='NA', max_length=10)),
                ('aircraft_model', models.CharField(default='NA', max_length=10)),
                ('dep', models.CharField(default='NA', max_length=10)),
                ('dest', models.CharField(default='NA', max_length=10)),
                ('route', models.CharField(default='NA', max_length=100)),
                ('rate', models.DecimalField(decimal_places=2, default=0.0, max_digits=3)),
                ('dist', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('error_remark', models.CharField(blank=True, max_length=100, null=True)),
                ('reason', models.CharField(default='NA', max_length=300)),
                ('remark', models.CharField(default='NA', max_length=300)),
                ('status', models.CharField(choices=[('FPL0', 'Draf'), ('FPL1', 'Processing'), ('FPL2', 'Checked'), ('FPL3', 'Archived'), ('FPL4', 'Approved')], default='FPL0', max_length=4)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('submitted_at', models.DateTimeField(null=True)),
                ('checked_at', models.DateTimeField(null=True)),
                ('archived_at', models.DateTimeField(null=True)),
                ('approved_at', models.DateTimeField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Rate',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='NA', max_length=100)),
                ('lower_weight_limit', models.CharField(default='NA', max_length=100)),
                ('upper_weight_limit', models.CharField(default='NA', max_length=100)),
                ('rate', models.CharField(default='NA', max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('description', models.CharField(default='NA', max_length=100)),
                ('rtid', models.CharField(default='NA', max_length=100)),
                ('distance', models.FloatField(blank=True, default=0)),
                ('departure', models.CharField(default='NA', max_length=50)),
                ('destination', models.CharField(default='NA', max_length=50)),
                ('flight_type', models.CharField(choices=[('D', 'Domestic'), ('I', 'International'), ('NA', 'Not Available')], default='NA', max_length=2)),
                ('category', models.CharField(choices=[('SC1', 'Sector 1'), ('SC2', 'Sector 2'), ('SC3', 'Sector 3'), ('SC4', 'Sector 4'), ('SC5', 'Sector 5'), ('ALN', 'ALN'), ('ALS', 'ALS'), ('NA', 'Not Available')], default='NA', max_length=3)),
                ('site', models.CharField(choices=[('KUL', 'Kuala Lumpur'), ('KCH', 'Kuching'), ('BKI', 'Kota Kinabalu'), ('NA', 'Not Available')], default='NA', max_length=3)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('modified_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='FpldataHistory',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('data_changes', models.CharField(default='NA', max_length=300)),
                ('reason', models.CharField(default='NA', max_length=300)),
                ('remark', models.CharField(default='NA', max_length=300)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('master_data_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fpl_data_history_master_data_id', to='operations.Fpldata')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
