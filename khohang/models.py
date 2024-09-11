from django.db import models
from django.db import connection
from datetime import datetime
def themKho(makho, tenkho,diachi,ghichu,loaikho,matc):
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO `khos`(`makho`,`makhotxt`, `tenkho`, `diachi`, `ghichuKho`,`loaikho`,`maTC`) VALUES ('',%s,%s,%s,%s,%s,%s)",
            [makho, tenkho,diachi,ghichu,loaikho,matc]
        )
        cursor.execute(
            "SELECT * FROM `khos` WHERE makhotxt = %s",
            [makho]
        )
        if cursor.rowcount > 0:
            return True
        else:
            return False

def capNhatKho(makho,makhotxt,tenkho,diachi,ghichu,loaikho):
    with connection.cursor() as cursor:
        cursor.execute(
            "UPDATE `khos` SET `makhotxt`=%s, `tenkho`=%s,`diachi`=%s,`ghichuKho`=%s, loaikho=%s WHERE `makho`=%s ",
            [makhotxt, tenkho,diachi,ghichu,loaikho,makho]
        )
        if cursor.rowcount > 0:
            return True
        else:
            return False

def kiemtraxuatkho(makho): #chưa có bảng
    return True
def xoakho(makho):
    if kiemtraxuatkho(makho):
        with connection.cursor() as cursor:
            cursor.execute(
                "DELETE FROM khos WHERE `makho`=%s",
                [makho]
            )
            if cursor.rowcount > 0:
                return True
            else:
                return False
    else:
        return False
def kiemtrathemNVQL(makho,manv):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM `nhanvienkhos` WHERE makho = %s and manv = %s",
            [makho, manv]
        )
        if cursor.rowcount > 0:
            return False
        else:
            return True
def themNVQLKho(makho,manv):
    with connection.cursor() as cursor:
        if kiemtrathemNVQL(makho,manv):
            cursor.execute(
                "INSERT INTO `nhanvienkhos`(`id`, `makho`, `manv`) VALUES ('',%s,%s)",
                [makho, manv]
            )
            cursor.execute(
                "SELECT * FROM `nhanvienkhos` WHERE makho = %s and manv = %s",
                [makho,manv]
            )
            if cursor.rowcount > 0:
                return True
            else:
                return False
        return False

def xoaNVQLKho(id):
    with connection.cursor() as cursor:
        cursor.execute(
            "DELETE FROM `nhanvienkhos` WHERE id=%s",
            [id]
        )
        if cursor.rowcount > 0:
            return True
        else:
            return False

def themSPKho(makho,masp):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM `sanphamkhos` WHERE makho = %s and masp = %s",
            [makho, masp]
        )
        if cursor.rowcount > 0:
            return False
        else:
            cursor.execute(
                "INSERT INTO `sanphamkhos`(`id`, `masp`, `makho`) VALUES ('',%s,%s)",
                [masp, makho]
            )
            cursor.execute(
                "SELECT * FROM `sanphamkhos` WHERE makho = %s and masp = %s",
                [makho, masp]
            )
            if cursor.rowcount > 0:
                return True
            else:
                return False

def xoaSPKho(id_spk):
    with connection.cursor() as cursor:
        cursor.execute(
            "DELETE FROM `sanphamkhos` WHERE id=%s",
            [id_spk]
        )
        if cursor.rowcount > 0:
            return True
        else:
            return False