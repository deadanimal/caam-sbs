from rest_framework import serializers
from accounts.models import (
    Statements,
    Ledgers
)

class StatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statements
        fields = '__all__'
        read_only_fields = ['id']
    
class LedgerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ledgers
        fields = '__all__'
        read_only_fields = ['id']
    