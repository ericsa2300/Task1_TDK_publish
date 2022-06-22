
function MasterDataPeriod() { }


MasterDataPeriod.ShowPeriod = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnPeriod').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.Period').show()
    MasterDataPeriod.GetPlant()
}



MasterDataPeriod.mDataTable = null;

MasterDataPeriod.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#PeriodTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Period" },
           { "data": "FromMonth" },
           { "data": "ToMonth" },
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
                checkbox += '<input type="checkbox" id=\'chkPeriod' + data.Number + '\' value="" class="checkable" onclick="MasterDataPeriod.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Period + '\')"/>'
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
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataPeriod.EventEdit(\'' + data.Plant + '\',\'' + data.Period + '\')">'
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
    var Table = $('#PeriodTable').DataTable(options);
    MasterDataPeriod.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#PeriodTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#PeriodTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataPeriod.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserPeriod").value
    var cbbPlant = $('#cbbPlantperiod');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantPeriod",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantperiod option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataPeriod.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataPeriod.OnChangePlant = function () {
    MasterDataPeriod.GetData()
}



MasterDataPeriod.GetData = function () {
    var ValPlant = $('#cbbPlantperiod').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPeriodData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataPeriod.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataPeriod.mDataTable.row.add(st);
                })
                MasterDataPeriod.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataPeriod.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantPeriodModal');
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
                    $('#cbbPlantPeriodModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantPeriodModal").attr('disabled', 'disabled')
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


MasterDataPeriod.OnchangePeriod = function()
{
    var ValPlant = $('#cbbPlantPeriodModal').val()
    var ValPeriod = document.getElementById("txtPeriod").value;
    $.ajax({
        url: "../MasterData/CheckPeriodExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Period: ValPeriod
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errPeriod").removeAttr("hidden");
                    var error = $('#errPeriod')
                    error.empty();
                    error.append('Period already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errPeriod").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataPeriod.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Period').show()
    $("#txtHeaderGroupName").html('Add Period')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataPeriod'
    MasterDataPeriod.GetPlantModal('')
}


MasterDataPeriod.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Period?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataPeriod.Delete(MasterDataPeriod.Arr)
    });
}

MasterDataPeriod.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeletePeriod",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataPeriod.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataPeriod.CheckboxClick = function(Number,Plant,Period)
{
    var ckbox = $('#chkPeriod' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataPeriod.CollectData(Number, Plant, Period, Checked)
}

MasterDataPeriod.ListPeriod = []
MasterDataPeriod.Arr = ""
MasterDataPeriod.CollectData = function (Number, Plant, Period, Checked) {
    MasterDataPeriod.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataPeriod.ListPeriod.length; i++) {
        if (parseInt(MasterDataPeriod.ListPeriod[i].Number) == parseInt(Number)) {
            MasterDataPeriod.ListPeriod.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Period\":\"' + Period + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataPeriod.ListPeriod.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataPeriod.ListPeriod.length; i++) {
        if (parseInt(MasterDataPeriod.ListPeriod[i].Checked) == parseInt(0)) {
            MasterDataPeriod.ListPeriod.splice(i, 1);
            break;
        }
    }
    var _ArrayPeriod = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataPeriod.ListPeriod, function (i, st) {
        _ArrayPeriod = []
        _JsonResult = []
        _ArrayPeriod[_ArrayPeriod.length] = st.Plant + '~' + st.Period;
        array_JsonResult[array_JsonResult.length] = _ArrayPeriod;
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
    MasterDataPeriod.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataPeriod.EventEdit =  function(Plant,Period)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Period').show()
    $("#txtHeaderGroupName").html('Update Period')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataPeriod'
    MasterDataPeriod.GetPlantModal(Plant)
    document.getElementById("txtPeriod").value = Period
    document.getElementById("OldtxtPeriod").value = Period

}



MasterDataPeriod.EmptyItem = function()
{
    $('#cbbPlantPeriodModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtPeriod").value = ''
    document.getElementById("OldtxtPeriod").value = ''
    $('#StartDate').val('')
    $('#EndDate').val('')

    $("#cbbPlantPeriodModal").removeAttr('disabled')
    $("#errPlantPeriod").attr("hidden", "hidden");
    $("#errPeriod").attr("hidden", "hidden");
    $("#errPeriodStartDate").attr("hidden", "hidden");
    $("#errPeriodEndDate").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataPeriod.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/Submitperiod",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataPeriod.EmptyItem()
                Notification.ShowToast('success', 'Period ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataPeriod.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
