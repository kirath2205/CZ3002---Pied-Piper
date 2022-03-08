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
    path('verify_email/',views.verify_email,name='verify_email'),
    path('activate/<uidb64>/<token>/<type>',views.activate_account, name='activate'),
    path('send_otp/',views.send_otp,name='send_otp'),
    path('verify_otp/',views.verify_otp,name='verify_otp'),
    path('initiate_password_reset/',views.initiate_password_reset,name='initiate_password_reset'),
    path('password_reset_OTP_verification/',views.password_reset_OTP_verification,name='password_reset_OTP_verification'),
    path('get_new_password_after_otp_verification/',views.get_new_password_after_otp_verification,name='get_new_password_after_otp_verification'),
]