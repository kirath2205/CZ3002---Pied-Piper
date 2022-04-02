from passlib.hash import pbkdf2_sha256
from .models import *
from django.test import TestCase,Client
from django.urls import reverse
from backend import error_codes
from backend.constants_for_tests import *
from Authentication.models import *

class UserViewTests(TestCase):

    def setUp(self):
        client=Client()
        self.get_user_details_url=reverse('get_user_details')
        self.index_url=reverse('UserView')
        self.register_for_campaign_url=reverse('register_for_campaign')
        self.get_all_campaigns_user_url=reverse('get_all_campaigns_user')
        self.get_all_pending_application_for_user_url=reverse('get_all_pending_application_for_user')
        self.get_all_past_campaigns_for_user_url=reverse('get_all_past_campaigns_for_user')
        self.update_user_details_url=reverse('update_user_details')
        self.unregister_for_campaign_url=reverse('unregister_for_campaign')
        UserAccount.objects.create(first_name='Kirath',last_name='Singh',email='singhkirath@gmail.com',
        phone_number='85138731',skills={},age=21,gender='M',address='address')
        Login.objects.create(email='singhkirath@gmail.com',password=pbkdf2_sha256.hash('Login@1234'),account_type='USER')
        
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
        response=self.client.get(self.get_user_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_get_user_details_for_invalid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT
        }

        response=self.client.get(self.get_user_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,0)
    
    def test_get_user_details_for_valid_jwt(self):
        header = {
            'HTTP_AUTHORIZATION' : VALID_JWT_USER_VIEW
        }

        response=self.client.get(self.get_user_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,0)

    def test_register_for_campaign_for_invalid_request_return_bad_request(self):
        response=self.client.get(self.register_for_campaign_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_register_for_campaign_for_invalid_data_return_deserialisation_error(self):
        response=self.client.post(self.register_for_campaign_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
    
    def test_register_for_campaign_for_invalid_jwt_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.register_for_campaign_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_register_for_campaign_for_invalid_jwt_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_VIEW}
        response=self.client.post(self.register_for_campaign_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_campaigns_user_for_invalid_request_return_deserialisation_error(self):
        response=self.client.post(self.get_all_campaigns_user_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_campaigns_user_for_invalid_data_return_bad_request(self):
        response=self.client.get(self.get_all_campaigns_user_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
        
    
    def test_get_all_campaigns_user_for_invalid_jwt_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.get(self.get_all_campaigns_user_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.invalid_jwt_token()))
        self.assertEquals((response.content).decode("utf-8") ,'Invalid jwt token')
    
    def test_get_all_campaigns_user_for_invalid_user_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_VIEW}
        response=self.client.get(self.get_all_campaigns_user_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,0)
    
    def test_get_all_pending_application_for_user_url_return_deserialisation_error(self):
        response=self.client.post(self.get_all_pending_application_for_user_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_pending_application_for_user_url_return_bad_request(self):
        response=self.client.get(self.get_all_pending_application_for_user_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
        
    
    def test_get_all_pending_application_for_user_url_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.get(self.get_all_pending_application_for_user_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_pending_application_for_user_url_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_VIEW}
        response=self.client.get(self.get_all_pending_application_for_user_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,0)
    
    def test_get_all_past_campaigns_for_user_url_return_deserialisation_error(self):
        response=self.client.post(self.get_all_past_campaigns_for_user_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_past_campaigns_for_user_url_return_bad_request(self):
        response=self.client.get(self.get_all_past_campaigns_for_user_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
        
    
    def test_get_all_past_campaigns_for_user_url_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.get(self.get_all_past_campaigns_for_user_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_get_all_past_campaigns_for_user_url_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_VIEW}
        response=self.client.get(self.get_all_past_campaigns_for_user_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.api_success()))
        self.assertGreater(len((response.content).decode("utf-8")) ,0)
    
    def test_update_user_details_urlreturn_deserialisation_error(self):
        response=self.client.get(self.update_user_details_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_update_user_details_url_return_bad_request(self):
        response=self.client.post(self.update_user_details_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
        
    def test_update_user_details_url_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.update_user_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_update_user_details_url_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_VIEW}
        response=self.client.post(self.update_user_details_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertGreater(len((response.content).decode("utf-8")) ,0)
    
    def test_unregister_for_campaign_url_return_deserialisation_error(self):
        response=self.client.get(self.unregister_for_campaign_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_unregister_for_campaign_url_return_bad_request(self):
        response=self.client.post(self.unregister_for_campaign_url)
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8")[:21] ,'Deserialisation error')
        
    def test_unregister_for_campaign_url_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_DOES_NOT_EXIST}
        response=self.client.post(self.unregister_for_campaign_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')
    
    def test_unregister_for_campaign_url_return_invalid_token(self):
        header = {
        'HTTP_AUTHORIZATION':VALID_JWT_USER_VIEW}
        response=self.client.post(self.unregister_for_campaign_url,**header,content_type="application/json")
        self.assertEquals(response.status_code,int(error_codes.bad_request()))
        self.assertEquals((response.content).decode("utf-8") ,'404 error')