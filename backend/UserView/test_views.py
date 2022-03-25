from ast import Pass
from datetime import datetime
from email import header
from wsgiref import headers
from passlib.hash import pbkdf2_sha256
import json
from django import setup
from django.http import response
from .models import *
from django.test import TestCase,RequestFactory,Client, client
from . import views
from django.urls import reverse
from backend import error_codes
from backend.constants_for_tests import *

class UserViewTests(TestCase):

    def setUp(self):
        client=Client()
        self.get_user_details_url=reverse('get_user_details')
        self.index_url=reverse('UserView')
        
    def get_response_index(self):
        response=self.client.get(self.index_url)
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertEquals(response,'Home page')
    
    def test_get_user_details_for_invalid_request_return_bad_request(self):
        response=self.client.post(self.get_user_details_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_user_details_for_invalid_data_return_deserialisation_error(self):
        response=self.client.get(self.get_user_details_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
    
    def test_get_user_details_for_invalid_jwt_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.get_user_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    