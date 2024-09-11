from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from datetime import datetime
from django.shortcuts import render
from trangchu.views import check_session
from . import models



@csrf_exempt
def dsPB(request):
    data=[
        {"maPB":"14","tenPB":"B\u1ed9 ph\u1eadn IT","maTC":"2"},
        {"maPB":"15","tenPB":"B\u1ed9 ph\u1eadn h\u00e0nh ch\u00ednh","maTC":"2"},
        {"maPB":"16","tenPB":"B\u1ed9 ph\u1eadn K\u1ebf To\u00e1n","maTC":"2"},{"maPB":"17","tenPB":"B\u1ed9 ph\u1eadn KT Vi\u00ean","maTC":"2"},{"maPB":"18","tenPB":"B\u1ed9 ph\u1eadn TV Vi\u00ean","maTC":"2"},{"maPB":"19","tenPB":"Ban gi\u00e1m \u0111\u1ed1c","maTC":"2"},{"maPB":"20","tenPB":"B\u1ed9 ph\u1eadn b\u00e1n h\u00e0ng","maTC":"2"},{"maPB":"21","tenPB":"B\u1ed9 ph\u1eadn b\u1ea3o v\u1ec7","maTC":"2"},{"maPB":"22","tenPB":"B\u1ed9 ph\u1eadn l\u1ec5 t\u00e2n","maTC":"2"},{"maPB":"29","tenPB":"B\u1ed9 Ph\u1eadn Kho","maTC":"2"},
        {"maPB":"30","tenPB":"B\u1ed9 Ph\u1eadn QC","maTC":"2"},{"maPB":"31","tenPB":"B\u1ed9 Ph\u1eadn QA","maTC":"2"}
    ]
    return JsonResponse(data, safe=False)

@csrf_exempt
def dsCV(request):
    data = [
        {"MaCV": "1", "tenCV": "Giám Đốc"},
        {"MaCV": "2", "tenCV": "Quản lý"},
        {"MaCV": "3", "tenCV": "Trưởng bộ phận"},
        {"MaCV": "4", "tenCV": "Nhân viên"},
        {"MaCV": "5", "tenCV": "CTV"},
        {"MaCV": "6", "tenCV": "Sales"},
        {"MaCV": "7", "tenCV": "Telesales"},
        {"MaCV": "8", "tenCV": "KTV"},
        {"MaCV": "9", "tenCV": "BS-DS"},
        {"MaCV": "10", "tenCV": "Khác"},
        {"MaCV": "11", "tenCV": "Tư vấn và Brand marketing"}
    ]
    return JsonResponse(data, safe=False)

@check_session
def index(request):
    data =list_nhanvien(request)
    print(data)
    return render(request, "nhanvien/index.html", {'data': data})


@csrf_exempt
def list_nhanvien(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT maNV, tenNV, gioiTinh, Diachi, Ngaysinh, Sdt, soCMT, Email, nguoitao, maPB, maCV, Noicap FROM nhanviens")
        data = cursor.fetchall()
        data_list = []
        for row in data:
            ngaysinh = row[4]
            if ngaysinh:
                hello = ngaysinh.strftime("%d-%m-%Y")
            else:
                hello = ''
            
            # Thay mã CV bằng tên CV từ dictionary

            dulieu = {
                'maNV': row[0],
                'tenNV': row[1],
                'gioiTinh': row[2],
                'Diachi': row[3],
                'ngaySinh': hello,
                'Sdt': row[5],
                'soCMT': row[6],
                'Email': row[7],
                'nguoitao': row[8],
                'maPB': row[9],
                'MaCV': row[10],  # Sử dụng tên CV thay vì mã CV
                'Noicap': row[11]
            }
            data_list.append(dulieu)
    return JsonResponse(data_list, safe=False)

@csrf_exempt
def themNhanVien(request):
    if request.method == "POST":
        try:
            tmp = json.loads(request.body)
            maNV = tmp.get('maNV', '')
            tenNV = tmp.get('tenNV', '')
            gioiTinh = tmp.get('gioiTinh', '')
            diachi = tmp.get('Diachi', '')
            ngaySinh = tmp.get('ngaySinh', '')
            dantoc = tmp.get('Dantoc', 'Kinh')
            soDT = tmp.get('soDT', '').strip()
            soCMT = tmp.get('soCMT', '')
            email = tmp.get('Email', '')
            honnhan = tmp.get('Honnhan', '')
            Noicap = tmp.get('Noicap', '')
            matKhau = tmp.get('matKhau', '')
            quoctich = tmp.get('Quoctich', 'Việt Nam')
            tongiao = tmp.get('Tongiao', '')
            maCV = tmp.get('MaCV', '')
            maPB = tmp.get('maPB', '')
            loainv = tmp.get('loainv', '')
            maTC = '1'

            # Chuyển đổi ngày sinh
            try:
                date_obj = datetime.strptime(ngaySinh, "%d-%m-%Y")
                ngaySinh = date_obj.strftime("%Y-%m-%d")  # Chuyển thành định dạng YYYY-MM-DD
            except ValueError:
                return JsonResponse({"error": "Định dạng ngày sinh không hợp lệ. Vui lòng nhập theo định dạng DD-MM-YYYY."}, status=400)

            # Kiểm tra ngày sinh
            if date_obj >= datetime.now():
                return JsonResponse({"error": "Ngày sinh phải nhỏ hơn ngày hiện tại"}, status=400)

            # Thêm nhân viên
            if models.themNVModel(maNV, tenNV, matKhau, diachi, gioiTinh, ngaySinh, dantoc, soDT, email, honnhan, soCMT, Noicap, tongiao, quoctich, maCV, maPB, loainv, maTC):
                return JsonResponse({"success": f"Thêm Thành Công Nhân Viên {tenNV}"}, status=200)
            else:
                return JsonResponse({"error": "Không Thành Công! Nhân Viên Đã Tồn Tại"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu không hợp lệ"}, status=400)

    return JsonResponse({"error": "Phương thức không hợp lệ"}, status=405)



@csrf_exempt
def capNhatNhanVien(request):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            maNV = data.get('maNV')
            maNVCu = data.get('maNVCu')

            if not maNV or not maNVCu:
                return JsonResponse({'error': 'Thiếu thông tin mã nhân viên'}, status=400)
            # Lấy dữ liệu từ request
            maNV = data.get('maNV', '')
            tenNV = data.get('tenNV', '')
            gioiTinh = data.get('gioiTinh', '')
            diachi = data.get('diachi', '')  # Sửa chính tả
            ngaySinh = data.get('ngaySinh', '')
            dantoc = data.get('dantoc', 'Kinh')
            soDT = data.get('soDT', '').strip()
            soCMT = data.get('soCMT', '')
            email = data.get('Email', '')  # Đổi thành Email
            honnhan = data.get('honnhan', '')
            Noicap = data.get('Noicap', '')  # Sửa chính tả
            quoctich = data.get('quoctich', 'Việt Nam')
            tongiao = data.get('tongiao', '')
            maCV = data.get('MaCV', '')
            maPB = data.get('maPB', '')
            loainv = data.get('loainv', '')
            maTC = '0'
            # Chuyển đổi ngày sinh
            try:
                date_obj = datetime.strptime(ngaySinh, "%d-%m-%Y")
                ngaySinh = date_obj.strftime("%Y-%m-%d")
            except ValueError:
                return JsonResponse({"error": "Định dạng ngày sinh không hợp lệ. Vui lòng nhập theo định dạng DD-MM-YYYY."}, status=400)

            if date_obj >= datetime.now():
                return JsonResponse({"error": "Ngày sinh phải nhỏ hơn ngày hiện tại."}, status=400)
            print(maNV)
            print(maNVCu)
            # Cập nhật nhân viên
            if models.chinhSuaNhanVienModel(maNV, tenNV, diachi, gioiTinh, ngaySinh, dantoc, soDT, email, honnhan, soCMT, Noicap, tongiao, quoctich, maCV, maPB, loainv, maTC, maNVCu):
                return JsonResponse({"success": f"Cập nhật thành công nhân viên {tenNV}"}, status=200)
            else:
                return JsonResponse({"error": "Không thành công! Nhân viên không tồn tại hoặc thông tin không hợp lệ."}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu không hợp lệ."}, status=400)

    return JsonResponse({"error": "Phương thức không hợp lệ."}, status=405)


@csrf_exempt
def xoaNhanVien(request):
    if request.method == 'POST':
        try:
            # Parse request body as JSON
            data = json.loads(request.body)
            maNV = data.get('maNV')

            if not maNV:
                return JsonResponse({'error': 'Thiếu mã nhân viên'}, status=400)

            # Gọi hàm xóa nhân viên trong database
            if models.xoaNhanVienModel(maNV):
                return JsonResponse({'message': 'Xóa nhân viên thành công'}, status=200)
            else:
                return JsonResponse({'error': 'Nhân viên không tồn tại'}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Dữ liệu không hợp lệ'}, status=400)

    return JsonResponse({'error': 'Phương thức không hợp lệ. Chỉ hỗ trợ POST.'}, status=405)
