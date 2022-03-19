from os import name
from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns=[
    path("",views.index,name="UserView"),
    path("register_for_campaign/",views.register_for_campaign,name="register_for_campaign")
]