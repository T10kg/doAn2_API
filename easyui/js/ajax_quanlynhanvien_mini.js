function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[2], mdy[1], mdy[0]);
}
$('#timFULL_focus').focus();
function themNhanVien() {
    $('#dlg').dialog('open').dialog('setTitle', 'Thêm Nhân Viên');
    $("#fm").form("reset");
    // Load comboboxes for MaCV and maPB
    $("#capnhatNhanVien").hide();
    $("#luuNhanVien").show();
    $("#MaCV").combobox({
        onLoadSuccess: function (items) {
            if (items.length) {
                var opts = $('#MaCV').combobox('options');
                $('#MaCV').combobox('select', items[0][opts.valueField]);
            }
        }
    });

    $("#maPB").combobox({
        onLoadSuccess: function (items) {
            if (items.length) {
                var opts = $('#maPB').combobox('options');
                $('#maPB').combobox('select', items[0][opts.valueField]);
            }
        }
    });

    $("#luuNhanVien").removeClass("clicked");
    $("#luuNhanVien").click(function () {
        if (!$("#fm").form('validate')) {
            return false;
        }

        let bien = {
            maNV: $('#maNV').val(),
            tenNV: $('#tenNV').val(),
            gioiTinh: $('#gioiTinh').val(),
            Diachi: $('#diachi').val(),
            ngaySinh: $('#ngaySinh').datebox('getValue'),
            Dantoc: $('#dantoc').val(),
            soDT: $('#soDT').val().trim(),
            Email: $('#Email').val(),
            honnhan: $('#honnhan').val(),
            noicap: $('#noicap').val(),
            soCMT: $('#soCMT').val(),
            Tongiao: $('#tongiao').val(),
            Quoctich: $('#Quoctich').val(),
            matKhau: $('#matKhau').val(),
            MaCV: $('#MaCV').combobox('getValue'),
            maPB: $('#maPB').combobox('getValue'),
            loainv: $("#loainv").val(),
        };

        if (!$(this).hasClass('clicked')) {
            $("#luuNhanVien").addClass('clicked');
            $.ajax({
                type: "POST",
                url: "../nhanvien/themNhanVien/",
                data: JSON.stringify(bien),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    canhbao("Thêm nhân viên thành công")
                    $('#dlg').dialog('close');
                    location.reload();
                    // Reload data grid or perform other actions
                },
                error: function (xhr) {
                    alert("Lỗi: " + xhr.responseJSON.error);
                }
            });
        }
    });
}
$(function () {
    $('#dlg').dialog({
        onClose: function () {
            $("#capnhatNhanVien").removeClass('clicked');
            // You can perform actions here after the dialog is closed
        }
    });
});
function capNhatNhanVien() {
    $('#luuNhanVien').hide()
    $("#capnhatNhanVien").click(function () {
        var row = $('#dg').datagrid('getSelected');
        let maNVCu = row.maNV;
        let bien = {
            maNV: $('#maNV').val(),
            tenNV: $('#tenNV').val(),
            gioiTinh: $('#gioiTinh').val(),
            diachi: $('#diachi').val(),
            ngaySinh: $('#ngaySinh').datebox('getValue'),  // Get the correct value
            dantoc: $('#dantoc').val(),
            soDT: $('#soDT').val().trim(),
            Email: $('#Email').val(),  // Correct capitalization
            honnhan: $('#honnhan').val(),
            Noicap: $('#Noicap').val(),
            soCMT: $('#soCMT').val(),
            tongiao: $('#tongiao').val(),
            quoctich: $('#Quoctich').val(),
            MaCV: $('#MaCV').combobox('getValue'),
            maPB: $('#maPB').combobox('getValue'),
            loainv: $("input[name='loainv']:checked").val(),
            maNVCu: maNVCu
        };
        $.ajax({
            type: "PUT",
            url: "../nhanvien/capNhatNhanVien/",
            data: JSON.stringify(bien),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $.messager.show({
                    title: 'Thông Báo',
                    msg: 'Cập nhật nhân viên thành công'
                });
                $('#dlg').dialog('close');
                $('#dg').datagrid('reload');
            },
            error: function (xhr) {
                $.messager.show({
                    title: 'Thông Báo',
                    msg: 'Lỗi: ' + xhr.responseJSON.error
                });
            },
            complete: function () {
                $("#capnhatNhanVien").removeClass('clicked');
            }
        });
    })
    if (!$("#capnhatNhanVien").hasClass('clicked')) {
        $("#capnhatNhanVien").addClass('clicked');
        var row = $('#dg').datagrid('getSelected');
        if (row) {
            $('#dlg').dialog('open').dialog('setTitle', 'Cập Nhật Khách Hàng');
            $('#fm').form('load', row);
            $("#luuKH").hide();
            $("#capnhatKH").show();
            if (!$("#fm").form('validate')) {
                return false;
            }
            console.log(row)
        } else {
            $.messager.show({
                title: 'Thông Báo',
                msg: 'Chọn Dòng Cần Chỉnh Sửa'
            });
        }
    }
}

// function capNhatNhanVien1() {
//     var row = $('#dg').datagrid('getSelected');
//     if (row) {
//         $('#dlg').dialog('open').dialog('setTitle', 'Cập Nhật Nhân Viên');
//         $('#fm').form('load', row);
//         $("#luuNhanVien").hide();


//         // Load comboboxes for MaCV and maPB
//         $("#MaCV").combobox({
//             onLoadSuccess: function (items) {
//                 if (items.length) {
//                     var opts = $('#MaCV').combobox('options');
//                     $('#MaCV').combobox('select', items[0][opts.valueField]);
//                 }
//             }
//         });

//         $("#maPB").combobox({
//             onLoadSuccess: function (items) {
//                 if (items.length) {
//                     var opts = $('#maPB').combobox('options');
//                     $('#maPB').combobox('select', items[0][opts.valueField]);
//                 }
//             }
//         });
//         console.log(1)
//         $("#capnhatNhanVien").click(function () {
//             if (!$("#fm").form('validate')) {
//                 console.log(3)
//                 return false;
//             }
//             console.log(2)
//             let bien = {
//                 maNV: $('#maNV').val(),
//                 tenNV: $('#tenNV').val(),
//                 gioiTinh: $('#gioiTinh').val(),
//                 diachi: $('#diachi').val(),
//                 ngaySinh: $('#ngaySinh').datebox('getValue'),  // Get the correct value
//                 dantoc: $('#dantoc').val(),
//                 soDT: $('#soDT').val().trim(),
//                 Email: $('#Email').val(),  // Correct capitalization
//                 honnhan: $('#honnhan').val(),
//                 noicap: $('#noicap').val(),
//                 soCMT: $('#soCMT').val(),
//                 tongiao: $('#tongiao').val(),
//                 quoctich: $('#Quoctich').val(),
//                 MaCV: $('#MaCV').combobox('getValue'),
//                 maPB: $('#maPB').combobox('getValue'),
//                 loainv: $("input[name='loainv']:checked").val(),
//                 maNVCu: $('#maNV').val()
//             };

//             if (!$(this).hasClass('clicked')) {
//                 $("#capNhatNhanVien").addClass('clicked');
//                 $.ajax({
//                     type: "PUT",
//                     url: "../nhanvien/capNhatNhanVien/",
//                     data: JSON.stringify(bien),
//                     contentType: "application/json; charset=utf-8",
//                     success: function (data) {
//                         $.messager.show({
//                             title: 'Thông Báo',
//                             msg: 'Cập nhật nhân viên thành công'
//                         });
//                         $('#dlg').dialog('close');
//                         $('#dg').datagrid('reload');
//                     },
//                     error: function (xhr) {
//                         $.messager.show({
//                             title: 'Thông Báo',
//                             msg: 'Lỗi: ' + xhr.responseJSON.error
//                         });
//                     },
//                     complete: function () {
//                         $("#capnhatNhanVien").removeClass('clicked');
//                     }
//                 });
//             }
//         });
//     } else {
//         $.messager.show({
//             title: 'Thông Báo',
//             msg: 'Chọn Dòng Cần Chỉnh Sửa'
//         });
//     }
// }

function xoaNhanVien() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        var maNV = row.maNV;
        var tenNV = row.tenNV;
        var confirmDelete = confirm('Bạn có muốn xóa nhân viên ' + tenNV + ' không?');
        if (confirmDelete) {
            if (!$(this).hasClass('clicked')) {
                $(this).addClass('clicked');
                $.ajax({
                    type: 'POST',
                    url: '../nhanvien/xoaNhanVien/',  // Đường dẫn đến endpoint xóa nhân viên
                    data: JSON.stringify({ maNV: maNV }),
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $("#xoa").removeClass('clicked');
                        $('#dg').datagrid('reload');
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: data.message || 'Xóa nhân viên thành công'
                        });
                    },
                    error: function (xhr) {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: xhr.responseJSON.error || 'Có lỗi xảy ra'
                        });
                    }
                });
            }
        }
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn dòng cần xóa'
        });
    }
}


function timNhanVien() {
    $timKiemNhanVien = $('#tim').val();
    $('#dg').datagrid('load', {
        timKiemNhanVien: $timKiemNhanVien
    });
}
function taiLai() {
    $timKiemNhanVien = $('#tim').val();
    $('#dg').datagrid('load', { timKiemNhanVien: '' });
}
function taiLainvkh() {
    $timnvkh = $('#tim').val();
    $('#nhanvienkhachhang_dg').datagrid('load', { timnvkh: '' });
}
/*Tìm kiếm nhân viên*/
function timnvkh() {
    $timnvkh = $('#timnvkh').val();
    $('#nhanvienkhachhang_dg').datagrid('load', { timnvkh: $timnvkh });
}
/*them nhan vien khach hang*/
function themnvkh() {
    $makh = $("#khnv_kh").combobox("getValue");
    $manv = $("#khnv_nv").combobox("getValue");
    $ghichu = $("#khnv_ghichu").textbox("getValue");
    $makh = parseInt($makh)
    if (isNaN($makh) || $makh == '') {
        thongbao("Vui lòng Click chọn khách hàng");
        return false;
    }
    if ($manv == '') {
        thongbao("Vui lòng Click chọn nhân viên");
        return false;
    }

    var bien = { makh: $makh, manv: $manv, ghichu: $ghichu }
    sendajax("../nhanvienkhachhangs/themnhanvienkh", bien, "nhanvienkhachhang_dg")
}
function xoanvkh() {
    var row = $("#nhanvienkhachhang_dg").datagrid("getSelected")
    if (row) {
        $id = row.id
        var bien = { id: $id }
        xoadulieuajax("../nhanvienkhachhangs/xoanhanvienkh", bien, "nhanvienkhachhang_dg", "Bạn có muốn thực hiện thao tác này không?")
    }
    else {
        thongbao("Vui lòng chọn dòng cần xóa")
    }

}
function guiMail() {
    $m = Math.floor((Math.random() * 1000000) + 1);
    $("#tam_mail").text($m);
    $m = $("#tam_mail").text();
    $(function () {
        $("#thongbaothaydoimatkhau").text('');
        $('#dlg_guimail').dialog('open').dialog('setTitle', 'Gửi mail cho sinh viên');
        $("#gui").click(function () {
            $macode = $("#macode_mail").val();
            $noiDungMail = $('#noiDungThu').val();
            if (!$("#fm").form('validate')) {
                return false;
            }
            if ($m != $macode) {
                alert("Mã Code Bạn Không Đúng Vui Lòng Nhập Lại");
                $("#macode_mail").focus();
                return false;
            }

            if ($("#chk1").is(':checked')) {
                $mail = $("#Email_gui").val();
            }
            else {
                $("#Email_gui").val('');
                $mail = $("#Email_gui").val();
            }
            if (!$(this).hasClass('clicked')) {
                if ($("#chk1").is(':checked')) {
                    if ($mail == "") {
                        $("#Email_gui").focus();
                        return false;
                    }
                }
                if ($noiDungMail == "") {
                    alert("Vui lòng điện nội dung mail");
                    $("#noiDungThu").focus();
                    return false;
                }
                $("#tam_mail").text('');
                $('#thongbao .chotaidulieu').show();
                $("#gui").addClass('clicked')
                $.post(
                    '../nhanviens/guiMailChoSV',        // đường dẫn đến file xữ lý save
                    {
                        Email: $mail,
                        noiDungMail: $noiDungMail
                    },

                    //------------------------------------------------------
                    function (data) {
                        if (data) {
                            $('#thongbao .chotaidulieu').hide();
                            $.messager.show({
                                title: 'Thông Báo',
                                msg: data
                            });
                            $("#gui").removeClass("clicked");
                        }
                        else {
                            $('#thongbao .chotaidulieu').hide();
                            $.messager.show({
                                title: 'Thông Báo',
                                msg: 'Có Lỗi Xảy Ra Xin Vui Lòng Kiểm Tra Lại'
                            });
                        }
                    }
                );

            }
        });
    });

}