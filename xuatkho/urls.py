from django.urls import path

from . import views

app_name = "xuatkho"
urlpatterns = [
    path("", views.index, name="index"),
]