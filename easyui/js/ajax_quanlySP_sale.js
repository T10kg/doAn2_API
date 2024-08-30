function sanphamtheokho(value) {
    $('#combo_gridsp').combogrid({
        url: '../sanphams/combogrid_sp?makho=' + value
    });
}
function taophieuxuat_QLSP() {
    $('#dlg-quanLySP_sale-tpx').dialog('open');
    var v_tongthanh = $('#nbb-quanLySP_sale-tpx-tt').numberbox('getValue');
    var v_tongthanhtien = $('#nbb-quanLySP_sale-tpx-ttt').numberbox('getValue');
    $('#nbb-quanLySP_sale-tpx-ttt').numberbox({
        onChange: function(newValue, oldValue) {
            if (newValue > v_tongthanh) {
                thongbao("Giá trị tổng trả trước phải" + v_tongthanh + newValue + " <= tổng thanh");
            }
        }
    });
    $('#nbb-quanLySP_sale-tpx-ttt').numberbox('setValue', v_tongthanh);
    $('#txtb-quanLySP_sale-tpx-sotk').numberbox('disable');
    $('#cbb-quanLySP_sale-tpx-hinhthuctt').combobox({
        textField: 'label',
        valueField: 'value',
        onChange: ()=>{
            if ($('#cbb-quanLySP_sale-tpx-hinhthuctt').combobox('getValue') == 'Chuyển Khoản')
                $('#txtb-quanLySP_sale-tpx-sotk').numberbox('enable');
            else
                $('#txtb-quanLySP_sale-tpx-sotk').numberbox('disable');
        }
        ,
        data: [{
            label: 'Chuyển Khoản',
            value: 'Chuyển Khoản'
        }, {
            label: 'Tiền Mặt',
            value: 'Tiền Mặt'
        }, {
            label: 'Đổi Trả Hàng',
            value: 'Đổi Trả Hàng'
        }, {
            label: 'Khác',
            value: 'Khác'
        }]
    })
}

function timkiem_quanlySP_sale() {
    $timkiem = $('#ip-quanLySP_sale-dssp').val();
    $('#dg-quanLySP_sale-dssp').datagrid('load', {
        timsp: $timkiem
    });
}
function xuatfile_QLSP() {
    var row = $('#dg-quanLySP_sale-sp').datagrid('getSelected');
    if (row) {
        $('#dlg-quanLySP_xuatfile').dialog('open');
    } else {
        thongbao("Vui lòng chọn phiếu cần xuất");
    }
}
function capnhatsanphamphieuxuatnv() {
    $mapx = $("#mapx_an").val();
    $tongphieu = $('#nbb-quanLySP_sale-tpx-tt').numberbox('getValue');
    $ghichu = $('#ghichu-tpx').textbox('getValue');
    $tongthanh = $('#nbb-quanLySP_sale-tpx-ttt').numberbox('getValue');
    $makh = $('#cbg-quanLySP_sale-tpx-khachhang').combogrid('getValue');
    $hantra = $('#db-quanLySP_sale-tpx-from').datebox('getValue');
    $hinhthucthanh = $('#cbb-quanLySP_sale-tpx-hinhthuctt').combo('getValue');
    $sotaikhoan = $('#txtb-quanLySP_sale-tpx-sotk').numberbox('getValue');
    if (!$(this).hasClass('clicked')) {
        var bien = {
            id: $mapx,
            tongphieu: $tongphieu,
            ghichu: $ghichu,
            tongthanh: $tongthanh,
            makh: $makh,
            hantra: $hantra,
            hinhthucthanh: $hinhthucthanh,
            sotaikhoan: $sotaikhoan,
            tinhtrang: 'nv'
        };
        sendajax("../phieuxuatsps/capNhatPhieuXuat", bien);
        location.reload();
    }
}
function huyphieuxuatnv() {
    $mapx = $("#mapx_an").val();
    if (!$(this).hasClass('clicked')) {
        var bien = {
            mapx: $mapx
        };
        sendajax("../phieuxuatsps/huyPhieuXuat", bien);
        $('#dlg-quanLySP_sale-tpx').dialog('close');
    }
}
function themsanphamphieuxuatnhanviensale() {
    var row = $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('getSelected');
    var sl = row.soluongton;
    var sld = $('#sl_them').numberspinner('getValue');
    if (sld > sl) {
        thongbao("Số lượng hiện tại không đủ cho đơn hàng");
        $('#sl_them').numberspinner('setValue', 1);
    } else {
        $mapx = $("#mapx_an").val();
        $masp = row.Masanpham;
        $soluong = sld;
        $chietkhau = $("#chietkhau_them").numberspinner('getValue');
        $gia = row.gia_ban;
        $makho = row.makho;
        $solo = row.solo;
        $soqr = row.soqr;
        if ($solo == null) {
            thongbao("Sản phẩm bạn yêu cầu đã hết, vui lòng liên hệ nhân viên kho");
            return false;
        }
        if (!$(this).hasClass('clicked')) {
            var bien = {
                mapx: $mapx,
                masp: $masp,
                soluong: $soluong,
                chietkhau: $chietkhau,
                gia: $gia,
                makho: $makho,
                solo: $solo,
                soqr: $soqr
            };
            sendajax("../phieuxuatsps/themSanPhamPhieuXuatNV", bien, "dg-quanLySP_sale-dsspn");
            var bien_1 = {
                mapx: $mapx
            }
            var array = {
                num1: "nbb-quanLySP_sale-tpx-tt",
                num2: "nbb-quanLySP_sale-tpx-ttt"
            };
            $('#dg-quanLySP_sale-dsspn').datagrid({
                onLoadSuccess: function() {
                    sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                    $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                }
            })
        }
    }
}
function xoasanphamphieuxuatnhanviensale() {
    var hang = $('#dg-quanLySP_sale-dsspn').datagrid('getSelected');
    if (hang) {
        $id = hang.id;
        if (!$(this).hasClass('clicked')) {
            var bien = {
                id: $id
            };
            $mapx = $("#mapx_an").val();
            sendajax("../phieuxuatsps/xoaSanPhamPhieuXuatNV", bien, "dg-quanLySP_sale-dsspn");
            var bien_1 = {
                mapx: $mapx
            }
            var array = {
                num1: "nbb-quanLySP_sale-tpx-tt",
                num2: "nbb-quanLySP_sale-tpx-ttt"
            };
            $('#dg-quanLySP_sale-dsspn').datagrid({
                onLoadSuccess: function() {
                    sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                    $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                }
            })
        }
    } else {
        thongbao('Vui lòng chọn phiếu cần xóa')
    }
}
$(function() {
    $('#dg-quanLySP_sale-sp').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px"><table class="ddv' + index + '"></table></div>';
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddv' + index);
            var row = row.id;
            ddv.datagrid({
                url: '../sanphams/combogrid_sp?mapx=' + row,
                fitColumns: true,
                singleSelect: true,
                rownumbers: true,
                loadMsg: 'Đang tải...',
                emptyMsg: 'Không có dữ liệu.',
                height: 'auto',
                columns: [[{
                    field: 'tensp',
                    title: 'Tên sản phẩm',
                    width: '250px'
                }, {
                    field: 'soLxuat',
                    title: 'Số lượng',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'giaxuatspnv',
                    title: 'Đơn giá(VNĐ)',
                    width: 130,
                    align: 'right',
                    formatter: formatCurrency
                }, {
                    field: 'chietkhau',
                    title: 'Chiết khấu(%)',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'thanhtien',
                    title: 'Thành tiền(VNĐ)',
                    width: 130,
                    align: 'right',
                    formatter: formatCurrency
                }, {
                    field: 'tenkho',
                    title: 'Kho hàng',
                    width: 180,
                    align: 'center'
                }, ]],
                onResize: function() {
                    $('#dg-quanLySP_sale-sp').datagrid('fixDetailRowHeight', index);
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#dg-quanLySP_sale-sp').datagrid('fixDetailRowHeight', index);
                    }, 0);
                }
            });
            $('#dg-quanLySP_sale-sp').datagrid('fixDetailRowHeight', index);
        }
    });
});
function timngaydenngay() {
    $tu = $("#db-quanLySP_sale-from").datebox("getValue");
    $den = $("#db-quanLySP_sale-to").datebox("getValue");
    if ($tu == "" || $den == "") {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Vui lòng nhập ngày bắt đầu và ngày kết thúc'
        })
        return false;
    } else {
        $('#dg-quanLySP_sale-sp').datagrid('load', {
            tungay: $tu,
            denngay: $den
        });
    }
}
function Doitrahang() {
    var row = $('#dg-quanLySP_sale-sp').datagrid('getSelected');
    if (row) {
        $('#dg-quanLySP_sale-dsspdh').datagrid('load', "../sanphams/combogrid_sp?mapx=" + row.id);
        $('#dlg-quanLySP_doihang').dialog('open');
    } else {
        thongbao('Vui lòng chọn phiếu cần đổi trả');
    }
}
