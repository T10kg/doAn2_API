from django.urls import path

from . import views

app_name = "sanpham"
urlpatterns = [
    path("", views.index, name="index"),
    path("nhacungcap", views.nhacungcap, name="nhacungcap"),
    path("nhanhang", views.nhanhang, name="nhanhang"),
]