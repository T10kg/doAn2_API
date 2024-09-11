$(document).ready(function() {
    var mapn = $("#mapn").val()
    tailaitatcacactabphieu(mapn, "mapn")
})
function tailaitatcacactabphieu(mapx, session) {
    setInterval(function() {
        var session_px = localStorage.getItem("" + session);
        if (session_px != mapx) {
            location.reload()
        }
    }, 1000)
}
function nhapkho_chuyen() {
    var row = $("#qlck-dg").datagrid("getSelected")
    $("#nhapkho_chuyen").removeClass('clicked');
    if (row) {
        $.post('kiemtrathongtintruockhinhap', {
            matcchuyen: row.matcchuyen
        }, function(data) {
            if (data == "false") {
                thongbao("Phiếu do tổ chức chuyển đi không được nhập")
                return !1
            } else {
                $('#qlnk-thongtin-dlg').dialog('open')
            }
        })
        $mapx = row.id
        $makh = row.maKH
        $("#nhapkho_chuyen").click(function() {
            if (!$("#qlnk-frm_thongtin").form('enableValidation').form('validate')) {
                return !1
            }
            if (!$(this).hasClass('clicked')) {
                $("#nhapkho_chuyen").addClass('clicked')
                nhapkhodailynpp()
                $('#qlnk-thongtin-dlg').dialog('close')
            }
        })
    } else {
        thongbao("Vui lòng chọn phiếu cần nhập vào kho")
    }
}
function xoaphieuchuyenkhodaily() {
    var row = $("#qlck-dg").datagrid("getSelected")
    if (row) {
        $id = row.id
        $matcnhan = row.matcnhan
        $tinhtrang = row.tinhtrang
        $mapn = row.mapn
        $bien = {
            id: $id,
            mapn: $mapn,
            matcnhan: $matcnhan,
            tinhtrang: $tinhtrang
        }
        xoadulieuajax('xoachuyenkhodaily', $bien, "qlck-dg", "Việc xóa phiếu chuyển sẽ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không?")
    } else {
        thongbao("Chọn phiếu cần xóa")
    }
}
$(function() {
    $('#qlck-dg').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px"><table pagination="true"  class="ddv' + index + '"></table></div>'
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddv' + index);
            var phu = row.mapx;
            ddv.datagrid({
                url: '../sanphams/combogrid_sp?mapx=' + phu,
                fitColumns: !0,
                singleSelect: !0,
                showFooter: !0,
                rownumbers: !0,
                loadMsg: 'Đang tải...',
                emptyMsg: 'Không có dữ liệu.',
                height: 'auto',
                width: '92%',
                columns: [[{
                    field: 'masanpham',
                    title: 'MaSP',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'tensp',
                    title: 'Tên sản phẩm',
                    width: '360px'
                }, {
                    field: 'soLxuat',
                    title: 'Số lượng',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'giaxuatspnv',
                    title: 'Đơn giá(VNĐ)',
                    width: 100,
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
                    width: 120,
                    align: 'right',
                    formatter: formatCurrency
                }, {
                    field: 'soloxuat',
                    title: 'Số lô',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'soqr',
                    title: 'số QR',
                    width: 100,
                    align: 'center'
                }, ]],
                onResize: function() {
                    $('#qlxk-dg').datagrid('fixDetailRowHeight', index)
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#qlxk-dg').datagrid('fixDetailRowHeight', index)
                    }, 0)
                }
            });
            $('#qlxk-dg').datagrid('fixDetailRowHeight', index);
            index2 = index
        }
    })
});
function nhapkhodailynpp() {
    var row = $("#qlck-dg").datagrid("getSelected")
    if (row) {
        if (row.tinhtrang == '0') {
            $manguoncc = $("#qlnk-phieunhap-nguoncap-cbb").combogrid("getValue")
            $makho = $("#khonhanvienquanlykho_sp").combobox("getValue")
            $ngaythanhtieptheo = $("#qlnk-ngaythanhtieptheo-datebox").datebox("getValue")
            $tratruoc = $("#qlnk-tongtratruoc-nbb").numberbox("getValue")
            $hinhthucthanh = $("#qlnk-hinhthucthanh-cbb").combobox("getValue")
            $sotk = $("#qlnk-stk-txtb").textbox("getValue")
            $ghichu = $("#qlnk-ghichu-txtb").textbox("getValue")
            $mapn = $("#mapn").val()
            $mapx = row.mapx
            $matc = row.matcnhan
            $bien = {
                id: row.id,
                matcnhan: $matc,
                mapn: $mapn,
                mapx: $mapx,
                mancc: $manguoncc,
                makho: $makho,
                hantra: $ngaythanhtieptheo,
                tongthanh: $tratruoc,
                hinhthucthanh: $hinhthucthanh,
                sotk: $sotk,
                ghichu: $ghichu
            }
            chuyenkho_reload_trang('nhapkhotuphieuchuyen', $bien, "qlck-dg", "Bạn có thực sự muốn thực hiện thao tác này")
        } else {
            thongbao("Phiếu đã được nhập kho, vui lòng chọn phiếu khác")
        }
    } else {
        thongbao("Chọn phiếu cần nhập kho")
    }
}
function kiemtratontaisanphamphieuchuyen() {
    var row = $("#qlck-dg").datagrid("getSelected")
    if (row) {
        $idpc = row.id
        $matcnhan = row.matcnhan
        $("#dl_thongtinsanphamkhotontaipc").datagrid('load', {
            idpc: $idpc,
            matcnhan: $matcnhan
        })
        $("#thongtinsankhongtontaipc-dlg").dialog('open')
    } else {
        thongbao("Chọn phiếu cần kiểm tra")
    }
}
