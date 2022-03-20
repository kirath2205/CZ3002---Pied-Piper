from datetime import datetime
from enum import unique
from django.db import models
from django.db.models.base import Model
from jsonfield import JSONField

# Create your models here.
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _
# Create your models here.

class UserCampaign(models,Model):
    user_id=models.IntegerField(default=None)
    campaign_id=models.IntegerField(default=None)
    class Status(models.TextChoices):
        PENDING = 'P',_('Pending')
        APPROVED = 'A',_('Approved')
        REJECT = 'R',_('Rejected')
        ABSENT = 'B',_('Absent')
        ATTENDED = 'T',_('Attended')
    status = models.CharField(max_length=1,choices=Status.choices,default=Status.PENDING)
    date = models.DateField(default=now)
    time = models.TimeField(default=now)
    duration=models.IntegerField(default=1)
