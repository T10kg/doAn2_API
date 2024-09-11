"""
URL configuration for quanlikhohang project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path




urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("trangchu.urls")),
    path("sanpham/", include("sanpham.urls")),
    path("tonkho/", include("tonkho.urls")),
    path("phieudoitra/", include("phieudoitra.urls")),
    path("tracuucapnhatthongtin/", include("tracuucapnhatthongtin.urls")),
    path("tochuc/", include("tochuc.urls")),
    path("congno/", include("congno.urls")),
    path("ghinokh/", include("ghinokh.urls")),
    path("nhandonhang/", include("nhandonhang.urls")),
    path("khohang/", include("khohang.urls")),
    path("nhanvien/", include("nhanvien.urls")),
    path("khachhang/", include("khachhang.urls")),
    path("xuatkho/", include("xuatkho.urls")),
    path("nhapkho/", include("nhapkho.urls")),
    path("phieuxuatkho/", include("phieuxuatkho.urls")),
    path("chuyenkhodaily/", include("chuyenkhodaily.urls")),
    path("chuyenkhonoibo/", include("chuyenkhonoibo.urls")),
    path('', include('hello.urls')),

    path("api/", include("api.urls")),
]

