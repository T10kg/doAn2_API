from django.urls import path

from . import views

app_name = "khohang"
urlpatterns = [
    path("", views.index, name="index"),
]