from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from trangchu.views import check_session
from api.views import api_dsNV

# Create your views here.
@check_session
def index(request):
    if request.session.get("member_id"):
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "nhanvien/index.html", context)
@csrf_exempt
def dsNV(request):
    data = api_dsNV(request)
    return JsonResponse(data, safe=False)