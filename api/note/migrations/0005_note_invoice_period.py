# Generated by Django 2.2.6 on 2021-02-10 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('note', '0004_auto_20210210_1136'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='invoice_period',
            field=models.CharField(blank=True, default='NA', max_length=200),
        ),
    ]
