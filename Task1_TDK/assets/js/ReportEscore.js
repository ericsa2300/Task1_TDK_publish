$(document).ready(function () {
    Loading.UnblockPage_()
    $('#MasterReport').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-submenu menu-item-open menu-item-here')
    $('#SubMasterEScore').removeClass('menu-item').addClass('menu-item menu-item-active')
    ReportEscore.initialTable()
    ReportEscoreDetail.initialTable()
    $('.DetailScore').hide()
    $('.notPrint').show()
    $('.print').hide()
    //ReportOverview.GeneratedHighchard()
    ReportEscore.GetPlant()
});





function ReportEscore() { }

ReportEscore.mDataTable = null;

ReportEscore.initialTable = function () {
    var options = {
        //responsive: true,
        scrollX: true,
        columns: [
           { "data": "Number" },
           { "data": null },
           { "data": "Plant" },
           { "data": "ProcessOwner" },
           { "data": "Department" },
           { "data": "AvgScore" },
           { "data": "TotalFinding" },
           { "data": "PostBy" },
           { "data": "PostDate" },
           { "data": "ScoreId" },
        ],
        columnDefs: [
         {
             targets: 1,
             width: '50px',
             className: 'dt-left',
             orderable: false,
             render: function (data, type, full, meta) {
                 var Link = '<a href="#" onclick="ReportEscore.Evenclick(\'' + data.ScoreId + '\')" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">' + data.ScoreId + '</a>'
                 return Link
             },
         },
        {
            targets: 9,
            visible: false,
            searchable: false
        }],
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]


    }

    var Table = $('#EscoreTable').DataTable(options);
    ReportEscore.mDataTable = Table;
}

ReportEscore.GetDataEscore = function ()
{
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDataEScore",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                ReportEscore.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ReportEscore.mDataTable.row.add(st);
                })
                ReportEscore.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


ReportEscore.Evenclick = function(ScoreId)
{
    console.log(ScoreId)
    $('.HeadEscore').hide()
    $('.DetailScore').show()
    ReportEscoreDetail.GetDataDetailEscore(ScoreId)
}


ReportEscore.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUser").value
    var cbbPlant = $('#cbbPlant');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");

    $.ajax({
        url: "../Report/GetPlantEscore",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlant option[value="' + UserPlant + '"]').attr('selected', 'selected');
                ReportEscore.GetProcessOWner()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportEscore.OnChangePlant = function () {
    ReportEscore.GetProcessOWner()
}


ReportEscore.GetProcessOWner = function () {
    var ValPlant = $('#cbbPlant').val();
    var cbbProcessOwner = $('#cbbProcessOwner');
    cbbProcessOwner.empty();
    cbbProcessOwner.append("<option value=''>All Audit Type</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetProcessOWnerEscore",
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
                Loading.UnblockPage_()
                ReportEscore.GetDepartment()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
ReportEscore.OnChangeProcessOwner = function () {
    ReportEscore.GetDepartment()
}


ReportEscore.GetDepartment = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var cbbDepartment = $('#cbbDepartment');
    cbbDepartment.empty();
    cbbDepartment.append("<option value=''>All Department</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDepartmentEscore",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbDepartment.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportEscore.GetDataEscore()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
ReportEscore.OnChangeDepartment = function () {
    //ReportAllCase.GetProcessOWner()
    ReportEscore.GetDataEscore()
}



function ReportEscoreDetail() { }

ReportEscoreDetail.mDataTable = null;

ReportEscoreDetail.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#EscoreDetailTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "ScoreId" },
           { "data": "AuditNumber" },
           { "data": "AreaFocus" },
           { "data": "MainScope" },
           { "data": "SubScope" },
           { "data": "Score" },
           { "data": "TargetScore" },
           { "data": "Remark" },
           { "data": "PostBy" },
           { "data": "PostDate" },
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
                checkbox += '<input type="checkbox" id=\'chkEscore' + data.Number + '\' value="" class="checkable" onclick="ReportEscoreDetail.CheckboxClick(\'' + data.Number + '\',\'' + data.AuditNumber + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        }],
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]


    }

    var Table = $('#EscoreDetailTable').DataTable(options);
    ReportEscoreDetail.mDataTable = Table;


    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                //$(this).prop('checked', true);
                //$(this).closest('tr').addClass('active');
                $('#EscoreDetailTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                //$(this).prop('checked', false);
                //$(this).closest('tr').removeClass('active');
                $('#EscoreDetailTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}
ReportEscoreDetail.GetDataDetailEscore = function (ValScoreID) {
    $('#ScoreId').html(ValScoreID)
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDataDetailEScore",
        method: "POST",
        dataType: "JSON",
        data: {
            ScoreId: ValScoreID
        },
        success: function (j) {
            if (j.Result == true) {
                ReportEscoreDetail.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ReportEscoreDetail.mDataTable.row.add(st);
                })
                ReportEscoreDetail.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
ReportEscoreDetail.BackClick = function () {
    $('.DetailScore').hide()
    $('.HeadEscore').show()

    $('.notPrint').show()
    $('.print').hide()

    ReportEscoreDetail.AuditNumber = []
    ReportEscoreDetail.Arr = ''
}

ReportEscoreDetail.CheckboxClick = function (Number, AuditNumber)
{
    var ckbox = $('#chkEscore' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        if (AuditNumber != '')
        {
            Checked = 1
        }
        else
        {
            Checked = 0
            $('#chkEscore' + Number + '').prop("checked", false);
            Notification.ShowToast('warning', 'no finding')
        }
        
    }
    else {
        Checked = 0
    }

    ReportEscoreDetail.CollectData(Number, AuditNumber, Checked)
}




ReportEscoreDetail.AuditNumber = []
ReportEscoreDetail.Arr = ""

ReportEscoreDetail.CollectData = function (Number, AuditNumber, Checked) {
    ReportEscoreDetail.Arr = ""
    // replace data with same ID
    for (var i = 0; i < ReportEscoreDetail.AuditNumber.length; i++) {
        if (parseInt(ReportEscoreDetail.AuditNumber[i].Number) == parseInt(Number)) {
            ReportEscoreDetail.AuditNumber.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"AuditNumber\":\"' + AuditNumber + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    ReportEscoreDetail.AuditNumber.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < ReportEscoreDetail.AuditNumber.length; i++) {
        if (parseInt(ReportEscoreDetail.AuditNumber[i].Checked) == parseInt(0)) {
            ReportEscoreDetail.AuditNumber.splice(i, 1);
            break;
        }
    }
    var _ArrayAuditNumber = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(ReportEscoreDetail.AuditNumber, function (i, st) {
        _ArrayAuditNumber = []
        _JsonResult = []
        _ArrayAuditNumber[_ArrayAuditNumber.length] = st.AuditNumber;
        array_JsonResult[array_JsonResult.length] = _ArrayAuditNumber;
        _JsonResult.push(array_JsonResult.join(','))

        if (st.Checked == '1') {
            $('.notPrint').hide()
            $('.print').show()
        }
    })

    if (parseInt(_JsonResult.length) == 0) {
        $('.notPrint').show()
        $('.print').hide()
    }
    ReportEscoreDetail.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

ReportEscoreDetail.View = function () {
    //console.log(ReportEscoreDetail.Arr)
    //tinggal arahkan ke print PDF
    window.open('../CaseCompleted/PrintPDF2?Mode=manual&AuditNumber=' + ReportEscoreDetail.Arr + '', '_blank', "")
}

