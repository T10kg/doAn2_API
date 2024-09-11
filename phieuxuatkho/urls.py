from django.urls import path

from . import views

app_name = "phieuxuatkho"
urlpatterns = [
    path("", views.index, name="index"),
    
]