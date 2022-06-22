$(document).ready(function () {
    Loading.UnblockPage_()
    $('#MasterReport').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-submenu menu-item-open menu-item-here')
    $('#SubMasterByProduct').removeClass('menu-item').addClass('menu-item menu-item-active')
    ReportByProduct.initialTable()
    ReportByProduct.setDefaultDate()
    ReportByProduct.GetPlant()


    //ReportByProduct.GeneratedDonut()
});


function ReportByProduct() { }

ReportByProduct.mDataTable = null;

ReportByProduct.initialTable = function () {
    var options = {
        bSortCellsTop: true,
        ordering: true,
        fixedHeader: true,
        columns: [
           { "data": "Product" },
           { "data": "Open" },
           { "data": "InProgress" },
           { "data": "Completed" },
           { "data": "Total" },

        ],


    }

    var Table = $('#ByProductTable').DataTable(options);
    ReportByProduct.mDataTable = Table;
}

ReportByProduct.GetPlant = function () {
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
                ReportByProduct.GetProcessOWner()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportByProduct.OnChangePlant = function () {
    ReportByProduct.GetProcessOWner()
}


ReportByProduct.GetProcessOWner = function () {
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
                ReportByProduct.GetDataProductTable()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
ReportByProduct.OnChangeProcessOwner = function () {
    ReportByProduct.GetDataProductTable()
}

Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

ReportByProduct.setDefaultDate = function () {
    var now = new Date();
    var mon = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    $('#StartDate').val(mon[now.getMonth()] + '/01/' + now.getFullYear());
    $('#EndDate').val(mon[now.getMonth()] + '/' + now.getDate() + '/' + now.getFullYear())
}

ReportByProduct.OnChangeDate = function () {
    ReportByProduct.GetDataProductTable()
}



ReportByProduct.GetDataProductTable = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStartDate = $('#StartDate').val();
    var ValEndDate = $('#EndDate').val();
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDataProductTable",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            StartDate: ValStartDate,
            EndDate: ValEndDate
        },
        success: function (j) {
            if (j.Result == true) {
                ReportByProduct.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ReportByProduct.mDataTable.row.add(st);
                })
                ReportByProduct.mDataTable.draw();
                Loading.UnblockPage_()
                ReportByProduct.GetDataHighchart()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportByProduct.GetDataHighchart = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStartDate = $('#StartDate').val();
    var ValEndDate = $('#EndDate').val();

    $('#plant').html(ValPlant)
    $('#FromTo').html(ValStartDate)
    $('#to').html(ValEndDate)

    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDataHighchartProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            StartDate: ValStartDate,
            EndDate: ValEndDate
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0]);
                //console.log(j.Data[0].series)
                //console.log(j.Data[0].categories)

                ReportByProduct.GeneratedHighchard(j.Data[0].categories, j.Data[0].series)
                Loading.UnblockPage_()
                ReportByProduct.GetDataDonutName()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportByProduct.GeneratedHighchard = function (_categories, _series) {

    var chart;
    chart = new Highcharts.chart('Highchart', {
        chart: {
            renderTo: 'Highchart',
            type: 'column',
            height: 350,
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
            //categories: ['January', 'February', 'March', 'April', 'May'],
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

        series: _series,
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


ReportByProduct.GetDataDonutName = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStartDate = $('#StartDate').val();
    var ValEndDate = $('#EndDate').val();

    var DonutSlider = $("#div_Slider")
    DonutSlider.empty()
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDataDonutName",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            StartDate: ValStartDate,
            EndDate: ValEndDate
        },
        success: function (j) {
            if (j.Result == true) {
                //console.log(j.Data[0])
                Loading.UnblockPage_()
                var departmemt = j.Data[0]
                for (var i = 0; i < departmemt.length; i++) {
                    ReportByProduct.GetDataDonut(departmemt[i])
                }
                
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


ReportByProduct.GetDataDonut = function (Department) {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStartDate = $('#StartDate').val();
    var ValEndDate = $('#EndDate').val();

    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDataDonutChartProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            StartDate: ValStartDate,
            EndDate: ValEndDate,
            Department: Department
        },
        success: function (j) {
            if (j.Result == true) {
                //console.log(j.Data[0].series)
                //console.log(j.Data[0].categories)
                $("#div_Slider").append('<div id="divFilter_' + j.Data[0].categories + '"  class="swiper-slide" style="background-color:#fff" ></div></div>')
                Loading.UnblockPage_()
                ReportByProduct.GeneratedDonut(j.Data[0].categories, j.Data[0].series)
                SlickSlider.initSlickProduct()
                
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


ReportByProduct.GeneratedDonut = function (CategoriesX,SeriesY)
{
    var chart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#fff',
            renderTo: 'divFilter_' + CategoriesX,
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: CategoriesX,
            //text: 'BB',
            //align: 'center',
            //verticalAlign: 'middle',
            //y: 5,
            //x: 0
        },
        colors: ['#A3E4D7', '#EB984E', '#BDC3C7', '#F7DC6F', '#66b3ff', '#27AE60'],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true
            }
        },
        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            width: 120,
            y: 20,
            verticalAlign: 'middle',
            useHTML: true,
            labelFormatter: function () {
                return '<div style="text-align: left; width:100px;">' + this.name + '</div><div style="width:40px; text-align:left;">' + this.y + '</div>';
            }
        },

        series: [{
            name: 'Source',

            data: SeriesY,
            //[{
            //    name: 'Internet Explorer',
            //    y: 11.84
            //}, {
            //    name: 'Firefox',
            //    y: 10.85
            //}, {
            //    name: 'Edge',
            //    y: 4.67
            //}, {
            //    name: 'Safari',
            //    y: 4.18
            //}, {
            //    name: 'Sogou Explorer',
            //    y: 1.64
            //}]
           
        }]
    });
}


/*
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
*/