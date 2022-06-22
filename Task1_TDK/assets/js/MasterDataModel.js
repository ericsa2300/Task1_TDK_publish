
function MasterDataModel() { }


MasterDataModel.ShowModel = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnModel').removeClass('btn btn-outModel-primary2 btn-lg btn-block').addClass('btn btn-outModel-primary2 btn-lg btn-block active')
    $('.Model').show()
    MasterDataModel.GetPlant()
}



MasterDataModel.mDataTable = null;

MasterDataModel.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#ModelTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Product" },
           { "data": "ModelID" },
           { "data": "ModelDescription" },
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
                checkbox += '<input type="checkbox" id=\'chkModel' + data.Number + '\' value="" class="checkable" onclick="MasterDataModel.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Product + '\',\'' + data.ModelID + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets:9,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataModel.EventEdit(\'' + data.Plant + '\',\'' + data.Product + '\',\'' + data.ModelID + '\',\'' + data.ModelDescription + '\',\'' + data.Active + '\')">'
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
            "targets": [6], // ispickable
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
    var Table = $('#ModelTable').DataTable(options);
    MasterDataModel.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#ModelTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#ModelTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataModel.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserModel").value
    var cbbPlant = $('#cbbPlantModel');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantModel",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantModel option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataModel.GetProduct()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataModel.OnChangePlant = function () {
    MasterDataModel.GetProduct()
}


MasterDataModel.GetProduct = function () {
    var ValPlant = $('#cbbPlantModel').val();
    var cbbProductModel = $('#cbbProductModel')
    cbbProductModel.empty();
    cbbProductModel.append("<option value=''>All Product</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProductModel",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProductModel.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                MasterDataModel.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataModel.OnChangeProduct = function () {
    MasterDataModel.GetData()
}

MasterDataModel.GetData = function () {
    var ValPlant = $('#cbbPlantModel').val();
    var ValProduct = $('#cbbProductModel').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetModelData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Product: ValProduct,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataModel.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataModel.mDataTable.row.add(st);
                })
                MasterDataModel.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataModel.GetPlantModal = function (Plant, Product) {
    var cbbPlant = $('#cbbPlantModelModal');
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
                    $('#cbbPlantModelModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantModelModal").attr('disabled', 'disabled')
                    MasterDataModel.GetProductModal(Product)
                }
                else
                {
                    MasterDataModel.GetProductModal('')
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
MasterDataModel.OnChangePlantModal =  function()
{
    MasterDataModel.GetProductModal('')
}

MasterDataModel.GetProductModal = function (Product) {
    var ValPlant = $('#cbbPlantModelModal').val()
    var cbbProductModelModal = $('#cbbProductModelModal');
    cbbProductModelModal.empty();
    cbbProductModelModal.append("<option value=''>Choose Product ...</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProductModelModal.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (Product != '') {
                    $('#cbbProductModelModal option[value="' + Product + '"]').attr('selected', 'selected');
                    $("#cbbProductModelModal").attr('disabled', 'disabled')
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



MasterDataModel.OnchangeModel = function ()
{
    var ValPlant = $('#cbbPlantModelModal').val()
    var ValProduct = $('#cbbProductModelModal').val()
    var ValModel = document.getElementById("txtModel").value;
    $.ajax({
        url: "../MasterData/CheckModelExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Product: ValProduct,
            Model: ValModel
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errModel").removeAttr("hidden");
                    var error = $('#errModel')
                    error.empty();
                    error.append('Model already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errModel").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataModel.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Model').show()
    $("#txtHeaderGroupName").html('Add Model')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataModel'
    MasterDataModel.GetPlantModal('','')
}


MasterDataModel.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Model?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataModel.Delete(MasterDataModel.Arr)
    });
}

MasterDataModel.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteModel",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataModel.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataModel.CheckboxClick = function(Number,Plant,Product,Model)
{
    var ckbox = $('#chkModel' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataModel.CollectData(Number, Plant, Product, Model, Checked)
}

MasterDataModel.ListModel = []
MasterDataModel.Arr = ""
MasterDataModel.CollectData = function (Number, Plant, Product, Model, Checked) {
    MasterDataModel.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataModel.ListModel.length; i++) {
        if (parseInt(MasterDataModel.ListModel[i].Number) == parseInt(Number)) {
            MasterDataModel.ListModel.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Product\":\"' + Product + '\",'
    tr += '\"Model\":\"' + Model + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataModel.ListModel.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataModel.ListModel.length; i++) {
        if (parseInt(MasterDataModel.ListModel[i].Checked) == parseInt(0)) {
            MasterDataModel.ListModel.splice(i, 1);
            break;
        }
    }
    var _ArrayModel = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataModel.ListModel, function (i, st) {
        _ArrayModel = []
        _JsonResult = []
        _ArrayModel[_ArrayModel.length] = st.Plant + '~' + st.Product + '~' + st.Model;
        array_JsonResult[array_JsonResult.length] = _ArrayModel;
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
    MasterDataModel.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataModel.EventEdit =  function(Plant,Product,ModelID, ModelDescription, Active)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Model').show()
    $("#txtHeaderGroupName").html('Update Model')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataModel'
    MasterDataModel.GetPlantModal(Plant,Product)
    document.getElementById("txtModel").value = ModelID
    document.getElementById("OldModel").value = ModelID
    document.getElementById("txtModelDescription").value = ModelDescription
    if(Active =='True')
    {
        $('#ChkActiveModel').prop("checked", true);
    }

    else
    {
        $('#ChkActiveModel').prop("checked", false);
    }
}



MasterDataModel.EmptyItem = function()
{
    $('#cbbPlantModelModal option[value=""]').attr('selected', 'selected');
    $('#cbbProductModelModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtModel").value = ''
    document.getElementById("OldModel").value = ''
    document.getElementById("txtModelDescription").value = ''
    $('#ChkActiveModel').prop("checked", false);
    $("#cbbPlantModelModal").removeAttr('disabled')
    $("#cbbProductModelModal").removeAttr('disabled')

    $("#errPlantModel").attr("hidden", "hidden");
    $("#errProductModel").attr("hidden", "hidden");
    $("#errModel").attr("hidden", "hidden");
    $("#errModelDescription").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataModel.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitModel",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataModel.EmptyItem()
                Notification.ShowToast('success', 'Model ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataModel.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataModel.EventImport = function () {
    $('.DefaultModel').hide()
    $('.ModelImport').removeAttr("hidden");
}

MasterDataModel.EventImportCancel = function () {
    var $el = $('#InputUploadFileModel');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
    $('.DefaultModel').show()
    $('.ModelImport').attr("hidden", "hidden");
}




MasterDataModel.Upload = function () {
    Loading.BlockPage()
    var fileUpload = $("#InputUploadFileModel").get(0);
    var files = fileUpload.files;

    // Create FormData object  
    var fileData = new FormData();
    // Looping over all files and add it to FormData object  

    for (var i = 0; i < files.length; i++) {
        fileData.append('File', files[i]);
    }


    var uploader = $("#InputUploadFileModel").val()
    if (uploader == '') {
        Loading.UnblockPage_()
        Notification.ShowToast('error', 'please import 5S Model first')
    }
    else {
        $.ajax({
            url: "../MasterData/ImportModel",
            method: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (j) {
                Loading.UnblockPage_()
                var $el = $('#InputUploadFileModel');
                $el.wrap('<form>').closest('form').get(0).reset();
                $el.unwrap();
                if (j.Result == true) {
                    Notification.ShowToast('success', 'Succesfully Upload')
                    $('.DefaultModel').show()
                    $('.ModelImport').attr("hidden", "hidden");
                    MasterDataModel.GetData()
                }
                else {
                    Notification.ShowToast('error', 'Upload Fail, Please contact IT')
                }
            },
            error: function (xhr, error, text) {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + error + '')
            }
        });


    }
}