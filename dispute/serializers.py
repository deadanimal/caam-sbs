from rest_framework import serializers
from dispute.models import Dispute

class DisputeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dispute
        fields = '__all__'
        read_only_fields = ['id']
    
    
