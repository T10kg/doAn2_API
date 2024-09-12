from django.urls import path
from .views import duLieuKho
from . import views

app_name = "khohang"
urlpatterns = [
    path("", views.index, name="index"),
    path("duLieuKho/", duLieuKho.as_view(), name="duLieuKho"),
    path("themthongtinkho/", views.themthongtinkho, name="themthongtinkho"),
    path("suathongtinkho/", views.suathongtinkho, name="suathongtinkho"),
    path("xoathongtinkho/", views.xoathongtinkho, name="xoathongtinkho"),
    path("nhanvienquanlykho/<int:id>/", views.nhanvienquanlykho, name="nhanvienquanlykho"),
    path("themnhanvienquanlykho/", views.themnhanvienquanlykho, name="themnhanvienquanlykho"),
    path("xoanhanvienquanlykho/", views.xoanhanvienquanlykho, name="xoanhanvienquanlykho"),
    path("themsanphamkho/", views.themsanphamkho, name="themsanphamkho"),
    path("xoasanphamkho/", views.xoasanphamkho, name="xoasanphamkho"),
    path("sanphamkho/<int:id>/", views.sanphamkho, name="sanphamkho"),
    path("list_sp/", views.list_sp, name="list_sp")

]