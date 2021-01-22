# Generated by Django 2.2.6 on 2021-01-21 01:46

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('note_no', models.CharField(blank=True, default='NA', max_length=20)),
                ('cid', models.CharField(blank=True, default='NA', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('due_at', models.DateTimeField(blank=True, null=True)),
                ('created_at_str', models.CharField(blank=True, default='NA', max_length=200, null=True)),
                ('due_at_str', models.CharField(blank=True, default='NA', max_length=200, null=True)),
                ('company_name', models.CharField(blank=True, default='NA', max_length=200)),
                ('remarks', models.TextField(blank=True, default='NA')),
                ('amount', models.CharField(blank=True, default='NA', max_length=200, null=True)),
            ],
        ),
    ]
