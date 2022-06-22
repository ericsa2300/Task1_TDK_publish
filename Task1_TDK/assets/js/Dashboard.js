$(document).ready(function () {
    Loading.UnblockPage_()
    $('#MasterDashboard').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')
    Dashboard.NormalColor();
    Dashboard.EvenClick('BtnAction')

    Dashboard.GetPlant()

    // init table 
    Action.initialTable();
    //$('#ActionTable thead tr:eq(1) th').hide();

    Resolution.initialTable();
    //$('#ResolutionTable thead tr:eq(1) th').hide();

    Approval.initialTable();
    //$('#ApprovalTable thead tr:eq(1) th').hide();

    console.log(Dashboard.GetScreenMobile())// ini buat change screen ke mobile mode
});


function Dashboard() { }

Dashboard.GetScreenMobile = function()
{
    var w = screen.width;
    var h = screen.height;

    var result

    if (parseInt(w) < 700)
    {
        result = true
    }
    else
    {
        result = false
    }
    return result
}


Dashboard.EvenClick = function (column) {
    Dashboard.NormalColor();
    //$("#" + column + "").css('background-color', '#04acc4');
    $("#" + column + "").removeClass('nav-link border py-10 d-flex flex-grow-1 rounded flex-column').addClass('nav-link active border py-10 d-flex flex-grow-1 rounded flex-column')

    if(column == 'BtnAction')
    {
        $('.divAction').removeAttr('hidden')
        $('.divResolution').attr('hidden', 'hidden')
        $('.divApproval').attr('hidden', 'hidden')
    }
    else if(column == 'BtnResolution')
    {
        $('.divAction').attr('hidden','hidden')
        $('.divResolution').removeAttr('hidden')
        $('.divApproval').attr('hidden', 'hidden')
    }
    else
    {
        $('.divAction').attr('hidden','hidden')
        $('.divResolution').attr('hidden', 'hidden')
        $('.divApproval').removeAttr('hidden')
    }
}

Dashboard.NormalColor = function()
{
    $("#Welcome").css('background-color', '#FFF');
    $("#Action").css('background-color', '#FFF');
    $("#Resolution").css('background-color', '#FFF');
    $("#Approval").css('background-color', '#FFF');
    $("#OutStanding").css('background-color', '#FFF');

    $('#BtnAction').attr('class', 'nav-link border py-10 d-flex flex-grow-1 rounded flex-column')
    $('#BtnResolution').attr('class', 'nav-link border py-10 d-flex flex-grow-1 rounded flex-column')
    $('#BtnApproval').attr('class', 'nav-link border py-10 d-flex flex-grow-1 rounded flex-column')
}

Dashboard.GetPlant = function () {
    var cbbPlant = $('#cbbPlant');
    var UserPlant = document.getElementById("txtPlantUser").value
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");

    $.ajax({
        url: "../Home/GetPlant",
        method: "POST",
        dataType: "JSON",
        //data: {
        //    MainSection: MainSection
        //},
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlant option[value="' + UserPlant + '"]').attr('selected', 'selected');
                Dashboard.GetIssueFocus()
            }
            else {
                Loading.UnblockPage_()
                Notification.SweetAlert('error', 'error', j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

Dashboard.GetIssueFocus = function () {
    var ValPlant = $('#cbbPlant').val();;
    var cbbIssueFocus = $('#cbbIssueFocus')
    cbbIssueFocus.empty();
    cbbIssueFocus.append("<option value=''>All Issue Focus</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Home/GetIssueFocus",
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
                Dashboard.GetTotal()
                Action.Getdata()
                Resolution.Getdata()
                Approval.Getdata()
            }
            else {
                Loading.UnblockPage_()
                Notification.SweetAlert('error', 'error', j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

Dashboard.OnchangePlant =  function()
{
    Dashboard.GetIssueFocus()
}

Dashboard.OnchangeIssueFocus = function () {
    Dashboard.GetTotal()
    Action.Getdata()
    Resolution.Getdata()
    Approval.Getdata()
}


Dashboard.GetTotal = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Home/GetTotal",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus
        },
        success: function (j) {
            if (j.Result == true) {
                $('#TotalAction').html(j.Data[0][0].TotalAction)
                $('#TotalResolution').html(j.Data[0][0].TotalResolution)
                $('#TotalApproval').html(j.Data[0][0].TotalApproval)
                $('#TotalOutStanding').html(j.Data[0][0].TotalOutStanding)
                Loading.UnblockPage_()
            }
            else {
                Loading.UnblockPage_()
                Notification.SweetAlert('error', 'error', j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

function Action() { }
Action.mDataTable = null;

Action.initialTable = function () {
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
    Action.mDataTable = Table;


    //$('#ActionTable thead tr').clone(true).appendTo('#ActionTable thead');
    //$('#ActionTable thead tr:eq(1) th').each(function (i) {
    //    var title = $(this).text();
    //    //$(this).html('<input type="text" placeholder="Search ' + title + '" />');
    //    $(this).html('<input type="text" class="form-control" placeholder="Search..." />');
    //    $('input', this).on('keyup change', function () {
    //        if (Table.column(i).search() !== this.value) {
    //            Table
    //                .column(i)
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
}
//Action.FilterOpen = function () {
//    $('#ActionTable thead tr:eq(1) th').toggle();
//}



Action.Getdata = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Home/GetActionData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus
        },
        success: function (j) {
            if (j.Result == true) {
                Action.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    Action.mDataTable.row.add(st);
                })
                Action.mDataTable.draw();
                Loading.UnblockPage_()
            }
            else {
                Loading.UnblockPage_()
                Notification.SweetAlert('error', 'error', j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}






function Resolution() { }
Resolution.mDataTable = null;

Resolution.initialTable = function () {
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
    Resolution.mDataTable = Table;


    //$('#ResolutionTable thead tr').clone(true).appendTo('#ResolutionTable thead');
    //$('#ResolutionTable thead tr:eq(1) th').each(function (i) {
    //    var title = $(this).text();
    //    //$(this).html('<input type="text" placeholder="Search ' + title + '" />');
    //    $(this).html('<input type="text" class="form-control" placeholder="Search..." />');
    //    $('input', this).on('keyup change', function () {
    //        if (Table.column(i).search() !== this.value) {
    //            Table
    //                .column(i)
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
}
//Resolution.FilterOpen = function () {
//    $('#ResolutionTable thead tr:eq(1) th').toggle();
//}


Resolution.Getdata = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Home/GetResolutionData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus
        },
        success: function (j) {
            if (j.Result == true) {
                Resolution.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    Resolution.mDataTable.row.add(st);
                })
                Resolution.mDataTable.draw();
                Loading.UnblockPage_()
            }
            else {
                Loading.UnblockPage_()
                Notification.SweetAlert('error', 'error', j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



function Approval() { }
Approval.mDataTable = null;

Approval.initialTable = function () {
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
    Approval.mDataTable = Table;


    //$('#ApprovalTable thead tr').clone(true).appendTo('#ApprovalTable thead');
    //$('#ApprovalTable thead tr:eq(1) th').each(function (i) {
    //    var title = $(this).text();
    //    //$(this).html('<input type="text" placeholder="Search ' + title + '" />');
    //    $(this).html('<input type="text" class="form-control" placeholder="Search..." />');
    //    $('input', this).on('keyup change', function () {
    //        if (Table.column(i).search() !== this.value) {
    //            Table
    //                .column(i)
    //                .search(this.value)
    //                .draw();
    //        }
    //    });
    //});
}
//Approval.FilterOpen = function () {
//    $('#ApprovalTable thead tr:eq(1) th').toggle();
//}


Approval.Getdata = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Home/GetApprovalData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            IssueFocus: ValIssueFocus
        },
        success: function (j) {
            if (j.Result == true) {
                Approval.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    Approval.mDataTable.row.add(st);
                })
                Approval.mDataTable.draw();
                Loading.UnblockPage_()
            }
            else {
                Loading.UnblockPage_()
                Notification.SweetAlert('error', 'error', j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

