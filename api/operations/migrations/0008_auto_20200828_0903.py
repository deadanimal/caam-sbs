# Generated by Django 2.2.6 on 2020-08-28 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0007_auto_20200827_0728'),
    ]

    operations = [
        migrations.AddField(
            model_name='fileupload',
            name='status',
            field=models.CharField(choices=[('FIL0', 'Draf'), ('FIL1', 'Processing'), ('FIL2', 'Approved')], default='FIL0', max_length=4),
        ),
        migrations.AddField(
            model_name='fpldata',
            name='status',
            field=models.CharField(choices=[('FPL0', 'Draf'), ('FPL1', 'Processing'), ('FPL2', 'Approved'), ('FPL3', 'Archived')], default='FPL0', max_length=4),
        ),
    ]
