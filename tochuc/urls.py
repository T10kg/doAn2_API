from django.urls import path

from . import views

app_name = "tochuc"
urlpatterns = [
    path("", views.index, name="index"),
]