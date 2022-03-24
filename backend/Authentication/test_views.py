
from email import header
from wsgiref import headers
from passlib.hash import pbkdf2_sha256
import json
from django import setup
from django.http import response
from .models import *
from django.test import TestCase,RequestFactory,Client
from . import views
from django.urls import reverse
from backend import error_codes
from backend.constants_for_tests import *

class AuthenticationViewsTests(TestCase):

    def setUp(self):
        client = Client()
        self.register_url=reverse('Register')
        self.index_url=reverse('AuthHome')
        self.refresh_jwt_url=reverse('RefreshJwtToken')
        self.login_url=reverse('Login')
        self.verify_jwt_url=reverse('VerifyJwtToken')
        self.send_otp_url=reverse('send_otp')
        self.verify_otp_url=reverse('verify_otp')
        UserAccount.objects.create(first_name='Kirath',last_name='Singh',email='singhkirath@gmail.com',
        phone_number='85138731',skills={},age=21,gender='M',address='address')
        OrgAccount.objects.create(name='Org1',email='kirath001@e.ntu.edu.sg',
        phone_number='85138732',address='address')
        Login.objects.create(email='singhkirath@gmail.com',password=pbkdf2_sha256.hash('Login@1234'),account_type='USER')
        OTPVerification.objects.create(phone_number='85138731')

    def get_response_index(self):
        response=self.client.get(self.index_url)
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertEquals(response,'Home page')

    def test_register_when_request_not_post_return_bad_request(self):
        response=self.client.get(self.register_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')

    def test_register_when_invalid_user_type_return_bad_request(self):
        response=self.client.post(self.register_url,{'type' : 'type'},content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid account type')
    
    def test_register_when_weak_password_return_weak_password(self):
        response=self.client.post(self.register_url,{"type" : "USER","password":"1234"},content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.weak_password()))
        self.assertEquals((response.content).decode("utf-8") ,'Password should have more than 8 characters')

    def test_register_when_password_has_only_numbers_return_weak_password(self):
        response=self.client.post(self.register_url,{"type" : "USER","password":"12345678"},content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.weak_password()))
        self.assertEquals((response.content).decode("utf-8") ,'Password should be alphanumeric')
    
    def test_register_when_password_has_only_letters_return_weak_password(self):
        response=self.client.post(self.register_url,{"type" : "USER","password":"abcdefgh"},content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.weak_password()))
        self.assertEquals((response.content).decode("utf-8") ,'Password should be alphanumeric')
    
    def test_register_when_password_has_space_return_weak_password(self):
        response=self.client.post(self.register_url,{"type" : "USER","password":"12abcdefgh "},content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.weak_password()))
        self.assertEquals((response.content).decode("utf-8") ,'Password should not contain spaces')
    
    def test_register_when_email_already_exists_in_user_return_email_already_in_use(self):
        data={"type" : "USER","password":"Login@1234","email":"singhkirath@gmail.com"}
        response=self.client.post(self.register_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.email_already_in_use()))
        self.assertEquals(response.content.decode("utf-8"),"email already in use")

    def test_register_when_email_already_exists_in_org_return_email_already_in_use(self):
        data={"type" : "ORG","password":"Login@1234","email":"kirath001@e.ntu.edu.sg"}
        response=self.client.post(self.register_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.email_already_in_use()))
        self.assertEquals(response.content.decode("utf-8"),"email already in use")
    
    def test_register_when_invalid_phone_number_return_invalid_phone_number(self):
        data={"type" : "ORG","password":"Login@1234","email":"kirath.singh@ninjavan.co","phone_number":"1234567"}
        response=self.client.post(self.register_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_phone_number()))
        self.assertEquals(response.content.decode("utf-8"),"Invalid phone number")
    
    def test_register_when_phone_number_does_not_exist_return_invalid_phone_number(self):
        data={"type" : "ORG","password":"Login@1234","email":"kirath.singh@ninjavan.co","phone_number":"12345678"}
        response=self.client.post(self.register_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_phone_number()))
        self.assertEquals(response.content.decode("utf-8"),"the number has been looked up and is found to be invalid")
    
    def test_register_when_phone_number_already_exists_return_phone_already_in_use(self):
        data={"type" : "ORG","password":"Login@1234","email":"kirath.singh@ninjavan.co","phone_number":"85138731"}
        response=self.client.post(self.register_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.phone_already_in_use()))
        self.assertEquals(response.content.decode("utf-8"),"number already in use")
    
    def test_register_when_valid_user_return_api_success(self):
        data={"type":"USER",'first_name':'first_name','last_name':'last_name','email':'kirathyt22@gmail.com',
        'phone_number':'85138733','skills':{'1':'camping'},'age':21,'gender':'M','address':'address','password':'Login@1234'}
        response=self.client.post(self.register_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertEquals(response.content.decode("utf-8"),"Registered Successfully")
    
    def test_register_when_valid_org_return_api_success(self):
        data={"type":"ORG",'name':'org','email':'kirathyt22@gmail.com',
        'phone_number':'85138733','address':'address','password':'Login@1234'}
        response=self.client.post(self.register_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertEquals(response.content.decode("utf-8"),"Registered Successfully")
    
    def test_verify_jwt_token_local_for_valid_jwt_user_does_not_exist_return_false(self):
        response=views.verify_jwt_token_local(VALID_JWT_USER_DOES_NOT_EXIST)
        self.assertEquals(response,False)
    
    def test_verify_jwt_token_local_for_expired_jwt_return_false(self):
        response=views.verify_jwt_token_local(EXPIRED_JWT)
        self.assertEquals(response,True)
    
    def test_verify_jwt_token_local_for_valid_jwt_return_true(self):
        response=views.verify_jwt_token_local(VALID_JWT)
        self.assertEquals(response,True)
    
    def test_refresh_jwt_token_for_get_request_return_bad_request(self):
        response=self.client.get(self.refresh_jwt_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_refresh_jwt_token_for_token_not_in_header_return_bad_request(self):
        response=self.client.post(self.refresh_jwt_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
        
    def test_refresh_jwt_token_for_user_does_not_exist_return_invalid_refresh_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.refresh_jwt_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_refresh_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid refresh token')
    
    def test_refresh_jwt_token_for_valid_refresh_token_return_valid_jwt_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT}
        response=self.client.post(self.refresh_jwt_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,100)
    
    def test_login_for_get_request_return_bad_request(self):
        response=self.client.get(self.login_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_login_for_no_credentials_return_bad_request(self):
        response=self.client.post(self.login_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
    
    def test_login_for_user_does_not_exist_return_invalid_credentials(self):
        data={
            "email" : "singhkirath@gmail"
        }
        response=self.client.post(self.login_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_credentials()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid Credentials')
    
    def test_login_for_wrong_password_return_invalid_credentials(self):
        data={
            "email" : "singhkirath@gmail.com" , "password" : "Login@123"
        }
        response=self.client.post(self.login_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_credentials()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid Credentials')
    
    def test_login_for_valid_credentials_return_login_successful(self):
        data={
            "email" : "singhkirath@gmail.com" , "password" : "Login@1234"
        }
        response=self.client.post(self.login_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.login_successful()))
        self.assertGreater(len((response.content).decode("utf-8")) ,100)
    
    def test_verify_token_for_wrong_request_return_bad_request(self):
        response=self.client.get(self.verify_jwt_url,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_verify_token_for_invalid_data_return_bad_request(self):
        response=self.client.post(self.verify_jwt_url,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
    
    def test_verify_token_for_invalid_token_return_invalid_jwt_token(self):
        data={"access_token":VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.verify_jwt_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_verify_token_for_valid_token_return_valid_token(self):
        data={"access_token":EXPIRED_JWT}
        response=self.client.post(self.verify_jwt_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,10)
    
    def test_send_otp_for_invalid_request_return_bad_request(self):
        response=self.client.get(self.send_otp_url,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_send_otp_for_invalid_data_return_deserialisation_error(self):
        response=self.client.post(self.send_otp_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
    
    def test_send_otp_for_invalid_phone_number_raise_twilio_exception(self):
        data={'phone_number':'1'}
        response=self.client.post(self.send_otp_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.server_error()))
        self.assertEquals((response.content).decode("utf-8") ,'Twilio error')
    
    def test_send_otp_for_unregistered_phone_number_return_invalid_phone_number(self):
        data={'phone_number':'90873378'}
        response=self.client.post(self.send_otp_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_phone_number()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid phone number')

    def test_send_otp_for_registered_number_return_otp_sent(self):
        data={'phone_number':'85138731'}
        response=self.client.post(self.send_otp_url,data,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.otp_sent()))
        self.assertEquals((response.content).decode("utf-8") ,'OTP sent')
    
    def test_verify_otp_for_invalid_request_return_bad_request(self):
        response=self.client.get(self.verify_otp_url,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')