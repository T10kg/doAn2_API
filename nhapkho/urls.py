from django.urls import path

from . import views

app_name = "nhapkho"
urlpatterns = [
    path("", views.index, name="index"),
]