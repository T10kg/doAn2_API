function taolink() {
    var row = $('#dg').datagrid('getSelected');
    $('#taolink').textbox('readonly');
    if (row) {
        $('#dlg_taolink').dialog('open').dialog('setTitle', 'Tạo link sản phẩm');
        $ma = row.Masanpham;
        $ten = row.tensp;
        $.post(
            'taoLinKSP',        // đường dẫn đến file xữ lý save
            {
                ten: $ten,
                masp: $ma
            },

            //------------------------------------------------------
            function (data) {
                if (data) {
                    $('#vv').text($ten);
                    $('#taolink').textbox('setValue', data);
                }
            }

            ///-----------------------------------------------------
        );
    }
    else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn Dòng Cần Tạo'
        });
    }
}
function xemchitiet() {
    var row = $('#dg').datagrid('getSelected');
    //$('#anh').hide();
    // $('#xFilePath').hide();
    if (row) {

        $('#dlg').dialog('open').dialog('setTitle', 'Chi tiết thông tin sản phẩm');
        $('#fm').form('load', row);
        $("#luuSP").hide();
        $("#capnhatSP").hide();
        /*Điền thông tin trên dòng vào dialog */
        $ma = row.Masanpham;
        $ten = row.tensp;
        $tensp = $('#ten').textbox('setValue', $ten);
        $loaisp = combobox('setValue', row.loaisp);
        $gia_ban = row.gia_ban;
        $gb = $('#gia_ban').numberspinner('setValue', $gia_ban);
        $gia_nhap = row.gia_nhap;
        $gb = $('#gia_nhap').numberspinner('setValue', $gia_nhap);
        $chietkhau = row.chietkhau;
        $ck = $('#chietkhau').numberspinner('setValue', $chietkhau);

        $link = row.Linksp;

        $xx = row.xx;
        $x = $('#xx').val($xx);
        $mota = row.Mota;
        $mt = $('#mt').val($mota);
        $mansx = row.Mansx;
        $nsx = $('#mansx').combobox('setValue', $mansx);
        $manhom = row.Manhom;
        $mn = $('#manhom').combobox('setValue', $manhom);
        $Madvt = row.Madonvi;
        $mdv = $('#Madvt').combobox('setValue', $Madvt);
        $Url = row.Url;
        $u = $('#xFilePath').val($Url);
        $('#Url1').attr({
            'src': $Url
        });
    }
    else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn Dòng Cần Xem'
        });
    }
}
/*Cập nhật cap nhat quy doi diem*/
function capnhatquydoidiem() {
    $("#capnhatdiem").removeClass('clicked');
    var row = $("#qldiem-dg").datagrid("getSelected");
    if (row) {

        $("#qlxk_capnhatdiem-dlg").dialog("open").dialog('setTitle', 'Cập nhật điểm');
        $("#sodiemquydoi").numberspinner("setValue", row.sodiem)
        $("#capnhatdiem").click(function () {
            // if (!$('#fm').form('validate')){
            //         return false;
            //     }
            $id = row.id;
            $nhomsp = $('#nhomspqdd').combobox('getValue');
            // alert ($nhomsp);
            $sodiem = $("#sodiemquydoi").numberspinner("getValue");
            if ($("#vivannang_sp").is(":checked")) {
                $vivannang = "1";
            }
            else {
                $vivannang = "0";
            }

            var bien = { id: $id, manhom: $nhomsp, sodiem: $sodiem, vivannang: $vivannang }
            if (!$(this).hasClass('clicked')) {
                $("#capnhatdiem").addClass('clicked')
                sendajax("capnhatquydoidiem", bien, "qldiem-dg");
                $("#qlxk_capnhatdiem-dlg").dialog("close");
            }
        })
    }
    else {
        thongbao("Vui lòng chọn sản phẩm cần cập nhật điểm");
        return false;
    }
    $id = row.id;
}

function Xoasp() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        var maSP = row.MaSP;  // Lấy mã sản phẩm từ dòng đã chọn
        var tenSP = row.tensp;  // Lấy tên sản phẩm từ dòng đã chọn
        var confirmDelete = confirm('Bạn có muốn xóa sản phẩm ' + tenSP + ' không?');

        if (confirmDelete) {
            // Kiểm tra nếu nút "Xóa" chưa bị click trước đó
            if (!$(this).hasClass('clicked')) {
                $(this).addClass('clicked');

                // Gửi yêu cầu xóa sản phẩm bằng AJAX
                $.ajax({
                    type: 'POST',
                    url: '../sanpham/xoaSP/',  // Đường dẫn đến endpoint xóa sản phẩm
                    data: JSON.stringify({ maSP: maSP }),  // Gửi mã sản phẩm cần xóa
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        $(this).removeClass('clicked');
                        $('#dg').datagrid('reload');  // Tải lại datagrid sau khi xóa thành công
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: data.message || 'Xóa sản phẩm thành công'
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
        console.log(maSP)
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn dòng cần xóa'
        });
    }
}




function suasp() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $('#dlg').dialog('open').dialog('setTitle', 'Cập nhật Sản Phẩm');
        $("#fm").form("reset");

        // Hiện nút cập nhật và ẩn nút lưu
        $("#luuSP").hide();
        $("#capnhatSP").show();

        // Reset lại trạng thái nút "Cập nhật"
        $("#capnhatSP").removeClass("clicked");

        // Điền dữ liệu vào form
        $('#maSanPham').textbox('setValue', row.MaSP);
        $('#ten').textbox('setValue', row.tensp);
        $('#loaisp').combobox('setValue', row.tenloaisp);
        $('#gia_ban').numberspinner('setValue', row.gia_ban);
        $('#gia_nhap').numberspinner('setValue', row.gia_nhap);
        $('#chietkhau').numberspinner('setValue', row.chietkhau);
        $('#xx').val(row.xx);
        $('#mt').val(row.Mota);
        $('#Mansx').combobox('setValue', row.Mansx);
        $('#manhom').combobox('setValue', row.tennhom);
        $('#Madvt').combobox('setValue', row.Tendvt);
        $('#xFilePath').val(row.Url);
        $('#Url1').attr('src', row.Url);

        // Xử lý sự kiện click nút "Cập nhật"
        $("#capnhatSP").off('click').on('click', function () {
            // Nếu form không hợp lệ, ngăn việc submit
            if (!$("#fm").form('validate')) {
                return false;
            }

            // Lấy dữ liệu từ form
            let sanPhamData = {
                MaSP: $('#maSanPham').val() || row.MaSP,  // Giữ giá trị cũ nếu không thay đổi
                ten: $('#ten').val() || row.tensp,  // Giữ giá trị cũ nếu không thay đổi
                loaisp: $('#loaisp').val() || row.maloaisp,  // Giữ giá trị cũ nếu không thay đổi
                giaban: parseFloat($('#gia_ban').numberspinner('getValue')) || row.gia_ban,  // Giữ giá trị cũ nếu không thay đổi
                gianhap: parseFloat($('#gia_nhap').numberspinner('getValue')) || row.gia_nhap,  // Giữ giá trị cũ nếu không thay đổi
                chietkhau: $('#chietkhau').numberspinner('getValue') ? $('#chietkhau').numberspinner('getValue') + '%' : row.chietkhau,  // Giữ giá trị cũ nếu không thay đổi
                mota: $('#mt').val() || row.Mota,  // Giữ giá trị cũ nếu không thay đổi
                xFilePath: $('#xFilePath').val() || row.Url,  // Giữ giá trị cũ nếu không thay đổi
                Mansx: $('#Mansx').combobox('getValue') || row.Mansx,  // Giữ giá trị cũ nếu không thay đổi
                manhom: $('#manhom').combobox('getValue') || row.tennhom,  // Giữ giá trị cũ nếu không thay đổi
                mdonvi: $('#Madvt').combobox('getValue') || row.Tendvt  // Giữ giá trị cũ nếu không thay đổi
            };
            console.log(sanPhamData)

            // Kiểm tra nếu nút "Cập nhật" chưa được click trước đó
            if (!$(this).hasClass('clicked')) {
                $("#capnhatSP").addClass('clicked');  // Đánh dấu rằng nút đã được click

                // Gửi yêu cầu AJAX tới API cập nhật sản phẩm
                $.ajax({
                    type: "POST",
                    url: '../sanpham/suaSP/',  // Đường dẫn tới API cập nhật trong Django
                    data: JSON.stringify(sanPhamData),  // Chuyển dữ liệu sang JSON
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: response.success  // Hiển thị thông báo thành công
                        });
                        $('#dlg').dialog('close');  // Đóng dialog sau khi cập nhật thành công
                        $('#dg').datagrid('reload');  // Tải lại danh sách sản phẩm
                        $("#capnhatSP").removeClass('clicked');  // Xóa dấu hiệu đã click
                    },
                    error: function (xhr) {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: xhr.responseJSON.error  // Hiển thị thông báo lỗi
                        });
                        $("#capnhatSP").removeClass('clicked');  // Xóa dấu hiệu đã click
                    }
                });
            }
        });
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn dòng cần chỉnh sửa'
        });
    }
}


function themSP() {
    // Mở dialog thêm sản phẩm
    $('#dlg').dialog('open').dialog('setTitle', 'Thêm Sản Phẩm');
    $("#fm").form("reset");

    // Ẩn nút cập nhật và hiện nút lưu
    $("#capnhatSP").hide();
    $("#luuSP").show();

    // Reset lại trạng thái nút "Lưu"
    $("#luuSP").removeClass("clicked");

    // Gọi hàm khi nút lưu được click
    $("#luuSP").click(function () {
        // Nếu form không hợp lệ, ngăn việc submit
        if (!$("#fm").form('validate')) {
            $.messager.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin và kiểm tra các trường lỗi.');
            return false;
        }

        // Lấy dữ liệu từ form
        let sanPhamData = {
            MaSP: $('#maSanPham').val(),  // Lưu ý: Tên biến phải khớp với các tham số trong API Django
            ten: $('#ten').val(),
            loaisp: $('#loaisp').val(),
            giaban: parseFloat($('#gia_ban').numberspinner('getValue')),
            gianhap: parseFloat($('#gia_nhap').numberspinner('getValue')),
            chietkhau: $('#chietkhau').numberspinner('getValue') + '%',
            mota: $('#mt').val(),
            xFilePath: $('#xFilePath').val(),
            Mansx: $('#Mansx').combobox('getValue'),  // Mã nhà sản xuất
            manhom: $('#manhom').combobox('getValue'),  // Mã nhóm sản phẩm
            mdonvi: $('#Madvt').combobox('getValue')  // Mã đơn vị tính
        };

        // Kiểm tra nếu nút "Lưu" chưa được click trước đó
        if (!$(this).hasClass('clicked')) {
            $("#luuSP").addClass('clicked');  // Đánh dấu rằng nút đã được click để ngăn click lặp lại

            // Gửi yêu cầu AJAX tới API thêm sản phẩm
            $.ajax({
                type: "POST",
                url: "../sanpham/themSP/",  // Đường dẫn đến API trong Django
                data: JSON.stringify(sanPhamData),  // Chuyển dữ liệu sang JSON
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    $.messager.show({
                        title: 'Thông báo',
                        msg: 'Thêm sản phẩm thành công'
                    });
                    $('#dlg').dialog('close');  // Đóng form sau khi thêm thành công
                    $('#dg').datagrid('reload');  // Tải lại danh sách sản phẩm
                },
                error: function (xhr) {
                    // Xử lý lỗi từ server
                    let errors = xhr.responseJSON.errors || {};
                    $.each(errors, function (field, message) {
                        // Hiển thị lỗi cho từng trường cụ thể
                        let inputField = $('#' + field);
                        inputField.textbox('setValue', ''); // Xóa giá trị hiện tại
                        inputField.textbox('setValue', message); // Hiển thị lỗi cho trường tương ứng
                        inputField.textbox('highlight'); // Nổi bật trường có lỗi (nếu hỗ trợ)
                    });

                    // Hiển thị thông báo lỗi chung nếu có
                    if (xhr.responseJSON.error) {
                        $.messager.alert('Lỗi', xhr.responseJSON.error);
                    }
                },
                complete: function () {
                    $("#luuSP").removeClass('clicked');  // Xóa dấu hiệu đã click
                }
            });
        }
    });
}



function timsp() {
    $timKiemsp = $('#tim').val();
    $('#dg').datagrid('load',
        {
            timsp: $timKiemsp
        });
}
function xuatexcel_nhomsp() {
    $nhomsp = $('#nhomsp').combobox('getValue')
    $bien = [$nhomsp]
    xuatfile('', '', "xuatDanhSachSP", $bien)
}

function taiLai() {
    $('#dg').datagrid('load',
        {

        });
}

function importDuLieu() {
    $('#import').dialog('open').dialog('setTitle', 'importDuLieu');
    $(function () {

        $("#importDaTa").click(function () {
            $file = $("#file_excel").val();
            //alert($file);
            if ($file != "") {
                $("#form").submit();
            }
            else {
                $("#thongbaoimport").text("Vui Lòng Chọn File Cần import");
            }
        });

    });
}
$(function () {
    $('#dg').tooltip({
        position: 'bottom',
        content: '<span style="color:#fff">Dclick Để Xem Chi Tiết.</span>',
        onShow: function () {
            $(this).tooltip('tip').css({
                backgroundColor: '#666',
                borderColor: '#666'
            });
        }
    });
});


function themSP_nhom() {
    $('#dlg_nhom').dialog('open').dialog('setTitle', 'Thêm Nhóm Sản Phẩm');
    $("#fm_nhom").form("reset");
    $("#capnhatSP_nhom").hide();
    $("#luuSP_nhom").show();

    // Khi nhấn nút lưu, thêm nhóm sản phẩm mới
    $("#luuSP_nhom").click(function () {
        let data = {
            tenNhom: $('#ten_nhom').val(),
            moTa: $('#mt_nhom').val(),
            maTC: '1'  // Giá trị mặc định hoặc điều chỉnh theo logic
        };

        if (!$('#fm_nhom').form('validate')) {
            return false;
        }

        $.ajax({
            type: "POST",
            url: "../sanpham/themNhomSP/",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                alert(response.success);
                $('#dlg_nhom').dialog('close');
                $('#dg_nhom').datagrid('reload');
            },
            error: function (xhr) {
                alert("Lỗi: " + xhr.responseJSON.error);
            }
        });
    });
}

function suasp_nhom() {
    var row = $('#dg_nhom').datagrid('getSelected');
    if (row) {
        $('#dlg_nhom').dialog('open').dialog('setTitle', 'Chỉnh sửa nhóm sản phẩm');
        $('#fm_nhom').form('load', row);
        $("#luuSP_nhom").hide();
        $("#capnhatSP_nhom").show();

        // Khi nhấn nút cập nhật
        $("#capnhatSP_nhom").click(function () {
            var updatedData = {
                maNhom: row.manhom,
                tenNhom: $('#ten_nhom').val(),
                moTa: $('#mt_nhom').val(),
            };

            $.ajax({
                type: "POST",
                url: "../sanpham/capnhatNhomSP/",
                data: JSON.stringify(updatedData),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    alert(response.success);
                    $('#dlg_nhom').dialog('close');
                    $('#dg_nhom').datagrid('reload');
                },
                error: function (xhr) {
                    alert("Lỗi: " + xhr.responseJSON.error);
                }
            });
        });
    } else {
        alert("Vui lòng chọn nhóm sản phẩm cần chỉnh sửa.");
    }
}

function Xoasp_nhom() {
    var row = $('#dg_nhom').datagrid('getSelected');
    if (row) {
        $.ajax({
            type: "POST",
            url: "../sanpham/xoaNhomSP/",
            data: JSON.stringify({ maNhom: row.manhom }),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                alert(response.success);
                $('#dg_nhom').datagrid('reload');
            },
            error: function (xhr) {
                alert("Lỗi: " + xhr.responseJSON.error);
            }
        });
    } else {
        alert("Vui lòng chọn nhóm sản phẩm cần xóa.");
    }
}
