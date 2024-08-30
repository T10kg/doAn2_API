function capnhattongthanhphieunhap(maphieunhap) {
    var bien = {
        mapn: maphieunhap
    }
    $.post("tongThanhTienPhieuNhap", {
        thamso: bien
    }, function(data) {
        if (data) {
            $("#qlnk-tongphieunhap-nbb").numberbox("setValue", data);
            $("#qlnk-tongtratruoc-nbb").numberbox("setValue", data)
        }
    })
}
function themSPQLNK() {
    var _mapn, _masp, _soluong, _chietkhau, _gia, _makho, _handung, _vitridatsanpham;
    var sanpham = $('#qlnk-dsspnhap-sanpham-cbgrid').combogrid('grid').datagrid('getSelected');
    _soluong = $('#qlnk-dsspnhap-soluong-number').numberspinner('getValue');
    _chietkhau = $('#qlnk-dsspnhap-chietkhau-number').numberspinner('getValue');
    _handung = $('#qlnk-dsspnhap-handung-datebox').datebox('getValue');
    _vitridatsanpham = $('#qlnk-dsspnhap-vitridat-txtb').textbox('getValue');
    _solo = $('#qlnk-solo').textbox('getValue');
    _soqr = $('#qlnk-qr').textbox('getValue');
    _masp = sanpham.Masanpham;
    _makho = sanpham.makho;
    _gia = sanpham.gia_nhap;
    _mapn = $("#mapn").val();
    if (_handung == "") {
        thongbao("Hạn dùng không được để trống");
        return !1
    }
    if (_solo == "" && _makho != "15" && _makho != "10") {
        thongbao("Số lô không được để trống");
        return !1
    }
    var arr = {
        tenmaphieu: _mapn,
        tenthaotac: 'Thêm sp pn',
        loai: 'PN',
        mapn: _mapn,
        masp: _masp,
        soluong: _soluong,
        chietkhau: _chietkhau,
        gia: _gia,
        makho: _makho,
        handung: _handung,
        vitridatsanpham: _vitridatsanpham,
        solo: _solo,
        soqr: _soqr
    };
    var bien = {
        mapn: _mapn
    };
    var array = {
        num1: "qlnk-tongphieunhap-nbb",
        num2: "qlnk-tongtratruoc-nbb"
    };
    sendajax("./themSanPhamPhieuNhapNV", arr, "qlnk-dsspnhap-dg");
    $('#qlnk-dsspnhap-dg').datagrid({
        onLoadSuccess: function() {
            sendandsetval("./tongThanhTienPhieuNhap", bien, array);
            var g = $('#qlnk-dsspnhap-sanpham-cbgrid').combogrid('grid');
            g.datagrid('load', {
                makho: _makho
            })
        }
    })
}
function themSPNK() {
    var row = $("#qlnk-dg").datagrid("getSelected");
    if (row) {
        var _mapn, _masp, _soluong, _chietkhau, _gia, _makho, _handung, _vitridatsanpham;
        var sanpham = $('#qlnk-dsspnhap-sanpham-cbgrid').combogrid('grid').datagrid('getSelected');
        _soluong = $('#qlnk-dsspnhap-soluong-number').numberspinner('getValue');
        _chietkhau = $('#qlnk-dsspnhap-chietkhau-number').numberspinner('getValue');
        _handung = $('#qlnk-dsspnhap-handung-datebox').datebox('getValue');
        _vitridatsanpham = $('#qlnk-dsspnhap-vitridat-txtb').textbox('getValue');
        _solo = $('#qlnk-solo').textbox('getValue');
        _soqr = $('#qlnk-qr').textbox('getValue');
        _masp = sanpham.Masanpham;
        _makho = sanpham.makho;
        _gia = sanpham.gia_nhap;
        _mapn = row.maPN;
        if (_solo == "") {
            thongbao("Số lô không được để trống");
            return !1
        }
        if (_handung == "") {
            thongbao("Hạn dùng không được để trống");
            return !1
        }
        var arr = {
            tenmaphieu: row.maphieunhap,
            tenthaotac: 'Thêm sp pn',
            loai: 'PN',
            mapn: _mapn,
            masp: _masp,
            soluong: _soluong,
            chietkhau: _chietkhau,
            gia: _gia,
            makho: _makho,
            handung: _handung,
            vitridatsanpham: _vitridatsanpham,
            solo: _solo,
            soqr: _soqr
        };
        var bien = {
            mapn: _mapn
        };
        var array = {
            num1: "qlnk-tongphieunhap-nbb",
            num2: "qlnk-tongtratruoc-nbb"
        };
        sendajax("./themSanPhamPhieuNhapNV", arr, "qlnk-dsspnhap-dg");
        $('#qlnk-dsspnhap-dg').datagrid({
            onLoadSuccess: function() {
                sendandsetval("./tongThanhTienPhieuNhap", bien, array);
                var g = $('#qlnk-dsspnhap-sanpham-cbgrid').combogrid('grid');
                g.datagrid('load', {
                    makho: _makho
                })
            }
        })
    } else {
        thongbao("Vui lòng chọn phiếu nhập")
    }
}
function xoaSPQLNK() {
    var row = $('#qlnk-dsspnhap-dg').datagrid('getSelected');
    var row_nk = $("#qlnk-dg").datagrid("getSelected");
    if (row) {
        if (row_nk) {
            $tenphieu = row_nk.maphieunhap
        } else {
            $tenphieu = row.maPN
        }
        var _id = row.id_xuatkho_sp;
        var _mapn = row.maPN;
        var _makho = row.makho;
        var bien = {
            mapn: _mapn
        };
        var array = {
            num1: "qlnk-tongphieunhap-nbb",
            num2: "qlnk-tongtratruoc-nbb"
        };
        sendajax("xoaSanPhamPhieuNhapNV", {
            id: _id,
            map: _mapn,
            tenmaphieu: $tenphieu,
            tenthaotac: 'Xóa sản phẩm pn',
            loai: 'PN'
        }, "qlnk-dsspnhap-dg");
        $("#qlnk-dsspnhap-dg").datagrid("reload");
        $('#qlnk-dsspnhap-dg').datagrid({
            onLoadSuccess: function() {
                sendandsetval("./tongThanhTienPhieuNhap", bien, array);
                var g = $('#qlnk-dsspnhap-sanpham-cbgrid').combogrid('grid');
                g.datagrid('load', {
                    makho: _makho
                })
            }
        })
    } else {
        thongbao("Vui lòng chọn sản phẩm cần xóa")
    }
}
function capNhatNhapKho() {
    $mapn = $("#mapn").val();
    $mancc = $("#qlnk-phieunhap-nguoncap-cbb").combogrid("getValue");
    $ngaythanh = $("#qlnk-ngaythanhtieptheo-datebox").datebox("getValue");
    $tongphieu = $("#qlnk-tongphieunhap-nbb").numberbox("getValue");
    $tongthanh = $("#qlnk-tongtratruoc-nbb").numberbox("getValue");
    $hinhthucthanh = $("#qlnk-hinhthucthanh-cbb").combobox("getValue");
    $sotaikhoan = $("#qlnk-stk-txtb").textbox("getValue");
    $ghichu = $("#qlnk-ghichu-txtb").textbox("getValue");
    if ($mancc == "") {
        thongbao("Vui lòng chọn nhà cung cấp")
        return !1
    }
    if (!$("#capnhatnhapkho").hasClass('clicked')) {
        $("#capnhatnhapkho").addClass('clicked');
        var bien = {
            tinhtrang: 'add',
            mapn: $mapn,
            tongphieu: $tongphieu,
            mancc: $mancc,
            tongthanh: $tongthanh,
            hantra: $ngaythanh,
            hinhthucthanh: $hinhthucthanh,
            sotaikhoan: $sotaikhoan,
            ghichu: $ghichu
        };
        sendajax("capNhatPhieuNhap", bien);
        setTimeout(function() {
            location.reload()
        }, 1000)
    }
}
function capnhatnhapkho() {
    $mapn = $("#mapn").val();
    $("#qlnk-dsspnhap-dg").datagrid({
        url: '../nhapkhos/taidulieunhapkho?nhapkho&maPN=' + $mapn
    })
    $("#qlnk-dg").datagrid("clearSelections")
    $('#qlnk-phieunhap-dlg').dialog('open');
    $('#capnhatthongtinnhapKho,#themspnk').hide()
    $('#capnhatnhapkho,#themspqlnk').show()
}
function capnhatthongtinkho() {
    var row = $("#qlnk-dg").datagrid("getSelected");
    $("#capnhatthongtinnhapKho,#themspnk").show()
    $("#capnhatnhapkho,#themspqlnk").hide()
    if (row) {
        $mapn = row.maPN;
        if (parseInt(row.tongtratruoc) > parseInt(row.tratruoc)) {
            thongbao("Phiếu đã thanh công nợ không được cập nhật")
            return !1
        }
        $("#qlnk-ghichu-txtb").textbox("setValue", row.ghichuPN);
        $('#qlnk-ngaythanhtieptheo-datebox').datebox('setValue', row.ngaytratieptheo);
        $("#qlnk-frm_phieunhap").form("load", row)
        $("#qlnk-dsspnhap-dg").datagrid({
            url: '../nhapkhos/taidulieunhapkho?nhapkho&maPN=' + $mapn
        })
        $('#qlnk-phieunhap-dlg').dialog('open')
        $("#capnhatthongtinnhapKho").click(function() {
            $mancc = $("#qlnk-phieunhap-nguoncap-cbb").combogrid("getValue");
            $ngaythanh = $("#qlnk-ngaythanhtieptheo-datebox").datebox("getValue");
            $tongphieu = $("#qlnk-tongphieunhap-nbb").numberbox("getValue");
            $tongthanh = $("#qlnk-tongtratruoc-nbb").numberbox("getValue");
            $hinhthucthanh = $("#qlnk-hinhthucthanh-cbb").combobox("getValue");
            $sotaikhoan = $("#qlnk-stk-txtb").textbox("getValue");
            $ghichu = $("#qlnk-ghichu-txtb").textbox("getValue");
            if ($mancc == "") {
                thongbao("Vui lòng chọn nhà cung cấp")
                return !1
            }
            var bien = {
                tinhtrang: 'update',
                mapn: $mapn,
                tongphieu: $tongphieu,
                mancc: $mancc,
                tongthanh: $tongthanh,
                hantra: $ngaythanh,
                hinhthucthanh: $hinhthucthanh,
                sotaikhoan: $sotaikhoan,
                ghichu: $ghichu
            };
            sendajax("capNhatPhieuNhap", bien);
            setTimeout(function() {
                location.reload()
            }, 2000)
        })
    } else {
        thongbao("Vui lòng chọn phiếu nhập kho cần chỉnh sửa")
    }
}
$(document).ready(function() {
    var mapn = $("#mapn").val()
    tailaitatcacactabphieu(mapn, "mapn")
    $('#qlnk-dg').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px;position:relative;" ><table pagination="true" class="ddvphieunhap' + index + ' "></table></div>'
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddvphieunhap' + index);
            var idpn = row.maPN;
            ddv.datagrid({
                url: '../nhapkhos/taidulieunhapkho?nhapkho&maPN=' + idpn,
                fitColumns: !0,
                singleSelect: !0,
                rownumbers: !0,
                loadMsg: '',
                height: 'auto',
                columns: [[{
                    field: 'masanpham',
                    title: 'MaSP',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'tensp',
                    title: 'Tên SP',
                    width: 250
                }, {
                    field: 'dongia',
                    title: 'Đơn giá',
                    width: 100,
                    formatter: formatCurrency,
                    align: 'right'
                }, {
                    field: 'soLX',
                    title: 'Số lượng',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'chietkhauPN',
                    title: 'Chiết Khấu (%)',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'thanhtien',
                    title: 'Thành Tiền',
                    width: 100,
                    formatter: formatCurrency,
                    align: 'right'
                }, {
                    field: 'solo',
                    title: 'Số lô',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'ngayhethangsudung',
                    title: 'Hạn dùng',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'vitridatsanpham',
                    title: 'Vị trí đặt',
                    width: 100
                }, {
                    field: 'tenkho',
                    title: 'Tên Kho',
                    width: 100
                }]],
                onResize: function() {
                    $('#qlnk-dg').datagrid('fixDetailRowHeight', index)
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#qlnk-dg').datagrid('fixDetailRowHeight', index)
                    }, 0)
                }
            });
            $('#qlnk-dg').datagrid('fixDetailRowHeight', index);
            index1 = index
        }
    });
    $('#qlnk-chuyenkho-dsspnhap-dg').datagrid({
        onSelect: function(index, row) {
            var row = $('#qlnk-chuyenkho-dsspnhap-dg').datagrid('getSelected');
            $('#qlnk-chuyenkho-tukho-cbb').combobox('select', row.tenkho)
        }
    })
    $('#qlnk-hinhthucthanh-cbb').combobox({
        onChange: function(newval, oldval) {
            if (newval == 'Chuyển Khoản') {
                $('#qlnk-stk-txtb').textbox('enable')
            } else {
                $('#qlnk-stk-txtb').textbox('disable')
            }
        }
    })
});
function xuatphieunhapkhopdf() {
    var row = $('#qlnk-dg').datagrid('getSelected');
    if (row) {
        $maPN = row.maPN;
        $h = 'xuat_phieunhapkhoPDF?mapn=' + $maPN;
        window.open($h, '_blank')
    } else {
        thongbao("Chọn phiếu nhập cần xuất file")
    }
}
function xuatphieunhapkhoexcel() {
    var row = $('#qlnk-dg').datagrid('getSelected');
    if (row) {
        $maPN = row.maPN;
        $h = 'xuat_phieunhapkhoexcel?mapn=' + $maPN;
        window.open($h, '_blank')
    } else {
        thongbao("Chọn phiếu nhập cần xuất file")
    }
}
function xuatdanhsachctphieunhaptheotimkiem() {
    $makho = $('#chitiettheokho').combobox('getValue');
    $mancc = $('#chitiettheoncc').combobox('getValue')
    $masp = $('#maspctnk').combobox('getValue')
    $manhom = $('#nhomsp').combobox('getValue')
    $bien = [$makho, $mancc, $masp, $manhom]
    xuatfile('db-CTPN-from', 'db-CTPN-to', "xuatchitietnhapkhotheoketquatimkiem", $bien)
}
function xuatdanhsachctphieunhaptheotimkiemxinghiep() {
    $makho = $('#chitiettheokho').combobox('getValue');
    $mancc = $('#chitiettheoncc').combobox('getValue')
    $masp = $('#maspctnk').combobox('getValue')
    $manhom = $('#nhomsp').combobox('getValue')
    $bien = [$makho, $mancc, $masp, $manhom]
    xuatfile('db-CTPN-from', 'db-CTPN-to', "xuatchitietnhapkhotheoketquatimkiemxinghiep", $bien)
}
function huyphieunhap() {
    var row = $("#qlnk-dg").datagrid("getSelected")
    if (row) {
        if (parseInt(row.tongtratruoc) > parseInt(row.tratruoc)) {
            thongbao("Phiếu đã thanh công nợ không được xóa")
            return !1
        }
        $.messager.prompt({
            title: 'Prompt',
            msg: 'Lý do xóa phiếu:',
            fn: function(r) {
                if (r) {
                    var bien = {
                        mapn: row.maPN,
                        lydo: r,
                        tenmaphieu: row.maphieunhap,
                        tenthaotac: 'Xóa phiếu nhập',
                        loai: 'PN'
                    }
                    xoadulieuajax("xoaPhieuNhap", bien, "qlnk-dg", "Việc xóa phiếu sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                } else {
                    var bien = {
                        mapn: row.maPN,
                        lydo: "",
                        tenmaphieu: row.maphieunhap,
                        tenthaotac: 'Xóa phiếu nhập',
                        loai: 'PN'
                    }
                    xoadulieuajax("xoaPhieuNhap", bien, "qlnk-dg", "Việc xóa phiếu sẻ ảnh hưởng đến tồn kho, bạn có muốn thực hiện thao tác này không")
                }
            }
        })
    } else {
        thongbao("Vui lòng chọn phiếu cần xóa")
    }
}
function chuyensanphamsangphieuxuat() {
    var b = $("#qlnk-dg").datagrid("getSelected");
    b ? ($mapx = $("#mapx").val(),
    $.messager.prompt({
        title: "Prompt",
        msg: "Nh\u1eadp th\u00f4ng tin chi\u1ebft kh\u1ea5u c\u1ea7n \u0111\u1ed5i:",
        fn: function(a) {
            if (a) {
                $chietkhau = parseInt(a);
                if (100 < $chietkhau || 0 > $chietkhau)
                    return thongbao("0 =< Chi\u1ebft kh\u1ea5u <= 100"),
                    !1;
                a = {
                    maphieunhap: b.maPN,
                    maphieuxuat: $mapx,
                    chietkhau: $chietkhau
                }
            } else
                a = {
                    maphieunhap: b.maPN,
                    maphieuxuat: $mapx,
                    chietkhau: ""
                };
            xoadulieuajax("chuyensanphamnhapkhosanxuatkho", a, "qlnk-dg", "B\u1ea1n c\u00f3 mu\u1ed1n chuy\u1ec3n th\u00f4ng tin s\u1ea3n ph\u1ea9m sang phi\u1ebfu xu\u1ea5t kh\u00f4ng?")
        }
    })) : thongbao("Ch\u1ecdn phi\u1ebfu nh\u1eadp c\u1ea7n chuy\u1ec3n")
}
;function dongbotongtoankho() {
    var a = $("#qlnk-dg").datagrid("getSelected");
    a ? ($idnhapkho = a.maPN,
    xoadulieuajax("dongbosoluongtonsangtongton", {
        idnhapkho: $idnhapkho
    }, "qlnk-dg", "B\u1ea1n c\u00f3 mu\u1ed1n th\u1ef1c hi\u1ec7n thao t\u00e1c n\u00e0y kh\u00f4ng?")) : thongbao("Ch\u1ecdn phi\u1ebfu nh\u1eadp kho c\u1ea7n \u0111\u1ed3ng b\u1ed9")
}
;function capnhatthongtinsanphamnhapkho() {
    var a = $("#qlnk-dsspnhap-dg").datagrid("getSelected");
    a ? ($soluong = $("#soluong_capnhatsp").numberbox("getValue"),
    $soluong = parseInt($soluong),
    $chietkhau = $("#chietkhau_capnhatsp").numberbox("getValue"),
    $idnhapkho = a.id_xuatkho_sp,
    $masp = a.maSP,
    $solo = $("#solo").numberbox("getValue"),
    $handung = $("#handungcapnhat").datebox("getValue"),
    0 < $soluong && 0 == isNaN($soluong) && "" != $chietkhau ? ($bien = {
        id: $idnhapkho,
        masp: $masp,
        gia: a.dongia,
        soluong: $soluong,
        chietkhau: $chietkhau,
        solo: $solo,
        handung: $handung
    },
    sendajax("capnhatsanphamnhapkho", $bien, "qlnk-dsspnhap-dg"),
    $("#qlnk-dsspnhap-dg").datagrid({
        onLoadSuccess: function() {
            sendandsetval("./tongThanhTienPhieuNhap", {
                mapn: a.maPN
            }, {
                num1: "qlnk-tongphieunhap-nbb",
                num2: "qlnk-tongtratruoc-nbb"
            })
        }
    }),
    $("#capnhatsp-dlg").dialog("close")) : thongbao("S\u1ed1 l\u01b0\u1ee3ng >0, chi\u1ebft kh\u1ea5u kh\u00f4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 r\u1ed7ng")) : thongbao("Vui l\u00f2ng ch\u1ecdn s\u1ea3n ph\u1ea9m c\u1ea7n c\u1eadp nh\u1eadt")
}
;