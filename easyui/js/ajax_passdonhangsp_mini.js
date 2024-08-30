$(document).ready(function(){var i=0
    $('#nhap-qr').keypress(function(e){if(e.which==13){setTimeout(function(){var qr=$("#dlg-nhapqr").datagrid("getSelected");if(qr){$chiso=$("#dlg-nhapqr").datagrid("getRowIndex",qr)
    i=$chiso
    $soqr=$("#nhap-qr").val()
    $bien={id:qr.id,soqr:$soqr,mapp:qr.mapp}
    sendajax("capnhatmaqr",$bien,"dlg-nhapqr");$("#nhap-qr").val('')
    i=i+1
    $("#dlg-nhapqr").datagrid({onLoadSuccess:function(items){$("#dlg-nhapqr").datagrid("selectRow",String(i))
    $("#nhap-qr").focus()}})}
    else{thongbao("Vui lòng chọn dòng cần cập nhật")
    $("#nhap-qr").val('')
    $("#nhap-qr").focus()}},1000)}})})
function themsppassdonhang(){$mapp=$("#mapp").val()
    $madaily=$("#cbg-quanLySP_sale-tpp-daily").combogrid("getValue")
    var g=$('#combogrid-quanLySP_sale-tpp').combogrid('grid');var row=g.datagrid("getSelected")
    if(row){$madaily=parseInt($madaily)
    if(isNaN($madaily)||$madaily==''){thongbao("Vui lòng Click chọn đại lý ");return!1}
    $spqr=0
    if($("#check_qr").is(":checked")){$spqr=1}
    $masp=row.Masanpham
    $gia=row.gia_ban
    $makho=row.makho
    $solo=row.solo
    $soqr=row.soqr
    $soluong=$("#sl_them_passdh").numberbox("getValue")
    $soluong=parseInt($soluong)
    $soluongton=row.soluongton
    $soluongton=parseInt($soluongton)
    $chietkhau=$("#chietkhau_them_passdh").numberbox("getValue")
    if($soluongton<$soluong||$soluongton<=0){thongbao("Số lượng hiện tại không đủ xuất vui lòng chọn đại lý khác ")
    return!1}
    $bien={mapp:$mapp,masp:$masp,soluong:$soluong,solo:$solo,soqr:$soqr,makho:$makho,gia:$gia,chietkhau:$chietkhau,spqr:$spqr}
    var array={num1:"tongtien"};sendajax("themspphieupassdhnv",$bien,"dg-quanLySP_sale-dsspp")
    setTimeout(function(){sendandsetval("tongthanhtienphieupassdh",$bien,array)},1000);$('#combogrid-quanLySP_sale-tpp').combogrid("textbox").select();$("#check_qr").attr('checked',!1)}
    else{thongbao("vui lòng chọn sản phẩm")
    return!1}}
function xoasanphampassdonhang(){var row=$("#dg-quanLySP_sale-dsspp").datagrid("getSelected")
    if(row){$id=row.id
    $mapp=row.mapp
    $bien={id:$id,mapp:$mapp}
    var array={num1:"tongtien"};sendajax("xoasanphampassdh",$bien,"dg-quanLySP_sale-dsspp")
    setTimeout(function(){sendandsetval("tongthanhtienphieupassdh",$bien,array)},1000)}}
function huyphieupasdonhang(){$mapp=$("#mapp").val()
    $bien={mapp:$mapp}
    sendajax("huyppassdh",$bien,"dg-quanLySP_sale-dsspp")}
function capnhatphieupassdonhang(){$mapp=$("#mapp").val()
    $makh=$("#cbg-quanLySP_sale-tpp-kh").combogrid("getValue")
    $manv=$("#nhanvienkd_passdh").combobox("getValue")
    $manv_save=$manv
    $tongphieu=$("#tongtien").numberbox("getValue")
    $ghichu=$("#qlpassdh-ghichu-tpp").textbox("getValue")
    $makh=parseInt($makh)
    $manv=parseInt($manv)
    $madaily=parseInt($madaily)
    if(isNaN($makh)||$makh==''){thongbao("Vui lòng Click chọn khách hàng");return!1}
    if(isNaN($manv)||$manv==''){thongbao("Vui lòng Click chọn nhân viên");return!1}
    if(isNaN($madaily)||$madaily==''){thongbao("Vui lòng Click chọn đại lý ");return!1}
    $bien={mapp:$mapp,matc:$madaily,makh:$makh,manv:$manv_save,tongphieu:$tongphieu,ghichu:$ghichu}
    sendajax("capnhatppassdh",$bien,"qlpassdh-dg")
    $("#qlpassdh-tpp-dlg").dialog("close")
    setTimeout(function(){location.reload()},2000)}
function chinhsuathongtinphieupass(){var row=$("#qlpassdh-dg").datagrid("getSelected")
    if(row){$("#qlpassdh-frm_passdh").form("load",row)
    $('#qlpassdh-tpp-dlg').dialog('open')
    $('#updatesanphamphieup').hide()
    $('#updatesanphamphieup').show()}
    else{thongbao("Vui lòng chọn phiếu cần cập nhật")}}
function xoaphieupass(){var row=$("#qlpassdh-dg").datagrid("getSelected")
    if(row){if(row.tinhtrang=='0'){$bien={mapp:row.id}
    xoadulieuajax("xoappassdh",$bien,"qlpassdh-dg","Bạn có thật muốn xóa phiếu này không?")}
    else{thongbao("Phiếu đã xuất kho bên đại lý không được xóa")}}
    else{thongbao("Vui lòng chọn phiếu cần cập nhật")}}

function nhandonhangpass(){

    var row=$("#qlnhandhpass-dg").datagrid("getSelected")

    if(row){

        if(row.tinhtrang=='1'){
            thongbao("Phiếu này đã được tạo vui lòng chọn phiếu khác")
            return!1
        }

        $("#dlg-nhandh").dialog('open')
        $mapx=$("#mapx").val()
        $mapp=row.id
        $makh=row.makh
        $manvkd=row.manv
        $tongthanh=$("#tongthanh_pp").numberspinner("getValue")
        $hinhthucthanh=$("#cbb-nhandh-hinhthuctt").combobox("getValue")
        $sotk=$("#txtb-nhandh-sotk").textbox("getValue")
        $("#taophieuxuatpassdh").click(function(){$tongthanh=$("#tongthanh_pp").numberspinner("getValue")
        $tongphieu=row.tongphieu

        if(parseInt($tongthanh)>parseInt($tongphieu)){
            thongbao("Tổng thanh không được lớn hơn tổng phiếu")
            return!1
        }

        $bien={mapp:$mapp,mapx:$mapx,makh:$makh,manvkd:$manvkd,tongthanh:$tongthanh,hinhthucthanh:$hinhthucthanh,sotk:$sotk}
        $.messager.confirm('Confirm',"Bạn có chắc xuất đơn hàng này không?",function(r){
            if(r){
                sendajax("nhandonhangpass",$bien,"qlnhandhpass-dg")
                setTimeout(function(){
                    $h='../phieuxuatsps/export_phieuxuatkhoPDF?mapx='+$mapx;window.open($h,'_blank');
                    location.reload()},2000)
                }}
            )}
        )
    }
    else{
        thongbao("Vui lòng chọn phiếu cần tạo phiếu xuất")
    }
}

function nhapqr(){
    var row=$("#qlnhandhpass-dg").datagrid("getSelected")
    if(row){
        $("#dg-nhapqr").dialog('open')
        $("#dlg-nhapqr").datagrid(
            {
                url:'../sanphams/combogrid_sp?mapp='+row.id,
                onLoadSuccess:function(items){
                    $("#nhap-qr").focus()
                }
            }
        )
    }
    else{
        thongbao("Vui lòng chọn phiếu cần tạo phiếu xuất")
    }
}

$(function(){
    $('#qlpassdh-dg,#qlnhandhpass-dg').datagrid(
        {
            view:detailview,
            detailFormatter:function(index,row){
                return'<div style="padding:2px"><table pagination="true"  class="ddv'+index+'"></table></div>'
            },
            onExpandRow:function(index,row){
                var ddv=$(this).datagrid('getRowDetail',index).find('table.ddv'+index);
                var phu=row.id;ddv.datagrid(
                    {
                        url:'../sanphams/combogrid_sp?mapp='+phu,
                        fitColumns:!0,
                        singleSelect:!0,
                        rownumbers:!0,
                        loadMsg:'Đang tải...',
                        emptyMsg:'Không có dữ liệu.',
                        height:'auto',
                        columns:[[
                            {
                                field:'tensp',
                                title:'Tên sản phẩm',
                                width:'360px'
                            },
                            {
                                field:'soluongpass',
                                title:'Số lượng',
                                width:100,
                                align:'center'
                            },
                            {
                                field:'giasp',
                                title:'Đơn giá(VNĐ)',
                                width:100,
                                align:'right',
                                formatter:formatCurrency
                            },
                            {
                                field:'chietkhau',
                                title:'Chiết khấu(%)',
                                width:100,align:'center'
                            },
                            {
                                field:'thanhtien',
                                title:'Thành tiền(VNĐ)',
                                width:120,align:'right',
                                formatter:formatCurrency
                            },
                            {
                                field:'solopass',
                                title:'Số lô',
                                width:100,
                                align:'center'
                            },{
                                field:'soqr',
                                title:'số QR',
                                width:120,
                                align:'center',
                                editor:'text'
                            },
                        ]],
                        onResize:function(){
                            $('#qlpassdh-dg').datagrid('fixDetailRowHeight',index)},
                            onLoadSuccess:function(){
                                setTimeout(function(data){
                                    $('#qlpassdh-dg').datagrid('fixDetailRowHeight',index)
                                },0)
                            }
                        });
                        $('#qlpassdh-dg').datagrid('fixDetailRowHeight',index);
                        index2=index
                    }
                }
            )
        }
    )