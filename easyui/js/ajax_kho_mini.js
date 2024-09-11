function themkho() {
    $("#kho-dlg").dialog("open");
    $('#kho-fm').form('clear')
    $('#daily').prop('checked', !0);
    $("#themkho").show();
    $("#suakho").hide();
    $("#themkho").removeClass('clicked')
    $("#themkho").click(function() {
        if (!$('#kho-fm').form('validate')) {
            return !1
        }
        $makhotxt = $("#makhotxt").textbox("getValue");
        $tenkho = $("#tenkho").textbox("getValue");
        $diachi = $("#diachi").textbox("getValue");
        $ghichu = $("#ghichu").textbox("getValue");
        if ($("#tongcongty").is(":checked")) {
            $loaikho = $("#tongcongty").val()
        } else if ($("#daily").is(":checked")) {
            $loaikho = $("#daily").val()
        } else {
            thongbao("Vui lòng chọn loại kho")
        }
        var bien = {
            tenkho: $tenkho,
            diachi: $diachi,
            ghichu: $ghichu,
            makhotxt: $makhotxt,
            loaikho: $loaikho
        }
        if (!$(this).hasClass('clicked')) {
            $("#themkho").addClass('clicked')
            sendajax("themthongtinkho", bien, "kho-dg");
            $("#kho-dlg").dialog("close")
        }
    })
}
function suakho() {
    $("#suakho").show();
    $("#themkho").hide();
    var row = $("#kho-dg").datagrid("getSelected");
    if (row) {
        $("#kho-dlg").dialog("open");
        $makho = row.makho;
        $('#kho-fm').form('load', row);
        $("#suakho").click(function() {
            if (!$('#kho-fm').form('validate')) {
                return !1
            }
            $makhotxt = $("#makhotxt").textbox("getValue");
            $tenkho = $("#tenkho").textbox("getValue");
            $diachi = $("#diachi").textbox("getValue");
            $ghichu = $("#ghichu").textbox("getValue");
            if ($("#tongcongty").is(":checked")) {
                $loaikho = $("#tongcongty").val()
            } else {
                $loaikho = $("#daily").val()
            }
            var bien = {
                makho: $makho,
                tenkho: $tenkho,
                diachi: $diachi,
                ghichu: $ghichu,
                makhotxt: $makhotxt,
                loaikho: $loaikho
            }
            sendajax("suathongtinkho", bien, "kho-dg");
            $("#kho-dlg").dialog("close")
        })
    } else {
        thongbao("Vui lòng chọn kho cần chỉnh sửa");
        return !1
    }
}
function xoakho() {
    var row = $("#kho-dg").datagrid("getSelected");
    if (row) {
        $makho = row.makho;
        var bien = {
            makho: $makho
        }
        sendajax("xoathongtinkho", bien, "kho-dg")
    } else {
        thongbao("Vui lòng chọn kho cần xóa");
        return !1
    }
}
function nhanvienquanlykho() {
    var row = $("#kho-dg").datagrid("getSelected");
    if (row) {
        $("#nvql_dlg").dialog("open");
        $makho = row.makho;
        $("#nvql_cbx").combobox({
            url: 'taidulieuthongtinkho?nvql&makho=' + $makho
        })
        $("#nvqlkho-dg").datagrid("load", {
            makho: $makho
        })
    } else {
        thongbao("Vui lòng chọn kho cần thêm");
        return !1
    }
}
function themnhanvienquanlykho() {
    var row = $("#kho-dg").datagrid("getSelected");
    if (row) {
        $makho = row.makho;
        $manv = $("#nvql_cbx").combobox("getValue");
        $bien = {
            manv: $manv,
            makho: $makho
        };
        sendajax("themnhanvienquanlykho", $bien, "nvqlkho-dg");
        $('#nvqlkho-dg').datagrid({
            onLoadSuccess: function() {
                $("#nvql_cbx").combobox({
                    url: 'taidulieuthongtinkho?nvql&makho=' + $makho
                })
            }
        })
    } else {
        thongbao("Vui lòng chọn kho cần thêm");
        return !1
    }
}
function xoanhanvienquanlykho() {
    var row = $("#nvqlkho-dg").datagrid("getSelected");
    var rowkho = $("#kho-dg").datagrid("getSelected");
    $makho = rowkho.makho;
    if (row) {
        $id = row.id;
        $bien = {
            id: $id
        };
        sendajax("xoanhanvienquanlykho", $bien, "nvqlkho-dg");
        $('#nvqlkho-dg').datagrid({
            onLoadSuccess: function() {
                $("#nvql_cbx").combobox({
                    url: 'taidulieuthongtinkho?nvql&makho=' + $makho
                })
            }
        })
    } else {
        thongbao("Vui lòng chọn kho cần thêm");
        return !1
    }
}
function sanphamkho() {
    var row = $("#kho-dg").datagrid("getSelected");
    if (row) {
        $("#spkho_dlg").dialog("open");
        $makho = row.makho;
        $("#sp_cbx").combobox({
            url: 'taidulieuthongtinkho?sp&makho=' + $makho
        })
        $("#spkho-dg").datagrid("load", {
            makho: $makho
        })
    } else {
        thongbao("Vui lòng chọn kho cần thêm");
        return !1
    }
}
function themspkho() {
    var row = $("#kho-dg").datagrid("getSelected");
    if (row) {
        $("#spkho_dlg").dialog("open");
        $makho = row.makho;
        $masp = $("#sp_cbx").combobox("getValue");
        $bien = {
            masp: $masp,
            makho: $makho
        };
        sendajax("themsanphamkho", $bien, "spkho-dg");
        $('#spkho-dg').datagrid({
            onLoadSuccess: function() {
                $("#sp_cbx").combobox({
                    url: 'taidulieuthongtinkho?sp&makho=' + $makho
                })
            }
        })
    } else {
        thongbao("Vui lòng chọn kho cần thêm");
        return !1
    }
}
function xoasanphamkho() {
    var row = $("#spkho-dg").datagrid("getSelected");
    var rowkho = $("#kho-dg").datagrid("getSelected");
    $makho = rowkho.makho;
    if (row) {
        $id = row.id;
        $bien = {
            id: $id
        };
        sendajax("xoasanphamkho", $bien, "spkho-dg");
        $('#spkho-dg').datagrid({
            onLoadSuccess: function() {
                $("#sp_cbx").combobox({
                    url: 'taidulieuthongtinkho?sp&makho=' + $makho
                })
            }
        })
    } else {
        thongbao("Vui lòng chọn kho cần thêm");
        return !1
    }
}
function phancapkho() {
    var row = $("#kho-dg").datagrid("getSelected")
    if (row) {
        $makho = row.makho
        $('#captren').prop('checked', !0);
        $("#phancapkho_dg").datagrid("load", {
            makho: $makho
        })
        $("#phancapkho_dlg").dialog("open")
    } else {
        thongbao("Vui lòng chọn kho")
    }
}
function taidulieukhocaptren() {
    var row = $("#kho-dg").datagrid("getSelected")
    if (row) {
        $makho = row.makho
        $("#phancapkho_dg").datagrid("load", {
            makho: $makho
        })
    } else {
        thongbao("Vui lòng chọn kho")
    }
}
function taidulieukhocapduoi() {
    var row = $("#kho-dg").datagrid("getSelected")
    if (row) {
        $makho = row.makho
        $("#phancapkho_dg").datagrid("load", {
            makhocapduoi: $makho
        })
    } else {
        thongbao("Vui lòng chọn kho")
    }
}
function themphancapkho() {
    var row = $("#kho-dg").datagrid("getSelected")
    $tinhtrang = $("#captren").is(":checked");
    if (row) {
        $makho = row.makho
        $makhocaptren = $("#khophancap").combobox("getValue")
        $ghichupckho = $("#ghichupckho").textbox("getValue")
        if ($makho == $makhocaptren) {
            thongbao("Lỗi trùng kho")
            return !1
        }
        if ($makhocaptren == '') {
            thongbao("Vui lòng chọn kho cần thêm")
            return !1
        } else if ($tinhtrang == !0) {
            var bien = {
                makho: $makho,
                makhocaptren: $makhocaptren,
                ghichu: $ghichupckho
            }
            sendajax("../phancapkhos/themphancapkho", bien, "phancapkho_dg")
        } else if ($tinhtrang == !1) {
            var bien = {
                makho: $makhocaptren,
                makhocaptren: $makho,
                ghichu: $ghichupckho
            }
            sendajax("../phancapkhos/themphancapkho", bien, "phancapkho_dg")
        } else {
            return !0
        }
    } else {
        thongbao("Vui lòng chọn kho")
    }
}
function xoaphancapkho() {
    var row = $("#phancapkho_dg").datagrid("getSelected")
    if (row) {
        var bien = {
            id: row.id
        }
        xoadulieuajax("../phancapkhos/xoaphancapkho", bien, "phancapkho_dg", "Bạn muốn xóa kho này không")
    } else {
        thongbao("Vui lòng chọn kho cần xóa")
    }
}
