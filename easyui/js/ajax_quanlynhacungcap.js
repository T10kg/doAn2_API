// thêm nhà cung cấp
function themSP_ncc(){
    $('#dlg_ncc').dialog('open').dialog('setTitle','Thêm nhà cung cấp');
    $('#fm_ncc').form('clear')
    $("#luuSP_ncc").show();
    $("#capnhatSP_ncc").hide();
    $("#luuSP_ncc").removeClass('clicked')
    $("#luuSP_ncc").click(function(){
      if (!$('#fm_ncc').form('validate')){
        return false;
      }
      $t=$('#ten_ncc').val();
      $dc=$('#dc_ncc').val();
      $s=$('#sdt_ncc').val();
      var bien = {ten:$t, dc:$dc,s:$s}
      if(!$(this).hasClass('clicked')){
        $("#luuSP_ncc").addClass('clicked')
        sendajax("them_ncc",bien,"dg_ncc");
        $("#dlg_ncc").dialog("close"); 
      }
    })
  }
  // sửa nhà cung cấp
  function suasp_ncc(){
    var row = $('#dg_ncc').datagrid('getSelected');
    if (row){
      $('#dlg_ncc').dialog('open').dialog('setTitle','Cập nhật thông tin nhà cung cấp');
      $('#fm_ncc').form('load',row);
      $("#luuSP_ncc").hide();
      $("#capnhatSP_ncc").show();
        $ma=row.Mansx;
        $ten=row.Tennsx;  
        $t=$('#ten_ncc').val($ten);
        $diachi=row.diachi;
        $dc=$('#dc_ncc').val($diachi);
        $sdt=row.Sdt;
        $s=$('#sdt_ncc').val($sdt);
      $("#capnhatSP_ncc").click(function(){
        $t=$('#ten_ncc').val();
        $dc=$('#dc_ncc').val();
        $sdt=$('#sdt_ncc').val();
        if ($t==""){
          $('#ten_ncc').focus();
          thongbao("Nhập tên nhà cung cấp!")
          return false;
        }
        if( !$("#fm_ncc").form('validate')){
          return false;
        } 
        if(!$(this).hasClass('clicked')){
          $("#capnhatSP_ncc").addClass('clicked')
          var bien={ma:$ma,ten:$t,dc:$dc,s:$sdt}
          sendajax("sua_ncc",bien,"dg_ncc")
          $("#capnhatSP_ncc").removeClass('clicked')          
          $('#dlg_ncc').dialog("close");
        }
      });
    }
    else
    {
      thongbao("Chọn Dòng Cần Chỉnh Sửa")
    }
  }
  // xóa nhà cung cấp
  function Xoasp_ncc(){
    var row = $('#dg_ncc').datagrid('getSelected');
    if(row){
        $mancc=row.Mansx;
        var bien={ ma:$mancc}
         xoadulieuajax("xoaNCC",bien,"dg_ncc","Bạn có muốn xóa nhà cung cấp không?");
    }
    else{
      thongbao("chọn nhà cung cấp cần xóa")
    }
  }