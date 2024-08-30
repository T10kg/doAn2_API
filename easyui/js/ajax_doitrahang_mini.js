$(document).ready(function() {
    $('#qlpdt-qr').keypress(function(e) {
        if (e.which == 13) {
            themsanphamphieudoitraqr()
            $("#qlpdt-qr").val("");
            $("#qlpdt-qr").focus()
        }
    })
})
$(function() {
    var mapdt = $("#mapdt").val()
    tailaitatcacactabphieu(mapdt, "mapdt")
    $('#qlxk-dg').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px"><table pagination="true"  class="ddv' + index + '"></table></div>'
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddv' + index);
            var phu = row.id;
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
                }, {
                    field: 'tenkho',
                    title: 'Tên kho',
                    width: 180,
                    align: 'left'
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
function taophieudoitra() {
    var row = $("#qlxk-dg").datagrid("getSelected");
    $("#luuthongtindoitra").removeClass('clicked');
    if (row) {
        var g = $('#combogrid-doitrahang').combogrid('grid');
        g.datagrid('load', {
            q: row.id
        });
        if (row.tinhtrang == 0) {
            thongbao("Chỉ tạo phiếu đổi trả cho những phiếu đã xuất")
            return !1
        }
        $("#dg-doitrahang").dialog("open");
        $("#luuthongtindoitra").click(function() {
            $mapn = $("#mapn").val();
            $mapx = row.id;
            $mapdt = $("#mapdt").val();
            $hinhthuctra = $("#hinhthuctrahang").is(":checked");
            $ghinokh = $("#ghinokh").is(":checked");
            $ghichu = $("#ghichu-doitrahang").textbox("getValue");
            var bien = {
                mapn: $mapn,
                mapx: $mapx,
                mapdt: $mapdt,
                hinhthuctra: $hinhthuctra,
                ghichu: $ghichu,
                ghino: $ghinokh
            }
            if (!$(this).hasClass('clicked')) {
                $("#luuthongtindoitra").addClass('clicked')
                sendajax('taophieudoitrahang', bien, 'dgdoitrahang');
                setTimeout(function() {
                    location.reload()
                }, 1000)
            }
        })
    } else {
        thongbao("Vui lòng chọn phiếu xuất cần đổi trả")
    }
}
function themsanphamphieudoitra() {
    $mapdt = $("#mapdt").val();
    var row = $("#qlxk-dg").datagrid("getSelected");
    var g = $('#combogrid-doitrahang').combogrid('grid').datagrid('getSelections');
    $chietkhau = $("#chietkhau_them").numberspinner("getValue");
    $gia = g.giaxuatspnv;
    $soluong = $("#sl_them").numberspinner("getValue");
    $solo = g.soloxuat;
    $soqr = g.soqr;
    $makho = g.makho;
    $masp = $('#combogrid-doitrahang').combogrid("getValues").toString().replace(/[^,0-9]/gi, '0')
    if (parseInt($soluong) > parseInt(g.soLxuat)) {
        thongbao("Số lượng đổi trả không được lớn hơn số lượng trên phiếu xuất")
        return !1
    } else {
        var bien = {
            mapx: row.id,
            mapdt: $mapdt,
            masp: $masp,
            chietkhau: $chietkhau,
            soluong: $soluong,
            gia: $gia,
            makho: $makho,
            solo: $solo,
            soqr: $soqr
        }
        sendajax('themsanphamdoitrahang', bien, "dg-quanLySP_sale-dsspn")
        $('#combogrid-doitrahang').combogrid('grid').datagrid("load", {
            q: row.id
        })
        $('#combogrid-doitrahang').combogrid("textbox").select()
    }
}
function themsanphamphieudoitraqr() {
    $mapdt = $("#mapdt").val();
    var row = $("#qlxk-dg").datagrid("getSelected");
    $soluong = $("#sl_them").numberspinner("getValue");
    $soqr = $("#qlpdt-qr").val()
    if (parseInt($soluong) != 1) {
        thongbao("số lượng đổi trả = 1 cho sản phẩm có qr")
        return !1
    } else {
        var bien = {
            mapx: row.id,
            mapdt: $mapdt,
            soqr: $soqr,
            soluong: $soluong
        }
        sendajax('themsanphamdoitrahangtheoqr', bien, "dg-quanLySP_sale-dsspn")
        $('#combogrid-doitrahang').combogrid('grid').datagrid("load", {
            q: $mapdt
        })
        $('#combogrid-doitrahang').combogrid("textbox").select()
    }
}
function xoasanphamphieudoitra() {
    var row = $("#dg-quanLySP_sale-dsspn").datagrid("getSelected");
    if (row) {
        $id = row.idpdt;
        var bien = {
            id: $id
        }
        xoadulieuajax("xoasanphamdoitra", bien, "dg-quanLySP_sale-dsspn", "Bạn có chắc muốn xóa sản phẩm này không")
    } else {
        thongbao("Vui chọn dòng cần xóa")
    }
}
function xoaphieudoitra() {
    var row = $("#dg-danhsachphieudoitrahang").datagrid("getSelected");
    if (row) {
        $mapdt = row.idpdt;
        $mapn = row.mapn;
        if (row.tinhtrang == "0") {
            var bien = {
                mapn: $mapn,
                mapdt: $mapdt,
                tinhtrang: row.tinhtrang,
                lydo: ""
            }
            xoadulieuajax("xoaphieudoitrahang", bien, "dg-danhsachphieudoitrahang", "Bạn có muốn xóa phiểu đổi trả này không")
        } else {
            $.messager.confirm("Xác nhận", "Phiếu đã xuất bạn có muốn xóa phiếu này không", function(r) {
                if (r) {
                    var bien = {
                        mapn: $mapn,
                        mapdt: $mapdt,
                        tinhtrang: row.tinhtrang,
                        lydo: r
                    }
                    sendajax("xoaphieudoitrahang", bien, "dg-danhsachphieudoitrahang")
                }
            })
        }
    } else {
        thongbao("Chọn phiếu cần xóa")
    }
}
function huyphieudoitra() {
    $mapdt = $("#mapdt").val();
    if (!$(this).hasClass('clicked')) {
        var bien = {
            mapdt: $mapdt
        };
        sendajax("huyphieudoitra", bien, "dg-quanLySP_sale-dsspn")
    }
}
function xuatphieudoitrapdf() {
    var row = $("#dg-danhsachphieudoitrahang").datagrid("getSelected");
    if (row) {
        $mapx = row.mapx;
        $mapn = row.mapn;
        $mapdt = row.idpdt;
        $tongthanh = row.thanhtien;
        if (row.tinhtrang == "0") {
            $hinhthuc = "";
            var bien = {
                mapx: $mapx,
                mapn: $mapn,
                mapdt: $mapdt,
                tongthanh: $tongthanh,
                hinhthuc: $hinhthuc
            }
            sendajax("xuatphieudoitrahang", bien, "dg-danhsachphieudoitrahang")
            $h = 'export_phieutrahangPDF?mapdt=' + $mapdt;
            window.open($h, '_blank')
        } else {
            $h = 'export_phieutrahangPDF?mapdt=' + $mapdt;
            window.open($h, '_blank')
        }
    } else {
        thongbao("Vui lòng chọn phiếu đổi trả")
    }
}
function xuatphieudoitraEXCEL() {
    var row = $("#dg-danhsachphieudoitrahang").datagrid("getSelected");
    if (row) {
        $mapx = row.mapx;
        $mapn = row.mapn;
        $mapdt = row.idpdt;
        $tongthanh = row.thanhtien;
        if (row.tinhtrang == "0") {
            $hinhthuc = "";
            var bien = {
                mapx: $mapx,
                mapn: $mapn,
                mapdt: $mapdt,
                tongthanh: $tongthanh,
                hinhthuc: $hinhthuc
            }
            sendajax("xuatphieudoitrahang", bien, "dg-danhsachphieudoitrahang")
            $h = 'excel_phieutrahangEXCEL?mapdt=' + $mapdt;
            window.open($h, '_blank')
        } else {
            $h = 'excel_phieutrahangEXCEL?mapdt=' + $mapdt;
            window.open($h, '_blank')
        }
    } else {
        thongbao("Vui lòng chọn phiếu đổi trả")
    }
}
$(function() {
    $('#dg-danhsachphieudoitrahang').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px"><table pagination="true"  class="ddv' + index + '"></table></div>'
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddv' + index);
            var phu = row.idpdt;
            ddv.datagrid({
                url: '../sanphams/combogrid_sp?mapdt=' + phu,
                fitColumns: !0,
                singleSelect: !0,
                rownumbers: !0,
                loadMsg: 'Đang tải...',
                emptyMsg: 'Không có dữ liệu.',
                height: 'auto',
                columns: [[{
                    field: 'tensp',
                    title: 'Tên sản phẩm',
                    width: '360px'
                }, {
                    field: 'soluong',
                    title: 'Số lượng',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'gia',
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
                    title: 'Thành tiên(VNĐ)',
                    width: 120,
                    align: 'right',
                    formatter: formatCurrency
                }, {
                    field: 'solo',
                    title: 'Số lô',
                    width: 100,
                    align: 'right'
                }, {
                    field: 'soqr',
                    title: 'số QR',
                    width: 100,
                    align: 'right'
                }, ]],
                onResize: function() {
                    $('#dg-danhsachphieudoitrahang').datagrid('fixDetailRowHeight', index)
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#dg-danhsachphieudoitrahang').datagrid('fixDetailRowHeight', index)
                    }, 0)
                }
            });
            $('#dg-danhsachphieudoitrahangg').datagrid('fixDetailRowHeight', index);
            index2 = index
        }
    })
})
