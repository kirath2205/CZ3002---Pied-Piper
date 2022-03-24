
from OrgView.models import *
from Authentication.models import OrgAccount
from datetime import date, datetime,timedelta
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
from django.core import serializers

@csrf_exempt
def get_current_campaigns(request):
    if(request.method=='GET'):
        current_campaigns=Campaign.objects.filter(date_time__gt=datetime.now())
        JsonResponse.status_code=int(error_codes.api_success())
        serialized_campaign_data = serializers.serialize('json',current_campaigns,fields=('campaign_id','organisation_email','location','skills','date_time','description','title','end_time','volunteer_count','minimum_age'))
        return JsonResponse(serialized_campaign_data,safe=False)
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def get_past_campaigns(request):
    if(request.method=='GET'):
        past_campaigns=Campaign.objects.filter(end_time__lte=datetime.now())
        JsonResponse.status_code=int(error_codes.api_success())
        serialized_campaign_data = serializers.serialize('json',past_campaigns,fields=('campaign_id','organisation_email','location','skills','date_time','description','title','end_time','volunteer_count','minimum_age'))
        return JsonResponse(serialized_campaign_data,safe=False)
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def get_org_details(request, org_id):
    if(request.method=='GET'):
        try:
            org_details=OrgAccount.objects.get(user_id=org_id)
        
        except OrgAccount.DoesNotExist as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('404 error')
        
        response_data={}
        response_data['org_name']=org_details.name
        response_data['email']=org_details.email
        response_data['phone_number']=org_details.phone_number
        response_data['address']=org_details.address
        response_data['verified']=org_details.verified

        JsonResponse.status_code=int(error_codes.api_success())
        return JsonResponse(response_data)

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')


@csrf_exempt
def get_campaign_using_campaign_id(request,campaign_id):
    if(request.method=='GET'):
        try:
            campaign_details=Campaign.objects.get(campaign_id=campaign_id)
        
        except Campaign.DoesNotExist as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('404 error')
        
        response_data={}
        response_data['org_email']=campaign_details.organisation_email
        response_data['location']=campaign_details.location
        response_data['skills']=campaign_details.skills
        response_data['date_time']=campaign_details.date_time
        response_data['description']=campaign_details.description
        response_data['title']=campaign_details.title
        response_data['end_time']=campaign_details.end_time
        response_data['volunteer_count']=campaign_details.volunteer_count
        response_data['minimum_age']=campaign_details.minimum_age

        JsonResponse.status_code=int(error_codes.api_success())
        return JsonResponse(response_data)

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def get_all_orgs(request):
    if(request.method=='GET'):
        org_details=OrgAccount.objects.all()
        serialized_org_data = serializers.serialize('json',org_details,fields=('user_id','name','email','phone_number','address','verified'))
        JsonResponse.status_code=int(error_codes.api_success())
        return JsonResponse(serialized_org_data,safe=False)
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')