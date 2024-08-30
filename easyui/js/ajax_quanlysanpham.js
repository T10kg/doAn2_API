function Xoasp() {
    var row = $("#dg").datagrid("getSelected")
    if (row) {
        $masp = row.Masanpham;
        var bien = {
            MASP: $masp
        }
        xoadulieuajax("xoaSanpham", bien, "dg", "Bạn có muốn xóa sản phẩm không?");
    } else {
        thongbao("Vui lòng chọn sản phẩm cần xóa")
    }
}
function suasp() {
    var row = $('#dg').datagrid('getSelected');
    if (row) {
        $('#dlg').dialog('open').dialog('setTitle', 'Cập nhật thông tin sản phẩm');
        $('#fm').form('load', row);
        $("#luuSP").hide();
        $("#capnhatSP").show();
        $('#maSanPham').textbox('setValue', row.MaSP);
        $masptxt_cu = $('#maSanPham').textbox('getValue');
        $ma = row.Masanpham;
        $ten = row.tensp;
        $tensp = $('#ten').textbox('setValue', $ten);
        $loaisp = $("#loaisp").combobox('setValue', row.loaisp);
        $gia_ban = row.gia_ban;
        $giaban = $('#gia_ban').numberspinner('setValue', $gia_ban);
        $gia_nhap = row.gia_nhap;
        $gianhap = $('#gia_nhap').numberspinner('setValue', $gia_nhap);
        $chietkhau = row.chietkhau;
        $ck = $('#chietkhau').numberspinner('setValue', $chietkhau);
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
        $("#capnhatSP").click(function() {
            $("#fm").form('enableValidation').form('validate');
            if (!$("#fm").form('validate')) {
                return false;
            }
            $t = $('#ten').textbox('getValue');
            $giaban = $('#gia_ban').numberspinner('getValue');
            $gianhap = $('#gia_nhap').numberspinner('getValue');
            $c = $('#chietkhau').numberspinner('getValue');
            $x = $('#xx').val();
            $m = $('#mt').val();
            $n = $('#mansx').combobox('getValue');
            $mnhom = $('#manhom').combobox('getValue');
            $mdonvi = $('#Madvt').combobox('getValue');
            $masptxt = $('#maSanPham').textbox('getValue');
            $u = $('#xFilePath').val();
            $giaban = parseFloat($giaban);
            if ($giaban == 'null') {
                thongbao("Vui lòng nhập giá bán cho sản phẩm");
                return false;
            }
            $gianhap = parseFloat($gianhap);
            if ($gianhap == 'null') {
                thongbao("Vui lòng nhập giá cho sản phẩm");
                return false;
            }
            $loaisp = $("#loaisp").combobox('getValue')
            if (!$("#fm").form('validate')) {
                return false;
            }
            if ($t == "") {
                $('#ten').focus();
                thongbao("Nhập tên sản phẩm")
                return false;
            }
            if (!$(this).hasClass('clicked')) {
                $("#capnhatSP").addClass('clicked')
                var bien = {
                    ma: $ma,
                    ten: $t,
                    loaisp: $loaisp,
                    masp: $masptxt,
                    masp_cu: $masptxt_cu,
                    giaban: $giaban,
                    gianhap: $gianhap,
                    c: $c,
                    x: $x,
                    m: $m,
                    n: $n,
                    mnhom: $mnhom,
                    mdonvi: $mdonvi,
                    u: $u
                }
                sendajax("suasp", bien, "dg");
                $("#capnhatSP").removeClass('clicked')
                $('#dlg').dialog("close");
            }
        });
    } else {
        thongbao("Chọn Dòng Cần Chỉnh Sửa")
    }
}
function themSP() {
    $('#dlg').dialog('open').dialog('setTitle', 'Thêm Sản Phẩm');
    $('#ten').textbox('setValue', '');
    $('#maSanPham').textbox('setValue', '');
    $('#mansx').combobox('setValue', '');
    $('#manhom').combobox('setValue', '');
    $('#Madvt').combobox('setValue', '');
    $("#loaisp").combobox('setValue', '')
    $('#xx').textbox('setValue', '');
    $('#gia_ban').numberspinner('setValue', '');
    $('#gia_nhap').numberspinner('setValue', '');
    $('#chietkhau').numberspinner('setValue', '0');
    $('#mt').val('');
    $('#xFilePath').val('');
    $("#capnhatSP").hide();
    $("#luuSP").show();
    $("#luuSP").click(function() {
        $("#fm").form('enableValidation').form('validate');
        if (!$("#fm").form('validate')) {
            return false;
        }
        $t = $('#ten').textbox('getValue');
        $giaban = $('#gia_ban').numberspinner('getValue');
        $gianhap = $('#gia_nhap').numberspinner('getValue');
        $c = $('#chietkhau').numberspinner('getValue');
        $giaban = parseFloat($giaban);
        if ($giaban == 'null') {
            thongbao("Vui lòng nhập giá bán cho sản phẩm");
            return false;
        }
        $gianhap = parseFloat($gianhap);
        if ($gianhap == 'null') {
            thongbao("Vui lòng nhập giá cho sản phẩm");
            return false;
        }
        $x = $('#xx').textbox('getValue');
        $m = $('#mt').val();
        $n = $('#mansx').combobox('getValue');
        $mnhom = $('#manhom').combobox('getValue');
        $mdonvi = $('#Madvt').combobox('getValue');
        $loaisp = $("#loaisp").combobox('getValue')
        $u = $('#xFilePath').val();
        $MaSP = $('#maSanPham').textbox('getValue');
        if ($t == "") {
            $('#ten').focus();
            thongbao("Vui lòng nhập tên sản phẩm")
            return false;
        }
        if ($MaSP == "") {
            thongbao("Nhập mã sản phẩm")
            return false;
        }
        if (!$("#fm").form('validate')) {
            return false;
        }
        if (!$(this).hasClass('clicked')) {
            $("#luuSP").addClass('clicked')
            var bien = {
                ten: $t,
                loaisp: $loaisp,
                giaban: $giaban,
                gianhap: $gianhap,
                c: $c,
                x: $x,
                m: $m,
                n: $n,
                mnhom: $mnhom,
                mdonvi: $mdonvi,
                u: $u,
                MaSP: $MaSP
            }
            sendajax("themSP", bien, "dg");
            $("#luuSP").removeClass('clicked')
            $('#dlg').dialog('close')
        }
    });
}
function timsp() {
    $timKiemsp = $('#tim').val();
    $('#dg').datagrid('load', {
        timsp: $timKiemsp
    });
}
function xuatexcel_nhomsp() {
    $nhomsp = $('#nhomsp').combobox('getValue')
    $bien = [$nhomsp]
    xuatfile('', '', "xuatDanhSachSP", $bien)
}
function taiLai() {
    $('#dg').datagrid('load', {});
}
function importDuLieu() {
    $('#import').dialog('open').dialog('setTitle', 'importDuLieu');
    $("#importDaTa").click(function() {
        $file = $("#file_excel").val();
        if ($file != "") {
            $("#form").submit();
        } else {
            $("#thongbaoimport").text("Vui Lòng Chọn File Cần import");
        }
    });
}
function BrowseServer() {
    var finder = new CKFinder();
    finder.basePath = '../ckeditor/';
    finder.selectActionFunction = SetFileField;
    finder.popup();
}
function SetFileField(fileUrl) {
    document.getElementById('xFilePath').value = fileUrl;
    $("#Url1").attr("src", fileUrl);
}
