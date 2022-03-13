from Authentication.views import verify_jwt_token_local
from Authentication.models import OrgAccount
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
#from Authentication.views import verify_jwt_token
from backend import error_codes
from .models import *
# Create your views here.

def index(request):
    return HttpResponse('Home page')

@csrf_exempt
def create_campaign(request):
    if(request.method=="POST"):

        try:
            data = json.loads(request.body.decode('utf-8'))
            token = request.headers['Authorization']
            print(token)
            if(not verify_jwt_token_local(token)):
                HttpResponse.status_code=int(error_codes.invalid_jwt_token())
                return HttpResponse("Invalid jwt token")
            
            email=data.get('email')

            try:
                org_account = OrgAccount.objects.get(email=email)
            except OrgAccount.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.bad_request())
                return HttpResponse('Access denied')
            location=data.get('location')
            skills=data.get('skills')
            date=data.get('date')
            time=data.get('time')
            description=data.get('description')
            title=data.get('title')
            duration=data.get('duration')
            volunteer_count=data.get('volunteer_count')
            minimum_age=data.get('minimum_age')
            new_campaign = Campaign(organisation_email=email,location=location,skills=skills,date=date,time=time,description=description,title=title,duration=duration,volunteer_count=volunteer_count,minimum_age=minimum_age)
            new_campaign.save()
            HttpResponse.status_code=int(error_codes.api_success())
            return HttpResponse('Campaign Created')

        
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))


