$(document).ready(function () {
    //$('#MasterSubmitNewCase').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')
    
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber')
    if (AuditNumber != '' && AuditNumber != null )
    {
        ActionList.ViewAction(AuditNumber)
    }
    else
    {
        ActionList.GetData()
    }
});

function ActionList(){}

ActionList.ViewAction = function (AuditNumber)
{
    $('.ListAction').attr('hidden', 'hidden')
    $('.DetailAction').removeAttr('hidden')
    $('#spanAuditNumber').html(AuditNumber)
    SubmitAction.GetDataCase()
    SubmitAction.ImageClick($('#spanAuditNumber').html(), 0)
}


ActionList.GetData = function()
{
    var Search = document.getElementById("txtSearch").value
    var ActionViewMobile = $('#ActionViewMobile')
    ActionViewMobile.empty()
    Loading.BlockPage()
    $.ajax({
        url: "../Action/GetDataActionMobile",
        method: "POST",
        dataType: "JSON",
        data: {
            Search: Search
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                var html = '';
                $.each(j.Data[0], function (i, st) {
                    //ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff"  onclick="SubmitAction.ImageClick(\'' + AuditNumber + '\',\'' + i + '\')"/>')


                    html +='<div  class="col-6 mb-5" style="padding-right: 5px;padding-left: 5px;" onclick="ActionList.ViewAction(\'' + st.AuditNumber + '\')">'
                        html += '<div  class="card card-custom" style="-webkit-box-shadow: 5px 4px 2px -1px #808080;box-shadow: 5px 4px 2px -1px #808080;border-radius: 12px;border: 1px solid #808080;">'
                        html += '<div  class="card-body ribbon ribbon-clip ribbon-left" style="height:260px;padding: 0rem 0rem;">'
                        html += '<div  class="ribbon-target" style="top: 12px;">'
				                    html +='<span class="ribbon-inner bg-warning"></span>Action Plan'
			                    html +='</div>'
			                    html += '<div class="form-control" style="height:65%;border-radius: 12px;">'
			                    html += '<img src="../FileHandler.ashx?imagePath=' + st.ImageLoc + '" style="background-color:#fff;height:150px;width:100%;" />'
			                    html +='</div>'
			                    html += '<div class="col-12">'
			                    var leng = st.IssueTitle.length;
			                    if (leng > 25)
			                    {
			                        html += '<label class="text-dark font-weight-bolder" style="margin-bottom: 0.1rem;">' + st.IssueTitle.substring(0, 25) + ' ...</label>'
			                    }
			                    else
			                    {
                                    html +='<label class="text-dark font-weight-bolder" style="margin-bottom: 0.1rem;">'+st.IssueTitle+'</label>'
			                    }
				                    
				                    html +='<br />'
				                    html +='<label class="text-primary font-size-h5-sm font-weight-bolder" style="margin-bottom: 0rem;">'+st.AuditNumber+'</label>'
				                    html += '<div  class="row">'
				                    html += '<div  class="col-2 mt-3">'
						                    html +='<i class="fa fa-map-marker-alt icon-xl"></i>'
					                    html +='</div>'
					                    html += '<div  class="col-10">'
						                    html +='<label class="font-weight-bolder" style="margin-bottom: 0rem;">'+st.Department+'</label>'
						                    html += '<br />'
						                    var lengArea = st.Area.length;
						                    if (lengArea > 20) {
						                        html += '<label class="font-weight-bolder" style="margin-bottom: 0rem;">' + st.Area.substring(0, 20) + ' ...</label>'
						                    }
						                    else {
						                        html += '<label class="font-weight-bolder" style="margin-bottom: 0rem;">' + st.Area + '</label>'
						                    }
						                    
					                    html +='</div>'
				                    html +='</div>'
				                    html +='<span class="form-text text-muted" style="margin-top: 0rem;">'+st.CreatedBy+' | '+st.CreatedDate+'</span>'
			                    html +='</div>'
		                    html +='</div>'
	                    html +='</div>'
                    html +='</div>'
                });
                ActionViewMobile.append(html)
                Loading.UnblockPage_()
            }
            else
            {
                Loading.UnblockPage_()
                Notification.ShowPopUp('error', 'Error !!!', j.Msg, '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}





function SubmitAction() { }

SubmitAction.Back = function()
{
    $('.DetailAction').attr('hidden', 'hidden')
    $('.ListAction').removeAttr('hidden')
    ActionList.GetData()
}

SubmitAction.GetDataCase =  function()
{
    var AuditNumber = $('#spanAuditNumber').html()
    Loading.BlockPage()
    $.ajax({
        url: "../Action/GetDataCase",
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


                if (j.Data[0][0].VendorCode == "" || j.Data[0][0].VendorCode == null)
                {
                    $('.IsVendor').hide()
                }
                else
                {
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
                SubmitAction.ReadPictureCase()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitAction.GenerateDiv = function ()
{
    var Link = window.location.href
    var Loc
    if (Link.includes('Action') == true) {
        Loc = window.location.href
        console.log(Loc)
    }
    else
    {
        Loc = window.location.origin
    }
    var div = '<img src="' + Loc + '/FileHandler.ashx?imagePath=\\\\sbm-vmiis\\SharingFiles\\EPTA\\QA\\Submit\\PTA210020010001_0.png" class="swiper-slide" style="background-color:#fff" />';
    return div;
}

SubmitAction.ReadPictureCase = function()
{
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
    var AuditNumber = $('#spanAuditNumber').html()
    Loading.BlockPage()
    $.ajax({
        url: "../Action/LoadImageCase",
        method: "POST",
        dataType: "JSON",
        data: {
            AuditNumber: AuditNumber
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                $.each(j.Data[0], function (i, st) {
                    ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff"  onclick="SubmitAction.ImageClick(\'' + AuditNumber + '\',\'' + i + '\')"/>')
                });
                SlickSlider.initSlick()
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
    
    
}

SubmitAction.ReadPicture = function (input) {
    var Photos = $('#photos')
    Photos.empty()
    var HTML = "";
    var counter = 5;
    var count = 0
    if (input.files.length > counter) {
        Notification.ShowToast('error', 'cant upload image more than 5')
        var $el = $('#UploadImage');
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

SubmitAction.RemovePhotos = function (Id) {
    $('#divPhotos' + Id + '').remove();
}


SubmitAction.OnClickSubmit = function ()
{
    var AuditNumber = $('#spanAuditNumber').html()
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

    if (ValTargetDateAction != '' && ValActionDescription != '')
    {
        var datas = AuditNumber + '|'
        datas += ValTargetDateAction + '|'
        datas += ValActionDescription

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
                        SubmitAction.Submit(datas)
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

SubmitAction.Submit = function (datas) {
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

    $.ajax({
        url: "../Action/Submit",
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
                Notification.SweetAlert('success', 'Submit Success', j.Data[0])
                SubmitAction.Back()
            }
            else
            {
                Notification.SweetAlert ('error','Error',j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

SubmitAction.CloseCase =  function()
{
    var AuditNumber = $('#spanAuditNumber').html()
    var ValReasonClose = document.getElementById("txtReason").value

    if (ValReasonClose == '') {
        $("#errReasonClose").removeAttr("hidden");
    }
    else {
        $("#errReasonClose").attr("hidden", "hidden");
    }

    if (ValReasonClose != '')
    {
        swal.fire({
            title: 'Close Case',
            html: 'Are you sure want to cancel this audit?',
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            button: "ok",
        });
        $('.swal2-confirm').click(function () {
            var FormName = GetParam.ParameterFromURL('FormName')
            Loading.BlockPage()
            $.ajax({
                url: "../Action/CloseCase",
                method: "POST",
                dataType: "JSON",
                data: {
                    AuditNumber: AuditNumber,
                    ReasonClose: ValReasonClose
                },
                success: function (j) {
                    Loading.UnblockPage_()
                    console.log(j.Data[0])
                    if (j.Result == true) {
                        Notification.SweetAlert('success', 'Cancel Success', j.Data[0])
                        SubmitAction.Back()
                    }
                    else
                    {
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

SubmitAction.ImageClick = function (AuditNumber, ImageNumber)
{
    var photoAudit = $("#photoAudit")
    photoAudit.empty()
    $.ajax({
        url: "../Action/LoadImageCaseByDetail",
        method: "POST",
        dataType: "JSON",
        data: {
            Form: 'SUBMIT',
            AuditNumber: AuditNumber,
            ImageNumber: AuditNumber + '_' + ImageNumber
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                photoAudit.append('<img id="imgSubmit' + ImageNumber + '" src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide" style="background-color:#fff"/>')
                Loading.UnblockPage_()


                var magnifying_area = document.getElementById('photoAudit');
                var magnifying_img = document.getElementById('imgSubmit' + ImageNumber + '');

                magnifying_area.addEventListener("mousemove", function (event) {
                    clientX = event.clientX - magnifying_area.offsetLeft
                    clientY = event.clientY - magnifying_area.offsetTop


                    var mWidth = magnifying_area.offsetWidth
                    var mHeight = magnifying_area.offsetHeight

                    clientX = (clientX / mWidth * 110)-30
                    clientY = (clientY / mHeight * 120)-60
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




