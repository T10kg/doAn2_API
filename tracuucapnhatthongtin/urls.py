from django.urls import path

from . import views

app_name = "tracuucapnhatthongtin"
urlpatterns = [
    path("tracuucapnhat", views.index, name="index"),
    path("tracuuthongtin", views.tracuuthongtin, name="tracuuthongtin"),
]