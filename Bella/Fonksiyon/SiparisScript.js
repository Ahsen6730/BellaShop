
function BtnSipButon(value, row, index) {
    return [
        '<div>',
        ' <div class="btn-group">',
        ' <button type="button" class="btn btn-xs  btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        '<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        '  <span class="fa fa-caret-down"></span>',
        '   <span class="sr-only">Toggle Dropdown</span>',
        '  </button>',
        '  <ul class="dropdown-menu" role="menu">',
        ' <li><a  id="BtnSipUrunEkle"  data-toggle="tooltip" title="Ürün Ekle" data-placement="bottom"><i class="fa fa-exclamation" ></i>Ürün Ekle</a></li>',
        ' <li><a  id="BtnSipDetay"  data-toggle="tooltip" title="Detay" data-placement="bottom"><i class="fa fa-pencil" ></i> Detay</a></li>',
        ' <li><a  id="BtnSipDepoOnay"  data-toggle="tooltip" title="Depo Onaya Gönder" data-placement="bottom"><i class="fa fa-pencil" ></i>Onaya Gönder</a></li>',
        ' <li><a id="BtnSipCikart"  data-toggle="tooltip" title="Sipariş Çıkart" data-placement="bottom"><i class="fa fa-pencil" ></i>Çıkart</a></li>',
        ' </ul>',
        ' </div>', 
    ].join('');
}
window.BtnSiparisEvent = {
    'click #BtnSipCikart': function (e, value, row, index) {
        //debugger;
        //var mdl = $('#mdlSiparissilform');
        //mdl.modal('show'); ssilid = row.ID;

        swal({
            title: "Sipariş İptal Edilecektir.",
            text: "Emin misiniz?",
            type: "warning",
            showCancelButton: true,
            cancelButtonClass: "btn-default",
            cancelButtonText: "Vazgeç",
            confirmButtonClass: "btn-warning",
            confirmButtonText: "Devam",
            closeOnConfirm: false
        },
            function () {
                $.get('/Siparis/SiparisPasif?id=' + row.ID, function (data) {
                    if (data.success) {
                        swal({
                            title: "Başarılı?",
                            text: "Sipariş Çıkartıldı...",
                            type: "success",
                            showCancelButton: false,
                            showConfirmButton: false,
                            closeOnConfirm: true,
                            timer: 2000,
                        })
                    }
                },
                    'json');
                $('#table-Siparisler').bootstrapTable('refreshOptions', { silent: true });
            });
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
var ssilid = 0;
$('#btnSiparissil').click(function () {
    $.get('/Siparis/SiparisPasif?id=' + ssilid, function (data) {
        if (data.success) {
            swal({
                title: "Başarılı?",
                text: "Sipariş Çıkartıldı...",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                closeOnConfirm: true,
                timer: 2000,
            })
        }
    },
        'json');


    $('#table-Siparisler').bootstrapTable('refreshOptions', { silent: true });
    ssilid = 0;
});

$('#btnSiparisiptal').click(function () {
    var mdl = $('#mdlSiparissilform');
    mdl.modal('hide'); ssilid = 0;
});

$('#BtnSiparisEkle').click(function () {
    $('#YeniSipForm')[0].reset();
    $.get('/Siparis/YeniSiparisNoGetir', function (data) {
        $('.SiparisCode').val(data);
    },
        'json');
    var mdl = $('#mdlYeniSipForm');
    mdl.modal('show');
});

$('#btnSiparisKaydet').click(function () {
    var dataToPost = $('#YeniSipForm').serialize()
    $.ajax({
        type: 'POST',
        url: '/Siparis/SiparisKaydet',
        data: dataToPost,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            $('.modal').modal('hide');
            swal({
                title: "Başarılı?",
                text: result.mesaji,
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                closeOnConfirm: true,
                timer: 2000,
            }) 
            $('#table_Siparisler').bootstrapTable('refreshOptions', { silent: true }); 
        },
        error: function (result) {
            $('.modal').modal('hide');
            alert("hatalı!");
        }
    });
});

var yuklenencari = "";
$('#ThpProjeAra').typeahead(null, {
    name: 'Proje-listesi',
    displayKey: 'Name',
    source: function (query, process) {
        return $.get('/Proje/ProjeAra', { searchTerm: query }, function (data) {
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
        suggestion: Handlebars.compile('<div class="form-control"><p><strong> Proje = {{Name}}</strong> – {{Code}} – Cari =  {{CariName}}</p></hr></div>')
    }
});


$('#ThpProjeAra').bind('typeahead:selected', function (obj, datum, name) {
    $('#ProjeID').val(datum.ID);
    $('#ProjeCode').val(datum.Code);
});
 
//SatinalmaKontrol
 
function SatSipKontrolButon(value, row, index) {
    return [
        '<div>',
        ' <div class="btn-group">',
        ' <button type="button" class="btn btn-xs  btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        '<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        '  <span class="fa fa-caret-down"></span>',
        '   <span class="sr-only">Toggle Dropdown</span>',
        '  </button>',
        '  <ul class="dropdown-menu" role="menu">',
        ' <li><a  id="SipKontrolBtn"  data-toggle="tooltip" title="Satınalma Siparişi Oluştur" data-placement="bottom"><i class="fa fa-exclamation" ></i>Satınalma Siparişi Oluştur</a></li>',
        ' <li><a  id="SipDetayBtn"  data-toggle="tooltip" title="Satınalma Siparişi Oluştur" data-placement="bottom"><i class="fa fa-exclamation" ></i>Detay</a></li>',
        ' </ul>',
        ' </div>', 
    ].join('');
}
window.SipKonevent = {
    'click #SipKontrolBtn': function (e, value, row, index) {
        $('#tblSatSipEkle').bootstrapTable('refreshOptions', { url: "/Siparis/SatinalmaSipListOlusturmaGetir?ID=" + row.SipID });
        var mdl = $('#mdlSatinalmaSipForm');
        mdl.modal('show');
        $('#SiparisID').val(row.SipID);
    },
    'click #SipDetayBtn': function (e, value, row, index) {
        // window.location.replace('/Depo/KontrolEt?SiparisID=' + row.ID);
    },
}
$('#btnSapSipKaydet').click(function () {
    $('#tblMalzemeler').bootstrapTable('uncheckAll');
    $('#tblMalzemeler tr').removeAttr('class');
    if (secilenler.length > -1) {
        $.ajax({
            type: "Post",
            url: "/Siparis/SatSipOlustur?data=" + JSON.stringify(secilenler) +
            '&SiparisID=' + $("#frmSatSipFrm input[id=SiparisID]").val() +
            '&CariID=' + $("#frmSatSipFrm input[id=CariID]").val(),

            success: function (data) {
                if (data.success) {
                    $('#ThpCmbCariGetir').val(null);
                    $('#ThpCmbCariAdi').val(null);
                    $('#CariID').val(null);
                    $.get('/Siparis/SatinalmaSipListOlusturmaGetir?limit=10&offset=0&ID=' + $("#frmSatSipFrm input[id=SiparisID]").val(), function (data) {
                        debugger;
                        if (data.total == 0) {
                            $('.modal').modal('hide');
                            $('#tableSipKontrol').bootstrapTable('refreshOptions', { url: "/Siparis/SipDepoKontrolGetir?limit=100&offset=0" });
                        }
                        else {
                            $('#tblSatSipEkle').bootstrapTable('refreshOptions', { silent: true });
                        }

                    }, 
                        'json'); 
                }
            },
            error: function (data) {
                MesajGoster("Hatalı İşlem Oluştu");
            }
        });
        secilenler = [];
    }
});

var secilenler = [];
$('#tblSatSipEkle').bootstrapTable(
    {
        onClick: function (e, row, $element) {
            $('.success').removeClass('success');
            $($element).addClass('success');
        },
        onCheck: function (row, el, pp) {
            secilenler.push(row.UrunID);
            $(el).addClass('success');
        },
        onUncheck: function (row, el, pp) {
            var index = secilenler.indexOf(row.UrunID);
            secilenler.splice(index, 1);
            $(el).removeClass('success');
        },
        onLoadSuccess: function (data) {
            for (var i = 0; i < secilenler.length; i++) {
                var x = $('#tblSatSipEkle').bootstrapTable('getRowByUniqueId', secilenler[i]);
                if (x != null) {
                    x.state = true;
                    $('#tblSatSipEkle').bootstrapTable('updateByUniqueId', [secilenler[i], x]);
                }
            }
        }
    });

// Satınalma işlemleri

function SatinalmaButon(value, row, index) {
    return [
        '<div>',
        ' <div class="btn-group">',
        ' <button type="button" class="btn btn-xs  btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        '<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        '  <span class="fa fa-caret-down"></span>',
        '   <span class="sr-only">Toggle Dropdown</span>',
        '  </button>',
        '  <ul class="dropdown-menu" role="menu">',
        ' <li><a  id="SatinalmaDetayBtn"  data-toggle="tooltip" title="Satınalma Siparişi Oluştur" data-placement="bottom"><i class="fa fa-exclamation" ></i>Detay</a></li>',
        ' </ul>',
        ' </div>', 
    ].join('');
}
window.SatKonevent = {
    'click #SatinalmaDetayBtn': function (e, value, row, index) {
        $('#tblSatinalmaUrunlist').bootstrapTable('refreshOptions', { url: "/Siparis/SatinalmaUrunListGetir?ID=" + row.ID });
        var mdl = $('#mdlSatinalmaListForm');
        mdl.modal('show');
    },
}