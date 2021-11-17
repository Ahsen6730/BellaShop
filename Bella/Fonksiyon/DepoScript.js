function oprtdepokontrol(value, row, index) {
    return [
        '<div>',
        ' <div class="btn-group">',
        ' <button type="button" class="btn btn-xs  btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        '<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        '  <span class="fa fa-caret-down"></span>',
        '   <span class="sr-only">Toggle Dropdown</span>',
        '  </button>',
        '  <ul class="dropdown-menu" role="menu">',
        ' <li><a href="#" id="DepoKontrolBtn"  data-toggle="tooltip" title="Ürünleri Kontrol Et" data-placement="bottom"><i class="fa fa-exclamation" ></i> Kontrol Et</a></li>',
        ' </ul>',
        ' </div>',
     ].join('');
}
window.oprtdepokontrolevent = {
    'click #DepoKontrolBtn': function (e, value, row, index) {
        window.location.replace('/Depo/KontrolEt?SiparisID=' + row.ID);
    },
}

// Sipariş Kabul Bölümü

function MalKabulSatinalmaButon(value, row, index) {
    return [
        '<div>',
        ' <div class="btn-group">',
        ' <button type="button" class="btn btn-xs  btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        '<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        '  <span class="fa fa-caret-down"></span>',
        '   <span class="sr-only">Toggle Dropdown</span>',
        '  </button>',
        '  <ul class="dropdown-menu" role="menu">',
        ' <li><a  id="BtnMalKabulUrunEkle"  data-toggle="tooltip" title="Ürün Ekle" data-placement="bottom"><i class="fa fa-exclamation" ></i>Kontrol</a></li>',
        ' </ul>',
        ' </div>',
    ].join('');
}
window.MalKabulSipKonevent = {
     'click #BtnMalKabulUrunEkle': function (e, value, row, index) {
         window.location.replace('/Depo/UrunKabul?SiparisID=' + row.SipID + '&satid=' + row.ID);
    },
}

// Mal Kabul Bölümü

function MalKabulButon(value, row, index) {
    return [
        '<div>',
        ' <div class="btn-group">',
        ' <button type="button" class="btn btn-xs  btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        '<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        '  <span class="fa fa-caret-down"></span>',
        '   <span class="sr-only">Toggle Dropdown</span>',
        '  </button>',
        '  <ul class="dropdown-menu" role="menu">',
        ' <li><a  id="BtnMalKabulUrunEkle"  data-toggle="tooltip" title="Ürün Ekle" data-placement="bottom"><i class="fa fa-exclamation" ></i>Ürün Ekle Çıkar</a></li>',
        ' </ul>',
        ' </div>',
    ].join('');
}
window.MalKabulEvent = { 
    'click #BtnMalKabulUrunEkle': function (e, value, row, index) {
        $('#tblMalKabulUrunEkleEkle').bootstrapTable('refreshOptions', { url: "/Depo/MalKabulKalemGetir?ID=" + row.ID });
        var mdl = $('#mdlMalKabulUrunEkleForm');
        mdl.modal('show');
        $('#HareketID').val(row.ID); 
    }, 
}

// ürün getir

var yukelenenUrun = "";
$('#ThpUrunGetir').typeahead(null, {
    name: 'Urun-listesi',
    displayKey: 'Aciklama',
    source: function (query, process) {
        return $.get('/Urun/UrunGetir', { searchTerm: query }, function (data) {
            debugger;
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
        suggestion: Handlebars.compile('<div class="form-control" style="border:1px solid gray; width:800px;"><p>{{Code}}<strong>{{Aciklama}}</strong> – {{Tip}} - {{Marka}} </p></hr></div>')
    }
});
$('#ThpUrunGetir').bind('typeahead:selected', function (obj, datum, name) {
    $('#UrunID').val(datum.ID)
});



$('#btnMkUrunEkle').click(function () {
    var a = $('#Adet2').val();
    var b = $('#HareketID').val();
    var c = $('#UrunID').val();
    $('#Adet').val(a);
    var dataToPost = $('#frmMalKabulUrunEkleFrm').serialize()
    $.ajax({
        type: 'POST',
        url: '/Depo/MalKabulKalemKaydet',
        data: dataToPost,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) { 
            swal({
                title: "Başarılı?",
                text: result.mesaji,
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                closeOnConfirm: true,
                timer: 2000,
            }) 
            $('#tblMalKabulUrunEkleEkle').bootstrapTable('refreshOptions', { silent: true });
        },
        error: function (result) {
            $('.modal').modal('hide');
            alert("hatalı!");
        }
    });
});

$('#btnYeniTransferEkle').click(function () {
    var mdl = $('#mdlYeniTransferEkle');
    mdl.modal('show');
});
 
$('#btnYeniTransferKaydet').click(function () {
    var kaynak = $('#kaynakambar').val();
    var hedef = $('#hedefambar').val();
    var hedef1 = $('#HedefGetir').val();
    var kaynagi = $('#KaynakGetir').val();
    var tarih = $('#frmTarih').val();
    var transferno = $('#TransferNo').val();
     
    $.ajax({
        type: 'POST',
        url: '/Depo/YeniTransferKaydet?hedefID=' + hedef + '&KaynakID=' + kaynak + '&TransferNo=' + transferno + '&Tarih=' + tarih,
        success: function (result) {
            var mdl = $('#mdlYeniTransferEkle');
            mdl.modal('hide');
            swal({
                title: "Başarılı?",
                text: result.mesaji,
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                closeOnConfirm: true,
                timer: 2000,
            }) 
        },
        error: function (result) {
            $('.modal').modal('hide');
            alert("hatalı!");
        }
    });
});
 
// transfer
 
function TransferButon(value, row, index) {
    return [
        '<div>',
        ' <div class="btn-group">',
        ' <button type="button" class="btn btn-xs  btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        '<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        '  <span class="fa fa-caret-down"></span>',
        '   <span class="sr-only">Toggle Dropdown</span>',
        '  </button>',
        '  <ul class="dropdown-menu" role="menu">',
        ' <li><a  id="BtnTransferUrunEkle"  data-toggle="tooltip" title="Ürün Ekle" data-placement="bottom"><i class="fa fa-exclamation" ></i>Ürün Ekle Çıkar</a></li>',
        ' </ul>',
        ' </div>',
    ].join('');
}
window.Transferevent = {

    'click #BtnTransferUrunEkle': function (e, value, row, index) {
        $('#tblTransferSiparisAktarEkle').bootstrapTable('refreshOptions', { url: "/Depo/MalKabulKalemGetir?ID=" + row.ID });
        var mdl = $('#mdlTransferSiparisAktarForm');
        mdl.modal('show');
        $('#HareketID').val(row.ID);
        //$('#HareketID').val(row.ID);
        //$('#SiparisID').val(row.SipID);mdlTransferSiparisAktarForm
    },
}

$('.SiparisBul').typeahead(null, {
    name: 'Urun-listesi',
    displayKey: 'SiparisCode',
    source: function (query, process) {
        return $.get('/Siparis/SiparisGetir', { searchTerm: query }, function (data) {
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
        suggestion: Handlebars.compile('<div class="form-control" style="width:600px;"><p><strong> {{SiparisCode}}</strong> –  {{CariName}} - <strong> {{ProjeName}}</strong> - {{PROJECODE}}</p></div>')
    }
});

$('.SiparisBul').bind('typeahead:selected', function (obj, datum, name) {
    $('#SiparisProjeName').val(datum.ProjeName + " / " + datu.CariName)
    $('#SiparisID').val(datum.ID)
});
 
$('.HedefGetir').typeahead(null, {
    name: 'Urun-listesi',
    displayKey: 'DepoCode',
    source: function (query, process) {
        return $.get('/Depo/PanoGetir', { searchTerm: query }, function (data) {
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
        suggestion: Handlebars.compile('<div class="form-control" style="width:600px;">  <p><strong> {{PanoName}}</strong> –  {{DepoCode}} - <strong>{{ProjeName}}</strong> - {{PROJECODE}}</p></div>')
    }
});

$('.HedefGetir').bind('typeahead:selected', function (obj, datum, name) {
    $('#HedefDepoName').val(datum.PanoName)
    $('#HedefID').val(datum.ID)
});
 
$('.KaynakGetir').typeahead(null, {
    name: 'Urun-listesi',
    displayKey: 'DepoCode',
    source: function (query, process) {
        return $.get('/Depo/PanoGetir', { searchTerm: query }, function (data) {
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
        suggestion: Handlebars.compile('<div class="form-control" style="width:600px;"><p><strong> {{PanoName}}</strong> –  {{DepoCode}} - <strong> {{ProjeName}}</strong> - {{PROJECODE}}</p></div>')
    }
});

$('.KaynakGetir').bind('typeahead:selected', function (obj, datum, name) {
    $('#KaynakDepoName').val(datum.PanoName)
    $('#KaynakID').val(datum.ID)
});
 
$('#TransferAcBtn').click(function () {
    var a = $('#HedefID').val();
    var b = $('#KaynakID').val();
    var c = $('#SiparisID').val();
    $.ajax({
        type: 'POST',
        url: '/Depo/TransferKaydet?hedef=' + a + "&kaynak=" + b + "&SiparisID=" + c,
        data: a, b,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            $('.modal').modal('hide');
            swal({
                title: result.baslik,
                text: result.mesaji,
                type: result.tipi,
                showCancelButton: false,
                showConfirmButton: false,
                closeOnConfirm: true,
                timer: 2000,
            })
        },
        error: function (result) {
            $('.modal').modal('hide');
            swal({
                title: "Uyarı?",
                text: result.mesaji,
                type: "warning",
                showCancelButton: false,
                showConfirmButton: false,
                closeOnConfirm: true,
                timer: 2000,
            })
        }
    });
});

$('#btntransferUrunEkle').click(function () {
    var a = $('#Adet2').val();
    var b = $('#HareketID').val();
    var c = $('#UrunID').val();
    $('#Adet').val(a); 
    var dataToPost = $('#frmTransferSiparisAktarFrm').serialize();
    $.ajax({
        type: 'POST',
        url: '/Depo/TransferKalemKaydet',
        data: dataToPost,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            swal({
                title: "Başarılı?",
                text: result.mesaji,
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                closeOnConfirm: true,
                timer: 1000,
            })

            $('#tblTransferSiparisAktarEkle').bootstrapTable('refreshOptions', { silent: true });
        },
        error: function (result) {
            $('.modal').modal('hide');
            alert("hatalı!");
        }
    });
});
 
// Transfer detay
 
$('#hedefsec').hide();
$('#btnFormKaydet').hide();
function HedefDoldur(obj_id, kid, tip) {
    $.get('/Depo/HedefDoldur?id=' + kid + '&tip=' + tip, function (resultl) {
        var option_list = resultl;
        $('#' + obj_id).empty();
        $('#' + obj_id).append(
            $("<option></option>").attr(
                "value", "1").text("-- Ana Depo --")
        );
        for (var i = 0; i < option_list.length; i++) {
            $('#' + obj_id).append(
                $("<option></option>").attr(
                    "value", option_list[i]["ID"]).text(option_list[i]["PanoName"])
            );
        };
    });
}
 
$('#frmTarih').datetimepicker({
    language: 'tr', weekStart: 1, todayBtn: 1, autoclose: 1,
    todayHighlight: 1, startView: 2, minView: 2, forceParse: 0
    , defaultDate: new Date()
});


$('#HedefGetir').typeahead(null, {
    name: 'Urun-listesi',
    displayKey: 'PanoName',
    source: function (query, process) {
        return $.get('/Depo/PanoGetir', { searchTerm: query }, function (data) {
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
        suggestion: Handlebars.compile('<div class="form-control" style="width:600px;">  <p><strong> {{PanoName}}</strong> –  {{DepoCode}} - <strong>{{ProjeName}}</strong> - {{PROJECODE}}</p></div>')
    }
});
 
$('#HedefGetir').bind('typeahead:selected', function (obj, datum, name) {
    $('#hedefambar').val(datum.ID)
});

$('#KaynakGetir').typeahead(null, {
    name: 'Urun-listesi',
    displayKey: 'PanoName',
    source: function (query, process) {
        return $.get('/Depo/PanoGetir', { searchTerm: query }, function (data) {
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
        suggestion: Handlebars.compile('<div class="form-control" style="width:600px;"><p><strong> {{PanoName}}</strong> –  {{DepoCode}} - <strong> {{ProjeName}}</strong> - {{PROJECODE}}</p></div>')
    }
});
 
$('#KaynakGetir').bind('typeahead:selected', function (obj, datum, name) {
    $('#kaynakambar').val(datum.ID)
    if (datum.ID == 1) {
        $('#hedefambar').val(0);
        $('#HedefGetir').val('');
        $('#hedefsec').hide();
        $('#hedefyaz').show(); 
    }
    else {
        $('#hedefambar').val(1)
        $('#hedefyaz').hide(); 
        $('#hedefsec').show(); 
        HedefDoldur('HedefAmbari', datum.Anadepo, datum.Tip); 
    }
});
 
$('#HedefAmbari').change(function () {
    var deger = $(this).find(":selected").val();
    $('#hedefambar').val(deger)
});

$('#DepoBul1').click(function () {
    var mdl = $('#mdlKaynakAmbar');
    mdl.modal('show');
});
$('#DepoBul2').click(function () {
    var mdl = $('#mdlHedefAmbar');
    mdl.modal('show');
});
 
function BtnSipButon(value, row, index) {
    return [
        '<div>',
        '<a id="btnSiparisUrun" class="btn btn-xs  btn-info btn-sm waves-effect waves-light " title="Ürünler">Ürünler</a>&nbsp;',
        '<a class="btn btn-success btn-sm " title="Ürünler">Seç</a>',
        ' </div>',
     ].join('');
}
window.BtnSiparisEvent = {
    'click #btnSiparisUrun': function (e, value, row, index) {
        var mdl = $('#mdlSiparisUrun');
        $('#SiparisUrunleri').html('<div class="alert alert-warning">İşleniyor...</div >');
        mdl.modal('show');
        $.get('/Siparis/Detay1?SiparisID=' + row.ID, function (data) { 
            $('#SiparisUrunleri').html(data);
             $('.tree').treegrid({
                expanderExpandedClass: 'glyphicon glyphicon-minus',
                expanderCollapsedClass: 'glyphicon glyphicon-plus' 
            });
            $('.tree').treegrid('collapseAll'); 
        })
     },
    'click #BtnSipUrunEkle': function (e, value, row, index) {
        window.location.replace('/Siparis/UrunEkle?SiparisID=' + row.ID);
    },
    'click #BtnSipDetay': function (e, value, row, index) {
        window.location.replace('/Siparis/Detay?SiparisID=' + row.ID);
    },
    'click #BtnSipDepoOnay': function (e, value, row, index) {
        $.get('/Siparis/DepoyaGonder?SiparisID=' + row.ID, function (data) {
            if (data.success) {
                swal({
                    title: "Başarılı?",
                    text: "Depoya Onaya Gönderildi..",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    closeOnConfirm: true,
                    timer: 2000,
                })
            } 
        })
    }
}

$('#btnUrunleriGetir').click(function () {
    $('#btnFormKaydet').hide();
    var kaynak = $('#kaynakambar').val();
    var hedef = $('#hedefambar').val();
    var hedef1 = $('#HedefGetir').val();
    var kaynagi = $('#KaynakGetir').val();
    var a = kaynagi.length;
    var b = hedef1.length;

    if (a == 0) {
        $('#UrunListesi').html('');
        $('#uyari').html('<div class="alert alert-danger"><strong> Dikkat!</strong > Kaynak ambar seçilmedi.</div >')
    }
    else if (kaynak == 1 && b == 0) {
        $('#UrunListesi').html('');
        $('#uyari').html('<div class="alert alert-danger"><strong> Dikkat!</strong > Hedef ambar seçilmedi.</div >')
    }
    else if (kaynak == hedef) {
        $('#UrunListesi').html('');
        $('#uyari').html('<div class="alert alert-danger"><strong> Dikkat!</strong >Hedef ile kaynak aynı olamaz.</div >')
    }
    else if (hedef == 0) {
        $('#UrunListesi').html('');
        $('#uyari').html('<div class="alert alert-danger"><strong> Dikkat!</strong > Hedef ambar seçilmedi.</div >')
    }
    else {
        $('#uyari').html('')

        $.get('/Depo/UrunKabul1?depoid=' + hedef, function (data) {
            $('#UrunListesi').html(data);
        })
        $('#btnFormKaydet').show();
    }
});

$('#btnFormKaydet').click(function () {
     var kaynak = $('#kaynakambar').val();
    var hedef = $('#hedefambar').val();
    var hedef1 = $('#HedefGetir').val();
    var kaynagi = $('#KaynakGetir').val();
    var tarih = $('#frmTarih').val();
    var transferno = $('#TransferNo').val();
    var a = kaynagi.length;
    var b = hedef1.length;

    if (a == 0) {
        $('#btnFormKaydet').hide();
        $('#UrunListesi').html('');
        $('#uyari').html('<div class="alert alert-danger"><strong> Dikkat!</strong > Kaynak ambar seçilmedi.</div >')
    }
    else if (kaynak == 1 && b == 0) {
        $('#btnFormKaydet').hide();
        $('#UrunListesi').html('');
        $('#uyari').html('<div class="alert alert-danger"><strong> Dikkat!</strong > Hedef ambar seçilmedi.</div >')
    }
    else if (kaynak == hedef) {
        $('#btnFormKaydet').hide();
        $('#uyari').html('<div class="alert alert-danger"><strong> Dikkat!</strong >Hedef ile kaynak aynı olamaz.</div >')
    }
    else if (hedef == 0) {
        $('#btnFormKaydet').hide();
        $('#UrunListesi').html('');
        $('#uyari').html('<div class="alert alert-danger"><strong> Dikkat!</strong > Hedef ambar seçilmedi.</div >')
    }
    else {
        $('#uyari').html('')
        var ar = [];
        var irsaliye = $('#irsaliye').val();
        $("#myForm tbody tr:nth-child(n+1)").each(function () {
            rowData = $(this).find('input, select, textarea,checkbox').serializeArray();
            var rowAr = {};
            $.each(rowData, function (e, v) {
                rowAr[v['name']] = v['value'];
            });
            ar.push(rowAr);
        });
        var item = ar.filter(a => a.checkbox == "0")
        if (item.length > 0) {
            var postData = JSON.stringify(item)
            $.ajax({
                type: "Post",
                url: "/Depo/SiparisTransferKalem",
                data: JSON.stringify({ 'data': postData, 'hedefID': hedef, 'KaynakID': kaynak, 'TransferNo': transferno, 'Tarih': tarih }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                },
                error: function (data) {
                    swal({
                        title: 'Hata',
                        text: 'İşlem hatalı controller kontrol',
                        type: 'warning',
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: true,
                        timer: 2000,
                    })
                }
            });
        }
        else {
            var postData = JSON.stringify(ar)
            $.ajax({
                type: "Post",
                url: "/Depo/SiparisTransferKalem",
                data: JSON.stringify({ 'data': postData, 'hedefID': hedef, 'KaynakID': kaynak, 'TransferNo': transferno, 'Tarih': tarih }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                },
                error: function (data) {
                    swal({
                        title: 'Hata',
                        text: 'İşlem hatalı controller kontrol',
                        type: 'warning',
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnConfirm: true,
                        timer: 2000,
                    })
                }
            });
        }
    }
});

// Ürün Kabul
 
$(document).ready(function () {
    //$('#example').DataTable();
});
 
$("#test").on("click", function () {
    var ar = [];
    var irsaliye = $('#irsaliye').val();
    $("#myForm tbody tr:nth-child(n+1)").each(function () {
        debugger
        rowData = $(this).find('input, select, textarea,checkbox').serializeArray();
        debugger
        var rowAr = {};
        $.each(rowData, function (e, v) {
            rowAr[v['name']] = v['value'];
        });
        ar.push(rowAr);
    });
    var item = ar.filter(a => a.checkbox == "0")
    if (item.length > 0) {
        var postData = JSON.stringify(item);
        $.ajax({
            type: "Post",
            url: "/Depo/UrunKabul",
            data: JSON.stringify({ 'data': postData, 'irsaliye': irsaliye }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",

            success: function (data) {
                location.reload()
            },
            error: function (data) {
                MesajGoster("Hatalı İşlem Oluştu");
            }
        });
    }
    else {
        var postData = JSON.stringify(ar);
        $.ajax({
            type: "Post",
            url: "/Depo/UrunKabul",
            data: JSON.stringify({ 'data': postData, 'irsaliye': irsaliye }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.success) {
                    location.reload()
                }
            },
            error: function (data) {
                MesajGoster("Hatalı İşlem Oluştu");
            }
        });
    }
});


