
//$('#field-5').typeahead(null, {
//    name: 'Urun-listesi',
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
//        suggestion: Handlebars.compile('<div class="form-control" style="border:1px solid gray; width:400px;"><p><strong>{{Name}}</strong> – {{Code}} </p></hr></div>')
//    }
//});
//$('#field-5').bind('typeahead:selected', function (obj, datum, name) {
//    $('#CariID').val(datum.ID)
//});

function OprtUrun(value, row, index) {
    return [ 
        '<div>',
        ' <div class="btn-group">',
        ' <button type="button" class="btn btn-xs  btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        '<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        '  <span class="fa fa-caret-down"></span>',
        '   <span class="sr-only">Toggle Dropdown</span>',
        '  </button>',
        '  <ul class="dropdown-menu" role="menu">',
        //' <li><a  id="BtnDagilimRaporu"  data-toggle="tooltip" title="Ürün Dağılım Raporu" data-placement="bottom"><i class="fa fa-exclamation" ></i>Dağılım Raporu</a></li>',
        ' <li><a id="btnUrunDuzenle"  data-toggle="tooltip" title="Ürün Düzenle" data-placement="bottom"><i class="fa fa-exclamation" ></i>Düzenle</a></li>',
        //' <li><a  id="btnUrunCikart"  data-toggle="tooltip" title="Ürün Çıkart" data-placement="bottom"><i class="fa fa-exclamation" ></i>Çıkart</a></li>',
         ' </ul>',
        ' </div>', 
    ].join('');
}
window.oprtUrunEvent = {
    'click #btnUrunDuzenle': function (e, value, row, index) {
        $.get('/Urun/UrunAra?id=' + row.ID, function (data) {
            var cariform = $('#FrmUrun');
            populate(cariform, data[0]);
            var mdl = $('#mdlUrunForm');
            mdl.modal('show');
        },
            'json');
    },
    'click #btnUrunCikart': function (e, value, row, index) {
        $.get('/Urun/UrunPasif?id=' + row.ID, function (data) {
        },
            'json');
        $('#table-Urunler').bootstrapTable('refreshOptions', { silent: true });
    },
    'click #BtnDagilimRaporu': function (e, value, row, index) {
        $('#tblDagitim').bootstrapTable('refreshOptions', { url: "/Depo/UrunDagılımRaporu?limit=100&offset=0&UrunID=" + row.ID });
        var mdl = $('#mdlDagilimRaporu');
        mdl.modal('show');
    }
}

$('#BtnUrunEkle').click(function () {
    $('#FrmUrun')[0].reset();
    var mdl = $('#mdlUrunForm');
    mdl.modal('show');
});


$('#btnUrunKaydet').click(function () {
    var dataToPost = $('#FrmUrun').serialize()
    $.ajax({
        type: 'POST',
        url: '/Urun/UrunKaydet',
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
            $('#table-Urunler').bootstrapTable('refreshOptions', { silent: true }); 
        },
        error: function (result) {
            $('.modal').modal('hide');
            alert("hatalı!");
        }
    });
});