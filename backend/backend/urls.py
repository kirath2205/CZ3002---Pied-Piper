from . import views
from django.contrib import admin
from django.urls import path,include
from django.conf import settings

urlpatterns = [
    path('',views.index,name='Home'),
    path('admin/', admin.site.urls),
    path('auth/', include('Authentication.urls')),
    path('org_view/', include('OrgView.urls')),
    path('user_view/',include('UserView.urls')),
    path('generic_view/',include('GenericView.urls'))
]

admin.site.site_header = "Volunteer.com"
admin.site.index_title = "Welcome to Volunteer.com admin panel"
admin.site.site_title = "Volunteer.com"