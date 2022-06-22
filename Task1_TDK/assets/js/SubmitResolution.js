$(document).ready(function () {
    //$('#MasterSubmitNewCase').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')
    SubmitResolution.GetDataCase()
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    SubmitResolution.ImageClick('SUBMIT', AuditNumber, AuditNumber+'_'+0)
    //SubmitResolution.ImageClick('ACTION', AuditNumber, AuditNumber + '_' + 0)
});

function SubmitResolution() { }



SubmitResolution.GetDataCase = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    Loading.BlockPage()
    $.ajax({
        url: "../Resolution/GetDataCase",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                //console.log(j.Data[0])

                document.getElementById("txtIssueTittle").value = j.Data[0][0].IssueTittle
                document.getElementById("txtIssueDescription").value = j.Data[0][0].IssueDescription
                document.getElementById("txtPlant").value = j.Data[0][0].Plant
                document.getElementById("txtProcessOwner").value = j.Data[0][0].ProcessOwner
                document.getElementById("txtIssueFocus").value = j.Data[0][0].IssueFocus
                document.getElementById("txtCriteria").value = j.Data[0][0].Criteria


                if (j.Data[0][0].VendorCode == "" || j.Data[0][0].VendorCode == null) {
                    $('.IsVendor').hide()
                }
                else {
                    $('.IsVendor').show()
                    document.getElementById("txtVendorCode").value = j.Data[0][0].VendorCode
                }

                if (j.Data[0][0].VendorProcess == "" || j.Data[0][0].VendorProcess == null) {
                    $('.IsVendorProcess').hide()
                }
                else {
                    $('.IsVendorProcess').show()
                    document.getElementById("txtVendorProcess").value = j.Data[0][0].VendorProcess
                }

                if (j.Data[0][0].Department == "" || j.Data[0][0].Department == null) {
                    $('.IsDepartment').hide()
                }
                else {
                    $('.IsDepartment').show()
                    document.getElementById("txtDepartment").value = j.Data[0][0].Department
                }

                if (j.Data[0][0].Product == "" || j.Data[0][0].Product == null) {
                    $('.IsProduct').hide()
                }
                else {
                    $('.IsProduct').show()
                    document.getElementById("txtProduct").value = j.Data[0][0].Product
                }

                if (j.Data[0][0].Area == "" || j.Data[0][0].Area == null) {
                    $('.IsArea').hide()
                }
                else {
                    $('.IsArea').show()
                    document.getElementById("txtArea").value = j.Data[0][0].Area
                }

                if (j.Data[0][0].Line == "" || j.Data[0][0].Line == null) {
                    $('.IsLine').hide()
                }
                else {
                    $('.IsLine').show()
                    document.getElementById("txtLine").value = j.Data[0][0].Line
                }

                if (j.Data[0][0].Model == "" || j.Data[0][0].Model == null) {
                    $('.IsModel').hide()
                }
                else {
                    $('.IsModel').show()
                    document.getElementById("txtModel").value = j.Data[0][0].Model
                }

                if (j.Data[0][0].MachineNumber == "" || j.Data[0][0].MachineNumber == null) {
                    $('.IsMachine').hide()
                }
                else {
                    $('.IsMachine').show()
                    document.getElementById("txtMachineNumber").value = j.Data[0][0].MachineNumber
                }

                if (j.Data[0][0].MaterialDescription == "" || j.Data[0][0].MaterialDescription == null) {
                    $('.IsMaterial').hide()
                }
                else {
                    $('.IsMaterial').show()
                    document.getElementById("txtMaterial").value = j.Data[0][0].MaterialDescription
                }

                if (j.Data[0][0].SessionID == "" || j.Data[0][0].SessionID == null) {
                    $('.IsSession').hide()
                }
                else {
                    $('.IsSession').show()
                    document.getElementById("txtSessionId").value = j.Data[0][0].SessionID
                }

                if (j.Data[0][0].FGCode == "" || j.Data[0][0].FGCode == null) {
                    $('.IsFGCode').hide()
                }
                else {
                    $('.IsFGCode').show()
                    document.getElementById("txtFGCode").value = j.Data[0][0].FGCode
                }

                if (j.Data[0][0].LotNumber == "" || j.Data[0][0].LotNumber == null) {
                    $('.IsLotNumber').hide()
                }
                else {
                    $('.IsLotNumber').show()
                    document.getElementById("txtLotNumber").value = j.Data[0][0].LotNumber
                }


                if (j.Data[0][0].Process == "" || j.Data[0][0].Process == null) {
                    $('.IsProcess').hide()
                }
                else {
                    $('.IsProcess').show()
                    document.getElementById("txtProcess").value = j.Data[0][0].Process
                }

                $('#CasePostBy').html(j.Data[0][0].PostBy)
                $('#CasePostDate').html(j.Data[0][0].PostDate)

                Loading.UnblockPage_()
                SubmitResolution.ReadPictureCase()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


SubmitResolution.ReadPictureCase = function () {
    var ImageSlider = $("#div_Slider")
    var Link = window.location.href
    var Loc
    var lengthURL = Link.split(':').length
    if (Link.includes('localhost') == false && parseInt(lengthURL) < 3) {
        Loc = window.location.href
        var tmp = Loc.split('/')
        Loc = window.location.origin + '/' + tmp[3]

    }
    else {
        Loc = window.location.origin
    }
    ImageSlider.empty()
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    Loading.BlockPage()
    $.ajax({
        url: "../Resolution/LoadImageCase",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                $.each(j.Data[0], function (i, st) {
                    var value = st.split('\\')
                    console.log(value)
                    var ImageNo = value[7].split('.')
                    //console.log(ImageNo[0])
                    //ImageSlider.append('<img src="' + Loc + '/FileHandler.ashx?imagePath=' + st + '" class="swiper-slide" style="background-color:#fff" />')
                    ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff" onclick="SubmitResolution.ImageClick(\'SUBMIT\',\'' + AuditNumber + '\',\'' + ImageNo[0] + '\')"/>')
                });
                SlickSlider.initSlick()
                Loading.UnblockPage_()
                SubmitResolution.ActionMode('Default')
            }
            else
            {
                Loading.UnblockPage_()
                Notification.SweetAlert('error','error',j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

}




SubmitResolution.ActionMode = function(Mode)
{
  
    if(Mode == 'Edit')
    {
        var FormName = 'ListCaseAction'
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
                        $('.EditAction').removeAttr('hidden')
                        $('.ActionDefault').attr('hidden','hidden')
                        $('#TargetDateAction').removeAttr('disabled')
                        $('#txtActionDescription').removeAttr('disabled')
                        SubmitResolution.ImageNumberAction = []
                        SubmitResolution.LoadOldPictureAction()
                    }
                    else {
                        Notification.ShowToast('warning', 'you dont have access, please call IT')
                    }

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
    else
    {
        $('.EditAction').attr('hidden', 'hidden')
        $('.ActionDefault').removeAttr('hidden')
        $('#TargetDateAction').attr('disabled', 'disabled')
        $('#txtActionDescription').attr('disabled', 'disabled')

        var $el = $('#UploadImageAction');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
        $('#photos').empty()
        $('#OldPhotos').empty()
        SubmitResolution.GetDataAction()
    }
    
}


SubmitResolution.GetDataAction = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    Loading.BlockPage()
    $.ajax({
        url: "../Resolution/GetDataAction",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                //console.log(j.Data[0])
                if (j.Data[0][0].TargetDateAction == '')
                {
                    $('#txtDetailHeaderAction').html(' (DISABLE)')
                    $('.btnEditAction').attr('hidden', 'hidden')
                    $('.disableAction').attr('hidden', 'hidden')
                    $('#txtNotifImageActionDisable').removeAttr('hidden')
                    
                }
                else
                {
                    $('#txtNotifImageActionDisable').attr('hidden', 'hidden')
                    $('.disableAction').removeAttr('hidden')
                }
                $('#TargetDateAction').val(j.Data[0][0].TargetDateAction);
                document.getElementById("txtActionDescription").value = j.Data[0][0].ActionDescription
                
                $('#ActionPostBy').html(j.Data[0][0].PostByAction)
                $('#ActionPostDate').html(j.Data[0][0].PostDateAction)

                Loading.UnblockPage_()
                SubmitResolution.ReadPictureAction()
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

SubmitResolution.ReadPictureAction = function () {
    var ImageSlider = $("#div_SliderAction")
    var Link = window.location.href
    var Loc
    var lengthURL = Link.split(':').length
    if (Link.includes('localhost') == false && parseInt(lengthURL) < 3) {
        Loc = window.location.href
        var tmp = Loc.split('/')
        Loc = window.location.origin + '/' + tmp[3]

    }
    else {
        Loc = window.location.origin
    }
    ImageSlider.empty()
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    Loading.BlockPage()
    $.ajax({
        url: "../Resolution/LoadImageAction",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                
                var isActionPlan = $('#txtDetailHeaderAction').html()
                console.log(j.Data[0])
                if (isActionPlan == ' (DISABLE)')
                {
                    var photoAction = $("#photoAction")
                    photoAction.empty()
                    //console.log(j.Data[0])
                    photoAction.append('<img id="imgAction0" src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide" style="background-color:#fff"/>')
                }
                else
                {
                    $.each(j.Data[0], function (i, st) {
                        var value = st.split('\\')
                        console.log(value)
                        var ImageNo = value[7].split('.')
                        //console.log(ImageNo[0])
                        if (i == 0) {
                            SubmitResolution.ImageClick('ACTION', AuditNumber, ImageNo[0])
                        }
                        ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff" onclick="SubmitResolution.ImageClick(\'ACTION\',\'' + AuditNumber + '\',\'' + ImageNo[0] + '\')"/>')
                    });
                }
                
                SlickSlider.initSlickAction()
                Loading.UnblockPage_()
                SubmitResolution.GetIssueFocus()
                SubmitResolution.GetCategory()
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

SubmitResolution.GetIssueFocus = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    var RadIssueFocus = $('#RadIssueFocus');
    var HTML = "";
    RadIssueFocus.empty();
    Loading.BlockPage()
    $.ajax({
        url: "../Resolution/GetIssueFocus",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    HTML = '<div class="col-md-6">'
                    HTML += '<div class="funkyradio">'
                    HTML += '<div class="funkyradio-info">'
                    HTML += '<input type="radio" name="IssueFocus" id="Radio' + st + '"  value="' + st + '">'
                    HTML += '<label for="Radio' + st + '" class="color">' + st + '</label>'
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


SubmitResolution.GetCategory = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    var RadCategory = $('#RadCategory');
    var HTML = "";
    RadCategory.empty();
    Loading.BlockPage()
    $.ajax({
        url: "../Resolution/GetCategory",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    HTML = '<div class="col-md-6">'
                    HTML += '<div class="funkyradio">'
                    HTML += '<div class="funkyradio-info">'
                    HTML += '<input type="radio" name="Category" id="Radio' + st + '"  value="' + st + '">'
                    HTML += '<label for="Radio' + st + '" class="color">' + st + '</label>'
                    HTML += '</div>'
                    HTML += '</div>'
                    HTML += '</div>'
                    RadCategory.append(HTML)
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


SubmitResolution.ReadPicture = function (input) {
    var Photos = $('#photosResolution')
    Photos.empty()
    var HTML = "";
    var counter = 5;
    var count = 0
    if (input.files.length > counter) {
        Notification.ShowToast('error', 'cant upload image more than 5')
        var $el = $('#UploadImageResolution');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
    }
    else {
        for (var x = 0; x < input.files.length; x++) {
            count = count + 1;
            if (input.files && input.files[x]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    HTML = "";
                    HTML += '<div id="divPhotosResolution' + count + '" class="col-lg-3">'
                    HTML += '<div class="image-input image-input-outline">'
                    HTML += '<img src="' + e.target.result + '" class="image-input-wrapper" />'
                    HTML += '<button onclick="SubmitResolution.RemovePhotos(\'' + count + '\')" class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Delete">'
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

SubmitResolution.RemovePhotos = function (Id) {
    $('#divPhotosResolution' + Id + '').remove();
}

SubmitResolution.OnClickSubmit = function ()
{
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    var ValTargetDateResolution = $("#TargetDateResolution").val()
    var ValImageUpload = $("#UploadImageResolution").val()
    var ValResolutionDescription = document.getElementById("txtResolutionDescription").value
    var ValIssueFocus = $("input[name=IssueFocus]:checked").val()
    var ValTangible = document.getElementById("txtTangible").value
    var ValCategory = $("input[name=Category]:checked").val()
    var ValReasonCategory = document.getElementById("txtReasonResolution").value


    if (ValTargetDateResolution == '') {
        $("#errTargetDateResolution").removeAttr("hidden");
    }
    else {
        $("#errTargetDateResolution").attr("hidden", "hidden");
    }


    if (ValImageUpload == '') {
        $("#errUploadPhotoResolution").removeAttr("hidden");
    }
    else {
        $("#errUploadPhotoResolution").attr("hidden", "hidden");
    }

    if (ValResolutionDescription == '') {
        $("#errResolutionDescription").removeAttr("hidden");
    }
    else {
        $("#errResolutionDescription").attr("hidden", "hidden");
    }

    if (ValIssueFocus == undefined) {
        $("#errIssueFocus").removeAttr("hidden");
    }
    else {
        $("#errIssueFocus").attr("hidden", "hidden");
    }

    if (ValTangible == '') {
        $("#errTangible").removeAttr("hidden");
    }
    else {
        $("#errTangible").attr("hidden", "hidden");
    }

    if (ValCategory == undefined) {
        $("#errCategory").removeAttr("hidden");
    }
    else {
        $("#errCategory").attr("hidden", "hidden");
    }

    if (ValReasonCategory == '') {
        $("#errReasonResolution").removeAttr("hidden");
    }
    else {
        $("#errReasonResolution").attr("hidden", "hidden");
    }

    if (ValTargetDateResolution != '' && ValImageUpload != '' && ValResolutionDescription != '' && ValIssueFocus != undefined && ValTangible != '' && ValCategory != undefined && ValReasonCategory !='')
    {
        var datas = AuditNumber + '|'
        datas += ValTargetDateResolution + '|'
        datas += ValResolutionDescription + '|'
        datas += ValIssueFocus + '|'
        datas += ValTangible + '|'
        datas += ValCategory + '|'
        datas += ValReasonCategory + '|'

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
                        SubmitResolution.Submit(datas)
                        //console.log(datas)
                    }
                    else {
                        Notification.ShowToast('warning', 'you dont have access, please call IT')
                    }

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
}


SubmitResolution.Submit = function(datas)
{
    Loading.BlockPage()
    var fileUpload = $("#UploadImageResolution").get(0);
    var files = fileUpload.files;
    // Create FormData object  
    var fileData = new FormData();
    // Looping over all files and add it to FormData object  

    for (var i = 0; i < files.length; i++) {
        fileData.append('File', files[i]);
    }

    fileData.append('datas', datas);

    $.ajax({
        url: "../Resolution/Submit",
        method: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (j) {
            Loading.UnblockPage_()
            var $el = $('#UploadImageResolution');
            $el.wrap('<form>').closest('form').get(0).reset();
            $el.unwrap();
            if (j.Result == true) {
                Notification.ShowPopUp('success', 'Submit Success', j.Data[0], '../Home/Dashboard?FormName=Dashboard')
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


SubmitResolution.CloseCase = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    var ValReasonClose = document.getElementById("txtReason").value

    if (ValReasonClose == '') {
        $("#errReasonClose").removeAttr("hidden");
    }
    else {
        $("#errReasonClose").attr("hidden", "hidden");
    }

    if (ValReasonClose != '') {
        swal.fire({
            title: 'Close Case',
            html: 'Are you sure want to close this case?',
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            button: "ok",
        });
        $('.swal2-confirm').click(function () {
            Loading.BlockPage()
            $.ajax({
                url: "../Resolution/CloseCase",
                method: "POST",
                dataType: "JSON",
                data: {
                    AuditNumber: AuditNumber,
                    ReasonClose: ValReasonClose
                },
                success: function (j) {
                    Loading.UnblockPage_()
                    //console.log(j.Data[0])
                    if (j.Result == true) {
                        Notification.ShowPopUp('success', 'Submit Success', j.Data[0], '../Home/Dashboard?FormName=Dashboard')
                    }
                    else {
                        Notification.ShowToast('warning', '' + j.Data[0] + '')
                    }
                },
                error: function (xhr, error, text) {
                    Loading.UnblockPage_()
                    Notification.ShowToast('error', '' + error + '')
                }
            });
        });
    }

}



SubmitResolution.ReSubmitPictureAction = function (input) {
    var Photos = $('#photos')
    Photos.empty()
    var HTML = "";
    var counter = 5;
    var count = 0
    if (input.files.length > counter) {
        Notification.ShowToast('error', 'cant upload image more than 5')
        var $el = $('#UploadImageAction');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
    }
    else {
        for (var x = 0; x < input.files.length; x++) {
            count = count + 1;
            if (input.files && input.files[x]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    HTML = "";
                    HTML += '<div id="divPhotos' + count + '" class="col-lg-3">'
                    HTML += '<div class="image-input image-input-outline">'
                    HTML += '<img src="' + e.target.result + '" class="image-input-wrapper" />'
                    HTML += '<button onclick="SubmitAction.RemovePhotos(\'' + count + '\')" class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Delete">'
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

SubmitResolution.RemovePhotosAction = function (Id) {
    $('#divPhotos' + Id + '').remove();
}


SubmitResolution.LoadOldPictureAction = function () {
    var OldPhotos = $("#OldPhotos")
    var HTML = "";
    var value = ""
    var ImageNo = ""
    var Link = window.location.href
    var Loc
    var lengthURL = Link.split(':').length
    if (Link.includes('localhost') == false && parseInt(lengthURL) < 3) {
        Loc = window.location.href
        var tmp = Loc.split('/')
        Loc = window.location.origin + '/' + tmp[3]

    }
    else {
        Loc = window.location.origin
    }
    OldPhotos.empty()
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    Loading.BlockPage()
    $.ajax({
        url: "../Resolution/LoadImageAction",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    value = j.Data[0][i].split('\\')
                    ImageNo = value[7].split('.')
                    HTML = "";
                    HTML += '<div id="divOldPhotos' + ImageNo[0] + '" class="col-lg-3">'
                    HTML += '<div class="image-input image-input-outline">'
                    //HTML += '<img src="' + Loc + '/FileHandler.ashx?imagePath=' + st + '" class="image-input-wrapper" />'
                    HTML += '<img src="../FileHandler.ashx?imagePath=' + st + '" class="image-input-wrapper" />'
                    HTML += '<button onclick="SubmitResolution.RemoveoldPhotosAction(\'' + ImageNo[0] + '\')" class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Delete">'
                    HTML += '<i class="ki ki-bold-close icon-sm text-muted"></i>'
                    HTML += '</button>'
                    HTML += '</div>'
                    HTML += '<span class="form-text text-muted"></span>'
                    HTML += '</div>'
                    OldPhotos.append(HTML)
                });
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

}

SubmitResolution.ImageNumberAction = []

SubmitResolution.RemoveoldPhotosAction = function (Id) {
    $('#divOldPhotos' + Id + '').remove();
    SubmitResolution.ImageNumberAction.push(Id)
    //console.log(SubmitResolution.ImageNumberAction)
}


SubmitResolution.OnClickUpdateAction = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    var ValTargetDateAction = document.getElementById("TargetDateAction").value
    var ValActionDescription = document.getElementById("txtActionDescription").value

    if (ValTargetDateAction == '') {
        $("#errTargetDateAction").removeAttr("hidden");
    }
    else {
        $("#errTargetDateAction").attr("hidden", "hidden");
    }

    if (ValActionDescription == '') {
        $("#errActionDescription").removeAttr("hidden");
    }
    else {
        $("#errActionDescription").attr("hidden", "hidden");
    }

    if (ValTargetDateAction != '' && ValActionDescription != '') {
        var datas = AuditNumber + '|'
        datas += ValTargetDateAction + '|'
        datas += ValActionDescription
        SubmitResolution.UpdateAction(datas)
        //console.log(datas)
    }
}

SubmitResolution.UpdateAction = function (datas) {
    Loading.BlockPage()
    var fileUpload = $("#UploadImageAction").get(0);
    var files = fileUpload.files;

    // Create FormData object  
    var fileData = new FormData();
    // Looping over all files and add it to FormData object  

    for (var i = 0; i < files.length; i++) {
        fileData.append('File', files[i]);
    }

    fileData.append('datas', datas);
    fileData.append('OldImageNumber', SubmitResolution.ImageNumberAction);

    $.ajax({
        url: "../Resolution/Update",
        method: "POST",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (j) {
            Loading.UnblockPage_()
            var $el = $('#UploadImageAction');
            $el.wrap('<form>').closest('form').get(0).reset();
            $el.unwrap();
            if (j.Result == true) {
                Notification.ShowToast('success', '' + j.Data[0] + '')
                SubmitResolution.ActionMode('Default')
                //Notification.ShowPopUp('success', 'Submit Success', j.Data[0], '../Home/Dashboard?FormName=Dashboard')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



SubmitResolution.ViewDetail= function()
{
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    window.open('../CaseCompleted/PrintPDF2?Mode=manual&AuditNumber=' + AuditNumber + '', '_blank', "")
}



SubmitResolution.ImageClick = function (Detail, AuditNumber, ImageNumber) {
    var photoAudit = $("#photoAudit")
    var photoAction = $("#photoAction")
    var area = ''
    if (Detail == 'SUBMIT')
    {
        area = 'photoAudit'
        photoAudit.empty()
    }
    else if(Detail == 'ACTION')
    {
        area = 'photoAction'
        photoAction.empty()
    }


    $.ajax({
        url: "../Action/LoadImageCaseByDetail",
        method: "POST",
        dataType: "JSON",
        data: {
            Form: Detail,
            AuditNumber: AuditNumber,
            ImageNumber: ImageNumber
        },
        success: function (j) {
            if (j.Result == true) {
                //console.log(j.Data[0])
                if (Detail == 'SUBMIT') {
                    photoAudit.append('<img id="img' + Detail + '' + ImageNumber + '" src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide" style="background-color:#fff"/>')
                }
                else if (Detail == 'ACTION') {
                    photoAction.append('<img id="img' + Detail + '' + ImageNumber + '" src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide" style="background-color:#fff"/>')
                }
                Loading.UnblockPage_()

                var magnifying_area = document.getElementById(''+area+'');
                var magnifying_img = document.getElementById('img'+Detail+'' + ImageNumber + '');

                magnifying_area.addEventListener("mousemove", function (event) {
                    clientX = event.clientX - magnifying_area.offsetLeft
                    clientY = event.clientY - magnifying_area.offsetTop


                    var mWidth = magnifying_area.offsetWidth
                    var mHeight = magnifying_area.offsetHeight

                    if (Detail == 'SUBMIT') {
                        clientX = (clientX / mWidth * 110) - 30
                        clientY = (clientY / mHeight * 120) - 60
                    }
                    else if (Detail == 'ACTION') {
                        clientX = (clientX / mWidth * 110) - 160
                        clientY = (clientY / mHeight * 120) - 60
                    }
                    
                    //console.log(clientX + '===' + clientY)
                    magnifying_img.style.transform = 'translate(-' + clientX + '%, -' + clientY + '%) scale(2)'


                })

                magnifying_area.addEventListener("mouseleave", function () {
                    magnifying_img.style.transform = 'translate(-50%,-50%) scale(1)'
                })
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

    //console.log('AuditNo.' + AuditNumber + '_' + ImageNumber)
}