from . import views
from django.contrib import admin
from django.urls import path,include
from django.conf import settings

urlpatterns = [
    path('',views.index,name='Home'),
    path('admin/', admin.site.urls),
    path('auth/', include('Authentication.urls')),
]
