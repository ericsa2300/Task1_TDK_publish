$(document).ready(function () {
    $('#MasterSetting').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')

    //// init table 
    SettingAuditType.initialTable()
    SettingAuditType.GetPlant()
});


function SettingAuditType(){}

SettingAuditType.mDataTable = null;

SettingAuditType.initialTable = function () {
    var options = {
        //scrollX: true,
        "initComplete": function (settings, json) {
            $("#AuditSettingTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
            { "data": null },
            { "data": "Number" },
            { "data": "Plant" },
            { "data": "AuditType" },
            { "data": "IsActionPlan" },
            { "data": "IsRespondTime" },
            { "data": "ActionPlanRespondTime" },
            { "data": "ResolutionRespondTime" },
            { "data": "ApprovalResondTime" },
            { "data": "CreatedBy" },
            { "data": "CreatedDate" },
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
            width: '20px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var checkbox = '<label class="checkbox checkbox-single">'
                checkbox += '<input type="checkbox" id=\'chk' + data.Number + '\' value="" class="checkable" onclick="SettingAuditType.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.AuditType + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 4, // IsActionPlan
            searchable: false,
            render: function (data, type, full, meta) {
                var item = "";
                item = "<div class='mr-4 flex-shrink-0 text-center' style='width: 20px;'>"

                if (full.IsActionPlan == "True") {
                    item += "<i class='icon-md text-success flaticon2-check-mark'></i>";
                }
                else {
                    item += "<i class='icon-md text-danger flaticon2-cancel-music'></i>";
                }
                item += "</div>";
                return item;
            }
        },
        {
            targets: 5, // IsRespondTime
            searchable: false,
            render: function (data, type, full, meta) {
                var item = "";
                item = "<div class='mr-4 flex-shrink-0 text-center' style='width: 20px;'>"

                if (full.IsRespondTime == "True") {
                    item += "<i class='icon-md text-success flaticon2-check-mark'></i>";
                }
                else {
                    item += "<i class='icon-md text-danger flaticon2-cancel-music'></i>";
                }
                item += "</div>";
                return item;
            }
        },
        {
            targets: 11,
            width: '40px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var Link = '<div class="btn-group" role="group" aria-label="First group">'
                Link += '<button type="button" class="btn btn-success btn-icon"  onclick="SettingAuditType.Edit(\'' + data.Plant + '\',\'' + data.AuditType + '\',\'' + data.IsActionPlan + '\',\'' + data.IsRespondTime + '\',\'' + data.ActionPlanRespondTime + '\',\'' + data.ResolutionRespondTime + '\',\'' + data.ApprovalResondTime + '\')"><i class="la la-pencil"></i></button>'
                Link += '</div>'
                return Link
            },
        },
        ],
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }

    var Table = $('#AuditSettingTable').DataTable(options);
    SettingAuditType.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#AuditSettingTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#AuditSettingTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });
}

SettingAuditType.GetPlant = function () {
    Loading.BlockPage()
    var cbbPlant = $('#cbbPlant');
    var UserPlant = document.getElementById("txtPlantUser").value
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    $.ajax({
        url: "../Setting/GetPlantAuditType",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlant option[value="' + UserPlant + '"]').attr('selected', 'selected');
                SettingAuditType.Getdata()
            }
            else
            {
                Loading.UnblockPage_()
                Notification.SweetAlert('error','error!',j.Msg)
            }

        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}




SettingAuditType.Getdata = function () {
    var ValPlant = $('#cbbPlant').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Setting/GetDataAuditType",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                SettingAuditType.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    SettingAuditType.mDataTable.row.add(st);
                })
                SettingAuditType.mDataTable.draw();
                Loading.UnblockPage_()
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




SettingAuditType.CheckboxClick = function (Number, Plant, AuditType) {
    var ckbox = $('#chk' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    SettingAuditType.CollectData(Number, Plant + '~' + AuditType, Checked)
}


SettingAuditType.ListPlant = []
SettingAuditType.Arr = ""
SettingAuditType.CollectData = function (Number, Plant, Checked) {
    SettingAuditType.Arr = ""
    // replace data with same ID
    for (var i = 0; i < SettingAuditType.ListPlant.length; i++) {
        if (parseInt(SettingAuditType.ListPlant[i].Number) == parseInt(Number)) {
            SettingAuditType.ListPlant.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    SettingAuditType.ListPlant.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < SettingAuditType.ListPlant.length; i++) {
        if (parseInt(SettingAuditType.ListPlant[i].Checked) == parseInt(0)) {
            SettingAuditType.ListPlant.splice(i, 1);
            break;
        }
    }
    var _ArrayPlant = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(SettingAuditType.ListPlant, function (i, st) {
        _ArrayPlant = []
        _JsonResult = []
        _ArrayPlant[_ArrayPlant.length] = st.Plant;
        array_JsonResult[array_JsonResult.length] = _ArrayPlant;
        _JsonResult.push(array_JsonResult.join(','))

        if (st.Checked == '1') {
            $('.deleteAuditType').removeAttr('hidden')
        }
    })

    if (parseInt(_JsonResult.length) == 0) {
        $('.deleteAuditType').attr('hidden', 'hidden')
    }
    SettingAuditType.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

SettingAuditType.add = function()
{
    addSetAudit.GetPlant()
    $('#btnsave').html('<i class="icon-lg-md la la-save"></i>Save')
    addSetAudit.btnTemporaryAction(0)
    addSetAudit.btnReminder(0)
    $('#addSettingAuditType').modal('show')
}


SettingAuditType.Edit = function (Plant, AuditType, IsActionPlan, IsRespondTime, ActionPlanRespondTime, ResolutionRespondTime, ApprovalResondTime)
{
    console.log(Plant + '-' + AuditType)
    $('#btnsave').html('<i class="icon-lg-md la la-save"></i>Update')

    var cbbPlant = $('#cbbPlantModal');
    cbbPlant.empty();
    cbbPlant.append("<option value=\"" + Plant + "\">" + Plant + "</option>")
     $('#cbbPlantModal').attr('disabled','disabled')

    var cbbAuditTypeModal = $('#cbbAuditTypeModal');
    cbbAuditTypeModal.empty();
    cbbAuditTypeModal.append("<option value=\"" + AuditType + "\">" + AuditType + "</option>")
    $('#cbbAuditTypeModal').attr('disabled', 'disabled')
    if (IsActionPlan == 'True')
    {
        addSetAudit.btnTemporaryAction(1)
    }
    else
    {
        addSetAudit.btnTemporaryAction(0)
    }

    if (IsRespondTime == 'True') {
        addSetAudit.btnReminder(1)
    }
    else {
        addSetAudit.btnReminder(0)
    }
    document.getElementById("txtActionRespondTime").value = ActionPlanRespondTime
    document.getElementById("txtResolutionRespondTime").value = ResolutionRespondTime
    document.getElementById("txtApprovalRespondTime").value = ApprovalResondTime
    


    $('#addSettingAuditType').modal('show')
}

SettingAuditType.delete = function()
{
    Loading.BlockPage()
    $.ajax({
        url: "../Setting/deleteAuditType",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: SettingAuditType.Arr,
        },
        success: function (j) {
            if (j.Result == true) {
                Loading.UnblockPage_()
                Notification.SweetAlert('success', 'success!', 'deleted')
                SettingAuditType.Getdata()
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



function addSetAudit() { }

addSetAudit.GetPlant = function () {
    Loading.BlockPage()
    var cbbPlant = $('#cbbPlantModal');
    cbbPlant.empty();
    $.ajax({
        url: "../Setting/GetPlantMaster",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                addSetAudit.AuditType()
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



addSetAudit.AuditType = function () {
    Loading.BlockPage()
    var Plant = $('#cbbPlantModal').val();
    var cbbAuditTypeModal = $('#cbbAuditTypeModal');
    cbbAuditTypeModal.empty();
    $.ajax({
        url: "../Setting/GetAuditTypeMaster",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: Plant,
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbAuditTypeModal.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
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


addSetAudit.btnTemporaryAction = function(value)
{
    if (value == 1)
    {
        $('#btnEnableAction').removeClass('btn btn-sm btn-light font-weight-bold').addClass('btn btn-sm btn-primary2 font-weight-bold')
        $('#btnDisableAction').removeClass('btn btn-sm btn-primary2 font-weight-bold').addClass('btn btn-sm btn-light font-weight-bold')
    }
    else
    {
        $('#btnDisableAction').removeClass('btn btn-sm btn-light font-weight-bold').addClass('btn btn-sm btn-primary2 font-weight-bold')
        $('#btnEnableAction').removeClass('btn btn-sm btn-primary2 font-weight-bold').addClass('btn btn-sm btn-light font-weight-bold')
    }
    document.getElementById("chkAction").value = value
        
}

addSetAudit.btnReminder = function (value) {
    if (value == 1) {
        $('#btnEnableReminder').removeClass('btn btn-sm btn-light font-weight-bold').addClass('btn btn-sm btn-primary2 font-weight-bold')
        $('#btnDsableReminder').removeClass('btn btn-sm btn-primary2 font-weight-bold').addClass('btn btn-sm btn-light font-weight-bold')
    }
    else {
        $('#btnDsableReminder').removeClass('btn btn-sm btn-light font-weight-bold').addClass('btn btn-sm btn-primary2 font-weight-bold')
        $('#btnEnableReminder').removeClass('btn btn-sm btn-primary2 font-weight-bold').addClass('btn btn-sm btn-light font-weight-bold')
    }
    document.getElementById("chkReminder").value = value
}


addSetAudit.submit = function()
{
    var Plant = $('#cbbPlantModal').val();
    var AuditType = $('#cbbAuditTypeModal').val();
    var Action =  document.getElementById("chkAction").value
    var reminder = document.getElementById("chkReminder").value
    var ActionRespondTime = document.getElementById("txtActionRespondTime").value
    var ResolutionRespondTime = document.getElementById("txtResolutionRespondTime").value
    var ApprovalRespondTime = document.getElementById("txtApprovalRespondTime").value
    var condition = $('#btnsave').text()

    var datas = Plant
    datas += '~' + AuditType
    datas += '~' + Action
    datas += '~' + reminder
    datas += '~' + ActionRespondTime
    datas += '~' + ResolutionRespondTime
    datas += '~' + ApprovalRespondTime
    datas += '~' + condition
    console.log(datas)
    Loading.BlockPage()
    $.ajax({
        url: "../Setting/SubmitAuditType",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas,
        },
        success: function (j) {
            if (j.Result == true) {
                Loading.UnblockPage_()
                Notification.SweetAlert('success', 'success!', 'Successfully ' + condition + '')
                $('#addSettingAuditType').modal('hide')
                SettingAuditType.Getdata()

                addSetAudit.Clear()
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


addSetAudit.Clear = function()
{
    document.getElementById("txtActionRespondTime").value =0
    document.getElementById("txtResolutionRespondTime").value = 0
    document.getElementById("txtApprovalRespondTime").value = 0
    $('#cbbPlantModal').removeAttr('disabled')
    $('#cbbAuditTypeModal').removeAttr('disabled')
}