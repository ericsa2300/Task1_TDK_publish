$(document).ready(function () {
    $('#MasterNewScore').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')

    $('#BtnCancel').attr('disabled', 'disabled')
    $('#BtnSubmit').attr('disabled', 'disabled')
    SubmitNewScore.GetPlant()

    SubmitNewScore.initialTable()
    DetailScore.initialTable()
});




function SubmitNewScore(){}


SubmitNewScore.GetPlant = function () {
    Loading.BlockPage()
    var cbbPlant = $('#cbbPlant');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>choose Plant</option>");
    $.ajax({
        url: "../SubmitNewScore/GetPlant",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st.Plant + "\">" + st.PlantDesc + "</option>")
                });
                Loading.UnblockPage_()
                SubmitNewScore.GetProcessOwner()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitNewScore.OnChangePlant = function()
{
    SubmitNewScore.GetProcessOwner()
}

SubmitNewScore.GetProcessOwner = function () {
    Loading.BlockPage()
    var ValPlant = $('#cbbPlant').val();
    var cbbProcessOwner = $('#cbbProcessOwner')
    cbbProcessOwner.empty();
    cbbProcessOwner.append("<option value=''>Choose Audit Type</option>");
    
    $.ajax({
        url: "../SubmitNewScore/GetProcessOwner",
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
                SubmitNewScore.GetDepartment()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
SubmitNewScore.OnChangeProcessOwner = function () {
    SubmitNewScore.GetDepartment()
}

SubmitNewScore.GetDepartment = function () {
    Loading.BlockPage()
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var cbbDepartment = $('#cbbDepartment')
    cbbDepartment.empty();
    cbbDepartment.append("<option value=''>Choose Department</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/GetDepartment",
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
                
                return j.Data;
                
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitNewScore.OnChangeDepartment = function () {
    $('#BtnCancel').removeAttr('disabled', 'disabled')
    $('#BtnSubmit').removeAttr('disabled', 'disabled')
    SubmitNewScore.GetAreaFocus()
    SubmitNewScore.CheckPreviousSubmit()
    //SubmitNewScore.GetData()
}


SubmitNewScore.GetAreaFocus = function () {
    Loading.BlockPage()
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    var cbbAreaFocus = $('#cbbAreaFocus')
    cbbAreaFocus.empty();
    cbbAreaFocus.append("<option value=''>All Area Focus</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/GetAreaFocus",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbAreaFocus.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                SubmitNewScore.mDataTable.search('')
                
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

SubmitNewScore.OnChangeAreaFocus = function () {
    var ValAreaFocus = $('#cbbAreaFocus').val();
    SubmitNewScore.mDataTable.search(ValAreaFocus)
    SubmitNewScore.mDataTable.draw()
}

SubmitNewScore.mDataTable = null;

SubmitNewScore.initialTable = function () {
    var options = {
        //scrollX: true,
        "initComplete": function (settings, json) {
            $("#SubmitScoreTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": "Number" },    //0
           { "data": "AreaFocus" }, //1
           { "data": "MainScope" }, //2
           { "data": "SubScope" },  //3
           { "data": null },        //4
           { "data": "Target" },    //5
           { "data": null },        //6
           { "data": null },        //7
           { "data": "Score" },     //8
           { "data": "DetailId" },  //9
           { "data": "MaxScore" },  //10
        ],
        columnDefs: [
        
        {
            targets: 0,
            width: '10px',
        },
        {
            targets: 1,
            width: '100px',
        },
        {
            targets: 2,
            width: '150px',
        },
        {
            targets: 3,
            //width: '50px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var Link = '<a href="#" onclick="SubmitNewScore.GetLast3Score(\'' + full.AreaFocus + '\',\'' + full.MainScope + '\',\'' + full.SubScope + '\')" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">' + full.SubScope + '</a>'
                return Link
            },
        },
        {
            targets: 4,
            width: '140px',
            className: 'dt-left',
            orderable: false,
            render:
            //function (data, type, full, meta) {
            //    var Link = '<div class="form-group">'
            //            Link += '<select class="custom-select form-control form-control-solid" id="cbbAreaFocus" onchange="SubmitNewScore.OnChangeAreaFocus()"></select>'
            //        Link += '</div>'
            //    return Link
            //},
            function (d, t, r) {
                var $select = $("<select id='cbbScore" + r.DetailId + "' style='width:80px' class='custom-select form-control' onchange='SubmitNewScore.OnChangeScore(\""+d.DetailId+"\",\""+d.Target+"\")'></select>", {
                    "id": r[0] + "start",
                    "value": d
                });
                var values = d.MaxScore
                $.each(values.split(','), function (k, v) {
                    var $option = "";
                    if (d.Score == v)
                    {
                        $option = $("<option></option>", {
                            "text": v,
                            "value": v,
                        });
                        $option.attr("selected", "selected")
                    }
                    else
                    {
                        $option = $("<option></option>", {
                            "text": v,
                            "value": v
                        });
                    }
                    
                    $select.append($option);
                });

                return $select.prop("outerHTML")
            }
        },
        {
            targets: 5,
            width: '30px',
        },
        {
            targets: 6,
            width: '250px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var Link = "";
                Link = '<input type="text" class="form-control form-control-solid" id="txtRemark' + data.DetailId + '" onChange="SubmitNewScore.UpdateRemark(' + data.DetailId + ')" value="' + data.Remark + '" />';
                return Link
            },
        },
        {
            targets: 7,
            width: '50px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var Link = "";
                if (data.Score > data.Target || data.Score == 0 )
                {
                    Link = '<button type="button" class="btn btn-primary2" id="btnFinding' + data.DetailId + '" hidden="hidden" onclick="SubmitNewScore.OnClickFinding(' + data.DetailId + ')">Finding</button>'
                }
                else
                {
                    Link = '<button type="button" class="btn btn-primary2" id="btnFinding' + data.DetailId + '"  onclick="SubmitNewScore.OnClickFinding(' + data.DetailId + ')">Finding</button>'
                }
                 
                return Link
            },
        },
        {
            targets: 8,
            visible: false,
            searchable: false
        },
        {
            targets: 9,
            visible: false,
            searchable: false
        },
        {
            targets: 10,
            visible: false,
            searchable: false
        }
        ]
        //dom: 'Bfrtip',
        //buttons: [
        //    'excel'
        //]
    }

    var Table = $('#SubmitScoreTable').DataTable(options);
    SubmitNewScore.mDataTable = Table;
}

SubmitNewScore.CheckPreviousSubmit = function()
{
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/CheckPreviousSubmit",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                if (j.Data[0] != '')
                {
                    swal.fire({
                        title: 'info',
                        html: 'Do you want to continue data from ' + j.Data[0] + '?',
                        icon: 'info',
                        showCloseButton: true,
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: 'Yes, Continue',
                        cancelButtonText: "No, Create New Score!",
                        button: "ok",
                    });
                    $('.swal2-confirm').click(function () {
                        SubmitNewScore.ContinueScore()
                    });

                    $('.swal2-cancel').click(function () {
                        SubmitNewScore.CreateNewScore()
                    });
                }
                else
                {
                    SubmitNewScore.GetData()
                }
                
                Loading.UnblockPage_()

            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
    
}

SubmitNewScore.CreateNewScore = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/CreateNewScore",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                SubmitNewScore.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    SubmitNewScore.mDataTable.row.add(st);
                })
                SubmitNewScore.mDataTable.draw();
                Loading.UnblockPage_()
                SubmitNewScore.GetAreaFocus()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



SubmitNewScore.ContinueScore = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/ContinueScore",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                SubmitNewScore.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    SubmitNewScore.mDataTable.row.add(st);
                })
                SubmitNewScore.mDataTable.draw();
                Loading.UnblockPage_()
                SubmitNewScore.GetAreaFocus()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitNewScore.GetData = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/GetDataSubmitNewScore",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                SubmitNewScore.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    SubmitNewScore.mDataTable.row.add(st);
                })
                SubmitNewScore.mDataTable.draw();
                Loading.UnblockPage_()
                SubmitNewScore.GetAreaFocus()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitNewScore.GetData= function()
{
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/GetDataSubmitNewScore",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                SubmitNewScore.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    SubmitNewScore.mDataTable.row.add(st);
                })
                SubmitNewScore.mDataTable.draw();
                Loading.UnblockPage_()
                SubmitNewScore.GetAreaFocus()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitNewScore.OnChangeScore = function (DetailId, TargetScore) {
    var ValScore = $('#cbbScore' + DetailId + '').val();
    if(parseInt(ValScore) > parseInt(TargetScore))
    {
        $("#btnFinding" + DetailId + "").attr("hidden", "hidden");
    }
    else
    {
        $("#btnFinding" + DetailId + "").removeAttr("hidden");
    }
    SubmitNewScore.UpdateScore(DetailId, ValScore)
    console.log(ValScore, TargetScore)
}

SubmitNewScore.UpdateScore = function(DetailId, Score)
{
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/UpdateScore",
        method: "POST",
        dataType: "JSON",
        data: {
            DetailId: DetailId,
            Score: Score,
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Successfully update')
                //SubmitNewScore.GetData()
                Loading.UnblockPage_()
                if (j.Data[0] == true)
                {
                    swal.fire({
                        title: 'Info',
                        html: 'All area is completed, click submit!!',
                        icon: 'info',
                        allowOutsideClick: false,
                        button: "ok",
                    });
                }
                console.log(j.Data[0])
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
SubmitNewScore.UpdateRemark = function(DetailId)
{
    var ValRemark = $('#txtRemark' + DetailId + '').val();
    console.log(ValRemark);
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/UpdateRemark",
        method: "POST",
        dataType: "JSON",
        data: {
            DetailId: DetailId,
            Remark: ValRemark
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Successfully update remark')
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitNewScore.OnClickFinding =  function(DetailId)
{
    console.log(DetailId)
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    $.ajax({
        url: "../SubmitNewScore/SubmitFinding",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment,
            DetailId: DetailId
        },
        success: function (j) {
            Loading.UnblockPage_()
            if (j.Result == true) {
                window.open('../SubmitNewCase/SubmitNewCase?FormName=SubmitNewCase&Plant=' + ValPlant + '&ProcessOwner=' + ValProcessOwner + '&Department=' + ValDepartment + '&DetailId=' + j.Data[0] + '', '_blank')
            }
            else
            {
                Notification.ShowToast('info', 'Not available multiple finding')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitNewScore.Submit = function()
{
     var FormName = GetParam.ParameterFromURL('FormName')
        Loading.BlockPage()
        $.ajax({
            url: "../Home/GetaccessForm",
            method: "POST",
            dataType: "JSON",
            data: {
                FormName: FormName
            },
            success: function (j) {
                if (j.Result == true) {
                    Loading.UnblockPage_()
                    if (j.Data[0] == true) {
                        SubmitNewScore.Exexute()
                    }
                    else {
                        Notification.ShowToast('warning', 'you dont have access, please call IT')
                    }

                }
            },
            error: function (xhr, error, text) {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + error + '')
            }
        });



    
}

SubmitNewScore.Exexute = function()
{
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/Submit",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            Loading.UnblockPage_()
            if (j.Result == true) {
                Notification.ShowPopUp('success', 'Submit Success', j.Data[0], '../SubmitNewScore/SubmitNewScore?FormName=SubmitNewScore')
            }
            else {
                swal.fire({
                    title: 'Please complete all area',
                    html: j.Data[0],
                    icon: 'info',
                    allowOutsideClick: false,
                    button: "ok",
                });
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitNewScore.Cancal =  function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Score?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        SubmitNewScore.DeleteTmpScore()
    });
}

SubmitNewScore.DeleteTmpScore= function()
{
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    if (ValPlant != '' && ValProcessOwner != '' && ValDepartment != '')
    {
        Loading.BlockPage()
        $.ajax({
            url: "../SubmitNewScore/DeleteTmpScore",
            method: "POST",
            dataType: "JSON",
            data: {
                Plant: ValPlant,
                ProcessOwner: ValProcessOwner,
                Department: ValDepartment
            },
            success: function (j) {
                Loading.UnblockPage_()
                if (j.Result == true) {
                    Notification.ShowPopUp('success', 'Delete Success', j.Data[0], '../SubmitNewScore/SubmitNewScore?FormName=SubmitNewScore')
                }

            },
            error: function (xhr, error, text) {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + error + '')
            }
        });
    }
    else
    {
        Notification.ShowToast('error', 'Please choose all selection')
    }
    
}



function DetailScore() { }


DetailScore.mDataTable = null;

DetailScore.initialTable = function () {
    var options = {
        //responsive: true,
        bSortCellsTop: true,
        ordering: true,
        fixedHeader: true,
        lengthChange: false,
        searching: false,
        order: [[2, "asc"]],
        columns: [
           { "data": "Plant" },
           { "data": "ProcessOwner" },
           { "data": "Dept" },
           { "data": "AreaFocus" },
           { "data": "MainScope" },
           { "data": "SubScope" },
           { "data": "Target" },
           { "data": "Data1" },
           { "data": "Data2" },
           { "data": "Data3" }
        ],
    }
    var Table = $('#LastScoreTable').DataTable(options);
    DetailScore.mDataTable = Table;

}



SubmitNewScore.GetLast3Score =  function(AreaFocus,MainScope, SubScope)
{
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    console.log(AreaFocus + '--' + MainScope + '--' + SubScope)
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/CheckDetailLast3Score",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment,
            AreaFocus: AreaFocus,
            MainScope: MainScope,
            SubScope: SubScope
        },
        success: function (j) {
            Loading.UnblockPage_()
            if (j.Result == true) {
                DetailScore.GetData(AreaFocus, MainScope, SubScope)
            }
            else
            {
                Notification.ShowToast('warning', 'No record')
            }

        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

}



DetailScore.GetData = function (AreaFocus, MainScope, SubScope) {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValDepartment = $('#cbbDepartment').val();
    console.log(AreaFocus + '--' + MainScope + '--' + SubScope)
    
    $('#modalLast3Score').modal('show')
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/GetDetailLast3Score",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment,
            AreaFocus: AreaFocus,
            MainScope: MainScope,
            SubScope: SubScope
        },
        success: function (j) {
            if (j.Result == true) {
                DetailScore.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    DetailScore.mDataTable.row.add(st);
                })
                DetailScore.mDataTable.draw();
                Loading.UnblockPage_()
            }

        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

}
