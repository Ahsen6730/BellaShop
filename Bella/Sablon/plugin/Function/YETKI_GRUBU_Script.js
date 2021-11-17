function oprtYetkiGrubu(value, row, index) {
    return [
        '<button id="btnYetkiGrubuDuzenle" class="btn btn-default waves-effect waves-light btn-xs"><i class="fa fa-edit"></i> </button>',
        '&nbsp;<button id="btnYetkiGrubuYetkilendir" class="btn btn-inverse waves-effect waves-light btn-xs"><i class="fa fa-check"></i> </button>'
        //'<div>',
        //' <div class="btn-group btn-sm">',
        //' <button type="button" class="btn btn-success btn-flat dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
        //'<i class="fa fa-cogs" >&nbsp;</i> &nbsp;',
        //'  <span class="fa fa-caret-down"></span>',
        //'   <span class="sr-only">Toggle Dropdown</span>',
        //'  </button>',
        //'  <ul class="dropdown-menu" role="menu">',
        //' <li><a  id="btnYetkiGrubuDuzenle" style="cursor:pointer"><i class="fa fa-exclamation" ></i>Düzenle</a></li>',
        //' <li><a  id="btnYetkiGrubuYetkilendir" ><i class="fa fa-exclamation" ></i>Yetkilendir</a></li>',
        //' </ul>',
        //' </div>',

    ].join('');
}
window.oprtYetkiGrubuEvent = {
    'click #btnYetkiGrubuDuzenle': function (e, value, row, index) {
        $.get('/Kullanici/YetkiGrubuAra?id=' + row.ID, function (data) {
            var YetkiGrubuform = $('#frmYetkiGrubu');
            populate(YetkiGrubuform, data[0]);
            var mdl = $('#mdlYetkiGrubuForm');
            mdl.modal('show');
        },
            'json');
    },
    'click #btnYetkiGrubuYetkilendir': function (e, value, row, index) {
        $('#yetkiler').html("<div class=\"box\"><div class=\"box-header\"><h3 id=\"basligimiz\" class=\"box-title\"></h3></div><div class=\"box-body\"><div id=\"tree\"><div class=\"overlay\"><i style=\"font-size:26px;\" class=\"fa fa-refresh fa-spin\"></i></div></div></div><div class=\"box-footer\" id=\"butonumuz\"></div></div>");

        $.get('/Kullanici/YetkileriGetir?id=' + row.ID, function (result) {

            $('#peek').val(row.ID);
            var $checkableTree = $('#tree').treeview({
                data: result.data,
                showIcon: true,
                showCheckbox: true,
                onNodeChecked: function (event, node) {
                    CekIndir(node);
                    while (node.hasOwnProperty('parentId') && node.parentId != undefined) {
                        node = $('#tree').treeview('getParent', node);
                        $('#tree').treeview('checkNode', [node, { silent: true }]);
                    };

                },
                onNodeUnchecked: function (event, node) {
                    CekKaldir(node);
                    return;
                    while (node.hasOwnProperty('parentId') && node.parentId != undefined) {
                    }

                }
            });
            $('#basligimiz').html("Yetki Grubu Yetkileri");
            $('#butonumuz').html('<button class="btn btn-default  btn-block" id="btnYetkiTamamla">Kaydet</button>');
            //$checkableTree.treeview('collapseAll', { silent: true });
            treeDoldur(result.data);


            var mdl = $('#mdlYetkiGrubuYetkilendirForm');
            mdl.modal('show');
        },
            'json');
    }
}
function YetkiGrubuYetkilendirme(id) {
 
}
$('#yetkiler').on('click', '#btnYetkiTamamla', function () {
     YetkilerKaydet();
});
function YetkilerKaydet() {
     
    var node,
        nodeId = 0,
        checkedNodes = [];
    var tree = $('#tree');
    var cv = {}
    do {
        node = tree.treeview("getNode", nodeId);
        if (node.state != undefined) {
            if (node && node.state.checked) {
                cv = { id: node.id, text: node.text, isaretli: true, kullid: node.kullid }
                checkedNodes.push(cv);
            }
        }
        nodeId++;
    } while (node.nodeId != undefined);


    var mid = $('#peek').val();
    $.ajax({
        type: 'POST',
        url: '/Kullanici/YetkiKaydet',
        data: JSON.stringify({
            idim: mid,
            seyler: checkedNodes,
        }),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            $('.modal').modal('hide');
            swal("Başarılı", "Yetkiler Kaydedildil.", "success")
        },
        error: function (result) {
            $('.modal').modal('hide');
            alert('Sipariş Ekleme Hatası !!');
        }
    });
}



var csilid = 0;
$('#btnYetkiGrubusil').click(function () {
    $.get('/Kullanici/YetkiGrubuPasif?ID=' + row.ID, function (data) {
    },
        'json');
    $('#table-YetkiGrubuler').bootstrapTable('refreshOptions', { silent: true }); csilid = 0;
});

$('#btnYetkiGrubuiptal').click(function () {
    var mdl = $('#mdlYetkiGrubusilform');
    mdl.modal('hide'); csilid = 0;
});

$('#btnYeniYetkiGrubu').click(function () {
    $('#frmYetkiGrubu')[0].reset();
    var mdl = $('#mdlYetkiGrubuForm');
    mdl.modal('show');
    $('.YetkiGrubuGuncelIDSi').val(0);
});

$('#btnYetkiGrubuKaydet').click(function () {
    var dataToPost = $('#frmYetkiGrubu').serialize()
    $.ajax({
        type: 'POST',
        url: '/Kullanici/YetkiGrubuKaydet',
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

            YetkiGrubuTableGuncelle();


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

function YetkiGrubuTableGuncelle() {
    $('#table-YetkiGrubu').bootstrapTable('refreshOptions', { silent: true });
} 


function isOdd(num) { return num % 2; }
$('textarea').on('paste', function () {
    var element = this;
    setTimeout(function () {
        var text = $(element).val().replace(/\n/g, "*");
        $(element).val('');
        //text = text.replace("\n", "<br />", "g")
        clipRows = text.split("*");
        for (var i = 0; i < clipRows.length; i++) {
            var ff = clipRows[i].trim().split(/\t/g);
            if (ff.length == 2) {
                console.log(ff[0] + ' kitap ' + ff[1] + ' Adet');
            }
        }
    }, 300);
});
function CekKaldir(node) {
    if (node.nodes != undefined) {
        for (var i = 0; i < node.nodes.length; i++) {
            CekKaldir(node.nodes[i]);
            $('#tree').treeview('uncheckNode', [node.nodes[i].nodeId, { silent: true }]);
        }
    }
}
function CekIndir(node) {
    if (node.nodes != undefined) {
        for (var i = 0; i < node.nodes.length; i++) {
            CekIndir(node.nodes[i]);
            $('#tree').treeview('checkNode', [node.nodes[i].nodeId, { silent: true }]);
        }
    }
}
function checkChilds(node) {
    for (var i = 0; i < node.nodes.length; i++) {
        if (node.nodes[i].state.checked) {
            return true;
        }
    }
    return false;
}

function treeDoldur(data) {

    var node,
        nodeId = 0,
        checkedNodes = [];
    var tree = $('#tree');

    var cv = {}
    for (var i = 0; i < data.length; i++) {
        nodeId = 0;
        do {
            node = tree.treeview("getNode", nodeId);
            if (node.id != undefined && node.id == data[i].id && data[i].isaretli) {
                $('#tree').treeview('checkNode', [node.nodeId, { silent: true }]);
                if (data[i].nodes != null) {
                    treeDoldur(data[i].nodes);
                }
                break;
            }

            nodeId++;
        } while (node.nodeId != undefined);
    }
}
