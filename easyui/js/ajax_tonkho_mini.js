function thongkeDG() {
    var row = $('#dg_tk').datagrid('getSelected');
    if (row) {
        $('#dlg_thongkeDG').dialog('open').dialog('setTitle', 'Thống kê chi tiết');
        $maSP = row.maSP;
        $tensp = row.tensp;
        $MaSP = row.MaSP;
        $noi = $MaSP + " - " + $tensp;
        $('#tensp').textbox('setValue', $noi);
        $("#nhapkho").datagrid("load", {
            maSP: $maSP
        });
        $("#xuatkho").datagrid("load", {
            maSP: $maSP
        })
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn sản phảm cần thống kê  !'
        })
    }
}
function xuatfile_exceltheongay() {
    $tungay = $("#tk-tungay-datebox").datebox("getValue");
    $denngay = $("#tk-denngay-datebox").datebox("getValue");
    if ($tungay == "" || $denngay == "") {
        thongbao("vui lòng chọn thời gian thông kê kho")
        return !1
    }
    window.open('../tonkhos/excel_tonkho?tu_tonkho=' + $tungay + '&den_tonkho=' + $denngay, "_self")
}
function xuatfile_exceltheongay_theosp() {
    $('#dlg_xuatfile_exceltheongay_theosp').dialog('open').dialog('setTitle', 'THÔNG TIN XUẤT SẢN PHẨM TỒN THEO KỲ')
}
function baocaoxuatkhoatheothoigian() {
    $tungay = $("#bc-tungay").datebox("getValue");
    $denngay = $("#bc-denngay").datebox("getValue");
    $masp = $("#chon_sp_xuat").combogrid("getValue");
    if ($tungay == "" || $denngay == "") {
        thongbao("vui lòng chọn thời gian thông kê kho")
        return !1
    }
    window.open('../tonkhos/excel_xuatnhapton_chitietsanpham?tu_tonkho=' + $tungay + '&den_tonkho=' + $denngay + "&masp=" + $masp, "_self")
}
function baocaoxuatkhotheonhom() {
    $tungay = $("#tk-tungay-datebox").datebox("getValue");
    $denngay = $("#tk-denngay-datebox").datebox("getValue");
    $nhomsp = $("#nhomsp").combobox("getValue");
    if ($nhomsp == "") {
        thongbao("Vui lòng chọn nhóm sản phẩm cần xuất")
        return !1
    }
    window.open('../tonkhos/excel_thongkenxt_nhomsp?tu_tonkho=' + $tungay + '&den_tonkho=' + $denngay + "&manhomsp=" + $nhomsp, "_self")
}
function excel_tonkho() {
    $tu_tonkho = $('#tu_tonkho').datebox('getValue');
    $den_tonkho = $('#den_tonkho').datebox('getValue');
    $tenkho = $('#tenkho').combobox('getValue');
    if (($tu_tonkho == "") && ($den_tonkho != "")) {
        thongbao("Nhập thời gian cần xuất")
    }
    ;if (($tu_tonkho != "") && ($den_tonkho == "")) {
        thongbao("Nhập thời gian cần xuất")
    }
    ;if ($tenkho == "") {
        thongbao("nhập tên kho")
    }
    ;if (($tenkho != "") && ((($tu_tonkho != "") && ($den_tonkho != "")) || (($tu_tonkho == "") && ($den_tonkho == "")))) {
        $.post('excel_tonkho', {
            tu_tonkho: $tu_tonkho,
            den_tonkho: $den_tonkho,
            tenkho: $tenkho
        }, function(data) {
            window.open('../tonkhos/excel_tonkho?tu_tonkho=' + $tu_tonkho + '&den_tonkho=' + $den_tonkho + '&tenkho=' + $tenkho, "_blank ")
        })
    }
}
function timkiemvaxuattonkho() {
    $tu_tonkho = $('#tk-tungay-datebox').datebox('getValue');
    $den_tonkho = $('#tk-denngay-datebox').datebox('getValue');
    $tenkho = $('#tenkho').combobox('getValue');
    $nhomsp = $("#nhomsp").combobox("getValue");
    if ($tu_tonkho == "" && $den_tonkho == "" && $nhomsp == "") {
        window.open('../tonkhos/excel_tonkho')
    } else if ($tu_tonkho != "" && $den_tonkho != "" && $nhomsp == "") {
        xuatfile_exceltheongay()
    } else if ($tu_tonkho != "" && $den_tonkho != "" && $nhomsp != "") {
        baocaoxuatkhotheonhom()
    } else {
        thongbao("Vui lòng nhập thông tin tìm kiếm")
    }
}
function xuatdanhsachtonkhotheotimkiem() {
    $makho = $('#tenkho').combobox('getValue')
    $masx = $('#nhomsp').combobox('getValue')
    $masp = $('#masptk').combobox('getValue')
    $bien = [1, $makho, $masx, $masp]
    xuatfile('tk-tungay-datebox', 'tk-denngay-datebox', "xuatdanhsachtonkhotheotimkiem", $bien)
}
function xuattonkhotheotimkiem() {
    $makho = $('#tenkho').combobox('getValue')
    $masx = $('#nhomsp').combobox('getValue')
    $masp = $('#masptk').combobox('getValue')
    $bien = [1, $makho, $masx, $masp]
    xuatfile('tk-tungay-datebox', 'tk-denngay-datebox', "xuattonkhotheoketquatimkiem", $bien)
}
function setsophieuxuatloidongbotonkho() {
    send_and_set_data_by_id("demsophieuxuatloidongbotonkho", {}, "num_px_error")
}
function giaiphongtonkho() {
    var row = $("#dg_tk").datagrid("getSelected");
    if (row) {
        $masp = row.masp;
        $solo = row.solo;
        $makho = row.makho
        var bien = {
            masp: $masp,
            solo: $solo,
            makho: $makho
        }
        xoadulieuajax("giaiphongtonkhotong", bien, "dg_tk", "Bạn muốn thực hiện giải phóng tồn kho?");
    } else {
        thongbao("Vui lòng chọn thông tin kho cần xóa");
        return false;
    }
}
