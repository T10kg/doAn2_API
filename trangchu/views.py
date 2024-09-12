
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse

def login(request):
    # Kiểm tra xem người dùng đã đăng nhập chưa
    if 'member_id' in request.session:
        return HttpResponseRedirect(reverse('trangchu:index'))
    

    if request.method == 'POST':
        Name = request.POST.get('name')
        Pass = request.POST.get('password')
        if Name and Pass:

            # Kiểm tra tài khoản và mật khẩu
            if Name == 'admin' and Pass == '123':
                request.session.set_expiry(30000)
                request.session["member_id"] = Name
                return HttpResponseRedirect(reverse('trangchu:index'))
            else:
                # Thông báo lỗi khi đăng nhập không thành công
                context = {'error': 'Tên người dùng hoặc mật khẩu không đúng.'}
                return render(request, "auth/login.html", context)
    
    # GET request or invalid POST
    return render(request, "auth/login.html")


def logout(request):
    try:
        del request.session["member_id"]
    except KeyError:
        pass
    return HttpResponseRedirect(reverse('trangchu:login'))


# Kiểm tra session đã đăng nhập hay chưa
def check_session(view_func):
    def wrapper(request, *args, **kwargs):
        if 'member_id' in request.session:
            return view_func(request, *args, **kwargs)
        else:

            return HttpResponseRedirect(reverse('trangchu:login'))
    return wrapper

@check_session
def index(request):

    context = {
        "user_name": request.session.get("member_id")
    }
    return render(request, "trangchu/index.html", context)

