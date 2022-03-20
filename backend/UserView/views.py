from backend.OrgView.models import Campaign
from backend.Authentication.models import UserAccount
from datetime import date
from django.db.models import fields

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

def index(request):
    return HttpResponse('Home page')

def __get_email_from_token(token):
    return ((jwt.decode(token,SECRET_KEY,algorithm="HS256"))['id'])

@csrf_exempt
def get_user_details(request):
    if(request.method=="GET"):
        
        try:
            token = request.headers['Authorization']

            if(not verify_jwt_token_local(token)):
                HttpResponse.status_code=int(error_codes.invalid_jwt_token())
                return HttpResponse("Invalid jwt token")
            
            email=__get_email_from_token(token)
            
            try:
                user_account = UserAccount.objects.get(email=email)
            except UserAccount.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.bad_request())
                return HttpResponse('Access denied')
            
            
            JsonResponse.status_code=int(error_codes.api_success())
            serialized_user_data = json.loads(serializers.serialize('json',[user_account]))[0]
            return JsonResponse(serialized_user_data,safe=False)
            
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')


@csrf_exempt
def register_for_campaign(request):

    if(request.method=="POST"):

        try:
            data = json.loads(request.body.decode('utf-8'))
            token = request.headers['Authorization']

            if(not verify_jwt_token_local(token)):
                HttpResponse.status_code=int(error_codes.invalid_jwt_token())
                return HttpResponse("Invalid jwt token")
            
            email=__get_email_from_token(token)

            try:
                user_account = UserAccount.objects.get(email=email)
            except OrgAccount.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.bad_request())
                return HttpResponse('Access denied')
            
            campaign_id=data.get('campaign_id')
            try:
                campaign = Campaign.objects.get(campaign_id=campaign_id)
            except Campaign.DoesNotExist as e:
                HttpResponse.status_code = int(error_codes.bad_request())
                return HttpResponse('404 error')
            
            user_id=user_account.get('user_id')

            try:
                check_if_tried_registration = OrgNotif.objects.get(user_id=user_id)
                status=check_if_tried_registration.get('status')
                if(status=='P'):
                    HttpResponse.status_code=int(error_codes.pending_request())
                    return HttpResponse('Pending Request') 

                try:
                    check_if_user_was_rejected = RejectedUsers.objects.get(user_id=user_id, campaign_id=campaign_id)
                    HttpResponse.status_code=int(error_codes.request_rejected())
                    return HttpResponse('User was rejected')

                except Exception as e:
                    pass
            
            except OrgNotif.DoesNotExist as e:
                pass
            
            date=campaign.get('date')
            time=campaign.get('time')
            duration=campaign.get('duration')
            campaign_slot_clashes=UserCampaign.objects.filter(date==date ,time__gte=time , time__lte=(time+duration))
            
            if not campaign_slot_clashes:
                new_user_campaign = UserCampaign(campaign_id=campaign_id,user_id=user_id,date=date,time=time,duration=duration)
                new_user_campaign.save()
                org_id = OrgAccount.objects.get(email=email)
                new_notification = OrgNotif(campaign_id=campaign_id,user_id=user_id,org_id=org_id)
                new_notification.save()
                HttpResponse.status_code=int(error_codes.user_campaign_created())
                return HttpResponse('User campaign Created')
            
            HttpResponse.status_code=int(error_codes.campaign_time_clash())
            return HttpResponse('User campaign clash')
        
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')