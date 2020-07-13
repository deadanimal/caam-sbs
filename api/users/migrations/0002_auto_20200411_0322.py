# Generated by Django 2.2 on 2020-04-11 03:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='customuser',
            options={'ordering': ['-date_joined']},
        ),
        migrations.RenameField(
            model_name='customuser',
            old_name='name',
            new_name='full_name',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='home_number',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='mobile_number',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='office_number',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='profile_picture',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='registration_number',
        ),
        migrations.AddField(
            model_name='customuser',
            name='address',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='customuser',
            name='age',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='customuser',
            name='city',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='customuser',
            name='country',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='customuser',
            name='department',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='customuser',
            name='gender_type',
            field=models.CharField(choices=[('FM', 'Female'), ('ML', 'Male'), ('NA', 'Not Available')], default='NA', max_length=2),
        ),
        migrations.AddField(
            model_name='customuser',
            name='mobile_num',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='customuser',
            name='position',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='customuser',
            name='postcode',
            field=models.CharField(blank=True, max_length=5),
        ),
        migrations.AddField(
            model_name='customuser',
            name='race_type',
            field=models.CharField(choices=[('CN', 'Chinese'), ('ID', 'Indian'), ('ML', 'Malay'), ('NA', 'Not Available')], default='NA', max_length=2),
        ),
        migrations.AddField(
            model_name='customuser',
            name='state',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='customuser',
            name='user_type',
            field=models.CharField(choices=[('AD', 'Administrator'), ('CL', 'Client'), ('ST', 'Staff')], default='CS', max_length=2),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
