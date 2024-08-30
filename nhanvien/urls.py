from django.urls import path

from . import views

app_name = "nhanvien"
urlpatterns = [
    path("", views.index, name="index"),
    path("dsNV/", views.dsNV, name="dsNV")
]