$('.CariBulSec').click(function () {
    var mdl = $('#mdlCarilerForm');
    mdl.modal('show');
});
$('#btnProjeKapat').click(function () {
    var mdl = $('#mdlProjeForm');
    mdl.modal('hide');
});

function oprtProje(value, row, index) {
    return [ 
        '<div>',
        ' <div class="btn-group">',
        ' <button type="button" class="btn btn-xs  btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        '<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        '  <span class="fa fa-caret-down"></span>',
        '   <span class="sr-only">Toggle Dropdown</span>',
        '  </button>',
        '  <ul class="dropdown-menu" role="menu">',
        ' <li><a href="#" id="btnProjeDuzenle"  data-toggle="tooltip" title="Proje Düzenle" data-placement="bottom"><i class="fa fa-exclamation" ></i>Düzenle</a></li>',
        ' <li><a href="#" id="btnProjeCikart"  data-toggle="tooltip" title="Proje Çıkart" data-placement="bottom"><i class="fa fa-exclamation" ></i>Çıkart</a></li>',
        ' </ul>',
        ' </div>', 
    ].join('');
}
window.oprtProjeEvent = {
    'click #btnProjeDuzenle': function (e, value, row, index) {
        $.get('/Proje/ProjeGetir?id=' + row.ID, function (data) {
            var cariform = $('#frmProje');
            populate(cariform, data[0]);
            var mdl = $('#mdlProjeForm');
            mdl.modal('show');
        },

            'json');
    },
    'click #btnProjeCikart': function (e, value, row, index) {
        var mdl = $('#mdlProjesilform');
        mdl.modal('show');
        psilid = row.ID;
    }
}
var psilid = 0;
$('#btnProjesil').click(function () {
    $.get('/Proje/ProjePasif?ID=' + psilid, function (data) {
    },
        'json');
    $('#table-Projeler').bootstrapTable('refreshOptions', { silent: true });
    psilid = 0;
});

$('#btnProjeiptal').click(function () {
    var mdl = $('#mdlProjesilform');
    mdl.modal('hide'); psilid = 0;
});

$('#BtnYeniProje').click(function () {
    $('#frmProje')[0].reset();
    var mdl = $('#mdlProjeForm');
    mdl.modal('show');
});

$('#btnProjeKaydet').click(function () {
    var dataToPost = $('#frmProje').serialize()
    $.ajax({
        type: 'POST',
        url: '/Proje/ProjeKaydet',
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
            $('#table-Projeler').bootstrapTable('refreshOptions', { silent: true }); 
        },
        error: function (result) {
            $('.modal').modal('hide');
            alert("hatalı!");
        }
    });
});


var yuklenencari = "";
//$('#ThpCmbCariGetir').typeahead(null, {
//    name: 'Cari-listesi',
//    displayKey: 'Name',
//    source: function (query, process) {
//        return $.get('/Cari/CariGetir', { searchTerm: query }, function (data) {
//            var matches = [];
//            $.each(data, function (i, str) { 
//                matches.push({ value: str });
//            });
//            return process(data);
//        },
//            'json');
//    },
//    templates: {
//        empty: [
//            '<div class="empty-message">',
//            '!!  Kayıt Bulunamadı !!',
//            '</div>'
//        ].join('\n'),
//        suggestion: Handlebars.compile('<div class="form-control" style="border:1px solid gray; width:600px;"><p><strong>{{Name}}</strong> – {{Code}} </p></hr></div>')
//    }
//});

//$('#ThpCmbCariGetir').bind('typeahead:selected', function (obj, datum, name) {
//    $('#CariID').val(datum.ID)
//});


