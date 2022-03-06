from os import error
from django.http.response import JsonResponse
from django.shortcuts import render,HttpResponse,redirect
from django.http import HttpResponse
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
#from .token_generator import account_activation_token
import json
from twilio.rest import Client
import random
import datetime
import pytz
from passlib.hash import pbkdf2_sha256
from twilio.base.exceptions import TwilioRestException
import requests
import re
import jwt
from datetime import date, datetime,timedelta

from .models import *
from backend.settings import *
from backend import error_codes

def index(request):
    return HttpResponse('Home page')

@csrf_exempt
def register(request):
    USER='USER'
    ORG='ORG'
    account_sid=ACCOUNT_SID
    auth_token=AUTH_TOKEN
    client=Client(account_sid,auth_token)
    if(request.method=="POST"):
        try:
        
            data = json.loads(request.body.decode('utf-8'))
            type = data.get('type')

            if(type!=USER and type!=ORG):
                HttpResponse.status_code = int(error_codes.bad_request())
                return HttpResponse('Invalid account type')
        
            password = data.get('password')

            if(len(password)<8):
                HttpResponse.status_code=int(error_codes.weak_password())
                return HttpResponse('Password should have more than 8 characters')

            check_num=any(chr.isdigit() for chr in password)
            check_alpha=any(chr.isalpha() for chr in password)

            if(not check_num or not check_alpha):
                HttpResponse.status_code=int(error_codes.weak_password())
                return HttpResponse('Password should be alphanumeric')

            if(' ' in password):
                HttpResponse.status_code=int(error_codes.weak_password())
                return HttpResponse('Password should not contain spaces')

            hashed_password = pbkdf2_sha256.hash(password)
            email = data.get('email')
            response = requests.get("https://isitarealemail.com/api/email/validate",params = {'email': email})
            status = response.json()['status']
            
            if(status != 'valid'):
                HttpResponse.status_code = int(error_codes.invalid_email())
                return HttpResponse('Invalid email')

            try:
                userDetails = UserAccount.objects.get(email=email)
                HttpResponse.status_code = int(error_codes.email_already_in_use())
                return HttpResponse('email already in use')

            except UserAccount.DoesNotExist as u:
                pass

            try:
                orgDetails = OrgAccount.objects.get(email=email)
                HttpResponse.status_code = int(error_codes.email_already_in_use())
                return HttpResponse('email already in use')

            except:
                pass

            phone_number = data.get('phone_number')

            if(int(phone_number)>99999999 or int(phone_number)<11111111):
                HttpResponse.status_code=int(error_codes.invalid_phone_number())
                return HttpResponse("Invalid phone number")

            try:
                name = client.lookups.phone_numbers("+65"+phone_number).fetch(type='caller-name')

            except TwilioRestException as e:
                HttpResponse.status_code=int(error_codes.invalid_phone_number())
                return HttpResponse('the number has been looked up and is found to be invalid')

            try:
                userDetails = UserAccount.objects.get(phone_number=phone_number)
                HttpResponse.status_code = int(error_codes.phone_already_in_use())
                return HttpResponse('number already in use')

            except UserAccount.DoesNotExist as u:
                pass

            try:
                orgDetails = OrgAccount.objects.get(phone_number=phone_number)
                HttpResponse.status_code = int(error_codes.phone_already_in_use())
                return HttpResponse('number already in use')

            except:
                pass

            address = data.get('address')

            if(type == USER):
                first_name = data.get('first_name')
                last_name = data.get('last_name')
                skills = data.get('skills')
                age = data.get('age')
                gender = data.get('gender')
                new_user_account = UserAccount(first_name=first_name,last_name=last_name,email=email,phone_number=phone_number,skills=skills,age=age,gender=gender,address=address)
                new_user_account.save()
                user_login = Login(email=email,password=hashed_password)
                user_login.save()
                otp_verify = OTPVerfification(phone_number=phone_number)
                otp_verify.save()

            else:
                name = data.get('name')
                new_org_account = OrgAccount(name=name,phone_number=phone_number,email=email,address=address)
                new_org_account.save()
                org_login = Login(email=email,password=hashed_password)
                org_login.save()
            
            HttpResponse.status_code = int(error_codes.api_success())
            return HttpResponse('Registered Successfully')
            

        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code=error_codes.server_error()
        return HttpResponse('Server error')
        
