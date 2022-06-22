
function MasterDataAuditType() { }


MasterDataAuditType.ShowAuditType = function () {
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnAuditType').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.AuditType').show()
    MasterDataAuditType.GetPlant()
}



MasterDataAuditType.mDataTable = null;

MasterDataAuditType.initialTable = function () {
    var options = {
        //responsive: true,
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#AuditTypeTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "AuditType" },
           { "data": "MultipleFinding" },
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
                checkbox += '<input type="checkbox" id=\'chkAuditType' + data.Number + '\' value="" class="checkable" onclick="MasterDataAuditType.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.AuditType + '\')"/>'
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
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataAuditType.EventEdit(\'' + data.Plant + '\',\'' + data.AuditType + '\',\'' + data.MultipleFinding + '\')">'
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
    var Table = $('#AuditTypeTable').DataTable(options);
    MasterDataAuditType.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#AuditTypeTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#AuditTypeTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataAuditType.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserAuditType").value
    var cbbPlant = $('#cbbPlantAuditType');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantAuditType",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantAuditType option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataAuditType.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataAuditType.OnChangePlant = function () {
    MasterDataAuditType.GetData()
}



MasterDataAuditType.GetData = function () {
    var ValPlant = $('#cbbPlantAuditType').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetAuditTypeData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataAuditType.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataAuditType.mDataTable.row.add(st);
                })
                MasterDataAuditType.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataAuditType.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantAuditTypeModal');
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
                    $('#cbbPlantAuditTypeModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantAuditTypeModal").attr('disabled', 'disabled')
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


MasterDataAuditType.OnchangeAuditType = function ()
{
    var ValPlant = $('#cbbPlantAuditTypeModal').val()
    var ValAuditType = document.getElementById("txtAuditType").value;
    $.ajax({
        url: "../MasterData/CheckAuditTypeExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            AuditType: ValAuditType
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errAuditType").removeAttr("hidden");
                    var error = $('#errAuditType')
                    error.empty();
                    error.append('AuditType already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errAuditType").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataAuditType.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.AuditType').show()
    $("#txtHeaderGroupName").html('Add AuditType')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataAuditType'
    MasterDataAuditType.GetPlantModal('')
}


MasterDataAuditType.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this AuditType?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataAuditType.Delete(MasterDataAuditType.Arr)
    });
}

MasterDataAuditType.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteAuditType",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataAuditType.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataAuditType.CheckboxClick = function(Number,Plant,AuditType)
{
    var ckbox = $('#chkAuditType' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataAuditType.CollectData(Number, Plant, AuditType, Checked)
}

MasterDataAuditType.ListAuditType = []
MasterDataAuditType.Arr = ""
MasterDataAuditType.CollectData = function (Number, Plant, AuditType, Checked) {
    MasterDataAuditType.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataAuditType.ListAuditType.length; i++) {
        if (parseInt(MasterDataAuditType.ListAuditType[i].Number) == parseInt(Number)) {
            MasterDataAuditType.ListAuditType.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"AuditType\":\"' + AuditType + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataAuditType.ListAuditType.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataAuditType.ListAuditType.length; i++) {
        if (parseInt(MasterDataAuditType.ListAuditType[i].Checked) == parseInt(0)) {
            MasterDataAuditType.ListAuditType.splice(i, 1);
            break;
        }
    }
    var _ArrayAuditType = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataAuditType.ListAuditType, function (i, st) {
        _ArrayAuditType = []
        _JsonResult = []
        _ArrayAuditType[_ArrayAuditType.length] = st.Plant + '~' + st.AuditType;
        array_JsonResult[array_JsonResult.length] = _ArrayAuditType;
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
    MasterDataAuditType.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataAuditType.EventEdit =  function(Plant,AuditType, Active)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.AuditType').show()
    $("#txtHeaderGroupName").html('Update AuditType')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataAuditType'
    MasterDataAuditType.GetPlantModal(Plant)
    document.getElementById("txtAuditType").value = AuditType
    document.getElementById("OldAuditType").value = AuditType
    if(Active =='True')
    {
        $('#ChkActiveAuditTypeMultipleFinding').prop("checked", true);
    }

    else
    {
        $('#ChkActiveAuditTypeMultipleFinding').prop("checked", false);
    }
}



MasterDataAuditType.EmptyItem = function()
{
    $('#cbbPlantAuditTypeModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtAuditType").value = ''
    document.getElementById("OldAuditType").value = ''
    $('#ChkActiveAuditTypeMultipleFinding').prop("checked", false);
    $("#cbbPlantAuditTypeModal").removeAttr('disabled')

    $("#errPlantAuditType").attr("hidden", "hidden");
    $("#errAuditType").attr("hidden", "hidden");
    $("#errAuditTypeName").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataAuditType.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitAuditType",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataAuditType.EmptyItem()
                Notification.ShowToast('success', 'AuditType ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataAuditType.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
