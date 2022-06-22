
function MasterDataLayout() { }


MasterDataLayout.ShowLayout = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnLayout').removeClass('btn btn-outLayout-primary2 btn-lg btn-block').addClass('btn btn-outLayout-primary2 btn-lg btn-block active')
    $('.Layout').show()
    MasterDataLayout.GetPlant()
}



MasterDataLayout.mDataTable = null;

MasterDataLayout.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#LayoutTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "ProcessOwner" },
           { "data": "LayoutName" },
           { "data": "View" },
           { "data": "Mandatory" },
        ],
       
        columnDefs: [
        {
            targets: 4,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                checkbox = '<span class="switch switch-outline switch-icon switch-Primary">'
                checkbox += '<label>'
                if (full.View == 'True')
                {
                    checkbox += '<input type="checkbox" checked="checked" id="chkLayoutViews' + full.Number + '"  onclick="MasterDataLayout.EventCheck(\'' + full.Number + '\',\'' + full.Plant + '\',\'' + full.ProcessOwner + '\',\'' + full.LayoutName + '\')" />'
                }
                else
                {
                    checkbox += '<input type="checkbox"  id="chkLayoutViews' + full.Number + '"  onclick="MasterDataLayout.EventCheck(\'' + full.Number + '\',\'' + full.Plant + '\',\'' + full.ProcessOwner + '\',\'' + full.LayoutName + '\')" />'
                }
                checkbox += '<span></span>'
                checkbox += '</label>'
                checkbox += '</span>'
                return checkbox
            },
        }, {
            targets: 5,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                checkbox = '<span class="switch switch-outline switch-icon switch-Primary">'
                checkbox += '<label>'
                if (full.Mandatory == 'True') {
                    checkbox += '<input type="checkbox" checked="checked" id="chkLayoutMandatory' + full.Number + '"  onclick="MasterDataLayout.EventCheck(\'' + full.Number + '\',\'' + full.Plant + '\',\'' + full.ProcessOwner + '\',\'' + full.LayoutName + '\')" />'
                }
                else {
                    checkbox += '<input type="checkbox"  id="chkLayoutMandatory' + full.Number + '"  onclick="MasterDataLayout.EventCheck(\'' + full.Number + '\',\'' + full.Plant + '\',\'' + full.ProcessOwner + '\',\'' + full.LayoutName + '\')" />'
                }
                checkbox += '<span></span>'
                checkbox += '</label>'
                checkbox += '</span>'
                return checkbox
            },
        }],
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }
    var Table = $('#LayoutTable').DataTable(options);
    MasterDataLayout.mDataTable = Table;

}


MasterDataLayout.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserLayout").value
    var cbbPlant = $('#cbbPlantLayout');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantLayout",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantLayout option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataLayout.GetProcessOwner()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLayout.OnChangePlant = function () {
    MasterDataLayout.GetProcessOwner()
}


MasterDataLayout.GetProcessOwner = function () {
    var ValPlant = $('#cbbPlantLayout').val();
    var cbbProcessOwnerLayout = $('#cbbProcessOwnerLayout')
    cbbProcessOwnerLayout.empty();
    cbbProcessOwnerLayout.append("<option value=''>All Audit Type</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProcessOwnerLayout",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProcessOwnerLayout.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                MasterDataLayout.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataLayout.OnChangeProcessOwner = function () {
    MasterDataLayout.GetData()
}

MasterDataLayout.GetData = function () {
    var ValPlant = $('#cbbPlantLayout').val();
    var ValDept = $('#cbbProcessOwnerLayout').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetLayoutData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValDept,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataLayout.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataLayout.mDataTable.row.add(st);
                })
                MasterDataLayout.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLayout.EventCheck =  function(Number,Plant, ProcessOwner, FormName)
{

    var ckboxViews = $('#chkLayoutViews' + Number + '');
    var CheckedViews = 0;
    if (ckboxViews.is(':checked')) {
        CheckedViews = 1
    }
    else {
        CheckedViews = 0
    }

    var ckboxMnadatory = $('#chkLayoutMandatory' + Number + '');
    var CheckedMandatory = 0;
    if (ckboxMnadatory.is(':checked')) {
        CheckedMandatory = 1
    }
    else {
        CheckedMandatory = 0
    }

    var datas = Plant
    datas += '~' + ProcessOwner
    datas += '~' + FormName
    datas += '~' + CheckedViews
    datas += '~' + CheckedMandatory
    console.log(datas)

   
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/Updatelayout",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'succesfully update')
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
    
    
}

