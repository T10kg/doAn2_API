function dsh() {
    $tinh = $('#tinh').combobox('getValue');
    $('#huyen').combobox('clear')
    $('#huyen').combobox('reload', {
        maDon: $tinh
    })
}
function dienthongtindiachi() {
    $tinh = $('#tinh').combobox('getText');
    $huyen = $('#huyen').combobox('getText');
    $diachi = $huyen + " - " + $tinh
    $('#diachi').val($diachi)
}
function importKH() {
    $('#import').dialog('open').dialog('setTitle', 'importDuLieu');
    $(function() {
        $("#importDaTa").click(function() {
            $file = $("#file_excel").val();
            if ($file != "") {
                $("#form").submit()
            } else {
                $("#thongbaoimport").text("Vui Lòng Chọn File Cần import")
            }
        });
        $("#importDaTa_update").click(function() {
            $file = $("#file_excel_u").val();
            if ($file != "") {
                $("#form_u").submit()
            } else {
                $("#thongbaoimport").text("Vui Lòng Chọn File Cần import")
            }
        })
    })
}
function baoSN() {
    $('#dlg_sinhnhat').dialog('open').dialog('setTitle', 'Danh sách sinh nhật')
}
function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[2],mdy[1],mdy[0])
}
function loadLHKH() {
    $('#dgkhdvlt').datagrid('load', {
        loadLH: ""
    })
}
function datLKH() {
    $('#dlg_dldv').dialog('open').dialog('setTitle', 'Thêm Khách Hàng');
    $(function() {
        $("#datL").click(function() {
            $maDV = $('#maDV').combogrid('getValue');
            $TGden = $('#TGden').datetimebox('getValue');
            $ghichu = $('#ghichu').textbox('getValue');
            if (!$("#fm").form('validate')) {
                return !1
            }
            if (!$(this).hasClass('clicked')) {
                $("#datL").addClass('clicked')
                $.post('datL', {
                    maDV: $maDV,
                    TGden: $TGden,
                    ghichu: $ghichu
                }, function(data) {
                    if (data) {
                        $("#luuKH").removeClass('clicked')
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: data
                        })
                    } else {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: 'Đặt lịch không thành công'
                        })
                    }
                })
            }
        })
    })
}
function kiemtrathontinkh() {
    $tenKH = $('#tenKH').val();
    $soDT = $('#soDT').val();
    $diachi = $('#diachi').val();
    if ($tenKH == "") {
        thongbao("vui lòng nhập tên khách hàng")
        return !1
    }
    if ($soDT == "") {
        thongbao("vui lòng thông tin số điện thoại")
        return !1
    }
    if ($diachi == "") {
        thongbao("vui lòng nhập thông tin địa chỉ khách hàng")
        return !1
    }
}
function themKhachhang() {
    $('#dlg').dialog('open').dialog('setTitle', 'Thêm Khách Hàng');
    $("#fm").form("reset")
    $("#nkh").combobox({
        onLoadSuccess: function(items) {
            if (items.length) {
                var opts = $('#nkh').combobox('options');
                $('#nkh').combobox('select', items[1][opts.valueField])
            }
        }
    })
    $("#nguonkh").combobox({
        onLoadSuccess: function(items) {
            if (items.length) {
                var opts = $('#nguonkh').combobox('options');
                $('#nguonkh').combobox('select', items[2][opts.valueField])
            }
        }
    })
    $("#mqhkh").combobox({
        onLoadSuccess: function(items) {
            if (items.length) {
                var opts = $('#mqhkh').combobox('options');
                $('#mqhkh').combobox('select', items[0][opts.valueField])
            }
        }
    })
    $("#capnhatKH").hide();
    $("#luuKH").show();
    $("#luuKH").removeClass("clicked")
    $("#luuKH").click(function() {
        if (kiemtrathontinkh() == !1) {
            return !1
        }
        $fax = $('#fax').val();
        $tenKH = $('#tenKH').val();
        $gioiTinh = $('#gioiTinh').val();
        $diachi = $('#diachi').val();
        $dcrieng = $('#diachinr').val();
        $ngaySinh = $('#ngaySinh').datebox('getValue');
        $huyen = $('#huyen').combobox('getValue');
        $soDT = $('#soDT').val();
        $Email = $('#Email').val();
        $tinh = $('#tinh').combobox('getValue');
        $mt = $('#mt').val();
        $ngt = $('#ngt').val();
        $nkh = $('#nkh').combobox('getValue');
        $npt = $('#npt').combobox('getValue');
        $nguonkh = $('#nguonkh').combobox('getValue');
        $mqhkh = $('#mqhkh').combobox('getValue');
        $soDT = $soDT.trim();
        if (!kiemtrasodienthoai($soDT))
            return thongbao("S\u1ed1 \u0111i\u1ec7n tho\u1ea1i h\u1ee3p l\u1ec7 c\u00f3 chi\u1ec1u d\u00e0i 10 k\u00fd t\u1ef1 s\u1ed1"),
            !1;
        $huyen = parseInt($huyen);
        if (isNaN($tinh) || $tinh == '') {
            thongbao("Vui lòng Click chọn tỉnh");
            return !1
        }
        if (isNaN($huyen) || $huyen == '') {
            thongbao("Vui lòng Click chọn huyện");
            return !1
        }
        if ($npt == '') {
            thongbao("Vui lòng chọn người phụ trách")
            return !1
        }
        $("#fm").form('enableValidation').form('validate');
        if (!$("#fm").form('validate')) {
            return !1
        }
        var bien = {
            tenKH: $tenKH,
            gioiTinh: $gioiTinh,
            ngaySinh: $ngaySinh,
            Diachi: $diachi,
            dcrieng: $dcrieng,
            soDT: $soDT,
            Email: $Email,
            huyen: $huyen,
            tinh: $tinh,
            fax: $fax,
            mt: $mt,
            ngt: $ngt,
            nkh: $nkh,
            npt: $npt,
            mqhkh: $mqhkh,
            nguonkh: $nguonkh
        }
        if (!$(this).hasClass('clicked')) {
            $("#luuKH").addClass('clicked')
            sendajax("themKH", bien, "dg")
            $('#dlg').dialog('close')
        }
    })
}
function capNhatKH() {
    $("#luuKH").hide();
    $("#capnhatKH").show();
    $("#capnhatKH").removeClass('clicked');
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $maKH = row.MaKH;
        $('#dlg').dialog('open').dialog('setTitle', 'Cập Nhật Khách Hàng');
        $("#capnhatKH").click(function() {
            if (kiemtrathontinkh() == !1) {
                return !1
            }
            $fax = $('#fax').val();
            $tenKH = $('#tenKH').val();
            $gioiTinh = $('#gioiTinh').val();
            $diachi = $('#diachi').val();
            $dcrieng = $('#diachinr').val();
            $ngaySinh = $('#ngaySinh').datebox('getValue');
            $huyen = $('#huyen').combobox('getValue');
            $soDT = $('#soDT').val();
            if (!kiemtrasodienthoai($soDT))
                return thongbao("S\u1ed1 \u0111i\u1ec7n tho\u1ea1i h\u1ee3p l\u1ec7 c\u00f3 chi\u1ec1u d\u00e0i 10 k\u00fd t\u1ef1 s\u1ed1"),
                !1;
            $Email = $('#Email').val();
            $tinh = $('#tinh').combobox('getValue');
            $mt = $('#mt').val();
            $ngt = $('#ngt').val();
            $nkh = $('#nkh').combobox('getValue');
            $npt = $('#npt').combobox('getValue');
            $nguonkh = $('#nguonkh').combobox('getValue');
            $mqhkh = $('#mqhkh').combobox('getValue');
            $huyen = parseInt($huyen);
            if (isNaN($tinh) || $tinh == '') {
                thongbao("Vui lòng Click chọn tỉnh");
                return !1
            }
            if (isNaN($huyen) || $huyen == '') {
                thongbao("Vui lòng Click chọn huyện");
                return !1
            }
            $("#fm").form('enableValidation').form('validate');
            if (!$("#fm").form('validate')) {
                return !1
            }
            var bien = {
                tenKH: $tenKH,
                gioiTinh: $gioiTinh,
                ngaySinh: $ngaySinh,
                Diachi: $diachi,
                dcrieng: $dcrieng,
                soDT: $soDT,
                Email: $Email,
                huyen: $huyen,
                tinh: $tinh,
                fax: $fax,
                mt: $mt,
                ngt: $ngt,
                nkh: $nkh,
                npt: $npt,
                mqhkh: $mqhkh,
                nguonkh: $nguonkh,
                maKH: $maKH
            }
            if (!$(this).hasClass('clicked')) {
                $("#capnhatKH").addClass('clicked')
                sendajax("chinhSuaKH", bien, "dg");
                $('#dlg').dialog('close')
            }
        })
        $('#fm').form('load', row)
    } else {
        thongbao("Vui lòng chọn khách hàng cần chỉnh sữa")
    }
}
function xoaKH() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $maKH = row.MaKH;
        var bien = {
            maKH: $maKH
        }
        xoadulieuajax("xoaKH", bien, 'dg', 'Bạn có chắc muốn thực hiện thao tác này không')
    } else {
        thongbao("vui lòng chọn khách hàng cần xóa")
    }
}
function timKH() {
    $timKiemNhanVien = $('#tim').val();
    if ($timKiemNhanVien != "") {
        $('#dg').datagrid('load', {
            timKiemKH: $timKiemNhanVien
        })
    } else {
        $manv = $("#nhanvienkd_kh").combobox("getValue")
        $manhom = $("#capbac_kh").combobox("getValue")
        $bien = {
            manv: $manv,
            manhom: $manhom
        }
        $('#dg').datagrid('load', {
            timkiemtheonv_capbac: '1',
            thamso: $bien
        })
    }
}
function xuatdanhsachkhtheotimkiem() {
    $timKiemNhanVien = $('#tim').val();
    $manv = $("#nhanvienkd_kh").combobox("getValue")
    $manhom = $("#capbac_kh").combobox("getValue")
    $bien = [$timKiemNhanVien, $manv, $manhom]
    xuatfile("", "", "export_dsKH", $bien)
}
function taiLaiLH() {
    $('#dg').datagrid('load', {})
}
function newCustomer() {
    $("#suakhpt").hide();
    $("#themkhpt").show();
    $('#inp-ngaysinh').datebox({
        onSelect: date=>{
            var today = new Date();
            var todayval = new Date(today.toDateString());
            if (date > todayval) {
                $.messager.alert('Warning', 'Ngày Sinh phải nhỏ hơn ngày hiện tại!');
                $('#inp-ngaysinh').datebox('setValue', '')
            }
        }
    });
    $('#cnkhsale-newcustomer-dlg').dialog('open').dialog('setTitle', 'Thêm Khách Mới');
    $("#themkhpt").click(function() {
        if (!$("#cnkhsale-newcustomer-fm").form('validate')) {
            return !1
        }
        $tenkh = $("#tenkhpt").textbox("getValue");
        $sdt = $("#inp-sdt").textbox("getValue");
        if (!kiemtrasodienthoai($dt))
            return thongbao("S\u1ed1 \u0111i\u1ec7n tho\u1ea1i h\u1ee3p l\u1ec7 c\u00f3 chi\u1ec1u d\u00e0i 10 k\u00fd t\u1ef1 s\u1ed1"),
            !1;
        $dc = $("#diachikh").textbox("getValue");
        $gioitinh = $("#gioiTinh").combobox("getValue");
        $namsinh = $("#inp-ngaysinh").datebox("getValue");
        $ghichu = $("#inp-ghichu").textbox("getValue");
        $manhomkh = $("#nkh").combobox("getValue");
        $nguonkh = $("#nguonkh").combobox("getValue");
        $mamqh = $("#mqhkh").combobox("getValue");
        $email = $("#Email").textbox("getValue");
        var bien = {
            tenkh: $tenkh,
            sdt: $sdt,
            dc: $dc,
            gioitinh: $gioitinh,
            namsinh: $namsinh,
            ghichu: $ghichu,
            manhomkh: $manhomkh,
            nguonkh: $nguonkh,
            mamqh: $mamqh,
            email: $email
        };
        sendajax("../khachhangs/themkhphutrach", bien, "nvphutrachkh-dg");
        $("#cnkhsale-newcustomer-fm").form('clear');
        $('#cnkhsale-newcustomer-dlg').dialog('close')
    })
}
function EditCustomer() {
    $("#themkhpt").hide();
    $("#suakhpt").show();
    var row = $("#nvphutrachkh-dg").datagrid("getSelected");
    if (row) {
        $sdtcu = row.Dienthoai;
        $makh = row.MaKH;
        $('#inp-ngaysinh').datebox({
            onSelect: date=>{
                var today = new Date();
                var todayval = new Date(today.toDateString());
                if (date > todayval) {
                    $.messager.alert('Warning', 'Ngày Sinh phải nhỏ hơn ngày hiện tại!');
                    $('#inp-ngaysinh').datebox('setValue', '')
                }
            }
        });
        $("#cnkhsale-newcustomer-fm").form("load", row);
        $('#cnkhsale-newcustomer-dlg').dialog('open').dialog('setTitle', 'Chỉnh sửa khách hàng');
        $("#suakhpt").click(function() {
            if (!$("#cnkhsale-newcustomer-fm").form('validate')) {
                return !1
            }
            $tenkh = $("#tenkhpt").textbox("getValue");
            $sdt = $("#inp-sdt").textbox("getValue");
            if (!kiemtrasodienthoai($dt))
                return thongbao("S\u1ed1 \u0111i\u1ec7n tho\u1ea1i h\u1ee3p l\u1ec7 c\u00f3 chi\u1ec1u d\u00e0i 10 k\u00fd t\u1ef1 s\u1ed1"),
                !1;
            $dc = $("#diachikh").textbox("getValue");
            $gioitinh = $("#gioiTinh").combobox("getValue");
            $namsinh = $("#inp-ngaysinh").datebox("getValue");
            $ghichu = $("#inp-ghichu").textbox("getValue");
            $manhomkh = $("#nkh").combobox("getValue");
            $nguonkh = $("#nguonkh").combobox("getValue");
            $mamqh = $("#mqhkh").combobox("getValue");
            $email = $("#Email").textbox("getValue");
            var bien = {
                sdtcu: $sdtcu,
                makh: $makh,
                tenkh: $tenkh,
                sdt: $sdt,
                dc: $dc,
                gioitinh: $gioitinh,
                namsinh: $namsinh,
                ghichu: $ghichu,
                manhomkh: $manhomkh,
                nguonkh: $nguonkh,
                mamqh: $mamqh,
                email: $email
            };
            sendajax("../khachhangs/suakhphutrach", bien, "nvphutrachkh-dg");
            $("#cnkhsale-newcustomer-fm").form('clear');
            $('#cnkhsale-newcustomer-dlg').dialog('close')
        })
    } else {
        thongbao("Chọn khách hàng cần chỉnh sửa")
    }
}
function removecustomer() {
    var row = $("#nvphutrachkh-dg").datagrid("getSelected");
    if (row) {
        var bien = {
            makh: row.MaKH
        }
        xoadulieuajax("../khachhangs/xoakhphutrach", bien, "nvphutrachkh-dg", "Bạn có muốn ngừng phụ trách khách hàng này không")
    } else {
        thongbao("Chọn khách hàng cần xóa")
    }
}
function nhanvienpt() {
    var row = $("#dg").datagrid('getSelected')
    if (row) {
        $makh = row.MaKH;
        $('#dlg_nhanvienphutrach').dialog('open');
        $("#nhanvienpt_dg").datagrid("load", {
            makh: $makh
        })
    } else {
        thongbao("Vui lòng chọn khách hàng")
    }
}
function themnvpt() {
    var row = $("#dg").datagrid('getSelected')
    if (row) {
        $makh = row.MaKH;
        $manv = $("#nhanvienkdnvpt").combobox("getValue");
        if ($manv == "") {
            thongbao("Vui lòng chọn nhân viên kinh doanh")
            return !1
        }
        var bien = {
            makh: $makh,
            manv: $manv
        }
        sendajax("themnvpt", bien, "nhanvienpt_dg");
        $("#nhanvienpt_dg").datagrid("load", {
            makh: $makh
        })
    } else {
        thongbao("Vui lòng chọn khách hàng");
        $('#dlg_nhanvienphutrach').dialog('close')
    }
}
function xoanvpt() {
    var row = $("#nhanvienpt_dg").datagrid('getSelected')
    if (row) {
        $id = row.id;
        var bien = {
            id: $id
        }
        xoadulieuajax("xoanvpt", bien, "nhanvienpt_dg", "Bạn có muốn thực hiện thao tác này không");
        $("#nhanvienpt_dg").datagrid("load", {
            makh: $makh
        })
    } else {
        thongbao("Vui lòng chọn khách hàng")
    }
}
function phancapkh() {
    var row = $("#dg").datagrid("getSelected")
    if (row) {
        $makh = row.MaKH
        $("#captren").prop("checked", !0);
        $("#phancapkh_dg").datagrid("load", {
            makh: $makh
        })
        $("#phancapkhachhang_dlg").dialog("open")
    } else {
        thongbao("Vui lòng chọn khách hàng")
    }
}
function taidulieucaptren() {
    var row = $("#dg").datagrid("getSelected")
    if (row) {
        $makh = row.MaKH
        $("#phancapkh_dg").datagrid("load", {
            makh: $makh
        })
    } else {
        thongbao("Vui lòng chọn khách hàng")
    }
}
function taidulieucapduoi() {
    var row = $("#dg").datagrid("getSelected")
    if (row) {
        $makh = row.MaKH
        $("#phancapkh_dg").datagrid("load", {
            makhcapduoi: $makh
        })
    } else {
        thongbao("Vui lòng chọn khách hàng")
    }
}
function themphancapkh() {
    var row = $("#dg").datagrid("getSelected")
    $tinhtrang = $("#captren").is(":checked");
    if (row) {
        $makh = row.MaKH
        $makhpt = $("#khachphancap").combobox("getValue")
        if ($makhpt == $makh) {
            thongbao("Lỗi trùng khách hàng")
            return !1
        }
        if ($makhpt == '') {
            thongbao("vui lòng chọn khách hàng cần thêm")
            return !1
        } else if ($tinhtrang == !0) {
            var bien = {
                makh: $makh,
                makhpt: $makhpt
            }
            sendajax("../phancapkhs/themphancapkh", bien, "phancapkh_dg")
        } else if ($tinhtrang == !1) {
            var bien = {
                makh: $makhpt,
                makhpt: $makh
            }
            sendajax("../phancapkhs/themphancapkh", bien, "phancapkh_dg")
        } else {
            return !0
        }
    } else {
        thongbao("Vui lòng chọn khách hàng")
    }
}
function xoaphancapkh() {
    var row = $("#phancapkh_dg").datagrid("getSelected")
    if (row) {
        var bien = {
            id: row.id
        }
        xoadulieuajax("../phancapkhs/xoaphancapkh", bien, "phancapkh_dg", "Bạn muốn xóa khách hàng này không")
    } else {
        thongbao("Vui lòng chọn khách hàng cần xóa")
    }
}
function capnhatgioihancnkh() {
    var row = $("#gioihancnkh_dg").datagrid("getSelected")
    if (row) {
        $sotien = $("#sotiengioihancnkh").numberspinner("getValue")
        $ghichu = $("#ghichughino").textbox("getValue")
        var bien = {
            id: row.id,
            sotien: $sotien,
            ghichu: $ghichu
        }
        sendajax("../gioihancnkhs/capnhatgioihancnkh", bien, "gioihancnkh_dg")
    } else {
        thongbao("Vui lòng chọn khách hàng cần cập nhật")
    }
}
function capnhatnhomkh() {
    var row = $("#nhomkhachhang_dg").datagrid("getSelected")
    if (row) {
        $von = $("#von").textbox("getValue")
        $duytrithang = $("#duytrithang").textbox("getValue")
        $loinhuan = $("#loinhuan").textbox("getValue")
        $Chuthich = $("#ghichu").textbox("getValue")
        var bien = {
            Manhomkh: row.Manhomkh,
            von: $von,
            duytrithang: $duytrithang,
            loinhuan: $loinhuan,
            Chuthich: $Chuthich
        }
        sendajax("../nhomkhachhangs/capnhatnhomkh", bien, "nhomkhachhang_dg")
    } else {
        thongbao("Vui lòng chọn nhóm khách hàng cần cập nhật")
    }
}
