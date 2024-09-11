// thêm nhóm sản phẩm/ thêm nhãn hàng/ thêm nhà sản xuất
function themSP_nhom(){
    $("#capnhatSP_nhom").hide();
    $("#luuSP_nhom").show();
    $('#dlg_nhom').dialog('open').dialog('setTitle','Thêm nhóm sản phẩm');
    $('#ten_nhom').val(''); 
    $('#mt_nhom').val('');
    $("#luuSP_nhom").click(function(){
      $t=$('#ten_nhom').val();
      $m=$('#mt_nhom').val();
      if ($t==""){
        $('#ten_nhom').focus();
        thongbao("Nhập tên nhóm sản phẩm!")
        return false;
      }
      if(!$("#fm_nhom").form('validate')){
        return false;
      }
      if(!$(this).hasClass('clicked')){
        $("#luuSP_nhom").addClass('clicked')
        var bien={ten:$t,m:$m}
        sendajax("them_nhom_SP",bien,"dg_nhom")
        $("#luuSP_nhom").removeClass('clicked')
        $('#dlg_nhom').dialog('close');
      }
    });
  }
  // sua nhóm sản phẩm/ sua nhãn hàng/ sua nhà sản xuất
  function suasp_nhom(){
    var row = $('#dg_nhom').datagrid('getSelected');
    if (row){
      $ma=row.manhom;
      $ten=row.tennhom;   
      if ($ma=="20"){
        thongbao(" "+$ten +" là nhóm hệ thống bạn không được cập nhật");
        return  false;
      }
      $('#dlg_nhom').dialog('open').dialog('setTitle','Cập nhật thông tin nhóm sản phẩm');
      $('#fm_nhom').form('load',row);
      $("#luuSP_nhom").hide();
      $("#capnhatSP_nhom").show();
    /*Điền thông tin trên dòng vào dialog */
      $tensp=$('#ten_nhom').val($ten);
      $mota=row.mota;
      $mt=$('#mt_nhom').val($mota);
      $("#capnhatSP_nhom").click(function(){
        $t=$('#ten_nhom').val();
        $m=$('#mt_nhom').val();
        if ($t==""){
          $('#ten_nhom').focus();
            thongbao("Nhập tên nhóm sản phẩm!")
            return false;
        }
        if(!$("#fm_nhom").form('validate')){
          return false;
        }  
        if(!$(this).hasClass('clicked')){
          $("#capnhatSP_nhom").addClass('clicked')
          var bien={ma:$ma,ten:$t,m:$m}
          sendajax("sua_nhom_sanpham",bien,"dg_nhom")
          $("#capnhatSP_nhom").removeClass('clicked')          
          $('#dlg_nhom').dialog("close");
        }
      });
    }
    else{
      thongbao("Chọn Dòng Cần Chỉnh Sửa")
    }
  }
  // xoa nhóm sản phẩm/ xoa nhãn hàng/ xoa nhà sản xuất
  function Xoasp_nhom(){
    var row = $('#dg_nhom').datagrid('getSelected');
    if(row){
      $manhom=row.manhom;
      if ($manhom=="20"){
        thongbao(" "+$ten +" là nhóm hệ thống bạn không được xóa");
        return  false;
      }
      var bien={manhom:$manhom}
      xoadulieuajax("xoa_nhom_Sanpham",bien,"dg_nhom","Bạn có muốn xóa nhãn hàng không?");
    }
    else{
      thongbao("Chọn dòng cần xóa")
    }
  }