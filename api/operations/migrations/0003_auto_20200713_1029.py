# Generated by Django 2.2.6 on 2020-07-13 10:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0002_auto_20200713_1018'),
    ]

    operations = [
        migrations.AlterField(
            model_name='callsign',
            name='cid',
            field=models.ForeignKey(limit_choices_to={'organisation_type': 'AL'}, on_delete=django.db.models.deletion.CASCADE, related_name='callsign_organisation', to='organisations.Organisation'),
        ),
    ]
