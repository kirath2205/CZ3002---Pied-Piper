import json
from django import setup
from django.http import response
from .models import *
from django.test import TestCase,RequestFactory,Client
from . import views
from django.urls import reverse
from backend import error_codes

class AuthenticationViewsTests(TestCase):

    def setUp(self):
        client = Client()
        self.register_url=reverse('Register')
        self.index_url=reverse('AuthHome')
        UserAccount.objects.create(first_name='Kirath',last_name='Singh',email='singhkirath@gmail.com',
        phone_number='85138731',skills={},age=21,gender='M',address='address')
        OrgAccount.objects.create(name='Org1',email='kirath001@e.ntu.edu.sg',
        phone_number='85138732',address='address')
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