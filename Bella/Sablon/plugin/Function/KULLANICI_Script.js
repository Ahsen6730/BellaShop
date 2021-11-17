function oprtKullanici(value, row, index) {
    return [
        '<button id="btnKullaniciDuzenle" class="btn btn-default waves-effect waves-light btn-xs"><i class="fa fa-edit"></i> </button>'
        //'<div>',
        //' <div class="btn-group">',
        //' <button type="button" class="btn btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        //'<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        //'  <span class="fa fa-caret-down"></span>',
        //'   <span class="sr-only">Toggle Dropdown</span>',
        //'  </button>',
        //'  <ul class="dropdown-menu" role="menu">',
        //' <li><a  id="btnKullaniciDuzenle"  data-toggle="tooltip" title="Kullanici Düzenle" data-placement="bottom"><i class="fa fa-exclamation" ></i>Düzenle</a></li>',
        //' </ul>',
        //' </div>',

    ].join('');
}
window.oprtKullaniciEvent = {
    'click #btnKullaniciDuzenle': function (e, value, row, index) {
         $.get('/Kullanici/KullaniciAra?id=' + row.ID, function (data) {
             var Kullaniciform = $('#frmKullanici');
            populate(Kullaniciform, data[0]);
            var mdl = $('#mdlKullaniciForm');
            mdl.modal('show');
        },
            'json');
    }

}
var csilid = 0;
$('#btnKullanicisil').click(function () {
    $.get('/Kullanici/KullaniciPasif?ID=' + row.ID, function (data) {
    },
        'json');
    $('#table-Kullaniciler').bootstrapTable('refreshOptions', { silent: true }); csilid = 0;
});

$('#btnKullaniciiptal').click(function () {
    var mdl = $('#mdlKullanicisilform');
    mdl.modal('hide'); csilid = 0;
});

$('#btnYeniKullanici').click(function () {
    $('#frmKullanici')[0].reset();
    var mdl = $('#mdlKullaniciForm');
    mdl.modal('show');
    $('.KullaniciGuncelIDSi').val(0);
});

$('#btnKullaniciKaydet').click(function () {
    var dataToPost = $('#frmKullanici').serialize()
    $.ajax({
        type: 'POST',
        url: '/Kullanici/KullaniciKaydet',
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

            KullaniciTableGuncelle();


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

function KullaniciTableGuncelle() {
    $('#table-Kullanici').bootstrapTable('refreshOptions', { silent: true });
}