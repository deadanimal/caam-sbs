from rest_framework import serializers
from invoice.models import Invoices

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoices
        fields = '__all__'
        read_only_fields = ['id']
    
    def create(self, validated_data):
        print(validated_data)
        return Invoices.objects.create(**validated_data)
    