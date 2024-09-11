from django.urls import path

from . import views

app_name = "khachhang"
urlpatterns = [
    path("", views.index, name="index"),
]
