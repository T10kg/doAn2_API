from django.urls import path
from .views import dulieuKH
from . import views
from .views import themNhanVienMoDel, chinhSuaNhanVienModel, xoaNhanVienModel, search_nhanvien, themSanPhamMoDel

urlpatterns = [
    
    # path('add_nhan_vien/', themNhanVienMoDel, name='themNhanVienMoDel'),
    path('chinh_sua_nhan_vien/', chinhSuaNhanVienModel, name='chinhSuaNhanVienModel'),
    path('xoa_nhan_vien/', xoaNhanVienModel, name='xoa_nhan_vien'),
    path('tim_kiem_nv/', search_nhanvien, name='xoa_nhan_vien'),
    path('them_san_pham/', themSanPhamMoDel, name='them_san_pham'),
    path('danhsachKH/', dulieuKH.as_view(), name='test'),
    path('themKH/', views.api_themKH, name='themKH'),
    path('xoaKH/', views.api_xoaKH, name='xoaKH'),
    path('capnhatKH/', views.api_capnhatKH, name='capnhatKH'),
]
