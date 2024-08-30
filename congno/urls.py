from django.urls import path

from . import views

app_name = "congno"
urlpatterns = [
    path("congnoncc/", views.congnoncc, name="congnoncc"),
    path("congnokh/", views.congnokh, name="congnokh"),
]