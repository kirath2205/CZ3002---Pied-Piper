from os import name
from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns=[
    path("",views.index,name="UserView"),
    path("get_user_details/", views.get_user_details, name="get_user_details"),
    path("register_for_campaign/",views.register_for_campaign,name="register_for_campaign"),
    path("get_all_campaigns/", views.get_all_campaigns_user, name="get_all_campaigns_user"),
    path("get_all_pending_application_for_user/", views.get_all_pending_application_for_user, name="get_all_pending_application_for_user"),
    path("get_all_past_campaigns_for_user/", views.get_all_past_campaigns_for_user, name="get_all_past_campaigns_for_user"),
    path("update_user_details/", views.update_user_details, name="update_user_details"),
    path("unregister_for_campaign/",views.unregister_for_campaign,name="unregister_for_campaign")
]