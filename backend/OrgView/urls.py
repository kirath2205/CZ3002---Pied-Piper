from os import name
from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path("",views.index,name="OrgView"),
    path("create_campaign/",views.create_campaign,name="create_campaign"),
]