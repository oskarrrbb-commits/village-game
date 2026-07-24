from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", obtain_auth_token, name="login"),
    path("village/", views.village_state, name="village-state"),
]
