var index2 = 0;
$(function() {
    $('#dg-congnoncc').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px"><table pagination="true" class="ddvcongnoncc' + index + '"></table></div>'
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddvcongnoncc' + index);
            var maPN = row.maPN;
            ddv.datagrid({
                url: 'taiDuLieu_cn?maPN=' + maPN,
                fitColumns: !0,
                singleSelect: !0,
                rownumbers: !0,
                loadMsg: 'Đang tải...',
                emptyMsg: 'Không có dữ liệu.',
                height: 'auto',
                columns: [[{
                    field: 'ngayThanh',
                    title: 'Ngày Trả',
                    width: 100
                }, {
                    field: 'soTienThanh',
                    title: 'Số Tiền(VNĐ)',
                    width: 100,
                    formatter: formatCurrency,
                    align: 'right'
                }, {
                    field: 'hinhThucThanh',
                    title: 'Hình Thức Thanh Toán',
                    width: 100,
                    align: 'right'
                }, {
                    field: 'tenNV',
                    title: 'Nhân Viên Thanh Toán',
                    width: 100,
                    align: 'center'
                }, ]],
                onResize: function() {
                    $('#dg-congnoncc').datagrid('fixDetailRowHeight', index)
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#dg-congnoncc').datagrid('fixDetailRowHeight', index)
                    }, 0)
                }
            });
            $('#dg-congnoncc').datagrid('fixDetailRowHeight', index);
            index2 = index
        }
    })
});
function DeleteCN_NCC() {
    var record = $('#dg-congnoncc').datagrid('getSelected');
    if (record) {
        $id = record.idCN;
        if (!$(this).hasClass('clicked')) {
            var sArray = {
                id: $id
            };
            sendajax("xoacongnoncc", sArray);
            $('#dg-congnoncc').datagrid('reload')
        }
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn phiếu nợ cần xóa!'
        })
    }
}
function thanhToanCN_NCC() {
    var record = $('#dg-congnoncc').datagrid('getSelected');
    var $mapx = record.maPN;
    var $sotien = $('#txtb-congnoncc-tienthanh').val();
    var $hinhthucthanh = $('#cbb-congnoncc-hinhthuctt').combobox('getValue');
    var $sotk = $('#txtb-congnoncc-sotk').val();
    if (!$('#fm-congnoncc-tcn').form('validate')) {
        return !1
    }
    if (!$(this).hasClass('clicked')) {
        var sArray = {
            mapn: $mapx,
            sotien: $sotien,
            hinhthucthanh: $hinhthucthanh,
            sotk: $sotk
        };
        sendajax("taophieuthanh", sArray, "dg-congnoncc")
    }
    $('#dlg-congnoncc-tcn').dialog('close')
}
function thanhCN_NCC() {
    var row = $('#dg-congnoncc').datagrid('getSelected');
    if (row) {
        $maPN = row.maPN;
        $('#dlg-congnoncc-tcn').dialog('open').dialog('setTitle', 'Thanh Công Nợ');
        $('#txtb-congnoncc-noconlai').numberbox('setValue', row.noconlai);
        $('#txtb-congnoncc-tienthanh').numberbox('setValue', row.noconlai);
        $('#txtb-congnoncc-sotk').textbox('disable');
        $('#txtb-congnoncc-noconlai').numberbox({
            groupSeparator: '.',
            suffix: ' VNĐ',
        });
        $('#txtb-congnoncc-tienthanh').numberbox({
            groupSeparator: '.',
            suffix: ' VNĐ',
            onChange: (newval,oldval)=>{
                var noconlai = parseInt($('#txtb-congnoncc-noconlai').numberbox('getValue'));
                if (newval > noconlai) {
                    $.messager.show({
                        title: 'Thông Báo',
                        msg: 'Tiền thanh phải nhỏ hơn hoặc bằng số nợ còn lại!'
                    });
                    $('#txtb-congnoncc-tienthanh').numberbox('setValue', noconlai)
                }
            }
        });
        $('#cbb-congnoncc-hinhthuctt').combobox({
            textField: 'label',
            valueField: 'value',
            onChange: ()=>{
                if ($('#cbb-congnoncc-hinhthuctt').combobox('getValue') == 'Chuyển Khoản')
                    $('#txtb-congnoncc-sotk').textbox('enable');
                else
                    $('#txtb-congnoncc-sotk').textbox('disable')
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
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn Phiếu Nhập Cần Thanh Công Nợ'
        })
    }
}
function timkiem_CN_NCC() {
    $timkiem_congnoncc = $('#search-congnoncc').val();
    $('#dg-congnoncc').datagrid('load', {
        timkiemcongno: $timkiem_congnoncc
    })
}
function duyetdondathang() {
    var record = $('.ddv' + index1).datagrid('getSelected');
    if (record) {
        $('#dlg-khnh-dddh').dialog('open').dialog('setTitle', 'DUYỆT ĐƠN ĐẶT HÀNG');
        $('#txtb-khnh-dddh-sld').numberbox({
            groupSeparator: '.',
            centermin: 0,
            setvalue: 'record.soluongduyet',
        });
        $('#txtb-khnh-dddh-sld').numberbox('setvalue', record.soluongduyet)
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: 'Chọn Đơn Đặt Hàng Cần Duyệt'
        })
    }
}
