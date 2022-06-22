$(document).ready(function () {
    Loading.UnblockPage_()
    $('#MasterReport').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-submenu menu-item-open menu-item-here')
    $('#SubMasterAllCase').removeClass('menu-item').addClass('menu-item menu-item-active')
    ReportAllCase.setDefaultDate()
    ReportAllCase.initialTable()


    $('.notPrint').show()
    $('.print').hide()

    ReportAllCase.GetPlant()
});

Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

function ReportAllCase(){}

ReportAllCase.HideDiv = function()
{
    $('#difFilter').toggle()
}

ReportAllCase.setDefaultDate = function () {
    var now = new Date();
    var mon = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    $('#StartDate').val(mon[now.getMonth()] + '/01/' + now.getFullYear());
    $('#EndDate').val(mon[now.getMonth()] + '/' + now.getDate() + '/' + now.getFullYear())
}

ReportAllCase.mDataTable = null;

ReportAllCase.initialTable = function () {
    var options = {
         //scrollX: true,
        "initComplete": function (settings, json) {
            $("#ReportAllCaseTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "AuditNumber" },
           { "data": "Plant" },
           { "data": "Location" },
           { "data": "Vendor" },
           { "data": "VendorProcess" },
           { "data": "Status" },
           { "data": "ProcessOwner" },
           { "data": "IssueTittle" },
           { "data": "Criteria" },
           { "data": "DeptVendor" },
           { "data": "Product" },
           { "data": "Model" },
           { "data": "Line" },
           { "data": "AuditorBy" },
           { "data": "Auditee" },
           { "data": "SubmitDate" },
           { "data": "ActionDate" },
           { "data": "ResolutionDate" },
           { "data": "CompleteDate" }
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
                checkbox += '<input type="checkbox" id=\'chkAllCase' + data.Number + '\' value="" class="checkable" onclick="ReportAllCase.CheckboxClick(\'' + data.Number + '\',\'' + data.AuditNumber + '\')"/>'
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

    var Table = $('#ReportAllCaseTable').DataTable(options);
    ReportAllCase.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                //$(this).prop('checked', true);
                //$(this).closest('tr').addClass('active');
                $('#ReportAllCaseTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                //$(this).prop('checked', false);
                //$(this).closest('tr').removeClass('active');
                $('#ReportAllCaseTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}

ReportAllCase.OnChangeDate = function () {
    ReportAllCase.Getdata()
}


ReportAllCase.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUser").value
    var cbbPlant = $('#cbbPlant');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");

    $.ajax({
        url: "../Report/GetPlant",
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
                ReportAllCase.GetProcessOWner()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportAllCase.OnChangePlant = function()
{
    ReportAllCase.GetProcessOWner()
}


ReportAllCase.GetProcessOWner = function () {
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
                ReportAllCase.GetStatus()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
ReportAllCase.OnChangeProcessOwner = function () {
    ReportAllCase.GetStatus()
    //ReportAllCase.GetProcessOWner()
}


ReportAllCase.GetStatus = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var cbbStatus = $('#cbbStatus');
    cbbStatus.empty();
    cbbStatus.append("<option value=''>All Status</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetStatus",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbStatus.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportAllCase.GetIssueFocus()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
ReportAllCase.OnChangeStatus = function () {
    ReportAllCase.GetIssueFocus()
}




ReportAllCase.GetIssueFocus = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStatus = $('#cbbStatus').val();
    var cbbIssueFocus = $('#cbbIssueFocus');
    cbbIssueFocus.empty();
    cbbIssueFocus.append("<option value=''>All Issue Focus</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetIssueFocus",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Status: ValStatus
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbIssueFocus.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportAllCase.GetDepartment()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportAllCase.OnChangeIssueFocus = function () {
    ReportAllCase.GetDepartment()
}

ReportAllCase.GetDepartment = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStatus = $('#cbbStatus').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();

    var cbbDepartment = $('#cbbDepartment');
    cbbDepartment.empty();
    cbbDepartment.append("<option value=''>All Department</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetDepartment",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Status: ValStatus,
            IssueFocus: ValIssueFocus
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbDepartment.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportAllCase.GetProduct()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportAllCase.OnChangeDepartment = function () {
    ReportAllCase.GetProduct()
}

ReportAllCase.GetProduct = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStatus = $('#cbbStatus').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValDepartment = $('#cbbDepartment').val();

    var cbbProduct = $('#cbbProduct');
    cbbProduct.empty();
    cbbProduct.append("<option value=''>All Product</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Status: ValStatus,
            IssueFocus: ValIssueFocus,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProduct.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportAllCase.GetArea()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportAllCase.OnChangeProduct= function () {
    ReportAllCase.GetArea()
}



ReportAllCase.GetArea = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStatus = $('#cbbStatus').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValDepartment = $('#cbbDepartment').val();
    var ValProduct = $('#cbbProduct').val();

    var cbbArea = $('#cbbArea');
    cbbArea.empty();
    cbbArea.append("<option value=''>All Area</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetArea",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Status: ValStatus,
            IssueFocus: ValIssueFocus,
            Department: ValDepartment,
            Product: ValProduct
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbArea.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportAllCase.GetModel()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportAllCase.OnChangeArea = function () {
    ReportAllCase.GetModel()
}


ReportAllCase.GetModel = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStatus = $('#cbbStatus').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValDepartment = $('#cbbDepartment').val();
    var ValProduct = $('#cbbProduct').val();
    var ValArea = $('#cbbArea').val();

    var cbbModel = $('#cbbModel');
    cbbModel.empty();
    cbbModel.append("<option value=''>All Model</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetModel",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Status: ValStatus,
            IssueFocus: ValIssueFocus,
            Department: ValDepartment,
            Product: ValProduct,
            Area: ValArea
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbModel.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportAllCase.GetVendor()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportAllCase.OnChangeModel = function () {
    ReportAllCase.GetVendor()
}




ReportAllCase.GetVendor = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStatus = $('#cbbStatus').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValDepartment = $('#cbbDepartment').val();
    var ValProduct = $('#cbbProduct').val();
    var ValArea = $('#cbbArea').val();
    var ValModel = $('#cbbModel').val();

    var cbbVendor = $('#cbbVendor');
    cbbVendor.empty();
    cbbVendor.append("<option value=''>All Vendor</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetVendor",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Status: ValStatus,
            IssueFocus: ValIssueFocus,
            Department: ValDepartment,
            Product: ValProduct,
            Area: ValArea,
            Model: ValModel
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbVendor.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportAllCase.GetVendorProcess()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportAllCase.OnChangeVendor = function () {
    ReportAllCase.GetVendorProcess()
}



ReportAllCase.GetVendorProcess = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStatus = $('#cbbStatus').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValDepartment = $('#cbbDepartment').val();
    var ValProduct = $('#cbbProduct').val();
    var ValArea = $('#cbbArea').val();
    var ValModel = $('#cbbModel').val();
    var ValVendor = $('#cbbVendor').val();

    var cbbVendorProcess = $('#cbbVendorProcess');
    cbbVendorProcess.empty();
    cbbVendorProcess.append("<option value=''>All Vendor Process</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetVendorProcess",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Status: ValStatus,
            IssueFocus: ValIssueFocus,
            Department: ValDepartment,
            Product: ValProduct,
            Area: ValArea,
            Model: ValModel,
            Vendor: ValVendor
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbVendorProcess.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportAllCase.GetLocation()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportAllCase.OnChangeVendorProcess = function () {
    ReportAllCase.GetLocation()
}



ReportAllCase.GetLocation = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStatus = $('#cbbStatus').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValDepartment = $('#cbbDepartment').val();
    var ValProduct = $('#cbbProduct').val();
    var ValArea = $('#cbbArea').val();
    var ValModel = $('#cbbModel').val();
    var ValVendor = $('#cbbVendor').val();
    var ValVendorProcess = $('#cbbVendorProcess').val();

    var cbbLocation = $('#cbbLocation');
    cbbLocation.empty();
    cbbLocation.append("<option value=''>All Location</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetLocation",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Status: ValStatus,
            IssueFocus: ValIssueFocus,
            Department: ValDepartment,
            Product: ValProduct,
            Area: ValArea,
            Model: ValModel,
            Vendor: ValVendor,
            VendorProcess: ValVendorProcess
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbLocation.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                ReportAllCase.Getdata()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ReportAllCase.OnChangeLocation = function () {
    ReportAllCase.Getdata()
}



ReportAllCase.Getdata = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValStatus = $('#cbbStatus').val();
    var ValIssueFocus = $('#cbbIssueFocus').val();
    var ValDepartment = $('#cbbDepartment').val();
    var ValProduct = $('#cbbProduct').val();
    var ValArea = $('#cbbArea').val();
    var ValModel = $('#cbbModel').val();
    var ValVendor = $('#cbbVendor').val();
    var ValVendorProcess = $('#cbbVendorProcess').val();
    var ValLocation = $('#cbbLocation').val();
    var ValStartDate = $('#StartDate').val();
    var ValEnDate = $('#EndDate').val();

    Loading.BlockPage()
    $.ajax({
        url: "../Report/GetData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Status: ValStatus,
            IssueFocus: ValIssueFocus,
            Department: ValDepartment,
            Product: ValProduct,
            Area: ValArea,
            Model: ValModel,
            Vendor: ValVendor,
            VendorProcess: ValVendorProcess,
            Location: ValLocation,
            StartDate: ValStartDate,
            EndDate: ValEnDate
        },
        success: function (j) {
            if (j.Result == true) {
                ReportAllCase.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ReportAllCase.mDataTable.row.add(st);
                })
                ReportAllCase.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


ReportAllCase.CheckboxClick = function (Number,AuditNumber) {
    var ckbox = $('#chkAllCase' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }

    ReportAllCase.CollectData(Number, AuditNumber, Checked)
}

ReportAllCase.AuditNumber = []
ReportAllCase.Arr = ""

ReportAllCase.CollectData = function (Number, AuditNumber, Checked) {
    ReportAllCase.Arr = ""
    // replace data with same ID
    for (var i = 0; i < ReportAllCase.AuditNumber.length; i++) {
        if (parseInt(ReportAllCase.AuditNumber[i].Number) == parseInt(Number)) {
            ReportAllCase.AuditNumber.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"AuditNumber\":\"' + AuditNumber + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    ReportAllCase.AuditNumber.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < ReportAllCase.AuditNumber.length; i++) {
        if (parseInt(ReportAllCase.AuditNumber[i].Checked) == parseInt(0)) {
            ReportAllCase.AuditNumber.splice(i, 1);
            break;
        }
    }
    var _ArrayAuditNumber = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(ReportAllCase.AuditNumber, function (i, st) {
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
    ReportAllCase.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

ReportAllCase.View = function()
{
    window.open('../CaseCompleted/PrintPDF2?Mode=manual&AuditNumber=' + ReportAllCase.Arr + '', '_blank', "")
    console.log(ReportAllCase.Arr)
}