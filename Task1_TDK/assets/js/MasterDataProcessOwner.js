
function MasterDataProcessOwner() { }


MasterDataProcessOwner.ShowProcessOwner = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnProcessOwner').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.ProcessOwner').show()
    MasterDataProcessOwner.GetPlant()
}



MasterDataProcessOwner.mDataTable = null;

MasterDataProcessOwner.initialTable = function () {
    var options = {
        //responsive: true,
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#ProcessOwnerTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "ProcessOwner" },
           { "data": "MultipleFinding" },
           { "data": "PostBy" },
           { "data": "PostDate" },
           { "data": null },
        ],
        order: [[1, 'asc']],
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
                checkbox += '<input type="checkbox" id=\'chkProcessOwner' + data.Number + '\' value="" class="checkable" onclick="MasterDataProcessOwner.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.ProcessOwner + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets:7,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataProcessOwner.EventEdit(\'' + data.Plant + '\',\'' + data.ProcessOwner + '\',\'' + data.MultipleFinding + '\')">'
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
            "targets": [4], // ispickable
            "searchable": false,
            'render': function (data, type, full, meta) {
                var item = "";
                item = "<div class='mr-4 flex-shrink-0 text-center' style='width: 20px;'>"
                if (full.MultipleFinding == "True") {
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
    var Table = $('#ProcessOwnerTable').DataTable(options);
    MasterDataProcessOwner.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#ProcessOwnerTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#ProcessOwnerTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataProcessOwner.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserProcessOwner").value
    var cbbPlant = $('#cbbPlantProcessOwner');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantProcessOwner",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantProcessOwner option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataProcessOwner.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataProcessOwner.OnChangePlant = function () {
    MasterDataProcessOwner.GetData()
}



MasterDataProcessOwner.GetData = function () {
    var ValPlant = $('#cbbPlantProcessOwner').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProcessOwnerData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataProcessOwner.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataProcessOwner.mDataTable.row.add(st);
                })
                MasterDataProcessOwner.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataProcessOwner.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantProcessOwnerModal');
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
                    $('#cbbPlantProcessOwnerModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantProcessOwnerModal").attr('disabled', 'disabled')
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


MasterDataProcessOwner.OnchangeProcessOwner = function ()
{
    var ValPlant = $('#cbbPlantProcessOwnerModal').val()
    var ValProcessOwner = document.getElementById("txtProcessOwner").value;
    $.ajax({
        url: "../MasterData/CheckProcessOwnerExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errProcessOwner").removeAttr("hidden");
                    var error = $('#errProcessOwner')
                    error.empty();
                    error.append('Audit Type already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errProcessOwner").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataProcessOwner.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.ProcessOwner').show()
    $("#txtHeaderGroupName").html('Add Audit Type')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataProcessOwner'
    MasterDataProcessOwner.GetPlantModal('')
}


MasterDataProcessOwner.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Audit Type?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataProcessOwner.Delete(MasterDataProcessOwner.Arr)
    });
}

MasterDataProcessOwner.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteProcessOwner",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataProcessOwner.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataProcessOwner.CheckboxClick = function(Number,Plant,ProcessOwner)
{
    var ckbox = $('#chkProcessOwner' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataProcessOwner.CollectData(Number, Plant, ProcessOwner, Checked)
}

MasterDataProcessOwner.ListProcessOwner = []
MasterDataProcessOwner.Arr = ""
MasterDataProcessOwner.CollectData = function (Number, Plant, ProcessOwner, Checked) {
    MasterDataProcessOwner.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataProcessOwner.ListProcessOwner.length; i++) {
        if (parseInt(MasterDataProcessOwner.ListProcessOwner[i].Number) == parseInt(Number)) {
            MasterDataProcessOwner.ListProcessOwner.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"ProcessOwner\":\"' + ProcessOwner + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataProcessOwner.ListProcessOwner.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataProcessOwner.ListProcessOwner.length; i++) {
        if (parseInt(MasterDataProcessOwner.ListProcessOwner[i].Checked) == parseInt(0)) {
            MasterDataProcessOwner.ListProcessOwner.splice(i, 1);
            break;
        }
    }
    var _ArrayProcessOwner = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataProcessOwner.ListProcessOwner, function (i, st) {
        _ArrayProcessOwner = []
        _JsonResult = []
        _ArrayProcessOwner[_ArrayProcessOwner.length] = st.Plant + '~' + st.ProcessOwner;
        array_JsonResult[array_JsonResult.length] = _ArrayProcessOwner;
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
    MasterDataProcessOwner.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataProcessOwner.EventEdit =  function(Plant,ProcessOwner, Active)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.ProcessOwner').show()
    $("#txtHeaderGroupName").html('Update Audit Type')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataProcessOwner'
    MasterDataProcessOwner.GetPlantModal(Plant)
    document.getElementById("txtProcessOwner").value = ProcessOwner
    document.getElementById("OldProcessOwner").value = ProcessOwner
    if(Active =='True')
    {
        $('#ChkActiveProcessOwnerMultipleFinding').prop("checked", true);
    }

    else
    {
        $('#ChkActiveProcessOwnerMultipleFinding').prop("checked", false);
    }
}



MasterDataProcessOwner.EmptyItem = function()
{
    $('#cbbPlantProcessOwnerModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtProcessOwner").value = ''
    document.getElementById("OldProcessOwner").value = ''
    $('#ChkActiveProcessOwnerMultipleFinding').prop("checked", false);
    $("#cbbPlantProcessOwnerModal").removeAttr('disabled')

    $("#errPlantProcessOwner").attr("hidden", "hidden");
    $("#errProcessOwner").attr("hidden", "hidden");
    $("#errProcessOwnerName").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataProcessOwner.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitProcessOwner",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataProcessOwner.EmptyItem()
                Notification.ShowToast('success', 'Audit Type ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataProcessOwner.GetData()
            }
            else {
                Loading.UnblockPage_()
                Notification.SweetAlert('error', 'error!', j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
