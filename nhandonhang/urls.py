from django.urls import path

from . import views

app_name = "nhandonhang"
urlpatterns = [
    path("", views.index, name="index"),
]