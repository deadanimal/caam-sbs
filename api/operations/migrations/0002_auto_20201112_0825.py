# Generated by Django 2.2.6 on 2020-11-12 08:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('organisations', '0001_initial'),
        ('operations', '0001_initial'),
        ('aircrafts', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='fpldatahistory',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fpl_data_history_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='fpldata',
            name='approved_by',
            field=models.ForeignKey(limit_choices_to={'user_type': 'HOD'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fpl_data_approved_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='fpldata',
            name='archived_by',
            field=models.ForeignKey(limit_choices_to={'user_type': 'OPS'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fpl_data_archived_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='fpldata',
            name='checked_by',
            field=models.ForeignKey(limit_choices_to={'user_type': 'OPS'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fpl_data_checked_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='fpldata',
            name='cid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='organisations.Organisation', to_field='cid'),
        ),
        migrations.AddField(
            model_name='fpldata',
            name='fileupload',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='file_upload_id', to='operations.FileUpload'),
        ),
        migrations.AddField(
            model_name='fpldata',
            name='uploaded_by',
            field=models.ForeignKey(limit_choices_to=models.Q(('user_type', 'OPS'), ('user_type', 'APT'), _connector='OR'), on_delete=django.db.models.deletion.CASCADE, related_name='fpl_data_uploaded_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='fileupload',
            name='approved_by',
            field=models.ForeignKey(limit_choices_to={'user_type': 'HOD'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='file_upload_approved_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='fileupload',
            name='checked_by',
            field=models.ForeignKey(limit_choices_to={'user_type': 'OPS'}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='file_upload_checked_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='fileupload',
            name='uploaded_by',
            field=models.ForeignKey(limit_choices_to=models.Q(('user_type', 'OPS'), ('user_type', 'APT'), _connector='OR'), on_delete=django.db.models.deletion.CASCADE, related_name='file_upload_uploaded_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='charge',
            name='aircraft',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='charge_aircraft', to='aircrafts.Aircraft'),
        ),
        migrations.AddField(
            model_name='charge',
            name='rate',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='charge_rate', to='operations.Rate'),
        ),
        migrations.AddField(
            model_name='callsign',
            name='cid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='organisations.Organisation', to_field='cid'),
        ),
    ]
