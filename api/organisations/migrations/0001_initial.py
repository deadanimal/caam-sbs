# Generated by Django 2.2.6 on 2020-08-26 02:48

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Organisation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='NA', max_length=100)),
                ('shortname', models.CharField(default='NA', max_length=6)),
                ('cid', models.CharField(default='NA', max_length=4, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('organisation_type', models.CharField(choices=[('AG', 'Agent'), ('AL', 'Airline'), ('MN', 'Manufacturer'), ('OT', 'Others')], default='OT', max_length=2)),
                ('email_1', models.CharField(default='NA', max_length=100)),
                ('email_2', models.CharField(default='NA', max_length=100)),
                ('email_3', models.CharField(default='NA', max_length=100)),
                ('email_4', models.CharField(default='NA', max_length=100)),
                ('office_num', models.CharField(default='NA', max_length=100)),
                ('mobile_num', models.CharField(default='NA', max_length=100)),
                ('fax_number', models.CharField(default='NA', max_length=100)),
                ('pic_name', models.CharField(default='NA', max_length=100)),
                ('pic_num', models.CharField(default='NA', max_length=100)),
                ('address_line_1', models.CharField(default='NA', max_length=200)),
                ('address_line_2', models.CharField(default='NA', max_length=200)),
                ('address_line_3', models.CharField(default='NA', max_length=200)),
                ('postcode', models.CharField(default='NA', max_length=100)),
                ('city', models.CharField(default='NA', max_length=100)),
                ('state', models.CharField(default='NA', max_length=100)),
                ('country', models.CharField(default='NA', max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
