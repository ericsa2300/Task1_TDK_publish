
function MasterDataVendorProcess() { }


MasterDataVendorProcess.ShowVendorProcess = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnVendorProcess').removeClass('btn btn-outVendorProcess-primary2 btn-lg btn-block').addClass('btn btn-outVendorProcess-primary2 btn-lg btn-block active')
    $('.VendorProcess').show()
    MasterDataVendorProcess.GetPlant()
}



MasterDataVendorProcess.mDataTable = null;

MasterDataVendorProcess.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#VendorProcessTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "ProcessOwner" },
           { "data": "VendorCode" },
           { "data": "VendorProcess" },
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
                checkbox += '<input type="checkbox" id=\'chkVendorProcess' + data.Number + '\' value="" class="checkable" onclick="MasterDataVendorProcess.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.ProcessOwner + '\',\'' + data.VendorCode + '\',\'' + data.VendorProcess + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets:8,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataVendorProcess.EventEdit(\'' + data.Plant + '\',\'' + data.ProcessOwner + '\',\'' + data.VendorCode + '\',\'' + data.VendorProcess + '\')">'
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
        }],
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }
    var Table = $('#VendorProcessTable').DataTable(options);
    MasterDataVendorProcess.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#VendorProcessTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#VendorProcessTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataVendorProcess.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserVendorProcess").value
    var cbbPlant = $('#cbbPlantVendorProcess');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantVendorProcess",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantVendorProcess option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataVendorProcess.GetProcessOwner()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataVendorProcess.OnChangePlant = function () {
    MasterDataVendorProcess.GetProcessOwner()
}


MasterDataVendorProcess.GetProcessOwner = function () {
    var ValPlant = $('#cbbPlantVendorProcess').val();
    var cbbProcessOwner = $('#cbbProcessOwnerVendorProcess')
    cbbProcessOwner.empty();
    cbbProcessOwner.append("<option value=''>All Audit Type</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProcessOwnerVendorProcess",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProcessOwner.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                MasterDataVendorProcess.GetVendorCode()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataVendorProcess.OnChangeProcessOwner = function () {
    MasterDataVendorProcess.GetVendorCode()
}



MasterDataVendorProcess.GetVendorCode = function () {
    var ValPlant = $('#cbbPlantVendorProcess').val();
    var ValProcessOwner = $('#cbbProcessOwnerVendorProcess').val();
    var cbbVendorCode = $('#cbbVendorVendorProcess')
    cbbVendorCode.empty();
    cbbVendorCode.append("<option value=''>All Vendor Code</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetVendorCodeVendorProcess",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbVendorCode.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                MasterDataVendorProcess.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataVendorProcess.OnChangeVendorCode = function () {
    MasterDataVendorProcess.GetData()
}

MasterDataVendorProcess.GetData = function () {
    var ValPlant = $('#cbbPlantVendorProcess').val();
    var ValProcessOwner = $('#cbbProcessOwnerVendorProcess').val();
    var ValVendorCode = $('#cbbVendorVendorProcess').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetVendorProcessData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            VendorCode: ValVendorCode
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataVendorProcess.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataVendorProcess.mDataTable.row.add(st);
                })
                MasterDataVendorProcess.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataVendorProcess.GetPlantModal = function (Plant, ProcessOwner, VendorCode) {
    var cbbPlant = $('#cbbPlantVendorProcessModal');
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
                    $('#cbbPlantVendorProcessModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantVendorProcessModal").attr('disabled', 'disabled')
                    MasterDataVendorProcess.GetProcessOwnerModal(ProcessOwner)
                    MasterDataVendorProcess.GetVendorCodeModal(VendorCode)
                }
                else
                {
                    MasterDataVendorProcess.GetProcessOwnerModal('')
                    MasterDataVendorProcess.GetVendorCodeModal('')
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
MasterDataVendorProcess.OnChangePlantModal =  function()
{
    MasterDataVendorProcess.GetProcessOwnerModal('')
    MasterDataVendorProcess.GetVendorCodeModal('')
}

MasterDataVendorProcess.GetProcessOwnerModal = function (ProcessOwner) {
    var ValPlant = $('#cbbPlantVendorProcessModal').val()
    var cbbProcessOwner = $('#cbbProcessOwnerVendorProcessModal');
    cbbProcessOwner.empty();
    cbbProcessOwner.append("<option value=''>Choose Audit Type ...</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProcessOwner",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProcessOwner.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (ProcessOwner != '') {
                    $('#cbbProcessOwnerVendorProcessModal option[value="' + ProcessOwner + '"]').attr('selected', 'selected');
                    $("#cbbProcessOwnerVendorProcessModal").attr('disabled', 'disabled')
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



MasterDataVendorProcess.GetVendorCodeModal = function (VendorCode) {
    var ValPlant = $('#cbbPlantVendorProcessModal').val()
    var cbbVendorCode = $('#cbbVendorVendorProcessModal');
    cbbVendorCode.empty();
    cbbVendorCode.append("<option value=''>Choose Vendor Code ...</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetVendor",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbVendorCode.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (VendorCode != '') {
                    $('#cbbVendorVendorProcessModal option[value="' + VendorCode + '"]').attr('selected', 'selected');
                    $("#cbbVendorVendorProcessModal").attr('disabled', 'disabled')
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



MasterDataVendorProcess.OnchangeVendorProcess = function ()
{
    var ValPlant = $('#cbbPlantVendorProcessModal').val()
    var ValProcessOwner = $('#cbbProcessOwnerVendorProcessModal').val()
    var ValVendorCode = $('#cbbVendorVendorProcessModal').val()
    var ValVendorProcess = document.getElementById("txtVendorProcess").value;
    $.ajax({
        url: "../MasterData/CheckVendorProcessExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            VendorCode: ValVendorCode,
            VendorProcess: ValVendorProcess
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errVendorProcess").removeAttr("hidden");
                    var error = $('#errVendorProcess')
                    error.empty();
                    error.append('VendorProcess already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errVendorProcess").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataVendorProcess.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.VendorProcess').show()
    $("#txtHeaderGroupName").html('Add VendorProcess')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataVendorProcess'
    MasterDataVendorProcess.GetPlantModal('','','')
}


MasterDataVendorProcess.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Vendor Process?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataVendorProcess.Delete(MasterDataVendorProcess.Arr)
    });
}

MasterDataVendorProcess.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteVendorProcess",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataVendorProcess.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataVendorProcess.CheckboxClick = function(Number,Plant,ProcessOwner,VendorCode, VendorProcess)
{
    var ckbox = $('#chkVendorProcess' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataVendorProcess.CollectData(Number, Plant, ProcessOwner, VendorCode, VendorProcess, Checked)
}

MasterDataVendorProcess.ListVendorProcess = []
MasterDataVendorProcess.Arr = ""
MasterDataVendorProcess.CollectData = function (Number, Plant, ProcessOwner,VendorCode, VendorProcess, Checked) {
    MasterDataVendorProcess.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataVendorProcess.ListVendorProcess.length; i++) {
        if (parseInt(MasterDataVendorProcess.ListVendorProcess[i].Number) == parseInt(Number)) {
            MasterDataVendorProcess.ListVendorProcess.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"ProcessOwner\":\"' + ProcessOwner + '\",'
    tr += '\"VendorCode\":\"' + VendorCode + '\",'
    tr += '\"VendorProcess\":\"' + VendorProcess + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataVendorProcess.ListVendorProcess.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataVendorProcess.ListVendorProcess.length; i++) {
        if (parseInt(MasterDataVendorProcess.ListVendorProcess[i].Checked) == parseInt(0)) {
            MasterDataVendorProcess.ListVendorProcess.splice(i, 1);
            break;
        }
    }
    var _ArrayVendorProcess = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataVendorProcess.ListVendorProcess, function (i, st) {
        _ArrayVendorProcess = []
        _JsonResult = []
        _ArrayVendorProcess[_ArrayVendorProcess.length] = st.Plant + '~' + st.ProcessOwner + '~' + st.VendorCode + '~' + st.VendorProcess;
        array_JsonResult[array_JsonResult.length] = _ArrayVendorProcess;
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
    MasterDataVendorProcess.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataVendorProcess.EventEdit =  function(Plant,ProcessOwner,VendorCode, VendorProcess)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.VendorProcess').show()
    $("#txtHeaderGroupName").html('Update VendorProcess')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataVendorProcess'
    MasterDataVendorProcess.GetPlantModal(Plant, ProcessOwner, VendorCode)
    document.getElementById("txtVendorProcess").value = VendorProcess
    document.getElementById("OldVendorProcess").value = VendorProcess
}



MasterDataVendorProcess.EmptyItem = function()
{
    $('#cbbPlantVendorProcessModal option[value=""]').attr('selected', 'selected');
    $('#cbbProcessOwnerVendorProcessModal option[value=""]').attr('selected', 'selected');
    $('#cbbVendorVendorProcessModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtVendorProcess").value = ''
    document.getElementById("OldVendorProcess").value = ''

    $("#cbbPlantVendorProcessModal").removeAttr('disabled')
    $("#cbbProcessOwnerVendorProcessModal").removeAttr('disabled')
    $("#cbbVendorVendorProcessModal").removeAttr('disabled')

    $("#errPlantVendorProcess").attr("hidden", "hidden");
    $("#errProcessOwnerVendorProcess").attr("hidden", "hidden");
    $("#errVendorVendorProcess").attr("hidden", "hidden");
    $("#errVendorProcess").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataVendorProcess.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitVendorProcess",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataVendorProcess.EmptyItem()
                Notification.ShowToast('success', 'VendorProcess ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataVendorProcess.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



MasterDataVendorProcess.EventImport = function () {
    $('.DefaultVendorProcess').hide()
    $('.VendorProcessImport').removeAttr("hidden");
}

MasterDataVendorProcess.EventImportCancel = function () {
    var $el = $('#InputUploadFileVendorProcess');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
    $('.DefaultVendorProcess').show()
    $('.VendorProcessImport').attr("hidden", "hidden");
}




MasterDataVendorProcess.Upload = function () {
    Loading.BlockPage()
    var fileUpload = $("#InputUploadFileVendorProcess").get(0);
    var files = fileUpload.files;

    // Create FormData object  
    var fileData = new FormData();
    // Looping over all files and add it to FormData object  

    for (var i = 0; i < files.length; i++) {
        fileData.append('File', files[i]);
    }


    var uploader = $("#InputUploadFileVendorProcess").val()
    if (uploader == '') {
        Loading.UnblockPage_()
        Notification.ShowToast('error', 'please import 5S VendorProcess first')
    }
    else {
        $.ajax({
            url: "../MasterData/ImportVendorProcess",
            method: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (j) {
                Loading.UnblockPage_()
                var $el = $('#InputUploadFileVendorProcess');
                $el.wrap('<form>').closest('form').get(0).reset();
                $el.unwrap();
                if (j.Result == true) {
                    Notification.ShowToast('success', 'Succesfully Upload')
                    $('.DefaultVendorProcess').show()
                    $('.VendorProcessImport').attr("hidden", "hidden");
                    MasterDataVendorProcess.GetData()
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