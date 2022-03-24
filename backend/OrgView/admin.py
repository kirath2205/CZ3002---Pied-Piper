
from django.contrib import admin

# Register your models here.
from json import loads
from django.contrib import admin
from .models import *

admin.site.register(Campaign)
admin.site.register(OrgNotif)
admin.site.register(AcceptedUsers)
admin.site.register(RejectedUsers)