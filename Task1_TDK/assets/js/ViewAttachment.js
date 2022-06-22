$(document).ready(function () {
    //$('#MasterSubmitNewCase').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')
    View.GetDataCase()

});



function View() { }

View.GetDataCase = function () {
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

                document.getElementById("txtAuditNo").value = AuditNumber
                document.getElementById("txtPlant").value = j.Data[0][0].Plant
                document.getElementById("txtProcessOwner").value = j.Data[0][0].ProcessOwner
                document.getElementById("txtLocation").value = j.Data[0][0].Exception
                document.getElementById("txtDepartment").value = j.Data[0][0].Department
                document.getElementById("txtAuditor").value = j.Data[0][0].PostBy

                Loading.UnblockPage_()
                View.ReadPictureCase()
                //SlickSlider.initSlick()

            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

View.ReadPictureCase = function () {
    var ImageSlider = $("#div_Slider")
    var ImageSlider1 = $("#div_Slider1")
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
    ImageSlider1.empty()
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
                    if(i==0)
                    {
                        //ImageSlider.append('<img src="' + Loc + '/FileHandler.ashx?imagePath=' + st + '" style="height:730px; width:650px; background-color:#FAFAFA" />')
                        ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" style="height:550px; background-color:#FAFAFA" />')
                    }
                    ImageSlider1.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff" onclick="View.ImageClick(\'SUBMIT\',\'' + AuditNumber + '\',\'' + ImageNo[0] + '\')"/>')
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



View.ImageClick = function (Detail, AuditNumber, ImageNumber) {
    var photoAudit = $("#div_Slider")
    //var photoAction = $("#photoAction")
    //var photoResolution = $("#photoResolution")
    if (Detail == 'SUBMIT') {

        photoAudit.empty()
    }
    //else if (Detail == 'ACTION') {

    //    photoAction.empty()
    //}
    //else {
    //    photoResolution.empty()
    //}


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
                    photoAudit.append('<img src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" style="height:550px; background-color:#FAFAFA" />')
                }
                //else if (Detail == 'ACTION') {
                //    photoAction.append('<img src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide form-control" style="background-color:#fff"/>')
                //}
                //else {
                //    photoResolution.append('<img src="../FileHandler.ashx?imagePath=' + j.Data[0] + '" class="swiper-slide form-control" style="background-color:#fff"/>')
                //}
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

    console.log('AuditNo.' + AuditNumber + '_' + ImageNumber)
}