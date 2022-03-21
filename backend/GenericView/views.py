from Authentication.models import UserAccount
from OrgView.models import Campaign
from Authentication.models import *
from datetime import date,timedelta
from django.db.models import fields
from django.db.models import Q

from django.http.response import JsonResponse
from Authentication.views import verify_jwt_token_local
from Authentication.models import OrgAccount
from OrgView.models import *
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from backend.settings import *
import json
import jwt
from backend import error_codes
from .models import *
from django.core import serializers

@csrf_exempt
def get_current_campaigns(request):
    pass

@csrf_exempt
def get_past_campaigns(request):
    pass

@csrf_exempt
def get_org_details(request):
    pass

@csrf_exempt
def get_campaign_using_campaign_id(request):
    pass