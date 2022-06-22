$(document).ready(function () {
    $('#MasterSubmitNewCase').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')
    SubmitNewCase.GetPlant()
    $('.isVendor').hide();
    
});



function SubmitNewCase() { }

SubmitNewCase.ReadPicture = function(input)
{
    var Photos = $('#photos')
    Photos.empty()
    var HTML = "";
    var counter = 5;
    var count = 0 
    if (input.files.length > counter)
    {
        Notification.ShowToast('error', 'cant upload image more than 5')
        var $el = $('#UploadImage');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
    }
    else
    {
        for (var x = 0; x < input.files.length; x++) {
            count = count + 1;
            if (input.files && input.files[x]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    HTML = "";
                    HTML += '<div id="divPhotos' + count + '" class="col-lg-3 img">'
                    HTML += '<div class="image-input image-input-outline">'
                    HTML += '<img src="' + e.target.result + '" class="image-input-wrapper" />'
                    HTML += '<button onclick="SubmitNewCase.RemovePhotos(\'' + count + '\')" class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Delete">'
                    HTML += '<i class="ki ki-bold-close icon-sm text-muted"></i>'
                    HTML += '</button>'
                    HTML += '</div>'
                    HTML += '<span class="form-text text-muted"></span>'
                    HTML += '</div>'
                    Photos.append(HTML)
                }
                reader.readAsDataURL(input.files[x]);
            }
            

        }
    }
}

SubmitNewCase.RemovePhotos = function(Id)
{
    $('#divPhotos' + Id + '').remove();
}

SubmitNewCase.GetPlant = function () {
    var cbbPlant = $('#cbbPlant');
    var _Plant = GetParam.ParameterFromURL('Plant')
    cbbPlant.empty();
    cbbPlant.append("<option value=''>Choose Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetPlant",
        method: "POST",
        dataType: "JSON",
        //data: {
        //    MainSection: MainSection
        //},
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st.Plant + "\">" + st.PlantDesc + "</option>")
                });
                if (_Plant != null)
                {
                    $('#cbbPlant option[value="' + _Plant + '"]').attr('selected', 'selected');
                    $('#cbbPlant').attr('disabled', 'disabled');
                    SubmitNewCase.OnChangePlant()
                }
                else
                {
                    SubmitNewCase.GetIssueFocus()
                    SubmitNewCase.GetCriteria()
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


SubmitNewCase.Check_IsVendor = function () {
    var ValPlant = $('#cbbPlant').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/Check_IsVendor",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                if (j.Data[0] == true)
                {
                    $('.isVendor').show();
                    document.getElementById("ValIsVendor").value = 1
                    $('#cbbVendorCode option:selected').removeAttr('selected');
                    $('#cbbVendorProcess option:selected').removeAttr('selected');
                }
                else
                {
                    document.getElementById("ValIsVendor").value = 0
                    $('.isVendor').hide();
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


SubmitNewCase.OnChangePlant =  function()
{
    SubmitNewCase.Check_IsVendor()
    SubmitNewCase.GetVendor()
    SubmitNewCase.GetVendorProcess()
    SubmitNewCase.GetProcessOwner()
    SubmitNewCase.GetIssueFocus()
    SubmitNewCase.GetCriteria()
    SubmitNewCase.GetDepartment()
    SubmitNewCase.GetProduct()
    //SubmitNewCase.GetArea()
    //SubmitNewCase.GetLine()
    SubmitNewCase.GetModel()
}


SubmitNewCase.GetVendor = function () {
    var ValPlant = $('#cbbPlant').val();
    var cbbVendorCode = $('#cbbVendorCode');
    cbbVendorCode.empty();
    cbbVendorCode.append("<option value=''>Choose Vendor</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetVendor",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbVendorCode.append("<option value=\"" + st + "\">" + st + "</option>")
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

SubmitNewCase.OnChangeVendorCode =  function()
{
    SubmitNewCase.GetVendorProcess()
}


SubmitNewCase.GetVendorProcess = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValVendorCode = $('#cbbVendorCode').val();
    var cbbVendorProcess = $('#cbbVendorProcess');
    cbbVendorProcess.empty();
    cbbVendorProcess.append("<option value=''>Choose Vendor Process</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetVendorProcess",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            VendorCode: ValVendorCode
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbVendorProcess.append("<option value=\"" + st + "\">" + st + "</option>")
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


SubmitNewCase.GetProcessOwner = function () {
    var ValPlant = $('#cbbPlant').val();
    var _ProcessOwner = GetParam.ParameterFromURL('ProcessOwner')
    var cbbProcessOwner = $('#cbbProcessOwner');
    cbbProcessOwner.empty();
    cbbProcessOwner.append("<option value=''>Choose Audit Type</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetProcessOwner",
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
                if (_ProcessOwner != null) {
                    $('#cbbProcessOwner option[value="' + _ProcessOwner + '"]').attr('selected', 'selected');
                    $('#cbbProcessOwner').attr('disabled', 'disabled');
                    SubmitNewCase.OnChangeProcessOwner()
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

SubmitNewCase.OnChangeProcessOwner =  function()
{
    var ValPlant = $('#cbbProcessOwner').val();
    if (ValPlant == '')
    {
        $("#errcbbProcessOwner").removeAttr("hidden");
    }
    else
    {
        $("#errcbbProcessOwner").attr("hidden", "hidden");
        SubmitNewCase.ShowIcon()
        SubmitNewCase.ShowMandatoryIcon()
    }

    
}


SubmitNewCase.GetIssueFocus = function () {
    var ValPlant = $('#cbbPlant').val();
    var RadIssueFocus = $('#RadIssueFocus');
    var HTML = "";
    RadIssueFocus.empty();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetIssueFocus",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    HTML = '<div class="col-md-6">'
                        HTML += '<div class="funkyradio">'
                            HTML += '<div class="funkyradio-info">'
                                HTML += '<input type="radio" name="IssueFocus" id="Radio'+st+'"  value="'+st+'">'
                                HTML += '<label for="Radio' + st + '" class="color">'+st+'</label>'
                            HTML += '</div>'
                        HTML += '</div>'
                    HTML += '</div>'
                    RadIssueFocus.append(HTML)
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


SubmitNewCase.GetCriteria = function () {
    var ValPlant = $('#cbbPlant').val();
    var RadCriteria = $('#RadCriteria');
    var HTML = "";
    RadCriteria.empty();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetCriteria",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    HTML = '<div class="col-md-6">'
                    HTML += '<div class="funkyradio">'
                    HTML += '<div class="funkyradio-info">'
                    HTML += '<input type="radio" name="Criteria" id="RadioCriteria' + st + '"  value="' + st + '">'
                    HTML += '<label for="RadioCriteria' + st + '" class="color">' + st + '</label>'
                    HTML += '</div>'
                    HTML += '</div>'
                    HTML += '</div>'
                    RadCriteria.append(HTML)
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


SubmitNewCase.GetDepartment = function () {
    var ValPlant = $('#cbbPlant').val();
    var _Department = GetParam.ParameterFromURL('Department')
    var cbbDepartment = $('#cbbDepartment');
    cbbDepartment.empty();
    cbbDepartment.append("<option value=''>Choose Department</option>");
    Loading.BlockPage()
    if (_Department != null) {
        cbbDepartment.append("<option value=\"" + _Department + "\">" + _Department + "</option>")
        $('#cbbDepartment option[value="' + _Department + '"]').attr('selected', 'selected');
        $('#cbbDepartment').attr('disabled', 'disabled');
        SubmitNewCase.OnChangeDepartment()
    }
    else
    {
        $.ajax({
            url: "../SubmitNewCase/GetDepartment",
            method: "POST",
            dataType: "JSON",
            data: {
                Plant: ValPlant
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
    
}

SubmitNewCase.OnChangeDepartment = function()
{
    SubmitNewCase.GetArea()
    SubmitNewCase.GetLine()
}


SubmitNewCase.GetProduct = function () {
    var ValPlant = $('#cbbPlant').val();
    var cbbProduct = $('#cbbProduct');
    cbbProduct.empty();
    cbbProduct.append("<option value=''>Choose Product</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProduct.append("<option value=\"" + st + "\">" + st + "</option>")
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

SubmitNewCase.OnChangeProduct = function()
{
    SubmitNewCase.GetModel()
}


SubmitNewCase.GetArea = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValDepartment = $('#cbbDepartment').val();
    var _DetailId = GetParam.ParameterFromURL('DetailId')
    var cbbArea = $('#cbbArea');
    cbbArea.empty();
    cbbArea.append("<option value=''>Choose Area</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetArea",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Department: ValDepartment,
            DetailId:_DetailId
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbArea.append("<option value=\"" + st + "\">" + st + "</option>")
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

// line dan area sama (masih bingung kenapa dipisah)
SubmitNewCase.GetLine = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValDepartment = $('#cbbDepartment').val();
    var cbbLine = $('#cbbLine');
    cbbLine.empty();
    cbbLine.append("<option value=''>Choose Line</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetArea",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbLine.append("<option value=\"" + st + "\">" + st + "</option>")
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

SubmitNewCase.OnChangeLine =  function()
{
    SubmitNewCase.GetSessionID()
}


SubmitNewCase.GetModel = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProduct = $('#cbbProduct').val();
    var cbbModel = $('#cbbModel');
    cbbModel.empty();
    cbbModel.append("<option value=''>Choose Model</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetModel",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Product: ValProduct
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbModel.append("<option value=\"" + st + "\">" + st + "</option>")
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

SubmitNewCase.GetSessionID = function () {
    var ValLine = $('#cbbLine').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetSessionID",
        method: "POST",
        dataType: "JSON",
        data: {
            Line: ValLine
        },
        success: function (j) {
            if (j.Result == true) {
                //console.log(j.Data[0].length)
                if (j.Data[0].length != 0)
                {
                    document.getElementById("txtSessionID").value = j.Data[0][0]
                    SubmitNewCase.GetFGCode_LotNumber(j.Data[0][0])
                }
                else {
                    document.getElementById("txtSessionID").value = ''
                    SubmitNewCase.GetFGCode_LotNumber('')
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

SubmitNewCase.GetFGCode_LotNumber = function (SessionID) {
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/GetFGCode_LotNumber",
        method: "POST",
        dataType: "JSON",
        data: {
            SessionID: SessionID
        },
        success: function (j) {
            if (j.Result == true) {
                if (SessionID != "") {
                    document.getElementById("txtFGCode").value = j.Data[0][0].FGCode
                    document.getElementById("txtLotNumber").value = j.Data[0][0].LotNumber
                }
                else {
                    document.getElementById("txtFGCode").value = ''
                    document.getElementById("txtLotNumber").value = ''
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


SubmitNewCase.ShowIcon = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/ShowIcon",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner
        },
        success: function (j) {
            if (j.Result == true) {
                if (j.Data[0][0].Department == true)
                {
                    $('#divDepartment').show();
                }
                else
                {
                    $('#divDepartment').hide();
                }

                if (j.Data[0][0].Product == true) {
                    $('#divProduct').show();
                }
                else {
                    $('#divProduct').hide();
                }

                if (j.Data[0][0].Area == true) {
                    $('#divArea').show();
                }
                else {
                    $('#divArea').hide();
                }

                if (j.Data[0][0].Line == true) {
                    $('#divLine').show();
                }
                else {
                    $('#divLine').hide();
                }

                if (j.Data[0][0].Model == true) {
                    $('#divModel').show();
                }
                else {
                    $('#divModel').hide();
                }

                if (j.Data[0][0].MachineNumber == true) {
                    $('#divMachineNumber').show();
                }
                else {
                    $('#divMachineNumber').hide();
                }

                if (j.Data[0][0].MaterialDescription == true) {
                    $('#divMaterialDescription').show();
                }
                else {
                    $('#divMaterialDescription').hide();
                }

                if (j.Data[0][0].SessionID == true) {
                    $('#divSessionID').show();
                }
                else {
                    $('#divSessionID').hide();
                }

                if (j.Data[0][0].FGCode == true) {
                    $('#divFGCode').show();
                }
                else {
                    $('#divFGCode').hide();
                }

                if (j.Data[0][0].LotNumber == true) {
                    $('#divLotNumber').show();
                }
                else {
                    $('#divLotNumber').hide();
                }

                if (j.Data[0][0].Process == true) {
                    $('#divProcess').show();
                }
                else {
                    $('#divProcess').hide();
                }
                //if (SessionID != "") {
                //    document.getElementById("txtFGCode").value = j.Data[0][0].FGCode
                //    document.getElementById("txtLotNumber").value = j.Data[0][0].LotNumber
                //}
                //else {
                //    document.getElementById("txtFGCode").value = ''
                //    document.getElementById("txtLotNumber").value = ''
                //}
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


SubmitNewCase.ShowMandatoryIcon = function () {
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewCase/ShowMandatoryIcon",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner
        },
        success: function (j) {
            if (j.Result == true) {
                if (j.Data[0][0].Department == true) {
                    $('.mandatoryDept').show();
                    document.getElementById("ValDepartment").value = 1
                }
                else {
                    $('.mandatoryDept').hide();
                    document.getElementById("ValDepartment").value = 0
                }

                if (j.Data[0][0].Product == true) {
                    $('.mandatoryProduct').show();
                    document.getElementById("ValProduct").value = 1
                }
                else {
                    $('.mandatoryProduct').hide();
                    document.getElementById("ValProduct").value = 0
                }
                if (j.Data[0][0].Area == true) {
                    $('.mandatoryArea').show();
                    document.getElementById("ValArea").value = 1
                }
                else {
                    $('.mandatoryArea').hide();
                    document.getElementById("ValArea").value = 0
                }

                if (j.Data[0][0].Line == true) {
                    $('.mandatoryLine').show();
                    document.getElementById("ValLine").value = 1
                }
                else {
                    $('.mandatoryLine').hide();
                    document.getElementById("ValLine").value = 0
                }

                if (j.Data[0][0].Model == true) {
                    $('.mandatoryModel').show();
                    document.getElementById("ValModel").value = 1
                }
                else {
                    $('.mandatoryModel').hide();
                    document.getElementById("ValModel").value = 0
                }

                if (j.Data[0][0].MachineNumber == true) {
                    $('.mandatoryMachine').show();
                    document.getElementById("ValMachineNo").value = 1
                }
                else {
                    $('.mandatoryMachine').hide();
                    document.getElementById("ValMachineNo").value = 0
                }

                if (j.Data[0][0].MaterialDescription == true) {
                    $('.mandatoryMaterial').show();
                    document.getElementById("ValMaterialDescription").value = 1
                }
                else {
                    $('.mandatoryMaterial').hide();
                    document.getElementById("ValMaterialDescription").value = 0
                }

                if (j.Data[0][0].SessionID == true) {
                    $('.mandatorySession').show();
                    document.getElementById("ValSessionID").value = 1
                }
                else {
                    $('.mandatorySession').hide();
                    document.getElementById("ValSessionID").value = 0
                }
                if (j.Data[0][0].FGCode == true) {
                    $('.mandatoryFGCode').show();
                    document.getElementById("ValFGCode").value = 1
                }
                else {
                    $('.mandatoryFGCode').hide();
                    document.getElementById("ValFGCode").value = 0
                }
                if (j.Data[0][0].LotNumber == true) {
                    $('.mandatoryLotNumber').show();
                    document.getElementById("VaLotNumber").value = 1
                }
                else {
                    $('.mandatoryLotNumber').hide();
                    document.getElementById("VaLotNumber").value = 0
                }

                if (j.Data[0][0].Process == true) {
                    $('.mandatoryProcess').show();
                    document.getElementById("ValProcess").value = 1
                }
                else {
                    $('.mandatoryProcess').hide();
                    document.getElementById("ValProcess").value = 0
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


SubmitNewCase.OnClickSubmit =  function()
{
    var ValIssueTittle = document.getElementById("txtIssueTittle").value
    var ValImageUpload = $("#UploadImage").val()
    var ValIssueDescription = document.getElementById("txtIssueDescription").value
    var ValPlant = $('#cbbPlant').val();
    var ValProcessOwner = $('#cbbProcessOwner').val();
    var ValVendorCode = $('#cbbVendorCode').val();
    var ValVendorProcess = $('#cbbVendorProcess').val();
    var ValIssueFocus = $("input[name=IssueFocus]:checked").val()
    var ValCriteria = $("input[name=Criteria]:checked").val()
    var ValDepartment = $('#cbbDepartment').val();
    var ValProduct = $('#cbbProduct').val();
    var ValArea = $('#cbbArea').val();
    var ValLine = $('#cbbLine').val();
    var ValModel = $('#cbbModel').val();
    var ValMachineNumber = document.getElementById("txtMachineNumber").value
    var ValMaterial = document.getElementById("txtMaterialDescription").value
    var ValSession = document.getElementById("txtSessionID").value
    var ValFGCode = document.getElementById("txtFGCode").value
    var ValLotNumber = document.getElementById("txtLotNumber").value
    var ValProcess = document.getElementById("txtProcess").value
    var ValDetailId = GetParam.ParameterFromURL('DetailId')

    var IsVendor = document.getElementById("ValIsVendor").value
    var IsDepartment = document.getElementById("ValDepartment").value
    var IsProduct = document.getElementById("ValProduct").value
    var IsArea = document.getElementById("ValArea").value
    var IsLine = document.getElementById("ValLine").value
    var IsModel = document.getElementById("ValModel").value
    var IsMachine = document.getElementById("ValMachineNo").value
    var IsMaterial = document.getElementById("ValMaterialDescription").value
    var IsSession = document.getElementById("ValSessionID").value
    var IsFGCode = document.getElementById("ValFGCode").value
    var IsLotNumber = document.getElementById("VaLotNumber").value
    var IsProcess = document.getElementById("ValProcess").value

    if (ValIssueTittle == '') {
        $("#errIssueTittle").removeAttr("hidden");
    }
    else {
        $("#errIssueTittle").attr("hidden", "hidden");
    }

    if (ValImageUpload == '') {
        $("#errUploadPhoto").removeAttr("hidden");
    }
    else {
        $("#errUploadPhoto").attr("hidden", "hidden");
    }

    if (ValPlant == '') {
        $("#errcbbPlant").removeAttr("hidden");
    }
    else {
        $("#errcbbPlant").attr("hidden", "hidden");
    }

    if (ValProcessOwner == '') {
        $("#errcbbProcessOwner").removeAttr("hidden");
    }
    else {
        $("#errcbbProcessOwner").attr("hidden", "hidden");
    }

    if (ValVendorCode == '' && IsVendor == 1) {
        $("#errcbbVendorCode").removeAttr("hidden");
    }
    else {
        $("#errcbbVendorCode").attr("hidden", "hidden");
    }

    if (ValVendorProcess == '' && IsVendor == 1) {
        $("#errcbbVendorProcess").removeAttr("hidden");
    }
    else {
        $("#errcbbVendorProcess").attr("hidden", "hidden");
    }

    if (ValIssueFocus == undefined) {
        $("#errIssueFocus").removeAttr("hidden");
    }
    else {
        $("#errIssueFocus").attr("hidden", "hidden");
    }

    if (ValCriteria == undefined) {
        $("#errCriteria").removeAttr("hidden");
    }
    else {
        $("#errCriteria").attr("hidden", "hidden");
    }

    if (ValDepartment == '' && IsDepartment == 1) {
        $("#errcbbDepartment").removeAttr("hidden");
    }
    else {
        $("#errcbbDepartment").attr("hidden", "hidden");
    }

    if (ValProduct == '' && IsProduct == 1) {
        $("#errcbbProduct").removeAttr("hidden");
    }
    else {
        $("#errcbbProduct").attr("hidden", "hidden");
    }

    if ((ValArea == '' || ValArea == null) && IsArea == 1) {
        $("#errcbbArea").removeAttr("hidden");
    }
    else {
        $("#errcbbArea").attr("hidden", "hidden");
    }

    if (ValLine == '' && IsLine == 1) {
        $("#errcbbLine").removeAttr("hidden");
    }
    else {
        $("#errcbbLine").attr("hidden", "hidden");
    }

    if (ValModel == '' && IsModel == 1) {
        $("#errcbbModel").removeAttr("hidden");
    }
    else {
        $("#errcbbModel").attr("hidden", "hidden");
    }

    if (ValMachineNumber == '' && IsMachine == 1) {
        $("#errMachineNumber").removeAttr("hidden");
    }
    else {
        $("#errMachineNumber").attr("hidden", "hidden");
    }

    if (ValMaterial == '' && IsMaterial == 1) {
        $("#errMaterialDescription").removeAttr("hidden");
    }
    else {
        $("#errMaterialDescription").attr("hidden", "hidden");
    }

    if (ValSession == '' && IsSession == 1) {
        $("#errSessionID").removeAttr("hidden");
    }
    else {
        $("#errSessionID").attr("hidden", "hidden");
    }

    if (ValFGCode == '' && IsFGCode == 1) {
        $("#errFGCode").removeAttr("hidden");
    }
    else {
        $("#errFGCode").attr("hidden", "hidden");
    }

    if (ValLotNumber == '' && IsLotNumber == 1) {
        $("#errLotNumber").removeAttr("hidden");
    }
    else {
        $("#errLotNumber").attr("hidden", "hidden");
    }

    if (ValProcess == '' && IsProcess == 1) {
        $("#errProcess").removeAttr("hidden");
    }
    else {
        $("#errProcess").attr("hidden", "hidden");
    }
    if (ValDetailId == null)
    {
        ValDetailId = 0
    }


    if (ValIssueTittle != '' && ValImageUpload != '' && ValPlant != '' && ValProcessOwner != '' && (ValVendorCode != '' || IsVendor == 0) && (ValVendorProcess != '' || IsVendor == 0) && ValIssueFocus != undefined && ValCriteria != undefined && (ValDepartment != '' || IsDepartment == 0) && (ValProduct != '' || IsProduct == 0) && (ValArea != '' || IsArea == 0) && (ValLine != '' || IsLine == 0) && (ValModel != '' || IsModel == 0) && (ValMachineNumber != '' || IsMachine == 0) && (ValMaterial != '' || IsMaterial == 0) && (ValSession != '' || IsSession == 0) && (ValFGCode != '' || IsFGCode == 0) && (ValLotNumber != '' || IsLotNumber == 0) && (ValProcess != '' || IsProcess == 0))
    {
        var datas = ValIssueTittle + '~'
        datas += ValIssueDescription + '~'
        datas += ValPlant + '~'
        datas += ValProcessOwner + '~'
        datas += ValVendorCode + '~'
        datas += ValVendorProcess + '~'
        datas += ValIssueFocus + '~'
        datas += ValCriteria + '~'
        datas += ValDepartment + '~'
        datas += ValProduct + '~'
        datas += ValArea + '~'
        datas += ValLine + '~'
        datas += ValModel + '~'
        datas += ValMachineNumber + '~'
        datas += ValMaterial + '~'
        datas += ValSession + '~'
        datas += ValFGCode + '~'
        datas += ValLotNumber + '~'
        datas += ValProcess + '~'
        datas += ValDetailId + '~'

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
                        SubmitNewCase.Submit(datas)
                        console.log(datas)
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

}


SubmitNewCase.Submit =  function(datas)
{
    Loading.BlockPage()
    var ValDetailId = GetParam.ParameterFromURL('DetailId')
    var fileUpload = $("#UploadImage").get(0);
    var files = fileUpload.files;

    // Create FormData object  
    var fileData = new FormData();
    // Looping over all files and add it to FormData object  

    for (var i = 0; i < files.length; i++) {
        fileData.append('File', files[i]);
    }

    fileData.append('datas', datas);

    $.ajax({
        url: "../SubmitNewCase/Submit",
        method: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (j) {
            Loading.UnblockPage_()
            var $el = $('#UploadImage');
            $el.wrap('<form>').closest('form').get(0).reset();
            $el.unwrap();
            $('.img').remove()
            if (j.Result == true) {
                if (ValDetailId == null)
                {
                    Notification.ShowPopUp('success', 'Submit Success', j.Data[0], '../SubmitNewCase/SubmitNewCase?FormName=SubmitNewCase')
                }
                else
                {
                    //Notification.ShowPopUp('success', 'Submit Success', j.Data[0], 'close')
                    swal.fire({
                        title: 'Submit Success',
                        html: j.Data[0],
                        icon: 'success',
                        allowOutsideClick: false,
                        button: "ok",
                    });

                    $('.swal2-confirm').click(function () {
                            window.close()
                    });
                }
            }
            else
            {
                Notification.ShowToast('error', j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}




    //Dashboard.GetIssueFocus = function () {
    //    var ValPlant = $('#cbbPlant').val();;
    //    var cbbIssueFocus = $('#cbbIssueFocus')
    //    cbbIssueFocus.empty();
    //    cbbIssueFocus.append("<option value=''>All Issue Focus</option>");
    //    Loading.BlockPage()
    //    $.ajax({
    //        url: "../Home/GetIssueFocus",
    //        method: "POST",
    //        dataType: "JSON",
    //        data: {
    //            Plant: ValPlant
    //        },
    //        success: function (j) {
    //            if (j.Result == true) {
    //                $.each(j.Data[0], function (i, st) {
    //                    cbbIssueFocus.append("<option value=\"" + st + "\">" + st + "</option>")
    //                });
    //                Loading.UnblockPage_()
    //                Dashboard.GetTotal()
    //                Action.Getdata()
    //                Resolution.Getdata()
    //                Approval.Getdata()
    //                return j.Data;
    //            }
    //        },
    //        error: function (xhr, error, text) {
    //            Loading.UnblockPage_()
    //            Notification.ShowToast('error', '' + error + '')
    //        }
    //    });
    //}


    //Approval.Getdata = function () {
    //    var ValPlant = $('#cbbPlant').val();
    //    var ValIssueFocus = $('#cbbIssueFocus').val();
    //    Loading.BlockPage()
    //    $.ajax({
    //        url: "../Home/GetApprovalData",
    //        method: "POST",
    //        dataType: "JSON",
    //        data: {
    //            Plant: ValPlant,
    //            IssueFocus: ValIssueFocus
    //        },
    //        success: function (j) {
    //            if (j.Result == true) {
    //                Approval.mDataTable.clear();
    //                $.each(j.Data[0], function (i, st) {
    //                    Approval.mDataTable.row.add(st);
    //                })
    //                Approval.mDataTable.draw();
    //                Loading.UnblockPage_()
    //            }
    //        },
    //        error: function (xhr, error, text) {
    //            Loading.UnblockPage_()
    //            Notification.ShowToast('error', '' + error + '')
    //        }
    //    });
    //}

