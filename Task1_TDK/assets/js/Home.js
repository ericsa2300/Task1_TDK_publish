$(document).ready(function () {
    $('#MasterDashboard').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')
});



function Catalog(){}

Catalog.ShowDetail = function()
{
    $('.CatalogHeader').attr('hidden', 'hidden')
    $('.CatalogDetail').removeAttr('hidden')
    CatalogDetail.GetDataCatalogue()
}


function CatalogDetail() { }


CatalogDetail.Back = function () {
    $('.CatalogDetail').attr('hidden', 'hidden')
    $('.CatalogHeader').removeAttr('hidden')
}


CatalogDetail.Add = function (Title,RefId, Name, Description) {
    $('#titleModal').html(Title)
    $('#RefId').html(RefId)
    document.getElementById("txtCookieName").value = Name
    document.getElementById("txtCookieDescription").value = Description
    $('#CatalogModal').modal('show')
}

CatalogDetail.Edit = function()
{
    $('.deleteIcon').removeAttr('hidden')
}

CatalogDetail.Delete = function(id, RefId)
{
    swal.fire({
        title: 'Warning!',
        html: 'Are you want to delete this ref ' + RefId + '?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });

    $('.swal2-confirm').click(function () {
        var DetailCatalog = $('#' + id + '')
        DetailCatalog.remove()
        CatalogDetail.Delete_Cookie(RefId)
    });
    
}

CatalogDetail.DoneDelete = function()
{
    $('.deleteIcon').attr('hidden', 'hidden')
}

CatalogDetail.GetDataCatalogue = function () {
    var Search = document.getElementById("txtSearch").value
    var DivCatalogDetail = $('#DivCatalogDetail')
    DivCatalogDetail.empty()
    Loading.BlockPage()
    $.ajax({
        url: "../Home/GetDataCatalogue",
        method: "POST",
        dataType: "JSON",
        data: {
            Search: Search,
        },
        success: function (j) {
            Loading.UnblockPage_()
            if (j.Result == true) {
                var html =''
                $.each(j.Data[0], function (i, st) {
                    html +='<div class="col-xl-4" id="Div'+st.Ref_ID+'">'
	                    html +='<div class="card card-custom gutter-b card-stretch" style="background-color:#fff">'
		                    html +='<div class="card-body d-flex flex-column px-0" style="position: relative;">'
			                    html +='<a href="#" onclick="CatalogDetail.Add(\'Update\', \''+st.Ref_ID+'\', \''+st.Name+'\', \''+st.Description+'\')">'
				                    html +='<div class="flex-grow-1 card-spacer-x">'
					                    html +='<div class="d-flex align-items-center justify-content-between mb-2">'
						                    html +='<div class="d-flex align-items-center mr-2">'
							                    html +='<div>'
								                    html +='<span class="font-size-h6 text-muted text-hover-primary ">Ref.</span>'
								                    html +='<div class="font-size-sm text-dark font-weight-bold mt-1 font-weight-bolder" style="font-size:20px">'+st.Ref_ID+'</div>'
							                    html +='</div>'
						                    html +='</div>'
					                    html +='</div>'
				                    html +='</div>'
				                    html +='<div class="flex-grow-1 card-spacer-x">'
					                    html +='<div class="d-flex align-items-center justify-content-between mb-2">'
						                    html +='<div class="d-flex align-items-center mr-2">'
							                    html +='<div>'
								                    html +='<span class="font-size-h6 text-muted text-hover-primary ">Name</span>'
								                    html +='<div class="font-size-sm text-dark font-weight-bold mt-1 font-weight-bolder" style="font-size:20px">'+st.Name+'</div>'
							                    html +='</div>'
						                    html +='</div>'
					                    html +='</div>'
				                    html +='</div>'
				                    html +='<div class="flex-grow-1 card-spacer-x">'
					                    html +='<div class="d-flex align-items-center justify-content-between mb-2">'
						                    html +='<div class="d-flex align-items-center mr-2">'
							                    html +='<div>'
								                    html +='<span class="font-size-h6 text-muted text-hover-primary ">Description</span>'
								                    html +='<div class="font-size-sm text-dark font-weight-bold mt-1 font-weight-bolder" style="font-size:20px">'+st.Description+'</div>'
							                    html +='</div>'
						                    html +='</div>'
					                    html +='</div>'
				                    html +='</div>'
			                    html +='</a>'
			
			                    html +='<span class="badge deleteIcon" hidden="hidden" onclick="CatalogDetail.Delete(\'Div'+st.Ref_ID+'\', \''+st.Ref_ID+'\')"><i class="fa fa-trash icon-xs text-white"></i></span>'
		                    html +='</div>'
	                    html +='</div>'
                    html +='</div>'
                })

                DivCatalogDetail.append(html)
            }
            else {
                Notification.ShowToast('warning', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

CatalogDetail.AddUpdate_Cookie = function ()
{
    var Ref_ID = $('#RefId').html()
    var Name = document.getElementById("txtCookieName").value
    var Description = document.getElementById("txtCookieDescription").value
    var Status = $('#titleModal').html()
    Loading.BlockPage()
    $.ajax({
        url: "../Home/AddUpdate_Cookie",
        method: "POST",
        dataType: "JSON",
        data: {
            Ref_ID: Ref_ID,
            Name: Name,
            Description: Description,
            Status: Status
        },
        success: function (j) {
            Loading.UnblockPage_()
            if (j.Result == true) {
                Notification.SweetAlert('success', 'Success!', 'Successfully ' + Status + ' ' + j.Data[0])
                if (Status == 'Update')
                {
                    $('#CatalogModal').modal('hide')
                }
                CatalogDetail.GetDataCatalogue()
                //$('#CatalogModal').modal('show')
            }
            else {
                Notification.ShowToast('warning', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}




CatalogDetail.Delete_Cookie = function (Ref_ID)
{
    Loading.BlockPage()
    $.ajax({
        url: "../Home/Delete_Cookie",
        method: "POST",
        dataType: "JSON",
        data: {
            Ref_ID: Ref_ID,
        },
        success: function (j) {
            Loading.UnblockPage_()
            if (j.Result == true) {
                Notification.SweetAlert('success', 'Deleted!', 'Successfully delete ' + Ref_ID)
            }
            else {
                Notification.ShowToast('warning', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}