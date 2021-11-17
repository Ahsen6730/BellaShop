

$("#table_BekleyenTahsilatGetir").on("click-cell.bs.table", function (field, value, row, $el) {
    if ($el.FATREF != 0 && value != "operate") {
        var FATREF = $el.FATREF;
        FaturaSatirlariGetir(FATREF);
        var mdl = $('#mdlTahsilatFaturaSatirlariForm');
        mdl.modal('show');
    }  
});
$("#table_BekleyenOdemeGetir").on("click-cell.bs.table", function (field, value, row, $el) {
    if ($el.FATREF != 0 && value != "operate") {
        var FATREF = $el.FATREF;
        FaturaSatirlariGetir(FATREF);
        var mdl = $('#mdlTahsilatFaturaSatirlariForm');
        mdl.modal('show');
    }
});
function oprtModul(value, row, index) {
    return [
        '<button id="btnVadeDuzenle" class="btn btn-default waves-effect waves-light btn-xs"><i class="fa fa-edit"></i> </button>'
        //'<div>',
        //' <div class="btn-group">',
        //' <button type="button" class="btn btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        //'<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        //'  <span class="fa fa-caret-down"></span>',
        //'   <span class="sr-only">Toggle Dropdown</span>',
        //'  </button>',
        //'  <ul class="dropdown-menu" role="menu">',
        //' <li><a  id="btnModulDuzenle"  data-toggle="tooltip" title="Modul Düzenle" data-placement="bottom"><i class="fa fa-exclamation" ></i>Düzenle</a></li>',
        //' </ul>',
        //' </div>',

    ].join('');
}
window.oprtModulEvent = {
    'click #btnVadeDuzenle': function (e, value, row, index) {
        $('.VW_FATURA_VADE_REF').val(row.FATREF);
        $('.CARI_ACIKLAMA').val(row.CARI_ACIKLAMA);
        var mdl = $('#mdlVadeForm');
        mdl.modal('show');
    }
}

$('#btnVadeKaydet').click(function () {
    debugger;
    var dataToPost = $('#frmVade').serialize()
    $.ajax({
        type: 'POST',
        url: '/Fatura/FatVadeKaydet',
        data: dataToPost,
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
            VadeTableGuncelle();
            FaturalarTableGuncelle();
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

$('#btnYeniSorguSatirlar').click(function () {
    var bitarih = $('.bitarih').val();
    var batarih = $('.batarih').val();

    $.ajax({
        type: 'POST',
        url: '/Fatura/TarihBelirle?BaTarih=' + batarih + '&BiTarih=' + bitarih,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            VadeTableGuncelle();
        },
        error: function (result) {
        }
    });
});
$('#btnYeniSorguFaturalar').click(function () {
    var bitarih = $('.bitarih').val();
    var batarih = $('.batarih').val();

    $.ajax({
        type: 'POST',
        url: '/Fatura/TarihBelirle?BaTarih=' + batarih + '&BiTarih=' + bitarih,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            FaturalarTableGuncelle();
        },
        error: function (result) {
        }
    });
});
$('#btnYeniSorguBekTahsilat').click(function () {
    var bitarih = $('.bitarih').val();
    var batarih = $('.batarih').val();

    $.ajax({
        type: 'POST',
        url: '/Fatura/TarihBelirle?BaTarih=' + batarih + '&BiTarih=' + bitarih,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            tahsilat_table();
        },
        error: function (result) {
        }
    });
});

$('#btnYeniSorguBekOdeme').click(function () {
    var bitarih = $('.bitarih').val();
    var batarih = $('.batarih').val();

    $.ajax({
        type: 'POST',
        url: '/Fatura/TarihBelirle?BaTarih=' + batarih + '&BiTarih=' + bitarih,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (result) {
            Odeme_table();
        },
        error: function (result) {
        }
    });
});


function VadeTableGuncelle() {
    $('#table-Fat_Vade').bootstrapTable('refreshOptions', { silent: true });
}
function tahsilat_table() {
    $('#table_BekleyenTahsilatGetir').bootstrapTable('refreshOptions', { silent: true });
}
function Odeme_table() {
    $('#table_BekleyenOdemeGetir').bootstrapTable('refreshOptions', { silent: true });
}
function FaturalarTableGuncelle() {
    $('#table-Faturalar').bootstrapTable('refreshOptions', { silent: true });
}
function FaturaSatirlariGetir(FATREF) {
    $('#table-TahsilatFaturaSatirlari').bootstrapTable('refreshOptions', { url: "/Finans/FaturaSatirlariGetir?fatref=" + FATREF  });
}

function CounterBaslat() {
    $('.counter').counterUp({
        delay: 100,
        time: 1200
    });
    $(".knob").knob();
};

$(document).ready(function ($) {
    CounterBaslat();




});

$('#btnFatura_Toplam_KarlilikExcel').click(function () {
    window.location.replace('/Fatura/ExcelAktar?id=' + 1);
});

$('#btnFatura_Urun_KarlilikExcel').click(function () {
    window.location.replace('/Fatura/ExcelAktar?id=' + 2);
});

$('#btnFatura_Temsilci_KarlilikExcel').click(function () {
    window.location.replace('/Fatura/ExcelAktar?id=' + 3);
});



