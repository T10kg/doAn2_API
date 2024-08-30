from django.urls import path
from .views import dulieuKH
from . import views

urlpatterns = [
    path('danhsachKH/', dulieuKH.as_view(), name='test'),
    path('themKH/', views.api_themKH, name='themKH'),
    path('xoaKH/', views.api_xoaKH, name='xoaKH'),
    path('capnhatKH/', views.api_capnhatKH, name='capnhatKH'),

]