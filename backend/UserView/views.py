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
            except UserAccount.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.bad_request())
                return HttpResponse('Access denied')
            
            campaign_id=data.get('campaign_id')
            try:
                campaign = Campaign.objects.get(campaign_id=campaign_id)
            except Campaign.DoesNotExist as e:
                HttpResponse.status_code = int(error_codes.bad_request())
                return HttpResponse('404 error')

            user_id=user_account.user_id

            try:
                check_if_tried_registration = OrgNotif.objects.get(user_id=user_id)
                status=check_if_tried_registration.status
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
            
            #TODO test this
            date_time_current_campaign=campaign.date_time
            end_time_current_campaign=campaign.end_time
            
            try:
                campaign_slot_clashes=UserCampaign.objects.get( 
                    Q(user_id=user_id) & 
                    Q( 
                        Q(date_time__gte=date_time_current_campaign) & Q(date_time__lte=end_time_current_campaign) |
                        Q(end_time__gte=date_time_current_campaign) & Q(end_time__lte=end_time_current_campaign) 
                    ) 
                )
                HttpResponse.status_code=int(error_codes.campaign_time_clash())
                return HttpResponse('User campaign clash')

            except UserCampaign.DoesNotExist as e:
                new_user_campaign = UserCampaign(campaign_id=campaign_id,user_id=user_id,date_time=date_time_current_campaign,end_time=end_time_current_campaign)
                new_user_campaign.save()
                org_id = (OrgAccount.objects.get(email=email)).user_id
                new_notification = OrgNotif(campaign_id=campaign_id,user_id=user_id,org_id=org_id)
                new_notification.save()
                HttpResponse.status_code=int(error_codes.user_campaign_created())
                return HttpResponse('User campaign Created')
        
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def get_all_campaigns_user(request):
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
            
            user_id=user_account.user_id

            all_campaigns = UserCampaign.objects.filter(user_id=user_id)

            JsonResponse.status_code=int(error_codes.api_success())
            serialized_campaign_data = serializers.serialize('json',all_campaigns,fields=('campaign_id','status'))
            return JsonResponse(serialized_campaign_data,safe=False)
            
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')


@csrf_exempt
def get_all_pending_application_for_user(request):
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
            
            user_id=user_account.user_id

            all_pending_campaigns_of_current_user = UserCampaign.objects.filter(user_id=user_id, status='P')

            JsonResponse.status_code=int(error_codes.api_success())
            serialized_campaign_data = serializers.serialize('json',all_pending_campaigns_of_current_user,fields=('campaign_id','status'))
            return JsonResponse(serialized_campaign_data,safe=False)
            
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def get_all_past_campaigns_for_user(request):
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
            
            user_id=user_account.user_id

            all_pending_campaigns_of_current_user = UserCampaign.objects.filter(user_id=user_id).exclude(status ='P')

            JsonResponse.status_code=int(error_codes.api_success())
            serialized_campaign_data = serializers.serialize('json',all_pending_campaigns_of_current_user,fields=('campaign_id','status'))
            return JsonResponse(serialized_campaign_data,safe=False)
            
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')



@csrf_exempt
def unregister_for_campaign(request):
    pass