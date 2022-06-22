
function MasterDataCriteria() { }


MasterDataCriteria.ShowCriteria = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnCriteria').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.Criteria').show()
    MasterDataCriteria.GetPlant()
}



MasterDataCriteria.mDataTable = null;

MasterDataCriteria.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#CriteriaTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Criteria" },
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
                checkbox += '<input type="checkbox" id=\'chkCriteria' + data.Number + '\' value="" class="checkable" onclick="MasterDataCriteria.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Criteria + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 6,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataCriteria.EventEdit(\'' + data.Plant + '\',\'' + data.Criteria + '\')">'
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
    var Table = $('#CriteriaTable').DataTable(options);
    MasterDataCriteria.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#CriteriaTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#CriteriaTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataCriteria.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserCriteria").value
    var cbbPlant = $('#cbbPlantCriteria');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantCriteria",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantCriteria option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataCriteria.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataCriteria.OnChangePlant = function () {
    MasterDataCriteria.GetData()
}



MasterDataCriteria.GetData = function () {
    var ValPlant = $('#cbbPlantCriteria').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetCriteriaData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataCriteria.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataCriteria.mDataTable.row.add(st);
                })
                MasterDataCriteria.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataCriteria.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantCriteriaModal');
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
                    $('#cbbPlantCriteriaModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantCriteriaModal").attr('disabled', 'disabled')
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


MasterDataCriteria.OnchangeCriteria = function ()
{
    var ValPlant = $('#cbbPlantCriteriaModal').val()
    var ValCriteria = document.getElementById("txtCriteria").value;
    $.ajax({
        url: "../MasterData/CheckCriteriaExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Criteria: ValCriteria
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errCriteria").removeAttr("hidden");
                    var error = $('#errCriteria')
                    error.empty();
                    error.append('Criteria already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errCriteria").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataCriteria.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Criteria').show()
    $("#txtHeaderGroupName").html('Add Criteria')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataCriteria'
    MasterDataCriteria.GetPlantModal('')
}


MasterDataCriteria.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Criteria?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataCriteria.Delete(MasterDataCriteria.Arr)
    });
}

MasterDataCriteria.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteCriteria",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataCriteria.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataCriteria.CheckboxClick = function(Number,Plant,Criteria)
{
    var ckbox = $('#chkCriteria' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataCriteria.CollectData(Number, Plant, Criteria, Checked)
}

MasterDataCriteria.ListCriteria = []
MasterDataCriteria.Arr = ""
MasterDataCriteria.CollectData = function (Number, Plant, Criteria, Checked) {
    MasterDataCriteria.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataCriteria.ListCriteria.length; i++) {
        if (parseInt(MasterDataCriteria.ListCriteria[i].Number) == parseInt(Number)) {
            MasterDataCriteria.ListCriteria.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Criteria\":\"' + Criteria + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataCriteria.ListCriteria.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataCriteria.ListCriteria.length; i++) {
        if (parseInt(MasterDataCriteria.ListCriteria[i].Checked) == parseInt(0)) {
            MasterDataCriteria.ListCriteria.splice(i, 1);
            break;
        }
    }
    var _ArrayCriteria = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataCriteria.ListCriteria, function (i, st) {
        _ArrayCriteria = []
        _JsonResult = []
        _ArrayCriteria[_ArrayCriteria.length] = st.Plant + '~' + st.Criteria;
        array_JsonResult[array_JsonResult.length] = _ArrayCriteria;
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
    MasterDataCriteria.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataCriteria.EventEdit =  function(Plant,Criteria)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Criteria').show()
    $("#txtHeaderGroupName").html('Update Criteria')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataCriteria'
    MasterDataCriteria.GetPlantModal(Plant)
    document.getElementById("txtCriteria").value = Criteria
    document.getElementById("OldCriteria").value = Criteria

}



MasterDataCriteria.EmptyItem = function()
{
    $('#cbbPlantCriteriaModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtCriteria").value = ''
    document.getElementById("OldCriteria").value = ''

    $("#cbbPlantCriteriaModal").removeAttr('disabled')

    $("#errPlantCriteria").attr("hidden", "hidden");
    $("#errCriteria").attr("hidden", "hidden");
    $("#errCriteriaName").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataCriteria.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitCriteria",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataCriteria.EmptyItem()
                Notification.ShowToast('success', 'Criteria ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataCriteria.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
