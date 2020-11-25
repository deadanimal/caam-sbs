from rest_framework import serializers
from accounts.models import Statements

class StatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statements
        fields = '__all__'
        read_only_fields = ['id']
    
    