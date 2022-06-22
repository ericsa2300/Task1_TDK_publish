
function MasterDataMUser() { }


MasterDataMUser.ShowMUser = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()



    $('#BtnUser').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.MUser').show()
    $('.vendorUser').hide()
    $('.MasterUserDefault').show()
    $('.MasterUserAddNew').hide()
    $('.MasterUserManageGroup').hide()
    $('.MasterManageGroupAddNew').hide()
    MasterDataMUser.GetPlant()
}



MasterDataMUser.mDataTable = null;

MasterDataMUser.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#MUserTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "UserId" },
           { "data": "WindowsId" },
           { "data": "UserName" },
           { "data": "GroupId" },
           { "data": "Email" },
           { "data": "Vendor" },
           { "data": null },
           { "data": "FirstName" },
           { "data": "LastName" },
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
                checkbox += '<input type="checkbox" id=\'chkMUser' + data.Number + '\' value="" class="checkable" onclick="MasterDataMUser.CheckboxClick(\'' + data.Number + '\',\'' + data.UserId + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 9,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataMUser.EventEdit(\'' + data.Plant + '\',\'' + data.UserId + '\',\'' + data.WindowsId + '\',\'' + data.FirstName + '\',\'' + data.LastName + '\',\'' + data.GroupId + '\',\'' + data.Email + '\',\'' + data.Vendor + '\')">'
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
            "targets": [10], // Priority
            "visible": false,
            "searchable": false
        },
        {
            "targets": [11], // Priority
            "visible": false,
            "searchable": false
        }],
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    }
    var Table = $('#MUserTable').DataTable(options);
    MasterDataMUser.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#MUserTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#MUserTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataMUser.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserMUser").value
    var cbbPlant = $('#cbbPlantMUser');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantMUser",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantMUser option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataMUser.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataMUser.OnChangePlant = function () {
    MasterDataMUser.GetData()
}



MasterDataMUser.GetData = function () {
    var ValPlant = $('#cbbPlantMUser').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetMUserData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataMUser.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataMUser.mDataTable.row.add(st);
                })
                MasterDataMUser.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataMUser.GetPlantModal = function (Plant, Group, Vendor) {
    var cbbPlant = $('#cbbPlantMUserAdd');
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
                    $('#cbbPlantMUserAdd option[value="' + Plant + '"]').attr('selected', 'selected');
                    MasterDataMUser.GetGroupIdModal(Group)
                    MasterDataMUser.GetVendorModal(Vendor)
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

MasterDataMUser.OnChangePlantModal = function()
{
    MasterDataMUser.GetGroupIdModal('')
    MasterDataMUser.GetVendorModal('')
}

MasterDataMUser.GetGroupIdModal = function (Group) {
    var ValPlant = $('#cbbPlantMUserAdd').val();
    var cbbGroupID = $('#cbbGroupID');
    cbbGroupID.empty();
    cbbGroupID.append("<option value=''>Choose Group ...</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetGroup",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbGroupID.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (Group != '') {
                    $('#cbbGroupID option[value="' + Group + '"]').attr('selected', 'selected');
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


MasterDataMUser.GetVendorModal = function (Vendor) {
    var ValPlant = $('#cbbPlantMUserAdd').val();
    var cbbVendorUser = $('#cbbVendorUser');
    cbbVendorUser.empty();
    cbbVendorUser.append("<option value=''>Choose Vendor ...</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetVendor",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbVendorUser.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                if (Vendor != '') {
                    $('#cbbVendorUser option[value="' + Vendor + '"]').attr('selected', 'selected');
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


MasterDataMUser.OnchangeMUser = function ()
{
    var ValMUser = document.getElementById("txtUserID").value;
    $.ajax({
        url: "../MasterData/CheckMUserExist",
        method: "POST",
        dataType: "JSON",
        data: {
            UserID: ValMUser
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSubmitUser").attr('disabled', 'disabled')
                    $("#errUserID").removeAttr("hidden");
                    var error = $('#errUserID')
                    error.empty();
                    error.append('User already exist')
                }
                else {
                    $("#BtnSubmitUser").removeAttr('disabled')
                    $("#errUserID").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataMUser.EventAdd = function()
{
    //$("#ModalMasterData").modal('show');
    //MasterDataLoad.hideAllForm()
    //$('.MUser').show()
    $('.MasterUserDefault').hide()
    $('.MasterUserAddNew').show()
    $('.additionalUser').hide()
    $('.MasterUserManageGroup').hide()
    $('.MasterManageGroupAddNew').hide()
    $("#txtConditionUser").html('Add')
    $("#BtnSubmitUser").html('<i class="icon-xl text-dark-50 la la-send-o"></i>Submit')
    document.getElementById("MasterDataForm").value = 'MasterDataMUser'
    MasterDataMUser.GetPlantModal('','','')
}
MasterDataMUser.EventCancel = function () {
    $('.MasterUserDefault').show()
    $('.MasterUserAddNew').hide()
    $('.additionalUser').hide()
    $('.MasterUserManageGroup').hide()
    $('.MasterManageGroupAddNew').hide()
    MasterDataMUser.EmptyItem()
}

MasterDataMUser.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this MUser?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataMUser.Delete(MasterDataMUser.Arr)
    });
}

MasterDataMUser.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteMUser",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataMUser.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataMUser.CheckboxClick = function(Number,UserId)
{
    var ckbox = $('#chkMUser' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataMUser.CollectData(Number,UserId, Checked)
}

MasterDataMUser.ListMUser = []
MasterDataMUser.Arr = ""
MasterDataMUser.CollectData = function (Number,MUser, Checked) {
    MasterDataMUser.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataMUser.ListMUser.length; i++) {
        if (parseInt(MasterDataMUser.ListMUser[i].Number) == parseInt(Number)) {
            MasterDataMUser.ListMUser.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"UserId\":\"' + MUser + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataMUser.ListMUser.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataMUser.ListMUser.length; i++) {
        if (parseInt(MasterDataMUser.ListMUser[i].Checked) == parseInt(0)) {
            MasterDataMUser.ListMUser.splice(i, 1);
            break;
        }
    }
    var _ArrayMUser = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataMUser.ListMUser, function (i, st) {
        _ArrayMUser = []
        _JsonResult = []
        _ArrayMUser[_ArrayMUser.length] = st.UserId;
        array_JsonResult[array_JsonResult.length] = _ArrayMUser;
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
    MasterDataMUser.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataMUser.EventEdit =  function(Plant,UserId, WindowsId, FirstName, LastName, GroupId, Email, Vendor)
{


    $('.MasterUserDefault').hide()
    $('.MasterUserAddNew').show()
    $('.additionalUser').show()
    $('.MasterUserManageGroup').hide()
    $('.MasterManageGroupAddNew').hide()
    $("#txtConditionUser").html('Update')
    $("#BtnSubmitUser").html('<i class="icon-xl text-dark-50 la la-send-o"></i>Update')

    document.getElementById("MasterDataForm").value = 'MasterDataMUser'

    MasterDataMUser.GetPlantModal(Plant, GroupId,Vendor)
    document.getElementById("txtUserID").value = UserId
    document.getElementById("tUserIDold").value = UserId
    document.getElementById("txtFirstName").value = FirstName
    document.getElementById("txtLastName").value = LastName
    document.getElementById("txtWindowsID").value = WindowsId
    document.getElementById("txtEmail").value = Email
    if (Vendor != '') {
        $('#ChkActiveMUserVendor').prop("checked", true);
        $('.vendorUser').show()
    }

    else {
        $('#ChkActiveMUserVendor').prop("checked", false);
        $('.vendorUser').hide()
    }
}



MasterDataMUser.EmptyItem = function()
{
    $('#cbbPlantMUserAdd option[value=""]').attr('selected', 'selected');
    $('#cbbGroupID option[value=""]').attr('selected', 'selected');
    document.getElementById("txtUserID").value = ''
    document.getElementById("tUserIDold").value = ''
    document.getElementById("txtFirstName").value = ''
    document.getElementById("txtLastName").value = ''
    document.getElementById("txtWindowsID").value = ''
    document.getElementById("txtEmail").value = ''

    $("#cbbPlantMUserAdd").removeAttr('disabled')
    $("#cbbGroupID").removeAttr('disabled')

    $("#errPlantAdd").attr("hidden", "hidden");
    $("#errUserID").attr("hidden", "hidden");
    $("#errFirstName").attr("hidden", "hidden");
    $("#errLastName").attr("hidden", "hidden");
    $("#errGroupID").attr("hidden", "hidden");
    $("#errPassword").attr("hidden", "hidden");
    $("#errRePassword").attr("hidden", "hidden");
    $("#errEmail").attr("hidden", "hidden");
    $("#BtnSubmitUser").removeAttr('disabled')
    $("#BtnSaveModal").removeAttr('hidden')


    $('#cbbPlantManageGroupAdd option[value=""]').attr('selected', 'selected');
    document.getElementById("txtGroupId").value = ''
    document.getElementById("txtGroupName").value = ''
    $("#cbbPlantManageGroupAdd").removeAttr('disabled')

    $("#errPlantManageGroup").attr("hidden", "hidden");
    $("#errGroupIdManageGroup").attr("hidden", "hidden");
    $("#errGroupNameManageGroup").attr("hidden", "hidden");
    $("#BtnSubmitManageGroup").removeAttr('disabled')

    $('.vendorUser').hide()
    $('#ChkActiveMUserVendor').prop("checked", false);
}

MasterDataMUser.OnChangeReTypePassword = function()
{
    var ValPassword = document.getElementById("txtPassword").value;
    var ValRePassword = document.getElementById("txtRePassword").value;
    if (ValPassword != ValRePassword) {
        $("#errRePassword").removeAttr("hidden");
        var error = $('#errRePassword')
        error.empty();
        error.append('Password not match')
        $("#BtnSubmitUser").attr('disabled', 'disabled')
    }
    else {
        $("#errRePassword").attr("hidden", "hidden");
        $("#BtnSubmitUser").removeAttr('disabled')
    }
}

MasterDataMUser.CheckboxVendorClick = function () {
    var ckbox = $('#ChkActiveMUserVendor');
    if (ckbox.is(':checked')) {
        $('.vendorUser').show()
    }
    else {
        $('.vendorUser').hide()
    }
}



MasterDataMUser.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitMUser",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataMUser.EmptyItem()
                Notification.ShowToast('success', 'MUser ' + ValCondition + ' succesfully')
                $('.MasterUserDefault').show()
                $('.MasterUserAddNew').hide()
                $('.MasterUserManageGroup').hide()
                $('.MasterManageGroupAddNew').hide()
                MasterDataMUser.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataMUser.EventShowManageGroup = function()
{
    $('.MasterUserDefault').hide()
    $('.MasterUserAddNew').hide()
    $('.additionalUser').hide()
    $('.MasterUserManageGroup').show()
    $('.MasterManageGroupAddNew').hide()
    ManageGroup.GetPlant()
}


function ManageGroup() { }

ManageGroup.mDataTable = null;

ManageGroup.initialTable = function () {
    var options = {
        //responsive: true,
        bSortCellsTop: true,
        ordering: true,
        fixedHeader: true,
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "GroupId" },
           { "data": "GroupName" },
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
                checkbox += '<input type="checkbox" id=\'chkMUserManageGroup' + data.Number + '\' value="" class="checkable" onclick="ManageGroup.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.GroupId + '\')"/>'
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
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="ManageGroup.EventEditAccess(\'' + data.Plant + '\',\'' + data.GroupId + '\')">'
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
        }]
    }
    var Table = $('#MUserManageGroupTable').DataTable(options);
    ManageGroup.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#MUserManageGroupTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#MUserManageGroupTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}



ManageGroup.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserMUserManageGroup").value
    var cbbPlant = $('#cbbPlantMUserManageGroup');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantMUserManageGroup",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantMUserManageGroup option[value="' + UserPlant + '"]').attr('selected', 'selected');
                ManageGroup.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ManageGroup.OnChangePlant = function () {
    ManageGroup.GetData()
}



ManageGroup.GetData = function () {
    var ValPlant = $('#cbbPlantMUserManageGroup').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetMUserDataManageGroup",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                ManageGroup.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ManageGroup.mDataTable.row.add(st);
                })
                ManageGroup.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ManageGroup.EventEditAccess = function(Plant, GroupId)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.MUser').show()
    $('.MUserDepartment').hide()
    $('.MUserProduct').hide()
    $('.NotMUserManageGroup').hide()
    $('.MasterUserDefault').hide()
    $('.MUserManageGroup').show()
    $("#txtHeaderGroupName").html('Access : ' + GroupId)
    $("#BtnSaveModal").attr('hidden', 'hidden')
    document.getElementById("MasterDataForm").value = 'MasterDataMUser'
    document.getElementById("txtPlantManageGroup").value = Plant
    document.getElementById("txtGroupManageGroup").value = GroupId
    ManageGroupAccess.GetData()
}



ManageGroup.CheckboxClick = function (Number, Plant, GroupId) {
    var ckbox = $('#chkMUserManageGroup' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    ManageGroup.CollectData(Number, Plant, GroupId, Checked)
}

ManageGroup.ListMUser = []
ManageGroup.Arr = ""
ManageGroup.CollectData = function (Number, Plant, GroupId, Checked) {
    ManageGroup.Arr = ""
    // replace data with same ID
    for (var i = 0; i < ManageGroup.ListMUser.length; i++) {
        if (parseInt(ManageGroup.ListMUser[i].Number) == parseInt(Number)) {
            ManageGroup.ListMUser.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"GroupId\":\"' + GroupId + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    ManageGroup.ListMUser.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < ManageGroup.ListMUser.length; i++) {
        if (parseInt(ManageGroup.ListMUser[i].Checked) == parseInt(0)) {
            ManageGroup.ListMUser.splice(i, 1);
            break;
        }
    }
    var _ArrayMUser = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(ManageGroup.ListMUser, function (i, st) {
        _ArrayMUser = []
        _JsonResult = []
        _ArrayMUser[_ArrayMUser.length] = st.Plant + '~' + st.GroupId;
        array_JsonResult[array_JsonResult.length] = _ArrayMUser;
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
    ManageGroup.Arr = _JsonResult[0]
    console.log(_JsonResult)
}



ManageGroup.EventDelete = function () {
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Group?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        ManageGroup.Delete(ManageGroup.Arr)
    });
}

ManageGroup.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteManageGroup",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                ManageGroup.GetData();
            }
            else
            {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


ManageGroup.EventAdd =  function()
{
    $('.MasterUserDefault').hide()
    $('.MasterUserAddNew').hide()
    $('.additionalUser').hide()
    $('.MasterUserManageGroup').hide()
    $('.MasterManageGroupAddNew').show()
    ManageGroup.GetPlantModal()
}
ManageGroup.EventCancel = function () {
    $('.MasterUserDefault').hide()
    $('.MasterUserAddNew').hide()
    $('.additionalUser').hide()
    $('.MasterUserManageGroup').show()
    $('.MasterManageGroupAddNew').hide()
    MasterDataMUser.EmptyItem()
}



ManageGroup.GetPlantModal = function () {
    var cbbPlant = $('#cbbPlantManageGroupAdd');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>Choose Plant</option>");
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



ManageGroup.OnchangeMUser = function () {
    var ValPlant = $('#cbbPlantManageGroupAdd').val();
    var ValGroupId = document.getElementById("txtGroupId").value;
    $.ajax({
        url: "../MasterData/CheckGroupExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            GroupId: ValGroupId
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSubmitManageGroup").attr('disabled', 'disabled')
                    $("#errGroupIdManageGroup").removeAttr("hidden");
                    var error = $('#errGroupIdManageGroup')
                    error.empty();
                    error.append('Group Id already exist')
                }
                else {
                    $("#BtnSubmitManageGroup").removeAttr('disabled')
                    $("#errGroupIdManageGroup").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

ManageGroup.EventSubmit =  function ()
{
    var ValPlant = $('#cbbPlantManageGroupAdd').val()
    var ValGroupId = document.getElementById("txtGroupId").value;
    var valGroupName = document.getElementById("txtGroupName").value;

    if (ValPlant == '' || ValPlant == null) {
        $("#errPlantManageGroup").removeAttr("hidden");
    }
    else {
        $("#errPlantManageGroup").attr("hidden", "hidden");
    }

    if (ValGroupId == '' || ValGroupId == null) {
        $("#errGroupIdManageGroup").removeAttr("hidden");
    }
    else {
        $("#errGroupIdManageGroup").attr("hidden", "hidden");
    }

    if (valGroupName == '' || valGroupName == null) {
        $("#errGroupNameManageGroup").removeAttr("hidden");
    }
    else {
        $("#errGroupNameManageGroup").attr("hidden", "hidden");
    }

    if(ValPlant != '' && ValGroupId !='' &&  valGroupName !='')
    {
        var datas = ValPlant
        datas += '~' + ValGroupId
        datas += '~' + valGroupName
        ManageGroup.Submit(datas)
    }
}

ManageGroup.Submit = function(datas)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitGroup",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataMUser.EmptyItem()
                Notification.ShowToast('success', 'Group succesfully add')
                $('.MasterUserDefault').hide()
                $('.MasterUserAddNew').hide()
                $('.MasterUserManageGroup').show()
                $('.MasterManageGroupAddNew').hide()
                ManageGroup.GetData()
            }
            else
            {
                Loading.UnblockPage_()
                Notification.ShowToast('warning', j.Msg)
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

function ManageGroupAccess() { }
ManageGroupAccess.mDataTable = null;

ManageGroupAccess.InitialTable = function () {
    var options = {
        responsive: true,
        //searching: false,   // Search Box will Be Disabled
        info: true,         // Will show "1 to n of n entries" Text at bottom
        lengthChange: false, // Will Disabled Record number per page
        columns: [
           { "data": "FormName" },
           { "data": "Enabled" },
           { "data": "ReadOnly" },
           { "data": "GroupId" },
           { "data": null },
           { "data": null },
        ],
        order: [[0, 'asc']],
        columnDefs: [
        {
            targets: 4,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var checkbox = '<label class="checkbox checkbox-single">'
                if (data.Enabled == 'True') {
                    checkbox += '<input checked type="radio" name="\'chkManageGroupEnabled' + data.FormName + '\'"  value="" class="checkable" onclick="ManageGroupAccess.RadioChecked(\'' + data.GroupId + '\',\'' + data.FormName + '\',\'enabled\')"/>'
                }
                else {
                    checkbox += '<input type="radio" name="\'chkManageGroupEnabled' + data.FormName + '\'"  value="" class="checkable" onclick="ManageGroupAccess.RadioChecked(\'' + data.GroupId + '\',\'' + data.FormName + '\',\'enabled\')"/>'
                }

                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        }, {
            targets: 5,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var checkbox = '<label class="checkbox checkbox-single">'
                if (data.ReadOnly == 'True') {
                    checkbox += '<input checked type="radio" name="\'chkManageGroupEnabled' + data.FormName + '\'" value="" class="checkable" onclick="ManageGroupAccess.RadioChecked(\'' + data.GroupId + '\',\'' + data.FormName + '\',\'ReadOnly\')"/>'
                }
                else {
                    checkbox += '<input type="radio" name="\'chkManageGroupEnabled' + data.FormName + '\'" value="" class="checkable" onclick="ManageGroupAccess.RadioChecked(\'' + data.GroupId + '\',\'' + data.FormName + '\',\'ReadOnly\')"/>'
                }

                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 1,
            visible: false,
            searchable: false
        },
        {
            targets: 2,
            visible: false,
            searchable: false
        },
        {
            targets: 3,
            visible: false,
            searchable: false
        }
        ]
    }

    var Table = $('#MUserGroupAccessTable').DataTable(options);
    ManageGroupAccess.mDataTable = Table;
}


ManageGroupAccess.GetData=  function()
{
    var ValPlant = document.getElementById("txtPlantManageGroup").value
    var ValGroupId = document.getElementById("txtGroupManageGroup").value
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetMUserDataManageGroupAccess",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            GroupId: ValGroupId,
        },
        success: function (j) {
            if (j.Result == true) {
                ManageGroupAccess.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    ManageGroupAccess.mDataTable.row.add(st);
                })
                ManageGroupAccess.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


ManageGroupAccess.RadioChecked = function(GroupId, FormName, Mode)
{
    var datas = document.getElementById("txtPlantManageGroup").value
    datas += '/' + GroupId
    datas += '/' + FormName
    datas += '/' + Mode
    console.log(datas)

    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/UpdateAccess",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {

                Notification.ShowToast('success', 'succesfully update ' + FormName + '')
                Loading.UnblockPage_()
            }
            else
            {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + j.Msg + '')
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



MasterDataMUser.EventAddManageDepartment = function () {
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.MUser').show()
    $('.MasterUserDefault').hide()
    $('.MasterUserManageGroup').hide()
    $('.MUserDepartment').show()
    $('.MUserProduct').hide()
    $('.MUserManageGroup').hide()
    $("#txtHeaderGroupName").html('Add Manage Department')
    $("#BtnSaveModal").attr('hidden', 'hidden')

    document.getElementById("MasterDataForm").value = 'MasterDataMUser'

    var UserId = document.getElementById("txtUserID").value
    var FirstName = document.getElementById("txtFirstName").value
    var LastName = document.getElementById("txtLastName").value
    var Plant = $('#cbbPlantMUserAdd').val()
    
    document.getElementById("txtUserIdModal").value = UserId
    document.getElementById("txtUserNameModal").value = FirstName + ' ' + LastName

    UserDepartment.GetPlantDepartment(Plant)
}

MasterDataMUser.EventAddManageProduct = function () {
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.MUser').show()
    $('.MasterUserDefault').hide()
    $('.MasterUserManageGroup').hide()
    $('.MUserDepartment').hide()
    $('.MUserProduct').show()
    $('.MUserManageGroup').hide()
    $("#txtHeaderGroupName").html('Add Manage Product')
    $("#BtnSaveModal").attr('hidden', 'hidden')
    document.getElementById("MasterDataForm").value = 'MasterDataMUser'

    var UserId = document.getElementById("txtUserID").value
    var FirstName = document.getElementById("txtFirstName").value
    var LastName = document.getElementById("txtLastName").value
    var Plant = $('#cbbPlantMUserAdd').val()

    document.getElementById("txtUserIdModal").value = UserId
    document.getElementById("txtUserNameModal").value = FirstName + ' ' + LastName

    UserDepartment.GetPlantDepartment(Plant)
}



MasterDataMUser.EventAddManageGroupAccess = function () {
    
}



function UserDepartment(){}


UserDepartment.mDataTable = null;

UserDepartment.initialTable = function () {
    var options = {
        //responsive: true,
        bSortCellsTop: true,
        ordering: true,
        fixedHeader: true,
        lengthChange: false,
        searching: false,
        order: [[ 2, "asc" ]],
        columns: [
           { "data": null },
           { "data": "Plant" },
           { "data": "Dept" },
           { "data": "PostBy" },
           { "data": "PostDate" }
        ],
        columnDefs: [
        {
            targets: 0,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="UserDepartment.EventDelete(\'' + data.Plant + '\',\'' + data.Dept + '\')">'
                EditButton += '	<span class="svg-icon svg-icon-md">'
                EditButton += '<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'
                EditButton += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                EditButton += '<rect x="0" y="0" width="24" height="24"/>'
                EditButton += '<path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"/>'
                EditButton += '<path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>'
                EditButton += '</g>'
                EditButton += '</svg>'
                EditButton += '</span>'
                EditButton += '</a>'
                return EditButton
            },
        }]
    }
    var Table = $('#MDepartmentTable').DataTable(options);
    UserDepartment.mDataTable = Table;

}


UserDepartment.GetPlantDepartment = function (Plant) {
    var cbbPlant = $('#cbbPlantMUserModal');
    cbbPlant.empty();
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
                if (Plant != '') {
                    $('#cbbPlantMUserModal option[value="' + Plant + '"]').attr('selected', 'selected');
                }
                Loading.UnblockPage_()
                UserDepartment.GetDepartment()
                UserProduct.GetProduct()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

UserDepartment.OnChangePlant = function()
{
    UserDepartment.GetDepartment()
    UserProduct.GetProduct()
}



UserDepartment.GetDepartment = function () {
    var cbbDept = $('#cbbDepartmentMUserModal');
    var ValPlant = $('#cbbPlantMUserModal').val()
    cbbDept.empty();
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
                    cbbDept.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                UserDepartment.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


UserDepartment.GetData = function () {
    var UserId = document.getElementById("txtUserIdModal").value
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetUserDepartment",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                UserDepartment.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    UserDepartment.mDataTable.row.add(st);
                })
                UserDepartment.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


UserDepartment.EventDelete = function(Plant,Department)
{
    var UserId = document.getElementById("txtUserIdModal").value
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/DeleteUserDepartment",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId,
            Plant: Plant,
            Department: Department
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                UserDepartment.GetData()
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

UserDepartment.EventAdd = function()
{
    var UserId = document.getElementById("txtUserIdModal").value
    var ValPlant = $('#cbbPlantMUserModal').val()
    var ValDepartment = $('#cbbDepartmentMUserModal').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/CheckUserDepartment",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId,
            Plant: ValPlant,
            Department: ValDepartment
        },
        success: function (j) {
            if (j.Result == true) {
                Loading.UnblockPage_()
                if(j.Data[0] == true)
                {
                    Notification.ShowToast('warning', 'Deparment already exist')
                }
                else
                {
                    UserDepartment.Submit(UserId, ValPlant, ValDepartment)
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

}

UserDepartment.Submit =  function(UserId, Plant,Department)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitDepartmentUser",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId,
            Plant: Plant,
            Department: Department
        },
        success: function (j) {
            if (j.Result == true) {
                Loading.UnblockPage_()
                Notification.ShowToast('success', 'succesfully submit')
                UserDepartment.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


UserDepartment.EvendAddAll = function () {
    var UserId = document.getElementById("txtUserIdModal").value
    var ValPlant = $('#cbbPlantMUserModal').val()
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitAllDepartmentUser",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId,
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                Loading.UnblockPage_()
                Notification.ShowToast('success', 'succesfully submit')
                UserDepartment.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}




function UserProduct() { }


UserProduct.mDataTable = null;

UserProduct.initialTable = function () {
    var options = {
        //responsive: true,
        bSortCellsTop: true,
        ordering: true,
        fixedHeader: true,
        lengthChange: false,
        searching: false,
        order: [[2, "asc"]],
        columns: [
           { "data": null },
           { "data": "Plant" },
           { "data": "Product" },
           { "data": "PostBy" },
           { "data": "PostDate" }
        ],
        columnDefs: [
        {
            targets: 0,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="UserProduct.EventDelete(\'' + data.Plant + '\',\'' + data.Product + '\')">'
                EditButton += '	<span class="svg-icon svg-icon-md">'
                EditButton += '<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'
                EditButton += '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'
                EditButton += '<rect x="0" y="0" width="24" height="24"/>'
                EditButton += '<path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"/>'
                EditButton += '<path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>'
                EditButton += '</g>'
                EditButton += '</svg>'
                EditButton += '</span>'
                EditButton += '</a>'
                return EditButton
            },
        }]
    }
    var Table = $('#MUserProductTable').DataTable(options);
    UserProduct.mDataTable = Table;

}



UserProduct.GetProduct = function () {
    var cbbProduct = $('#cbbProductMUserModal');
    var ValPlant = $('#cbbPlantMUserModal').val()
    cbbProduct.empty();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbProduct.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                UserProduct.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


UserProduct.GetData = function () {
    var UserId = document.getElementById("txtUserIdModal").value
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetUserProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId
        },
        success: function (j) {
            if (j.Result == true) {
                UserProduct.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    UserProduct.mDataTable.row.add(st);
                })
                UserProduct.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


UserProduct.EventDelete = function (Plant, Product) {
    var UserId = document.getElementById("txtUserIdModal").value
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/DeleteUserProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId,
            Plant: Plant,
            Product: Product
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                UserProduct.GetData()
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


UserProduct.EventAdd = function () {
    var UserId = document.getElementById("txtUserIdModal").value
    var ValPlant = $('#cbbPlantMUserModal').val()
    var ValProduct = $('#cbbProductMUserModal').val();

    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/CheckUserProduct",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId,
            Plant: ValPlant,
            Product: ValProduct
        },
        success: function (j) {
            if (j.Result == true) {
                Loading.UnblockPage_()
                if (j.Data[0] == true) {
                    Notification.ShowToast('error', 'Deparment already exist')
                }
                else {
                    UserProduct.Submit(UserId, ValPlant, ValProduct)
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });

}



UserProduct.Submit = function (UserId, Plant, Product) {
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitProductUser",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId,
            Plant: Plant,
            Product: Product
        },
        success: function (j) {
            if (j.Result == true) {
                Loading.UnblockPage_()
                Notification.ShowToast('success', 'succesfully submit')
                UserProduct.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}



UserProduct.EvendAddAll = function () {
    var UserId = document.getElementById("txtUserIdModal").value
    var ValPlant = $('#cbbPlantMUserModal').val()
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitAllProductUser",
        method: "POST",
        dataType: "JSON",
        data: {
            UserId: UserId,
            Plant: ValPlant
        },
        success: function (j) {
            if (j.Result == true) {
                Loading.UnblockPage_()
                Notification.ShowToast('success', 'succesfully submit')
                UserProduct.GetData()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}