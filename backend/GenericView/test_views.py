from ast import Pass
from datetime import datetime
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
from Authentication.models import *
from backend.constants_for_tests import *

class GenericViewsTests(TestCase):

    def setUp(self):
        client = Client()
        self.get_current_campaigns_url=reverse('get_current_campaigns')
        self.get_past_campaigns_url=reverse('get_past_campaigns')
        self.get_all_orgs_url=reverse('get_all_orgs')
        OrgAccount.objects.create(name='Org1',email='kirath001@e.ntu.edu.sg',
        phone_number='85138732',address='address')
    
    def test_get_current_campaigns_wrong_request(self):
        response=self.client.post(self.get_current_campaigns_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_current_campaigns(self):
        response=self.client.get(self.get_current_campaigns_url)
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)

    def test_get_past_campaigns_wrong_request(self):
        response=self.client.post(self.get_past_campaigns_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_past_campaigns(self):
        response=self.client.get(self.get_past_campaigns_url)
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    
    def test_get_all_orgs_wrong_request(self):
        response=self.client.post(self.get_all_orgs_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_orgs(self):
        response=self.client.get(self.get_all_orgs_url)
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    