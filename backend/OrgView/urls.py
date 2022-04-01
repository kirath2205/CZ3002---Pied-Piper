from os import name
from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path("",views.index,name="OrgView"),
    path("create_campaign/",views.create_campaign,name="create_campaign"),
    path("get_all_campaign_details_for_org/",views.get_all_campaign_details_for_org,name="get_all_campaign_details_for_org"),
    path("update_campaign_details",views.update_campaign_details,name="update_campaign_details"),
    path("get_org_details/", views.get_org_details, name="get_org_details"),
    path("update_org_details/",views.update_org_details,name="update_org_details"),
    path("get_all_past_campaign_details_for_org/",views.get_all_past_campaign_details_for_org,name="get_all_past_campaign_details_for_org"),
    path("get_all_upcoming_campaign_details_for_org/",views.get_all_upcoming_campaign_details_for_org,name="get_all_upcoming_campaign_details_for_org"),
    path("view_org_notifs",views.view_org_notifs,name="view_org_notifs"),
    path("approve_or_reject_user_campaign_registration",views.approve_or_reject_user_campaign_registration,name="approve_or_reject_user_campaign_registration"),
    path("delete_org_account",views.delete_org_account,name="delete_org_account")
]