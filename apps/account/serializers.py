from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'is_admin', 'is_store_owner']

    def create(self, validated_data):
        user = User(
            id=validated_data['id'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            is_admin=validated_data.get('is_admin', False),
            is_store_owner=validated_data.get('is_store_owner', False)
        )
        user.set_password(validated_data['password'])
        user.save()
        return user