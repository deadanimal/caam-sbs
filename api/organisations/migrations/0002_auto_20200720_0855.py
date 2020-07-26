# Generated by Django 2.2.6 on 2020-07-20 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organisations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='organisation',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='organisation',
            name='organisation_type',
            field=models.CharField(choices=[('AG', 'Agent'), ('AL', 'Airline'), ('MN', 'Manufacturer'), ('OT', 'Others')], default='OT', max_length=2),
        ),
    ]
