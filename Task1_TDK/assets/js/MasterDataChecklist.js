
function MasterDataChecklist() { }


MasterDataChecklist.ShowChecklist = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnChecklist').removeClass('btn btn-outChecklist-primary2 btn-lg btn-block').addClass('btn btn-outChecklist-primary2 btn-lg btn-block active')
    $('.Checklist').show()
    MasterDataChecklist.GetPlant()
}



MasterDataChecklist.mDataTable = null;

MasterDataChecklist.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#ChecklistTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "ProcessOwner" },
           { "data": "Department" },
           { "data": "AreaFocus" },
           { "data": "MainScope" },
           { "data": "SubScope" },
           { "data": "MinScore" },
           { "data": "MaxScore" },
           { "data": "TargetScore" },
           { "data": null },
           { "data": "Id" },
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
                checkbox += '<input type="checkbox" id=\'chkChecklist' + data.Number + '\' value="" class="checkable" onclick="MasterDataChecklist.CheckboxClick(\'' + data.Number + '\',\'' + data.Id + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets:11,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataChecklist.EventEdit(\'' + data.Plant + '\',\'' + data.ProcessOwner + '\',\'' + data.Department + '\',\'' + data.AreaFocus + '\',\'' + data.MainScope + '\',\'' + data.SubScope + '\',\'' + data.MinScore + '\',\'' + data.MaxScore + '\',\'' + data.TargetScore + '\',\'' + data.Id + '\')">'
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
        },
        {
            targets: 12,
            visible: false,
            searchable: false
        }],
         dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }
    var Table = $('#ChecklistTable').DataTable(options);
    MasterDataChecklist.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#ChecklistTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#ChecklistTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataChecklist.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserChecklist").value
    var cbbPlant = $('#cbbPlantChecklist');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantChecklist",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantChecklist option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataChecklist.GetProcessOwner()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataChecklist.OnChangePlant = function () {
    MasterDataChecklist.GetProcessOwner()
}


MasterDataChecklist.GetProcessOwner = function () {
    var ValPlant = $('#cbbPlantChecklist').val();
    var cbbProcessOwnerChecklist = $('#cbbProcessOwnerChecklist')
    cbbProcessOwnerChecklist.empty();
    cbbProcessOwnerChecklist.append("<option value=''>All Audit Type</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProcessOwnerChecklist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProcessOwnerChecklist.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                MasterDataChecklist.GetDepartment()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataChecklist.OnChangeProcessOwner = function () {
    MasterDataChecklist.GetDepartment()
}


MasterDataChecklist.GetDepartment = function () {
    var ValPlant = $('#cbbPlantChecklist').val();
    var ValProcessOwner = $('#cbbProcessOwnerChecklist').val();
    var cbbDepartmentChecklist = $('#cbbDepartmentChecklist')
    cbbDepartmentChecklist.empty();
    cbbDepartmentChecklist.append("<option value=''>All Department</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetDepartmentChecklist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbDepartmentChecklist.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                MasterDataChecklist.GetArea()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataChecklist.OnChangeDepartment = function () {
    MasterDataChecklist.GetArea()
}



MasterDataChecklist.GetArea = function () {
    var ValPlant = $('#cbbPlantChecklist').val();
    var ValProcessOwner = $('#cbbProcessOwnerChecklist').val();
    var ValDepartment = $('#cbbDepartmentChecklist').val();
    var cbbAreaChecklist = $('#cbbAreaChecklist')
    cbbAreaChecklist.empty();
    cbbAreaChecklist.append("<option value=''>All Area</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetAreaChecklist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbAreaChecklist.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                MasterDataChecklist.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataChecklist.OnChangeArea = function () {
    MasterDataChecklist.GetData()
}

MasterDataChecklist.GetData = function () {
    var ValPlant = $('#cbbPlantChecklist').val();
    var ValProcessOwner = $('#cbbProcessOwnerChecklist').val();
    var ValDept = $('#cbbDepartmentChecklist').val();
    var ValArea = $('#cbbAreaChecklist').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetChecklistData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner : ValProcessOwner,
            Department: ValDept,
            Area: ValArea
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataChecklist.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataChecklist.mDataTable.row.add(st);
                })
                MasterDataChecklist.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataChecklist.GetPlantModal = function (Plant,ProcessOwner, Department) {
    var cbbPlant = $('#cbbPlantChecklistModal');
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
                    $('#cbbPlantChecklistModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantChecklistModal").attr('disabled', 'disabled')
                    MasterDataChecklist.GetProcessOwnerModal(ProcessOwner)
                    MasterDataChecklist.GetDepartmentModal(Department)
                }
                else
                {
                    MasterDataChecklist.GetProcessOwnerModal('')
                    MasterDataChecklist.GetDepartmentModal('')
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
MasterDataChecklist.OnChangePlantModal =  function()
{
    MasterDataChecklist.GetProcessOwnerModal('')
    MasterDataChecklist.GetDepartmentModal('')
}


MasterDataChecklist.GetProcessOwnerModal = function (ProcessOwner) {
    var ValPlant = $('#cbbPlantChecklistModal').val()
    var cbbProcessOwnerChecklistModal = $('#cbbProcessOwnerChecklistModal');
    cbbProcessOwnerChecklistModal.empty();
    cbbProcessOwnerChecklistModal.append("<option value=''>Choose Audit Type ...</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProcessOwner",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProcessOwnerChecklistModal.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (ProcessOwner != '') {
                    $('#cbbProcessOwnerChecklistModal option[value="' + ProcessOwner + '"]').attr('selected', 'selected');
                    $("#cbbProcessOwnerChecklistModal").attr('disabled', 'disabled')
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


MasterDataChecklist.GetDepartmentModal = function (Department) {
    var ValPlant = $('#cbbPlantChecklistModal').val()
    var cbbDepartmentChecklistModal = $('#cbbDepartmentChecklistModal');
    cbbDepartmentChecklistModal.empty();
    cbbDepartmentChecklistModal.append("<option value=''>Choose Department ...</option>");
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
                    cbbDepartmentChecklistModal.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (Department != '') {
                    $('#cbbDepartmentChecklistModal option[value="' + Department + '"]').attr('selected', 'selected');
                    $("#cbbDepartmentChecklistModal").attr('disabled', 'disabled')
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



MasterDataChecklist.OnchangeChecklist = function ()
{
    var ValPlant = $('#cbbPlantChecklistModal').val()
    var ValProcessOwner = $('#cbbProcessOwnerChecklistModal').val()
    var ValDepartment = $('#cbbDepartmentChecklistModal').val()
    var ValArea = document.getElementById("txtAreaChecklist").value;
    var ValMainScope = document.getElementById("txtMainScopeChecklist").value;
    var ValSubScope = document.getElementById("txtSubScopeChecklist").value;
    
    $.ajax({
        url: "../MasterData/CheckChecklistExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            ProcessOwner: ValProcessOwner,
            Department: ValDepartment,
            Area: ValArea,
            MainScope: ValMainScope,
            SubScope: ValSubScope
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errSubScopeChecklist").removeAttr("hidden");
                    var error = $('#errSubScopeChecklist')
                    error.empty();
                    error.append('Sub Scope already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errSubScopeChecklist").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataChecklist.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Checklist').show()
    $("#txtHeaderGroupName").html('Add Checklist')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataChecklist'
    MasterDataChecklist.GetPlantModal('','','')
}


MasterDataChecklist.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Checklist?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataChecklist.Delete(MasterDataChecklist.Arr)
    });
}

MasterDataChecklist.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteChecklist",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataChecklist.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataChecklist.CheckboxClick = function(Number,Id)
{
    var ckbox = $('#chkChecklist' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataChecklist.CollectData(Number, Id, Checked)
}

MasterDataChecklist.ListChecklist = []
MasterDataChecklist.Arr = ""
MasterDataChecklist.CollectData = function (Number, Id, Checked) {
    MasterDataChecklist.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataChecklist.ListChecklist.length; i++) {
        if (parseInt(MasterDataChecklist.ListChecklist[i].Number) == parseInt(Number)) {
            MasterDataChecklist.ListChecklist.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Id\":\"' + Id + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataChecklist.ListChecklist.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataChecklist.ListChecklist.length; i++) {
        if (parseInt(MasterDataChecklist.ListChecklist[i].Checked) == parseInt(0)) {
            MasterDataChecklist.ListChecklist.splice(i, 1);
            break;
        }
    }
    var _ArrayChecklist = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataChecklist.ListChecklist, function (i, st) {
        _ArrayChecklist = []
        _JsonResult = []
        _ArrayChecklist[_ArrayChecklist.length] = st.Id;
        array_JsonResult[array_JsonResult.length] = _ArrayChecklist;
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
    MasterDataChecklist.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataChecklist.EventEdit = function (Plant, ProcessOwner, Department, AreaFocus, MainScope, SubScope, MinScore, MaxScore, TargetScore, Id)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Checklist').show()
    $("#txtHeaderGroupName").html('Update Checklist')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataChecklist'
    MasterDataChecklist.GetPlantModal(Plant, ProcessOwner,Department)
    document.getElementById("txtAreaChecklist").value = AreaFocus
    document.getElementById("txtMainScopeChecklist").value = MainScope
    document.getElementById("txtSubScopeChecklist").value = SubScope
    document.getElementById("txtMinScoreChecklist").value = MinScore
    document.getElementById("txtMaxScoreChecklist").value = MaxScore
    document.getElementById("txtTargetScoreChecklist").value = TargetScore
    document.getElementById("IdCheclist").value = Id
}



MasterDataChecklist.EmptyItem = function()
{
    $('#cbbPlantChecklistModal option[value=""]').attr('selected', 'selected');
    $('#cbbProcessOwnerChecklistModal option[value=""]').attr('selected', 'selected');
    $('#cbbDepartmentChecklistModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtAreaChecklist").value = ''
    document.getElementById("txtMainScopeChecklist").value = ''
    document.getElementById("txtSubScopeChecklist").value = ''
    document.getElementById("txtMinScoreChecklist").value = ''
    document.getElementById("txtMaxScoreChecklist").value = ''
    document.getElementById("txtTargetScoreChecklist").value = ''

    $("#cbbPlantChecklistModal").removeAttr('disabled')
    $("#cbbProcessOwnerChecklistModal").removeAttr('disabled')
    $("#cbbDepartmentChecklistModal").removeAttr('disabled')

    $("#errPlantChecklist").attr("hidden", "hidden");
    $("#errProcessOwnerChecklist").attr("hidden", "hidden");
    $("#errDepartmentChecklist").attr("hidden", "hidden");
    $("#errAreaChecklist").attr("hidden", "hidden");
    $("#errMainScopeChecklist").attr("hidden", "hidden");
    $("#errSubScopeChecklist").attr("hidden", "hidden");
    $("#errMinScoreChecklist").attr("hidden", "hidden");
    $("#errMaxScoreChecklist").attr("hidden", "hidden");
    $("#errTargetScoreChecklist").attr("hidden", "hidden");
    $("#errChecklistDescription").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataChecklist.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitChecklist",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataChecklist.EmptyItem()
                Notification.ShowToast('success', 'Checklist ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataChecklist.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataChecklist.EventImport = function()
{
    $('.DefaultChecklist').hide()
    $('.ChecklistImport').removeAttr("hidden");
}

MasterDataChecklist.EventImportCancel = function () {
    var $el = $('#InputUploadFileChecklist');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
    $('.DefaultChecklist').show()
    $('.ChecklistImport').attr("hidden","hidden");
}




MasterDataChecklist.Upload = function () {
    Loading.BlockPage()
    var fileUpload = $("#InputUploadFileChecklist").get(0);
    var files = fileUpload.files;

    // Create FormData object  
    var fileData = new FormData();
    // Looping over all files and add it to FormData object  

    for (var i = 0; i < files.length; i++) {
        fileData.append('File', files[i]);
    }


    var uploader = $("#InputUploadFileChecklist").val()
    if (uploader == '') {
        Loading.UnblockPage_()
        Notification.ShowToast('error', 'please import 5S Checklist first')
    }
    else {
        $.ajax({
            url: "../MasterData/ImportChecklist",
            method: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (j) {
                Loading.UnblockPage_()
                var $el = $('#InputUploadFileChecklist');
                $el.wrap('<form>').closest('form').get(0).reset();
                $el.unwrap();
                if (j.Result == true) {
                    Notification.ShowToast('success', 'Succesfully Upload')
                    $('.DefaultChecklist').show()
                    $('.ChecklistImport').attr("hidden", "hidden");
                    MasterDataChecklist.GetData()
                }
                else {
                    Loading.UnblockPage_()
                    Notification.SweetAlert('error','error','Please Contact IT</br>Message:'+j.Msg+'')
                }
            },
            error: function (xhr, error, text) {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + error + '')
            }
        });


    }
}