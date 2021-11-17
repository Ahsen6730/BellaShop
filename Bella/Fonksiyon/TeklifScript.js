function oprtTeklif(value, row, index) {
    return [ 
        '<div>',
        ' <a href="#" id="btnTeklifDuzenle" class="btn btn-default btn-xs"  data-toggle="tooltip" title="Proje Çıkart" data-placement="bottom"><i class="fa fa-check" ></i> </a>', 
        ' <a href="#" id="btnTeklifRevizyon" class="btn btn-default btn-xs"  data-toggle="tooltip" title="Proje Çıkart" data-placement="bottom"><i class="fa fa-exclamation" ></i> R</a>', 
     ].join('');
};
window.oprtTeklifEvent = {
    'click #btnTeklifRevizyon': function (e, value, row, index) {
        $('#table-TeklifRevize').bootstrapTable('refreshOptions', { url: "/Teklif/TeklifRezerveGetir?ID=" + row.ID });
        var mdl = $('#mdlTeklifRevizeForm');
        mdl.modal('show');
        psilid = row.ID;
    },
    'click #btnTeklifDuzenle': function (e, value, row, index) {
        $.get('/Teklif/TeklifGetir?id=' + row.ID, function (data) {
             var cariform = $('#frmTeklifEkleDuzenle');
            populate(cariform, data[0]);
            var mdl = $('#mdlTeklifEkleDuzenle');
            mdl.modal('show');
        },
            'json');
    }
};
function HedefDoldur(obj_id, kid, tip) {
    $.get('/Teklif/DurumDoldur', function (resultl) {
        var option_list = resultl;
        $('#' + obj_id).empty();
        $('#' + obj_id).append(
            $("<option></option>").attr(
                "value", "0").text("-- Durum Seçiniz --")
        );
        for (var i = 0; i < option_list.length; i++) {
            $('#' + obj_id).append(
                $("<option></option>").attr(
                    "value", option_list[i]["ID"]).text(option_list[i]["Name"])
            );
        };
    });
};

$('#btnYeniTeklif').click(function () {
    $('#ID').val(0);
    $('#CariID').val(0);
    $('#ThpCmbCariGetir').val('');
    $('#field-4').val('');
    $('#TeklifNo').val('');
    $('#frmTarih').val('');
    $('#field-6').val('');

    HedefDoldur('TeklifDurumu', 1, 1);
    var mdl = $('#mdlTeklifEkleDuzenle');
    mdl.modal('show'); psilid = 0;
});

$('#btnTeklifKaydet').click(function () {
    var dataToPost = $('#frmTeklifEkleDuzenle').serialize()
    $.ajax({
        type: 'POST',
        url: '/Teklif/TeklifKaydet',
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
            $('#table-Teklifler').bootstrapTable('refreshOptions', { silent: true }); 
        },
        error: function (result) {
            $('.modal').modal('hide');
            alert("hatalı!");
        }
    });
});

$('#frmTarih').datetimepicker({
    language: 'tr', weekStart: 1, todayBtn: 1, autoclose: 1,
    todayHighlight: 1, startView: 2, minView: 2, forceParse: 0
    , defaultDate: new Date()
});
