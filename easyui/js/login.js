function thayDoiMatKhauNV1() {
    $m = Math.floor((Math.random() * 1000000) + 1);
    $("#tam").text($m);
    $m = $("#tam").text();
    $(function() {
        $("#thongbaothaydoimatkhau").text('');
        $('#dlg_doiMatKhauNV').dialog('open').dialog('setTitle', 'Thay Đổi Mật Khẩu');
        $('#fm1').form('clear');
        $("#doiMatKhau").click(function() {
            $macode = $("#macode").val();
            $matKhauCu = $('#matKhauCu').val();
            $matKhauMoi = $('#matKhauMoi').val();
            $nhapLai = $('#nhapLai').val();
            if (!$("#fm1").form('validate')) {
                return false;
            }
            if ($m != $macode) {
                alert("Mã Code Bạn Không Đúng Vui Lòng Nhập Lại");
                $("#macode").focus();
                return false;
            }
            if ($matKhauMoi != $nhapLai) {
                alert("Nhập Lại Mật Khẩu Không Khớp Với Mật Khẩu Vừa Tạo");
                return false;
            }
            if (!$(this).hasClass('clicked')) {
                $("#tam").text('');
                $("#doiMatKhau").addClass('clicked')
                $.post('../nhanviens/doiMatKhauNV', {
                    matKhauCu: $matKhauCu,
                    matKhauMoi: $matKhauMoi
                }, function(data) {
                    if (data) {
                        $("#thongbaothaydoimatkhau").html(data);
                        $("#doiMatKhau").removeClass('clicked')
                    } else {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: 'Có Lỗi Xảy Ra Xin Vui Lòng Kiểm Tra Lại'
                        });
                    }
                });
            }
        });
    });
}
function checkpass() {
    var user = document.getElementById('user');
    var pass = document.getElementById('pass');
    var k = user.value;
    var k1 = pass.value;
    var kytu = "'";
    var kytu1 = "-";
    var kq1 = k.search(kytu);
    var kq2 = k.search(kytu1);
    var kq3 = k1.search(kytu);
    var kq4 = k1.search(kytu1);
    if (k == "") {
        alert("Nhập Mã Tài Khoản");
        user.focus();
        return false;
    }
    if (k1 == "") {
        alert("Nhập Password");
        pass.focus();
        return false;
    }
    if (kq1 == '-1' && kq2 == '-1' && kq3 == '-1' && kq4 == '-1' && k != "" && k1 != "") {
        return true;
    } else {
        alert("Tài Khoản Hoặc Mật Khẩu Không Đúng");
        user.focus();
        return false;
    }
}
