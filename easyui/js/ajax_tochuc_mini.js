function themtochuc() {
    $('#dlg').dialog('open').dialog('setTitle', 'Thêm tổ chức'); $('#fm').form('clear')
    $("#luuTC").show(); $("#capnhatTC").hide(); $("#luuTC").removeClass('clicked')
    $("#luuTC").click(function () {
        if (!$('#fm').form('validate')) {
            return !1
        }

        $tenTC = $("#tenTC").val(); $makh = $("#cbg-kh-tochuc").combogrid("getValue"); $diachi = $("#diachi").val(); $quanly = $("#quanly").val(); $ghichu = $("#ghichu").val(); var bien = { tenTC: $tenTC, makh: $makh, diachi: $diachi, quanly: $quanly, ghichu: $ghichu }

        if (!$(this).hasClass('clicked')) {
            $("#luuTC").addClass('clicked')
            sendajax("themtochuc", bien, "dg"); $("#dlg").dialog("close")
        }
    })
}
function capNhattochuc() {

    $("#capnhatTC").show(); $("#luuTC").hide();
    $("#capnhatTC").removeClass('clicked');
    var row = $("#dg").datagrid("getSelected");

    if (row) {

        $id = row.id; $tenTC = row.tenTC;

        if ($id == "1") {
            thongbao(" " + $tenTC + " là tổ chức hệ thống bạn không được cập nhật");
            return !1
        }

        $("#dlg").dialog("open").dialog('setTitle', 'Cập nhật tổ chức');
        $('#fm').form('load', row);

        $("#capnhatTC").click(function () {

            if (!$('#fm').form('validate')) {
                return !1
            }

            $tenTC = $("#tenTC").val();
            $makh = $('#cbg-kh-tochuc').combogrid('getValue');
            $diachi = $("#diachi").val();
            $quanly = $("#quanly").val();
            $ghichu = $("#ghichu").val();

            var bien = { id: $id, tenTC: $tenTC, makh: $makh, diachi: $diachi, quanly: $quanly, ghichu: $ghichu }

            if (!$(this).hasClass('clicked')) {
                $("#capnhatTC").addClass('clicked')
                sendajax("capnhattochuc", bien, "dg");
                $("#dlg").dialog("close")
            }
        })
    }
    else {
        thongbao("Vui lòng chọn tổ chức cần chỉnh sửa");
        return !1
    }
}
function nhanvientc() {
    var row = $("#dg").datagrid('getSelected');
    if (row) {
        $id = row.id;
        $manv = $("#nhanvientochuc").combobox("getValue");
        if ($manv == '') {
            thongbao("Vui lòng chọn nhân viên cần chuyển");
            return !1;
        }
        var bien = { matc: $id, manv: $manv };
        sendajax("../nhanviens/capnhatnvtochuc", bien, "dg");
        $('#nhanvientochuc').combobox('reload');
    }
    else {
        thongbao("Vui lòng chọn nhân viên cần cập nhật vào tổ chức");
    }
}
function timtochuc() { $timtochuc = $('#timtochuc').val(); $('#dg').datagrid('load', { timtochuc: $timtochuc }) }
function timkhachhang() {
    var row = $('#dg').datagrid('getSelected')
    $matc = row.id; $timkhachhang = $('#timkhachhang').val(); $('#dskhachhang_dg').datagrid('load', { timkhachhangtc: $timkhachhang, matc: $matc })
}
function timnhanvien() {
    var row = $('#dg').datagrid('getSelected')
    $matc = row.id; $timnhanvien = $('#timnhanvien').val(); $('#dsnhanvien_dg').datagrid('load', { timkiemnv: $timnhanvien, matc: $matc })
}
function timkho() {
    var row = $('#dg').datagrid('getSelected')
    $matc = row.id; $timkho = $('#timkho').val(); $('#dskho_dg').datagrid('load', { timkiemkho: $timkho, matc: $matc })
}
function taiLai() { $timKiemtochuc = $('#timtc').val(); $('#dg').datagrid('load', { timKiemtochuc: '' }) }
function xoatochuc() {
    var row = $("#dg").datagrid("getSelected"); if (row) {
        $id = row.id; $tenTC = row.tenTC; if ($id == "1") { alert(" " + $tenTC + " là tổ chức hệ thống bạn không được xóa"); return !1 }
        var bien = { id: row.id }
        xoadulieuajax("xoatochuc", bien, "dg", "Bạn muốn xóa kho này không")
    }
    else { thongbao("Vui lòng chọn tổ chức cần xóa"); return !1 }
}
function dskhachhang() {
    var row = $("#dg").datagrid('getSelected')
    if (row) { $id = row.id; $('#dskhachhang_dlg').dialog('open'); $("#dskhachhang_dg").datagrid("load", { maTC_: $id }) }
    else { thongbao("Vui lòng chọn tổ chức") }
}
function dsnhanvien() {
    var row = $("#dg").datagrid('getSelected')
    if (row) { $id = row.id; $('#dsnhanvien_dlg').dialog('open'); $("#dsnhanvien_dg").datagrid("load", { maTC_: $id }) }
    else { thongbao("Vui lòng chọn tổ chức") }
}
function dskho() {
    var row = $("#dg").datagrid('getSelected')
    if (row) { $id = row.id; $('#dskho_dlg').dialog('open'); $("#dskho_dg").datagrid("load", { maTC_: $id }) }
    else { thongbao("Vui lòng chọn tổ chức") }
}
function phancaptochuc() {
    var row = $("#dg").datagrid("getSelected")
    if (row) {
        $id = row.id
        $("#captren").prop("checked", !0); $("#phancaptochuc_dg").datagrid("load", { matccaptren: $id })
        $("#phancaptochuc_dlg").dialog("open")
    }
    else { thongbao("Vui lòng chọn tổ chức") }
}
function taidulieucaptren() {
    var row = $("#dg").datagrid("getSelected")
    if (row) {
        $id = row.id
        $("#phancaptochuc_dg").datagrid("load", { matccaptren: $id })
    }
    else { thongbao("Vui lòng chọn khách hàng") }
}
function taidulieucapduoi() {
    var row = $("#dg").datagrid("getSelected")
    if (row) {
        $id = row.id
        $("#phancaptochuc_dg").datagrid("load", { matccapduoi: $id })
    }
    else { thongbao("Vui lòng chọn khách hàng") }
}
function themphancaptochuc() {
    var row = $("#dg").datagrid("getSelected")
    $tinhtrang = $("#captren").is(":checked"); if (row) {
        $id = row.id
        $tochuc = $("#phancap_tochuc").combobox("getValue")
        if ($tochuc == $id) {
            thongbao("Lỗi trùng tổ chức")
            return !1
        }
        if ($tochuc == '') {
            thongbao("vui lòng chọn tổ chức")
            return !1
        }
        else if ($tinhtrang == !0) {
            var bien = { id: $id, tochuc: $tochuc }
            sendajax("../tochucs/themphancaptochuc", bien, "phancaptochuc_dg")
        }
        else if ($tinhtrang == !1) {
            var bien = { id: $tochuc, tochuc: $id }
            sendajax("../tochucs/themphancaptochuc", bien, "phancaptochuc_dg")
        }
        else { return !0 }
    }
    else { thongbao("Vui lòng chọn tổ chức cần phân cấp") }
}
function xoaphancaptochuc() {
    var row = $("#phancaptochuc_dg").datagrid("getSelected")
    if (row) {
        var bien = { id: row.id }
        xoadulieuajax("../tochucs/xoaphancaptochuc", bien, "phancaptochuc_dg", "Bạn muốn xóa khách hàng này không")
    }
    else { thongbao("Vui lòng chọn khách hàng cần xóa") }
}