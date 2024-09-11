from django.urls import path

from . import views

app_name = "ghinokh"
urlpatterns = [
    path("", views.index, name="index"),
]