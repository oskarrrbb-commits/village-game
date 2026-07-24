from django.db import models
from django.contrib.auth.models import User


class Village(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="village")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Village of {self.user.username}"


class Resource(models.Model):
    village = models.ForeignKey(
        Village, on_delete=models.CASCADE, related_name="resources"
    )
    type = models.CharField(max_length=32)
    amount = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("village", "type")


class BuildingSave(models.Model):
    village = models.ForeignKey(
        Village, on_delete=models.CASCADE, related_name="buildings"
    )
    building_type = models.CharField(max_length=32)
    grid_x = models.PositiveIntegerField()
    grid_y = models.PositiveIntegerField()

    class Meta:
        unique_together = ("village", "grid_x", "grid_y")
