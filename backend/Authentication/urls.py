from os import name
from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path("",views.index,name="AuthHome"),
    path("register/",views.register,name="Register"),
    path("login/",views.login,name="Login"),
    path("refresh_jwt_token/",views.refresh_jwt_token,name="RefreshJwtToken"),
    path("verify_jwt_token/",views.verify_jwt_token,name="VerifyJwtToken"),
]