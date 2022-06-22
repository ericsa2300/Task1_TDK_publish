function Notification() { }

Notification.ShowToast = function (Type, Message)
{
    toastr["" + Type + ""]("" + Message + "");
}


Notification.ShowPopUp = function (Type, tittle, NotifBody, href) {
    swal.fire({
        title: tittle,
        html: NotifBody,
        icon: Type,
        allowOutsideClick: false,
        button: "ok",
    });

    $('.swal2-confirm').click(function () {
        if (href != '' || href != null) {
            window.location.href = href;
        }
        else if(href == 'close')
        {
            window.close()
        }
    });
}

Notification.SweetAlert = function (Type, Header, Notification) {
    swal.fire({
        title: Header,
        html: Notification,
        icon: Type,
        allowOutsideClick: false,
        button: "ok",
    });
}

function GetParam(){}

GetParam.ParameterFromURL = function(name, url)
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}