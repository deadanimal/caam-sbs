# Generated by Django 2.2.6 on 2021-02-12 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0014_auto_20210212_0011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fpldata',
            name='error_type',
            field=models.CharField(blank=True, choices=[('FLIGHT', 'flight'), ('AIRLINE', 'airline')], default='NA', max_length=20, null=True),
        ),
    ]
