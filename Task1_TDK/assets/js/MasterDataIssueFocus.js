
function MasterDataIssueFocus() { }


MasterDataIssueFocus.ShowIssueFocus = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnIssueFocus').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.IssueFocus').show()
    MasterDataIssueFocus.GetPlant()
}



MasterDataIssueFocus.mDataTable = null;

MasterDataIssueFocus.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#IssueFocusTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "IssueFocus" },
           { "data": "MailAcknowledgement" },
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
                checkbox += '<input type="checkbox" id=\'chkIssueFocus' + data.Number + '\' value="" class="checkable" onclick="MasterDataIssueFocus.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.IssueFocus + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 7,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataIssueFocus.EventEdit(\'' + data.Plant + '\',\'' + data.IssueFocus + '\',\'' + data.MailAcknowledgement + '\')">'
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
    var Table = $('#IssueFocusTable').DataTable(options);
    MasterDataIssueFocus.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#IssueFocusTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#IssueFocusTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataIssueFocus.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserIssueFocus").value
    var cbbPlant = $('#cbbPlantIssueFocus');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");

    $.ajax({
        url: "../MasterData/GetPlantIssueFocus",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantIssueFocus option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataIssueFocus.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataIssueFocus.OnChangePlant = function () {
    MasterDataIssueFocus.GetData()
}



MasterDataIssueFocus.GetData = function () {
    var ValPlant = $('#cbbPlantIssueFocus').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetIssueFocusData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataIssueFocus.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataIssueFocus.mDataTable.row.add(st);
                })
                MasterDataIssueFocus.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataIssueFocus.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantIssueFocusModal');
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
                    $('#cbbPlantIssueFocusModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantIssueFocusModal").attr('disabled', 'disabled')
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


MasterDataIssueFocus.OnchangeIssueFocus = function()
{
    var ValPlant = $('#cbbPlantIssueFocusModal').val()
    var ValIssueFocus = document.getElementById("txtIssueFocus").value;
    $.ajax({
        url: "../MasterData/CheckIssueFocusExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errIssueFocus").removeAttr("hidden");
                    var error = $('#errIssueFocus')
                    error.empty();
                    error.append('Issue Focus already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errIssueFocus").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataIssueFocus.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    $("#txtHeaderGroupName").html('Add Issue Focus')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataIssueFocus'
    MasterDataIssueFocus.GetPlantModal('')
}


MasterDataIssueFocus.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Issue focus?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataIssueFocus.Delete(MasterDataIssueFocus.Arr)
    });
}

MasterDataIssueFocus.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteIssueFocus",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataIssueFocus.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataIssueFocus.CheckboxClick = function(Number,Plant,IssueFocus, MailAcknowledgement)
{
    var ckbox = $('#chkIssueFocus' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataIssueFocus.CollectData(Number, Plant, IssueFocus, MailAcknowledgement, Checked)
}

MasterDataIssueFocus.ListIssueFocus = []
MasterDataIssueFocus.Arr = ""
MasterDataIssueFocus.CollectData = function (Number,Plant, IssueFocus, MailAcknowledgement, Checked) {
    MasterDataIssueFocus.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataIssueFocus.ListIssueFocus.length; i++) {
        if (parseInt(MasterDataIssueFocus.ListIssueFocus[i].Number) == parseInt(Number)) {
            MasterDataIssueFocus.ListIssueFocus.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"IssueFocus\":\"' + IssueFocus + '\",'
    tr += '\"MailAcknowledgement\":\"' + MailAcknowledgement + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataIssueFocus.ListIssueFocus.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataIssueFocus.ListIssueFocus.length; i++) {
        if (parseInt(MasterDataIssueFocus.ListIssueFocus[i].Checked) == parseInt(0)) {
            MasterDataIssueFocus.ListIssueFocus.splice(i, 1);
            break;
        }
    }
    var _ArrayIssueFocus = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataIssueFocus.ListIssueFocus, function (i, st) {
        _ArrayIssueFocus = []
        _JsonResult = []
        _ArrayIssueFocus[_ArrayIssueFocus.length] = st.Plant+'~'+st.IssueFocus;
        array_JsonResult[array_JsonResult.length] = _ArrayIssueFocus;
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
    MasterDataIssueFocus.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataIssueFocus.EventEdit =  function(Plant,IssueFocus, MailAcknowledgement)
{
    $("#ModalMasterData").modal('show');
    $("#txtHeaderGroupName").html('Update Issue Focus')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataIssueFocus'
    MasterDataIssueFocus.GetPlantModal(Plant)
    document.getElementById("txtIssueFocus").value = IssueFocus
    document.getElementById("OldtxtIssueFocus").value = IssueFocus
    document.getElementById("txtMailAcknowledgement").value = MailAcknowledgement
}



MasterDataIssueFocus.EmptyItem = function()
{
    $('#cbbPlantIssueFocusModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtIssueFocus").value = ''
    document.getElementById("OldtxtIssueFocus").value = ''

    $("#cbbPlantIssueFocusModal").removeAttr('disabled')
    $("#errPlantIssueFocus").attr("hidden", "hidden");
    $("#errIssueFocus").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataIssueFocus.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitIssueFocus",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataIssueFocus.EmptyItem()
                Notification.ShowToast('success', 'Issue focus ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataIssueFocus.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
