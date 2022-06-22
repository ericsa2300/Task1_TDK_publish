
function MasterDataVendor() { }


MasterDataVendor.ShowVendor = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnVendor').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.Vendor').show()
    MasterDataVendor.GetPlant()
}



MasterDataVendor.mDataTable = null;

MasterDataVendor.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#VendorTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Vendor" },
           { "data": "VendorName" },
           { "data": "Email1" },
           { "data": "Email2" },
           { "data": "Active" },
           { "data": "PostBy" },
           { "data": "PostDate" },
           { "data": null },
        ],
        headerCallback: function (thead, data, start, end, display) {
            var item = '<label class="checkbox checkbox-single">'
            item += '<input type="checkbox" value="" class="group-checkable"/>'
            item += '<span></span>'
            item += '</label>'
            thead.getElementsByTagName('th')[0].innerHTML = item

        },
        columnDefs: [
        {
            targets: 0,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var checkbox = '<label class="checkbox checkbox-single">'
                checkbox += '<input type="checkbox" id=\'chkVendor' + data.Number + '\' value="" class="checkable" onclick="MasterDataVendor.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Vendor + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 10,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataVendor.EventEdit(\'' + data.Plant + '\',\'' + data.Vendor + '\',\'' + data.VendorName + '\',\'' + data.Email1 + '\',\'' + data.Email2 + '\',\'' + data.Active + '\')">'
                EditButton += '	<span class="svg-icon svg-icon-md">'
                EditButton += '<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'
                EditButton += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                EditButton += '<rect x="0" y="0" width="24" height="24"/>'
                EditButton += '<path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fill-rule="nonzero"\ transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>'
                EditButton += '<rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>'
                EditButton += '</g>'
                EditButton += '</svg>'
                EditButton += '</span>'
                EditButton += '</a>'
                return EditButton
            },
        }, {
            "targets": [7], // ispickable
            "searchable": false,
            'render': function (data, type, full, meta) {
                var item = "";
                item = "<div class='mr-4 flex-shrink-0 text-center' style='width: 20px;'>"
                if (full.Active == "True") {
                    item += "<i class='icon-sm text-dark-50 flaticon2-check-mark'></i>";
                }
                else {
                    item += "<i class='icon-sm text-dark-50 flaticon2-cancel-music'></i>";
                }
                item += "</div>";
                return item;
            }
        }],
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }
    var Table = $('#VendorTable').DataTable(options);
    MasterDataVendor.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#VendorTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#VendorTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataVendor.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserVendor").value
    var cbbPlant = $('#cbbPlantVendor');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantVendor",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantVendor option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataVendor.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataVendor.OnChangePlant = function () {
    MasterDataVendor.GetData()
}



MasterDataVendor.GetData = function () {
    var ValPlant = $('#cbbPlantVendor').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetVendorData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataVendor.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataVendor.mDataTable.row.add(st);
                })
                MasterDataVendor.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataVendor.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantVendorModal');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>Choose Plant ...</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlant",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (Plant != '')
                {
                    $('#cbbPlantVendorModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantVendorModal").attr('disabled', 'disabled')
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


MasterDataVendor.OnchangeVendor = function ()
{
    var ValPlant = $('#cbbPlantVendorModal').val()
    var ValVendor = document.getElementById("txtVendor").value;
    $.ajax({
        url: "../MasterData/CheckVendorExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Vendor: ValVendor
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errVendor").removeAttr("hidden");
                    var error = $('#errVendor')
                    error.empty();
                    error.append('Vendor already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errVendor").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataVendor.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Vendor').show()
    $("#txtHeaderGroupName").html('Add Vendor')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataVendor'
    MasterDataVendor.GetPlantModal('')
}


MasterDataVendor.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Vendor?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataVendor.Delete(MasterDataVendor.Arr)
    });
}

MasterDataVendor.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteVendor",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataVendor.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataVendor.CheckboxClick = function(Number,Plant,Vendor)
{
    var ckbox = $('#chkVendor' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataVendor.CollectData(Number, Plant, Vendor, Checked)
}

MasterDataVendor.ListVendor = []
MasterDataVendor.Arr = ""
MasterDataVendor.CollectData = function (Number, Plant, Vendor, Checked) {
    MasterDataVendor.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataVendor.ListVendor.length; i++) {
        if (parseInt(MasterDataVendor.ListVendor[i].Number) == parseInt(Number)) {
            MasterDataVendor.ListVendor.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Vendor\":\"' + Vendor + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataVendor.ListVendor.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataVendor.ListVendor.length; i++) {
        if (parseInt(MasterDataVendor.ListVendor[i].Checked) == parseInt(0)) {
            MasterDataVendor.ListVendor.splice(i, 1);
            break;
        }
    }
    var _ArrayVendor = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataVendor.ListVendor, function (i, st) {
        _ArrayVendor = []
        _JsonResult = []
        _ArrayVendor[_ArrayVendor.length] = st.Plant + '~' + st.Vendor;
        array_JsonResult[array_JsonResult.length] = _ArrayVendor;
        _JsonResult.push(array_JsonResult.join(','))

        if (st.Checked == '1') {
            $('.Notdelete').hide()
            $('.delete').show()
        }
    })

    if (parseInt(_JsonResult.length) == 0) {
        $('.Notdelete').show()
        $('.delete').hide()
    }
    MasterDataVendor.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataVendor.EventEdit =  function(Plant,Vendor,VendorName, Email1, Email2, Active)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Vendor').show()
    $("#txtHeaderGroupName").html('Update Vendor')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataVendor'
    MasterDataVendor.GetPlantModal(Plant)
    document.getElementById("txtVendor").value = Vendor
    document.getElementById("OldVendor").value = Vendor
    document.getElementById("txtVendorName").value = VendorName
    document.getElementById("txtVendorMail1").value = Email1
    document.getElementById("txtVendorMail2").value = Email2
    if(Active =='True')
    {
        $('#ChkActiveVendor').prop("checked", true);
    }

    else
    {
        $('#ChkActiveVendor').prop("checked", false);
    }
}



MasterDataVendor.EmptyItem = function()
{
    $('#cbbPlantVendorModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtVendor").value = ''
    document.getElementById("OldVendor").value = ''
    document.getElementById("txtVendorName").value = ''
    document.getElementById("txtVendorMail1").value = ''
    document.getElementById("txtVendorMail2").value = ''

    $("#cbbPlantVendorModal").removeAttr('disabled')

    $("#errPlantVendor").attr("hidden", "hidden");
    $("#errVendor").attr("hidden", "hidden");
    $("#errVendorName").attr("hidden", "hidden");
    $("#errVendorMail1").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataVendor.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitVendor",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataVendor.EmptyItem()
                Notification.ShowToast('success', 'Vendor ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataVendor.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



MasterDataVendor.EventImport = function () {
    $('.DefaultVendor').hide()
    $('.VendorImport').removeAttr("hidden");
}

MasterDataVendor.EventImportCancel = function () {
    var $el = $('#InputUploadFileVendor');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
    $('.DefaultVendor').show()
    $('.VendorImport').attr("hidden", "hidden");
}



MasterDataVendor.Upload = function () {
    Loading.BlockPage()
    var fileUpload = $("#InputUploadFileVendor").get(0);
    var files = fileUpload.files;

    // Create FormData object  
    var fileData = new FormData();
    // Looping over all files and add it to FormData object  

    for (var i = 0; i < files.length; i++) {
        fileData.append('File', files[i]);
    }


    var uploader = $("#InputUploadFileVendor").val()
    if (uploader == '') {
        Loading.UnblockPage_()
        Notification.ShowToast('error', 'please import Vendor first')
    }
    else {
        $.ajax({
            url: "../MasterData/ImportVendor",
            method: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (j) {
                Loading.UnblockPage_()
                var $el = $('#InputUploadFileVendor');
                $el.wrap('<form>').closest('form').get(0).reset();
                $el.unwrap();
                if (j.Result == true) {
                    Notification.ShowToast('success', 'Succesfully Upload')
                    $('.DefaultVendor').show()
                    $('.VendorImport').attr("hidden", "hidden");
                    MasterDataVendor.GetData()
                }
                else {
                    Notification.ShowToast('error', 'Upload Fail, Please contact IT')
                }
            },
            error: function (xhr, error, text) {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + error + '')
            }
        });


    }
}
