$(document).ready(function () {
    About.GetData()
})

function About() { }

About.GetData = function () {
    Loading.BlockPage();
    var Position = $('#VersionLog')
    Position.empty()
    $.ajax({
        url: "../Home/GetDateVersion",
        method: "POST",
        dataType: "JSON",
        //data: {
        //    MainSection: MainSection
        //},
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                var item = "";
                $.each(j.Data[0], function (i, st) {
                    item += '<div class="col-xl-4">'
                    item += '<div class="card card-custom gutter-b card-stretch">'
                    item += '<div class="card-body">'
                    item += '<div class="d-flex align-items-center">'
                    item += '<div class="flex-shrink-0 mr-4 symbol symbol-60 symbol-circle">'
                    item += '<div class="symbol symbol-light-dark mr-3">'
                    item += '<span class="symbol-label font-size-h5">' + st.InitialName + '</span>'
                    item += '</div>'
                    item += '</div>'
                    item += '<div class="d-flex flex-column mr-auto">'
                    item += '<div class="d-flex flex-column mr-auto">'
                    item += '<a href="#" class="text-dark text-hover-primary font-size-h4 font-weight-bolder mb-1">' + st.SystemName + '</a>'
                    item += '<span class="text-muted font-weight-bold">Version ' + st.Version + '</span>'
                    item += '</div>'
                    item += '</div>'
                    item += '<div class="card-toolbar mb-7">'
                    item += '</div>'
                    item += '</div>'
                    item += '<div class="mb-10 mt-5 font-weight-bold">'
                    item += '' + st.Description + ''
                    item += '</div>'
                    item += '<div class="d-flex mb-5">'
                    item += '<div class="d-flex align-items-center mr-7">'
                    item += '<span class="font-weight-bold mr-4">Post By</span>'
                    item += '<span class="btn btn-light-primary btn-sm font-weight-bold btn-upper btn-text">' + st.PostBy + '</span>'
                    item += '</div>'
                    item += '<div class="d-flex align-items-center">'
                    item += '<span class="font-weight-bold mr-4">Post Date</span>'
                    item += '<span class="btn btn-light-danger btn-sm font-weight-bold btn-upper btn-text">' + st.PostDate + '</span>'
                    item += '</div>'
                    item += '</div>'
                    item += '</div>'
                    item += '</div>'
                    item += '</div>'
                })

                Position.append(item)
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

About.AddAbout =  function()
{
    $.ajax({
        url: "../Home/GetAccessProgramer",
        method: "POST",
        dataType: "JSON",
        //data: {
        //    MainSection: MainSection
        //},
        success: function (j) {
            if (j.Result == true) {
                $('#ModalAddNewVersion').modal({
                    backdrop: true
                });
            }
            else
            {
                Notification.ShowToast('error', 'Only programmer')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


About.SubmitAbout = function()
{
    var ValVersion = document.getElementById("txtVersionAbout").value
    var ValDescription = document.getElementById("txtDescriptionAbout").value

    if (ValVersion == '' || ValVersion == null) {
        $("#errtxtVersionAbout").removeAttr("hidden");
    }
    else {
        $("#errtxtVersionAbout").attr("hidden", "hidden");
    }

    if (ValDescription == '' || ValDescription == null) {
        $("#errtxtDescriptionAbout").removeAttr("hidden");
    }
    else {
        $("#errtxtDescriptionAbout").attr("hidden", "hidden");
    }

    if(ValVersion != '' && ValDescription != '')
    {
        var datas = ValVersion + '/' + ValDescription
        console.log(datas)


        $.ajax({
            url: "../Home/SubmitAbout",
            method: "POST",
            dataType: "JSON",
            data: {
                datas: datas
            },
            success: function (j) {
                if (j.Result == true) {
                    Notification.ShowToast('success', 'submit successfully')
                    About.GetData()
                    $('#ModalAddNewVersion').modal('hide');
                }
            },
            error: function (xhr, error, text) {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + error + '')
            }
        });
    }


}

