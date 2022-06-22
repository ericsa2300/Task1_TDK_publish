$(document).ready(function () {
    //$('#MasterNewScore').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')

    //$('#BtnCancel').attr('disabled', 'disabled')
    //$('#BtnSubmit').attr('disabled', 'disabled')
    //SubmitNewScore.GetPlant()

    //SubmitNewScore.initialTable()
    //DetailScore.initialTable()
    var Id = GetParam.ParameterFromURL('Id')
    SubmitNewScore.GetDataAreaFocus(Id)
    
    $('#Score').ionRangeSlider({
        min: 0,
        max: 0,
        from: 0,
        to_fixed: false,//block the top
        from_fixed: false//block the from
    });
});


function SubmitNewScore() { }


SubmitNewScore.OnclickArea = function (Id, AreaFocus)
{
    $('.DivArea').css('background', '#fff');
    $('.SpanArea').css('color', '#000000');
    
    $('#Area' + Id + '').css('background', '#1CA7EC');
    $('#Span' + Id + '').css('color', '#fff');
    SubmitNewScore.GetDataDetail(AreaFocus)
}



SubmitNewScore.GetDataAreaFocus = function (Id) {
    $('#txtId').html(Id)
    var DivAreaFocus = $('#DivAreaFocus')
    DivAreaFocus.empty()
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/GetDataeScoreMobile",
        method: "POST",
        dataType: "JSON",
        data: {
            Id: Id,
            AreaFocus: ''
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                var html = '';
                const key = 'AreaFocus';
                const arrayUniqueByKey = [...new Map(j.Data[0].map(item =>[item[key], item])).values()];
                var backgroundColor = ''
                var color = ''
                console.log(arrayUniqueByKey)
                var AreaFocus
                $.each(arrayUniqueByKey, function (i, st) {
                    if (i == 0)
                    {
                        backgroundColor = '#1CA7EC'
                        color = '#fff'
                        AreaFocus = st.AreaFocus
                    }
                    else
                    {
                        backgroundColor = '#fff'
                        color = '#00000'
                    }
                    html += '<div class="col-3 swiper-slide" style="padding-right: 5px;padding-left: 5px;" onclick="SubmitNewScore.OnclickArea(\'' + i + '\',\'' + st.AreaFocus + '\')">'
                    html += '<div class="card card-custom bgi-no-repeat card-stretch gutter-b DivArea" id="Area' + i + '" style="background-color:' + backgroundColor + ';box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.25);">'
		                    html +='<div class="card-body text-center" style="padding: 0.5rem 0.6rem;">'
		                    html += '<span id="span' + i + '" class="card-title font-weight-bolder font-size-h5-md mb-0 d-block SpanArea" style="color:' + color + '">' + st.AreaFocus + '</span>'
		                    html +='</div>'
	                    html +='</div>'
	                    html += '<span id="badge' + i + '" class="badge editFavoriteAuditeList" hidden="hidden"><i class="fa fa-check icon-xs text-white"></i></span>'
                    html +='</div>'
                })
                DivAreaFocus.append(html)
                SlickSlider.initSlick()
                Loading.UnblockPage_()
                SubmitNewScore.GetDataDetail(AreaFocus)
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



SubmitNewScore.GetDataDetail = function (AreaFocus) {
    var Id = $('#txtId').html()
    var DetaileScore = $('#DetaileScore')
    DetaileScore.empty()
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/GetDataeScoreMobile",
        method: "POST",
        dataType: "JSON",
        data: {
            Id: Id,
            AreaFocus: AreaFocus
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                var html = '';
                $.each(j.Data[0], function (i, st) {
                    html += '<div id="' + st.DetailId + '" class="col bg-light-white px-6 py-2 rounded-xl mr-7 mb-7" style="border: 1px solid #DBDBDB;box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.25)">'
                    html += '<div onclick="SubmitNewScore.UpdateScore(\'' + st.DetailId + '\',\'' + st.MainScope + '\',\'' + st.SubScope + '\',\'' + st.Score + '\',\'' + st.MinScore + '\',\'' + st.MaxScore + '\',\'' + st.Remark + '\',\'' + st.Target + '\')">'
                    html += '<div class="d-flex align-items-center">'
                            if (st.Score > 0)
                            {
                                html += '<span class="bullet bullet-bar bg-success align-self-stretch"></span>'
                            }
                            else
                            {
                                html += '<span class="bullet bullet-bar bg-secondary align-self-stretch"></span>'
                            }
		                    

                            html += '<div class="d-flex flex-column flex-grow-1 ml-5">'
                            var lengMainScope = st.MainScope.length
                            if (lengMainScope > 20) {
                                html += '<span class="text-dark font-weight-bold mb-1"  style="font-size:20px;font-weight:bold">' + st.MainScope.substring(0, 20) + '...<span class="text-muted">more</span></span>'
                            }
                            else {
                                
                                html += '<span class="text-dark font-weight-bold mb-1"  style="font-size:20px;font-weight:bold">' + st.MainScope + '</span>'
                            }
		                    
		                        var lengSubScope = st.SubScope.length
		                        if (lengSubScope > 30)
		                        {
		                            html += '<span class="text-dark" style="font-size:15px">' + st.SubScope.substring(0, 30) + ' ... <span class="text-muted">more</span></span>'
		                        }
		                        else
		                        {
		                            html += '<span class="text-dark" style="font-size:15px">' + st.SubScope + '</span>'
		                        }
			                    
		                    html +='</div>'
		                    html += '<div class="d-flex flex-column font-weight-bold">'
		                        if (st.Score > 0) {
		                            html += '<a href="#" class="text-dark text-hover-primary mb-1 text-center" style="font-size:20px;font-weight:bold">'+st.Score+'</a>'
		                            html += '<span class="text-dark" style="font-size:15px">Point</span>'
		                        }
		                    html +='</div>'
		                html += '</div>'
		                html += '</div>'
                    html +='</div>'
                })
                DetaileScore.append(html)
                Loading.UnblockPage_()
                SubmitNewScore.CheckAreaFoCusCompleted()
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


SubmitNewScore.UpdateScore = function (DetailId, MainScope, SubScope, Score, MinScore, MaxScore, Remark, Target)
{
    $('#txtDetailId').html(DetailId)
    $('#SpanMainScope').html(MainScope)
    $('#SpanSubScope').html(SubScope)
    $('#txtTarget').html(Target)
    $('#Score').data("ionRangeSlider").update({
        max: MaxScore,
        from: Score,
    });

    if (parseInt(Score) <= Target)
    {
        $('#BtnFinding').removeAttr('hidden')
    }
    else
    {
        $('#BtnFinding').attr('hidden', 'hidden')
    }

    document.getElementById("txtIssueDescription").value = Remark
    $('#UpdateeScoreModal').modal('show')
}

SubmitNewScore.ShowBtnFinding =  function()
{
    var Target = $('#txtTarget').html()
    var Score = $('#Score').data().from;
    if (parseInt(Score) <= Target) {
        $('#BtnFinding').removeAttr('hidden')
    }
    else {
        $('#BtnFinding').attr('hidden', 'hidden')
    }
    console.log(Score)
}

SubmitNewScore.SubmitFinding = function () {
    var Plant = GetParam.ParameterFromURL('Plant')
    var AuditType = GetParam.ParameterFromURL('AuditType')
    var Department = GetParam.ParameterFromURL('Department')
    var DetailId = $('#txtDetailId').html()
    $.ajax({
        url: "../SubmitNewScore/SubmitFinding",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: Plant,
            ProcessOwner: AuditType,
            Department: Department,
            DetailId: DetailId
        },
        success: function (j) {
            Loading.UnblockPage_()
            if (j.Result == true) {
                window.open('../SubmitNewCase/SubmitNewCaseMobile?FormName=SubmitNewCase&Plant=' + Plant + '&ProcessOwner=' + AuditType + '&Department=' + Department + '&DetailId=' + j.Data[0] + '', '_blank')
            }
            else {
                Notification.ShowToast('info', 'Not available multiple finding')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
    console.log(Score)
}

SubmitNewScore.SubmitUpdateScore = function () {
    var DetailId = $('#txtDetailId').html()
    var MainScope = $('#SpanMainScope').html()
    var SubScope = $('#SpanSubScope').html()

    var Score = $('#Score').data().from;
    var Remark = document.getElementById("txtIssueDescription").value
    

    console.log(DetailId + '-' + Score + '-' + Remark)

    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/UpdateScoreMobile",
        method: "POST",
        dataType: "JSON",
        data: {
            DetailId: DetailId,
            Score: Score,
            Remark: Remark
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Successfully Update Score')
                Loading.UnblockPage_()
                SubmitNewScore.GetDataDetailAfterUpdate(DetailId)
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




SubmitNewScore.GetDataDetailAfterUpdate = function (IdDiv_DetailId) {
    var DetaileScore = $('#' + IdDiv_DetailId + '')
    DetaileScore.empty()
    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/GetDataDetailAfterUpdate",
        method: "POST",
        dataType: "JSON",
        data: {
            DetailId: IdDiv_DetailId,
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                var html = '';
                $.each(j.Data[0], function (i, st) {
                    html += '<div onclick="SubmitNewScore.UpdateScore(\'' + st.DetailId + '\',\'' + st.MainScope + '\',\'' + st.SubScope + '\',\'' + st.Score + '\',\'' + st.MinScore + '\',\'' + st.MaxScore + '\',\'' + st.Remark + '\',\'' + st.Target + '\')">'
                    html += '<div class="d-flex align-items-center">'
                    if (st.Score > 0) {
                        html += '<span class="bullet bullet-bar bg-success align-self-stretch"></span>'
                    }
                    else {
                        html += '<span class="bullet bullet-bar bg-secondary align-self-stretch"></span>'
                    }


                    html += '<div class="d-flex flex-column flex-grow-1 ml-5">'
                    var lengMainScope = st.MainScope.length
                    if (lengMainScope > 20) {
                        html += '<span class="text-dark font-weight-bold mb-1"  style="font-size:20px;font-weight:bold">' + st.MainScope.substring(0, 20) + '...<span class="text-muted">more</span></span>'
                    }
                    else {

                        html += '<span class="text-dark font-weight-bold mb-1"  style="font-size:20px;font-weight:bold">' + st.MainScope + '</span>'
                    }

                    var lengSubScope = st.SubScope.length
                    if (lengSubScope > 30) {
                        html += '<span class="text-dark" style="font-size:15px">' + st.SubScope.substring(0, 30) + ' ... <span class="text-muted">more</span></span>'
                    }
                    else {
                        html += '<span class="text-dark" style="font-size:15px">' + st.SubScope + '</span>'
                    }

                    html += '</div>'
                    html += '<div class="d-flex flex-column font-weight-bold">'
                    if (st.Score > 0) {
                        html += '<a href="#" class="text-dark text-hover-primary mb-1 text-center" style="font-size:20px;font-weight:bold">' + st.Score + '</a>'
                        html += '<span class="text-dark" style="font-size:15px">Point</span>'
                    }
                    html += '</div>'
                    html += '</div>'
                    html += '</div>'
                })
                DetaileScore.append(html)
                $('#UpdateeScoreModal').modal('hide')
                Loading.UnblockPage_()
                SubmitNewScore.CheckAreaFoCusCompleted()
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



SubmitNewScore.CheckAreaFoCusCompleted = function () {
    var Id = $('#txtId').html()

    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/CheckAreaFoCusCompleted",
        method: "POST",
        dataType: "JSON",
        data: {
            Id: Id,
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    if(st.Status=='1')
                    {
                        $('#badge' + i + '').removeAttr('hidden')
                    }
                })
                Loading.UnblockPage_()
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



SubmitNewScore.SubmitScore = function () {
    var Id = $('#txtId').html()

    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/CheckAreaFoCusCompleted",
        method: "POST",
        dataType: "JSON",
        data: {
            Id: Id,
        },
        success: function (j) {
            if (j.Result == true) {
                var IsCompleted = true
                var html = ''
                $.each(j.Data[0], function (i, st) {
                    if (st.Status == '0') {
                        IsCompleted = false
                        html += '' + st.Area + ' <span class="label label-lg font-weight-bold label-light-danger label-inline">Incompleted</span>'
                    }
                    else
                    {
                        html += '' + st.Area + ' <span class="label label-lg font-weight-bold label-light-success label-inline">completed</span>'
                    }
                    html +='</br>'
                })
                Loading.UnblockPage_()
                if (IsCompleted == false)
                {
                    swal.fire({
                        title: 'Please complete all area',
                        html: html,
                        icon: 'info',
                        allowOutsideClick: false,
                        button: "ok",
                    });
                }
                else
                {
                    SubmitNewScore.ExecuteSubmitScore()
                }
                
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


SubmitNewScore.ExecuteSubmitScore = function () {
    var Id = $('#txtId').html()

    Loading.BlockPage()
    $.ajax({
        url: "../SubmitNewScore/SubmitScore",
        method: "POST",
        dataType: "JSON",
        data: {
            Id: Id,
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'successfully submit e-Score')
                Loading.UnblockPage_()
                window.location.href = '../DashboardMobile/DashboardMobile?Page=Home';
            }
            else {
                Loading.UnblockPage_()
                swal.fire({
                    title: 'Error !!!',
                    html: j.Msg,
                    icon: 'error',
                    allowOutsideClick: true,
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


SubmitNewScore.CancelSubmitScore = function () {
    var Id = $('#txtId').html()
    swal.fire({
        title: 'Warning !',
        html: 'this e-Score data will be lost. Cancel e-Score?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function (e) {
        Loading.BlockPage()
        $.ajax({
            url: "../SubmitNewScore/CancelSubmitScore",
            method: "POST",
            dataType: "JSON",
            data: {
                Id: Id,
            },
            success: function (j) {
                if (j.Result == true) {
                    Notification.ShowToast('success', 'successfully Cancel e-Score')
                    Loading.UnblockPage_()
                    window.location.href = '../DashboardMobile/DashboardMobile?Page=Home';
                }
                else {
                    Loading.UnblockPage_()
                    swal.fire({
                        title: 'Error !!!',
                        html: j.Msg,
                        icon: 'error',
                        allowOutsideClick: true,
                        button: "ok",
                    });
                }
            },
            error: function (xhr, error, text) {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + error + '')
            }
        });
    });
    
    
}