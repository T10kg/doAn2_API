from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from api.views import taofile,tontai,xoafile,docfile
from datetime import datetime
# Create your views here.

def login(request):
    if request.method == 'POST':
        Name = request.POST.get('name')
        Pass = request.POST.get('password')
        if Name and Pass:
            if Name == 'admin' and Pass == '123':

                request.session.set_expiry(30000)
                request.session["member_id"] = Name
                request.session['infonv'] = [
                    {"nhanviens": {'maTC': '123'}}
                ]
                return HttpResponseRedirect(reverse('trangchu:index'))
        else:
            return render(request, "auth/login.html")

    if request.method == 'GET':
        return render(request, "auth/login.html")
    
def logout(request):
    try:
        del request.session["member_id"]
    except KeyError:
        pass
    return HttpResponseRedirect(reverse('trangchu:login'))

# kiểm tra đã login hay chưa
def check_session(view_func):
    def wrapper(request, *args, **kwargs):
        # Kiểm tra xem session có tồn tại không
        if 'member_id' in request.session:
            # Nếu session tồn tại, cho phép truy cập vào view
            return view_func(request, *args, **kwargs)
        else:
            # Nếu session không tồn tại, chuyển hướng về trang đăng nhập
            return HttpResponseRedirect(reverse('trangchu:login'))
    return wrapper

@check_session
def index(request):
    if request.session.get("member_id"):
        if tontai(request.session.get("member_id")):
            xoafile(request.session.get("member_id"))
            print(datetime.now())
        else:
            thoigianhientai =datetime.now()
            print(thoigianhientai)
            taofile(request.session.get("member_id"), thoigianhientai)
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "trangchu/index.html", context)
