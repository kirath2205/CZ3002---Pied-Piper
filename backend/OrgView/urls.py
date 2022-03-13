from os import name
from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path("",views.index,name="OrgView"),
    path("create_campaign/",views.create_campaign,name="create_campaign"),
    path("get_all_campaign_details_for_org/",views.get_all_campaign_details_for_org,name="get_all_campaign_details_for_org"),
    path("update_campaign_details",views.update_campaign_details,name="update_campaign_details"),
    path("update_org_details/",views.update_org_details,name="update_org_details")
]