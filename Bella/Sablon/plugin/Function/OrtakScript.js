function populate(frm, data) {
    $.each(data, function (key, value) {
        var $ctrl = $('[name=' + key + ']', frm);
        switch ($ctrl.attr("type")) {
            case "text":
            case "hidden":
                $ctrl.val(value);
                break;
            case "radio": case "checkbox":
                $ctrl.each(function () {
                    if ($(this).attr('value') == value) {
                        $(this).attr("checked", value);

                    }
                    if ($ctrl.attr("type") == "checkbox" && value == 1) {
                        $(this).attr('checked', 'checked');
                    } else {
                        $(this).removeAttr('checked');
                    }
                });
                break;
            case "acik_kapali":
                if (value) {
                    $ctrl.val("true");
                }
                else {
                    $ctrl.val("false");
                }
                break;
            default:
                $ctrl.val(value);
        }
    });
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}
function tlFormatter1(value, row, index, po) {
     if (value != null) {
        if (value != 0) {
            return addCommas(value.toFixed(2)) + " TL";
        }
    }
    else {
        return "0" + " TL";
    }

}
function tlFormatter2(value, row, index, po) {
    if (value != null) {
        if (value != 0) {           
            return addCommas(value.toFixed(2));
        }
        else return "0";
    }
    else {
        return "0";
    }
}
function tlFormatter0(value, row, index, po) {
    if (value != null) {
        if (value != 0) {
            return addCommas(value.toFixed(0));
        }
        else return "0";
    }
    else {
        return "0";
    }
}
function tlFormatterYUZDE(value, row, index, po) {
    if (value != null) {
        if (value != 0) {

            return addCommas("%"+value.toFixed(2));

        }
        else return "0";
    }
    else {
        return "0";
    }

}
function kurformat(value, row, index, po) {
    if (value != null) {
        if (value != 0) {

            return addCommas(value.toFixed(4));

        }
        else return "0";
    }
    else {
        return "0";
    }

}
function tlFormatter3(value, row, index, po) {
    if (value != null) {
        if (value != 0) {
            return addCommas(value.toFixed(2));
        }
        else return "0";
    }
    else {
        return "0";
    }

}
 
function tarihimFormatter(value) {
    if (value == null) {
        return "";
    }
    var xx = parseInt(value.replace("/Date(", "").replace(")/", ""), 10);
    return $.sadedate(xx);
}
$.sadedate = function (dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = '<div  style="color:  0000FF">' +
            '  <i class="fa fa-calendar"></i> ' +
             day + "." + month + "." + year +
            '</div>';

    return date;
};
function tarihimSade(value) {
    if (value == null) {
        return "";
    }
    var xx = parseInt(value.replace("/Date(", "").replace(")/", ""), 10);
    var d = new Date(xx);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "." + month + "." + year.toString().substring(2, 4);

    return date;
}
$(".SEHIRID").change(function () {
    var id = $(this).val();
    var ilcelist = $(".ILCEID");
    ilcelist.empty();
    $.ajax({
        url: '/Ilce/ilceListesi',
        type: 'POST',
        dataType: 'json',
        data: { 'id': id },

        success: function (data) {
            $.each(data, function (index, option) {
                ilcelist.append('<option value=' + option.Value + '> ' + option.Text + ' </option');
            });
        }
    });
});
//$(document).ready(function () {
//    // Enable Live Search.
//    $('.SEHIRID').attr('data-live-search', true);
//    $('.SEHIRID').selectpicker(
//        {
//            width: '100%',
//            title: '- [Şehir Seçiniz] -',
//            style: 'btn-white',
//            size: 6
//        }); 
//    $('.CARIID').attr('data-live-search', true);
//    $('.CARIID').selectpicker(
//        {
//            width: '100%',
//            title: '- [Şehir Seçiniz] -',
//            style: 'btn-white',
//            size: 6
//        }); 
//});
function DurumFormatter(value) {
    if (value.TOPLAM_KAR < 0) {
        return {//kırmızı
            //classes: 'text-nowrap',
            css: { "background": "#fd4c4c", "color": "#FFF" }
        };
    } else {
        return {
            //classes: 'text-nowrap',
            css: { "background": "#ffffff", "color": "#000" }
        };
    }
}
$('#btnTarihBelirle').click(function () {
    var bitarih = $('.bitarih').val();
    var batarih = $('.batarih').val();

    $.ajax({
        type: 'POST',
        url: '/Fatura/TarihBelirle?BaTarih=' + batarih + '&BiTarih=' + bitarih,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            window.location.reload();
        },
        error: function (result) {
        }
    });
});
 
$(document).ready(function () {
    $("#CARIID").change(function () {
        var id = $(this).val();
        var ilcelist = $("#CARI_ADRESID");
        ilcelist.empty();
        $.ajax({
            url: '/Siparis/CariAdresGetir',
            type: 'POST',
            dataType: 'json',
            data: { 'id': id },
            success: function (data) {
                $.each(data, function (index, option) {
                    ilcelist.append('<option value=' + option.Value + '> ' + option.Text + ' </option');
                });
            }
        });
    });
});

function IlgiliDoldur(cariid, obj_id,tur) {
    $.get('/Cari/KisiAra?id=' + cariid+'&tur='+tur, function (resultl) {
        var option_list = resultl;
        $('#' + obj_id).empty();
        $('#' + obj_id).append(
            $("<option></option>").attr(
                "value", "0").text("-- Seçiniz --")
        );
        for (var i = 0; i < option_list.length; i++) {
            $('#' + obj_id).append(
                $("<option></option>").attr(
                    "value", option_list[i]["ID"]).text(option_list[i]["ISIM"] + " " + option_list[i]["SOYISIM"])
            );
        };
        var ffo = $('#' + obj_id)[0];
    });
};
 
var secilenler = [];
var mydata = [];

//Dinamik Modelbox Doldur
function Model_Getir(url) {
    var sonuc = "ModalBoxSonuc";
    var model = "ModalBox";
    var mdl = $('#' + model);
    $('#' + sonuc).html('<div class="modal-dialog " style="width:40%;"><div class="modal-content"><div class="modal-body" style="text-align:center;"><br/><img src="/images/200.gif" /></div ></div ></div >');
    $.ajax({
        async: true,
        type: "GET",
        url: url,

        success: function (result) {
            $('#' + sonuc).html('');
            $('#' + sonuc).html(result);
        },
        error: function (req, status, error) {

        }
    });
    window.setTimeout(function () {
        mdl.modal('show');
    }, 500);
}
//Dinamik Modelbox Doldur
//Dinamik Modelbox Doldur1
function Model_Getir1(url) {
    var sonuc = "ModalBoxSonuc_1";
    var model = "ModalBox_1";
    var mdl = $('#' + model);
    $('#' + sonuc).html('<div class="modal-dialog " style="width:40%;"><div class="modal-content"><div class="modal-body" style="text-align:center;"><br/><img src="/Sablon/image/gears.gif" /></div ></div ></div >');
    $.ajax({
        async: true,
        type: "GET",
        url: url,

        success: function (result) {
            $('#' + sonuc).html('');
            $('#' + sonuc).html(result);
        },
        error: function (req, status, error) {

        }
    });
    window.setTimeout(function () {
        mdl.modal('show');
    }, 500);
}
//Dinamik Modelbox Doldur1
//Dinamik Modelbox Doldur2
function Model_Getir2(url) {
    var sonuc = "ModalBoxSonuc_2";
    var model = "ModalBox_2";
    var mdl = $('#' + model);
    $('#' + sonuc).html('<div class="modal-dialog " style="width:40%;"><div class="modal-content"><div class="modal-body" style="text-align:center;"><br/><img src="/Sablon/image/gears.gif" /></div ></div ></div >');
    $.ajax({
        async: true,
        type: "GET",
        url: url,

        success: function (result) {
            $('#' + sonuc).html('');
            $('#' + sonuc).html(result);
        },
        error: function (req, status, error) {

        }
    });
    window.setTimeout(function () {
        mdl.modal('show');
    }, 500);
}
//Dinamik Modelbox Doldur2

//Dinamik Modelbox Doldur3
function Model_Getir2(url) {
    var sonuc = "ModalBoxSonuc_3";
    var model = "ModalBox_3";
    var mdl = $('#' + model);
    $('#' + sonuc).html('<div class="modal-dialog " style="width:40%;"><div class="modal-content"><div class="modal-body" style="text-align:center;"><br/><img src="/Sablon/image/gears.gif" /></div ></div ></div >');
    $.ajax({
        async: true,
        type: "GET",
        url: url,

        success: function (result) {
            $('#' + sonuc).html('');
            $('#' + sonuc).html(result);
        },
        error: function (req, status, error) {

        }
    });
    window.setTimeout(function () {
        mdl.modal('show');
    }, 500);
}
//Dinamik Modelbox Doldur3