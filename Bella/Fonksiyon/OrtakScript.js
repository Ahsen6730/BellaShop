 
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
};
 
$('#ProjeGetir').typeahead(null, {
    name: 'Proje-listesi',
    displayKey: 'CODE',
    source: function (query, process) {
         return $.get('/Proje/ProjeAra', { searchTerm: query }, function (data) {
            var matches = [];
            $.each(data, function (i, str) {
               
                matches.push({ value: str });
            });
            return process(data); debugger;
        },
        'json');
    },
    templates: {
        empty: [
        '<div class="empty-message">',
        '!!  Kayıt Bulunamadı !!',
        '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<div class="form-control" style="border:1px solid gray; width:400px;"><p><strong>{{NAME}}</strong> – {{CODE}} </p></hr></div>')
    }
});

$('.SiparisGetir2').typeahead(null, {
    name: 'Sip-listesi',
    displayKey: 'SIPARISCODE',
    source: function (query, process) {      
        return $.get('/Siparis/SiparisBul', { searchTerm: query }, function (data) {          
            var matches = [];
            $.each(data, function (i, str) {
                matches.push({ value: str });
            });
            return process(data); debugger;
        },
        'json');
    },
    templates: {
        empty: [
        '<div class="empty-message">',
        '!!  Kayıt Bulunamadı !!',
        '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<div class="form-control" style="border:1px solid gray; width:400px;"><p><strong>{{SIPARISCODE}}</strong> – {{ProjeNAME}} </p></hr></div>')
    }
});
$('.UrunGetir2').typeahead(null, {
    name: 'Urun-listesi',
    displayKey: 'URUNCODE',
    source: function (query, process) {
         return $.get('/Urun/UrunAra', { searchTerm: query }, function (data) {
            var matches = [];
            $.each(data, function (i, str) {
                matches.push({ value: str });
            });
            return process(data); debugger;
        },
        'json');
    },
    templates: {
        empty: [
        '<div class="empty-message">',
        '!!  Kayıt Bulunamadı !!',
        '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<div class="form-control" style="width:700px;"><p><strong>{{URUNCODE}}</strong> – {{MARKA}}– {{TIP}} -{{ACIKLAMA}} </p></div>')
    }
});
$('.MalKabulGetir2').typeahead(null, {
    name: 'Urun-listesi',
    displayKey: 'ID',
    source: function (query, process) {
        return $.get('/Depo/MalKabulAra', { searchTerm: query }, function (data) {
            var matches = [];
            $.each(data, function (i, str) {
                matches.push({ value: str });
            });
            return process(data); 
        },
        'json');
    },
    templates: {
        empty: [
        '<div class="empty-message">',
        '!!  Kayıt Bulunamadı !!',
        '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<div id="{{ID}}" class="form-control" style="width:700px;"><strong><p><strong>{{URUNCODE}}</strong> – {{URUNNAME}} -{{ADET}} Sevk - {{TRANSFER}}</p></div>')
    }
});
$('.PanoGetir2').typeahead(null, {
    name: 'Urun-listesi',
    displayKey: 'PANOCODE',
    source: function (query, process) {
         return $.get('/Depo/PanoAra', { searchTerm: query }, function (data) {
            var matches = [];
            $.each(data, function (i, str) {
                matches.push({ value: str });
            });
            return process(data); debugger;
        },
        'json');
    },
    templates: {
        empty: [
        '<div class="empty-message">',
        '!!  Kayıt Bulunamadı !!',
        '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<div class="form-control" style="width:400px;"><p><strong>{{PANONAME}}</strong> –  {{SIPCODE}} - <strong>{{PROJENAME}}</strong> - {{PROJECODE}}</p></div>')
    }
});

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


function DepoDoldur(combox) {
    $.get('/Cari/CariListesi', function (resultl) {
        var option_list = resultl;
        $('#' + combox).empty();
         for (var i = 0; i < option_list.length; i++) {
            $('#' + combox).append(
                $("<option></option>").attr(
                    "value", option_list[i]["CariCode"]).text(option_list[i]["CariName"])
            );
        };
    });
}


function DurumFormatter(value) {
    if (value.TeklifDurumID == "3") {
        return {
            classes: 'text-nowrap',
            css: { "background": "#fd4c4c", "color": "#FFF" }
        };
    }
    else if (value.TeklifDurumID == "1") {
        return {
            classes: 'text-nowrap',
            css: { "background": "#ffffff", "color": "#000" }
        };
    }
    else if (value.TeklifDurumID == "2") {
        return {
            classes: 'text-nowrap',
            css: { "background": "#99e7ff", "color": "#000" }
        };
    }
    else if (value.TeklifDurumID == "4") {
        return {
            classes: 'text-nowrap',
            css: { "background": "#c7f55c", "color": "#000" }
        };
    } else {
        return {
            classes: 'text-nowrap',
            css: { "background": "#ffffff", "color": "#000" }
        };
    }
}


