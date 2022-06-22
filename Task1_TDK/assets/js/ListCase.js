$(document).ready(function () {
    $('#MasterListCase').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')
    //default page
    ListCase.GetFormName('ListAction')
    ListCase.setDefaultDate()
    ListCase.GetPlant()
    //Dashboard.NormalColor();
    //Dashboard.EvenClick('BtnAction')

    //Dashboard.GetPlant()

    //// init table 
    ListAction.initialTable()
    //$('#ActionTable thead tr:eq(1) th').hide();

    ListResolution.initialTable()
    //$('#ResolutionTable thead tr:eq(1) th').hide();

    ListApproval.initialTable()
    //$('#ApprovalTable thead tr:eq(1) th').hide();

    ListCompleted.initialTable()
});


Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

function ListCase(){}

ListCase.Formnamevalue = "";

ListCase.GetFormName = function (Name)
{
    ListCase.Formnamevalue =  Name
    console.log(Name)
    if (ListCase.Formnamevalue == 'ListAction') {
        $('.input-daterange').hide()
        $('.NotDateRange').show()
        ListAction.Getdata()
    }
    else if (ListCase.Formnamevalue == 'ListResolution') {
        $('.input-daterange').hide()
        $('.NotDateRange').show()
        ListResolution.Getdata()
    }
    else if (ListCase.Formnamevalue == 'ListApproval') {
        $('.input-daterange').hide()
        $('.NotDateRange').show()
        ListApproval.Getdata()
    }
    else {
        $('.input-daterange').show()
        $('.NotDateRange').hide()
        ListCompleted.Getdata()
    }

}


ListCase.setDefaultDate = function () {
    var now = new Date();
    var mon = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    $('#StartDate').val(mon[now.getMonth()] + '/01/' + now.getFullYear());
    $('#EndDate').val(mon[now.getMonth()] + '/' + now.getDate() + '/' + now.getFullYear())
}

ListCase.GetPlant = function () {
    Loading.BlockPage()
    var cbbPlant = $('#cbbPlant');
    var UserPlant = document.getElementById("txtPlantUser").value
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    $.ajax({
        url: "../ListCase/GetPlant",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlant option[value="' + UserPlant + '"]').attr('selected', 'selected');
                ListCase.GetIssueFocus()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ListCase.OnChangePlant = function()
{
    ListCase.GetIssueFocus()
}

ListCase.GetIssueFocus = function () {
    Loading.BlockPage()
    var ValPlant = $('#cbbPlant').val();
    var cbbIssueFocus = $('#cbbIssueFocus')
    cbbIssueFocus.empty();
    cbbIssueFocus.append("<option value=''>All Issue Focus</option>");
    
    $.ajax({
        url: "../ListCase/GetIssueFocus",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbIssueFocus.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ListCase.GetCriteria()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
ListCase.OnChangeIssueFocus = function () {
    ListCase.GetCriteria()
}

ListCase.GetCriteria = function () {
    Loading.BlockPage()
    var ValPlant = $('#cbbPlant').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var cbbCriteria = $('#cbbCriteria')
    cbbCriteria.empty();
    cbbCriteria.append("<option value=''>All Criteria</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../ListCase/GetCriteria",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbCriteria.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()

                if (ListCase.Formnamevalue == 'ListAction')
                {
                    ListAction.Getdata()
                }
                else if (ListCase.Formnamevalue == 'ListResolution')
                {
                    ListResolution.Getdata()
                }
                else if (ListCase.Formnamevalue == 'ListApproval')
                {
                    ListApproval.Getdata()
                }
                else {
                    ListCompleted.Getdata()
                }
                
                return j.Data;
                
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ListCase.OnChangeCriteria = function () {
    if (ListCase.Formnamevalue == 'ListAction') {
        ListAction.Getdata()
    }
    else if (ListCase.Formnamevalue == 'ListResolution') {
        ListResolution.Getdata()
    }
    else if (ListCase.Formnamevalue == 'ListApproval') {
        ListApproval.Getdata()
    }
    else {
        ListCompleted.Getdata()
    }
}


function ListAction() { }
ListAction.mDataTable = null;

ListAction.initialTable = function () {
    var options = {
        //scrollX: true,
        "initComplete": function (settings, json) {
            $("#ActionTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": "Number" },
           { "data": null },
           { "data": "Plant" },
           { "data": "IssueTittle" },
           { "data": "IssueFocus" },
           { "data": "Criteria" },
           { "data": "DeptVendor" },
           { "data": "PostBy" },
           { "data": "PostDate" },
           { "data": "AuditNumber" }
        ],
        columnDefs: [
        {
            targets: 1,
            width: '50px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var Link = '<a href="../Action/SubmitAction?FormName=ListCaseAction&AuditNumber=' + data.AuditNumber + '" target="_blank" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">' + data.AuditNumber + '</a>'
                return Link
            },
        },
        {
            targets: 9,
            visible: false,
            searchable: false
        }
        ],
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }

    var Table = $('#ActionTable').DataTable(options);
    ListAction.mDataTable = Table;
}

ListAction.Getdata = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValCriteria = $('#cbbCriteria').val();
    Loading.BlockPage()
    $.ajax({
        url: "../ListCase/GetActionData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus,
            Criteria: ValCriteria
        },
        success: function (j) {
            if (j.Result == true) {
                ListAction.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ListAction.mDataTable.row.add(st);
                })
                ListAction.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

function ListResolution() { }
ListResolution.mDataTable = null;

ListResolution.initialTable = function () {
    var options = {
        //scrollX: true,
        "initComplete": function (settings, json) {
            $("#ResolutionTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": "Number" },
           { "data": null },
           { "data": "Plant" },
           { "data": "IssueTittle" },
           { "data": "IssueFocus" },
           { "data": "Criteria" },
           { "data": "DeptVendor" },
           { "data": "PostBy" },
           { "data": "PostDate" },
           { "data": "ActionBy" },
           { "data": "ActionDate" },
           { "data": "ActionTargetDate" },
           { "data": "AuditNumber" },
           { "data": "OutOfDate" }
        ],
        columnDefs: [
        {
            targets: 1,
            width: '50px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var Link = '<a href="../Resolution/SubmitResolution?FormName=ListCaseResolution&AuditNumber=' + data.AuditNumber + '" target="_blank" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">' + data.AuditNumber + '</a>'
                return Link
            },
        },
        {
            targets: 12,
            visible: false,
            searchable: false
        }
        ,
        {
            targets: 13,
            visible: false,
            searchable: false
        }
        ],
        rowCallback: function (row, data, index) {
            if (data.OutOfDate > 0) {
                $(row).find('td:eq(11)').css('color', 'red');
            }
            else {
                $(row).find('td:eq(11)').css('color', 'black');
            }
        },

        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }

    var Table = $('#ResolutionTable').DataTable(options);
    ListResolution.mDataTable = Table;
}

ListResolution.Getdata = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValCriteria = $('#cbbCriteria').val();
    Loading.BlockPage()
    $.ajax({
        url: "../ListCase/GetResolutionData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus,
            Criteria: ValCriteria
        },
        success: function (j) {
            if (j.Result == true) {
                ListResolution.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ListResolution.mDataTable.row.add(st);
                })
                ListResolution.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


function ListApproval() { }
ListApproval.mDataTable = null;

ListApproval.initialTable = function () {
    var options = {
        //scrollX: true,
        "initComplete": function (settings, json) {
            $("#ApprovalTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": "Number" },
           { "data": null },
           { "data": "Plant" },
           { "data": "IssueTittle" },
           { "data": "IssueFocus" },
           { "data": "Criteria" },
           { "data": "DeptVendor" },
           { "data": "PostBy" },
           { "data": "PostDate" },
           { "data": "ActionBy" },
           { "data": "ActionDate" },
           { "data": "ActionTargetDate" },
           { "data": "ResolvedBy" },
           { "data": "ResolvedDate" },
           { "data": "ResolvedTargetDate" },
           { "data": "AuditNumber" },
           { "data": "OutOfDate" }
        ],
        columnDefs: [
        {
            targets: 1,
            width: '50px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var Link = '<a href="../Approval/SubmitApproval?FormName=ListCaseApproval&AuditNumber=' + data.AuditNumber + '" target="_blank" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">' + data.AuditNumber + '</a>'
                return Link
            },
        },
        {
            targets: 15,
            visible: false,
            searchable: false
        },
        {
            targets: 16,
            visible: false,
            searchable: false
        }
        ],
        rowCallback: function (row, data, index) {
            if (data.OutOfDate > 0) {
                $(row).find('td:eq(14)').css('color', 'red');
            }
            else {
                $(row).find('td:eq(14)').css('color', 'black');
            }
        },
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }

    var Table = $('#ApprovalTable').DataTable(options);
    ListApproval.mDataTable = Table;
}

ListApproval.Getdata = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValCriteria = $('#cbbCriteria').val();
    Loading.BlockPage()
    $.ajax({
        url: "../ListCase/GetApprovalData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus,
            Criteria: ValCriteria
        },
        success: function (j) {
            if (j.Result == true) {
                ListApproval.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ListApproval.mDataTable.row.add(st);
                })
                ListApproval.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

function ListCompleted(){}
ListCompleted.mDataTable = null;

ListCompleted.initialTable = function () {
    var options = {
        //scrollX: true,
        "initComplete": function (settings, json) {
            $("#CompletedTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": "Number" },
           { "data": null },
           { "data": "Plant" },
           { "data": "IssueTittle" },
           { "data": "IssueFocus" },
           { "data": "Criteria" },
           { "data": "DeptVendor" },
           { "data": "PostBy" },
           { "data": "PostDate" },
           { "data": "ActionBy" },
           { "data": "ActionDate" },
           { "data": "ActionTargetDate" },
           { "data": "ResolvedBy" },
           { "data": "ResolvedDate" },
           { "data": "ResolvedTargetDate" },
           { "data": "CompletedBy" },
           { "data": "CompletedDate" },
           { "data": "AuditNumber" },
        ],
        columnDefs: [
        {
            targets: 1,
            width: '50px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var Link = '<a href="../CaseCompleted/CaseCompleted?FormName=CaseCompleted&AuditNumber=' + data.AuditNumber + '" target="_blank"  class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">' + data.AuditNumber + '</a>'
                return Link
            },
        },
        {
            targets: 17,
            visible: false,
            searchable: false
        }
        ],
        //dom: 'Bfrtip',
        //buttons: [
        //    'excel'
        //]
    }

    var Table = $('#CompletedTable').DataTable(options);
    ListCompleted.mDataTable = Table;
}

ListCompleted.OnChangeDate =  function()
{
    ListCompleted.Getdata()
}

ListCompleted.Getdata = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValCriteria = $('#cbbCriteria').val();
    var ValDateFrom = $('#StartDate').val();
    var ValDateTo = $('#EndDate').val();
    Loading.BlockPage()
    $.ajax({
        url: "../ListCase/GetCompletedData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus,
            Criteria: ValCriteria,
            DateFrom: ValDateFrom,
            DateTo: ValDateTo
        },
        success: function (j) {
            if (j.Result == true) {
                ListCompleted.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ListCompleted.mDataTable.row.add(st);
                })
                ListCompleted.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


