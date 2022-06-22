$(document).ready(function () {
    Loading.UnblockPage_()
    $('#MasterReport').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-submenu menu-item-open menu-item-here')
    $('#SubMasterOverview').removeClass('menu-item').addClass('menu-item menu-item-active')
    ReportOverviewByPeriod.initialTable()
    ReportOverviewByMonth.initialTable()
    //ReportOverview.GeneratedHighchard()
    ReportOverview.GetPlant()
});





function ReportOverviewByPeriod() { }

ReportOverviewByPeriod.mDataTable = null;

ReportOverviewByPeriod.initialTable = function () {
    var options = {
        //responsive: true,
        bSortCellsTop: true,
        ordering: true,
        fixedHeader: true,
        columns: [
           { "data": "Period" },
           { "data": "Open" },
           { "data": "InProgress" },
           { "data": "Completed" },
           { "data": "Total" },
      
        ],
       

    }

    var Table = $('#PeriodTable').DataTable(options);
    ReportOverviewByPeriod.mDataTable = Table;
}

ReportOverviewByPeriod.GetDataPeriod = function ()
{
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValPeriod = $('#cbbPeriod').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDataPeriod",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Period: ValPeriod
        },
        success: function (j) {
            if (j.Result == true) {
                ReportOverviewByPeriod.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ReportOverviewByPeriod.mDataTable.row.add(st);
                })
                ReportOverviewByPeriod.mDataTable.draw();
                Loading.UnblockPage_()
                ReportOverviewByMonth.GetDataMonth()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


function ReportOverviewByMonth() { }

ReportOverviewByMonth.mDataTable = null;

ReportOverviewByMonth.initialTable = function () {
    var options = {
        //responsive: true,
        bSortCellsTop: true,
        ordering: true,
        fixedHeader: true,
        columns: [
           { "data": "Number" },
           { "data": "Month" },
           { "data": "Open" },
           { "data": "InProgress" },
           { "data": "Completed" },
           { "data": "Total" },

        ],
        columnDefs:[
        {
            targets: 0,
            visible: false,
            searchable: false
        }]


    }

    var Table = $('#MonthTable').DataTable(options);
    ReportOverviewByMonth.mDataTable = Table;
}
ReportOverviewByMonth.GetDataMonth = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValPeriod = $('#cbbPeriod').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDataMonth",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Period: ValPeriod
        },
        success: function (j) {
            if (j.Result == true) {
                ReportOverviewByMonth.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ReportOverviewByMonth.mDataTable.row.add(st);
                })
                ReportOverviewByMonth.mDataTable.draw();
                Loading.UnblockPage_()
                ReportOverview.GetDataHighchart()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

function ReportOverview() { }
ReportOverview.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUser").value
    var cbbPlant = $('#cbbPlant');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");

    $.ajax({
        url: "../Report/GetPlant",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlant option[value="' + UserPlant + '"]').attr('selected', 'selected');
                ReportOverview.GetProcessOWner()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportOverview.OnChangePlant = function ()
{
    ReportOverview.GetProcessOWner()
}


ReportOverview.GetProcessOWner = function () {
    var ValPlant = $('#cbbPlant').val();
    var cbbProcessOwner = $('#cbbProcessOwner');
    cbbProcessOwner.empty();
    cbbProcessOwner.append("<option value=''>All Audit Type</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetProcessOWner",
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
                ReportOverview.GetPeriod()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
ReportOverview.OnChangeProcessOwner = function () {
    ReportOverview.GetPeriod()
}


ReportOverview.GetPeriod = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var cbbPeriod = $('#cbbPeriod');
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetPeriod",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPeriod.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportOverviewByPeriod.GetDataPeriod()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
ReportOverview.OnChangePeriod = function () {
    //ReportAllCase.GetProcessOWner()
    ReportOverviewByPeriod.GetDataPeriod()
}




ReportOverview.GeneratedHighchard =  function(_categories, _series)
{

    var chart;
    chart = new Highcharts.chart('Highchart', {
        chart: {
            renderTo: 'Highchart',
            type: 'column',
            height: 300,
            backgroundColor: '#fff',
        },
        title: {
            text: ''
        },
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },
        colors: ['#68D655', '#FF808A', '#FEC600'],
        xAxis: {
            categories: _categories, //['January', 'February', 'March', 'April', 'May'],
            
        },
        credits:
        {
            enabled: false
        },
        yAxis: {
            title: {
                text: ''
            }
        },

        series:_series,
         //[{
         //    name: 'Completed',
         //    data: [5, 3, 4, 7, 2]
         //}, {
         //    name: 'Progress',
         //    data: [2, 2, 3, 2, 1]
         //}, {
         //    name: 'Open',
         //    data: [3, 4, 4, 2, 5]
         //}],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    }
                }
            }]
        }
    });

}


ReportOverview.GetDataHighchart = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValPeriod = $('#cbbPeriod').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDataHighchart",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Period: ValPeriod
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0].series)
                console.log(j.Data[0].categories)

                ReportOverview.GeneratedHighchard(j.Data[0].categories, j.Data[0].series)
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}