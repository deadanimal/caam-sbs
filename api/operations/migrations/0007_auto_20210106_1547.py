# Generated by Django 2.2.6 on 2021-01-06 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0006_auto_20201220_1948'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fpldata',
            name='fpl_date',
            field=models.TextField(max_length=255),
        ),
    ]
