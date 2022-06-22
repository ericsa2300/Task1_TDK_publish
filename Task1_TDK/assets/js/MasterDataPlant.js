
function MasterDataPlant() { }


MasterDataPlant.ShowPlant = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnPlant').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.Plant').show()
    MasterDataPlant.GetData()
}



MasterDataPlant.mDataTable = null;

MasterDataPlant.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#PlantTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "PlantName" },
           { "data": "Active" },
           { "data": "VendorActive" },
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
                checkbox += '<input type="checkbox" id=\'chkPlant' + data.Number + '\' value="" class="checkable" onclick="MasterDataPlant.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 8,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataPlant.EventEdit(\'' + data.Plant + '\',\'' + data.PlantName + '\',\'' + data.Active + '\',\'' + data.VendorActive + '\')">'
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
            "targets": [4], // ispickable
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
        }, {
            "targets": [5], // ispickable
            "searchable": false,
            'render': function (data, type, full, meta) {
                var item = "";
                item = "<div class='mr-4 flex-shrink-0 text-center' style='width: 20px;'>"
                if (full.VendorActive == "True") {
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
    var Table = $('#PlantTable').DataTable(options);
    MasterDataPlant.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#PlantTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#PlantTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataPlant.GetData = function () {
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantData",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataPlant.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataPlant.mDataTable.row.add(st);
                })
                MasterDataPlant.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}




MasterDataPlant.OnchangePlant = function ()
{
    var ValPlant = document.getElementById("txtPlant").value;
    $.ajax({
        url: "../MasterData/CheckPlantExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errPlant").removeAttr("hidden");
                    var error = $('#errPlant')
                    error.empty();
                    error.append('Plant already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errPlant").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataPlant.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Plant').show()
    $("#txtHeaderGroupName").html('Add Plant')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataPlant'
}


MasterDataPlant.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Plant?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataPlant.Delete(MasterDataPlant.Arr)
    });
}

MasterDataPlant.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeletePlant",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataPlant.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataPlant.CheckboxClick = function(Number,Plant)
{
    var ckbox = $('#chkPlant' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataPlant.CollectData(Number, Plant, Checked)
}

MasterDataPlant.ListPlant = []
MasterDataPlant.Arr = ""
MasterDataPlant.CollectData = function (Number, Plant, Checked) {
    MasterDataPlant.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataPlant.ListPlant.length; i++) {
        if (parseInt(MasterDataPlant.ListPlant[i].Number) == parseInt(Number)) {
            MasterDataPlant.ListPlant.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataPlant.ListPlant.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataPlant.ListPlant.length; i++) {
        if (parseInt(MasterDataPlant.ListPlant[i].Checked) == parseInt(0)) {
            MasterDataPlant.ListPlant.splice(i, 1);
            break;
        }
    }
    var _ArrayPlant = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataPlant.ListPlant, function (i, st) {
        _ArrayPlant = []
        _JsonResult = []
        _ArrayPlant[_ArrayPlant.length] = st.Plant;
        array_JsonResult[array_JsonResult.length] = _ArrayPlant;
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
    MasterDataPlant.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataPlant.EventEdit =  function(Plant,PlantName,Active, VendorActive, MultipleFinding)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Plant').show()
    $("#txtHeaderGroupName").html('Update Plant')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataPlant'
    document.getElementById("txtPlant").value = Plant
    document.getElementById("OldPlant").value = Plant
    document.getElementById("txtPlantName").value = PlantName
    if (Active == 'True') {
        $('#ChkActivePlant').prop("checked", true);
    }

    else {
        $('#ChkActivePlant').prop("checked", false);
    }

    if (VendorActive == 'True') {
        $('#ChkActivePlantVendor').prop("checked", true);
    }

    else {
        $('#ChkActivePlantVendor').prop("checked", false);
    }


}



MasterDataPlant.EmptyItem = function()
{
    document.getElementById("txtPlant").value = ''
    document.getElementById("OldPlant").value = ''
    document.getElementById("txtPlantName").value = ''

    $("#errPlant").attr("hidden", "hidden");
    $("#errPlantName").attr("hidden", "hidden");
    $('#ChkActivePlant').prop("checked", false);
    $('#ChkActivePlantVendor').prop("checked", false);

    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataPlant.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitPlant",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataPlant.EmptyItem()
                Notification.ShowToast('success', 'Plant ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataPlant.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
