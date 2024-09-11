from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, redirect
import os
from django.db import connection
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from api import models
from datetime import datetime
import requests

class dulieuNVPT(APIView):
    def get(self, request, *args, **kwargs):
        return True

def hienThiDuLieuKH(thamso, loaitimkiem):
    with connection.cursor() as cursor:
        api_url_tinh = 'http://127.0.0.1:8000/khachhang/danhsachtinh/'
        response = requests.get(api_url_tinh)
        data1 = response.json()

        api_url_huyen = 'http://127.0.0.1:8000/khachhang/dsh/'
        response = requests.get(api_url_huyen)
        data2 = response.json()

        api_url_dsnhomkh = 'http://127.0.0.1:8000/khachhang/nhomkh/'
        response = requests.get(api_url_dsnhomkh)
        data3 = response.json()

        api_url_nguoipt = 'http://127.0.0.1:8000/khachhang/nguoipt/'
        response = requests.get(api_url_nguoipt)
        data4 = response.json()
        data_list = []
        if thamso == '':
            cursor.execute(
                "SELECT MaKH, Ten, Diachi_nharieng, Dienthoai,Dc,Mahuyen,Matinh,Manhom,Manguoi_phutrach,Mota,ngaytao,Email, Namsinh FROM khachhangs")
        else:
            if loaitimkiem == 'listNhanVien':
                sql = "SELECT MaKH, Ten, Diachi_nharieng, Dienthoai,Dc,Mahuyen,Matinh,Manhom,Manguoi_phutrach,Mota,ngaytao,Email, Namsinh FROM khachhangs"
                if thamso["manv"] != "" or thamso["manhom"] != "":
                    if thamso["manv"] == "":
                        sql = sql + " WHERE Manhom = %s"
                        cursor.execute(sql, [thamso["manhom"]])
                        print(1)
                    elif thamso["manhom"] == "":
                        sql = sql + " WHERE Manguoi_phutrach = %s"
                        cursor.execute(sql, [thamso["manv"]])
                        print(2)
                    else:
                        sql = sql + " WHERE Manhom = %s AND Manguoi_phutrach = %s"
                        cursor.execute(sql, [thamso["manhom"], thamso["manv"]])
                        print(3)
                else:
                    cursor.execute(sql)
                    print(4)
            else:
                cursor.execute(
                    "SELECT MaKH, Ten, Diachi_nharieng, Dienthoai,Dc,Tenhuyen,Tentinh,Manhom,Manguoi_phutrach,Mota,ngaytao,Email, Namsinh FROM khachhangs WHERE (MaKH LIKE %s  OR  Ten LIKE %s  OR  Diachi_nharieng LIKE %s  OR   Dienthoai LIKE %s  OR Dc LIKE %s  OR Tenhuyen LIKE %s  OR Tentinh LIKE %s  OR Manhom LIKE %s  OR Manguoi_phutrach LIKE %s  OR Mota LIKE %s  OR ngaytao LIKE %s  OR Email LIKE %s  OR  Namsinh LIKE %s)",
                    [f'%{thamso}%', f'%{thamso}%', f'%{thamso}%', f'%{thamso}%', f'%{thamso}%', f'%{thamso}%',
                     f'%{thamso}%', f'%{thamso}%', f'%{thamso}%', f'%{thamso}%', f'%{thamso}%', f'%{thamso}%',
                     f'%{thamso}%']
                )
                print(5)
        thucthi = cursor.fetchall()
        for row in thucthi:
            tentinh = ''
            tenhuyen = ''
            if row[5].isdigit() and row[6].isdigit():
                for giatri in data1:
                    if str(giatri['provinceid']) == str(row[6]):
                        tentinh = giatri['name']
                        break

                for giatri in data2:
                    if str(giatri['districtid']) == str(row[5]):
                        tenhuyen = giatri['name']
                        break
            else:
                tentinh = row[6]
                tenhuyen = row[5]
            nhomkh = data3[int(row[7]) - 1]['Tennhomkh']
            for giatri in data4:
                if giatri['maNV'] == row[8]:
                    nguoiphutrach = giatri['tenNV']
                    break
            data = {
                'MaKH': row[0],
                'Ten': row[1],
                'Diachi_nharieng': row[2],
                'Dienthoai': row[3],
                'Dc': row[4],
                'tenhuyen': tenhuyen,
                'tentinh': tentinh,
                'Tennhomkh': nhomkh,
                'tennhanvien': nguoiphutrach,
                'maNV': nguoiphutrach,
                'Mota': row[9],
                'ngaytao': row[10],
                'Email': row[11],
                'Matinh': tentinh,
                'Mahuyen': tenhuyen,
                'Manhom': nhomkh,
                'ngaysinh': row[12]
            }
            data_list.append(data)
        return data_list

class dulieuKH(APIView):  # Đổi tên lớp để tránh xung đột với APIView
    def get(self, request, *args, **kwargs):
        data_list = hienThiDuLieuKH('','')
        return Response(data_list, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        timkiemtheonv_capbac = request.POST.get('timkiemtheonv_capbac')
        dulieu = request.POST.get('thamso')
        timKiemKH = request.POST.get('timKiemKH')
        thamso = ''
        loaitimkiem = ''
        if timKiemKH:
            thamso = timKiemKH
            loaitimkiem = 'thanhTimKiem'
        elif timkiemtheonv_capbac:
            thamso = json.loads(dulieu)
            loaitimkiem = 'listNhanVien'
        else:
            thamso = ''
        data_list = hienThiDuLieuKH(thamso, loaitimkiem)
        return Response(data_list, status=status.HTTP_200_OK)
def taofile(name, noidung):
    # Mở file ở chế độ ghi và đọc (write + read)
    with open("file/"+name+".txt", 'w') as file:
        # Ghi nội dung vào file
        file.write(str(noidung))

def docfile(name):
    content = ''
    with open('file/'+name+".txt" , 'r') as file:
        # Đọc toàn bộ nội dung file
        content = file.read()
    return content

def xoafile(name):
    # Đường dẫn đến file bạn muốn xóa

    # Kiểm tra nếu file tồn tại trước khi xóa
    os.remove('file/'+name+".txt")

def tontai(name):
    if os.path.exists('file/'+name+".txt"):
        return True
    return False


#-------------------------
# API nhân viên
@csrf_exempt
def api_dsNV(request):
    data = [{"maNV":"0945235992","tenNV":"Ngan","Manhomnd":"NV","Matkhau":"76844edc0e59d6ce1f4321f082d2ecad","Diachi":"C\u1ea7n Th\u01a1","gioiTinh":"N\u1eef","Ngaysinh":"2018-10-30","Dantoc":"Kinh","Sdt":"0945235992","Email":"","Honnhan":"","soCMT":"","Noicap":"","Tongiao":"","Quoctich":"Vi\u1ec7t Nam","MaCV":"2","maPB":"14","anhNV":"","loainv":"0","nguoitao":"VP1","maTC":"35"},{"maNV":"phk","tenNV":"khai","Manhomnd":"NV","Matkhau":"76844edc0e59d6ce1f4321f082d2ecad","Diachi":"c\u1ea7n th\u01a1","gioiTinh":"Nam","Ngaysinh":"2020-08-03","Dantoc":"Kinh","Sdt":"08545676554","Email":"abc@gmail.com","Honnhan":"","soCMT":"86456676","Noicap":"","Tongiao":"","Quoctich":"Vi\u1ec7t Nam","MaCV":"4","maPB":"20","anhNV":"","loainv":"0","nguoitao":"VP1","maTC":"35"},{"maNV":"truc","tenNV":"Tr\u00fac","Manhomnd":"NV","Matkhau":"0d53d20aa31746da1bd0013a31d50603","Diachi":"C\u1ea7n Th\u01a1","gioiTinh":"Nam","Ngaysinh":"1998-04-01","Dantoc":"Kinh","Sdt":"0336868280","Email":"","Honnhan":"","soCMT":"","Noicap":"","Tongiao":"","Quoctich":"Vi\u1ec7t Nam","MaCV":"10","maPB":"14","anhNV":"","loainv":"0","nguoitao":"VP1","maTC":"35"},{"maNV":"VP1","tenNV":"Ph\u00f2ng IT","Manhomnd":"NV","Matkhau":"76844edc0e59d6ce1f4321f082d2ecad","Diachi":"C\u1ea7n Th\u01a1","gioiTinh":"Nam","Ngaysinh":"2018-10-30","Dantoc":"Kinh","Sdt":"0939091497","Email":"","Honnhan":"","soCMT":"","Noicap":"","Tongiao":"","Quoctich":"Vi\u1ec7t Nam","MaCV":"2","maPB":"10","anhNV":"","loainv":"0","nguoitao":"nv1","maTC":"35"},{"maNV":"VP222","tenNV":"Team IT_DHFP","Manhomnd":"NV","Matkhau":"76844edc0e59d6ce1f4321f082d2ecad","Diachi":"C\u1ea7n th\u01a1","gioiTinh":"Nam","Ngaysinh":"2021-03-02","Dantoc":"Kinh","Sdt":"0125864972","Email":"","Honnhan":"","soCMT":"215458566544","Noicap":"C\u1ea7n th\u01a1","Tongiao":"","Quoctich":"Vi\u1ec7t Nam","MaCV":"4","maPB":"14","anhNV":"","loainv":"0","nguoitao":"VP1","maTC":"35"}]
    return data

#-------------------------
# API khách hàng
@csrf_exempt
def api_dsnhomKH(request):
    data = [{"Manhomkh":"1","Tennhomkh":"\u0110\u1ea1i L\u00fd","von":"15000000","duytrithang":"5000000","loinhuan":"25%","gioihancn":"50000000","maTC":"1","Chuthich":"C\u00f3 h\u01b0\u1edfng chi\u1ebft kh\u1ea5u"},{"Manhomkh":"2","Tennhomkh":"Kh\u00e1ch H\u00e0ng L\u1ebb","von":"","duytrithang":"","loinhuan":"","gioihancn":"5000000","maTC":"1","Chuthich":"Kh\u00f4ng \u0111\u01b0\u1ee3c h\u01b0\u1edfng chi\u1ebft kh\u1ea5u"},{"Manhomkh":"3","Tennhomkh":"Spa","von":"","duytrithang":"","loinhuan":"","gioihancn":"50000000","maTC":"1","Chuthich":"C\u00f3 h\u01b0\u1edfng chi\u1ebft kh\u1ea5u"},{"Manhomkh":"4","Tennhomkh":"C\u00f4ng ty","von":"","duytrithang":"","loinhuan":"","gioihancn":"5000000","maTC":"1","Chuthich":"C\u00f3 h\u01b0\u1edfng chi\u1ebft kh\u1ea5u"},{"Manhomkh":"5","Tennhomkh":"C\u1ed9ng t\u00e1c vi\u00ean","von":"Kh\u00f4ng c\u1ea7n v\u1ed1n","duytrithang":"Ch\u00ednh s\u00e1ch ri\u00eang","loinhuan":"Li\u00ean h\u1ec7","gioihancn":"20000000","maTC":"1","Chuthich":""},{"Manhomkh":"6","Tennhomkh":"Kh\u00e1ch s\u1ec9","von":"3 s\u1ea3n ph\u1ea9m\/1 lo\u1ea1i","duytrithang":"\u0110\u0103ng 10 b\u00e0i s\u1ea3n ph\u1ea9m","loinhuan":"10%","gioihancn":"20000000","maTC":"1","Chuthich":"C\u00f3 h\u01b0\u1edfng chi\u1ebft kh\u1ea5u"},{"Manhomkh":"7","Tennhomkh":"Chi nh\u00e1nh","von":"5000000","duytrithang":"1500000","loinhuan":"15%","gioihancn":"20000000","maTC":"1","Chuthich":"C\u00f3 h\u01b0\u1edfng chi\u1ebft kh\u1ea5u"},{"Manhomkh":"8","Tennhomkh":"T\u1ed5ng \u0111\u1ea1i l\u00fd","von":"75000000","duytrithang":"30000000","loinhuan":"35%","gioihancn":"100000000","maTC":"1","Chuthich":""},{"Manhomkh":"9","Tennhomkh":"Nh\u00e0 ph\u00e2n ph\u1ed1i","von":"150000000","duytrithang":"70000000","loinhuan":"40%","gioihancn":"300000000","maTC":"1","Chuthich":""},{"Manhomkh":"10","Tennhomkh":"T\u1ed5ng ph\u00e2n ph\u1ed1i","von":"T\u00f9y \u0111\u1ecba b\u00e0n","duytrithang":"T\u00f9y \u0111\u1ecba b\u00e0n","loinhuan":"Li\u00ean h\u1ec7","gioihancn":"500000000","maTC":"1","Chuthich":""}]
    return data
@csrf_exempt
def api_taidulieunvpt(request):
    data = []
    return data
@csrf_exempt
def api_taiDuLieuSN(request):
    data = {"total":"0","rows":[]}
    return data
@csrf_exempt
def api_khachhangpckh(request):
    data = [{"MaKH":"6170","Ten":"VP2","Dc":"C\u1ea7n Th\u01a1","Dienthoai":"0376850174","Fax":"","Email":"","Mathue":"","Manhom":"8","Mota":"","website":"","Nganhhoc":"","Namsinh":"2019-11-29","Gioitinh":"N\u1eef","Maquocgia":"1","Matinh":"92","Mahuyen":"918","Sothich":"","Chucvu":"","Diachi_nharieng":"","Nguoigioithieu":"","Manguoi_phutrach":"VP1","HuongCK":"","maMQHe":"0","maNguonKH":"3","Matkhau":"269e3be65e71330d193230c4b9a12c","anh":"","maTC":"35","ngaytao":"2019-11-29 16:36:30","makichhoat":"","kichhoat":"0"},{"MaKH":"6336","Ten":"Nguy\u1ec5n Ph\u01b0\u01a1ng Kh\u00e1nh","Dc":"168 Ninh Ki\u1ec1u - C\u1ea7n TH\u01a1","Dienthoai":"0981695239","Fax":"","Email":"","Mathue":"","Manhom":"6","Mota":"","website":"","Nganhhoc":"","Namsinh":"2017-12-15","Gioitinh":"N\u1eef","Maquocgia":"1","Matinh":"92","Mahuyen":"916","Sothich":"","Chucvu":"","Diachi_nharieng":"","Nguoigioithieu":"","Manguoi_phutrach":"0981695293","HuongCK":"","maMQHe":"1","maNguonKH":"3","Matkhau":"aaba3810fdfa932f7a70a873730614","anh":"","maTC":"35","ngaytao":"2019-12-15 10:24:53","makichhoat":"","kichhoat":"0"},{"MaKH":"6337","Ten":"Tr\u1ea7n v\u0103n ho\u00e0i","Dc":"ct","Dienthoai":"0981695469","Fax":"","Email":"abc@gmail.com","Mathue":"","Manhom":"1","Mota":"","website":"","Nganhhoc":"","Namsinh":"0000-00-00","Gioitinh":"Nam","Maquocgia":"","Matinh":"95","Mahuyen":"1","Sothich":"","Chucvu":"","Diachi_nharieng":"kh\u00e1ch l\u1ebb","Nguoigioithieu":"","Manguoi_phutrach":"0981695265","HuongCK":"","maMQHe":"0","maNguonKH":"3","Matkhau":"483a3ad8655ad8ae90c3aa6beb9b1e","anh":"","maTC":"35","ngaytao":"2019-12-15 10:51:24","makichhoat":"","kichhoat":"0"},{"MaKH":"6338","Ten":"Nguy\u1ec5n th\u1ecb ho\u00e0i","Dc":"st","Dienthoai":"0987695243","Fax":"","Email":"abc@gmail.com","Mathue":"","Manhom":"2","Mota":"","website":"","Nganhhoc":"","Namsinh":"0000-00-00","Gioitinh":"N\u1eef","Maquocgia":"","Matinh":"01","Mahuyen":"2","Sothich":"","Chucvu":"","Diachi_nharieng":"Spa","Nguoigioithieu":"","Manguoi_phutrach":"0981596325","HuongCK":"","maMQHe":"0","maNguonKH":"3","Matkhau":"d608c0a967b00520686c36962145ab","anh":"","maTC":"35","ngaytao":"2019-12-15 10:51:25","makichhoat":"","kichhoat":"0"},{"MaKH":"6472","Ten":"Nguy\u1ec5n Th\u1ecb An","Dc":"34a","Dienthoai":"0934567890","Fax":"","Email":"","Mathue":"","Manhom":"2","Mota":"","website":"","Nganhhoc":"","Namsinh":"2019-12-18","Gioitinh":"N\u1eef","Maquocgia":"1","Matinh":"01","Mahuyen":"1","Sothich":"","Chucvu":"","Diachi_nharieng":"","Nguoigioithieu":"","Manguoi_phutrach":"0945235992","HuongCK":"","maMQHe":"0","maNguonKH":"3","Matkhau":"96afb0d751478916eea9d016017c70","anh":"","maTC":"35","ngaytao":"2019-12-18 21:15:22","makichhoat":"","kichhoat":"0"},{"MaKH":"7610","Ten":"Tr\u00fac","Dc":"67","Dienthoai":"098765443","Fax":"","Email":"","Mathue":"","Manhom":"2","Mota":"","website":"","Nganhhoc":"","Namsinh":"2020-04-14","Gioitinh":"N\u1eef","Maquocgia":"1","Matinh":"92","Mahuyen":"916","Sothich":"","Chucvu":"","Diachi_nharieng":"","Nguoigioithieu":"","Manguoi_phutrach":"VP1","HuongCK":"","maMQHe":"0","maNguonKH":"3","Matkhau":"5c6419d7304a097588653ed88c35b8","anh":"","maTC":"35","ngaytao":"2020-04-14 08:41:44","makichhoat":"","kichhoat":"0"},{"MaKH":"7611","Ten":"Tr\u00fac Thanh","Dc":"Nguy\u1ec5n V\u0103n C\u1eeb","Dienthoai":"09092345555","Fax":"","Email":"","Mathue":"","Manhom":"2","Mota":"","website":"","Nganhhoc":"","Namsinh":"2020-04-14","Gioitinh":"N\u1eef","Maquocgia":"1","Matinh":"92","Mahuyen":"916","Sothich":"","Chucvu":"","Diachi_nharieng":"","Nguoigioithieu":"","Manguoi_phutrach":"truc","HuongCK":"","maMQHe":"0","maNguonKH":"3","Matkhau":"235928b33f221c221e21d7de4b842a","anh":"","maTC":"35","ngaytao":"2020-04-14 08:44:08","makichhoat":"","kichhoat":"0"},{"MaKH":"8496","Ten":"Kh\u00e1ch h\u00e0ng A","Dc":"C\u1ea7n Th\u01a1","Dienthoai":"0987654321","Fax":"","Email":"","Mathue":"","Manhom":"2","Mota":"","website":"","Nganhhoc":"","Namsinh":"2020-07-01","Gioitinh":"N\u1eef","Maquocgia":"1","Matinh":"14","Mahuyen":"116","Sothich":"","Chucvu":"","Diachi_nharieng":"","Nguoigioithieu":"","Manguoi_phutrach":"0945235992","HuongCK":"","maMQHe":"0","maNguonKH":"3","Matkhau":"6fb42da0e32e07b61c9f0251fe627a","anh":"","maTC":"35","ngaytao":"2020-07-22 16:57:43","makichhoat":"","kichhoat":"0"},{"MaKH":"11484","Ten":"kh\u00e1ch h\u00e0ng test app","Dc":"\u0110\u1ecba ch\u1ec9 test","Dienthoai":"0377305560","Fax":"","Email":"","Mathue":"","Manhom":"2","Mota":"","website":"","Nganhhoc":"","Namsinh":"2021-11-03","Gioitinh":"N\u1eef","Maquocgia":"1","Matinh":"96","Mahuyen":"966","Sothich":"","Chucvu":"","Diachi_nharieng":"","Nguoigioithieu":"","Manguoi_phutrach":"VP1","HuongCK":"","maMQHe":"0","maNguonKH":"3","Matkhau":"b29546938a0c58abe18089e730a0e4","anh":"","maTC":"35","ngaytao":"2021-11-03 12:27:52","makichhoat":"","kichhoat":"0"},{"MaKH":"15760","Ten":"Ph\u1ea1m Ho\u00e0ng Kh\u1ea3i","Dc":"C\u1ea7n Th\u01a1","Dienthoai":"0825664789","Fax":"","Email":"","Mathue":"","Manhom":"2","Mota":"","website":"","Nganhhoc":"","Namsinh":"2024-03-19","Gioitinh":"Nam","Maquocgia":"1","Matinh":"92","Mahuyen":"916","Sothich":"","Chucvu":"","Diachi_nharieng":"","Nguoigioithieu":"","Manguoi_phutrach":"VP1","HuongCK":"","maMQHe":"1","maNguonKH":"3","Matkhau":"bbc6ddc5616295e03ef227a72714da","anh":"","maTC":"35","ngaytao":"2024-03-19 17:12:27","makichhoat":"","kichhoat":"0"}]
    return data

@csrf_exempt
def api_taiduphancapkh(request):
    data = []
    return data


@csrf_exempt
def api_themKH(request):
    if request.method == "POST":
        thongbao = ''
        tmp = json.loads(request.body)
        data = tmp.get('thamso')
        tenKH =data['tenKH'];
        gioiTinh =data['gioiTinh'];
        ngaySinh =data['ngaySinh'];
        date = datetime.strptime(ngaySinh, "%m/%d/%Y")
        ngaySinh = date.strftime("%Y/%m/%d");
        Diachi =data['Diachi'];
        sDT = data['soDT'].strip();
        email = data['Email'];
        huyen = data['huyen'];
        dcrieng = data['dcrieng'];
        tinh = data['tinh'];
        fax =data['fax'];
        mt = data['mt'];
        ngt = data['ngt'];
        nkh = data['nkh'];
        npt = data['npt'];
        nguonkh = data['nguonkh'];
        mqhkh = data['mqhkh'];
        ngayTaoTK = date.strftime("Y-m-d:H");
        infonv = request.session.get('infonv', [])

        api_url_tinh = 'http://127.0.0.1:8000/khachhang/danhsachtinh/'
        response = requests.get(api_url_tinh)
        data1 = response.json()

        api_url_huyen = 'http://127.0.0.1:8000/khachhang/dsh/'
        response = requests.get(api_url_huyen)
        data2 = response.json()


        tentinh = ''
        for giatri1 in data1:
            if giatri1['provinceid'] == tinh:
                tentinh = giatri1['name']
                break

        tenhuyen = ''
        for giatri2 in data2:
            if str(giatri2['districtid']) == str(huyen):
                tenhuyen = giatri2['name']
                break
        print(tenhuyen)
        if infonv:
            maTC = infonv[0].get('nhanviens', {}).get('maTC', None)
        if ngaySinh >= ngayTaoTK:
           thongbao = "Ngày sinh phải nhỏ hơn ngày hiện tại";
        else:
            if models.themKHModel(tenKH,Diachi,sDT,fax,email,nkh,mt,ngaySinh,gioiTinh,tinh,huyen,dcrieng,ngt,npt,mqhkh,nguonkh,maTC,tentinh,tenhuyen):
                thongbao = "Thêm Thành Công Khách Hàng " + str(tenKH);
            else:
                thongbao = "Không Thành Công! Khách Hàng Đã Tồn Tại";
        return JsonResponse(thongbao, safe=False)

@csrf_exempt
def api_xoaKH(request):
    if request.method == "POST":
        thongbao = ''
        tmp = json.loads(request.body)
        data = tmp.get('thamso')
        maKH =data['maKH']
        if models.kiemTraToanVen(maKH):
            if models.xoaKHModel(maKH):
                thongbao = "Xóa khách hàng thành công";
            else:
                thongbao = "Có lỗi xãy ra vui lòng kiểm tra lại"
        else:
            thongbao = "Khách hàng xuất phiếu không thể xóa!"
    return JsonResponse(thongbao, safe=False)


@csrf_exempt
def api_capnhatKH(request):
    if request.method == "PUT":
        message = ''
        data = json.loads(request.body)
        tinh = data['tinh']
        huyen = data['huyen']
        nkh = data['nkh']
        npt = data['npt']
        print(data['tinh'])
        print(data['huyen'])
        tentinh = ''
        tenhuyen = ''
        api_url_tinh = 'http://127.0.0.1:8000/khachhang/danhsachtinh/'
        response = requests.get(api_url_tinh)
        data1 = response.json()

        for row in data1:
            if str(row['provinceid']) == str(data['tinh']):
                tentinh = row['name']
                break

        api_url_huyen = 'http://127.0.0.1:8000/khachhang/dsh/'
        response = requests.get(api_url_huyen)
        data2 = response.json()

        for row in data2:
            if str(row['districtid']) == str(data['huyen']):
                tenhuyen = row['name']
                break

        api_url_dsnhomkh = 'http://127.0.0.1:8000/khachhang/nhomkh/'
        response = requests.get(api_url_dsnhomkh)
        data3 = response.json()

        for row in data3:
            if row['Tennhomkh'] == data['nkh']:
                nkh = row['Manhomkh']
                break

        api_url_nguoipt = 'http://127.0.0.1:8000/khachhang/nguoipt/'
        response = requests.get(api_url_nguoipt)
        data4 = response.json()

        for row in data4:
            if row['tenNV'] == data['npt']:
                npt = row['maNV']
                break
        MaKH = data['maKH']
        tenKH =data['tenKH'];
        gioiTinh =data['gioiTinh'];
        ngaySinh =data['ngaySinh'];
        date = datetime.strptime(ngaySinh, "%m/%d/%Y")
        ngaySinh = date.strftime("%Y/%m/%d");
        Diachi =data['diachi'];
        sDT = data['soDT'].strip();
        email = data['Email'];
        dcrieng = data['dcrieng'];
        fax =data['fax'];
        ngt = data['ngt'];
        mt = data['mt'];
        nguonkh = data['nguonkh'];
        mqhkh = data['mqhkh'];
        ngayTaoTK = date.strftime("Y-m-d");

        infonv = request.session.get('infonv', [])
        if infonv:
            maTC = infonv[0].get('nhanviens', {}).get('maTC', None)
        if ngaySinh >= ngayTaoTK:
           message = "Ngày sinh phải nhỏ hơn ngày hiện tại";
        else:
            if models.kiemTraSDT(sDT, MaKH):
                if models.chinhSuaKHModel(MaKH,tenKH,Diachi,sDT,fax,email,nkh,mt,ngaySinh,gioiTinh,tinh,huyen,dcrieng,ngt,npt,mqhkh,nguonkh,maTC,tentinh,tenhuyen):
                    message = "Cập Nhật Thành Công Khách Hàng " + str(tenKH);
                else:
                    message = "Cập Nhật Không Thành Công!";
            else:
                if models.kiemTraTonTaiMaKH(sDT, maTC):
                    if models.chinhSuaKHModel(MaKH,tenKH,Diachi,sDT,fax,email,nkh,mt,ngaySinh,gioiTinh,tinh,huyen,dcrieng,ngt,npt,mqhkh,nguonkh,maTC,tentinh,tenhuyen):
                        message = "Cập Nhật Thành Công Khách Hàng " + str(tenKH);
                    else:
                        message = "Cập Nhật Không Thành Công!";
                else:
                    message = "Số điện thoại khách hàng đã tồn tại";
        return JsonResponse(message, safe=False)


