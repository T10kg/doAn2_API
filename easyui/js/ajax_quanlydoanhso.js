
$(document).ready(function() {
    //subgrid doanh số
    $('#qlnk-tungay-datebox').datebox('setValue', 'd/m/y');
    $('#qlnk-denngay-datebox').datebox('setValue', 'd/m/y');
    $tu=$("#qlnk-tungay-datebox").datebox("getValue");
    $den=$("#qlnk-denngay-datebox").datebox("getValue");
    $('#qlds-dg').datagrid({
        view: detailview,
        detailFormatter:function(index,row){
            return '<div style="padding:2px;position:relative;" ><table pagination="true" class="ddv'+ index+ ' "></table></div>';
        },
        onExpandRow: function(index,row){
            var ddv = $(this).datagrid('getRowDetail',index).find('table.ddv'+index);
            var idds = row.maNV;
            ddv.datagrid({
                url: '../doanhsonhanviensales/taidulieudoanhsotheonv?tu='+$tu+'&den='+$den+'&manvds='+idds,
                fitColumns:true,
                singleSelect:true,
                rownumbers:true,
                loadMsg:'',
                height:'auto',
                columns:[[
                {field:'ngaytinh',title:'Thời gian',width:150,align:'center'},
                {field:'soluongdonhang',title:'SL Đơn hàng',width:100},
                {field:'tongphieuxuat',title:'Doanh số',width:130,formatter:formatCurrency,align:'right'},
                {field:'tongtien',title:'Tổng thu thực',width:130,formatter:formatCurrency,align:'right'},
                {field:'soluongdoitra',title:'SL Đơn trả',width:100,formatter:formatCurrency,align:'right'},
                {field:'giatritra',title:'Tổng trả',formatter:formatCurrency,width:130,align:'center'},
                {field:'danhthuthuan',title:'Tổng doanh số' ,formatter:formatCurrency,width:135,align:'center'}
                ]],
                onResize:function(){
                    $('#qlds-dg').datagrid('fixDetailRowHeight',index);
                },
                onLoadSuccess:function(){
                    setTimeout(function(){
                        $('#qlds-dg').datagrid('fixDetailRowHeight',index);
                    },0);
                }
            });
            $('#qlds-dg').datagrid('fixDetailRowHeight',index);
            index1=index;
        }
    });
});
/*Xuất ds doanh số nhân viên file excel */
function exceldsnvsale(){
    $nvkd=$('#nhanvienkd_dso').combobox('getValue')
    $bien=[$nvkd]
    xuatfile('qlnk-tungay-datebox','qlnk-denngay-datebox',"excel_doanhsotheonv",$bien)
}
/*Xuất chi tiết ds doanh số nhân viên file excel */
function excelchitietdsnv(){
    $nvkd=$('#nhanvienkd_dso').combobox('getValue')
    $bien=[$nvkd]
    xuatfile('qlnk-tungay-datebox','qlnk-denngay-datebox',"excel_chitietdstheonv",$bien)
}