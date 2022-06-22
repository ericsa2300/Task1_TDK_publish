
function MasterDataProduct() { }


MasterDataProduct.ShowProduct = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnProduct').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.Product').show()
    MasterDataProduct.GetPlant()
}



MasterDataProduct.mDataTable = null;

MasterDataProduct.initialTable = function () {
    var options = {
        //responsive: true,
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#ProductTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Product" },
           { "data": "ProductName" },
           { "data": "Active" },
           { "data": "PostBy" },
           { "data": "PostDate" },
           { "data": null },
        ],
        headerCallback: function (thead, data, start, end, display) {
            var item = '<label class="checkbox checkbox-single">'
            item += '<input type="checkbox" value="" class="group-checkable"/>'
            item += '<span></span>'
            item += '</label>'
            thead.getElementsByTagName('th')[0].innerHTML = item

        },
        columnDefs: [
        {
            targets: 0,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var checkbox = '<label class="checkbox checkbox-single">'
                checkbox += '<input type="checkbox" id=\'chkProduct' + data.Number + '\' value="" class="checkable" onclick="MasterDataProduct.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Product + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 8,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataProduct.EventEdit(\'' + data.Plant + '\',\'' + data.Product + '\',\'' + data.ProductName + '\',\'' + data.Active + '\')">'
                EditButton += '	<span class="svg-icon svg-icon-md">'
                EditButton += '<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'
                EditButton += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                EditButton += '<rect x="0" y="0" width="24" height="24"/>'
                EditButton += '<path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fill-rule="nonzero"\ transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>'
                EditButton += '<rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>'
                EditButton += '</g>'
                EditButton += '</svg>'
                EditButton += '</span>'
                EditButton += '</a>'
                return EditButton
            },
        }, {
            "targets": [5], 
            "searchable": false,
            'render': function (data, type, full, meta) {
                var item = "";
                item = "<div class='mr-4 flex-shrink-0 text-center' style='width: 20px;'>"
                if (full.Active == "True") {
                    item += "<i class='icon-sm text-dark-50 flaticon2-check-mark'></i>";
                }
                else {
                    item += "<i class='icon-sm text-dark-50 flaticon2-cancel-music'></i>";
                }
                item += "</div>";
                return item;
            }
        }],
         dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }
    var Table = $('#ProductTable').DataTable(options);
    MasterDataProduct.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#ProductTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#ProductTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataProduct.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserProduct").value
    var cbbPlant = $('#cbbPlantProduct');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantProduct",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantProduct option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataProduct.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataProduct.OnChangePlant = function () {
    MasterDataProduct.GetData()
}



MasterDataProduct.GetData = function () {
    var ValPlant = $('#cbbPlantProduct').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProductData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataProduct.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataProduct.mDataTable.row.add(st);
                })
                MasterDataProduct.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataProduct.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantProductModal');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>Choose Plant ...</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlant",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (Plant != '')
                {
                    $('#cbbPlantProductModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantProductModal").attr('disabled', 'disabled')
                }
                Loading.UnblockPage_()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataProduct.OnchangeProduct = function ()
{
    var ValPlant = $('#cbbPlantProductModal').val()
    var ValProduct = document.getElementById("txtProduct").value;
    $.ajax({
        url: "../MasterData/CheckProductExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Product: ValProduct
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errProduct").removeAttr("hidden");
                    var error = $('#errProduct')
                    error.empty();
                    error.append('Product already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errProduct").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataProduct.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Product').show()
    $("#txtHeaderGroupName").html('Add Product')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataProduct'
    MasterDataProduct.GetPlantModal('')
}


MasterDataProduct.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Product?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataProduct.Delete(MasterDataProduct.Arr)
    });
}

MasterDataProduct.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataProduct.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataProduct.CheckboxClick = function(Number,Plant,Product)
{
    var ckbox = $('#chkProduct' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataProduct.CollectData(Number, Plant, Product, Checked)
}

MasterDataProduct.ListProduct = []
MasterDataProduct.Arr = ""
MasterDataProduct.CollectData = function (Number, Plant, Product, Checked) {
    MasterDataProduct.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataProduct.ListProduct.length; i++) {
        if (parseInt(MasterDataProduct.ListProduct[i].Number) == parseInt(Number)) {
            MasterDataProduct.ListProduct.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Product\":\"' + Product + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataProduct.ListProduct.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataProduct.ListProduct.length; i++) {
        if (parseInt(MasterDataProduct.ListProduct[i].Checked) == parseInt(0)) {
            MasterDataProduct.ListProduct.splice(i, 1);
            break;
        }
    }
    var _ArrayProduct = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataProduct.ListProduct, function (i, st) {
        _ArrayProduct = []
        _JsonResult = []
        _ArrayProduct[_ArrayProduct.length] = st.Plant + '~' + st.Product;
        array_JsonResult[array_JsonResult.length] = _ArrayProduct;
        _JsonResult.push(array_JsonResult.join(','))

        if (st.Checked == '1') {
            $('.Notdelete').hide()
            $('.delete').show()
        }
    })

    if (parseInt(_JsonResult.length) == 0) {
        $('.Notdelete').show()
        $('.delete').hide()
    }
    MasterDataProduct.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataProduct.EventEdit =  function(Plant,Product,ProductName, Active)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Product').show()
    $("#txtHeaderGroupName").html('Update Product')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataProduct'
    MasterDataProduct.GetPlantModal(Plant)
    document.getElementById("txtProduct").value = Product
    document.getElementById("OldProduct").value = Product
    document.getElementById("txtProductName").value = ProductName
    if(Active =='True')
    {
        $('#ChkActiveProduct').prop("checked", true);
    }

    else
    {
        $('#ChkActiveProduct').prop("checked", false);
    }
}



MasterDataProduct.EmptyItem = function()
{
    $('#cbbPlantProductModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtProduct").value = ''
    document.getElementById("OldProduct").value = ''
    document.getElementById("txtProductName").value = ''

    $("#cbbPlantProductModal").removeAttr('disabled')

    $("#errPlantProduct").attr("hidden", "hidden");
    $("#errProduct").attr("hidden", "hidden");
    $("#errProductName").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataProduct.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataProduct.EmptyItem()
                Notification.ShowToast('success', 'Product ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataProduct.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
