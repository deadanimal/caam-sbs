# Generated by Django 2.2.6 on 2020-11-23 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0007_auto_20201123_2224'),
    ]

    operations = [
        migrations.AddField(
            model_name='payments',
            name='company_name',
            field=models.CharField(blank=True, default='NA', max_length=200),
        ),
    ]
