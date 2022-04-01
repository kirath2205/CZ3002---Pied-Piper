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
        self.create_campaign_url=reverse('create_campaign')
        self.update_org_details_url=reverse('update_org_details')
        self.update_campaign_details=reverse('update_campaign_details')
        self.get_all_campaign_details_for_org=reverse('get_all_campaign_details_for_org')
        self.get_all_past_campaign_details_for_org=reverse('get_all_past_campaign_details_for_org')
        self.get_all_upcoming_campaign_details_for_org=reverse('get_all_upcoming_campaign_details_for_org')
        self.delete_org_account=reverse('delete_org_account')
        self.view_org_notifs=reverse('view_org_notifs')
        self.approve_or_reject_user_campaign_registration=reverse('approve_or_reject_user_campaign_registration')
        OrgAccount.objects.create(name='Org1',email='kirath001@e.ntu.edu.sg',
        phone_number='85138732',address='address')
        Login.objects.create(email='kirath001@e.ntu.edu.sg',password=pbkdf2_sha256.hash('Login@1234'),account_type='ORG')

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
            'HTTP_AUTHORIZATION' : VALID_JWT_ORG_VIEW
        }
        response=self.client.get(self.get_org_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    
    def test_create_campaign_for_invalid_request_return_bad_request(self):
        response=self.client.get(self.create_campaign_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_create_campaign_for_invalid_data_return_bad_request(self):
        response=self.client.post(self.create_campaign_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')

    def test_create_campaign_for_user_does_not_exist_return_bad_request(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.create_campaign_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_create_campaign_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT_ORG_VIEW
        }
        response=self.client.post(self.create_campaign_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    
    def test_update_org_details_url_for_invalid_request_return_bad_request(self):
        response=self.client.get(self.update_org_details_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_update_org_details_url_for_invalid_data_return_bad_request(self):
        response=self.client.post(self.update_org_details_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')

    def test_update_org_details_url_for_user_does_not_exist_return_bad_request(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.update_org_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_update_org_details_url_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT_ORG_VIEW
        }
        response=self.client.post(self.update_org_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    
    def test_update_campaign_details_url_for_invalid_request_return_bad_request(self):
        response=self.client.get(self.update_campaign_details)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_update_campaign_details_url_for_invalid_data_return_bad_request(self):
        response=self.client.post(self.update_campaign_details)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')

    def test_update_campaign_details_url_for_user_does_not_exist_return_bad_request(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.update_campaign_details,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_update_campaign_details_url_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT_ORG_VIEW
        }
        response=self.client.post(self.update_campaign_details,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_campaign()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    
    def test_get_all_campaign_details_for_org_url_for_invalid_request_return_bad_request(self):
        response=self.client.post(self.get_all_campaign_details_for_org)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_campaign_details_for_org_url_for_invalid_data_return_bad_request(self):
        response=self.client.get(self.get_all_campaign_details_for_org)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')

    def test_get_all_campaign_details_for_org_url_for_user_does_not_exist_return_bad_request(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.get(self.get_all_campaign_details_for_org,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_get_all_campaign_details_for_org_url_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT_ORG_VIEW
        }
        response=self.client.get(self.get_all_campaign_details_for_org,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    
    def test_get_all_past_campaign_details_for_org_url_for_invalid_request_return_bad_request(self):
        response=self.client.post(self.get_all_past_campaign_details_for_org)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_past_campaign_details_for_org_url_for_invalid_data_return_bad_request(self):
        response=self.client.get(self.get_all_past_campaign_details_for_org)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')

    def test_get_all_past_campaign_details_for_org_for_user_does_not_exist_return_bad_request(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.get(self.get_all_past_campaign_details_for_org,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_get_all_past_campaign_details_for_org_url_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT_ORG_VIEW
        }
        response=self.client.get(self.get_all_past_campaign_details_for_org,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    
    def test_get_all_upcoming_campaign_details_for_org_url_for_invalid_request_return_bad_request(self):
        response=self.client.post(self.get_all_upcoming_campaign_details_for_org)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_upcoming_campaign_details_for_org_url_for_invalid_data_return_bad_request(self):
        response=self.client.get(self.get_all_upcoming_campaign_details_for_org)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')

    def test_get_all_upcoming_campaign_details_for_org_for_user_does_not_exist_return_bad_request(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.get(self.get_all_upcoming_campaign_details_for_org,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_get_all_upcoming_campaign_details_for_org_url_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT_ORG_VIEW
        }
        response=self.client.get(self.get_all_upcoming_campaign_details_for_org,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    
    def test_delete_org_account(self):
        response=self.client.get(self.delete_org_account)
        self.assertEquals(response.status_code,int(error_codes.api_success()))
    
    def test_view_org_notifs_url_for_invalid_request_return_bad_request(self):
        response=self.client.post(self.view_org_notifs)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_view_org_notifs_url_for_invalid_data_return_bad_request(self):
        response=self.client.get(self.view_org_notifs)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')

    def test_view_org_notifs_for_user_does_not_exist_return_bad_request(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.get(self.view_org_notifs,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_view_org_notifs_url_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT_ORG_VIEW
        }
        response=self.client.get(self.view_org_notifs,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)
    
    def test_approve_or_reject_user_campaign_registration_for_invalid_request_return_bad_request(self):
        response=self.client.get(self.approve_or_reject_user_campaign_registration)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_approve_or_reject_user_campaign_registration_url_for_invalid_data_return_bad_request(self):
        response=self.client.post(self.approve_or_reject_user_campaign_registration)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')

    def test_approve_or_reject_user_campaign_registration_for_user_does_not_exist_return_bad_request(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.approve_or_reject_user_campaign_registration,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_approve_or_reject_user_campaign_registration_url_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT_ORG_VIEW
        }
        response=self.client.post(self.approve_or_reject_user_campaign_registration,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertGreater(len((response.content).decode("utf-8")) ,1)

