from . import views
from django.contrib import admin
from django.urls import path,include
from django.conf import settings

urlpatterns = [
    path("get_current_campaigns/",views.get_current_campaigns,name="get_current_campaigns"),
    path("get_past_campaigns/",views.get_past_campaigns,name="get_past_campaigns"),
    path("get_org_details/<int:org_id>/",views.get_org_details,name="get_org_details"),
    path("get_campaign_using_campaign_id/<int:campaign_id>",views.get_campaign_using_campaign_id,name="get_campaign_using_campaign_id"),
    path("get_all_orgs/",views.get_all_orgs,name="get_all_orgs"),
]