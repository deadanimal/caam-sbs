# Generated by Django 2.2.6 on 2021-01-22 15:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('operations', '0010_auto_20210121_1559'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fpldata',
            name='uploaded_by',
            field=models.ForeignKey(limit_choices_to=models.Q(('user_type', 'OPS'), ('user_type', 'APT'), _connector='OR'), null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fpl_data_uploaded_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
