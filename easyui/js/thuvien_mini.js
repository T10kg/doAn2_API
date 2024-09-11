// setInterval(function() {
//     $.post('../nhanviens/create_session', {
//         tam: 1
//     }, function(data) {
//         if (data) {
//             return !0
//         }
//     })
// }, 30000);
// window.onload = ()=>{
//     setTimeout(()=>{
//         $(".modal").hide()
//     }
//     , 10)
// }

function formatCurrency(value=0) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function sendajax(url, bien) {
    $.post(url, {
        thamso: bien
    }, function(data) {
        if (data) {
            $.messager.show({
                title: 'Thông Báo',
                msg: data
            })
        }
    })
}
function sendandsetval(url_1, bien_1, arr) {
    $.post(url_1, {
        thamso: bien_1
    }, function(data) {
        if (data) {
            Object.keys(arr).forEach(function(key) {
                $("#" + arr[key]).numberbox("setValue", data)
            })
        }
    })
}
function send_and_set_data_by_id(b, c, d) {
    $.post(b, {
        thamso: c
    }, function(a) {
        a && $("#" + d).html(a)
    })
}
;function canhbao(thongbao) {
    if (thongbao == "Trùng số QR hoặc SL tồn < SL xuất") {
        thongbaocanhbao(thongbao)
    } else if (thongbao == "Mã QR không tồn tại trong nhập kho, vui lòng kiểm tra lại") {

        thongbaocanhbao(thongbao)
    } else if (thongbao == "Mã Vạch không tồn tại trong nhập kho, vui lòng kiểm tra lại") {

        thongbaocanhbao(thongbao)
    } else if (thongbao == "Số lượng vượt tồn kho, vui lòng kiểm tra lại") {

        thongbaocanhbao(thongbao)
    } else if (thongbao == "Có lỗi xảy ra vui lòng kiểm tra lại") {

        thongbaocanhbao(thongbao)
    } else {
        $.messager.show({
            title: 'Thông Báo',
            msg: thongbao
        })
    }
}
function sendajax3(url, bien, datagrid) {
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ thamso: bien }), // Ensure thamso does not have syntax errors
        success: function(thongbao) {
            if (thongbao) {
                canhbao(thongbao); // Assuming canhbao is a function that handles the alert or warning
                $("#" + datagrid).datagrid("reload"); // Reload the datagrid after the AJAX call is successful
            }
        }
    });
}



function sendajax4(url, bien, datagrid, func) {
    $.post(url, {
        thamso: bien
    }, function(data) {
        if (data) {
            canhbao(data)
            $("#" + datagrid).datagrid("reload");
            func
        }
    })
}
function getdataajax(url, bien, biensetvalue) {
    var tam = 0;
    $.post(url, {
        thamso: bien
    }, function(data) {
        if (data) {
            tam = data
        } else {
            return null
        }
    })
    return tam
}
function thongbao(bien) {
    $.messager.show({
        title: 'Thông Báo',
        msg: bien,
        showType: 'fade',
        style: {
            right: '',
            bottom: '',
        }
    })
}
function thongbaocanhbao(bien) {
    $.messager.show({
        title: 'Thông Báo',
        msg: bien,
        showType: 'fade',
        style: {
            right: '',
            bottom: ''
        }
    }).window('resize', {
        width: 400,
        height: 100
    })
}
function xoadulieuajax(url, bien, datagrid, msg) {
    $.messager.confirm('Confirm', msg, function (r) {
        console.log(bien)
        if (r) {
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({thamso: bien}), // Ensure thamso does not have syntax errors
                success: function (data) {
                    if (data) {
                        $.messager.show({
                            title: 'Thông Báo',
                            msg: data
                        });
                        $("#" + datagrid).datagrid("reload")// Reload the datagrid after the AJAX call is successful
                    }
                }
            });
        }
    })
}
function chuyenkho_reload_trang(url, bien, datagrid, msg) {
    $.messager.confirm('Confirm', msg, function(r) {
        if (r) {
            $.post(url, {
                thamso: bien
            }, function(data) {
                if (data) {
                    $.messager.show({
                        title: 'Thông Báo',
                        msg: data
                    });
                    $("#" + datagrid).datagrid("reload");
                    setTimeout(function() {
                        location.reload()
                    }, 500)
                }
            })
        }
    })
}
function timkiemtungaydenngay(tu, den, datagrid) {
    $tu = $("#" + tu).datebox("getValue");
    $den = $("#" + den).datebox("getValue");
    if ($tu == "" || $den == "") {
        thongbao("Vui lòng nhập ngày bắt đầu và ngày kết thúc");
        return !1
    } else {
        $("#" + datagrid).datagrid('load', {
            tungay: $tu,
            denngay: $den
        })
    }
}
function xuattungaydenngay(tu, den, url) {
    $tu = $("#" + tu).datebox("getValue");
    $den = $("#" + den).datebox("getValue");
    if ($tu == "" || $den == "") {
        thongbao("Vui lòng nhập ngày bắt đầu và ngày kết thúc");
        return !1
    } else {
        url = url + "?tungay=" + $tu + "&denngay=" + $den
        window.open(url, '_blank')
    }
}
function xuattungaydenngaykho(tu, den, url, thamso) {
    $tu = $("#" + tu).datebox("getValue");
    $den = $("#" + den).datebox("getValue");
    if ($tu == "" || $den == "") {
        thongbao("Vui lòng nhập ngày bắt đầu và ngày kết thúc");
        return !1
    } else {
        url = url + "?tungay=" + $tu + "&denngay=" + $den + "&thamso=" + thamso
        window.open(url, '_blank')
    }
}
function xuattungaydenngaykho(tu, den, url, thamso) {
    $tu = $("#" + tu).datebox("getValue");
    $den = $("#" + den).datebox("getValue");
    if ($tu == "" || $den == "") {
        thongbao("Vui lòng nhập ngày bắt đầu và ngày kết thúc");
        return !1
    } else {
        url = url + "?tungay=" + $tu + "&denngay=" + $den + "&thamso=" + thamso
        window.open(url, '_blank')
    }
}
function travethamsourl(myArray) {
    var myArrayQry = myArray.map(function(el, idx) {
        return 'thamso[' + idx + ']=' + el
    }).join('&');
    return myArrayQry
}
function xuatfile(tu, den, url, thamso) {
    $tu = ""
    $den = ""
    thamso = travethamsourl(thamso)
    if ((tu != "") || (den != "")) {
        $tu = $("#" + tu).datebox("getValue");
        $den = $("#" + den).datebox("getValue");
        if (($tu != "" && tu != "") || ($den != "" && den != "")) {
            if ($tu == "" || $den == "") {
                thongbao("Vui lòng nhập ngày bắt đầu và ngày kết thúc");
                return !1
            } else {
                url = url + "?tungay=" + $tu + "&denngay=" + $den + "&" + thamso
                window.open(url, '_blank')
            }
        } else {
            url = url + "?tungay=" + $tu + "&denngay=" + $den + "&" + thamso
            window.open(url, '_blank')
        }
    } else {
        url = url + "?tungay=" + $tu + "&denngay=" + $den + "&" + thamso
        window.open(url, '_blank')
    }
}
function xuatfiletheodieukiennhap(url, msg) {
    $.messager.prompt('Thông báo', msg, function(r) {
        if (r && r != "") {
            url = url + "?thamso=" + r
            window.open(url, '_blank')
        } else {
            thongbao("Vui lòng nhập thông tin vào ô textbox")
            xuatfiletheodieukiennhap(url, msg)
            return !1
        }
    })
}
function timkiemtungaydenngay(tu, den, datagrid, giatri) {
    $tu = $("#" + tu).datebox("getValue");
    $den = $("#" + den).datebox("getValue");
    if ($tu == "" || $den == "") {
        thongbao("Vui lòng nhập ngày bắt đầu và ngày kết thúc");
        return !1
    } else {
        $("#" + datagrid).datagrid('load', {
            tungay: $tu,
            denngay: $den,
            thamso: giatri
        })
    }
}
function timkiemkethop(tu, den, datagrid, giatri) {
    $tu = $("#" + tu).datebox("getValue");
    $den = $("#" + den).datebox("getValue");
    if (($tu != "") || ($den != "")) {
        timkiemtungaydenngay(tu, den, datagrid, giatri)
    } else {
        $("#" + datagrid).datagrid('load', {
            tungay: $tu,
            denngay: $den,
            thamso: giatri
        })
    }
}
function kiemtradieukien(url, bien) {
    $.post(url, {
        thamso: bien
    }, function(data) {
        if (data) {
            if (data == "true") {
                return !0
            } else {
                return !1
            }
        }
    })
}
function myformatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return ((d < 10 ? ('0' + d) : d) + '-' + (m < 10 ? ('0' + m) : m) + '-' + y)
}
function myparser(s) {
    if (!s)
        return new Date();
    var ss = (s.split('-'));
    var d = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var y = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y,m - 1,d)
    } else {
        return new Date()
    }
}
function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[2],mdy[1],mdy[0])
}
function tailaitatcacactabphieu(maphieu, session) {
    if (maphieu != "" && typeof (maphieu) != "undefined") {
        setInterval(function() {
            var session_px = localStorage.getItem("" + session);
            if (session_px != maphieu) {
                location.reload()
            }
        }, 1000)
    }
}
function kiemtrasodienthoai(str) {
    str = str.toString();
    return 10 == str.length ? /([0]{1}[0-9]{9})/g.test(str) ? !0 : !1 : !1
}
;function load_data_datagrid(id_datagrid, url_load_data) {
    $.ajax({
        url: url_load_data,
        method: 'POST',
        dataType: 'json',
        success: function(data) {
            $('#' + id_datagrid).datagrid('loadData', data);
            $('#' + id_datagrid).datagrid({
                url: url_load_data
            });
            console.log('Data for datagrid loaded:', data);
        },
        error: function(xhr, status, error) {
            console.error('Error loading data for datagrid:', error);
        }
    });
}
function load_data_combobox(id_combobox, url_load_data) {
    $.ajax({
        url: url_load_data,
        method: 'POST',
        dataType: 'json',
        success: function(data) {
            $('#' + id_combobox).combobox('loadData', data);
            console.log('Data for combobox loaded:', data);
        },
        error: function(xhr, status, error) {
            console.error('Error loading data for combobox:', error);
        }
    });
}
