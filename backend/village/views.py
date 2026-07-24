from django.shortcuts import render
from django.db import transaction
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .models import Village
from .serializers import RegisterSerializer, VillageStateSerializer


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        Village.objects.create(user=user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def village_state(request):
    village, _ = Village.objects.get_or_create(user=request.user)

    if request.method == "GET":
        serializer = VillageStateSerializer(
            {
                "buildings": village.buildings.all(),
                "resources": village.resources.all(),
            }
        )
        return Response(serializer.data)

    serializer = VillageStateSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    with transaction.atomic():
        village.buildings.all().delete()
        for b in serializer.validated_data["buildings"]:
            village.buildings.create(**b)

        for r in serializer.validated_data["resources"]:
            village.resources.update_or_create(
                type=r["type"], defaults={"amount": r["amount"]}
            )

    return Response({"status": "saved"})
