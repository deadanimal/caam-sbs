# Generated by Django 2.2.6 on 2020-11-14 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0003_auto_20201114_1646'),
    ]

    operations = [
        migrations.AddField(
            model_name='fpldata',
            name='fpl_date_ts',
            field=models.DateTimeField(null=True),
        ),
    ]
