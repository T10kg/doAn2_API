from django.db import models
from django.db import connection
from datetime import datetime
# Create your models here.
def kiemTraTonTaiMaKH(sDT,matc):
    with connection.cursor() as cursor:
        cursor.execute("SELECT count(1) as dem from khachhangs where Dienthoai=%s and maTC=%s", [sDT,matc]);
        count = cursor.fetchone()[0]
        if count == 0:
            return True
        else:
            return False

def kiemTraSDT(sDT,maKH):
   with connection.cursor() as cursor:
        cursor.execute("SELECT Dienthoai from khachhangs where Dienthoai=%s and MaKH=%s", [sDT, maKH])
        rows = cursor.fetchall()
        count = len(rows)
        if count == 0:
            return False
        else:
            return True

def kiemTraToanVen(maKH):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT maKH from phieuxuat WHERE maKH=%s",
            [maKH]
        )
        if cursor.rowcount == 0:
            return True
        else:
            return False

def xoaKHModel(maKH):
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM khachhangs WHERE MaKH=%s", [maKH])
        if cursor.rowcount > 0:
            return True
        else:
            return False
def themKHModel(tenKH,Diachi,sDT,fax,email,nkh,mt,ngaySinh,gioiTinh,tinh,huyen,dcrieng,ngt,npt,mqhkh,nguonkh,maTC,tentinh,tenhuyen):
    if kiemTraTonTaiMaKH(sDT,maTC):
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO khachhangs (MaKH,  Ten ,  Dc ,  Dienthoai ,  Fax ,  Email ,  Mathue ,  Manhom ,  Mota ,  website ,  Nganhhoc ,  Namsinh ,  Gioitinh ,  Maquocgia ,  Matinh ,  Mahuyen ,  Sothich ,  Chucvu ,  Diachi_nharieng ,  Nguoigioithieu ,  Manguoi_phutrach ,  HuongCK ,  maMQHe ,  maNguonKH ,  Matkhau ,  anh , maTC , ngaytao, makichhoat, kichhoat,Tentinh, Tenhuyen ) VALUES ('',%s,%s,%s,%s,%s,'',%s,%s,'','',%s,%s,'1',%s,%s,'','',%s,%s,%s,'',%s,%s,md5(%s),'',%s,NOW(),'','',%s,%s)", [tenKH,Diachi,sDT,fax,email,nkh,mt,ngaySinh,gioiTinh,tinh,huyen,dcrieng,ngt,npt,mqhkh,nguonkh,sDT,maTC,tentinh,tenhuyen])
            cursor.execute("SELECT '',%s,MaKH,NOW() from khachhangs where khachhangs.Dienthoai =%s", [npt,sDT])
            result = cursor.fetchall()
            for i in result:
                date_only = i[3].date()
                cursor.execute("INSERT INTO nvphutrachkhs (id, manv, makh, ngayphutrach) VALUES (%s,%s,%s,%s)", [i[0],i[1],i[2],date_only])

            cursor.execute("SELECT '',khachhangs.MaKH,'5000000','' from khachhangs where khachhangs.Dienthoai =%s", [sDT])
            result = cursor.fetchall()
            for i in result:
                cursor.execute("INSERT INTO gioihancnkhs (id, makh, sotien, ghichu) VALUES (%s,%s,%s,%s)", [i[0],i[1],i[2],i[3]])
        return True
    else:
        return False

def chinhSuaKHModel(MaKH,tenKH,Diachi,sDT,fax,email,nkh,mt,ngaySinh,gioiTinh,tinh,huyen,dcrieng,ngt,npt,mqhkh,nguonkh,maTC,tentinh,tenhuyen):
    if kiemTraSDT(sDT,MaKH):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE khachhangs SET MaKH = %s, Ten=%s,Dc=%s,Dienthoai=%s,Fax=%s,Email=%s,Manhom=%s,Mota=%s,Namsinh=%s,Gioitinh=%s,Matinh=%s,Mahuyen=%s,Diachi_nharieng=%s,Nguoigioithieu=%s,Manguoi_phutrach=%s,maMQHe=%s,maNguonKH=%s, Tentinh = %s, Tenhuyen = %s WHERE MaKH =%s", [MaKH,tenKH,Diachi,sDT,fax,email,nkh,mt,ngaySinh,gioiTinh,tinh,huyen,dcrieng,ngt,npt,mqhkh,nguonkh,tentinh,tenhuyen,MaKH])
            if cursor.rowcount > 0:
                return True
            else:
                return False
    else:
        if kiemTraTonTaiMaKH(sDT, maTC):
            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE khachhangs SET Ten=%s,Dc=%s,Dienthoai=%s,Fax=%s,Email=%s,Manhom=%s,Mota=%s,Namsinh=%s,Gioitinh=%s,Matinh=%s,Mahuyen=%s,Diachi_nharieng=%s,Nguoigioithieu=%s,Manguoi_phutrach=%s,maMQHe=%s,maNguonKH=%s WHERE MaKH =%s",
                    [tenKH, Diachi, sDT, fax, email, nkh, mt, ngaySinh, gioiTinh, tinh, huyen, dcrieng, ngt, npt,
                     mqhkh, nguonkh, MaKH]
                )
            if cursor.rowcount > 0:
                return True
            else:
                return False
        else:
            return False


