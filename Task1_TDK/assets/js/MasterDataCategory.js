
function MasterDataCategory() { }


MasterDataCategory.ShowCategory = function ()
{
    MasterDataLoad.setDefaulClass()
    MasterDataLoad.hideAllForm()
    $('#BtnCategory').removeClass('btn btn-outline-primary2 btn-lg btn-block').addClass('btn btn-outline-primary2 btn-lg btn-block active')
    $('.Category').show()
    MasterDataCategory.GetPlant()
}



MasterDataCategory.mDataTable = null;

MasterDataCategory.initialTable = function () {
    var options = {
        //responsive: true,
        //bSortCellsTop: true,
        //ordering: true,
        //fixedHeader: true,
        "initComplete": function (settings, json) {
            $("#CategoryTable").wrap("<div style='overflow:auto; width:100%;position:relative;'></div>");
        },
        columns: [
           { "data": null },
           { "data": "Number" },
           { "data": "Plant" },
           { "data": "Category" },
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
                checkbox += '<input type="checkbox" id=\'chkCategory' + data.Number + '\' value="" class="checkable" onclick="MasterDataCategory.CheckboxClick(\'' + data.Number + '\',\'' + data.Plant + '\',\'' + data.Category + '\')"/>'
                checkbox += '<span></span>'
                checkbox += '</label>'
                return checkbox
            },
        },
        {
            targets: 6,
            width: '30px',
            className: 'dt-left',
            orderable: false,
            render: function (data, type, full, meta) {
                var EditButton = '<a href="#" class="text-success font-weight-bold font-size-h9" onclick="MasterDataCategory.EventEdit(\'' + data.Plant + '\',\'' + data.Category + '\')">'
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
    var Table = $('#CategoryTable').DataTable(options);
    MasterDataCategory.mDataTable = Table;

    Table.on('change', '.group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $('#CategoryTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
            }
            else {
                $('#CategoryTable tbody input[type="checkbox"]:checked').trigger('click');
            }
        });
    });

    Table.on('change', 'tbody tr .checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
}


MasterDataCategory.GetPlant = function () {
    var UserPlant = document.getElementById("txtPlantUserCategory").value
    var cbbPlant = $('#cbbPlantCategory');
    cbbPlant.empty();
    cbbPlant.append("<option value=''>All Plant</option>");
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetPlantCategory",
        method: "POST",
        dataType: "JSON",
        success: function (j) {
            if (j.Result == true) {
                $.each(j.Data[0], function (i, st) {
                    cbbPlant.append("<option value=\"" + st + "\">" + st + "</option>")
                });
                Loading.UnblockPage_()
                $('#cbbPlantCategory option[value="' + UserPlant + '"]').attr('selected', 'selected');
                MasterDataCategory.GetData()
                return j.Data;
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}

MasterDataCategory.OnChangePlant = function () {
    MasterDataCategory.GetData()
}



MasterDataCategory.GetData = function () {
    var ValPlant = $('#cbbPlantCategory').val();
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/GetCategoryData",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
        },
        success: function (j) {
            if (j.Result == true) {
                $('.Notdelete').show()
                $('.delete').hide()
                MasterDataCategory.mDataTable.clear();
                $.each(j.Data[0], function (i, st) {
                    MasterDataCategory.mDataTable.row.add(st);
                })
                MasterDataCategory.mDataTable.draw();
                Loading.UnblockPage_()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataCategory.GetPlantModal = function (Plant) {
    var cbbPlant = $('#cbbPlantCategoryModal');
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
                    $('#cbbPlantCategoryModal option[value="' + Plant + '"]').attr('selected', 'selected');
                    $("#cbbPlantCategoryModal").attr('disabled', 'disabled')
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


MasterDataCategory.OnchangeCategory = function ()
{
    var ValPlant = $('#cbbPlantCategoryModal').val()
    var ValCategory = document.getElementById("txtCategory").value;
    $.ajax({
        url: "../MasterData/CheckCategoryExist",
        method: "POST",
        dataType: "JSON",
        data: {
            Plant: ValPlant,
            Category: ValCategory
        },
        success: function (j) {
            if (j.Result == true) {
                console.log(j.Data[0])
                if (j.Data[0] == true) {
                    $("#BtnSaveModal").attr('disabled', 'disabled')
                    $("#errCategory").removeAttr("hidden");
                    var error = $('#errCategory')
                    error.empty();
                    error.append('Category already exist')
                }
                else {
                    $("#BtnSaveModal").removeAttr('disabled')
                    $("#errCategory").attr("hidden", "hidden");
                }
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataCategory.EventAdd = function()
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Category').show()
    $("#txtHeaderGroupName").html('Add Category')
    $("#BtnSaveModal").html('Save')
    document.getElementById("MasterDataForm").value = 'MasterDataCategory'
    MasterDataCategory.GetPlantModal('')
}


MasterDataCategory.EventDelete= function()
{
    swal.fire({
        title: 'Delete',
        html: 'Are you sure want to delete this Category?',
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        button: "ok",
    });
    $('.swal2-confirm').click(function () {
        MasterDataCategory.Delete(MasterDataCategory.Arr)
    });
}

MasterDataCategory.Delete = function (PrimaryKey) {
    $.ajax({
        url: "../MasterData/DeleteCategory",
        method: "POST",
        dataType: "JSON",
        data: {
            PrimaryKey: PrimaryKey
        },
        success: function (j) {
            if (j.Result == true) {
                Notification.ShowToast('success', 'Succesfully delete')
                MasterDataCategory.GetData();
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}


MasterDataCategory.CheckboxClick = function(Number,Plant,Category)
{
    var ckbox = $('#chkCategory' + Number + '');
    var Checked = 0;
    if (ckbox.is(':checked')) {
        Checked = 1
    }
    else {
        Checked = 0
    }
    MasterDataCategory.CollectData(Number, Plant, Category, Checked)
}

MasterDataCategory.ListCategory = []
MasterDataCategory.Arr = ""
MasterDataCategory.CollectData = function (Number, Plant, Category, Checked) {
    MasterDataCategory.Arr = ""
    // replace data with same ID
    for (var i = 0; i < MasterDataCategory.ListCategory.length; i++) {
        if (parseInt(MasterDataCategory.ListCategory[i].Number) == parseInt(Number)) {
            MasterDataCategory.ListCategory.splice(i, 1);
            break;
        }
    }
    var tr;
    tr = '{'
    tr += '\"Number\":\"' + Number + '\",'
    tr += '\"Plant\":\"' + Plant + '\",'
    tr += '\"Category\":\"' + Category + '\",'
    tr += '\"Checked\":\"' + Checked + '\"'
    tr += '}'
    MasterDataCategory.ListCategory.push(JSON.parse(tr))
    // delete array when checkbox not checked
    for (var i = 0; i < MasterDataCategory.ListCategory.length; i++) {
        if (parseInt(MasterDataCategory.ListCategory[i].Checked) == parseInt(0)) {
            MasterDataCategory.ListCategory.splice(i, 1);
            break;
        }
    }
    var _ArrayCategory = []
    var array_JsonResult = []
    var _JsonResult = []
    $.each(MasterDataCategory.ListCategory, function (i, st) {
        _ArrayCategory = []
        _JsonResult = []
        _ArrayCategory[_ArrayCategory.length] = st.Plant + '/' + st.Category;
        array_JsonResult[array_JsonResult.length] = _ArrayCategory;
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
    MasterDataCategory.Arr = _JsonResult[0]
    console.log(_JsonResult)
}

MasterDataCategory.EventEdit =  function(Plant,Category)
{
    $("#ModalMasterData").modal('show');
    MasterDataLoad.hideAllForm()
    $('.Category').show()
    $("#txtHeaderGroupName").html('Update Category')
    $("#BtnSaveModal").html('Update')
    document.getElementById("MasterDataForm").value = 'MasterDataCategory'
    MasterDataCategory.GetPlantModal(Plant)
    document.getElementById("txtCategory").value = Category
    document.getElementById("OldCategory").value = Category

}



MasterDataCategory.EmptyItem = function()
{
    $('#cbbPlantCategoryModal option[value=""]').attr('selected', 'selected');
    document.getElementById("txtCategory").value = ''
    document.getElementById("OldCategory").value = ''

    $("#cbbPlantCategoryModal").removeAttr('disabled')

    $("#errPlantCategory").attr("hidden", "hidden");
    $("#errCategory").attr("hidden", "hidden");
    $("#errCategoryName").attr("hidden", "hidden");
    $("#BtnSaveModal").removeAttr('disabled')
}


MasterDataCategory.Submit = function (datas, ValCondition)
{
    Loading.BlockPage()
    $.ajax({
        url: "../MasterData/SubmitCategory",
        method: "POST",
        dataType: "JSON",
        data: {
            datas: datas
        },
        success: function (j) {
            if (j.Result == true) {
                MasterDataCategory.EmptyItem()
                Notification.ShowToast('success', 'Category ' + ValCondition + ' succesfully')
                $("#ModalMasterData").modal('hide');
                MasterDataCategory.GetPlant()
            }
        },
        error: function (xhr, error, text) {
            Loading.UnblockPage_()
            Notification.ShowToast('error', '' + error + '')
        }
    });
}
