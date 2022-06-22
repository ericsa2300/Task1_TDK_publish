$(document).ready(function () {
    Loading.UnblockPage_()
    //DashboardMobile.GetScreenMobile()
    $('.kt-selectpicker').selectpicker();
    FavoriteAuditList.GetDataFavoritMenu()
    OutStandingAuditList.GetData('div_Slider','top 5')
    SlickSlider.initSlickOutStanding()
});


function DashboardMobile() { }

DashboardMobile.GetScreenMobile = function()
{
    var w = screen.width;
    var h = screen.height;

    var result


    var FavoriteMenu = $('#FavoriteMenu')
    FavoriteMenu.empty()

    var html = ""
    var sizeIcon = '5x'
    var col = "";
    if (parseInt(w) < 700 && parseInt(w) >= 380)
    {
        sizeIcon = "5x"
        col = "col-3"
        result = true
    }
    else if (parseInt(w) < 380 && parseInt(w) >= 340) {
        sizeIcon = "4x"
        col = "col-3"
    }
    else if(parseInt(w) < 340)
    {
        sizeIcon = "5x"
        col = "col-4"
    }
    else
    {
        result = false
    }
    console.log(w + '-->' + sizeIcon)
    for (var i = 0; i < 5; i++) {
        html +='<div class="'+col+' col-sm-2">'
	        html +='<div class="card card-custom bgi-no-repeat card-stretch gutter-b" style="background-color:#fff">'
		        html +='<div class="card-body text-center" style="padding: 0.5rem 0.6rem;">'
			        html +='<span class="svg-icon svg-icon-'+sizeIcon+' svg-icon-primary">'
				        html +='<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'
					        html +='<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
						        html +='<rect x="0" y="0" width="24" height="24"></rect>'
						        html +='<path d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M7.5,5 C7.22385763,5 7,5.22385763 7,5.5 C7,5.77614237 7.22385763,6 7.5,6 L13.5,6 C13.7761424,6 14,5.77614237 14,5.5 C14,5.22385763 13.7761424,5 13.5,5 L7.5,5 Z M7.5,7 C7.22385763,7 7,7.22385763 7,7.5 C7,7.77614237 7.22385763,8 7.5,8 L10.5,8 C10.7761424,8 11,7.77614237 11,7.5 C11,7.22385763 10.7761424,7 10.5,7 L7.5,7 Z" fill="#000000" opacity="0.3"></path>'
						        html +='<path d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z" fill="#000000"></path>'
					        html +='</g>'
				        html +='</svg>'
			        html +='</span>'
			        html +='<span class="card-title font-weight-bolder text-dark-75 font-size-h5-md mb-0 d-block">Safety</span>'
		        html +='</div>'
	        html +='</div>'
        html +='</div>'
    }
    
    FavoriteMenu.append(html)

    //var ImageSlider = $("#div_Slider")
    //ImageSlider.empty()
    //SlickSlider.initSlickOutStanding()

    return result
}




function FavoriteAuditList(){}

FavoriteAuditList.Show = function()
{
    $('.HomePage1').attr('hidden', 'hidden')
    $('.FavoriteAuditList').removeAttr('hidden')
    $('.BtnFavoriteAuditList').removeAttr('hidden')
    var IsAdmin = $('#IsAdmin').html()
    console.log(IsAdmin)
    if (IsAdmin == 'True')
    {
        $('#BtnAddFavorite').removeAttr('hidden')
    }
    $('#DivFavorite').removeClass('row mt-2 Favorite').addClass('row mt-20 Favorite')
    FavoriteAuditList.GetDataOtherAuditList()
}

FavoriteAuditList.Back = function () {
    $('#BtnAddFavorite').attr('hidden', 'hidden')
    $('.BtnFavoriteAuditList').attr('hidden', 'hidden')
    $('.FavoriteAuditList').attr('hidden', 'hidden')
    $('.editFavoriteAuditeList').attr('hidden', 'hidden')
    $('.HomePage1').removeAttr('hidden')
    $('#DivFavorite').removeClass('row mt-20 Favorite').addClass('row mt-2 Favorite')
    FavoriteAuditList.GetDataFavoritMenu()

}

FavoriteAuditList.Edit = function () {
    $('.editFavoriteAuditeList').removeAttr('hidden')
    $('.BtnFavoriteAuditList').attr('hidden', 'hidden')
}

FavoriteAuditList.CancelEdit = function () {
    $('.editFavoriteAuditeList').attr('hidden', 'hidden')
    $('.BtnFavoriteAuditList').removeAttr('hidden')
}

FavoriteAuditList.GetDataOtherAuditList = function (IsEdit)
{
    var ListOtherAuditList = $('#ListOtherAuditList');
    ListOtherAuditList.empty();

    Loading.BlockPage()
    $.ajax({
        url: "../DashboardMobile/GetDataOtherAuditList",
        method: "POST",
        dataType: "JSON",

        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                var html= ''
                $.each(j.Data[0], function (i, st) {
                   html +='<div class="col-12" style="padding-right: 0px;padding-left: 0px;" id="DivOther'+i+'">'
	                    html +='<div class="d-flex align-items-center">'
		                    html +='<div class="symbol symbol-40 symbol-light-danger mr-5" style="width:90px;height:130px">'
			                    html +='<div class="card card-custom bgi-no-repeat card-stretch gutter-b" style="background-color:#fff;box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.25);">'
				                    html +='<div class="card-body text-center" style="padding: 0.5rem 0.6rem;">'
					                    html +='<i class="la '+st.Icon+' text-success icon-5x"></i>'
					                    html +='<span class="card-title font-weight-bolder text-dark-75 font-size-h3-md mb-0 d-block">'+st.AuditType+'</span>'
				                    html +='</div>'
			                    html +='</div>'
		                    html +='</div>'
		                    html +='<div class="d-flex flex-column font-weight-bold p-5">'
			                    html +='<a href="#" class="text-dark text-hover-primary mb-1 font-size-lg" style="font-size:20px; font-weight:bold">'+st.Plant+'-'+st.AuditType+'</a>'
			                    html +='<span class="text-dark mt-1" style="font-size:15px">'+st.Title+' : '+st.Description+'</span>'
			                    html +='<span class="text-dark mt-2" >&nbsp;</span>'
			                    html +='<div class="separator separator-dashed my-2" style="border-bottom: 1px solid #777676"></div>'
			                    html += '</div>'
			                    if (IsEdit == true)
			                    {
			                        html += '<div class="dropdown dropdown-inline ml-2 editFavoriteAuditeList" >'
			                    }
			                    else
			                    {
			                        html += '<div class="dropdown dropdown-inline ml-2 editFavoriteAuditeList" hidden="hidden">'
			                    }
		                    
			                    html +='<button class="btn btn-success btn-sm btn-icon" style="border-radius:50%" onclick="FavoriteAuditList.AddOtherFavorit(\''+i+'\',\''+st.Plant+'\',\''+st.AuditType+'\')">'
				                    html +='<i class="ki ki-plus"></i>'
			                    html +='</button>'
		                    html +='</div>'
	                    html +='</div>'
                    html +='</div>'
                })
                ListOtherAuditList.append(html)
                Loading.UnblockPage_()
            }
            else {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



FavoriteAuditList.AddOtherFavorit= function (Id,Plant, AuditType) {
    console.log(Plant + '-' + AuditType)
    Loading.BlockPage()
    $.ajax({
        url: "../DashboardMobile/SubmitNewFavorite_ByUser",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: Plant,
            AuditType: AuditType,
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                FavoriteAuditList.GetDataFavoritMenu(true)
                var DivOther = $('#DivOther' + Id + '');
                DivOther.empty();
                Loading.UnblockPage_()

            }
            else {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

FavoriteAuditList.addNewFavorit = function()
{
    $('.FavoriteAuditList').attr('hidden', 'hidden')
    $('.Favorite').attr('hidden', 'hidden')
    $('.BtnFavoriteAuditList').attr('hidden', 'hidden')
    $('.AddNewFavoriteAuditList').removeAttr('hidden')
    FavoriteAuditList.DropdownIconGetData()
    
}

FavoriteAuditList.BackFromAddFavorit = function()
{
    $('#cbbPlantFavorite').val('');
    $('#cbbAuditTypeFavorite').val('');
    document.getElementById("txtTitle").value = ''
    document.getElementById("txtDescription").value = ''
    $('#cbbIconFavorite').val('');


    $('.Favorite').removeAttr('hidden')
    $('.FavoriteAuditList').removeAttr('hidden')
    $('.BtnFavoriteAuditList').removeAttr('hidden')
    $('.AddNewFavoriteAuditList').attr('hidden', 'hidden')
    FavoriteAuditList.GetDataFavoritMenu()
}



FavoriteAuditList.DropdownIconGetData = function () {
    var cbbIconFavorite = $('#cbbIconFavorite');
    cbbIconFavorite.empty();

    var Icon = $('#Icon');
    Icon.empty();

    Loading.BlockPage()
    $.ajax({
        url: "../DashboardMobile/GetDropdownIcon",
        method: "POST",
        dataType: "JSON",

        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                $.each(j.Data[0], function (i, st) {
                    cbbIconFavorite.append("<option value=\"" + st.Icon + "\">" + st.IconName + "</option>")
                    if(i==0)
                    {
                        Icon.append('<i class="la ' + st.Icon + ' text-primary mr-5 icon-xl"></i>')
                    }
                })
                Loading.UnblockPage_()
                FavoriteAuditList.DropdownGetData('')
            }
            else {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

FavoriteAuditList.OnchangecbbIcon = function()
{
    var IconList = $('#cbbIconFavorite').val()
    console.log(IconList)
    var Icon = $('#Icon');
    Icon.empty();
    Icon.append('<i class="la ' + IconList + ' text-primary mr-5 icon-xl"></i>')
}

FavoriteAuditList.DropdownGetData = function (onChange) {
    var Plant = $('#cbbPlantFavorite').val();
    var AuditType = $('#cbbAuditTypeFavorite').val();



    var cbbPlant = $('#cbbPlantFavorite');
    if (Plant == "%" || Plant == null) {
        cbbPlant.empty();
        cbbPlant.append("<option value=''></option>");
    }

    var cbbAuditType = $('#cbbAuditTypeFavorite');
    if (AuditType == "%" || AuditType == null || onChange == 'Plant') {
        cbbAuditType.empty();
        cbbAuditType.append("<option value=''></option>");
        AuditType = '%'
    }

    Loading.BlockPage()
    $.ajax({
        url: "../DashboardMobile/GetDropdown",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: Plant,
            AuditType: AuditType,
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (Plant == '%' || Plant == null) {
                    const key = 'Plant';
                    const arrayUniqueByKey = [...new Map(j.Data[0].map(item =>[item[key], item])).values()];
                    $.each(arrayUniqueByKey, function (i, st) {
                        cbbPlant.append("<option value=\"" + st.Plant + "\">" + st.Plant + "</option>")
                    })
                }

                if (AuditType == '%' || AuditType == null || onChange == 'Plant') {
                    const key = 'AuditType';
                    const arrayUniqueByKey = [...new Map(j.Data[0].map(item =>[item[key], item])).values()];
                    $.each(arrayUniqueByKey, function (i, st) {
                        cbbAuditType.append("<option value=\"" + st.AuditType + "\">" + st.AuditType + "</option>")
                    })
                }
                Loading.UnblockPage_()

            }
            else {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



FavoriteAuditList.SubmitNewFavorite = function () {
    var Plant = $('#cbbPlantFavorite').val();
    var AuditType = $('#cbbAuditTypeFavorite').val();
    var title = document.getElementById("txtTitle").value
    var Description = document.getElementById("txtDescription").value
    var Icon = $('#cbbIconFavorite').val();

    Loading.BlockPage()
    $.ajax({
        url: "../DashboardMobile/SubmitNewFavorite",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: Plant,
            AuditType: AuditType,
            title: title,
            Description: Description,
            Icon: Icon,
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                console.log('1')
                swal.fire({
                    title: 'Success',
                    html: 'Successfully add new favorite',
                    icon: 'success',
                    allowOutsideClick: false,
                    button: "ok",
                });

                $('.swal2-confirm').click(function () {
                    FavoriteAuditList.BackFromAddFavorit()
                });
                Loading.UnblockPage_()

            }
            else {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


FavoriteAuditList.GetDataFavoritMenu = function (IsEdit) {


    var DivFavoriteMenu = $('#DivFavoriteMenu');
    DivFavoriteMenu.empty();

    Loading.BlockPage()
    $.ajax({
        url: "../DashboardMobile/GetDataFavoritMenu",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                var html = ''
                $.each(j.Data[0], function (i, st) {
                    html += '<div class="col-3 swiper-slide" style="padding-right: 5px;padding-left: 5px;" id=DivFavoriteUser'+i+' >'
                    html += '<div class="card card-custom bgi-no-repeat card-stretch gutter-b" style="background-color:#fff;box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.25);" onclick="FavoriteAuditList.OpenNewCase(\'' + st.Plant + '\',\'' + st.AuditType + '\')">'
		                    html +='<div class="card-body text-center" style="padding: 0.5rem 0.6rem;">'
			                    html +='<i class="la '+st.Icon+' text-success icon-5x"></i>'
			                    html +='<span class="card-title font-weight-bolder text-dark-75 font-size-h5-md mb-0 d-block">'+st.Title+'</span>'
		                    html +='</div>'
		                    html += '</div>'
		                    if (IsEdit == true)
		                    {
		                        html += '<span class="badge editFavoriteAuditeList" onclick="FavoriteAuditList.RemoveFavorite(\'' + i+ '\',\'' + st.Plant + '\',\'' + st.AuditType + '\')"><i class="fa fa-minus icon-xs text-white"></i></span>'
		                    }
		                    else
		                    {
		                        html += '<span class="badge editFavoriteAuditeList" hidden="hidden" onclick="FavoriteAuditList.RemoveFavorite(\'' + i + '\',\'' + st.Plant + '\',\'' + st.AuditType + '\')"><i class="fa fa-minus icon-xs text-white"></i></span>'
		                    }
	                    
                    html +='</div>'
                })
                DivFavoriteMenu.append(html)
                Loading.UnblockPage_()
            }
            else {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

FavoriteAuditList.RemoveFavorite = function (Id,Plant, AuditType) {
    Loading.BlockPage()
    $.ajax({
        url: "../DashboardMobile/RemoveFavorite",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: Plant,
            AuditType: AuditType,
        },
        success: function (j) {
            if (j.Result == true) {
                Loading.UnblockPage_()
                FavoriteAuditList.GetDataOtherAuditList(true)
                var DivFavoriteUser = $('#DivFavoriteUser' + Id + '');
                DivFavoriteUser.empty();
            }
            else {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

FavoriteAuditList.OpenNewCase = function(Plant, AuditType)
{
    window.location.href = '../SubmitNewCase/SubmitNewCaseMobile?FormName=SubmitNewCase&Plant=' + Plant + '&ProcessOwner=' + AuditType + '';
}

function OutStandingAuditList() { }

OutStandingAuditList.Show = function () {
    $('.HomePage1').attr('hidden', 'hidden')
    $('.Favorite').attr('hidden', 'hidden')
    $('.OutStandingList').removeAttr('hidden')
    OutStandingAuditList.GetData('OutstandingDiv', '')
}


OutStandingAuditList.Back = function () {
    $('.OutStandingList').attr('hidden', 'hidden')
    $('.HomePage1').removeAttr('hidden')
    $('.Favorite').removeAttr('hidden')
}



OutStandingAuditList.GetData = function (Id,TOP) {
    var Search = document.getElementById("txtSearch").value
    var div_Slider = $('#' + Id + '')
    div_Slider.empty()
    Loading.BlockPage()
    $.ajax({
        url: "../DashboardMobile/GetDataOutstandingList",
        method: "POST",
        dataType: "JSON",
        data: {
            Search: Search,
            TOP: TOP
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                var html = '';
                if (TOP != '')
                {
                    $.each(j.Data[0], function (i, st) {
                        //ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff"  onclick="SubmitAction.ImageClick(\'' + AuditNumber + '\',\'' + i + '\')"/>')

                        html += '<div class="col-6 swiper-slide" style="padding-right: 5px;padding-left: 5px;" onclick="OutStandingAuditList.ViewDetail(\'' + st.AuditNumber + '\',\'' + st.Type + '\')">'
                           html +='<div class="card card-custom" style="-webkit-box-shadow: 5px 4px 2px -1px #808080;box-shadow: 5px 4px 2px -1px #808080;border-radius: 12px;border: 1px solid #808080;">'
	                           html +='<div class="card-body ribbon ribbon-clip ribbon-left" style="height:260px;padding: 0rem 0rem;">'
		                           html +='<div class="ribbon-target" style="top: 12px;">'
			                           html +='<span class="ribbon-inner bg-warning"></span>'+st.Type+''
		                           html +='</div>'
		                           html += '<div class="form-control" style="height:65%;border-radius: 12px;">'
				                        html += '<img src="../FileHandler.ashx?imagePath=' + st.ImageLoc + '" style="background-color:#fff;height:150px;width:100%;" />'
		                           html += '</div>'
		                           html += '<div class="col-12">'
		                           var leng = st.IssueTitle.length;
		                           if (leng > 25)
		                           {
                                       html += '<label class="text-dark font-weight-bolder" style="margin-bottom: 0.1rem;">' + st.IssueTitle.substring(0, 25) + '...</label>'
		                           }
		                           else
		                           {
                                       html += '<label class="text-dark font-weight-bolder" style="margin-bottom: 0.1rem;">' + st.IssueTitle + '</label>'
		                           }
		                       
			                           html += '<br />'
			                           html += '<label class="text-primary font-size-h5-sm font-weight-bolder" style="margin-bottom: 0rem;">' + st.AuditNumber + '</label>'
			                           html +='<div class="row">'
				                           html +='<div class="col-2 mt-3">'
					                           html += '<i class="fa fa-map-marker-alt icon-xl"></i>'
				                           html += '</div>'
				                           html +='<div class="col-10">'
					                           html += '<label class="font-weight-bolder" style="margin-bottom: 0rem;">' + st.Department + '</label>'
					                           html += '<br />'
					                           var lengArea = st.Area.length;
					                           if (lengArea > 20)
					                           {
					                               html += '<label class="font-weight-bolder" style="margin-bottom: 0rem;">' + st.Area.substring(0, 20) + '...</label>'
					                           }
					                           else
					                           {
					                               html += '<label class="font-weight-bolder" style="margin-bottom: 0rem;">' + st.Area + '</label>'
					                           }
					                       
				                           html += '</div>'
			                           html += '</div>'
			                           html += '<span class="form-text text-muted" style="margin-top: 0rem;">' + st.CreatedBy + ' | ' + st.CreatedDate + '</span>'
		                           html += '</div>'
	                           html += '</div>'
                           html += '</div>'
                        html += '</div>'
                    });
                }
                else
                {
                    $.each(j.Data[0], function (i, st) {
                        //ImageSlider.append('<img src="../FileHandler.ashx?imagePath=' + st + '" class="swiper-slide form-control" style="background-color:#fff"  onclick="SubmitAction.ImageClick(\'' + AuditNumber + '\',\'' + i + '\')"/>')


                        html += '<div  class="col-6 mb-5" style="padding-right: 5px;padding-left: 5px;" onclick="OutStandingAuditList.ViewDetail(\'' + st.AuditNumber + '\',\'' + st.Type + '\')">'
                            html += '<div  class="card card-custom" style="-webkit-box-shadow: 5px 4px 2px -1px #808080;box-shadow: 5px 4px 2px -1px #808080;border-radius: 12px;border: 1px solid #808080;">'
                            html += '<div  class="card-body ribbon ribbon-clip ribbon-left" style="height:260px;padding: 0rem 0rem;">'
                            html += '<div  class="ribbon-target" style="top: 12px;">'
				                        html +='<span class="ribbon-inner bg-warning"></span>'+st.Type+''
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
                }
                
                div_Slider.append(html)
                Loading.UnblockPage_()
                SlickSlider.initSlickOutStanding()
            }
            else {
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


OutStandingAuditList.ViewDetail = function (AuditNumber,Type) {
    ButtonMenu.Click(Type)
    if (Type == 'Action')
    {
        window.location.href = '../Action/ActionPlanListMobile?Page=Action&FormName=ListCaseAction&AuditNumber=' + AuditNumber + '';
    }
    else if (Type == 'Resolution') {
        window.location.href = '../Resolution/ResolutionListMobile?Page=Resolution&FormName=ListCaseResolution&AuditNumber=' + AuditNumber + '';
    }
    else {
        window.location.href = '../Approval/ApprovalListMobile?Page=Approval&FormName=ListCaseApproval&AuditNumber=' + AuditNumber + '';
    }
    
}