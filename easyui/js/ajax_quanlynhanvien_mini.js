function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[2],mdy[1],mdy[0])
}
$('#timFULL_focus').focus();

function themNhanVien() {
    $('#dlg').dialog('open').dialog('setTitle', 'Thêm Nhân Viên');
    $('#thongbao').val('');
    $('#maNV').val('');
    $('#maNV').focus();
    $('#tenNV').val('');
    $('#diachi').val('');
    $('#ngaySinh').val('');
    $('#dantoc').val('Kinh');
    $('#honnhan').val('');
    $('#noicap').val('');
    $('#tongiao').val('');
    $('#soDT').val('');
    $('#soCMT').val('');
    $('#Email').val('');
    $('#Quoctich').val('Việt Nam');
    $('.div_matKhau').show();
    $('#matKhau').val('');
    $("#capnhatNhanVien").hide();
    $("#luuNhanVien").show();
    $("#luuNhanVien").removeClass('clicked')
    $("#luuNhanVien").click(function() {
        if (!$("#fm").form('validate')) {
            return !1
        }
        $maNV = $('#maNV').val();
        $tenNV = $('#tenNV').val();
        $gioiTinh = $('#gioiTinh').val();
        $diachi = $('#diachi').val();
        $ngaySinh = $('#ngaySinh').datebox('getValue');
        $dantoc = $('#dantoc').val();
        $honnhan = $('#honnhan').val();
        $noicap = $('#noicap').val();
        $tongiao = $('#tongiao').val();
        $soDT = $('#soDT').val();
        $soCMT = $('#soCMT').val();
        $Email = $('#Email').val();
        $Quoctich = $('#Quoctich').val();
        $matKhau = $('#matKhau').val();
        $MaCV = $('#MaCV').combobox('getValue');
        $maPB = $('#maPB').combobox('getValue');

        if ($("#tongcongty").is(":checked")) {
            $loainv = $("#tongcongty").val()
        } else if ($("#daily").is(":checked")) {
            $loainv = $("#daily").val()
        } else {
            thongbao("Vui lòng chọn loại nhân viên")
        }
        var bien = {
            maNV: $maNV,
            tenNV: $tenNV,
            gioiTinh: $gioiTinh,
            ngaySinh: $ngaySinh,
            Diachi: $diachi,
            Dantoc: $dantoc,
            soDT: $soDT,
            soCMT: $soCMT,
            Email: $Email,
            Honnhan: $honnhan,
            Noicap: $noicap,
            matKhau: $matKhau,
            Quoctich: $Quoctich,
            Tongiao: $tongiao,
            MaCV: $MaCV,
            maPB: $maPB,
            loainv: $loainv
        }
        if (!$(this).hasClass('clicked')) {
            $("#luuNhanVien").addClass('clicked')
            sendajax('themNhanVien', bien, "dg")
            $('#dlg').dialog('close')
        }
    })
}

function capNhatNhanVien() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $('#dlg').dialog('open').dialog('setTitle', 'Cập Nhật Nhân Viên');
        $('#fm').form('load', row);
        $("#luuNhanVien").hide();
        $("#capnhatNhanVien").show();
        $('#matKhau').val('a');
        $maNVCu = $('#maNV').val();
        $('.div_matKhau').hide();
        $(function() {
            $("#capnhatNhanVien").click(function() {
                $maNV = $('#maNV').val();
                $tenNV = $('#tenNV').val();
                $gioiTinh = $('#gioiTinh').val();
                $diachi = $('#diachi').val();
                $ngaySinh = $('#ngaySinh').datebox('getValue');
                $dantoc = $('#dantoc').val();
                $honnhan = $('#honnhan').val();
                $noicap = $('#noicap').val();
                $tongiao = $('#tongiao').val();
                $soDT = $('#soDT').val();
                $soCMT = $('#soCMT').val();
                $Email = $('#Email').val();
                $Quoctich = $('#Quoctich').val();
                $MaCV = $('#MaCV').combobox('getValue');
                $maPB = $('#maPB').combobox('getValue');
                if ($("#tongcongty").is(":checked")) {
                    $loainv = $("#tongcongty").val()
                } else {
                    $loainv = $("#daily").val()
                }
                if (!$("#fm").form('validate')) {
                    return !1
                }
                if (!$(this).hasClass('clicked')) {
                    $("#capnhatNhanVien").addClass('clicked')
                    $.post('chinhSuaNhanVien', {
                        maNV: $maNV,
                        tenNV: $tenNV,
                        gioiTinh: $gioiTinh,
                        ngaySinh: $ngaySinh,
                        Diachi: $diachi,
                        Dantoc: $dantoc,
                        soDT: $soDT,
                        soCMT: $soCMT,
                        Email: $Email,
                        Honnhan: $honnhan,
                        Noicap: $noicap,
                        Quoctich: $Quoctich,
                        Tongiao: $tongiao,
                        maNVCu: $maNVCu,
                        MaCV: $MaCV,
                        maPB: $maPB,
                        loainv: $loainv
                    }, function(data) {
                        if (data) {
                            $('#dlg').dialog('close');
                            $('#dg').datagrid('reload');
                            $("#capnhatNhanVien").removeClass('clicked')
                            $.messager.show({
                                title: 'Thông Báo',
                                msg: data
                            })
                        } else {
                            $.messager.show({
                                title: 'Thông Báo',
                                msg: 'Cập Nhật Không Thành Công Nhân Viên' + $maNV + 'Xin Vui Lòng Kiểm Tra lại'
                            })
                        }
                    })
                }
            })
        })
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn Dòng Cần Chỉnh Sửa'
        })
    }
}

function xoaNhanVien() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $maNV = row.maNV;
        $tenNV = row.tenNV;
        var m = confirm('Bạn có Muốn Xóa Nhân Viên ' + $tenNV + ' Không ?');
        if (m) {
            if (!$(this).hasClass('clicked')) {
                $go_to = $('body:last').offset().bottom;
                $('html, body').animate({
                    scrollTop: $go_to
                }, 800);
                $("#xoa").addClass('clicked');
                $.post('xoaNhanVien', {
                    maNV: $maNV
                }, function(data) {
                    if (data) {
                        $("#xoa").removeClass('clicked')
                        $('#dg').datagrid('reload');
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: data
                        })
                    } else {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: data
                        })
                    }
                })
            }
        }
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn Dòng Cần Xóa'
        })
    }
}

function timNhanVien() {
    $timKiemNhanVien = $('#tim').val();
    $('#dg').datagrid('load', {
        timKiemNhanVien: $timKiemNhanVien
    })
}
function taiLai() {
    $timKiemNhanVien = $('#tim').val();
    $('#dg').datagrid('load', {
        timKiemNhanVien: ''
    })
}
function taiLainvkh() {
    $timnvkh = $('#tim').val();
    $('#nhanvienkhachhang_dg').datagrid('load', {
        timnvkh: ''
    })
}
function timnvkh() {
    $timnvkh = $('#timnvkh').val();
    $('#nhanvienkhachhang_dg').datagrid('load', {
        timnvkh: $timnvkh
    })
}

function themnvkh() {
    $makh = $("#khnv_kh").combobox("getValue");
    $manv = $("#khnv_nv").combobox("getValue");
    $ghichu = $("#khnv_ghichu").textbox("getValue");
    $makh = parseInt($makh)
    if (isNaN($makh) || $makh == '') {
        thongbao("Vui lòng Click chọn khách hàng");
        return !1
    }
    if ($manv == '') {
        thongbao("Vui lòng Click chọn nhân viên");
        return !1
    }
    var bien = {
        makh: $makh,
        manv: $manv,
        ghichu: $ghichu
    }
    sendajax("../nhanvienkhachhangs/themnhanvienkh", bien, "nhanvienkhachhang_dg")
}


function xoanvkh() {
    var row = $("#nhanvienkhachhang_dg").datagrid("getSelected")
    if (row) {
        $id = row.id
        var bien = {
            id: $id
        }
        xoadulieuajax("../nhanvienkhachhangs/xoanhanvienkh", bien, "nhanvienkhachhang_dg", "Bạn có muốn thực hiện thao tác này không?")
    } else {
        thongbao("Vui lòng chọn dòng cần xóa")
    }
}
function guiMail() {
    $m = Math.floor((Math.random() * 1000000) + 1);
    $("#tam_mail").text($m);
    $m = $("#tam_mail").text();
    $(function() {
        $("#thongbaothaydoimatkhau").text('');
        $('#dlg_guimail').dialog('open').dialog('setTitle', 'Gửi mail cho sinh viên');
        $("#gui").click(function() {
            $macode = $("#macode_mail").val();
            $noiDungMail = $('#noiDungThu').val();
            if (!$("#fm").form('validate')) {
                return !1
            }
            if ($m != $macode) {
                alert("Mã Code Bạn Không Đúng Vui Lòng Nhập Lại");
                $("#macode_mail").focus();
                return !1
            }
            if ($("#chk1").is(':checked')) {
                $mail = $("#Email_gui").val()
            } else {
                $("#Email_gui").val('');
                $mail = $("#Email_gui").val()
            }
            if (!$(this).hasClass('clicked')) {
                if ($("#chk1").is(':checked')) {
                    if ($mail == "") {
                        $("#Email_gui").focus();
                        return !1
                    }
                }
                if ($noiDungMail == "") {
                    alert("Vui lòng điện nội dung mail");
                    $("#noiDungThu").focus();
                    return !1
                }
                $("#tam_mail").text('');
                $('#thongbao .chotaidulieu').show();
                $("#gui").addClass('clicked')
                $.post('../nhanviens/guiMailChoSV', {
                    Email: $mail,
                    noiDungMail: $noiDungMail
                }, function(data) {
                    if (data) {
                        $('#thongbao .chotaidulieu').hide();
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: data
                        });
                        $("#gui").removeClass("clicked")
                    } else {
                        $('#thongbao .chotaidulieu').hide();
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: 'Có Lỗi Xảy Ra Xin Vui Lòng Kiểm Tra Lại'
                        })
                    }
                })
            }
        })
    })
}
