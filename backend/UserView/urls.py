from os import name
from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns=[
    path("",views.index,name="UserView"),
    path("get_user_details/", views.get_user_details, name="get_user_details"),
    path("register_for_campaign/",views.register_for_campaign,name="register_for_campaign")
]