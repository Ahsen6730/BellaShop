function oprtModul(value, row, index) {
    return [
        '<button id="btnModulDuzenle" class="btn btn-default waves-effect waves-light btn-xs"><i class="fa fa-edit"></i> </button>'
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
    'click #btnModulDuzenle': function (e, value, row, index) {
         $.get('/Ayarlar/ModulAra?id=' + row.ID, function (data) {
             var Modulform = $('#frmModul');
            populate(Modulform, data[0]);
            var mdl = $('#mdlModulForm');
            mdl.modal('show');
        },
            'json');
    }
}
var csilid = 0;
$('#btnModulsil').click(function () {
    $.get('/Ayarlar/ModulPasif?ID=' + row.ID, function (data) {
    },
        'json');
    $('#table-Moduller').bootstrapTable('refreshOptions', { silent: true }); csilid = 0;
});

$('#btnModuliptal').click(function () {
    var mdl = $('#mdlModulsilform');
    mdl.modal('hide'); csilid = 0;
});

$('#btnYeniModul').click(function () {
    $('#frmModul')[0].reset();
    var mdl = $('#mdlModulForm');
    mdl.modal('show');
    $('.ModulGuncelIDSi').val(0);
});

$('#btnModulKaydet').click(function () {
    var dataToPost = $('#frmModul').serialize()
    $.ajax({
        type: 'POST',
        url: '/Ayarlar/ModulKaydet',
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
            ModulTableGuncelle();
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

function ModulTableGuncelle() {
    $('#table-Modul').bootstrapTable('refreshOptions', { silent: true });
}