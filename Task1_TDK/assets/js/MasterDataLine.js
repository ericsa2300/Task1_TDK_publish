
function MasterDataLine() { }


MasterDataLine.ShowLine = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnLine').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.Line').show()
    MasterDataLine.GetPlant()
}



MasterDataLine.mDataTable = null;

MasterDataLine.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#LineTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Department" },
           { "data": "LineID" },
           { "data": "LineDescription" },
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
                checkbox += '<input type="checkbox" id=\'chkLine' + data.Number + '\' value="" class="checkable" onclick="MasterDataLine.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Department + '\',\'' + data.LineID + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets:9,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataLine.EventEdit(\'' + data.Plant + '\',\'' + data.Department + '\',\'' + data.LineID + '\',\'' + data.LineDescription + '\',\'' + data.Active + '\')">'
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
            "targets": [6], // ispickable
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
    var Table = $('#LineTable').DataTable(options);
    MasterDataLine.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#LineTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#LineTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataLine.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserLine").value
    var cbbPlant = $('#cbbPlantLine');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantLine",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantLine option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataLine.GetDepartment()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLine.OnChangePlant = function () {
    MasterDataLine.GetDepartment()
}


MasterDataLine.GetDepartment = function () {
    var ValPlant = $('#cbbPlantLine').val();
    var cbbDepartmentLine = $('#cbbDepartmentLine')
    cbbDepartmentLine.empty();
    cbbDepartmentLine.append("<option value=''>All Department</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetDepartmentLine",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbDepartmentLine.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                MasterDataLine.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataLine.OnChangeDepartment = function () {
    MasterDataLine.GetData()
}

MasterDataLine.GetData = function () {
    var ValPlant = $('#cbbPlantLine').val();
    var ValDept = $('#cbbDepartmentLine').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetLineData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Department: ValDept,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataLine.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataLine.mDataTable.row.add(st);
                })
                MasterDataLine.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLine.GetPlantModal = function (Plant, Department) {
    var cbbPlant = $('#cbbPlantLineModal');
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
                    $('#cbbPlantLineModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantLineModal").attr('disabled', 'disabled')
                    MasterDataLine.GetDepartmentModal(Department)
                }
                else
                {
                    MasterDataLine.GetDepartmentModal('')
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
MasterDataLine.OnChangePlantModal =  function()
{
    MasterDataLine.GetDepartmentModal('')
}

MasterDataLine.GetDepartmentModal = function (Department) {
    var ValPlant = $('#cbbPlantLineModal').val()
    var cbbDepartmentLineModal = $('#cbbDepartmentLineModal');
    cbbDepartmentLineModal.empty();
    cbbDepartmentLineModal.append("<option value=''>Choose Department ...</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetDepartment",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbDepartmentLineModal.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (Department != '') {
                    $('#cbbDepartmentLineModal option[value="' + Department + '"]').attr('selected', 'selected');
                    $("#cbbDepartmentLineModal").attr('disabled', 'disabled')
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



MasterDataLine.OnchangeLine = function ()
{
    var ValPlant = $('#cbbPlantLineModal').val()
    var ValDepartment = $('#cbbDepartmentLineModal').val()
    var ValLine = document.getElementById("txtLine").value;
    $.ajax({
        url: "../MasterData/CheckLineExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Department: ValDepartment,
            Line: ValLine
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errLine").removeAttr("hidden");
                    var error = $('#errLine')
                    error.empty();
                    error.append('Line already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errLine").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLine.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Line').show()
    $("#txtHeaderGroupName").html('Add Line')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataLine'
    MasterDataLine.GetPlantModal('','')
}


MasterDataLine.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Line?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataLine.Delete(MasterDataLine.Arr)
    });
}

MasterDataLine.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteLine",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataLine.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataLine.CheckboxClick = function(Number,Plant,Department,Line)
{
    var ckbox = $('#chkLine' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataLine.CollectData(Number, Plant, Department, Line, Checked)
}

MasterDataLine.ListLine = []
MasterDataLine.Arr = ""
MasterDataLine.CollectData = function (Number, Plant, Department, Line, Checked) {
    MasterDataLine.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataLine.ListLine.length; i++) {
        if (parseInt(MasterDataLine.ListLine[i].Number) == parseInt(Number)) {
            MasterDataLine.ListLine.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Department\":\"' + Department + '\",'
    tr += '\"Line\":\"' + Line + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataLine.ListLine.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataLine.ListLine.length; i++) {
        if (parseInt(MasterDataLine.ListLine[i].Checked) == parseInt(0)) {
            MasterDataLine.ListLine.splice(i, 1);
            break;
        }
    }
    var _ArrayLine = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataLine.ListLine, function (i, st) {
        _ArrayLine = []
        _JsonResult = []
        _ArrayLine[_ArrayLine.length] = st.Plant + '~' + st.Department + '~' + st.Line;
        array_JsonResult[array_JsonResult.length] = _ArrayLine;
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
    MasterDataLine.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataLine.EventEdit =  function(Plant,Department,LineID, LineDescription, Active)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Line').show()
    $("#txtHeaderGroupName").html('Update Line')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataLine'
    MasterDataLine.GetPlantModal(Plant,Department)
    document.getElementById("txtLine").value = LineID
    document.getElementById("OldLine").value = LineID
    document.getElementById("txtLineDescription").value = LineDescription
    if(Active =='True')
    {
        $('#ChkActiveLine').prop("checked", true);
    }

    else
    {
        $('#ChkActiveLine').prop("checked", false);
    }
}



MasterDataLine.EmptyItem = function()
{
    $('#cbbPlantLineModal option[value=""]').attr('selected', 'selected');
    $('#cbbDepartmentLineModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtLine").value = ''
    document.getElementById("OldLine").value = ''
    document.getElementById("txtLineDescription").value = ''
    $('#ChkActiveLine').prop("checked", false);
    $("#cbbPlantLineModal").removeAttr('disabled')
    $("#cbbDepartmentLineModal").removeAttr('disabled')

    $("#errPlantLine").attr("hidden", "hidden");
    $("#errDepartmentLine").attr("hidden", "hidden");
    $("#errLine").attr("hidden", "hidden");
    $("#errLineDescription").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataLine.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitLine",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataLine.EmptyItem()
                Notification.ShowToast('success', 'Line ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataLine.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



MasterDataLine.EventImport = function () {
    $('.DefaultLine').hide()
    $('.LineImport').removeAttr("hidden");
}

MasterDataLine.EventImportCancel = function () {
    var $el = $('#InputUploadFileLine');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
    $('.DefaultLine').show()
    $('.LineImport').attr("hidden", "hidden");
}




MasterDataLine.Upload = function () {
    Loading.BlockPage()
    var fileUpload = $("#InputUploadFileLine").get(0);
    var files = fileUpload.files;

    // Create FormData object  
    var fileData = new FormData();
    // Looping over all files and add it to FormData object  

    for (var i = 0; i < files.length; i++) {
        fileData.append('File', files[i]);
    }


    var uploader = $("#InputUploadFileLine").val()
    if (uploader == '') {
        Loading.UnblockPage_()
        Notification.ShowToast('error', 'please import 5S Line first')
    }
    else {
        $.ajax({
            url: "../MasterData/ImportLine",
            method: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (j) {
                Loading.UnblockPage_()
                var $el = $('#InputUploadFileLine');
                $el.wrap('<form>').closest('form').get(0).reset();
                $el.unwrap();
                if (j.Result == true) {
                    Notification.ShowToast('success', 'Succesfully Upload')
                    $('.DefaultLine').show()
                    $('.LineImport').attr("hidden", "hidden");
                    MasterDataLine.GetData()
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