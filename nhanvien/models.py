
from django.db import connection

def themNVModel(maNV, tenNV, matKhau, diachi, gioiTinh, ngaySinh, dantoc, soDT, email, honnhan, soCMT, Noicap, tongiao, quoctich, maCV, maPB, loainv, maTC):
    # Check if the employee already exists

        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO nhanviens (maNV, tenNV, Manhomnd, Matkhau, Diachi, gioiTinh, Ngaysinh, Dantoc, Sdt, Email, Honnhan, soCMT, Noicap, Tongiao, Quoctich, MaCV, maPB, anhNV, loainv, nguoitao, maTC) VALUES (%s, %s, 'NV', MD5(%s), %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 'null', %s, 'null', %s)", 
                           [maNV, tenNV, matKhau, diachi, gioiTinh, ngaySinh, dantoc, soDT, email, honnhan, soCMT, Noicap, tongiao, quoctich, maCV, maPB, loainv, maTC])
        return True


def kiemTraTonTaiMaNhanVien(maNV, soCMT):
    with connection.cursor() as cursor:
        cursor.execute("SELECT COUNT(*) FROM nhanviens WHERE maNV = %s OR soCMT = %s", [maNV, soCMT])
        count = cursor.fetchone()[0]
    return count == 0


def chinhSuaNhanVienModel(maNV, tenNV, diachi, gioiTinh, ngaySinh, dantoc, soDT, email, honnhan, soCMT, Noicap, tongiao, quoctich, maCV, maPB, loainv, maTC, maNVCu):
    # Kiểm tra xem nhân viên có tồn tại không
        with connection.cursor() as cursor:
            # Thực hiện câu lệnh SQL để cập nhật thông tin nhân viên
             cursor.execute(
                    "UPDATE nhanviens SET maNV= %s, tenNV = %s,  Diachi = %s,gioiTinh = %s, Ngaysinh = %s, Dantoc = %s, Sdt = %s, Email = %s, Honnhan = %s,soCMT = %s, Noicap = %s, Tongiao = %s, Quoctich = %s, MaCV = %s, maPB = %s, loainv = %s, maTC=%s WHERE maNV = %s",
                    [maNV, tenNV, diachi, gioiTinh, ngaySinh, dantoc, soDT, email, honnhan, soCMT, Noicap, tongiao, quoctich, maCV, maPB, loainv, maTC, maNVCu]
                )
             return True


def xoaNhanVienModel(maNV):
    with connection.cursor() as cursor:
        # Kiểm tra sự tồn tại của nhân viên
        cursor.execute("SELECT COUNT(*) FROM nhanviens WHERE maNV = %s", [maNV])
        count = cursor.fetchone()[0]

        if count == 0:
            return False  # Nhân viên không tồn tại

        # Xóa nhân viên
        cursor.execute("DELETE FROM nhanviens WHERE maNV = %s", [maNV])
        return True  # Xóa thành công
