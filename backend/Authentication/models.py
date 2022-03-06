from enum import unique
from django.db import models
from jsonfield import JSONField

# Create your models here.
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _

class UserAccount(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=254,unique=True)
    phone_number = models.IntegerField(unique=True)
    email_confirmed = models.BooleanField(default=False)
    phone_number_confirmed = models.BooleanField(default=False)
    skills = JSONField(null=True)
    age = models.IntegerField(default=0)
    class Gender(models.TextChoices):
        MALE = 'M',_('Male')
        FEMALE = 'F',_('Female')
        TRANS = 'T',_('Trans')
    gender = models.CharField(max_length=1,choices=Gender.choices,default=Gender.MALE)
    address = models.CharField(max_length=200)
    strikes = models.IntegerField(default=0)

class Login(models.Model):
    email = models.EmailField(max_length=254,unique=True)
    password = models.EmailField(max_length=200)

class Ban(models.Model):
    email = models.EmailField(unique=True)

class OrgAccount(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    email_confirmed = models.BooleanField(default=False)
    phone_number = models.IntegerField(unique=True)
    phone_number_confirmed = models.BooleanField(default=False)
    address = models.CharField(max_length=200)
    verified = models.BooleanField(default=False)

class OTPVerfification(models.Model):
    phone_number=models.IntegerField(primary_key=True)
    otp=models.CharField(max_length=6,default='invalid')
    time_of_otp=models.DateTimeField(default=now)