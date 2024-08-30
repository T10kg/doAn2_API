function timCongNoSale() {
    $timkiemcongno = $('#cnkhsale-search-box').textbox("getValue");
    $('#cnkhsale-main-dg').datagrid('load', {
        timkiemcongno: $timkiemcongno
    })
}
function newCustomer() {
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
    $('#cnkhsale-newcustomer-dlg').dialog('open').dialog('setTitle', 'Thêm Khách Mới')
}
function xemchitietpx() {
    var row = $('#cnkhsale-main-dg').datagrid('getSelected');
    if (row) {
        $mapx = row.id;
        $("#tenkh").html(row.Ten)
        $("#sodt").html(row.Dienthoai)
        $("#diachikh").html(row.Dc)
        $("#tongthanh").html(formatCurrency(row.tongphieuX))
        $("#tongtra").html(formatCurrency(row.tongtratruoc))
        $("#noconlai").html(formatCurrency(row.noconlai))
        $("#ghichu_").html(row.ghichu)
        alert(row.ghichu)
        $('#chitietsanphamphieuxuat').datagrid({
            url: '../sanphams/combogrid_sp?mapx=' + $mapx
        });
        $("#chitietphieuxuat").dialog('open').dialog('setTitle', 'Chi tiết phiếu xuất')
    } else {
        thongbao("Vui lòng chọn phiếu xuất cần xem chi tiết")
    }
}
function xemchitietpdt() {
    var row = $('#ghinokh-main-dg').datagrid('getSelected');
    if (row) {
        $mapdt = row.mapdt;
        $("#tenkh").html(row.Ten)
        $("#sodt").html(row.Dienthoai)
        $("#diachikh").html('')
        $("#tongthanh").html(formatCurrency(row.tongghino))
        $("#tongtra").html(formatCurrency(row.tongthanhghino))
        $("#noconlai").html(formatCurrency(row.noconlai))
        $('#chitietsanphamphieuxuat').datagrid({
            url: '../sanphams/combogrid_sp?mapdt=' + $mapdt
        });
        $("#chitietphieuxuat").dialog('open').dialog('setTitle', 'Chi tiết phiếu xuất')
    } else {
        thongbao("Vui lòng chọn phiếu xuất cần xem chi tiết")
    }
}
function thanhToanCN() {
    var record = $('#cnkhsale-main-dg').datagrid('getSelected');
    $mapx = record.id;
    $sotien = $('#txtb-tienthanh').val();
    $hinhthucthanh = $('#cbb-hinhthuctt').combobox('getValue');
    $sotk = $('#txtb-sotk').combobox('getValue');
    $ghichu = $("#ghichu").textbox("getValue");
    $doanhso = $("#doanhso").is(':checked');
    $manvkinh = record.manvkd;
    if (!$('#cnkhsale-tcn-fm').form('validate')) {
        return !1
    }
    if ($hinhthucthanh == 'Chuyển Khoản' && $sotk == '') {
        thongbao('Vui lòng nhập số tài khoản')
        return !1
    }
    if (!$(this).hasClass('clicked')) {
        if (!$(this).hasClass('clicked')) {
            var sArray = {
                mapx: $mapx,
                sotien: $sotien,
                hinhthucthanh: $hinhthucthanh,
                sotk: $sotk,
                doanhso: $doanhso,
                manvkd: $manvkinh,
                ghichu: $ghichu
            };
            sendajax("./taophieuthu", sArray, "cnkhsale-main-dg");
            $('#txtb-sotk').combobox('clear');
            $('#txtb-sotk').combobox('reload')
        }
    }
    $('#cnkhsale-tcn-dlg').dialog('close')
}
function XoaCN() {
    var record = $('.ddvcnkhsale' + index1).datagrid('getSelected');
    if (record) {
        var $id = record.idCN;
        if (!$(this).hasClass('clicked')) {
            if (!$(this).hasClass('clicked')) {
                var bien = {
                    id: $id
                };
                xoadulieuajax("xoacongnokh", bien, "cnkhsale-main-dg", "Bạn có muốn xóa công nợ này không")
            }
        }
    }
}
function XoaCNCT() {
    var record = $("#chitietcongnokh_dg").datagrid('getSelected');
    if (record) {
        var $id = record.idCN;
        if (!$(this).hasClass('clicked')) {
            if (!$(this).hasClass('clicked')) {
                $.messager.prompt({
                    title: 'Prompt',
                    msg: 'Lý do xóa phiếu:',
                    fn: function(r) {
                        if (r) {
                            var bien = {
                                id: $id,
                                lydo: r
                            }
                            xoadulieuajax("xoacongnokh", bien, "chitietcongnokh_dg", "Bạn có muốn xóa công nợ này không")
                        } else {
                            var bien = {
                                id: $id,
                                lydo: ""
                            }
                            xoadulieuajax("xoacongnokh", bien, "chitietcongnokh_dg", "Bạn có muốn xóa công nợ này không")
                        }
                    }
                })
            }
        }
    } else {
        thongbao("Vui lòng chọn phiếu công nợ cần xóa")
    }
}
function xoaghinokh() {
    var record = $('.ddvghicongno' + indexghino).datagrid('getSelected');
    if (record) {
        var $id = record.idtgn;
        $.messager.prompt({
            title: 'Prompt',
            msg: 'Lý do xóa phiếu:',
            fn: function(r) {
                if (r) {
                    var bien = {
                        id: $id,
                        lydo: r,
                        sotien: record.sotienthanh,
                        manvthu: record.manv
                    }
                    xoadulieuajax("xoaghinokh", bien, "ghinokh-main-dg", "Bạn có muốn xóa ghi nợ này không")
                } else {
                    var bien = {
                        id: $id,
                        lydo: ""
                    }
                    xoadulieuajax("xoaghinokh", bien, "ghinokh-main-dg", "Bạn có muốn xóa ghi nợ này không")
                }
            }
        })
    } else {
        thongbao("Vui lòng chọn ghi nợ cần xóa")
    }
}
function nhacNo() {
    $("#check_nhacongnokh").attr("checked", "checked");
    $("#cnkhsale-main-dg").datagrid('load', {
        nhacongno: '1'
    })
    $("#cnkh-dg").datagrid('load', {
        nhacongno: '1'
    })
}
function nhacSN() {
    $('#cnkhsale-nnsn-dlg').dialog('open').dialog('setTitle', 'Nhắc Sinh Nhật KH')
}
function thanhghinokh() {
    var row = $("#ghinokh-main-dg").datagrid("getSelected")
    if (row) {
        $("#thanhghino-tcn-dlg").dialog("open").dialog("setTitle", "Thanh ghi nợ khách hàng")
        $('#txtb-noconlai').numberbox('setValue', row.noconlai);
        $('#txtb-tienthanh').numberbox('setValue', row.noconlai);
        $mapgn = row.idpgn;
        $('#thanhghino').removeClass('clicked')
        $("#thanhghino").click(function() {
            if ($(this).hasClass('clicked')) {
                return !1
            }
            $('#thanhghino').addClass('clicked')
            $noconlai = $('#txtb-noconlai').numberbox('getValue');
            $sotien = $('#txtb-tienthanh').numberbox('getValue');
            $ghichu = $("#ghichu").textbox("getValue");
            if (parseInt($noconlai) < parseInt($sotien) || parseInt($sotien) == 0 || $sotien == "") {
                thongbao("Số tiền thanh không được lớn hơn tổng nợ")
            } else {
                var bien = {
                    mapgn: $mapgn,
                    sotien: $sotien,
                    ghichu: $ghichu
                }
                sendajax('taophieuthu', bien, 'ghinokh-main-dg')
                $("#thanhghino-tcn-dlg").dialog("close")
            }
        })
    } else {
        thongbao("vui lòng chọn phiếu ghi nợ cần thanh")
    }
}
function thanhCN() {
    var checkedRow = $('#cnkhsale-main-dg').datagrid('getSelected');
    if (checkedRow != null) {
        $('#txtb-noconlai').numberbox('setValue', checkedRow.noconlai);
        $('#txtb-tienthanh').numberbox('setValue', checkedRow.noconlai);
        $('#cnkhsale-tcn-dlg').dialog('open').dialog('setTitle', 'Thanh Công Nợ');
        $('#txtb-sotk').textbox('disable');
        $('#txtb-tienthanh').numberbox({
            onChange: (newval,oldval)=>{
                var noconlai = parseInt($('#txtb-noconlai').numberbox('getValue'));
                if (newval > noconlai) {
                    $.messager.alert('Warning', "Tiền thanh phải nhỏ hơn hoặc bằng số nợ còn lại!");
                    $('#txtb-tienthanh').numberbox('clear')
                }
            }
        });
        $('#cbb-hinhthuctt').combobox({
            textField: 'label',
            valueField: 'value',
            onChange: ()=>{
                if ($('#cbb-hinhthuctt').combobox('getValue') == 'Chuyển Khoản')
                    $('#txtb-sotk').textbox('enable');
                else
                    $('#txtb-sotk').textbox('disable');
                if ($('#cbb-hinhthuctt').combobox('getValue') == 'Đổi Trả Hàng' || $('#cbb-hinhthuctt').combobox('getValue') == 'Khác') {
                    $("#doanhso").prop('checked', !1)
                } else {
                    $("#doanhso").prop('checked', !0)
                }
            }
            ,
            data: [{
                label: 'Chuyển Khoản',
                value: 'Chuyển Khoản'
            }, {
                label: 'Tiền Mặt',
                value: 'Tiền Mặt'
            }, {
                label: 'Đổi Trả Hàng',
                value: 'Đổi Trả Hàng'
            }, {
                label: 'Khác',
                value: 'Khác'
            }]
        })
    } else {
        $.messager.alert('Warning', 'Vui lòng chọn khách hàng trước!')
    }
    $("#cbb-hinhthuctt").combobox("select", "Chuy\u1ec3n Kho\u1ea3n");
}
$('#inp-ngaysinh').datebox({
    required: !0
});
var index1 = 0;
$(function() {
    $('#cnkhsale-main-dg').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px;position:relative;"><table pagination="true" class="ddvcnkhsale' + index + ' "></table></div>'
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddvcnkhsale' + index);
            var maPX = row.id;
            ddv.datagrid({
                url: 'taiDuLieu_cn?maPX=' + maPX,
                fitColumns: !0,
                singleSelect: !0,
                rownumbers: !0,
                loadMsg: '',
                height: 'auto',
                columns: [[{
                    field: 'mapcn',
                    title: 'Mã phiếu',
                    align: 'center',
                    width: 100,
                    halign: 'center'
                }, {
                    field: 'ngaytra',
                    title: 'Ngày thanh toán',
                    align: 'center',
                    width: 100,
                    halign: 'center'
                }, {
                    field: 'sotien',
                    title: 'Số Tiền(VNĐ)',
                    halign: 'center',
                    width: 100,
                    formatter: formatCurrency,
                    align: 'right'
                }, {
                    field: 'hinhThucThanh',
                    title: 'Hình Thức Thu',
                    width: 100,
                    align: 'right',
                    halign: 'center'
                }, {
                    field: 'soTK',
                    title: 'Số TK',
                    width: 100,
                    align: 'right',
                    halign: 'center'
                }, {
                    field: 'tenNV',
                    title: 'Nhân Viên Thu',
                    width: 100,
                    align: 'center',
                    halign: 'center'
                }, {
                    field: 'ghichu',
                    title: 'Ghi chú',
                    width: 100,
                    align: 'center',
                    halign: 'center'
                }]],
                onResize: function() {
                    $('#cnkhsale-main-dg').datagrid('fixDetailRowHeight', index)
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#cnkhsale-main-dg').datagrid('fixDetailRowHeight', index)
                    }, 0)
                },
                onDblClickRow: function(index, row) {
                    alert(row.ghichu)
                }
            });
            $('#cnkhsale-main-dg').datagrid('fixDetailRowHeight', index);
            index1 = index
        }
    });
    var index10 = 0
    $('#cnkh-dg').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px;position:relative;"><table pagination="true" class="ddvcnkh_sale' + index + ' "></table></div>'
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddvcnkh_sale' + index);
            var maPX = row.id;
            ddv.datagrid({
                url: 'taiDuLieu_cn?maPX=' + maPX,
                fitColumns: !0,
                singleSelect: !0,
                rownumbers: !0,
                loadMsg: '',
                height: 'auto',
                columns: [[{
                    field: 'mapcn',
                    title: 'Mã phiếu',
                    align: 'center',
                    width: 100,
                    halign: 'center'
                }, {
                    field: 'ngaytra',
                    title: 'Ngày thanh toán',
                    align: 'center',
                    width: 100,
                    halign: 'center'
                }, {
                    field: 'sotien',
                    title: 'Số Tiền(VNĐ)',
                    halign: 'center',
                    width: 100,
                    formatter: formatCurrency,
                    align: 'right'
                }, {
                    field: 'hinhThucThanh',
                    title: 'Hình Thức Thu',
                    width: 100,
                    align: 'right',
                    halign: 'center'
                }, {
                    field: 'soTK',
                    title: 'Số TK',
                    width: 100,
                    align: 'right',
                    halign: 'center'
                }, {
                    field: 'tenNV',
                    title: 'Nhân Viên Thu',
                    width: 100,
                    align: 'center',
                    halign: 'center'
                }, {
                    field: 'ghichu',
                    title: 'Ghi chú',
                    width: 100,
                    align: 'center',
                    halign: 'center'
                }]],
                onResize: function() {
                    $('#cnkh-dg').datagrid('fixDetailRowHeight', index)
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#cnkh-dg').datagrid('fixDetailRowHeight', index)
                    }, 0)
                },
                onDblClickRow: function(index, row) {
                    alert(row.ghichu)
                }
            });
            $('#cnkh-dg').datagrid('fixDetailRowHeight', index);
            index10 = index
        }
    })
});
var indexghino = 0;
$(function() {
    $('#ghinokh-main-dg').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px;position:relative;"><table pagination="true" class="ddvghicongno' + index + ' "></table></div>'
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddvghicongno' + index);
            var mapgn = row.idpgn;
            ddv.datagrid({
                url: 'taidulieughino?chitietghino=' + mapgn,
                fitColumns: !0,
                singleSelect: !0,
                rownumbers: !0,
                loadMsg: '',
                height: 'auto',
                columns: [[{
                    field: 'ngaythanh',
                    title: 'Ngày thanh',
                    align: 'center',
                    width: 100,
                    halign: 'center'
                }, {
                    field: 'sotienthanh',
                    title: 'Số Tiền(VNĐ)',
                    halign: 'center',
                    width: 100,
                    formatter: formatCurrency,
                    align: 'right'
                }, {
                    field: 'ghichu',
                    title: 'ghichu',
                    width: 100,
                    align: 'right',
                    halign: 'center'
                }, {
                    field: 'tenNV',
                    title: 'Nhân Viên Thu',
                    width: 100,
                    align: 'center',
                    halign: 'center'
                }]],
                onResize: function() {
                    $('#ghinokh-main-dg').datagrid('fixDetailRowHeight', index)
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#ghinokh-main-dg').datagrid('fixDetailRowHeight', index)
                    }, 0)
                }
            });
            $('#ghinokh-main-dg').datagrid('fixDetailRowHeight', index);
            indexghino = index
        }
    })
});
function xuatphieuduavaoid() {
    var row = $('#chitietcongnokh_dg').datagrid('getSelected');
    if (row) {
        $idCN = row.idCN;
        $h = 'export_thuCNKHpdf?idCN=' + $idCN;
        window.open($h, '_blank')
    } else {
        thongbao("Chọn phiếu cần xuất file")
    }
}
function xuatdanhsachcccongnotheotimkiem() {
    $searchtext = ""
    $makho = $('#khonhanvienquanlykho_cc').combobox('getValue');
    $makh = $('#cnkhsale-kh-cbb_cc').combobox('getValue')
    $nvkd = $('#congno_chon_nvkd').combobox('getValue')
    $bien = [$searchtext, $makh, $nvkd, $makho]
    xuatfile("db-QLCN-from_cc", "db-QLCN-to_cc", "excel_lsThuNoKH", $bien)
}
function themsotkkh() {
    $sotk = $("#sotk_txt").textbox("getValue");
    $tentk = $("#tennganhang").textbox("getValue");
    var bien = {
        sotk: $sotk,
        tentk: $tentk
    }
    sendajax("../tochucs/themsotaikhoan", bien, "dg");
    $('#txtb-sotk').combobox('reload')
    $("#sotk_txt").textbox("setValue", "");
    $("#tennganhang").textbox("setValue", "")
}
function xoasotkkh() {
    $sotk = $("#sotk_txt").textbox("getValue");
    var bien = {
        sotk: $sotk
    }
    sendajax("../tochucs/xoataikhoan", bien, "dg");
    $('#txtb-sotk').combobox('reload')
}
function xuatphieuxuatkhopdf() {
    var a = $("#cnkhsale-main-dg").datagrid("getSelected");
    if (a) {
        $maPX = a.id;
        if ("0" == a.maKH || "" == a.maPhieuxuat)
            return thongbao("Vui l\u00f2ng c\u1eadp nh\u1eadt th\u00f4ng tin kh\u00e1ch h\u00e0ng ho\u1eb7c mapx"),
            !1;
        $h = "../phieuxuatsps/export_phieuxuatkhoPDF?mapx=" + $maPX;
        window.open($h, "_blank")
    } else
        thongbao("Ch\u1ecdn phi\u1ebfu xu\u1ea5t c\u1ea7n xu\u1ea5t file")
}
;function xuatdanhsachcccongnotheotimkiem_admin() {
    $searchtext = ""
    $makho = $('#khonhanvienquanlykho_cc').combobox('getValue');
    $makh = $('#cnkhsale-kh-cbb_cc').combobox('getValue')
    $nvkd = $('#congno_chon_nvkd').combobox('getValue')
    $bien = [$searchtext, $makh, $nvkd, $makho]
    xuatfile("db-QLCN-from_cc", "db-QLCN-to_cc", "excel_lsThuNoKH_admin", $bien)
}
