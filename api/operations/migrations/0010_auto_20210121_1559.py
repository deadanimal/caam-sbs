# Generated by Django 2.2.6 on 2021-01-21 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0009_auto_20210121_1445'),
    ]

    operations = [
        migrations.AddField(
            model_name='fpldata',
            name='disputed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='fpldata',
            name='staged',
            field=models.BooleanField(default=False),
        ),
    ]
