
from django.db import connection

def themSPModel(maSP, tenSP, loaiSP, giaBan, giaNhap, chietKhau, moTa, xFilePath, mansx, manhom, madonvi):
    with connection.cursor() as cursor:
        # Kiểm tra sản phẩm đã tồn tại hay chưa dựa trên cột `Masanpham`
        cursor.execute("SELECT COUNT(*) FROM sanphams WHERE Masanpham = %s", [maSP])
        result = cursor.fetchone()

        if result[0] > 0:
            return False  # Sản phẩm đã tồn tại

        # Thực hiện thêm sản phẩm vào bảng `sanphams`
        cursor.execute("""
            INSERT INTO sanphams (Masanpham, tensp, loaisp, gia_ban, gia_nhap, chietkhau, Mota, Url, Mansx, Manhom, Madonvi) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, [maSP, tenSP, loaiSP, giaBan, giaNhap, chietKhau, moTa, xFilePath, mansx, manhom, madonvi])
    
    return True

from django.db import connection

def suaspModel(maSP, tenSP, loaiSP, giaBan, giaNhap, chietKhau, moTa, xFilePath, mansx, manhom, madonvi):
    with connection.cursor() as cursor:
        # Kiểm tra sản phẩm đã tồn tại hay chưa dựa trên cột `Masanpham`
        cursor.execute("SELECT COUNT(*) FROM sanphams WHERE Masanpham = %s", [maSP])
        result = cursor.fetchone()

        if result[0] == 0:
            return False  # Sản phẩm không tồn tại

        # Thực hiện cập nhật sản phẩm vào bảng `sanphams`
        cursor.execute("""
            UPDATE sanphams 
            SET tensp = %s, loaisp = %s, gia_ban = %s, gia_nhap = %s, chietkhau = %s, Mota = %s, Url = %s, Mansx = %s, Manhom = %s, Madonvi = %s 
            WHERE Masanpham = %s
        """, [tenSP, loaiSP, giaBan, giaNhap, chietKhau, moTa, xFilePath, mansx, manhom, madonvi, maSP])
    
    return True

def xoaSPModel(maSP):
    with connection.cursor() as cursor:
        # Check if the product exists
        cursor.execute("SELECT COUNT(*) FROM sanphams WHERE Masanpham = %s", [maSP])
        count = cursor.fetchone()[0]

        if count == 0:
            return False  # Product does not exist

        # Delete the product
        cursor.execute("DELETE FROM sanphams WHERE Masanpham = %s", [maSP])
        return True  # Successfully deleted

def themNhomSPModel(tenNhom, moTa, maTC):
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO nhomsps (tennhom, mota, maTC) VALUES (%s, %s, %s)", [tenNhom, moTa, maTC])
    return True

def capnhatNhomSPModel(maNhom, tenNhom, moTa):
    with connection.cursor() as cursor:
        cursor.execute("UPDATE nhomsps SET tennhom=%s, mota=%s WHERE manhom=%s", [tenNhom, moTa, maNhom])
    return True

def xoaNhomSPModel(maNhom):
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM nhomsps WHERE manhom=%s", [maNhom])
    return True
