
function MasterDataLineProcess() { }


MasterDataLineProcess.ShowLineProcess = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnLineProcess').removeClass('btn btn-outLineProcess-primary2 btn-lg btn-block').addClass('btn btn-outLineProcess-primary2 btn-lg btn-block active')
    $('.LineProcess').show()
    MasterDataLineProcess.GetPlant()
}



MasterDataLineProcess.mDataTable = null;

MasterDataLineProcess.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#LineProcessTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Product" },
           { "data": "LineProcessID" },
           { "data": "LineProcessDescription" },
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
                checkbox += '<input type="checkbox" id=\'chkLineProcess' + data.Number + '\' value="" class="checkable" onclick="MasterDataLineProcess.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Product + '\',\'' + data.LineProcessID + '\')"/>'
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
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataLineProcess.EventEdit(\'' + data.Plant + '\',\'' + data.Product + '\',\'' + data.LineProcessID + '\',\'' + data.LineProcessDescription + '\',\'' + data.Active + '\')">'
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
    var Table = $('#LineProcessTable').DataTable(options);
    MasterDataLineProcess.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#LineProcessTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#LineProcessTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataLineProcess.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserLineProcess").value
    var cbbPlant = $('#cbbPlantLineProcess');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantLineProcess",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantLineProcess option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataLineProcess.GetProduct()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLineProcess.OnChangePlant = function () {
    MasterDataLineProcess.GetProduct()
}


MasterDataLineProcess.GetProduct = function () {
    var ValPlant = $('#cbbPlantLineProcess').val();
    var cbbProductLineProcess = $('#cbbProductLineProcess')
    cbbProductLineProcess.empty();
    cbbProductLineProcess.append("<option value=''>All Product</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProductLineProcess",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProductLineProcess.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                MasterDataLineProcess.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataLineProcess.OnChangeProduct = function () {
    MasterDataLineProcess.GetData()
}

MasterDataLineProcess.GetData = function () {
    var ValPlant = $('#cbbPlantLineProcess').val();
    var ValProduct = $('#cbbProductLineProcess').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetLineProcessData",
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
                MasterDataLineProcess.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataLineProcess.mDataTable.row.add(st);
                })
                MasterDataLineProcess.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLineProcess.GetPlantModal = function (Plant, Product) {
    var cbbPlant = $('#cbbPlantLineProcessModal');
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
                    $('#cbbPlantLineProcessModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantLineProcessModal").attr('disabled', 'disabled')
                    MasterDataLineProcess.GetProductModal(Product)
                }
                else
                {
                    MasterDataLineProcess.GetProductModal('')
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
MasterDataLineProcess.OnChangePlantModal =  function()
{
    MasterDataLineProcess.GetProductModal('')
}

MasterDataLineProcess.GetProductModal = function (Product) {
    var ValPlant = $('#cbbPlantLineProcessModal').val()
    var cbbProductLineProcessModal = $('#cbbProductLineProcessModal');
    cbbProductLineProcessModal.empty();
    cbbProductLineProcessModal.append("<option value=''>Choose Product ...</option>");
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
                    cbbProductLineProcessModal.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (Product != '') {
                    $('#cbbProductLineProcessModal option[value="' + Product + '"]').attr('selected', 'selected');
                    $("#cbbProductLineProcessModal").attr('disabled', 'disabled')
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



MasterDataLineProcess.OnchangeLineProcess = function ()
{
    var ValPlant = $('#cbbPlantLineProcessModal').val()
    var ValProduct = $('#cbbProductLineProcessModal').val()
    var ValLineProcess = document.getElementById("txtLineProcess").value;
    $.ajax({
        url: "../MasterData/CheckLineProcessExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Product: ValProduct,
            LineProcess: ValLineProcess
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errLineProcess").removeAttr("hidden");
                    var error = $('#errLineProcess')
                    error.empty();
                    error.append('Process Code already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errLineProcess").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLineProcess.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.LineProcess').show()
    $("#txtHeaderGroupName").html('Add LineProcess')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataLineProcess'
    MasterDataLineProcess.GetPlantModal('','')
}


MasterDataLineProcess.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this LineProcess?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataLineProcess.Delete(MasterDataLineProcess.Arr)
    });
}

MasterDataLineProcess.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteLineProcess",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataLineProcess.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLineProcess.CheckboxClick = function(Number,Plant,Product,LineProcess)
{
    var ckbox = $('#chkLineProcess' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataLineProcess.CollectData(Number, Plant, Product, LineProcess, Checked)
}

MasterDataLineProcess.ListLineProcess = []
MasterDataLineProcess.Arr = ""
MasterDataLineProcess.CollectData = function (Number, Plant, Product, LineProcess, Checked) {
    MasterDataLineProcess.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataLineProcess.ListLineProcess.length; i++) {
        if (parseInt(MasterDataLineProcess.ListLineProcess[i].Number) == parseInt(Number)) {
            MasterDataLineProcess.ListLineProcess.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Product\":\"' + Product + '\",'
    tr += '\"LineProcess\":\"' + LineProcess + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataLineProcess.ListLineProcess.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataLineProcess.ListLineProcess.length; i++) {
        if (parseInt(MasterDataLineProcess.ListLineProcess[i].Checked) == parseInt(0)) {
            MasterDataLineProcess.ListLineProcess.splice(i, 1);
            break;
        }
    }
    var _ArrayLineProcess = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataLineProcess.ListLineProcess, function (i, st) {
        _ArrayLineProcess = []
        _JsonResult = []
        _ArrayLineProcess[_ArrayLineProcess.length] = st.Plant + '~' + st.Product + '~' + st.LineProcess;
        array_JsonResult[array_JsonResult.length] = _ArrayLineProcess;
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
    MasterDataLineProcess.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataLineProcess.EventEdit =  function(Plant,Product,LineProcessID, LineProcessDescription, Active)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.LineProcess').show()
    $("#txtHeaderGroupName").html('Update LineProcess')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataLineProcess'
    MasterDataLineProcess.GetPlantModal(Plant,Product)
    document.getElementById("txtLineProcess").value = LineProcessID
    document.getElementById("OldLineProcess").value = LineProcessID
    document.getElementById("txtLineProcessDescription").value = LineProcessDescription
    if(Active =='True')
    {
        $('#ChkActiveLineProcess').prop("checked", true);
    }

    else
    {
        $('#ChkActiveLineProcess').prop("checked", false);
    }
}



MasterDataLineProcess.EmptyItem = function()
{
    $('#cbbPlantLineProcessModal option[value=""]').attr('selected', 'selected');
    $('#cbbProductLineProcessModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtLineProcess").value = ''
    document.getElementById("OldLineProcess").value = ''
    document.getElementById("txtLineProcessDescription").value = ''
    $('#ChkActiveLineProcess').prop("checked", false);
    $("#cbbPlantLineProcessModal").removeAttr('disabled')
    $("#cbbProductLineProcessModal").removeAttr('disabled')

    $("#errPlantLineProcess").attr("hidden", "hidden");
    $("#errProductLineProcess").attr("hidden", "hidden");
    $("#errLineProcess").attr("hidden", "hidden");
    $("#errLineProcessDescription").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataLineProcess.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitLineProcess",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataLineProcess.EmptyItem()
                Notification.ShowToast('success', 'LineProcess ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataLineProcess.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



MasterDataLineProcess.EventImport = function () {
    $('.DefaultLineProcess').hide()
    $('.LineProcessImport').removeAttr("hidden");
}

MasterDataLineProcess.EventImportCancel = function () {
    var $el = $('#InputUploadFileLineProcess');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
    $('.DefaultLineProcess').show()
    $('.LineProcessImport').attr("hidden", "hidden");
}




MasterDataLineProcess.Upload = function () {
    Loading.BlockPage()
    var fileUpload = $("#InputUploadFileLineProcess").get(0);
    var files = fileUpload.files;

    // Create FormData object  
    var fileData = new FormData();
    // Looping over all files and add it to FormData object  

    for (var i = 0; i < files.length; i++) {
        fileData.append('File', files[i]);
    }


    var uploader = $("#InputUploadFileLineProcess").val()
    if (uploader == '') {
        Loading.UnblockPage_()
        Notification.ShowToast('error', 'please import 5S LineProcess first')
    }
    else {
        $.ajax({
            url: "../MasterData/ImportLineProcess",
            method: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (j) {
                Loading.UnblockPage_()
                var $el = $('#InputUploadFileLineProcess');
                $el.wrap('<form>').closest('form').get(0).reset();
                $el.unwrap();
                if (j.Result == true) {
                    Notification.ShowToast('success', 'Succesfully Upload')
                    $('.DefaultLineProcess').show()
                    $('.LineProcessImport').attr("hidden", "hidden");
                    MasterDataLineProcess.GetData()
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