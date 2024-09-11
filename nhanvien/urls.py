from django.urls import path

from .views import dsPB, dsCV,list_nhanvien, themNhanVien, capNhatNhanVien, xoaNhanVien
from . import views



app_name = "nhanvien"
urlpatterns = [
    path('xoaNhanVien/', xoaNhanVien, name='xoaNhanVien'),
    path('capNhatNhanVien/', capNhatNhanVien, name='capNhatNhanVien'),
    path('themNhanVien/', themNhanVien, name='themNhanVienMoDel'),
    path('listnv/', list_nhanvien, name='dsNV'),
    path("", views.index, name="index"),
    path('dsPB/', dsPB, name='dsPB'),
    path('dsCV/', dsCV, name='dsCV'),

]
