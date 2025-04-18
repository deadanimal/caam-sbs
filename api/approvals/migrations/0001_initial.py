# Generated by Django 2.2.6 on 2020-11-13 02:26

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Approval',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('type', models.CharField(choices=[('RA', 'Rate'), ('AL', 'Airline'), ('CS', 'Callsign'), ('AC', 'Aircraft'), ('AP', 'Airport'), ('RO', 'Route'), ('EX', 'Exemptions'), ('NA', 'Not Available')], default='NA', max_length=2)),
                ('description', models.CharField(default='NA', max_length=100)),
                ('status', models.CharField(choices=[('AP', 'Approve'), ('RE', 'Reject'), ('NA', 'Not Available')], default='NA', max_length=2)),
                ('json_data', models.CharField(default='NA', max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
