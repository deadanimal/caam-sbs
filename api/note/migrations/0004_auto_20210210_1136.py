# Generated by Django 2.2.6 on 2021-02-10 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('note', '0003_auto_20210123_0126'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='company_address',
            field=models.CharField(blank=True, default='NA', max_length=200),
        ),
        migrations.AddField(
            model_name='note',
            name='company_email',
            field=models.CharField(blank=True, default='NA', max_length=200),
        ),
        migrations.AddField(
            model_name='note',
            name='company_fax',
            field=models.CharField(blank=True, default='NA', max_length=200),
        ),
        migrations.AddField(
            model_name='note',
            name='company_tel',
            field=models.CharField(blank=True, default='NA', max_length=200),
        ),
        migrations.AddField(
            model_name='note',
            name='invoice_amount',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='note',
            name='invoice_id',
            field=models.CharField(blank=True, default='NA', max_length=200),
        ),
        migrations.AlterField(
            model_name='note',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
    ]
