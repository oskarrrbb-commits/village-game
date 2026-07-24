from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class ProfilGracza(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profil")
    drewno = models.IntegerField(default=100)
    kamien = models.IntegerField(default=50)
    zloto = models.IntegerField(default=20)
    poziom_wioski = models.IntegerField(default=1)
    ostatnia_aktualizacja = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profil: {self.user.username}"


class TypBudynku(models.Model):
    kod = models.CharField(max_length=50, unique=True)
    nazwa_wyswietlana = models.CharField(max_length=100)
    koszt_drewno = models.IntegerField(default=0)
    koszt_kamien = models.IntegerField(default=0)
    koszt_zloto = models.IntegerField(default=0)

    def __str__(self):
        return self.nazwa_wyswietlana


class Budynek(models.Model):
    gracz = models.ForeignKey(User, on_delete=models.CASCADE, related_name="budynki")
    typ = models.ForeignKey(TypBudynku, on_delete=models.CASCADE)
    pozycja_x = models.IntegerField()
    pozycja_y = models.IntegerField()
    poziom = models.IntegerField(default=1)
    utworzono = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.typ.nazwa_wyswietlana} ({self.gracz.username})"


@receiver(post_save, sender=User)
def utworz_profil_gracza(sender, instance, created, **kwargs):
    if created:
        ProfilGracza.objects.create(user=instance)
