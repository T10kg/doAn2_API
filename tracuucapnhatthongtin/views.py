from django.shortcuts import render
# from django.http import HttpResponseRedirect
# from django.urls import reverse

from trangchu.views import check_session

# Create your views here.
@check_session
def index(request):
    if request.session.get("member_id"):
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "tracuucapnhatthongtin/index.html", context)

@check_session
def tracuuthongtin(request):
    if request.session.get("member_id"):
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "tracuuthongtin/index.html", context)