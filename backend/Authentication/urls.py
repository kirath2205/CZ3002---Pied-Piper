from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path("",views.index,name="AuthHome"),
    path("register/",views.register,name="Register"),
]