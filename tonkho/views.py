from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import urllib3

from trangchu.views import check_session
from .services import trave_dulieu_datagrid, trave_dulieu_datagrid_test

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
  
# Create your views here.
@csrf_exempt
async def api_tonkho(request):
    external_url = 'http://bigfile.dstsoft.vn/kho/tonkhos/taiDuLieutk_test'
    return await trave_dulieu_datagrid(request, external_url)

# Giao diện
@check_session
def index(request):
    if request.session.get("member_id"):
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "tonkho/index.html", context)
    
@check_session
def phieuxuatloidongbo(request):
    if request.session.get("member_id"):
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "tonkho/phieuxuatloi.html", context)


