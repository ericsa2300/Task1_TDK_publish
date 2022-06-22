$(document).ready(function () {
    //$('#MasterSubmitNewCase').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')
    CaseCompleted.GetDataCase()
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    CaseCompleted.ImageClick('SUBMIT', AuditNumber, AuditNumber + '_' + 0)
});



function CaseCompleted() { }

CaseCompleted.GetDataCase = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    Loading.BlockPage()
    $.ajax({
        url: "../CaseCompleted/GetDataCase",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])

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
                CaseCompleted.ReadPictureCase()


            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

CaseCompleted.ReadPictureCase = function () {
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
        url: "../CaseCompleted/LoadImageCase",
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
                    var ImageNo = value[7].split('.')
                    console.log(ImageNo[0])
                    //ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide" style="background-color:#fff" />')
                    ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff" onclick="CaseCompleted.ImageClick(\'SUBMIT\',\'' + AuditNumber + '\',\'' + ImageNo[0] + '\')"/>')
                });
                SlickSlider.initSlick()
                Loading.UnblockPage_()
                CaseCompleted.ActionMode()
                CaseCompleted.ResolutionMode()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

}

CaseCompleted.ActionMode = function () {
    $('.EditAction').hide()
    $('.ActionDefault').show()
    //$('#TargetDateAction').attr('disabled', 'disabled')
    //$('#txtActionDescription').attr('disabled', 'disabled')
    $('#photos').empty()
    CaseCompleted.GetDataAction()
}

CaseCompleted.ResolutionMode = function () {
    $('.EditResolution').hide()
    $('.ResolutionDefault').show()
    //$('#TargetDateResolution').attr('disabled', 'disabled')
    //$('#txtResolutionDescription').attr('disabled', 'disabled')
    //$('#txtTangible').attr('disabled', 'disabled')
    //$('#txtReasonResolution').attr('disabled', 'disabled')
    $('#photosResolution').empty()
}


CaseCompleted.GetDataAction = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    Loading.BlockPage()
    $.ajax({
        url: "../CaseCompleted/GetDataAction",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0][0].TargetDateAction == '') {
                    $('#txtDetailHeaderAction').html(' (DISABLE)')
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


                $('#TargetDateResolution').val(j.Data[0][0].EffectiveDate);
                document.getElementById("txtResolutionDescription").value = j.Data[0][0].Resolution
                document.getElementById("txtIssueFocusResolution").value = j.Data[0][0].IssueFocus
                document.getElementById("txtTangible").value = j.Data[0][0].TangibleCRMonth
                document.getElementById("txtCategoryResolution").value = j.Data[0][0].IntangibleBenefit
                document.getElementById("txtReasonResolution").value = j.Data[0][0].ReasonIntangible
                $('#ResolutionPostBy').html(j.Data[0][0].PostByResolution)
                $('#ResolutionPostDate').html(j.Data[0][0].PostDateResolution)

                if (j.Data[0][0].ResolutionApproval == 'Approved')
                {
                    document.getElementById("txtApprove").value = 'YES'
                }
                else
                {
                    document.getElementById("txtApprove").value = 'NO'
                }
                document.getElementById("txtApprovalComment").value = j.Data[0][0].ApproverComment
                $('#ApprovalPostBy').html(j.Data[0][0].PostByApproval)
                $('#ApprovalPostDate').html(j.Data[0][0].PostDateApproval)

                Loading.UnblockPage_()
                CaseCompleted.ReadPictureAction()
                CaseCompleted.ReadPictureResolution()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


CaseCompleted.ReadPictureAction = function () {
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
        url: "../CaseCompleted/LoadImageAction",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                var isActionPlan = $('#txtDetailHeaderAction').html()
                console.log(isActionPlan)
                if (isActionPlan == ' (DISABLE)') {
                    var photoAction = $("#photoAction")
                    photoAction.empty()
                    console.log(j.Data[0])
                    photoAction.append('<img id="imgAction0" src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide" style="background-color:#fff"/>')
                }
                else
                {
                    $.each(j.Data[0], function (i, st) {
                        var value = st.split('\\')
                        var ImageNo = value[7].split('.')
                        console.log(ImageNo[0])
                        if (i == 0) {
                            CaseCompleted.ImageClick('ACTION', AuditNumber, ImageNo[0])
                        }
                        //ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide" style="background-color:#fff" />')
                        ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff" onclick="CaseCompleted.ImageClick(\'ACTION\',\'' + AuditNumber + '\',\'' + ImageNo[0] + '\')"/>')
                    });
                }
                
                SlickSlider.initSlickAction()
                Loading.UnblockPage_()
                CaseCompleted.GetIssueFocus()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

}


CaseCompleted.ReadPictureResolution = function () {
    var ImageSlider = $("#div_SliderResolution")
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
        url: "../CaseCompleted/LoadImageResolution",
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
                    var ImageNo = value[7].split('.')
                    console.log(ImageNo[0])
                    if (i == 0) {
                        CaseCompleted.ImageClick('RESOLUTION', AuditNumber, ImageNo[0])
                    }
                    //ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide" style="background-color:#fff" />')
                    ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff" onclick="CaseCompleted.ImageClick(\'RESOLUTION\',\'' + AuditNumber + '\',\'' + ImageNo[0] + '\')"/>')
                });
                SlickSlider.initSlickResolution()
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

}



CaseCompleted.GetIssueFocus = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    var RadIssueFocus = $('#RadIssueFocus');
    var HTML = "";
    RadIssueFocus.empty();
    Loading.BlockPage()
    $.ajax({
        url: "../CaseCompleted/GetIssueFocus",
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
                    HTML += '<input type="radio" disabled="disabled" name="IssueFocus" id="Radio' + st + '"  value="' + st + '">'
                    HTML += '<label for="Radio' + st + '" class="color">' + st + '</label>'
                    HTML += '</div>'
                    HTML += '</div>'
                    HTML += '</div>'
                    RadIssueFocus.append(HTML)
                });
                Loading.UnblockPage_()
                CaseCompleted.GetCategory()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


CaseCompleted.GetCategory = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    var RadCategory = $('#RadCategory');
    var HTML = "";
    RadCategory.empty();
    Loading.BlockPage()
    $.ajax({
        url: "../CaseCompleted/GetCategory",
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
                    HTML += '<input type="radio" disabled="disabled" name="Category" id="Radio' + st + '"  value="' + st + '">'
                    HTML += '<label for="Radio' + st + '" class="color">' + st + '</label>'
                    HTML += '</div>'
                    HTML += '</div>'
                    HTML += '</div>'
                    RadCategory.append(HTML)
                });
                Loading.UnblockPage_()
                CaseCompleted.SetValueCheckbox()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

CaseCompleted.SetValueCheckbox = function () {
    var ValIssueDocus = document.getElementById("txtIssueFocusResolution").value
    var ValCategory = document.getElementById("txtCategoryResolution").value
    var ValApprovalStatus = document.getElementById("txtApprove").value

    var elemIssueFocus = document.getElementsByName('IssueFocus');
    for (var i = 0; i < elemIssueFocus.length; i++) {
        if (elemIssueFocus[i].value == ValIssueDocus) // set value from database
        {
            elemIssueFocus[i].checked = true;
        }
        //elemIssueFocus[i].disabled = true;
    }

    var elemCategory = document.getElementsByName('Category');
    for (var i = 0; i < elemCategory.length; i++) {
        if (elemCategory[i].value == ValCategory) // set value from database
        {
            elemCategory[i].checked = true;
        }
        //elemCategory[i].disabled = true;
    }


    var elemApprovalStatus = document.getElementsByName('ApprovalStatus');
    for (var i = 0; i < elemApprovalStatus.length; i++) {
        if (elemApprovalStatus[i].value == ValApprovalStatus) // set value from database
        {
            elemApprovalStatus[i].checked = true;
        }
        //elemCategory[i].disabled = true;
    }
}

CaseCompleted.ExportPDF = function () {
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    window.open('../CaseCompleted/PrintPDF2?Mode=export&AuditNumber=' + AuditNumber + '', '_blank', "")
}



CaseCompleted.ImageClick = function (Detail, AuditNumber, ImageNumber) {
    var photoAudit = $("#photoAudit")
    var photoAction = $("#photoAction")
    var photoResolution = $("#photoResolution")
    var area = ''
    if (Detail == 'SUBMIT') {
        area = 'photoAudit'
        photoAudit.empty()
    }
    else if (Detail == 'ACTION') {

        area = 'photoAction'
        photoAction.empty()
    }
    else {
        area = 'photoResolution'
        photoResolution.empty()
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
                console.log(j.Data[0])
                if (Detail == 'SUBMIT') {
                    photoAudit.append('<img id="img' + Detail + '' + ImageNumber + '" src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide" style="background-color:#fff"/>')
                }
                else if (Detail == 'ACTION') {
                    photoAction.append('<img id="img' + Detail + '' + ImageNumber + '" src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide" style="background-color:#fff"/>')
                }
                else {
                    photoResolution.append('<img id="img' + Detail + '' + ImageNumber + '" src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide" style="background-color:#fff"/>')
                }
                Loading.UnblockPage_()
                var magnifying_area = document.getElementById('' + area + '');
                var magnifying_img = document.getElementById('img' + Detail + '' + ImageNumber + '');

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
                    else {
                        clientX = (clientX / mWidth * 110) - 300
                        clientY = (clientY / mHeight * 120) - 60
                    }

                    console.log(clientX + '===' + clientY)
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

    console.log('AuditNo.' + AuditNumber + '_' + ImageNumber)
}
