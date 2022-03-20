from datetime import datetime
from enum import unique
from django.db import models
from jsonfield import JSONField

# Create your models here.
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _
# Create your models here.

class Campaign(models.Model):
    campaign_id = models.BigAutoField(primary_key=True)
    organisation_email = models.EmailField()
    location = models.CharField(max_length=200)
    skills = JSONField(null=True)
    date = models.DateField(default=now)
    time = models.TimeField(default=now)
    description = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    duration = models.IntegerField(default=1)
    volunteer_count = models.IntegerField(default=1)
    minimum_age = models.IntegerField(default=14)
    class Status(models.TextChoices):
        UPCOMING = 'U',_('Upcoming')
        COMPLETED = 'C',_('Completed')
    status = models.CharField(max_length=1,choices=Status.choices,default=Status.UPCOMING)

class OrgNotif(models.Model):
    user_id=models.IntegerField(default=None)
    campaign_id=models.IntegerField(default=None)
    class Status(models.TextChoices):
        PENDING = 'P',_('Pending')
        REJECTED = 'R',_('Rejected')
        ACCEPTED = 'A',_("Accepted")
    status = models.CharField(max_length=1,choices=Status.choices,default=Status.PENDING)
    org_id=models.IntegerField(default=None)

class AcceptedUsers(models.Model):
    user_id=models.IntegerField(default=None)
    campaign_id=models.IntegerField(default=None)

class RejectedUsers(models.Model):
    user_id=models.IntegerField(default=None)
    campaign_id=models.IntegerField(default=None)