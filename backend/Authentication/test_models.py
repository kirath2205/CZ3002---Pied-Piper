from django import setup
from .models import *
from django.test import TestCase

class AuthenticationModelsTests(TestCase):
    
    def test_UserRegister(self):
        user=UserAccount()
        user.first_name='Kirath'        
        user.last_name='Singh'
        user.email='kirath001@e.ntu.edu.sg'
        user.phone_number='85138731'
        user.skills={'1':'cooking','2':'camping'}
        user.age=21
        user.gender='M'
        user.address='address'
        user.save()
        record=UserAccount.objects.get(user_id=1)
        self.assertEqual(record,user)

