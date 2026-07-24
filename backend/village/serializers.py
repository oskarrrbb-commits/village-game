from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

from .models import BuildingSave, Resource


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ["username", "password"]

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )


class BuildingSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingSave
        fields = ["building_type", "grid_x", "grid_y"]


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ["type", "amount"]


class VillageStateSerializer(serializers.Serializer):
    buildings = BuildingSaveSerializer(many=True)
    resources = ResourceSerializer(many=True)
