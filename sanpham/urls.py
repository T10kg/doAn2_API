from django.urls import path
from . import views

app_name = "sanpham"
urlpatterns = [
    path('xoaSP/', views.xoaSP, name='xoaSP'),
    path('suaSP/', views.suasp, name='suaSP'),
    path('loaisp/', views.loaisp, name='loaisp'),
    path('ncc/', views.ncc, name='ncc'),
    path('nhomsps/', views.nhomsps, name='nhomsps'),
    path('donvitinhs/', views.donvitinhs, name='donvitinhs'),
    path('list_sanpham/', views.list_sanpham, name='list_sanpham'),
    path('list_nhomsanpham/', views.list_nhomsanpham, name='list_nhomsanpham'),
    path('themSP/', views.themSP, name='themSP'),
    path("", views.index, name="index"),
    path("nhacungcap", views.nhacungcap, name="nhacungcap"),
    path("nhanhang", views.nhanhang, name="nhanhang"),
    path('capnhatNhomSP/', views.capnhatNhomSP, name='capnhatNhomSP'),
    path('themNhomSP/',  views.themNhomSP, name=' themNhomSP'),
    path('xoaNhomSP/', views.xoaNhomSP, name='xoaNhomSP'),
]