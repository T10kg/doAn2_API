from django.shortcuts import render
# from django.http import HttpResponseRedirect, HttpResponse
# from django.urls import reverse
from django.db import connection
from trangchu.views import check_session
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from . import models

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
@csrf_exempt
def ncc(request):
    data = [
            {"Mansx":"67","Tennsx":"DST","diachi":"C\u1ea7n Th\u01a1","Sdt":"","maTC":"35"},
            {"Mansx":"96","Tennsx":"bcn","diachi":"tay ban nha","Sdt":"123456789","maTC":"35"},
            {"Mansx":"106","Tennsx":"Nhap ten nha cung cap","diachi":"Can tho","Sdt":"","maTC":"35"},
            {"Mansx":"313","Tennsx":"C\u00f4ng ty TNHH D\u01b0\u1ee3c s\u0129 Ti\u1ebfn- chi nh\u00e1nh s\u1ea3n xu\u1ea5t m\u1ef9 ph\u1ea9m H\u1eadu Giang","diachi":"H\u1eadu Giang","Sdt":"","maTC":"35"}
         ]
    return JsonResponse(data, safe=False)



@csrf_exempt
def nhomsps(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT manhom, tennhom FROM nhomsps
        """)
        data = cursor.fetchall()
        data_list = []
        for row in data:
            dulieu = {
                'manhom': row[0],  # Madvt
                'tennhom': row[1],  # Tendvt
            }
            data_list.append(dulieu)

    return JsonResponse(data_list, safe=False)

@csrf_exempt
def donvitinhs(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT Madvt, Tendvt FROM donvitinhs
        """)
        data = cursor.fetchall()
        data_list = []
        for row in data:
            dulieu = {
                'Madvt': row[0],  # Madvt
                'Tendvt': row[1],  # Tendvt
            }
            data_list.append(dulieu)

    return JsonResponse(data_list, safe=False)

@csrf_exempt
def loaisp(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT maloaisp, tenloaisp FROM loaisps
        """)
        data = cursor.fetchall()
        data_list = []
        for row in data:
            dulieu = {
                'maloaisp': row[0],  # Madvt
                'tenloaisp': row[1],  # Tendvt
            }
            data_list.append(dulieu)

    return JsonResponse(data_list, safe=False)
        
@csrf_exempt
def list_sanpham(request):
    with connection.cursor() as cursor:
        # Truy vấn kết hợp bảng sanphams và nhomsps để lấy tên nhóm thay vì mã nhóm
        cursor.execute("""
            SELECT sp.Masanpham, sp.tensp, nh.tennhom, tsp.tenloaisp, sp.gia_nhap, sp.gia_ban, dv.Tendvt, sp.Mota, sp.Mansx, sp.chietkhau
            FROM sanphams sp
            JOIN nhomsps nh ON sp.Manhom = nh.manhom
            JOIN donvitinhs dv ON sp.Madonvi = dv.Madvt
            JOIN loaisps tsp ON sp.loaisp = tsp.maloaisp
        """) # 
        data = cursor.fetchall()
        data_list = []
        
        for row in data:
            dulieu = {
                'MaSP': row[0],
                'tensp': row[1],
                'tennhom': row[2],  # Hiển thị tên nhóm từ bảng nhomsps
                'tenloaisp': row[3],
                'gia_nhap': row[4],
                'gia_ban': row[5],
                'Tendvt': row[6],
                'Mota': row[7],
                'Mansx': row[8],
                'chietkhau': row[9]
            }
            data_list.append(dulieu)
        print(data_list)
    return JsonResponse(data_list, safe=False)

@csrf_exempt
def themSP(request):
    if request.method == "POST":
        try:
            # Lấy dữ liệu từ body của request (ở dạng JSON)
            tmp = json.loads(request.body)
            
            # Lấy các giá trị từ dữ liệu gửi lên
            maSP = tmp.get('MaSP', '')
            tenSP = tmp.get('ten', '')
            loaiSP = tmp.get('loaisp', '')
            giaBan = tmp.get('giaban', 0)
            giaNhap = tmp.get('gianhap', 0)
            chietKhau = tmp.get('chietkhau', 0)
            moTa = tmp.get('mota', '')
            xFilePath = tmp.get('xFilePath', 'img.text')  # Đường dẫn file ảnh nếu cần
            mansx = tmp.get('Mansx', '')
            manhom = tmp.get('manhom', '')
            madonvi = tmp.get('mdonvi', '')

            # Gọi hàm themSPModel để thêm sản phẩm
            if models.themSPModel(maSP, tenSP, loaiSP, giaBan, giaNhap, chietKhau, moTa, xFilePath, mansx, manhom, madonvi):
                return JsonResponse({"success": f"Thêm Thành Công Sản Phẩm {tenSP}"}, status=200)
            else:
                return JsonResponse({"error": "Không Thành Công! Sản Phẩm Đã Tồn Tại"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu không hợp lệ"}, status=400)

    return JsonResponse({"error": "Phương thức không hợp lệ"}, status=405)


@csrf_exempt
def suasp(request):
    if request.method == "POST":
        try:
            # Lấy dữ liệu từ body của request (ở dạng JSON)
            tmp = json.loads(request.body)
            
            # Lấy các giá trị từ dữ liệu gửi lên
            maSP = tmp.get('MaSP', '')
            tenSP = tmp.get('ten', '')
            loaiSP = tmp.get('loaisp', '')
            giaBan = tmp.get('giaban', 0)
            giaNhap = tmp.get('gianhap', 0)
            chietKhau = tmp.get('chietkhau', 0)
            moTa = tmp.get('mota', '')
            xFilePath = tmp.get('xFilePath', 'img.text')  # Đường dẫn file ảnh nếu cần
            mansx = tmp.get('Mansx', '')
            manhom = tmp.get('manhom', '')  # Nhận tên nhóm từ client
            madonvi = tmp.get('mdonvi', '')

            # Tìm mã nhóm dựa trên tên nhóm
            with connection.cursor() as cursor:
                cursor.execute("SELECT manhom FROM nhomsps WHERE tennhom = %s", [manhom])
                row = cursor.fetchone()
                
                if row:
                    manhom = row[0]  # Gán mã nhóm lấy được

            with connection.cursor() as cursor:
                cursor.execute("SELECT Madvt FROM donvitinhs WHERE Tendvt = %s", [madonvi])
                row = cursor.fetchone()
                
                if row:
                    madonvi = row[0]  # Gán mã đơn vị lấy được

            # Gọi hàm suaspModel để cập nhật sản phẩm
            if models.suaspModel(maSP, tenSP, loaiSP, giaBan, giaNhap, chietKhau, moTa, xFilePath, mansx, manhom, madonvi):
                return JsonResponse({"success": f"Cập nhật thành công sản phẩm {tenSP}"}, status=200)
            else:
                return JsonResponse({"error": "Cập nhật không thành công! Sản phẩm không tồn tại"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu không hợp lệ"}, status=400)

    return JsonResponse({"error": "Phương thức không hợp lệ"}, status=405)

@csrf_exempt
def xoaSP(request):
    if request.method == 'POST':
        try:
            # Parse request body as JSON
            data = json.loads(request.body)
            maSP = data.get('maSP')
            print(maSP)
            if not maSP:
                return JsonResponse({'error': 'Thiếu mã sản phẩm'}, status=400)

            # Call the model function to delete the product
            if models.xoaSPModel(maSP):
                return JsonResponse({'message': 'Xóa sản phẩm thành công'}, status=200)
            else:
                return JsonResponse({'error': 'Sản phẩm không tồn tại'}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Dữ liệu không hợp lệ'}, status=400)

    return JsonResponse({'error': 'Phương thức không hợp lệ. Chỉ hỗ trợ POST.'}, status=405)


@csrf_exempt
def list_nhomsanpham(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT manhom, tennhom, mota FROM nhomsps")
        data = cursor.fetchall()
        data_list = []
        
        for row in data:
            dulieu = {
                'manhom': row[0],
                'tennhom': row[1],
                'mota': row[2],
            }
            data_list.append(dulieu)
    
    return JsonResponse(data_list, safe=False)



@csrf_exempt
def themNhomSP(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            tenNhom = data.get('tenNhom', '')
            moTa = data.get('moTa', '')
            maTC = data.get('maTC', '')

            if not tenNhom:
                return JsonResponse({"error": "Tên nhóm không được để trống"}, status=400)

            # Thêm nhóm sản phẩm vào cơ sở dữ liệu
            if models.themNhomSPModel(tenNhom, moTa, maTC):
                return JsonResponse({"success": f"Thêm thành công nhóm sản phẩm {tenNhom}"}, status=200)
            else:
                return JsonResponse({"error": "Không thành công! Nhóm sản phẩm đã tồn tại"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu không hợp lệ"}, status=400)

    return JsonResponse({"error": "Phương thức không hợp lệ"}, status=405)

@csrf_exempt
def capnhatNhomSP(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            maNhom = data.get('maNhom', '')
            tenNhom = data.get('tenNhom', '')
            moTa = data.get('moTa', '')

            if not tenNhom:
                return JsonResponse({"error": "Tên nhóm không được để trống"}, status=400)

            # Cập nhật nhóm sản phẩm
            if models.capnhatNhomSPModel(maNhom, tenNhom, moTa):
                return JsonResponse({"success": "Cập nhật nhóm sản phẩm thành công"}, status=200)
            else:
                return JsonResponse({"error": "Không thành công"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu không hợp lệ"}, status=400)

    return JsonResponse({"error": "Phương thức không hợp lệ"}, status=405)

@csrf_exempt
def xoaNhomSP(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            maNhom = data.get('maNhom', '')

            # Xóa nhóm sản phẩm
            if models.xoaNhomSPModel(maNhom):
                return JsonResponse({"success": "Xóa nhóm sản phẩm thành công"}, status=200)
            else:
                return JsonResponse({"error": "Không thành công"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dữ liệu không hợp lệ"}, status=400)

    return JsonResponse({"error": "Phương thức không hợp lệ"}, status=405)
