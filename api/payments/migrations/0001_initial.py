# Generated by Django 2.2.6 on 2020-11-12 08:25

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('organisations', '0001_initial'),
        ('operations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.IntegerField(blank=True, default=0)),
                ('status', models.CharField(choices=[('CR', 'Created'), ('PD', 'Paid'), ('NA', 'Not Available')], default='NA', max_length=2)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('organisation', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='organisations.Organisation')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount_paid', models.FloatField(blank=True, default=0)),
                ('debit_note', models.FloatField(blank=True, default=0)),
                ('credit_note', models.FloatField(blank=True, default=0)),
                ('payment_method', models.CharField(choices=[('CH', 'Cheque'), ('EF', 'EFT'), ('TT', 'Telegraphic Transfer'), ('OT', 'Others')], default='OT', max_length=2)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payment_invoice', to='payments.Invoice')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Reminder',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('description', models.CharField(blank=True, default='NA', max_length=255)),
                ('days', models.IntegerField(blank=True, default=0)),
                ('status', models.CharField(choices=[('PA', 'Paid'), ('PE', 'Pending')], default='PE', max_length=2)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reminder_invoice', to='payments.Invoice')),
                ('operator', models.ForeignKey(limit_choices_to={'organisation_type': 'AL'}, on_delete=django.db.models.deletion.CASCADE, related_name='reminder_operator', to='organisations.Organisation')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Receipt',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('payment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receipt_payment', to='payments.Payment')),
                ('uploaded_data', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='receipt_uploaded_data', to='operations.FileUpload')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='InvoiceItem',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('amount', models.IntegerField(blank=True, default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('item', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='operations.Fpldata')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
