var indexchuyenkho = 0;
$(function() {
    $('#dg-chuyenkho').datagrid({
        view: detailview,
        detailFormatter: function(index, row) {
            return '<div style="padding:2px;position:relative;"><table pagination="true" class="ddvchuyenkho' + index + ' "></table></div>'
        },
        onExpandRow: function(index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddvchuyenkho' + index);
            var maPX = row.mapx;
            ddv.datagrid({
                url: '../sanphams/taiDuLieuphieuxuat?maphieuxuat=' + maPX,
                fitColumns: !0,
                singleSelect: !0,
                rownumbers: !0,
                loadMsg: 'Đang tải...',
                emptyMsg: 'Không có dữ liệu.',
                height: 'auto',
                columns: [[{
                    field: 'masanpham',
                    title: 'Mã sản phẩm',
                    width: '160px'
                }, {
                    field: 'tensp',
                    title: 'Tên sản phẩm',
                    width: '360px'
                }, {
                    field: 'soLxuat',
                    title: 'Số lượng',
                    width: 100,
                    align: 'center'
                }, {
                    field: 'soloxuat',
                    title: 'Số lô',
                    width: '160px'
                }, {
                    field: 'soqr',
                    title: 'Số QR',
                    width: '160px'
                }, ]],
                onResize: function() {
                    $('#cnkhsale-main-dg').datagrid('fixDetailRowHeight', index)
                },
                onLoadSuccess: function() {
                    setTimeout(function() {
                        $('#cnkhsale-main-dg').datagrid('fixDetailRowHeight', index)
                    }, 0)
                }
            });
            $('#cnkhsale-main-dg').datagrid('fixDetailRowHeight', index);
            indexchuyenkho = index
        }
    })
});
function nhapkhophieuchuyenkho() {
    var row = $("#dg-chuyenkho").datagrid("getSelected");
    if (row) {
        if (row.tinhtrang == '1') {
            thongbao("Phiếu đã được nhập kho, vui lòng chọn phiếu khác");
            return !1
        }
        $mapn = $("#mapn_chuyenkho").val();
        $tukho = row.tukho;
        $denkho = row.denkho;
        $mapx = row.mapx;
        $tongnhap = row.tongthanh;
        $mancc = $("#qlnk-phieuchuyen-nguoncap-cbb").combobox("getValue");
        $id = row.id;
        if ($mancc == "") {
            thongbao("vui lòng chọn nhà cung cấp");
            return !1
        }
        var bien = {
            mapn: $mapn,
            tukho: $tukho,
            denkho: $denkho,
            mapx: $mapx,
            tongnhap: $tongnhap,
            mancc: $mancc,
            id: $id
        }
        if (!$("#nhapkhophieuchuyennoibo").hasClass('clicked')) {
            $("#nhapkhophieuchuyennoibo").addClass('clicked');
            chuyenkho_reload_trang("themphieunhapchophieuchuyenkho", bien, "dg-chuyenkho", "Bạn có thực sự muốn thực hiện thao tác này")
        }
    } else {
        thongbao("Vui lòng chọn phiếu cần nhập kho")
    }
}
