from django.urls import path
from . import views

app_name = "khachhang"
urlpatterns = [
    path("", views.index, name="index"),
    path("danhsachtinh/", views.danhsachtinh, name = "danhsachtinh"),
    path("danhsachhuyen/", views.danhsachhuyen, name = "danhsachhuyen"),
    path("dsh/", views.dsh, name="dsh"),
    path("dsnguonKH/", views.dsnguonKH, name = "dsnguonKH"),
    path("nguoipt/", views.nguoipt, name = "nguoipt"),
    path("nhomkh/", views.nhomkh, name = "nhomkh"),
    path("moiqh/", views.moiqh, name = "moiqh"),
    path("themKH/", views.themKH, name='them_kh'),
    path("dsnhomKH/", views.dsnhomKH, name='dsnhomKH'),
    path("taidulieunvpt/", views.taidulieunvpt, name='taidulieunvpt'),
    path("taiDuLieuSN/", views.taiDuLieuSN, name='taiDuLieuSN'),
    path("khachhangpckh/", views.khachhangpckh, name='khachhangpckh'),
    path("taiduphancapkh/", views.taiduphancapkh, name='taiduphancapkh'),
]