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
from .token_generator import account_activation_token
import json
from twilio.rest import Client
import random
import datetime
import pytz
from passlib.hash import pbkdf2_sha256
from twilio.base.exceptions import TwilioRestException
import requests
import jwt
from datetime import date, datetime,timedelta, tzinfo

from .models import *
from backend.settings import *
from backend import error_codes

def index(request):
    return HttpResponse('Home page')

@csrf_exempt
def register(request):
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
            '''response = requests.get("https://isitarealemail.com/api/email/validate",params = {'email': email})
            status = response.json()['status']
            
            if(status != 'valid'):
                HttpResponse.status_code = int(error_codes.invalid_email())
                return HttpResponse('Invalid email')'''

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
                name = client.lookups.phone_numbers("+65"+str(phone_number)).fetch(type='caller-name')

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
                user_login = Login(email=email,password=hashed_password,account_type=type)
                user_login.save()
                otp_verify = OTPVerification(phone_number=phone_number)
                otp_verify.save()
                password_reset = PasswordReset(email=email)
                password_reset.save()

            else:
                name = data.get('name')
                new_org_account = OrgAccount(name=name,phone_number=phone_number,email=email,address=address)
                new_org_account.save()
                org_login = Login(email=email,password=hashed_password,account_type=type)
                org_login.save()
                password_reset = PasswordReset(email=email)
                password_reset.save()

            HttpResponse.status_code=int(error_codes.api_success())
            return HttpResponse('Registered Successfully')
            

        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')
        
def verify_jwt_token_local(access_token):

    decoded_access_token=jwt.decode(access_token,SECRET_KEY,algorithm="HS256")

    try:
        current_user=Login.objects.get(email=decoded_access_token['id'])
    
    except Login.DoesNotExist as e:
        return False
    
    current_time=json.dumps(datetime.now().isoformat())
    token_expiry=decoded_access_token['expiry']

    if(current_time>token_expiry):
        return False

    else:
        return True

@csrf_exempt
def refresh_jwt_token(request):

    if(request.method=='POST'):
        try:
            header_data=request.headers
            refresh_token=header_data['Authorization']
            decoded_refresh_token=jwt.decode(refresh_token,SECRET_KEY,algorithm="HS256")

            try:
                current_user=Login.objects.get(email=decoded_refresh_token['id'])

            except Login.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.invalid_refresh_token())
                return HttpResponse("Invalid refresh token")

            current_time=json.dumps(datetime.now().isoformat())
            token_expiry=decoded_refresh_token['expiry']

            if(current_time>token_expiry):
                HttpResponse.status_code=int(error_codes.invalid_refresh_token())
                return HttpResponse("Expired token")
        
            else:
                access_token_expiry=json.dumps((datetime.now()+timedelta(minutes=5)).isoformat())
                access_token_payload={'id':current_user.email,'expiry':access_token_expiry}
                access_token=jwt.encode(access_token_payload,SECRET_KEY,algorithm="HS256")
                JsonResponse.status_code=int(error_codes.api_success())
                return JsonResponse({
                'access_token' : access_token.decode('utf-8')})
        
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def login(request):

    if(request.method=="POST"):

        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')

            try:
                current_user = Login.objects.get(email=email)
            
            except Login.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.invalid_credentials())
                return HttpResponse("Invalid Credentials")

            password = data.get('password')

            if(not pbkdf2_sha256.verify(password,current_user.password)):
                HttpResponse.status_code=int(error_codes.invalid_credentials())
                return HttpResponse("Invalid Credentials")
            
            try:
                user_account=UserAccount.objects.get(email=email)
                if(user_account.ban):
                    HttpResponse.status_code=int(error_codes.account_banned())
                    return HttpResponse("User Account is banned")

            except Exception as e:
                pass

            access_token_expiry=json.dumps((datetime.now()+timedelta(minutes=5)).isoformat())
            refresh_token_expiry=json.dumps((datetime.now()+timedelta(hours=200*24)).isoformat())
            access_token_payload={'id':current_user.email,'expiry':access_token_expiry}
            refresh_token_payload={'id':current_user.email,'expiry':refresh_token_expiry}
            access_token=jwt.encode(access_token_payload,SECRET_KEY,algorithm="HS256")
            refresh_token=jwt.encode(refresh_token_payload,SECRET_KEY,algorithm="HS256")
            account_type = current_user.account_type
            JsonResponse.status_code = int(error_codes.login_successful())
            return JsonResponse({'access_token':access_token.decode('utf-8'),'refresh_token':refresh_token.decode('utf-8'), 'account_type': account_type})
        
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt            
def verify_jwt_token(request):

    if(request.method=="POST"):

        try:
            data = json.loads(request.body.decode('utf-8'))
            access_token = data.get('access_token')
            decoded_access_token=jwt.decode(access_token,SECRET_KEY,algorithm="HS256")

            try:
                current_user=Login.objects.get(email=decoded_access_token['id'])
    
            except Login.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.invalid_jwt_token())
                return HttpResponse("Invalid jwt token")

    
            current_time=json.dumps(datetime.now().isoformat())
            token_expiry=decoded_access_token['expiry']

            if(current_time>token_expiry):
                HttpResponse.status_code=int(error_codes.invalid_jwt_token())
                return HttpResponse("Expired token")

            JsonResponse.status_code = int(error_codes.api_success())
            return JsonResponse({"message": "Valid JWT Token", "account_type": current_user.account_type})
        
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def verify_email(request):

    if(request.method=="POST"):

        try:
            data = json.loads(request.body.decode('utf-8'))
            type = data.get('type')

            if(type!=ORG and type!=USER):
                HttpResponse.status_code = int(error_codes.bad_request())
                return HttpResponse('Invalid account type')

            email=data.get('email')

            if(type==ORG):
                try:
                    temp=OrgAccount.objects.get(email=email)
                    details=OrgAccount.objects.filter(email=email).values('user_id','email_confirmed')

                except OrgAccount.DoesNotExist:
                    HttpResponse.status_code = int(error_codes.bad_request())
                    return HttpResponse('Email does not exist')
            
            else:
                try:
                    temp=UserAccount.objects.get(email=email)
                    details=UserAccount.objects.filter(email=email).values('user_id','email_confirmed')

                except UserAccount.DoesNotExist:
                    HttpResponse.status_code = int(error_codes.bad_request())
                    return HttpResponse('Email does not exist')
            
            id=details[0].get('user_id')
            uid=urlsafe_base64_encode(force_bytes(id))
            token=account_activation_token.make_token(details[0])
            domain=str(get_current_site(request))
            url='http://'+domain+'/'+'auth/'+'activate/'+uid+'/'+token+'/'+type
            subject = 'Volunteer Account Activation'
            message = f'Please click on the below link to activate your account\n'+url+f'\nThis link is valid only for 24 hours'
            recepient = email
            send_mail(subject, 
                message, DEFAULT_FROM_EMAIL, [recepient])
        
            HttpResponse.status_code=int(error_codes.api_success())
            return HttpResponse(error_codes.verification_email_sent())
        
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

def activate_account(request,uidb64,token,type):

    if(request.method == 'GET'):
        uid = force_bytes(urlsafe_base64_decode(uidb64))

        if(type==ORG):
            details=OrgAccount.objects.filter(user_id=uid).values('user_id','email_confirmed')
            
            if(len(OrgAccount.objects.filter(user_id=uid))>0 and account_activation_token.check_token(details[0],token)):
                temp_details=OrgAccount.objects.get(user_id=uid)
                temp_details.email_confirmed=True
                temp_details.save()
                HttpResponse.status_code=int(error_codes.email_verified())
                return HttpResponse('Thankyou for verifying')

            else:
                HttpResponse.status_code=int(error_codes.server_error())
                return HttpResponse(error_codes.server_error())
    
        if(type==USER):
            details=UserAccount.objects.filter(user_id=uid).values('user_id','email_confirmed')
            
            if(len(UserAccount.objects.filter(user_id=uid))>0 and account_activation_token.check_token(details[0],token)):
                temp_details=UserAccount.objects.get(user_id=uid)
                temp_details.email_confirmed=True
                temp_details.save()
                HttpResponse.status_code=int(error_codes.email_verified())
                return HttpResponse('Thankyou for verifying')

        else:
            HttpResponse.status_code=int(error_codes.server_error())
            return HttpResponse(error_codes.server_error())
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

def __generate_otp():

    otp=random.randint(100000,999999)

    return otp

@csrf_exempt
def send_otp(request):

    if(request.method=='POST'):

        try:
            client = Client(ACCOUNT_SID,AUTH_TOKEN)
            data=json.loads(request.body.decode('utf-8'))
            phone_number = str(data.get('phone_number'))
            generated_otp = __generate_otp()

            try:
                message=client.messages.create(
                body=f'Your OTP is {generated_otp}, this OTP is only valid for 10 minutes' ,
                from_ = TWILIO_PHONE_NUMBER,
                to="+65"+f'{phone_number}')

                try:
                    current_user = OTPVerification.objects.get(phone_number=phone_number)
                
                except Exception as e:
                    HttpResponse.status_code=int(error_codes.invalid_phone_number())
                    return HttpResponse("Invalid phone number")
                
                current_user.otp = generated_otp
                current_user.time_of_otp =datetime.now()
                current_user.save()
                HttpResponse.status_code = int(error_codes.otp_sent())
                return HttpResponse("OTP sent")
            
            except TwilioRestException as e:
                HttpResponse.status_code = int(error_codes.server_error())
                return HttpResponse('Twilio error')
        
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def verify_otp(request):

    if(request.method=='POST'):
        try:
            data=json.loads(request.body.decode('utf-8'))
            otp=data.get('otp')
            phone_number = data.get('phone_number')

            try:
                current_user = OTPVerification.objects.get(phone_number=phone_number)
            
            except OTPVerification.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.invalid_phone_number())
                return HttpResponse("Invalid phone number")
            
            otp_received_timestamp = (current_user.time_of_otp).replace(tzinfo=None)
            current_timestamp  = datetime.now()

            if(current_user.otp == otp):
                time_lapsed = current_timestamp-otp_received_timestamp

                if(time_lapsed.total_seconds()>600):
                    current_user.otp='invalid'
                    current_user.save()
                    HttpResponse.status_code = int(error_codes.expired_otp())
                    return HttpResponse('Expired otp')
                
                else:
                    try:
                        current_user_account_info = UserAccount.objects.get(phone_number=phone_number)
                        current_user_account_info.phone_number_confirmed = True
                        current_user_account_info.save()
                        current_user.otp='invalid'
                        current_user.save()
                        HttpResponse.status_code=int(error_codes.otp_verified())
                        return HttpResponse('OTP verified')

                    except Exception as e:
                        HttpResponse.status_code=int(error_codes.invalid_phone_number())
                        return HttpResponse("Invalid phone number")
            
            else:
                HttpResponse.status_code=int(error_codes.invalid_otp())
                return HttpResponse('Invalid OTP')
        
        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def initiate_password_reset(request):

    if(request.method=='POST'):

        try:
            data=json.loads(request.body.decode('utf-8'))
            email = data.get('email')

            try:
                current_user = PasswordReset.objects.get(email=email)
            
            except PasswordReset.DoesNotExist as e:
                HttpResponse.status_code = int(error_codes.invalid_email())
                return HttpResponse('Email does not exist')
            
            generated_otp = __generate_otp()
            subject = 'Volunteer Org Password Reset'
            message = f'Your otp is {generated_otp}'
            recepient = email
            send_mail(subject, 
            message, DEFAULT_FROM_EMAIL, [recepient])
            current_user.otp=generated_otp
            current_user.time_of_otp=datetime.now()
            current_user.save()
            HttpResponse.status_code=int(error_codes.otp_sent())
            return HttpResponse('OTP sent')

        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def password_reset_OTP_verification(request):
    
    if(request.method == 'POST'):

        try:
            data=json.loads(request.body.decode('utf-8'))
            otp=data.get('otp')
            email=data.get('email')

            try:
                current_user = PasswordReset.objects.get(email=email)
            
            except PasswordReset.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.invalid_email())
                return HttpResponse("Invalid Email")
            
            if(current_user.otp != otp):
                HttpResponse.status_code = int(error_codes.invalid_otp())
                return HttpResponse('Invalid OTP')
            
            otp_timestamp = (current_user.time_of_otp).replace(tzinfo=None)
            time_elapsed = datetime.now()-otp_timestamp

            if(time_elapsed.total_seconds() > 600):
                current_user.otp='invalid'
                current_user.save()
                HttpResponse.status_code = int(error_codes.expired_otp())
                return HttpResponse('Expired OTP')
            
            current_user.otp='valid'
            current_user.save()
            HttpResponse.status_code=int(error_codes.otp_verified())
            return HttpResponse('OTP verified')

        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))
    
    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

@csrf_exempt
def get_new_password_after_otp_verification(request):

    if(request.method=='POST'):

        try:
            data=json.loads(request.body.decode('utf-8'))
            password=data.get('password')
            email=data.get('email')

            try:
                current_user = Login.objects.get(email=email)
                current_user_otp_verification = PasswordReset.objects.get(email=email)

            except Login.DoesNotExist or PasswordReset.DoesNotExist as e:
                HttpResponse.status_code=int(error_codes.invalid_email())
                return HttpResponse("Invalid Email")
            
            if(current_user_otp_verification.otp!='valid'):
                current_user_otp_verification.otp='invalid'
                current_user_otp_verification.save()
                HttpResponse.status_code = int(error_codes.invalid_otp())
                return HttpResponse('Invalid OTP')
                
            current_user.password = pbkdf2_sha256.hash(password)
            current_user.save()
            current_user_otp_verification.otp='invalid'
            current_user_otp_verification.save()
            HttpResponse.status_code=int(error_codes.password_changed())
            return HttpResponse('Password Changed')

        except Exception as e:
            HttpResponse.status_code = int(error_codes.bad_request())
            return HttpResponse('Deserialisation error '+str(e))

    else:
        HttpResponse.status_code = int(error_codes.bad_request())
        return HttpResponse('404 error')

