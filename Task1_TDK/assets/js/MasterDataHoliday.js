
function MasterDataHoliday() { }


MasterDataHoliday.ShowHoliday = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnHoliday').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.Holiday').show()
    MasterDataHoliday.GetPlant()
}



MasterDataHoliday.mDataTable = null;

MasterDataHoliday.initialTable = function () {
    var options = {
        //responsive: true,
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#HolidayTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Holiday" },
           { "data": "HolidayName" },
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
                checkbox += '<input type="checkbox" id=\'chkHoliday' + data.Number + '\' value="" class="checkable" onclick="MasterDataHoliday.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Holiday + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 7,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataHoliday.EventEdit(\'' + data.Plant + '\',\'' + data.Holiday + '\',\'' + data.HolidayName + '\')">'
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
        }],
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }
    var Table = $('#HolidayTable').DataTable(options);
    MasterDataHoliday.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#HolidayTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#HolidayTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataHoliday.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserHoliday").value
    var cbbPlant = $('#cbbPlantHoliday');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantHoliday",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantHoliday option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataHoliday.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataHoliday.OnChangePlant = function () {
    MasterDataHoliday.GetData()
}



MasterDataHoliday.GetData = function () {
    var ValPlant = $('#cbbPlantHoliday').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetHolidayData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataHoliday.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataHoliday.mDataTable.row.add(st);
                })
                MasterDataHoliday.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataHoliday.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantHolidayModal');
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
                    $('#cbbPlantHolidayModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantHolidayModal").attr('disabled', 'disabled')
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


MasterDataHoliday.OnchangeHoliday = function ()
{
    var ValPlant = $('#cbbPlantHolidayModal').val()
    var ValHoliday = document.getElementById("txtHoliday").value;
    $.ajax({
        url: "../MasterData/CheckHolidayExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Holiday: ValHoliday
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errHoliday").removeAttr("hidden");
                    var error = $('#errHoliday')
                    error.empty();
                    error.append('Holiday already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errHoliday").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataHoliday.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Holiday').show()
    $("#txtHeaderGroupName").html('Add Holiday')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataHoliday'
    MasterDataHoliday.GetPlantModal('')
}


MasterDataHoliday.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Holiday?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataHoliday.Delete(MasterDataHoliday.Arr)
    });
}

MasterDataHoliday.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteHoliday",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataHoliday.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataHoliday.CheckboxClick = function(Number,Plant,Holiday)
{
    var ckbox = $('#chkHoliday' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataHoliday.CollectData(Number, Plant, Holiday, Checked)
}

MasterDataHoliday.ListHoliday = []
MasterDataHoliday.Arr = ""
MasterDataHoliday.CollectData = function (Number, Plant, Holiday, Checked) {
    MasterDataHoliday.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataHoliday.ListHoliday.length; i++) {
        if (parseInt(MasterDataHoliday.ListHoliday[i].Number) == parseInt(Number)) {
            MasterDataHoliday.ListHoliday.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Holiday\":\"' + Holiday + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataHoliday.ListHoliday.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataHoliday.ListHoliday.length; i++) {
        if (parseInt(MasterDataHoliday.ListHoliday[i].Checked) == parseInt(0)) {
            MasterDataHoliday.ListHoliday.splice(i, 1);
            break;
        }
    }
    var _ArrayHoliday = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataHoliday.ListHoliday, function (i, st) {
        _ArrayHoliday = []
        _JsonResult = []
        _ArrayHoliday[_ArrayHoliday.length] = st.Plant + '^' + st.Holiday;
        array_JsonResult[array_JsonResult.length] = _ArrayHoliday;
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
    MasterDataHoliday.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataHoliday.EventEdit =  function(Plant,Holiday,HolidayName)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Holiday').show()
    $("#txtHeaderGroupName").html('Update Holiday')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataHoliday'
    MasterDataHoliday.GetPlantModal(Plant)
    document.getElementById("txtHoliday").value = Holiday
    document.getElementById("OldHoliday").value = Holiday
    document.getElementById("txtHolidayName").value = HolidayName

}



MasterDataHoliday.EmptyItem = function()
{
    $('#cbbPlantHolidayModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtHoliday").value = ''
    document.getElementById("OldHoliday").value = ''
    document.getElementById("txtHolidayName").value = ''

    $("#cbbPlantHolidayModal").removeAttr('disabled')

    $("#errPlantHoliday").attr("hidden", "hidden");
    $("#errHoliday").attr("hidden", "hidden");
    $("#errHolidayName").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataHoliday.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitHoliday",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataHoliday.EmptyItem()
                Notification.ShowToast('success', 'Holiday ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataHoliday.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
