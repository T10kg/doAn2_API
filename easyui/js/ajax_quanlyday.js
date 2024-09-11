$(document).ready(function() {
    $("#menu_con_dm").hide();
    $("#thongtindn").removeClass("thongtindn");
    $(".blank ,#menu_dk_cha").hover(function() {
        $("#menu_con_dm").hide();
        $("#thongtindn").removeClass("thongtindn");
    }, function() {
        $("#menu_con_dm").hide();
        $("#thongtindn").removeClass("thongtindn");
    });
    $("#menu_cha_dm, #menu_con_dm").hover(function() {
        $("#dangkioktx_menu").hide();
        $("#menu_con_dm").show();
        $("#menu_con_dm").addClass("tomaumenucon");
        $("#thongtindn").addClass("thongtindn");
    }, function() {
        $("#dangkioktx_menu").hide();
        $("#menu_con_dm").hide();
        $("#menu_con_dm").addClass("tomaumenucon");
        $("#thongtindn").removeClass("thongtindn");
    });
    $("#menu_trangchu").hover(function() {}, function() {
        $("#menu_con_dm").hide();
        $("#thongtindn").removeClass("thongtindn");
    });
    $(".blank,menu_cha_dm").hover(function() {
        $("#dangkioktx_menu").hide();
        $("#thongtindn").removeClass("thongtindn");
    }, function() {
        $("#dangkioktx_menu").hide();
        $("#thongtindn").removeClass("thongtindn");
    });
    $("#menu_dk_cha, #dangkioktx_menu").hover(function() {
        $("#menu_con_dm").hide();
        $("#dangkioktx_menu").show();
        $("#dangkioktx_menu").addClass("tomaumenucon");
        $("#thongtindn").addClass("thongtindn");
    }, function() {
        $("#menu_con_dm").hide();
        $("#dangkioktx_menu").hide();
        $("#dangkioktx_menu").addClass("tomaumenucon");
        $("#thongtindn").removeClass("thongtindn");
    });
    $("#menu_trangchu").hover(function() {}, function() {
        $("#dangkioktx_menu").hide();
        $("#thongtindn").removeClass("thongtindn");
    });
});
function themDay() {
    $("#thongbao").text('');
    $('#dlg').dialog('open').dialog('setTitle', 'Thêm Khu');
    $maKhu = $('#maKhu').val();
    $('#maDay').val($maKhu + 'D');
    $('#maDay').focus();
    $('#tenDay').val('');
    $(function() {
        $("#capnhat").hide();
        $("#luu").show();
        $('#maKhu').change(function() {
            $maKhu = $('#maKhu').val();
            $('#maDay').val($maKhu + 'D');
        });
        $("#luu").click(function() {
            $maKhu = $('#maKhu').val();
            $maDay = $('#maDay').val();
            $tenDay = $('#tenDay').val();
            if (!$("#fm").form('validate')) {
                return false;
            }
            if (!$(this).hasClass('clicked')) {
                $go_to = $('body:last').offset().bottom;
                $('html, body').animate({
                    scrollTop: $go_to
                }, 800);
                $("#luu").addClass('clicked')
                $.post('themDay', {
                    maDay: $maDay,
                    maKhu: $maKhu,
                    tenDay: $tenDay
                }, function(data) {
                    if (data) {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: data
                        });
                        $("#luu").removeClass('clicked')
                    } else {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: 'Thêm Không Thanh Công Dãy' + $maDay + 'Xin Vui Lòng Kiểm Tra lại'
                        });
                    }
                });
            }
        });
    });
}
function capNhatDay() {
    $("#thongbao").text('');
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $('#dlg').dialog('open').dialog('setTitle', 'Cập Nhật Dãy');
        $('#fm').form('load', row);
        $("#luu").hide();
        $("#capnhat").show();
        $maDayCu = $('#maDay').val();
        $(function() {
            $("#capnhat").click(function() {
                $maKhu = $('#maKhu').val();
                $maDay = $('#maDay').val();
                $tenDay = $('#tenDay').val();
                if ($maDay == "") {
                    $('#maDay').focus();
                    return false;
                }
                if ($maKhu == "") {
                    $('#maKhu').focus();
                    return false;
                }
                if (!$(this).hasClass('clicked')) {
                    $go_to = $('body:last').offset().bottom;
                    $('html, body').animate({
                        scrollTop: $go_to
                    }, 800);
                    $("#capnhat").addClass('clicked')
                    $.post('chinhSuaDay', {
                        maDay: $maDay,
                        maKhu: $maKhu,
                        tenDay: $tenDay,
                        maDayCu: $maDayCu
                    }, function(data) {
                        if (data) {
                            $.messager.show({
                                title: 'Thông Báo',
                                msg: data
                            });
                            $("#capnhat").removeClass('clicked')
                        } else {
                            $.messager.show({
                                title: 'Thông Báo',
                                msg: 'Cập Nhật Không Thanh Công Dãy' + $maDay + 'Xin Vui Lòng Kiểm Tra lại'
                            });
                        }
                    });
                }
            });
        });
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn Dòng Cần Chỉnh Sửa'
        });
    }
}
function xoaDay() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $maDay = row.maDay;
        var m = confirm('Bạn có Muốn Xóa Dãy ' + $maDay + 'Không ?');
        if (m) {
            if (!$(this).hasClass('clicked')) {
                $go_to = $('body:last').offset().bottom;
                $('html, body').animate({
                    scrollTop: $go_to
                }, 800);
                $("#xoa").addClass('clicked');
                $.post('xoaDay', {
                    maDay: $maDay
                }, function(data) {
                    if (data) {
                        $("#xoa").removeClass('clicked')
                        $('#dg').datagrid('reload');
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: 'Xóa Thành Công Dãy' + $maDay
                        });
                    } else {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: 'Xóa Dãy Không Thanh Công Dãy' + $maDay + 'Xin Vui Lòng Kiểm Tra lại'
                        });
                    }
                });
            }
        }
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn Dòng Cần Xóa'
        });
    }
}
function timDay() {
    $timKiemDay = $('#tim').val();
    $('#dg').datagrid('load', {
        timKiemDay: $timKiemDay
    });
}
