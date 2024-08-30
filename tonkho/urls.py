from django.urls import path

from . import views
from .views import api_tonkho

app_name = "tonkho"
urlpatterns = [
    path("home", views.index, name="index"),
    path("api_tonkho", api_tonkho, name="api_tonkho"),
    path("phieuxuatloidongbo", views.phieuxuatloidongbo, name="phieuxuatloidongbo"),
]