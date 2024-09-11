from django.shortcuts import render
# from django.http import HttpResponseRedirect, HttpResponse
# from django.urls import reverse

from trangchu.views import check_session

# Create your views here.
@check_session
def index(request):
    if request.session.get("member_id"):
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "sanpham/index.html", context)
  

@check_session
def nhacungcap(request):
    if request.session.get("member_id"):
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "sanpham/nhacungcap.html", context)
   

@check_session
def nhanhang(request):
    if request.session.get("member_id"):
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "sanpham/nhanhang.html", context)


   
