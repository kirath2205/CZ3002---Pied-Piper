from json import loads
from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(UserAccount)
admin.site.register(OTPVerfification)
admin.site.register(OrgAccount)
admin.site.register(Ban)
admin.site.register(Login)