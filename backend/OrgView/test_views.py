from passlib.hash import pbkdf2_sha256
from .models import *
from django.test import TestCase,Client
from django.urls import reverse
from backend import error_codes
from backend.constants_for_tests import *
from Authentication.models import *

class OrgViewTests(TestCase):

    def setUp(self):
        self.get_org_details_url=reverse('get_org_details')

    def test_get_org_details_for_invalid_request_return_bad_request(self):
        response=self.client.post(self.get_org_details_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_org_details_for_invalid_data_return_bad_request(self):
        response=self.client.get(self.get_org_details_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')

    def test_get_org_details_for_user_does_not_exist_return_bad_request(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.get(self.get_org_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_get_org_details_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT
        }
        response=self.client.get(self.get_org_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
