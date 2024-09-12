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
from khohang import models
from datetime import datetime
import requests

from trangchu.views import check_session

# Create your views here.
@check_session
def index(request):
    if request.session.get("member_id"):
        context = {
            "user_name": request.session.get("member_id")
        }
        return render(request, "khohang/index.html", context)


class duLieuKho(APIView):  # Đổi tên lớp để tránh xung đột với APIView
    def get(self, request, *args, **kwargs):
        data_list = []
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT makho, makhotxt, tenkho, loaikho, diachi, ghichuKho FROM khos"
            )
            thucthi = cursor.fetchall()
            for row in thucthi:
                data = {
                    "makho": row[0],
                    "makhotxt": row[1],
                    "tenkho": row[2],
                    "loaikho": row[3],
                    "diachi": row[4],
                    "ghichuKho": row[5],
                }
                data_list.append(data)
        return Response(data_list, status=status.HTTP_200_OK)
@csrf_exempt
def themthongtinkho(request):
    if request.method == "POST":
        tmp = json.loads(request.body)
        data = tmp.get('thamso')
        makho = data['makhotxt']
        tenkho = data['tenkho']
        loaikho = data['loaikho']
        diachi = data['diachi']
        ghichu = data['ghichu']
        matc = '123'
        thongbao = ''
        if models.themKho(makho, tenkho,diachi,ghichu,loaikho,matc):
            thongbao = "Thêm thông tin kho thành công"
        else:
            thongbao = "Có lỗi xảy ra vui lòng kiểm tra lại"
        return JsonResponse(thongbao, safe=False)

@csrf_exempt
def suathongtinkho(request):
    if request.method == "POST":
        tmp = json.loads(request.body)
        data = tmp.get('thamso')
        makho = data['makho']
        makhotxt = data['makhotxt']
        tenkho = data['tenkho']
        loaikho = data['loaikho']
        diachi = data['diachi']
        ghichu = data['ghichu']
        matc = '123'
        thongbao = ''
        if models.capNhatKho(makho,makhotxt,tenkho,diachi,ghichu,loaikho):
            thongbao = "Cập nhật thông tin kho thành công"
        else:
            thongbao = "Có lỗi xảy ra vui lòng kiểm tra lại"
        return JsonResponse(thongbao, safe=False)

@csrf_exempt
def xoathongtinkho(request):
    if request.method == "POST":
        tmp = json.loads(request.body)
        data = tmp.get('thamso')
        makho = data['makho']


        thongbao = ''
        if models.xoakho(makho):
            thongbao = "Xóa thông tin kho thành công"
        else:
            thongbao = "Có lỗi xảy ra vui lòng kiểm tra lại"
        return JsonResponse(thongbao, safe=False)

@csrf_exempt
def nhanvienquanlykho(request,id):
    makho = id
    data_list = []
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT id, nhanviens.maNV, tenNV,gioiTinh,MaCV FROM nhanvienkhos, nhanviens WHERE nhanvienkhos.maNV = nhanviens.maNV and makho = %s",
            [makho]
        )
        thucthi = cursor.fetchall()
        for row in thucthi:
            data = {
                "id": row[0],
                "maNV": row[1],
                "tenNV": row[2],
                "gioiTinh": row[3],
                "tenCV": row[4],
            }
            data_list.append(data)
    return JsonResponse(data_list, safe=False)
@csrf_exempt
def themnhanvienquanlykho(request):
    if request.method == "POST":
        tmp = json.loads(request.body.decode('utf-8'))
        data = tmp.get('thamso')
        makho = data['makho']
        manv = data['manv']

        thongbao = ''
        if models.themNVQLKho(makho,manv):
            thongbao = "Thêm nhân viên quản lý kho thành công"
        else:
            thongbao = "Có lỗi xảy ra vui lòng kiểm tra lại"
        return JsonResponse(thongbao, safe=False)


@csrf_exempt
def xoanhanvienquanlykho(request):
    if request.method == "POST":
        tmp = json.loads(request.body.decode('utf-8'))
        data = tmp.get('thamso')
        id = data['id']
        thongbao = ''
        if models.xoaNVQLKho(id):
            thongbao = "Xóa nhân viên quản lý kho thành công"
        else:
            thongbao = "Có lỗi xảy ra vui lòng kiểm tra lại"
        return JsonResponse(thongbao, safe=False)

@csrf_exempt
def list_sp(request):
    data_list = []

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT Masanpham, tensp,gia_ban FROM sanphams ",
        )
        thucthi = cursor.fetchall()
        for row in thucthi:
            data = {
                "MaSP": row[0],
                "tensp": row[1],
                "gia_ban": row[2],
            }
            data_list.append(data)
        print(data_list)
    return JsonResponse(data_list, safe=False)
@csrf_exempt
def sanphamkho(request,id):
    makho = id
    data_list = []
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT id,sanphams.Masanpham, tensp,gia_ban FROM sanphamkhos, sanphams WHERE sanphamkhos.masp = sanphams.Masanpham and makho = %s",
            [makho]
        )
        thucthi = cursor.fetchall()
        for row in thucthi:
            data = {
                "id_spk": row[0],
                "MaSP": row[1],
                "tensp": row[2],
                "gia_ban": row[3],
            }
            data_list.append(data)
    return JsonResponse(data_list, safe=False)

@csrf_exempt
def themsanphamkho(request):
    if request.method == "POST":
        tmp = json.loads(request.body.decode('utf-8'))
        data = tmp.get('thamso')
        makho = data['makho']
        masp = data['masp']

        thongbao = ''
        if models.themSPKho(makho,masp):
            thongbao = "Thêm sản phẩm kho thành công"
        else:
            thongbao = "Có lỗi xảy ra vui lòng kiểm tra lại"
        return JsonResponse(thongbao, safe=False)


@csrf_exempt
def xoasanphamkho(request):
    if request.method == "POST":
        tmp = json.loads(request.body.decode('utf-8'))
        data = tmp.get('thamso')
        id_spk = data['id_spk']
        thongbao = ''
        if models.xoaSPKho(id_spk):
            thongbao = "Xóa sản phẩm kho thành công"
        else:
            thongbao = "Có lỗi xảy ra vui lòng kiểm tra lại"
        return JsonResponse(thongbao, safe=False)