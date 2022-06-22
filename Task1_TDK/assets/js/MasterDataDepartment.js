
function MasterDataDepartment() { }


MasterDataDepartment.ShowDepartment = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnDepartment').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.Department').show()
    MasterDataDepartment.GetPlant()
}



MasterDataDepartment.mDataTable = null;

MasterDataDepartment.initialTable = function () {
    var options = {
        //responsive: true,
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#DepartmentTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Department" },
           { "data": "DepartmentName" },
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
                checkbox += '<input type="checkbox" id=\'chkDepartment' + data.Number + '\' value="" class="checkable" onclick="MasterDataDepartment.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Department + '\')"/>'
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
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataDepartment.EventEdit(\'' + data.Plant + '\',\'' + data.Department + '\',\'' + data.DepartmentName + '\')">'
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
    var Table = $('#DepartmentTable').DataTable(options);
    MasterDataDepartment.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#DepartmentTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#DepartmentTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataDepartment.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserDepartment").value
    var cbbPlant = $('#cbbPlantDepartment');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantDepartment",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantDepartment option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataDepartment.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataDepartment.OnChangePlant = function () {
    MasterDataDepartment.GetData()
}



MasterDataDepartment.GetData = function () {
    var ValPlant = $('#cbbPlantDepartment').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetDepartmentData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataDepartment.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataDepartment.mDataTable.row.add(st);
                })
                MasterDataDepartment.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataDepartment.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantDepartmentModal');
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
                    $('#cbbPlantDepartmentModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantDepartmentModal").attr('disabled', 'disabled')
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


MasterDataDepartment.OnchangeDepartment = function ()
{
    var ValPlant = $('#cbbPlantDepartmentModal').val()
    var ValDepartment = document.getElementById("txtDepartment").value;
    $.ajax({
        url: "../MasterData/CheckDepartmentExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errDepartment").removeAttr("hidden");
                    var error = $('#errDepartment')
                    error.empty();
                    error.append('Department already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errDepartment").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataDepartment.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Department').show()
    $("#txtHeaderGroupName").html('Add Department')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataDepartment'
    MasterDataDepartment.GetPlantModal('')
}


MasterDataDepartment.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Department?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataDepartment.Delete(MasterDataDepartment.Arr)
    });
}

MasterDataDepartment.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteDepartment",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataDepartment.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataDepartment.CheckboxClick = function(Number,Plant,Department)
{
    var ckbox = $('#chkDepartment' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataDepartment.CollectData(Number, Plant, Department, Checked)
}

MasterDataDepartment.ListDepartment = []
MasterDataDepartment.Arr = ""
MasterDataDepartment.CollectData = function (Number, Plant, Department, Checked) {
    MasterDataDepartment.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataDepartment.ListDepartment.length; i++) {
        if (parseInt(MasterDataDepartment.ListDepartment[i].Number) == parseInt(Number)) {
            MasterDataDepartment.ListDepartment.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Department\":\"' + Department + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataDepartment.ListDepartment.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataDepartment.ListDepartment.length; i++) {
        if (parseInt(MasterDataDepartment.ListDepartment[i].Checked) == parseInt(0)) {
            MasterDataDepartment.ListDepartment.splice(i, 1);
            break;
        }
    }
    var _ArrayDepartment = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataDepartment.ListDepartment, function (i, st) {
        _ArrayDepartment = []
        _JsonResult = []
        _ArrayDepartment[_ArrayDepartment.length] = st.Plant + '~' + st.Department;
        array_JsonResult[array_JsonResult.length] = _ArrayDepartment;
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
    MasterDataDepartment.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataDepartment.EventEdit =  function(Plant,Department,DepartmentName)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Department').show()
    $("#txtHeaderGroupName").html('Update Department')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataDepartment'
    MasterDataDepartment.GetPlantModal(Plant)
    document.getElementById("txtDepartment").value = Department
    document.getElementById("OldDepartment").value = Department
    document.getElementById("txtDepartmentName").value = DepartmentName

}



MasterDataDepartment.EmptyItem = function()
{
    $('#cbbPlantDepartmentModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtDepartment").value = ''
    document.getElementById("OldDepartment").value = ''
    document.getElementById("txtDepartmentName").value = ''

    $("#cbbPlantDepartmentModal").removeAttr('disabled')

    $("#errPlantDepartment").attr("hidden", "hidden");
    $("#errDepartment").attr("hidden", "hidden");
    $("#errDepartmentName").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataDepartment.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitDepartment",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataDepartment.EmptyItem()
                Notification.ShowToast('success', 'Department ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataDepartment.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
