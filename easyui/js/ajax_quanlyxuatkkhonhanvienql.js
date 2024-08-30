$(document).ready(function() {
    $('#qlxk-qr').focus()
    $('#combogrid-quanLySP_sale-tpx,#combogrid-quanLySP_chuyenkho').combogrid({
        keyHandler: $.extend({}, $.fn.combogrid.defaults.keyHandler, {
            enter: function(e) {}
        })
    })
    $('#qlxk-qr,#qlxk-qr-chuyenkho').keypress(function(e) {
        if (e.which == 13) {
            if ($("#combogrid-quanLySP_sale-tpx").length) {
                var row = $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('getSelected');
                $masp = $('#combogrid-quanLySP_sale-tpx').combogrid('getValue')
                if (!row && $masp == "") {
                    xuathangduavaoqr_nppdl()
                } else {
                    luusanpham_QLSP_tpx_qr()
                }
            } else {
                xuathangduavaoqr_nppdl()
            }
        }
    });
    $('#qlxk-qr_cn').keypress(function(e) {
        if (e.which == 13) {
            if ($("#combogrid-quanLySP_sale-tpx").length) {
                var row = $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('getSelected');
                $masp = $('#combogrid-quanLySP_sale-tpx').combogrid('getValue')
                if (!row && $masp == "") {
                    luusanpham_QLSP_tpx_qr_cn_nppdl()
                } else {
                    luusanpham_QLSP_tpx_qr_cn()
                }
            } else {
                luusanpham_QLSP_tpx_qr_cn_nppdl()
            }
        }
    });
    $('#qlxk-mavach').keypress(function(e) {
        if (e.which == 13) {
            xuathangduavaosolo_nppdl()
        }
    });
    $('#qlxk-mavach_cn').keypress(function(e) {
        if (e.which == 13) {
            var row = $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('getSelected');
            $masp = $('#combogrid-quanLySP_sale-tpx').combogrid('getValue')
            if (!row && $masp == "") {
                xuathangduavaosolo_nppdl_cn()
            } else {
                luusanpham_QLSP_tpx_qr_cn()
            }
            $("#qlxk-mavach_cn").val("");
            $("#qlxk-mavach_cn").focus();
        }
    });
    $('#qlpdt-qr').keypress(function(e) {
        if (e.which == 13) {
            themsanphamphieudoitraqr()
            setTimeout(function() {
                $("#qlpdt-qr").focus();
            }, 1000);
        }
    });
})
function tailaitatcacactabphieu(mapx, session) {
    setInterval(function() {
        var session_px = localStorage.getItem("" + session);
        if (session_px != mapx) {
            location.reload()
        }
    }, 1000);
}
function sanphamtheokho(value) {
    $('#combo_gridsp').combogrid({
        url: '../sanphams/combogrid_sp?makho=' + value
    });
}
function checkmavach_QLXK() {
   
    if ($("#check_mavach").is(":checked")) {
        $('.qlxk-qr,.qlxk-mavach,.qlxk-qr_cn').hide()
        $('.qlxk-mavach_cn').show()
        $('#qlxk-mavach_cn').focus()
    } else {
        $('.qlxk-qr_cn').show()
        $('.qlxk-mavach_cn,.qlxk-qr,.qlxk-mavach').hide();
        $('#qlxk-qr_cn').focus()
    }
   
}
function taophieuxuat_QLXK() {
    $('#qlxk-tpx-dlg').dialog('open');
    $('#qlxk-dg').datagrid('clearSelections');
    $("#qlxk-frm_phieuxuat").form("clear");
    $("#cbb-quanLySP_sale-tpx-hinhthuctt").combobox('unselect', "Chuyển Khoản")
    $('#tongtranvql').numberbox('setValue', '0');
    $('#updatesanphamphieuxuat, #themsanpham_QLSP_tpx,.qlxk-qr_cn,.qlxk-mavach,.qlxk-mavach_cn').hide()
    $('#capnhatsanphamphieuxuat, #luusanpham_QLSP_tpx,#capnhat_px_an,.qlxk-qr').show()
    $('#btnthemnvpt').show()
    $('#qlxk-ghichu-tpx').textbox({
        width: '620'
    })
    $mapx = $("#mapx_an").val()
    $("#dg-quanLySP_sale-dsspn").datagrid({
        url: '../sanphams/combogrid_sp?mapx=' + $mapx
    })
    $('#qlxk-tpx-sotk-cbb').textbox('disable');
}
function formatCurrency(value=1) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function formatCurrency1(value=1) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function timkiem_quanlySP_sale() {
    $timkiem = $('#ip-quanLySP_sale-dssp').val();
    $('#dg-quanLySP_sale-dssp').datagrid('load', {
        timsp: $timkiem
    });
}
function xuatfile_QLXK() {
    var row = $('#qlxk-dg').datagrid('getSelected');
    if (row) {
        $('#qlxk_xuatfile-dlg').dialog('open');
    } else {
        thongbao("Vui lòng chọn phiếu cần xuất");
    }
}
function capnhatsanphamphieuxuat() {
    $mapx = $("#mapx_an").val();
    $tongphieu = $('#tongthanhnvql').numberbox('getValue');
    $ghichu = $('#qlxk-ghichu-tpx').textbox('getValue');
    $tongthanh = $('#tongtranvql').numberbox('getValue');
    $makh = $('#cbg-quanLySP_sale-tpx-khachhang').combogrid('getValue');
    $hantra = $('#hantraphieuxuatql').datebox('getValue');
    $hinhthucthanh = $('#cbb-quanLySP_sale-tpx-hinhthuctt').combobox('getValue');
    $sotaikhoan = $('#txtb-quanLySP_sale-tpx-sotk').textbox('getValue');
    $nhanvien = $("#nhanvienkd").combobox("getValue");
    $makh = parseInt($makh)
    $tongthanhtoan = parseInt($tongphieu)
    var g = $('#cbg-quanLySP_sale-tpx-khachhang').combogrid('grid');
    var row = g.datagrid('getSelected')
    if (isNaN($makh) || $makh == '') {
        thongbao("Vui lòng Click chọn khách hàng");
        return false;
    }
    if (row) {
        $no = parseInt(row.nokh)
        $gioihan = parseInt(row.sotien)
        $tong = $gioihan - $no
        $sotienvuot = $tongthanhtoan - $tong
        $matc = row.maTC
        $sotienvuot = formatCurrency($sotienvuot)
        if ($tongthanhtoan > $tong && $hinhthucthanh != "COD" && $hinhthucthanh != "COD+Phí Ship" && $matc == '1') {
            thongbao("Vượt giới hạn công nợ cho phép " + $sotienvuot + " (VNĐ), không được xuất phiếu")
            return false
        }
    } else {
        thongbao("Vui lòng click chọn khách hàng ")
    }
    if ($hinhthucthanh == '') {
        thongbao("Vui lòng chọn hình thức thanh toán");
        return false;
    }
    if (parseInt($tongthanh) > parseInt($tongphieu)) {
        thongbao("Tổng trả trước phải " + $tongthanh + " <= tổng thanh " + $tongphieu);
        $('#tongtranvql').numberbox('setValue', $tongphieu);
        return false;
    }
    if (!$("#capnhatsanphamphieuxuat").hasClass('clicked')) {
        $("#capnhatsanphamphieuxuat").addClass('clicked');
        var bien = {
            id: $mapx,
            tongphieu: $tongphieu,
            ghichu: $ghichu,
            tongthanh: $tongthanh,
            makh: $makh,
            hantra: $hantra,
            hinhthucthanh: $hinhthucthanh,
            sotaikhoan: $sotaikhoan,
            tinhtrang: 'ql',
            manv: $nhanvien
        }
        sendajax("capNhatPhieuXuat", bien);
        setTimeout(function() {
            location.reload()
            if ($("#check_xuatphieu").is(":checked")) {
                $h = 'export_phieuxuatkhoPDF?mapx=' + $mapx;
                window.open($h, '_blank');
            }
        }, 1000);
    }
}
function huyphieu() {
    var row = $("#qlxk-dg").datagrid("getSelected")
    if (row) {
        var bien_ = {
            mapx: row.id
        }
        if (row.hinhthucthanh == "chuyển kho") {
            $.post('../chuyenkhos/kiemtratinhtrangchuyenkho', {
                thamso: bien_
            }, function(data) {
                if (data) {
                    if (data != "true") {
                        thongbao("Phiếu chuyển kho đã được nhập kho không được xóa hoặc cập nhật")
                        return false;
                    } else {
                        $.messager.prompt({
                            title: 'Prompt',
                            msg: 'Lý do xóa phiếu:',
                            fn: function(r) {
                                if (r) {
                                    var bien = {
                                        mapx: row.id,
                                        lydo: r,
                                        tenmaphieu: row.maPhieuxuat,
                                        tenthaotac: 'Xóa phiếu chuyển kho admin',
                                        loai: 'PX'
                                    }
                                    xoadulieuajax("xoaPhieuXuat", bien, "qlxk-dg", "Việc xóa phiếu xuất sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                                } else {
                                    var bien = {
                                        mapx: row.id,
                                        lydo: "",
                                        tenmaphieu: row.maPhieuxuat,
                                        tenthaotac: 'Xóa phiếu chuyển kho admin',
                                        loai: 'PX'
                                    }
                                    xoadulieuajax("xoaPhieuXuat", bien, "qlxk-dg", "Việc xóa phiếu xuất sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                                }
                            }
                        });
                    }
                }
            })
        } else {
            $.messager.prompt({
                title: 'Prompt',
                msg: 'Lý do xóa phiếu:',
                fn: function(r) {
                    if (r) {
                        var bien = {
                            mapx: row.id,
                            lydo: r,
                            tenmaphieu: row.maPhieuxuat,
                            tenthaotac: 'Xóa phiếu xuất admin',
                            loai: 'PX'
                        }
                        xoadulieuajax("xoaPhieuXuat", bien, "qlxk-dg", "Việc xóa phiếu xuất sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                    } else {
                        var bien = {
                            mapx: row.id,
                            lydo: "",
                            tenmaphieu: row.maPhieuxuat,
                            tenthaotac: 'Xóa phiếu xuất admin',
                            loai: 'PX'
                        }
                        xoadulieuajax("xoaPhieuXuat", bien, "qlxk-dg", "Việc xóa phiếu xuất sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                    }
                }
            });
        }
    } else {
        thongbao("Vui lòng chọn phiếu cần xóa")
    }
}
function huyphieu_nvk() {
    var row = $("#qlxk-dg").datagrid("getSelected")
    if (row) {
        var url = "kiemtratinhtrangphieuxuat"
        var bien_ = {
            mapx: row.id
        }
        if (row.hinhthucthanh == 'chuyển kho') {
            $.post('../chuyenkhos/kiemtratinhtrangchuyenkho', {
                thamso: bien_
            }, function(data) {
                if (data) {
                    if (data != "true") {
                        thongbao("Phiếu chuyển kho đã được nhập kho không được xóa hoặc cập nhật")
                        return false;
                    } else {
                        $.post(url, {
                            thamso: bien_
                        }, function(data) {
                            if (data) {
                                if (data != "true") {
                                    thongbao("Chỉ xóa khi tình trạng phiếu chưa xuất")
                                    return false;
                                } else {
                                    $.messager.prompt({
                                        title: 'Prompt',
                                        msg: 'Lý do xóa phiếu:',
                                        fn: function(r) {
                                            if (r) {
                                                var bien = {
                                                    mapx: row.id,
                                                    lydo: r,
                                                    tenmaphieu: row.maPhieuxuat,
                                                    tenthaotac: 'Xóa phiếu chuyển kho',
                                                    loai: 'PX'
                                                }
                                                xoadulieuajax("xoaPhieuXuat", bien, "qlxk-dg", "Việc xóa phiếu xuất sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                                            } else {
                                                var bien = {
                                                    mapx: row.id,
                                                    lydo: "",
                                                    tenmaphieu: row.maPhieuxuat,
                                                    tenthaotac: 'Xóa phiếu chuyển kho',
                                                    loai: 'PX'
                                                }
                                                xoadulieuajax("xoaPhieuXuat", bien, "qlxk-dg", "Việc xóa phiếu xuất sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                                            }
                                        }
                                    });
                                }
                            }
                        })
                    }
                }
            })
        } else {
            $.post(url, {
                thamso: bien_
            }, function(data) {
                if (data) {
                    if (data != "true") {
                        thongbao("Chỉ xóa khi tình trạng phiếu chưa xuất")
                        return false;
                    } else {
                        $.messager.prompt({
                            title: 'Prompt',
                            msg: 'Lý do xóa phiếu:',
                            fn: function(r) {
                                if (r) {
                                    var bien = {
                                        mapx: row.id,
                                        lydo: r,
                                        tenmaphieu: row.maPhieuxuat,
                                        tenthaotac: 'Xóa phiếu xuất',
                                        loai: 'PX'
                                    }
                                    xoadulieuajax("xoaPhieuXuat", bien, "qlxk-dg", "Việc xóa phiếu xuất sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                                } else {
                                    var bien = {
                                        mapx: row.id,
                                        lydo: "",
                                        tenmaphieu: row.maPhieuxuat,
                                        tenthaotac: 'Xóa phiếu xuất',
                                        loai: 'PX'
                                    }
                                    xoadulieuajax("xoaPhieuXuat", bien, "qlxk-dg", "Việc xóa phiếu xuất sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                                }
                            }
                        });
                    }
                }
            })
        }
    } else {
        thongbao("Vui lòng chọn phiếu cần xóa")
    }
}
function capnhatphieuxuat_QLXK() {
    var row = $("#qlxk-dg").datagrid("getSelected")
    if (row) {
        var bien_ = {
            mapx: row.id
        }
        if (row.tongthanhtoan != 0) {
            thongbao("Chỉ cập nhật khi tổng thanh=0")
            return false;
        }
        if (row.hinhthucthanh == "chuyển kho") {
            $.post('../chuyenkhos/kiemtratinhtrangchuyenkho', {
                thamso: bien_
            }, function(data) {
                if (data) {
                    if (data != "true") {
                        thongbao("Phiếu chuyển kho đã được nhập kho không được xóa hoặc cập nhật")
                        return false;
                    } else {
                        $('#qlxk-tpx-dlg').dialog('open');
                    }
                }
            })
        } else {
            $('#qlxk-tpx-dlg').dialog('open');
        }
        $mapx = row.id;
        $tongthanh_ = row.tongphieuX;
        $tongthanhtoan_ = row.tongthanhtoan;
        $('#tongthanhnvql').numberbox('setValue', $tongthanh_);
        $('#tongtranvql').numberbox('setValue', $tongthanhtoan_);
        $('#qlxk-ghichu-tpx').textbox('setValue', row.ghichu);
        $('#hantraphieuxuatql').datebox('setValue', row.hantra);
        $('#txtb-quanLySP_sale-tpx-sotk').textbox('setValue', row.sotaikhoan);
        $('#cbb-quanLySP_sale-tpx-hinhthuctt').combobox('setValue', row.hinhthucthanh);
        $("#dg-quanLySP_sale-dsspn").datagrid({
            url: '../sanphams/combogrid_sp?mapx=' + $mapx
        })
        $('#updatesanphamphieuxuat, #themsanpham_QLSP_tpx,.qlxk-qr_cn').show()
        $('#capnhatsanphamphieuxuat,#luusanpham_QLSP_tpx,#capnhat_px_an,.qlxk-qr,.qlxk-mavach,.qlxk-mavach_cn').hide()
        $('#btnhuyphieux').hide()
        $('#btnthemnvpt').hide()
        $('#tongthanhnvql').numberbox('setValue', $tongthanh_);
        $('#qlxk-ghichu-tpx').textbox({
            width: '1040'
        })
        $("#updatesanphamphieuxuat").removeClass('clicked');
        $("#updatesanphamphieuxuat").click(function() {
            $tongphieu = $('#tongthanhnvql').numberbox('getValue');
            $ghichu = $('#qlxk-ghichu-tpx').textbox('getValue');
            $tongthanh = $('#tongtranvql').numberbox('getValue');
            $makh = $('#cbg-quanLySP_sale-tpx-khachhang').combogrid('getValue');
            $hantra = $('#hantraphieuxuatql').datebox('getValue');
            $hinhthucthanh = $('#cbb-quanLySP_sale-tpx-hinhthuctt').combobox('getValue');
            $sotaikhoan = $('#txtb-quanLySP_sale-tpx-sotk').textbox('getValue');
            $nhanvien = $("#nhanvienkd").combobox("getValue");
            if ($hinhthucthanh == '') {
                thongbao("Vui lòng chọn hình thức thanh toán");
                return false;
            }
            if (parseInt($tongthanh) > parseInt($tongphieu)) {
                thongbao("Tổng trả trước phải " + $tongthanh + " <= tổng thanh " + $tongphieu);
                $('#tongtranvql').numberbox('setValue', $tongphieu);
                return false;
            }
            if (!$(this).hasClass('clicked')) {
                $("#updatesanphamphieuxuat").addClass('clicked')
                var bien = {
                    id: $mapx,
                    tongphieu: $tongphieu,
                    ghichu: $ghichu,
                    tongthanh: $tongthanh,
                    makh: $makh,
                    hantra: $hantra,
                    hinhthucthanh: $hinhthucthanh,
                    sotaikhoan: $sotaikhoan,
                    tinhtrang: 'ql',
                    manv: $nhanvien,
                    loai: 'capnhat'
                }
                sendajax("capNhatPhieuXuat", bien, "qlxk-dg");
                $('#qlxk-tpx-dlg').dialog('close');
            }
        })
        $('#qlxk-tpx-dlg').form('load', row)
    } else {
        thongbao("Vui lòng chọn phiếu xuất cần cập nhật")
    }
}
function capnhatphieuxuat_nvk() {
    var row = $("#qlxk-dg").datagrid("getSelected")
    if (row) {
        var url = "kiemtratinhtrangphieuxuat"
        var bien_ = {
            mapx: row.id
        }
        if (row.hinhthucthanh == "chuyển kho") {
            $.post('../chuyenkhos/kiemtratinhtrangchuyenkho', {
                thamso: bien_
            }, function(data) {
                if (data) {
                    if (data != "true") {
                        thongbao("Phiếu chuyển kho đã được nhập kho không được xóa hoặc cập nhật")
                        return false;
                    } else {
                        $('#qlxk-tpx-dlg').dialog('open');
                    }
                }
            })
        } else {
            $.post(url, {
                thamso: bien_
            }, function(data) {
                if (data) {
                    if (data != "true") {
                        thongbao("Chỉ cập nhật khi tình trạng phiếu chưa xuất")
                        return false;
                    } else {
                        $('#qlxk-tpx-dlg').dialog('open');
                    }
                }
            })
        }
        $mapx = row.id;
        $tongthanh_ = row.tongphieuX
        $tongthanhtoan_ = row.tongthanhtoan
        $('#tongthanhnvql').numberbox('setValue', $tongthanh_);
        $('#tongtranvql').numberbox('setValue', $tongthanhtoan_);
        $('#qlxk-ghichu-tpx').textbox('setValue', row.ghichu);
        $('#txtb-quanLySP_sale-tpx-sotk').textbox('setValue', row.sotaikhoan);
        $('#cbb-quanLySP_sale-tpx-hinhthuctt').combobox('setValue', row.hinhthucthanh);
        $("#dg-quanLySP_sale-dsspn").datagrid({
            url: '../sanphams/combogrid_sp?mapx=' + $mapx
        })
        $('#updatesanphamphieuxuat, #themsanpham_QLSP_tpx,#qlxk-qr_cn').show()
        $('#capnhatsanphamphieuxuat,#luusanpham_QLSP_tpx,#capnhat_px_an,.qlxk-qr,.qlxk-mavach,.qlxk-mavach_cn').hide()
        $('#btnhuyphieux').hide()
        $('#btnthemnvpt').hide()
        $('#tongthanhnvql').numberbox('setValue', $tongthanh_);
        $('#qlxk-ghichu-tpx').textbox({
            width: '1020'
        })
        $("#updatesanphamphieuxuat").removeClass('clicked');
        $("#updatesanphamphieuxuat").click(function() {
            $tongphieu = $('#tongthanhnvql').numberbox('getValue');
            $ghichu = $('#qlxk-ghichu-tpx').textbox('getValue');
            $tongthanh = $('#tongtranvql').numberbox('getValue');
            $makh = $('#cbg-quanLySP_sale-tpx-khachhang').combogrid('getValue');
            $hantra = $('#hantraphieuxuatql').datebox('getValue');
            $hinhthucthanh = $('#cbb-quanLySP_sale-tpx-hinhthuctt').combobox('getValue');
            $sotaikhoan = $('#txtb-quanLySP_sale-tpx-sotk').textbox('getValue');
            $nhanvien = $("#nhanvienkd").combobox("getValue");
            if ($hinhthucthanh == '') {
                thongbao("Vui lòng chọn hình thức thanh toán");
                return false;
            }
            if (parseInt($tongthanh) > parseInt($tongphieu)) {
                thongbao("Tổng trả trước phải " + $tongthanh + " <= tổng thanh " + $tongphieu);
                $('#tongtranvql').numberbox('setValue', $tongphieu);
                return false;
            }
            if (!$(this).hasClass('clicked')) {
                $("#updatesanphamphieuxuat").addClass('clicked')
                var bien = {
                    id: $mapx,
                    tongphieu: $tongphieu,
                    ghichu: $ghichu,
                    tongthanh: $tongthanh,
                    makh: $makh,
                    hantra: $hantra,
                    hinhthucthanh: $hinhthucthanh,
                    sotaikhoan: $sotaikhoan,
                    tinhtrang: 'ql',
                    manv: $nhanvien,
                    loai: 'capnhat'
                }
                sendajax("capNhatPhieuXuat", bien, "qlxk-dg");
                $('#qlxk-tpx-dlg').dialog('close');
            }
        })
    } else {
        thongbao("Vui lòng chọn phiếu xuất cần cập nhật")
    }
}
function huyphieuxuatnvql(tam="dssp") {
    $mapx = $("#mapx_an").val();
    if (!$(this).hasClass('clicked')) {
        var bien = {
            mapx: $mapx,
            tenmaphieu: $mapx,
            tenthaotac: 'Hủy phiếu xuất',
            loai: 'PX'
        };
        sendajax("../phieuxuatsps/huyPhieuXuat", bien, tam);
        $('#qlxk-tpx-dlg').dialog('close');
    }
}
function huyphieuxuatnvqltaophieu(tam="dssp") {
    $mapx = $("#mapx_an").val();
    if (!$(this).hasClass('clicked')) {
        var bien = {
            mapx: $mapx,
            tenmaphieu: $mapx,
            tenthaotac: 'Hủy phiếu xuất',
            loai: 'PX'
        };
        sendajax("../phieuxuatsps/huyPhieuXuat", bien, "dg-quanLySP_sale-dsspn");
    }
}
function luusanpham_QLSP_tpx() {
    var row = $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('getSelected');
    var sl = row.soluongton;
    var sld = $('#sl_them').numberspinner('getValue');
    $solthem = parseInt(sld)
    if ($solthem <= 0 || isNaN($solthem)) {
        thongbao("Số lượng thêm >0 và không rỗng")
        return false
    }
    if (parseInt(sld) > parseInt(sl)) {
        if (row.makho != "") {
            thongbao("Số lượng hiện tại không đủ cho đơn hàng")
            $('#sl_them').numberspinner('setValue', 1);
            $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").focus();
            return false;
        }
        $.messager.confirm('Confirm', "Số lượng hiện tại không đủ cho đơn hàng,\n bạn có muốn xuất âm không?", function(r) {
            if (r) {
                $xuatam = "1";
                $mapx = $("#mapx_an").val();
                $masp = row.Masanpham;
                $soluong = sld;
                $chietkhau = $("#chietkhau_them").numberspinner('getValue');
                $gia = row.gia_ban;
                $makho = row.makho;
                $solo = row.solo;
                $soqr = $("#qlxk-qr").val();
                if (!$(this).hasClass('clicked')) {
                    var bien = {
                        tenmaphieu: $mapx,
                        tenthaotac: 'Thêm sp px_tm',
                        loai: 'PX',
                        xuatam: $xuatam,
                        id_px: row.id_xuatkho_sp,
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
                        num1: "tongtien"
                    };
                    $('#dg-quanLySP_sale-dsspn').datagrid({
                        onLoadSuccess: function() {
                            sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                            $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                            $("#qlxk-qr").val("");
                            $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").select();
                        }
                    })
                }
            } else {
                $('#sl_them').numberspinner('setValue', 1);
                $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").focus();
                return false;
            }
        })
    } else {
        $xuatam = "0";
        $mapx = $("#mapx_an").val();
        $masp = row.Masanpham;
        $soluong = sld;
        $chietkhau = $("#chietkhau_them").numberspinner('getValue');
        $gia = row.gia_ban;
        $makho = row.makho;
        $solo = row.solo;
        $soqr = $("#qlxk-qr").val();
        if (!$(this).hasClass('clicked')) {
            var bien = {
                tenmaphieu: $mapx,
                tenthaotac: 'Thêm sp px_tm',
                loai: 'PX',
                xuatam: $xuatam,
                id_px: row.id_xuatkho_sp,
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
                num1: "tongthanhnvql"
            };
            $('#dg-quanLySP_sale-dsspn').datagrid({
                onLoadSuccess: function() {
                    sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                    $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                    $("#qlxk-qr").val("");
                    $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").select();
                }
            })
        }
    }
}
function xuathangduavaosolo_nppdl_cn() {
    $solo = $("#qlxk-mavach_cn").val();
    $row = $("#qlxk-dg").datagrid("getSelected")
    if ($row) {
        $mapx = $row.id
    } else {
        thongbao("Vui lòng chọn phiếu cần cập nhật")
        return false
    }
    $chietkhau = $("#chietkhau_them").numberspinner('getValue');
    var sld = $('#sl_them').numberspinner('getValue');
    $solthem = parseInt(sld)
    if ($solthem <= 0 || isNaN($solthem)) {
        thongbao("Số lượng thêm >0 và không rỗng")
        return false
    }
    var bien = {
        mapx: $mapx,
        solo: $solo,
        chietkhau: $chietkhau,
        soluong: $solthem
    };
    var array = {
        num1: "tongtien"
    };
    sendajax("../phieuxuatsps/themsanphamxuatkhoduavaosolo", bien, "dg-quanLySP_sale-dsspn");
    $('#dg-quanLySP_sale-dsspn').datagrid({
        onLoadSuccess: function() {
            sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien, array);
        }
    })
    $("#qlxk-mavach_cn").val("")
    $("#qlxk-mavach_cn").focus()
}
function xuathangduavaosolo_nppdl() {
    $solo = $("#qlxk-mavach").val();
    $mapx = $("#mapx_an").val();
    $chietkhau = $("#chietkhau_them").numberspinner('getValue');
    var sld = $('#sl_them').numberspinner('getValue');
    $solthem = parseInt(sld)
    if ($solthem <= 0 || isNaN($solthem)) {
        thongbao("Số lượng thêm >0 và không rỗng")
        return false
    }
    var bien = {
        mapx: $mapx,
        solo: $solo,
        chietkhau: $chietkhau,
        soluong: $solthem
    };
    var array = {
        num1: "tongthanhnvql"
    };
    sendajax("../phieuxuatsps/themsanphamxuatkhoduavaosolo", bien, "dg-quanLySP_sale-dsspn");
    $('#dg-quanLySP_sale-dsspn').datagrid({
        onLoadSuccess: function() {
            sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien, array);
        }
    })
    $("#qlxk-mavach").val("")
    $("#qlxk-mavach").focus()
}
function xuathangduavaoqr_nppdl() {
    $soqr = $("#qlxk-qr").val();
    $mapx = $("#mapx_an").val();
    $chietkhau = $("#chietkhau_them").numberspinner('getValue');
    var bien = {
        mapx: $mapx,
        soqr: $soqr,
        chietkhau: $chietkhau
    };
    var array = {
        num1: "tongthanhnvql"
    };
    sendajax("../phieuxuatsps/themsanphamxuatkhoduavaoqr", bien, "dg-quanLySP_sale-dsspn");
    $('#dg-quanLySP_sale-dsspn').datagrid({
        onLoadSuccess: function() {
            sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien, array);
        }
    })
    $("#qlxk-qr").val("")
    $("#qlxk-qr").focus()
}
function luusanpham_QLSP_tpx_qr() {
    var row = $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('getSelected');
    var sl = row.soluongton;
    var sld = $('#sl_them').numberspinner('getValue');
    $solthem = parseInt(sld)
    $solo = row.solo;
    $soqr = $("#qlxk-qr").val();
    if ($solthem <= 0 || $solthem > 1 || isNaN($solthem)) {
        thongbao("Số lượng thêm phải bằng 1")
        return false
    }
    if (parseInt(sld) > parseInt(sl)) {
        if (row.makho != "") {
            thongbao("Số lượng hiện tại không đủ cho đơn hàng")
            $('#sl_them').numberspinner('setValue', 1);
            $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").focus();
            return false;
        }
        $.messager.confirm('Confirm', "Số lượng hiện tại không đủ cho đơn hàng,\n bạn có muốn xuất âm không?", function(r) {
            if (r) {
                $xuatam = "1";
                $mapx = $("#mapx_an").val();
                $masp = row.Masanpham;
                $soluong = sld;
                $chietkhau = $("#chietkhau_them").numberspinner('getValue');
                $gia = row.gia_ban;
                $makho = row.makho;
                if (!$(this).hasClass('clicked')) {
                    var bien = {
                        tenmaphieu: $mapx,
                        tenthaotac: 'Thêm sp px qr_tm',
                        loai: 'PX',
                        xuatam: $xuatam,
                        id_px: row.id_xuatkho_sp,
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
                        num1: "tongtien"
                    };
                    $('#dg-quanLySP_sale-dsspn').datagrid({
                        onLoadSuccess: function() {
                            sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                            $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                        }
                    })
                    $("#qlxk-qr").val("")
                    $("#qlxk-qr").focus()
                }
            } else {
                $('#sl_them').numberspinner('setValue', 1);
                $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").focus();
                return false;
            }
        })
    } else {
        $xuatam = "0";
        $mapx = $("#mapx_an").val();
        $masp = row.Masanpham;
        $soluong = sld;
        $chietkhau = $("#chietkhau_them").numberspinner('getValue');
        $gia = row.gia_ban;
        $makho = row.makho;
        if (!$(this).hasClass('clicked')) {
            var bien = {
                tenmaphieu: $mapx,
                tenthaotac: 'Thêm sp px qr_tm',
                loai: 'PX',
                xuatam: $xuatam,
                id_px: row.id_xuatkho_sp,
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
                num1: "tongthanhnvql"
            };
            $('#dg-quanLySP_sale-dsspn').datagrid({
                onLoadSuccess: function() {
                    sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                    $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                }
            })
            $("#qlxk-qr").val("")
            $("#qlxk-qr").focus()
        }
    }
}
function luusanpham_QLSP_tpx_qr_cn_nppdl() {
    $soqr = $("#qlxk-qr_cn").val();
    $row = $("#qlxk-dg").datagrid("getSelected")
    if ($row) {
        $mapx = $row.id
    } else {
        thongbao("Vui lòng chọn phiếu cần cập nhật")
        return false
    }
    $chietkhau = $("#chietkhau_them").numberspinner('getValue');
    var bien = {
        mapx: $mapx,
        soqr: $soqr,
        chietkhau: $chietkhau
    };
    var array = {
        num1: "tongtien"
    };
    sendajax("../phieuxuatsps/themsanphamxuatkhoduavaoqr", bien, "dg-quanLySP_sale-dsspn");
    $('#dg-quanLySP_sale-dsspn').datagrid({
        onLoadSuccess: function() {
            sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien, array);
        }
    })
    $("#qlxk-qr_cn").val("")
    $("#qlxk-qr_cn").focus()
}
function luusanpham_QLSP_tpx_qr_cn() {
    var row = $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('getSelected');
    var mapxs = $("#qlxk-dg").datagrid("getSelected")
    var sl = row.soluongton;
    var sld = $('#sl_them').numberspinner('getValue');
    $solthem = parseInt(sld)
    $solo = row.solo;
    $soqr = $("#qlxk-qr_cn").val();
    if ($solthem <= 0 || $solthem > 1 || isNaN($solthem)) {
        thongbao("Số lượng thêm phải bằng 1")
        return false
    }
    if (parseInt(sld) > parseInt(sl)) {
        if (row.makho != "") {
            thongbao("Số lượng hiện tại không đủ cho đơn hàng")
            $('#sl_them').numberspinner('setValue', 1);
            $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").focus();
            return false;
        }
        $.messager.confirm('Confirm', "Số lượng hiện tại không đủ cho đơn hàng,\n bạn có muốn xuất âm không?", function(r) {
            if (r) {
                $xuatam = "1";
                $mapx = mapxs.id;
                $masp = row.Masanpham;
                $soluong = sld;
                $chietkhau = $("#chietkhau_them").numberspinner('getValue');
                $gia = row.gia_ban;
                $makho = row.makho;
                if (!$(this).hasClass('clicked')) {
                    var bien = {
                        tenmaphieu: mapxs.maPhieuxuat,
                        tenthaotac: 'Thêm sp px qr_cn',
                        loai: 'PX',
                        xuatam: $xuatam,
                        id_px: row.id_xuatkho_sp,
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
                        num1: "tongtien"
                    };
                    $('#dg-quanLySP_sale-dsspn').datagrid({
                        onLoadSuccess: function() {
                            sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                            $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                        }
                    })
                    $("#qlxk-qr_cn").val("")
                    $("#qlxk-qr_cn").focus();
                }
            } else {
                $('#sl_them').numberspinner('setValue', 1);
                $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").focus();
                return false;
            }
        })
    } else {
        $xuatam = "0";
        $mapx = mapxs.id;
        $masp = row.Masanpham;
        $soluong = sld;
        $chietkhau = $("#chietkhau_them").numberspinner('getValue');
        $gia = row.gia_ban;
        $makho = row.makho;
        if (!$(this).hasClass('clicked')) {
            var bien = {
                tenmaphieu: mapxs.maPhieuxuat,
                tenthaotac: 'Thêm sp px qr_cn',
                loai: 'PX',
                xuatam: $xuatam,
                id_px: row.id_xuatkho_sp,
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
                num1: "tongthanhnvql"
            };
            $('#dg-quanLySP_sale-dsspn').datagrid({
                onLoadSuccess: function() {
                    sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                    $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                }
            })
            $("#qlxk-qr_cn").val("")
            $("#qlxk-qr_cn").focus();
        }
    }
}
function themsanpham_QLSP_tpx() {
    var row = $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('getSelected');
    var mapxs = $("#qlxk-dg").datagrid("getSelected")
    var sl = row.soluongton;
    var sld = $('#sl_them').numberspinner('getValue');
    $solthem = parseInt(sld)
    if ($solthem <= 0 || isNaN($solthem)) {
        thongbao("Số lượng thêm >0 và không rỗng")
        return false
    }
    if (parseInt(sld) > parseInt(sl)) {
        if (row.makho != "") {
            thongbao("Số lượng hiện tại không đủ cho đơn hàng")
            $('#sl_them').numberspinner('setValue', 1);
            $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").focus();
            return false;
        }
        $.messager.confirm('Confirm', "Số lượng hiện tại không đủ cho đơn hàng,\n bạn có muốn xuất âm không?", function(r) {
            if (r) {
                $xuatam = "1";
                $mapx = mapxs.id;
                $masp = row.Masanpham;
                $soluong = sld;
                $chietkhau = $("#chietkhau_them").numberspinner('getValue');
                $gia = row.gia_ban;
                $makho = row.makho;
                $solo = row.solo;
                $soqr = $("#qlxk-qr_cn").val();
                if (!$(this).hasClass('clicked')) {
                    var bien = {
                        tenmaphieu: mapxs.maPhieuxuat,
                        tenthaotac: 'Thêm sp px',
                        loai: 'PX',
                        xuatam: $xuatam,
                        id_px: row.id_xuatkho_sp,
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
                        num1: "tongthanhnvql"
                    };
                    $('#dg-quanLySP_sale-dsspn').datagrid({
                        onLoadSuccess: function() {
                            sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                            $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                            $("#qlxk-qr_cn").val("");
                            $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").select();
                        }
                    })
                }
            } else {
                $('#sl_them').numberspinner('setValue', 1);
                $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").focus();
                return false;
            }
        })
    } else {
        $xuatam = "0";
        $mapx = mapxs.id;
        $masp = row.Masanpham;
        $soluong = sld;
        $chietkhau = $("#chietkhau_them").numberspinner('getValue');
        $gia = row.gia_ban;
        $makho = row.makho;
        $solo = row.solo;
        $soqr = $("#qlxk-qr_cn").val();
        if (!$(this).hasClass('clicked')) {
            var bien = {
                tenmaphieu: mapxs.maPhieuxuat,
                tenthaotac: 'Thêm sp px',
                loai: 'PX',
                xuatam: $xuatam,
                id_px: row.id_xuatkho_sp,
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
                num1: "tongthanhnvql"
            };
            $('#dg-quanLySP_sale-dsspn').datagrid({
                onLoadSuccess: function() {
                    sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                    $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                    $("#qlxk-qr_cn").val("");
                    $('#combogrid-quanLySP_sale-tpx').combogrid("textbox").select();
                }
            })
        }
    }
}
function capnhatthongtinspxk() {
    var row = $("#dg-quanLySP_sale-dsspn").datagrid("getSelected")
    var hang = $('#dg-quanLySP_sale-dsspn').datagrid('getChecked');
    if (row) {
        $soluong = $("#soluong_capnhatsp").numberbox("getValue")
        $soluong = parseInt($soluong)
        $chietkhau = $("#chietkhau_capnhatsp").numberbox("getValue")
        $soqr = $("#qr_capnhatsp").textbox("getValue")
        $sqr = row.soqr
        $id = hang[0].id;
        for (var i = 1; i < hang.length; i++) {
            $id = $id + "," + (hang[i].id)
        }
        if ($soluong > 0 && isNaN($soluong) == false && $chietkhau != "") {
            $bien = {
                id: $id,
                soluong: $soluong,
                chietkhau: $chietkhau,
                soqr: $soqr,
                sqr: $sqr,
                mapx: row.maphieuX,
                makho: row.makho,
                masp: row.maSP
            }
            sendajax("capnhatgiavachietkhausp", $bien, "dg-quanLySP_sale-dsspn")
            $('#capnhatsp-dlg').dialog('close')
        } else {
            thongbao("Số lượng >0, chiết khấu không được để rỗng")
        }
    } else {
        thongbao("Vui lòng chọn sản phẩm cần cập nhật")
    }
}
function capnhatnhanvienkd() {
    var row = $("#qlxk-dg").datagrid("getSelected")
    $("#capnhatnhanvienkd").removeClass('clicked');
    if (row) {
        $mapx = row.id
        $makh = row.maKH
        if (row.tongthanhtoan != 0) {
            thongbao("Chỉ cập nhật khi tổng thanh=0")
            return false;
        }
        $('#cn_nhanvienkd').combobox('setValue', row.tenNVKD);
        $('#cn_nhanvienkd').combobox('reload', '../nhanviens/dsNV?nhanvien=' + $makh)
        $('#qlxk_capnhatnvkd-dlg').dialog('open')
        $("#capnhatnhanvienkd").click(function() {
            $tennv = row.tenNVKD
            $manv = $("#cn_nhanvienkd").combobox("getValue")
            var bien = {
                mapx: $mapx,
                tennv: $tennv,
                manv: $manv
            }
            if (!$(this).hasClass('clicked')) {
                $("#capnhatnhanvienkd").addClass('clicked')
                xoadulieuajax("../phieuxuatsps/thaydoinvkinhdoanh", bien, "qlxk-dg", "Việc cập nhật phiếu xuất sẽ ảnh hưởng đến doanh số nvkd bạn có muốn cập nhật không")
                $('#qlxk_capnhatnvkd-dlg').dialog('close')
            }
            function capnhattongphieuxuat() {
                var row = $("#qlxk-dg").datagrid("getSelected")
                $("#capnhatongphieuxuat").removeClass('clicked');
                if (row) {
                    $mapx = row.id
                    $tongphieu = row.tongphieuX
                    $("#tongphieuxuat").numberspinner("setValue", $tongphieu)
                    $('#qlxk_capnhattongphieu-dlg').dialog('open')
                    $("#capnhatongphieuxuat").click(function() {
                        $tongphieuxuat = $("#tongphieuxuat").numberspinner("getValue")
                        var bien = {
                            mapx: $mapx,
                            tongphieu: $tongphieuxuat
                        }
                        if (!$(this).hasClass('clicked')) {
                            $("#capnhatongphieuxuat").addClass('clicked')
                            xoadulieuajax("../phieuxuatsps/capnhattongphieuxuat", bien, "qlxk-dg", "Bạn có muốn thực hiện thao tác này không?")
                            $('#qlxk_capnhattongphieu-dlg').dialog('close')
                        }
                    })
                } else {
                    thongbao("Vui lòng chọn phiếu xuất cần cập nhật tổng phiếu")
                }
            }
        })
    } else {
        thongbao("Vui lòng chọn phiếu xuất cần cập nhật nhân viên")
    }
}
function delete_QLSP_tpx() {
    var hang = $('#dg-quanLySP_sale-dsspn').datagrid('getChecked');
    var hang_ = $('#dg-quanLySP_sale-dsspn').datagrid('getSelected');
    var row = $("#qlxk-dg").datagrid("getSelected")
    if (row) {
        $map = row.id
        $tenmaphieu = row.maPhieuxuat
    } else {
        $map = $("#mapx_an").val();
        $tenmaphieu = $("#mapx_an").val();
    }
    if (hang_) {
        $id = hang[0].id;
        for (var i = 1; i < hang.length; i++) {
            $id = $id + "," + (hang[i].id)
        }
        if (!$(this).hasClass('clicked')) {
            var bien = {
                id: $id,
                map: $map,
                tenmaphieu: $tenmaphieu,
                tenthaotac: 'Xóa sp px',
                loai: 'PX'
            };
            sendajax("../phieuxuatsps/xoaSanPhamPhieuXuatNV", bien, "dg-quanLySP_sale-dsspn");
            if (row) {
                $mapx = row.id
            } else {
                $mapx = $("#mapx_an").val();
            }
            var bien_1 = {
                mapx: $mapx
            }
            var array = {
                num1: "tongthanhnvql"
            };
            $('#dg-quanLySP_sale-dsspn').datagrid({
                onLoadSuccess: function() {
                    sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                    if ($("#combogrid-quanLySP_sale-tpx").length) {
                        $('#combogrid-quanLySP_sale-tpx').combogrid('grid').datagrid('reload');
                    }
                }
            })
        }
    } else {
        thongbao('Vui lòng chọn phiếu cần xóa')
    }
}
$(function() {
    $('#qlxk-dg').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px"><table pagination="true"  class="ddv' + index + '"></table></div>';
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddv' + index);
            var phu = row.id;
            ddv.datagrid({
                url: '../sanphams/combogrid_sp?mapx=' + phu,
                fitColumns: true,
                singleSelect: true,
                showFooter: true,
                rownumbers: true,
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
                    $('#qlxk-dg').datagrid('fixDetailRowHeight', index);
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#qlxk-dg').datagrid('fixDetailRowHeight', index);
                    }, 0);
                }
            });
            $('#qlxk-dg').datagrid('fixDetailRowHeight', index);
            index2 = index;
        }
    });
    $('#qlxk-dg_qr').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px"><table pagination="true"  class="ddv' + index + '"></table></div>';
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddv' + index);
            var phu = row.id;
            var soqr = $('#textsearchkho').textbox("getValue")
            ddv.datagrid({
                url: '../sanphams/combogrid_sp?mapx=' + phu + '&soqr=' + soqr,
                fitColumns: true,
                singleSelect: true,
                showFooter: true,
                rownumbers: true,
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
                    $('#qlxk-dg').datagrid('fixDetailRowHeight', index);
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#qlxk-dg').datagrid('fixDetailRowHeight', index);
                    }, 0);
                }
            });
            $('#qlxk-dg').datagrid('fixDetailRowHeight', index);
            index2 = index;
        }
    });
});
function timtungaydenngay() {
    $tu = $("#db-QLXK-from").datebox("getValue");
    $den = $("#db-QLXK-to").datebox("getValue");
    if ($tu == "" || $den == "") {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Vui lòng nhập ngày bắt đầu và ngày kết thúc'
        })
        return false;
    } else {
        $('#qlxk-dg').datagrid('load', {
            tungay: $tu,
            denngay: $den
        });
    }
}
function kiemtrarangbuocchuyenkho() {
    $tukho = $("#qlnk-chuyenkho-tukho-cbb").combobox("getValue");
    $denkho = $("#qlnk-chuyenkho-denkho-cbb").combobox("getValue");
    if ($tukho == $denkho) {
        thongbao("Không chuyển cùng một kho");
        return false;
    }
    if ($tukho == "" || $denkho == "") {
        thongbao("Vui lòng chọn kho cần chuyển");
        return false;
    }
}
function themsanphamchuyenkho() {
    var row = $('#combogrid-quanLySP_chuyenkho').combogrid('grid').datagrid('getSelected');
    var sl = row.soluongton;
    var sld = $('#sl_themchuyenkho').numberspinner('getValue');
    $tukho = $("#qlnk-chuyenkho-tukho-cbb").combobox("getValue");
    $denkho = $("#qlnk-chuyenkho-denkho-cbb").combobox("getValue");
    if ($tukho == "" || $denkho == "") {
        thongbao("Vui lòng chọn kho cần chuyển");
        return false;
    } else if (parseInt(sld) > parseInt(sl)) {
        thongbao("Số lượng hiện tại không đủ cho đơn hàng");
        $('#sl_themchuyenkho').numberspinner('setValue', 1);
    } else {
        if (parseInt(sld) > parseInt(sl)) {
            if (row.makho != "") {
                thongbao("Số lượng hiện tại không đủ cho đơn hàng")
                $('#sl_themchuyenkho').numberspinner('setValue', 1);
                $('#combogrid-quanLySP_chuyenkho').combogrid("textbox").focus();
                return false;
            }
            $.messager.confirm('Confirm', "Số lượng hiện tại không đủ cho đơn hàng,\n bạn có muốn xuất âm không?", function(r) {
                if (r) {
                    $xuatam = "1";
                    $mapx = $("#mapx_an").val();
                    $masp = row.Masanpham;
                    $soluong = sld;
                    $chietkhau = $("#chietkhau_themchuyenkho").numberspinner('getValue');
                    $gia = row.gia_ban;
                    $makho = row.makho;
                    $solo = row.solo;
                    $soqr = $("#qlxk-qr-chuyenkho").val();
                    if (!$(this).hasClass('clicked')) {
                        var bien = {
                            tenmaphieu: $mapx,
                            tenthaotac: 'thêm sp chuyên kho',
                            loai: 'PX',
                            xuatam: $xuatam,
                            id_px: row.id_xuatkho_sp,
                            mapx: $mapx,
                            masp: $masp,
                            soluong: $soluong,
                            chietkhau: $chietkhau,
                            gia: $gia,
                            makho: $makho,
                            solo: $solo,
                            soqr: $soqr
                        };
                        sendajax("../phieuxuatsps/themSanPhamPhieuXuatNV", bien, "chuyenkhosanpham_dg");
                        var bien_1 = {
                            mapx: $mapx
                        }
                        var array = {
                            num1: "tongphieuchuyen"
                        };
                        $('#chuyenkhosanpham_dg').datagrid({
                            onLoadSuccess: function() {
                                sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                                $('#combogrid-quanLySP_chuyenkho').combogrid('grid').datagrid('reload');
                                $("#qlxk-qr-chuyenkho").val("");
                                $('#combogrid-quanLySP_chuyenkho').combogrid("textbox").select();
                            }
                        })
                    }
                } else {
                    $('#sl_themchuyenkho').numberspinner('setValue', 1);
                    $('#combogrid-quanLySP_chuyenkho').combogrid("textbox").focus();
                    return false;
                }
            })
        } else {
            $xuatam = "0";
            $mapx = $("#mapx_an").val();
            $masp = row.Masanpham;
            $soluong = sld;
            $chietkhau = $("#chietkhau_themchuyenkho").numberspinner('getValue');
            $gia = row.gia_ban;
            $makho = row.makho;
            $solo = row.solo;
            $soqr = $("#qlxk-qr-chuyenkho").val();
            if (!$(this).hasClass('clicked')) {
                var bien = {
                    tenmaphieu: $mapx,
                    tenthaotac: 'thêm sp chuyên kho',
                    loai: 'PX',
                    xuatam: $xuatam,
                    id_px: row.id_xuatkho_sp,
                    mapx: $mapx,
                    masp: $masp,
                    soluong: $soluong,
                    chietkhau: $chietkhau,
                    gia: $gia,
                    makho: $makho,
                    solo: $solo,
                    soqr: $soqr
                };
                sendajax("../phieuxuatsps/themSanPhamPhieuXuatNV", bien, "chuyenkhosanpham_dg");
                var bien_1 = {
                    mapx: $mapx
                }
                var array = {
                    num1: "tongphieuchuyen"
                };
                $('#chuyenkhosanpham_dg').datagrid({
                    onLoadSuccess: function() {
                        sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                        $('#combogrid-quanLySP_chuyenkho').combogrid('grid').datagrid('reload');
                        $("#qlxk-qr-chuyenkho").val("");
                        $('#combogrid-quanLySP_chuyenkho').combogrid("textbox").select();
                    }
                })
            }
        }
    }
}
function xoasanphamchuyenkho() {
    var hang = $('#chuyenkhosanpham_dg').datagrid('getSelected');
    if (hang) {
        $id = hang.id;
        $mapx = hang.maphieuX
        if (!$(this).hasClass('clicked')) {
            var bien = {
                id: $id,
                map: $mapx,
                tenmaphieu: $mapx,
                tenthaotac: 'Xóa sp chuyển kho',
                loai: 'PX'
            };
            sendajax("../phieuxuatsps/xoaSanPhamPhieuXuatNV", bien, "chuyenkhosanpham_dg");
            $mapx = $("#mapx_an").val();
            var bien_1 = {
                mapx: $mapx
            }
            var array = {
                num1: "tongphieuchuyen"
            };
            $('#dg-quanLySP_sale-dsspn').datagrid({
                onLoadSuccess: function() {
                    sendandsetval("../phieuxuatsps/tongThanhTienPhieuXuat", bien_1, array);
                    $('#combogrid-quanLySP_chuyenkho').combogrid('grid').datagrid('reload');
                }
            })
        }
    } else {
        thongbao('Vui lòng chọn phiếu cần xóa')
    }
}
function chuyenkho() {
    $("#luuchuyenkho").click(function() {
        $mapx = $("#mapx_an").val();
        $tongphieu = $('#tongphieuchuyen').numberbox('getValue');
        ;$makh = $('#cbg-chuyenkho-khachhang').combogrid('getValue');
        $tukho = $("#qlnk-chuyenkho-tukho-cbb").combobox("getValue");
        $denkho = $("#qlnk-chuyenkho-denkho-cbb").combobox("getValue");
        $phuongthucvanchuyen = $("#phuongthucchuyen").textbox("getValue");
        if ($denkho == '') {
            thongbao("Vui lòng chọn chuyển đến");
            return false;
        }
        if ($tukho == '') {
            thongbao("Vui lòng chọn kho chuyển");
            return false;
        }
        if ($tukho == $denkho) {
            thongbao("Không chuyển cùng một kho");
            return false;
        }
        if ($makh == '') {
            thongbao("Vui lòng chọn khách hàng");
            return false;
        }
        if (!$(this).hasClass('clicked')) {
            $("#luuchuyenkho").addClass('clicked')
            var bien = {
                id: $mapx,
                tongphieu: $tongphieu,
                makh: $makh,
                tukho: $tukho,
                denkho: $denkho,
                phuongthucvanchuyen: $phuongthucvanchuyen
            }
            sendajax("../chuyenkhos/themchuyenkho", bien);
            setTimeout(function() {
                location.reload()
            }, 2000);
        }
    })
}
function xuatphieuxuatkhopdf() {
    var row = $('#qlxk-dg').datagrid('getSelected');
    if (row) {
        $maPX = row.id;
        if (row.maKH == "0" || row.maPhieuxuat == "") {
            thongbao("Vui lòng cập nhật thông tin khách hàng hoặc mapx")
            return false
        }
        $h = 'export_phieuxuatkhoPDF?mapx=' + $maPX;
        window.open($h, '_blank');
        $('#qlxk-dg').datagrid('reload');
        setTimeout(function() {
            $('#qlxk-dg').datagrid('reload');
        }, 2000);
    } else {
        thongbao("Chọn phiếu xuất cần xuất file");
    }
}
function xuatphieuxuatkhoexcel() {
    var row = $('#qlxk-dg').datagrid('getSelected');
    if (row) {
        $maPX = row.id;
        if (row.maKH == "0" || row.maPhieuxuat == "") {
            thongbao("Vui lòng cập nhật thông tin khách hàng hoặc mapx")
            return false
        }
        $h = 'export_phieuxuatkhoEXCEL?mapx=' + $maPX;
        window.open($h, '_blank');
        $('#qlxk-dg').datagrid('reload');
        setTimeout(function() {
            $('#qlxk-dg').datagrid('reload');
        }, 2000);
    } else {
        thongbao("Chọn phiếu xuất cần xuất file");
    }
}
function themnvptkh() {
    $manv = $("#nhanvienkdnvpt").combobox("getValue");
    $makh = $("#cbg-quanLySP_sale-tpx-khachhang").combobox("getValue");
    if ($manv == "") {
        thongbao("Vui lòng chọn nhân viên kinh doanh")
        return false;
    } else if ($makh == "") {
        thongbao("Vui lòng chọn khách hàng")
        return false;
    } else {
        var bien = {
            makh: $makh,
            manv: $manv
        }
        sendajax("../khachhangs/themnvpt", bien, "nhanvienpt_dg");
        $('#nhanvienkd').combobox('reload', '../nhanviens/dsNV?nhanvien=' + $makh)
    }
}
function xuatdanhsachctphieuxuattheotimkiem() {
    $makho = $('#chitiettheokho').combobox('getValues');
    $makh = $('#chitiettheokhpx').combobox('getValue')
    $nvkd = $('#chitietpxtheonvkd').combobox('getValue')
    $masp = $('#maspctxk').combobox('getValue')
    $mansx = $('#nhomsp').combobox('getValue')
    $bien = [$makho, $nvkd, $makh, $masp, $mansx]
    xuatfile('db-CTPX-from', 'db-CTPX-to', "excel_chitietspxuatkho", $bien)
}
function xuatdanhsachctphieuxuattheokh() {
    $makho = $('#chitiettheokho').combobox('getValues');
    $makh = $('#chitiettheokhpx').combobox('getValue')
    $masp = $('#maspctxk').combobox('getValue')
    $mansx = $('#nhomsp').combobox('getValue')
    $bien = [$makho, $makh, $masp, $mansx]
    xuatfile('db-CTPX-from', 'db-CTPX-to', "excel_chitietspxuatkhogrouptheokh", $bien)
}
function xuatdanhsachphieuxuattheotimkiemf2() {
    $makho = $('#khonhanvienquanlykho').combobox('getValue');
    $makh = $('#khachhang_xk').combobox('getValue')
    $nvkd = $('#nhanvienkd_xk').combobox('getValue')
    $bien = [$makho, $nvkd, $makh]
    xuatfile('db-QLXK-from', 'db-QLXK-to', "excel_spxuatkho", $bien)
}
function xuatdanhsachphieuxuattheotimkiemf5() {
    $makho = $('#khonhanvienquanlykho').combobox('getValue');
    $makh = $('#khachhang_xk').combobox('getValue')
    $nvkd = $('#nhanvienkd_xk').combobox('getValue')
    $bien = [$makho, $nvkd, $makh]
    xuatfile('db-QLXK-from', 'db-QLXK-to', "excel_dsphieuxuat", $bien)
}
function chuyenkhodaily() {
    $("#chuyenkhodaily").removeClass('clicked');
    var row = $("#qlxk-dg").datagrid("getSelected");
    if (row) {
        $mapx = row.id
        $makh = row.maKH
        if (row.tinhtrang == '1') {
            $("#ck_daily").combobox('reload', '../tochucs/taidulieutochuc?cbx_tochuc_makh=' + $makh)
            $('#qlxk_chuyenkhodl-dlg').dialog('open')
            $("#chuyenkhodaily").click(function() {
                if (!$("#chuyenkhodaily").hasClass('clicked')) {
                    $("#chuyenkhodaily").addClass('clicked')
                    $('#qlxk_chuyenkhodl-dlg').dialog('close')
                    $matcnhan = $("#ck_daily").combobox("getValue")
                    $ghichu = $("#ck_daily-ghichu-tpx").textbox("getValue")
                    $bien = {
                        matcnhan: $matcnhan,
                        ghichu: $ghichu,
                        mapx: $mapx
                    }
                    sendajax('../chuyenkhodailynpps/chuyenkhodaily', $bien, "qlxk-dg")
                }
            })
        } else {
            thongbao("Chỉ chuyển khi tình trạng phiếu đã xuất");
        }
    } else {
        thongbao("Chọn phiếu cần chuyển")
    }
}
function capnhatghichupx() {
    var row = $("#qlxk-dg").datagrid("getSelected");
    if (row) {
        $("#ghichu_capnhat").textbox("setValue", "")
        $('#capnhatghichupx-dlg').dialog('open')
        $("#capnhatghichupx").click(function() {
            $('#capnhatghichupx-dlg').dialog('close')
            $ghichu = $("#ghichu_capnhat").textbox("getValue")
            $mapx = row.id
            $bien = {
                idpx: $mapx,
                noidung: $ghichu
            }
            sendajax('../phieuxuatsps/capnhatghichuphieuxuat', $bien, "qlxk-dg")
        })
    } else {
        thongbao("Chọn phiếu cần cập nhật")
    }
}
function capnhatphieuttvechuaxuat() {
    var row = $("#qlxk-dg").datagrid("getSelected");
    if (row) {
        $mapx = row.id
        $bien = {
            mapx: $mapx
        }
        if (row.tongthanhtoan != 0) {
            thongbao("Chỉ cập nhật khi tổng thanh=0")
            return false;
        } else {
            sendajax('../phieuxuatsps/capnhatrangthaiphieuvechuaxuat', $bien, "qlxk-dg")
        }
    } else {
        thongbao("Chọn phiếu cần cập nhật")
    }
}
function xuatphieulapkehoachsanxuat() {
    var row = $('#qlxk-dg').datagrid('getSelected');
    if (row) {
        $maPX = row.id;
        $h = 'export_sanphamlapkehoachsanxuat?mapx=' + $maPX;
        window.open($h, '_blank');
    } else {
        thongbao("Chọn phiếu xuất cần xuất file");
    }
}
function xuatphieuxuatkhoexcel_solo_idphantich() {
    var row = $('#qlxk-dg').datagrid('getSelected');
    if (row) {
        $maPX = row.id;
        if (row.maKH == "0" || row.maPhieuxuat == "") {
            thongbao("Vui lòng cập nhật thông tin khách hàng hoặc mapx")
            return false
        }
        $h = 'export_phieuxuatkhoEXCEL_solo_idphantich?mapx=' + $maPX;
        window.open($h, '_blank');
        $('#qlxk-dg').datagrid('reload');
        setTimeout(function() {
            $('#qlxk-dg').datagrid('reload');
        }, 2000);
    } else {
        thongbao("Chọn phiếu xuất cần xuất file");
    }
}
