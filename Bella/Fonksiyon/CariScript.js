function oprtCari(value, row, index) {
    return [
         '<div>', 
        ' <a href="#" class="btn btn-default btn-xs" id="btnCariDuzenle"  data-toggle="tooltip" title="Cari Detay" data-placement="bottom"><i class="fa fa-check" ></i></a> ', 
     ].join('');
}
window.oprtCariEvent = {
    'click #btnCariDuzenle': function (e, value, row, index) {
        $.get('/Cari/Cariara?id=' + row.ID, function (data) {
            var cariform = $('#frmCari');
            populate(cariform, data[0]);
            var mdl = $('#mdlCariForm');
            mdl.modal('show'); 
        }, 
            'json');
    },
    'click #btnCariCikart': function (e, value, row, index) {
        var mdl = $('#mdlCarisilform');
        mdl.modal('show'); csilid = row.ID;
        $.get('/Cari/CariPasif?ID=' + row.ID, function (data) {
        },
            'json');
        $('#table-Cariler').bootstrapTable('refreshOptions', { silent: true });
    } 
}
var csilid = 0;
$('#btnCarisil').click(function () {
    $.get('/Cari/CariPasif?ID=' + row.ID, function (data) {
    },
        'json');
    $('#table-Cariler').bootstrapTable('refreshOptions', { silent: true }); csilid = 0;
});

$('#btnCariiptal').click(function () {
    var mdl = $('#mdlCarisilform');
    mdl.modal('hide'); csilid = 0;
});

$('#btnYeniCari').click(function () {
    $('#frmCari')[0].reset();
    var mdl = $('#mdlCariForm');
    mdl.modal('show');
    $('.CariGuncelIDSi').val(0);
});

$('#btnCariKaydet').click(function () {
    var dataToPost = $('#frmCari').serialize()
    $.ajax({
        type: 'POST',
        url: '/Cari/CariKaydet',
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
            $('#table-Cariler').bootstrapTable('refreshOptions', { silent: true }); 
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