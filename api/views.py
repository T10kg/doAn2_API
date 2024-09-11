from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from datetime import datetime



# def list_nhanvien(request):
    
#     with connection.cursor() as cursor:
#         cursor.execute("SELECT maNV,tenNV,gioiTinh,Diachi,Ngaysinh,Sdt,soCMT,Email,nguoitao,maPB, maCV FROM nhanviens ")
#         data = cursor.fetchall()
#         data_list=[]
#         for row in data:
#             ngaysinh =row[4]
#             hello = ngaysinh.strftime("%d-%m-%Y")
#             coincard={'maNV': row[0], 'tenNV': row[1],'gioiTinh': row[2],'Diachi': row[3],'ngaySinh': hello,'Sdt': row[5],'soCMT': row[6], 'Email': row[7], 'nguoitao': row[8]}
#             data_list.append(coincard) 
#         return JsonResponse(data_list, safe=False)



def search_nhanvien(request):
    search_query = request.GET.get('search', '')  # Lấy tham số 'search' từ query string

    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT maNV, tenNV, gioiTinh, Diachi, Ngaysinh, Sdt, soCMT, Email, nguoitao 
            FROM nhanviens 
            WHERE maNV LIKE %s OR tenNV LIKE %s
            """, 
            ['%' + search_query + '%', '%' + search_query + '%']
        )

        data = cursor.fetchall()
        data_list = [
            {'maNV': row[0], 'tenNV': row[1], 'gioiTinh': row[2], 'Diachi': row[3], 'Ngaysinh': row[4], 
             'Sdt': row[5], 'soCMT': row[6], 'Email': row[7], 'nguoitao': row[8]}
            for row in data
        ]

    return JsonResponse(data_list, safe=False)


@csrf_exempt
def themNhanVienMoDel(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            ngaysinh =data['Ngaysinh']
            date = datetime.strptime(ngaysinh, "%d-%m-%Y")
            hello = date.strftime("%Y-%m-%d")
            
            print(data)
            with connection.cursor() as cursor:
                cursor.execute("SELECT COUNT(*) FROM nhanviens WHERE maNV = %s", [data['maNV']])
                count = cursor.fetchone()[0]
                if count == 0:
                    cursor.execute(
                        "INSERT INTO nhanviens(maNV, tenNV, Manhomnd, Matkhau, Diachi, gioiTinh, Ngaysinh, Dantoc, Sdt, Email, Honnhan, soCMT, Noicap, Tongiao, Quoctich, MaCV, maPB, anhNV, loainv, nguoitao, maTC) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                        [data['maNV'], data['tenNV'], data['Manhomnd'], data['Matkhau'], data['Diachi'], data['gioiTinh'], hello, data['Dantoc'], data['Sdt'], data['Email'], data['Honnhan'], data['soCMT'], data['Noicap'], data['Tongiao'], data['Quoctich'], data['MaCV'], data['maPB'], data['anhNV'], data['loainv'], data['nguoitao'], data['maTC']]
                    )
            return JsonResponse(data)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Dữ liệu gửi lên không phải là JSON hợp lệ.'}, status=400)
    return JsonResponse({'error': 'Chỉ hỗ trợ phương thức POST.'}, status=405)


class MyAPI(APIView):  # Đổi tên lớp để tránh xung đột với APIView
    def post(self, request, *args, **kwargs):
        name = themNhanVienMoDel(request)
        if name:
            with connection.cursor() as cursor:
                cursor.execute("SELECT COUNT(*) FROM api WHERE name = %s", [name])
                count = cursor.fetchone()[0]
                if count == 0:
                    cursor.execute(
                        "INSERT INTO api (name) VALUES (%s)",
                        [name]
                    )
                    return Response({'ketqua': True}, status=status.HTTP_200_OK)
                else:
                    return Response({'ketqua': False}, status=status.HTTP_200_OK)
        return Response({'error': 'No name provided'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM api")
            data = cursor.fetchall()
            data_list = [
                {'name': row[0]}
                for row in data
            ]
            return Response(data_list, status=status.HTTP_200_OK)



# @csrf_exempt
# def chinhSuaNhanVienModel(request):
#     if request.method == 'PUT':
#         try:
#             data = json.loads(request.body)
#             maNV = data.get('maNV')
#             maNVCu = data.get('maNVCu')
            
#             if not maNV or not maNVCu:
#                 return JsonResponse({'error': 'Thiếu thông tin mã nhân viên'}, status=400)
            
#             with connection.cursor() as cursor:
#                 # Sử dụng câu lệnh dưới để in câu truy vấn với các giá trị thực tế
#                 cursor.execute(
#                     "UPDATE nhanviens SET maNV= %s, tenNV = %s, gioiTinh = %s, Diachi = %s, Ngaysinh = %s, Dantoc = %s, Sdt = %s, Email = %s, Honnhan = %s, Noicap = %s, Tongiao = %s, Quoctich = %s, MaCV = %s, maPB = %s, loainv = %s WHERE maNV = %s",
#                     [data.get('maNV'), data.get('tenNV'), data.get('gioiTinh'), data.get('diachi'), data.get('ngaySinh'), data.get('dantoc'), data.get('soDT'), data.get('Email'), data.get('honnhan'), data.get('noicap'), data.get('tongiao'), data.get('Quoctich'), data.get('MaCV'), data.get('maPB'), data.get('loainv'), data.get('maNVCu')]
#                 )
#             return JsonResponse({'message': 'Cập nhật thành công'})
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Dữ liệu gửi lên không phải là JSON hợp lệ.'}, status=400)
#     return JsonResponse({'error': 'Chỉ hỗ trợ phương thức PUT.'}, status=405)

@csrf_exempt
def chinhSuaNhanVienModel(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            maNV = data.get('maNV')
            maNVCu = data.get('maNVCu')
            
            if not maNV or not maNVCu:
                return JsonResponse({'error': 'Thiếu thông tin mã nhân viên'}, status=400)
            
            ngaysinh = data.get('ngaySinh')
            if ngaysinh:
                # Chuyển đổi định dạng ngày sinh từ "dd-mm-yyyy" sang "yyyy-mm-dd"
                date = datetime.strptime(ngaysinh, "%d-%m-%Y")
                hello = date.strftime("%Y-%m-%d")
            else:
                hello = None  # Nếu không có ngày sinh, gán giá trị None
            
            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE nhanviens SET maNV= %s, tenNV = %s, gioiTinh = %s, Diachi = %s, Ngaysinh = %s, Dantoc = %s, Sdt = %s, Email = %s, Honnhan = %s, Noicap = %s, Tongiao = %s, Quoctich = %s, MaCV = %s, maPB = %s, loainv = %s WHERE maNV = %s",
                    [maNV, data.get('tenNV'), data.get('gioiTinh'), data.get('diachi'), hello, data.get('dantoc'), data.get('soDT'), data.get('Email'), data.get('honnhan'), data.get('noicap'), data.get('tongiao'), data.get('Quoctich'), data.get('MaCV'), data.get('maPB'), data.get('loainv'), maNVCu]
                )
            return JsonResponse({'message': 'Cập nhật thành công'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Dữ liệu gửi lên không phải là JSON hợp lệ.'}, status=400)
    return JsonResponse({'error': 'Chỉ hỗ trợ phương thức PUT.'}, status=405)

@csrf_exempt
def xoaNhanVienModel(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            ma_nv = data.get('maNV')
            
            with connection.cursor() as cursor:
                cursor.execute("SELECT COUNT(*) FROM nhanviens WHERE maNV = %s", [ma_nv])
                count = cursor.fetchone()[0]
                
                if count > 0:
                    cursor.execute("DELETE FROM nhanviens WHERE maNV = %s", [ma_nv])
                    return JsonResponse({'message': 'Xóa nhân viên thành công'})
                else:
                    return JsonResponse({'error': 'Nhân viên không tồn tại'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Dữ liệu gửi lên không phải là JSON hợp lệ.'}, status=400)
    return JsonResponse({'error': 'Chỉ hỗ trợ phương thức POST.'}, status=405)




@csrf_exempt
def themSanPhamMoDel(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            with connection.cursor() as cursor:
                cursor.execute("SELECT COUNT(*) FROM sanphams WHERE Masanpham = %s", [data['Masanpham']])
                count = cursor.fetchone()[0]
                if count == 0:
                    cursor.execute(
                        "INSERT INTO sanphams (Masanpham, tensp, Mansx, gia_ban, gia_nhap, chietkhau, Giakm, Url, Mota, Linksp, Manhom, Madonvi, xx, MaSP, loaisp, maTC) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                        [data['Masanpham'], data['tensp'], data['Mansx'], data['gia_ban'], data['gia_nhap'], data['chietkhau'], data['Giakm'], data['Url'], data['Mota'], data['Linksp'], data['Manhom'], data['Madonvi'], data['xx'], data['MaSP'], data['loaisp'], data['maTC']]
                    )
            return JsonResponse(data)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Dữ liệu gửi lên không phải là JSON hợp lệ.'}, status=400)
    return JsonResponse({'error': 'Chỉ hỗ trợ phương thức POST.'}, status=405)



