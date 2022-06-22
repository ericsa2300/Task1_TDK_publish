$(document).ready(function () {
    Loading.UnblockPage_()
    $('#MasterMasterData').removeClass('menu-item menu-item-submenu').addClass('menu-item menu-item-active')

    MasterDataIssueFocus.initialTable()
    MasterDataPeriod.initialTable()
    MasterDataDepartment.initialTable()
    MasterDataCriteria.initialTable()
    MasterDataHoliday.initialTable()
    MasterDataVendor.initialTable()
    MasterDataProduct.initialTable()
    MasterDataPlant.initialTable()
    MasterDataProcessOwner.initialTable()
    MasterDataLine.initialTable()
    MasterDataModel.initialTable()
    MasterDataCategory.initialTable()
    MasterDataLineProcess.initialTable()
    MasterDataMUser.initialTable()
    UserDepartment.initialTable()
    UserProduct.initialTable()
    ManageGroup.initialTable()
    ManageGroupAccess.InitialTable()
    MasterDataVendorProcess.initialTable()
    MasterDataLayout.initialTable()
    MasterDataChecklist.initialTable()

    MasterDataLoad.hideAllForm()
    var button = document.getElementById("BtnIssueFocus");
    button.click();

    $('.Notdelete').show()
    $('.delete').hide()
});
                           


function MasterDataLoad(){}


MasterDataLoad.EventSubmit = function () {
    var ValForm = document.getElementById("MasterDataForm").value;
    if (ValForm == 'MasterDataIssueFocus')
    {
        var ValPlant = $('#cbbPlantIssueFocusModal').val()
        var ValIssueFocus = document.getElementById("txtIssueFocus").value;
        var ValOldIssueFocus = document.getElementById("OldtxtIssueFocus").value;
        var ValMailAcknowledgement = document.getElementById("txtMailAcknowledgement").value;
        var Condition = $('#BtnSaveModal').text()

        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantIssueFocus").removeAttr("hidden");
        }
        else {
            $("#errPlantIssueFocus").attr("hidden", "hidden");
        }

        if (ValIssueFocus == '' || ValIssueFocus == null) {
            $("#errIssueFocus").removeAttr("hidden");
        }
        else {
            $("#errIssueFocus").attr("hidden", "hidden");
        }

        if (ValPlant != '' && ValIssueFocus != '') {
            var datas = ValPlant + '~' + ValIssueFocus + '~' + ValOldIssueFocus + '~' + ValMailAcknowledgement + '~' + Condition
            MasterDataIssueFocus.Submit(datas,Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataPeriod')
    {
        var ValPlant = $('#cbbPlantPeriodModal').val()
        var Valperiod = document.getElementById("txtPeriod").value;
        var ValOldPeriod = document.getElementById("OldtxtPeriod").value;
        var ValStartDate = $('#StartDate').val()
        var ValEndDate = $('#EndDate').val()
        var Condition = $('#BtnSaveModal').text()

        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantPeriod").removeAttr("hidden");
        }
        else {
            $("#errPlantPeriod").attr("hidden", "hidden");
        }

        if (Valperiod == '' || Valperiod == null) {
            $("#errPeriod").removeAttr("hidden");
        }
        else {
            $("#errPeriod").attr("hidden", "hidden");
        }

        if (ValStartDate == '' || ValStartDate == null) {
            $("#errPeriodStartDate").removeAttr("hidden");
        }
        else {
            $("#errPeriodStartDate").attr("hidden", "hidden");
        }

        if (ValEndDate == '' || ValEndDate == null) {
            $("#errPeriodEndDate").removeAttr("hidden");
        }
        else {
            $("#errPeriodEndDate").attr("hidden", "hidden");
        }

        if (ValPlant != '' && Valperiod != '' && ValStartDate != '' && ValEndDate !='') {
            var datas = ValPlant + '~' + Valperiod + '~' + ValOldPeriod + '~' + ValStartDate + '~' + ValEndDate + '~' + Condition
            MasterDataPeriod.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataDepartment')
    {
        var ValPlant = $('#cbbPlantDepartmentModal').val()
        var ValDepartment = document.getElementById("txtDepartment").value;
        var ValOldDepartment = document.getElementById("OldDepartment").value;
        var ValDepartmentName = document.getElementById("txtDepartmentName").value;
        var Condition = $('#BtnSaveModal').text()

        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantDepartment").removeAttr("hidden");
        }
        else {
            $("#errPlantDepartment").attr("hidden", "hidden");
        }

        if (ValDepartment == '' || ValDepartment == null) {
            $("#errDepartment").removeAttr("hidden");
        }
        else {
            $("#errDepartment").attr("hidden", "hidden");
        }
        if (ValDepartmentName == '' || ValDepartmentName == null) {
            $("#errDepartmentName").removeAttr("hidden");
        }
        else {
            $("#errDepartmentName").attr("hidden", "hidden");
        }

        if (ValPlant != '' && ValDepartment != '' && ValDepartmentName != '') {
            var datas = ValPlant + '~' + ValDepartment + '~' + ValOldDepartment + '~' + ValDepartmentName + '~' + Condition
            MasterDataDepartment.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataCriteria') {
        var ValPlant = $('#cbbPlantCriteriaModal').val()
        var ValCriteria = document.getElementById("txtCriteria").value;
        var ValOldCriteria = document.getElementById("OldCriteria").value;
        var Condition = $('#BtnSaveModal').text()

        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantCriteria").removeAttr("hidden");
        }
        else {
            $("#errPlantCriteria").attr("hidden", "hidden");
        }

        if (ValCriteria == '' || ValCriteria == null) {
            $("#errCriteria").removeAttr("hidden");
        }
        else {
            $("#errCriteria").attr("hidden", "hidden");
        }

        if (ValPlant != '' && ValCriteria != '') {
            var datas = ValPlant + '~' + ValCriteria + '~' + ValOldCriteria + '~' + Condition
            MasterDataCriteria.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataHoliday') {
        var ValPlant = $('#cbbPlantHolidayModal').val()
        var ValHoliday = document.getElementById("txtHoliday").value;
        var ValOldHoliday = document.getElementById("OldHoliday").value;
        var ValHolidayName = document.getElementById("txtHolidayName").value;
        var Condition = $('#BtnSaveModal').text()

        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantHoliday").removeAttr("hidden");
        }
        else {
            $("#errPlantHoliday").attr("hidden", "hidden");
        }

        if (ValHoliday == '' || ValHoliday == null) {
            $("#errHoliday").removeAttr("hidden");
        }
        else {
            $("#errHoliday").attr("hidden", "hidden");
        }
        if (ValHolidayName == '' || ValHolidayName == null) {
            $("#errHolidayName").removeAttr("hidden");
        }
        else {
            $("#errHolidayName").attr("hidden", "hidden");
        }

        if (ValPlant != '' && ValHoliday != '' && ValHolidayName != '') {
            var datas = ValPlant + '^' + ValHoliday + '^' + ValOldHoliday + '^' + ValHolidayName + '^' + Condition
            MasterDataHoliday.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataVendor') {
        var ValPlant = $('#cbbPlantVendorModal').val()
        var ValVendor = document.getElementById("txtVendor").value;
        var ValOldVendor = document.getElementById("OldVendor").value;
        var ValVendorName = document.getElementById("txtVendorName").value;
        var ValVendoMail1 = document.getElementById("txtVendorMail1").value;
        var ValVendorMail2 = document.getElementById("txtVendorMail2").value;
        var Condition = $('#BtnSaveModal').text()


        var ckbox = $('#ChkActiveVendor');
        var valueChk
        if (ckbox.is(':checked')) {
           valueChk = 1
        } else {
            valueChk = 0
        }
        console.log(valueChk)

        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantVendor").removeAttr("hidden");
        }
        else {
            $("#errPlantVendor").attr("hidden", "hidden");
        }

        if (ValVendor == '' || ValVendor == null) {
            $("#errVendor").removeAttr("hidden");
        }
        else {
            $("#errVendor").attr("hidden", "hidden");
        }
        if (ValVendorName == '' || ValVendorName == null) {
            $("#errVendorName").removeAttr("hidden");
        }
        else {
            $("#errVendorName").attr("hidden", "hidden");
        }
        if (ValVendoMail1 == '' || ValVendoMail1 == null) {
            $("#errVendorMail1").removeAttr("hidden");
        }
        else {
            $("#errVendorMail1").attr("hidden", "hidden");
        }

        if (ValPlant != '' && ValVendor != '' && ValVendorName != '' && ValVendoMail1 != '') {
            var datas = ValPlant + '~' + ValVendor + '~' + ValOldVendor + '~' + ValVendorName + '~' + ValVendoMail1 + '~' + ValVendorMail2 + '~' + valueChk + '~' + Condition
            MasterDataVendor.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataProduct') {
        var ValPlant = $('#cbbPlantProductModal').val()
        var ValProduct = document.getElementById("txtProduct").value;
        var ValOldProduct = document.getElementById("OldProduct").value;
        var ValProductName = document.getElementById("txtProductName").value;
        var Condition = $('#BtnSaveModal').text()


        var ckbox = $('#ChkActiveProduct');
        var valueChk
        if (ckbox.is(':checked')) {
            valueChk = 1
        } else {
            valueChk = 0
        }
        console.log(valueChk)

        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantProduct").removeAttr("hidden");
        }
        else {
            $("#errPlantProduct").attr("hidden", "hidden");
        }

        if (ValProduct == '' || ValProduct == null) {
            $("#errProduct").removeAttr("hidden");
        }
        else {
            $("#errProduct").attr("hidden", "hidden");
        }
        if (ValProductName == '' || ValProductName == null) {
            $("#errProductName").removeAttr("hidden");
        }
        else {
            $("#errProductName").attr("hidden", "hidden");
        }


        if (ValPlant != '' && ValProduct != '' && ValProductName != '') {
            var datas = ValPlant 
                datas += '~' + ValProduct
                datas += '~' + ValOldProduct
                datas += '~' + ValProductName
                datas += '~' + valueChk
                datas += '~' + Condition
            MasterDataProduct.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataPlant') {
        var ValPlant = document.getElementById("txtPlant").value;
        var ValOldPlant = document.getElementById("OldPlant").value;
        var ValPlantName = document.getElementById("txtPlantName").value;
        var Condition = $('#BtnSaveModal').text()


        var ckbox = $('#ChkActivePlant');
        var valueChk
        if (ckbox.is(':checked')) {
            valueChk = 1
        } else {
            valueChk = 0
        }
        var ckboxVendor = $('#ChkActivePlantVendor');
        var valueChkVendor
        if (ckboxVendor.is(':checked')) {
            valueChkVendor = 1
        } else {
            valueChkVendor = 0
        }
        console.log(valueChkVendor)


        if (ValPlant == '' || ValPlant == null) {
            $("#errPlant").removeAttr("hidden");
        }
        else {
            $("#errPlant").attr("hidden", "hidden");
        }
        if (ValPlantName == '' || ValPlantName == null) {
            $("#errPlantName").removeAttr("hidden");
        }
        else {
            $("#errPlantName").attr("hidden", "hidden");
        }


        if (ValPlant != '' && ValPlantName != '') {
            var datas = ValPlant
            datas += '~' + ValOldPlant
            datas += '~' + ValPlantName
            datas += '~' + valueChk
            datas += '~' + valueChkVendor
            datas += '~' + Condition
            MasterDataPlant.Submit(datas, Condition)
            console.log(datas)
        }
        
    }
    else if (ValForm == 'MasterDataProcessOwner') {
        var ValPlant = $('#cbbPlantProcessOwnerModal').val()
        var ValProcessOwner = document.getElementById("txtProcessOwner").value;
        var ValOldProcessOwner = document.getElementById("OldProcessOwner").value;
        var Condition = $('#BtnSaveModal').text()

        var ckboxMultipleFinding = $('#ChkActiveProcessOwnerMultipleFinding');
        var valueChkMultipleFinding
        if (ckboxMultipleFinding.is(':checked')) {
            valueChkMultipleFinding = 1
        } else {
            valueChkMultipleFinding = 0
        }
        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantProcessOwner").removeAttr("hidden");
        }
        else {
            $("#errPlantProcessOwner").attr("hidden", "hidden");
        }

        if (ValProcessOwner == '' || ValProcessOwner == null) {
            $("#errProcessOwner").removeAttr("hidden");
        }
        else {
            $("#errProcessOwner").attr("hidden", "hidden");
        }


        if (ValPlant != '' && ValProcessOwner != '') {
            var datas = ValPlant
            datas += '~' + ValProcessOwner
            datas += '~' + ValOldProcessOwner
            datas += '~' + valueChkMultipleFinding
            datas += '~' + Condition
            MasterDataProcessOwner.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataLine') {
        var ValPlant = $('#cbbPlantLineModal').val()
        var ValDepartment = $('#cbbDepartmentLineModal').val()
        var ValLineID = document.getElementById("txtLine").value;
        var ValOldLine = document.getElementById("OldLine").value;
        var ValLineDescription = document.getElementById("txtLineDescription").value;
        var Condition = $('#BtnSaveModal').text()

        var ChkActiveLine = $('#ChkActiveLine');
        var valuechk
        if (ChkActiveLine.is(':checked')) {
            valuechk = 1
        } else {
            valuechk = 0
        }
        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantLine").removeAttr("hidden");
        }
        else {
            $("#errPlantLine").attr("hidden", "hidden");
        }
        if (ValDepartment == '' || ValDepartment == null) {
            $("#errDepartmentLine").removeAttr("hidden");
        }
        else {
            $("#errDepartmentLine").attr("hidden", "hidden");
        }

        if (ValLineID == '' || ValLineID == null) {
            $("#errLine").removeAttr("hidden");
        }
        else {
            $("#errLine").attr("hidden", "hidden");
        }
        if (ValLineDescription == '' || ValLineDescription == null) {
            $("#errLineDescription").removeAttr("hidden");
        }
        else {
            $("#errLineDescription").attr("hidden", "hidden");
        }


        if (ValPlant != '' && ValDepartment != '' && ValLineID != '' && ValLineDescription != '') {
            var datas = ValPlant
            datas += '~' + ValDepartment
            datas += '~' + ValLineID
            datas += '~' + ValOldLine
            datas += '~' + ValLineDescription
            datas += '~' + valuechk
            datas += '~' + Condition
            MasterDataLine.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataModel') {
        var ValPlant = $('#cbbPlantModelModal').val()
        var ValProduct = $('#cbbProductModelModal').val()
        var ValModelID = document.getElementById("txtModel").value;
        var ValOldModel = document.getElementById("OldModel").value;
        var ValModelDescription = document.getElementById("txtModelDescription").value;
        var Condition = $('#BtnSaveModal').text()

        var ChkActiveModel = $('#ChkActiveModel');
        var valuechk
        if (ChkActiveModel.is(':checked')) {
            valuechk = 1
        } else {
            valuechk = 0
        }
        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantModel").removeAttr("hidden");
        }
        else {
            $("#errPlantModel").attr("hidden", "hidden");
        }
        if (ValProduct == '' || ValProduct == null) {
            $("#errProductModel").removeAttr("hidden");
        }
        else {
            $("#errProductModel").attr("hidden", "hidden");
        }

        if (ValModelID == '' || ValModelID == null) {
            $("#errModel").removeAttr("hidden");
        }
        else {
            $("#errModel").attr("hidden", "hidden");
        }
        if (ValModelDescription == '' || ValModelDescription == null) {
            $("#errModelDescription").removeAttr("hidden");
        }
        else {
            $("#errModelDescription").attr("hidden", "hidden");
        }


        if (ValPlant != '' && ValProduct != '' && ValModelID != '' && ValModelDescription != '') {
            var datas = ValPlant
            datas += '~' + ValProduct
            datas += '~' + ValModelID
            datas += '~' + ValOldModel
            datas += '~' + ValModelDescription
            datas += '~' + valuechk
            datas += '~' + Condition
            MasterDataModel.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataCategory') {
        var ValPlant = $('#cbbPlantCategoryModal').val()
        var ValCategory = document.getElementById("txtCategory").value;
        var ValOldCategory = document.getElementById("OldCategory").value;
        var Condition = $('#BtnSaveModal').text()

        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantCategory").removeAttr("hidden");
        }
        else {
            $("#errPlantCategory").attr("hidden", "hidden");
        }

        if (ValCategory == '' || ValCategory == null) {
            $("#errCategory").removeAttr("hidden");
        }
        else {
            $("#errCategory").attr("hidden", "hidden");
        }

        if (ValPlant != '' && ValCategory != '') {
            var datas = ValPlant 
            datas += '~' + ValCategory
            datas += '~' + ValOldCategory
            datas += '~' + Condition
            MasterDataCategory.Submit(datas, Condition)
            console.log(datas)
        }
    }
    else if (ValForm == 'MasterDataLineProcess') {
        var ValPlant = $('#cbbPlantLineProcessModal').val()
        var ValProduct = $('#cbbProductLineProcessModal').val()
        var ValLineProcessID = document.getElementById("txtLineProcess").value;
        var ValOldLineProcess = document.getElementById("OldLineProcess").value;
        var ValLineProcessDescription = document.getElementById("txtLineProcessDescription").value;
        var Condition = $('#BtnSaveModal').text()

        var ChkActiveLineProcess = $('#ChkActiveLineProcess');
        var valuechk
        if (ChkActiveLineProcess.is(':checked')) {
            valuechk = 1
        } else {
            valuechk = 0
        }
        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantLineProcess").removeAttr("hidden");
        }
        else {
            $("#errPlantLineProcess").attr("hidden", "hidden");
        }
        if (ValProduct == '' || ValProduct == null) {
            $("#errProductLineProcess").removeAttr("hidden");
        }
        else {
            $("#errProductLineProcess").attr("hidden", "hidden");
        }

        if (ValLineProcessID == '' || ValLineProcessID == null) {
            $("#errLineProcess").removeAttr("hidden");
        }
        else {
            $("#errLineProcess").attr("hidden", "hidden");
        }
        if (ValLineProcessDescription == '' || ValLineProcessDescription == null) {
            $("#errLineProcessDescription").removeAttr("hidden");
        }
        else {
            $("#errLineProcessDescription").attr("hidden", "hidden");
        }


        if (ValPlant != '' && ValProduct != '' && ValLineProcessID != '' && ValLineProcessDescription != '') {
            var datas = ValPlant
            datas += '~' + ValProduct
            datas += '~' + ValLineProcessID
            datas += '~' + ValOldLineProcess
            datas += '~' + ValLineProcessDescription
            datas += '~' + valuechk
            datas += '~' + Condition
            MasterDataLineProcess.Submit(datas, Condition)
            console.log(datas)
        }
    }

    else if (ValForm == 'MasterDataMUser') {
        var ValPlant = $('#cbbPlantMUserAdd').val()
        var ValUserID = document.getElementById("txtUserID").value;
        var ValUserIDOld = document.getElementById("tUserIDold").value;
        var ValFirstName = document.getElementById("txtFirstName").value;
        var ValLastName = document.getElementById("txtLastName").value;
        var ValGroupID = $('#cbbGroupID').val()
        var ValPassword = document.getElementById("txtPassword").value;
        var ValRePassword = document.getElementById("txtRePassword").value;
        var ValWindowsID = document.getElementById("txtWindowsID").value;
        var ValEmail = document.getElementById("txtEmail").value;
        var ValVendor = $('#cbbVendorUser').val()
        var Condition = $('#BtnSubmitUser').text()

        var ChkActiveMUserVendor = $('#ChkActiveMUserVendor');
        var valuechk
        if (ChkActiveMUserVendor.is(':checked')) {
            valuechk = 1
        } else {
            valuechk = 0
        }


        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantAdd").removeAttr("hidden");
        }
        else {
            $("#errPlantAdd").attr("hidden", "hidden");
        }

        if (ValUserID == '' || ValUserID == null) {
            $("#errUserID").removeAttr("hidden");
        }
        else {
            $("#errUserID").attr("hidden", "hidden");
        }
        if (ValFirstName == '' || ValFirstName == null) {
            $("#errFirstName").removeAttr("hidden");
        }
        else {
            $("#errFirstName").attr("hidden", "hidden");
        }
        if (ValGroupID == '' || ValGroupID == null) {
            $("#errGroupID").removeAttr("hidden");
        }
        else {
            $("#errGroupID").attr("hidden", "hidden");
        }
        
        if (ValEmail == '' || ValEmail == null) {
            $("#errEmail").removeAttr("hidden");
        }
        else {
            $("#errEmail").attr("hidden", "hidden");
        }


        if (Condition != 'Update')
        {
            if (ValPassword == '' || ValPassword == null) {
                $("#errPassword").removeAttr("hidden");
            }
            else {
                $("#errPassword").attr("hidden", "hidden");
            }
            if (ValRePassword == '' || ValRePassword == null) {
                $("#errRePassword").removeAttr("hidden");
            }
            else {
                $("#errRePassword").attr("hidden", "hidden");
            }
            if (ValPlant != '' && ValUserID != '' && ValFirstName != '' && ValGroupID != '' && ValPassword != '' && ValRePassword != '' && ValEmail != '') {
                var datas
                if (valuechk == 1)
                {
                    if(ValVendor != '')
                    {
                        $("#errVendorUser").attr("hidden", "hidden");
                        datas = ValPlant
                        datas += '~' + ValUserID
                        datas += '~' + ValUserIDOld
                        datas += '~' + ValFirstName
                        datas += '~' + ValLastName
                        datas += '~' + ValGroupID
                        datas += '~' + ValPassword
                        datas += '~' + ValWindowsID
                        datas += '~' + ValEmail
                        datas += '~' + ValVendor
                        datas += '~' + Condition
                        MasterDataMUser.Submit(datas, Condition)
                        console.log(datas)
                    }
                    else
                    {
                        $("#errVendorUser").removeAttr("hidden");
                    }

                }
                else
                {
                    ValVendor = ''
                    datas = ValPlant
                    datas += '~' + ValUserID
                    datas += '~' + ValUserIDOld
                    datas += '~' + ValFirstName
                    datas += '~' + ValLastName
                    datas += '~' + ValGroupID
                    datas += '~' + ValPassword
                    datas += '~' + ValWindowsID
                    datas += '~' + ValEmail
                    datas += '~' + ValVendor
                    datas += '~' + Condition
                    MasterDataMUser.Submit(datas, Condition)
                    console.log(datas)
                }
                 
            }
        }
        else
        {
            if (ValPlant != '' && ValUserID != '' && ValFirstName != '' && ValGroupID != '' &&  ValEmail != '') {
                var datas
                if (valuechk == 1) {
                    if (ValVendor != '') {
                        $("#errVendorUser").attr("hidden", "hidden");
                        datas = ValPlant
                        datas += '~' + ValUserID
                        datas += '~' + ValUserIDOld
                        datas += '~' + ValFirstName
                        datas += '~' + ValLastName
                        datas += '~' + ValGroupID
                        datas += '~' + ValPassword
                        datas += '~' + ValWindowsID
                        datas += '~' + ValEmail
                        datas += '~' + ValVendor
                        datas += '~' + Condition
                        MasterDataMUser.Submit(datas, Condition)
                        console.log(datas)
                    }
                    else {
                        $("#errVendorUser").removeAttr("hidden");
                    }

                }
                else {
                    ValVendor = ''

                    datas = ValPlant
                    datas += '~' + ValUserID
                    datas += '~' + ValUserIDOld
                    datas += '~' + ValFirstName
                    datas += '~' + ValLastName
                    datas += '~' + ValGroupID
                    datas += '~' + ValPassword
                    datas += '~' + ValWindowsID
                    datas += '~' + ValEmail
                    datas += '~' + ValVendor
                    datas += '~' + Condition
                    MasterDataMUser.Submit(datas, Condition)
                    console.log(datas)
                }
            }
        }

        
    }

    else if (ValForm == 'MasterDataVendorProcess') {
        var ValPlant = $('#cbbPlantVendorProcessModal').val()
        var ValProcessOwner = $('#cbbProcessOwnerVendorProcessModal').val()
        var ValVendorCode = $('#cbbVendorVendorProcessModal').val()
        var ValVendorProcess = document.getElementById("txtVendorProcess").value;
        var ValVendorProcessOld = document.getElementById("OldVendorProcess").value;
        var Condition = $('#BtnSaveModal').text()

        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantVendor").removeAttr("hidden");
        }
        else {
            $("#errPlantVendor").attr("hidden", "hidden");
        }
        if (ValProcessOwner == '' || ValProcessOwner == null) {
            $("#errProcessOwnerVendorProcess").removeAttr("hidden");
        }
        else {
            $("#errProcessOwnerVendorProcess").attr("hidden", "hidden");
        }

        if (ValVendorCode == '' || ValVendorCode == null) {
            $("#errVendorVendorProcess").removeAttr("hidden");
        }
        else {
            $("#errVendorVendorProcess").attr("hidden", "hidden");
        }
        if (ValVendorProcess == '' || ValVendorProcess == null) {
            $("#errVendorProcess").removeAttr("hidden");
        }
        else {
            $("#errVendorProcess").attr("hidden", "hidden");
        }


        if (ValPlant != '' && ValProcessOwner != '' && ValVendorCode != '' && ValVendorProcess != '') {
            var datas = ValPlant
            datas += '~' + ValProcessOwner
            datas += '~' + ValVendorCode
            datas += '~' + ValVendorProcess
            datas += '~' + ValVendorProcessOld
            datas += '~' + Condition
            MasterDataVendorProcess.Submit(datas, Condition)
            console.log(datas)
        }
    }

    else if (ValForm == 'MasterDataChecklist') {
        var ValPlant = $('#cbbPlantChecklistModal').val()
        var ValProcessOwner = $('#cbbProcessOwnerChecklistModal').val()
        var ValDepartment = $('#cbbDepartmentChecklistModal').val()
        var ValArea = document.getElementById("txtAreaChecklist").value;
        var ValMainScope = document.getElementById("txtMainScopeChecklist").value;
        var ValSubScope = document.getElementById("txtSubScopeChecklist").value;
        var ValMinScore = document.getElementById("txtMinScoreChecklist").value;
        var ValMaxScore= document.getElementById("txtMaxScoreChecklist").value;
        var ValTargetScore= document.getElementById("txtTargetScoreChecklist").value;
        var ValId = document.getElementById("IdCheclist").value;
        var Condition = $('#BtnSaveModal').text()

       
        if (ValPlant == '' || ValPlant == null) {
            $("#errPlantChecklist").removeAttr("hidden");
        }
        else {
            $("#errPlantChecklist").attr("hidden", "hidden");
        }
        if (ValProcessOwner == '' || ValProcessOwner == null) {
            $("#errProcessOwnerChecklist").removeAttr("hidden");
        }
        else {
            $("#errProcessOwnerChecklist").attr("hidden", "hidden");
        }
        if (ValDepartment == '' || ValDepartment == null) {
            $("#errDepartmentChecklist").removeAttr("hidden");
        }
        else {
            $("#errDepartmentChecklist").attr("hidden", "hidden");
        }

        if (ValArea == '' || ValArea == null) {
            $("#errAreaChecklist").removeAttr("hidden");
        }
        else {
            $("#errAreaChecklist").attr("hidden", "hidden");
        }
        if (ValMainScope == '' || ValMainScope == null) {
            $("#errMainScopeChecklist").removeAttr("hidden");
        }
        else {
            $("#errMainScopeChecklist").attr("hidden", "hidden");
        }
        if (ValSubScope == '' || ValSubScope == null) {
            $("#errSubScopeChecklist").removeAttr("hidden");
        }
        else {
            $("#errSubScopeChecklist").attr("hidden", "hidden");
        }
        if (ValMinScore == '' || ValMinScore == null) {
            $("#errMinScoreChecklist").removeAttr("hidden");
        }
        else {
            $("#errMinScoreChecklist").attr("hidden", "hidden");
        }
        if (ValMaxScore == '' || ValMaxScore == null) {
            $("#errMaxScoreChecklist").removeAttr("hidden");
        }
        else {
            $("#errMaxScoreChecklist").attr("hidden", "hidden");
        }
        if (ValTargetScore == '' || ValTargetScore == null) {
            $("#errTargetScoreChecklist").removeAttr("hidden");
        }
        else {
            $("#errTargetScoreChecklist").attr("hidden", "hidden");
        }



        if (ValPlant != '' && ValProcessOwner != '' && ValDepartment != '' && ValArea != '' && ValMainScope != '' && ValSubScope != '' && ValMinScore != '' && ValMaxScore != '' && ValTargetScore != '') {
            var datas = ValPlant
            datas += '~' + ValProcessOwner
            datas += '~' + ValDepartment
            datas += '~' + ValArea
            datas += '~' + ValMainScope
            datas += '~' + ValSubScope
            datas += '~' + ValMinScore
            datas += '~' + ValMaxScore
            datas += '~' + ValTargetScore
            datas += '~' + ValId
            datas += '~' + Condition
            MasterDataChecklist.Submit(datas, Condition)
            console.log(datas)
        }
    }
}


MasterDataLoad.EventCloseModal = function ()
{
    var ValForm = document.getElementById("MasterDataForm").value;
    if (ValForm == 'MasterDataIssueFocus')
    {
        MasterDataIssueFocus.EmptyItem()
    }
    else if (ValForm == 'MasterDataPeriod') {
        MasterDataPeriod.EmptyItem()
    }
    else if (ValForm == 'MasterDataDepartment') {
        MasterDataDepartment.EmptyItem()
    }
    else if (ValForm == 'MasterDataCriteria') {
        MasterDataCriteria.EmptyItem()
    }
    else if (ValForm == 'MasterDataHoliday') {
        MasterDataHoliday.EmptyItem()
    }
    else if (ValForm == 'MasterDataVendor') {
        MasterDataVendor.EmptyItem()
    }
    else if (ValForm == 'MasterDataProduct') {
        MasterDataProduct.EmptyItem()
    }
    else if (ValForm == 'MasterDataPlant') {
        MasterDataPlant.EmptyItem()
    }
    else if (ValForm == 'MasterDataProcessOwner') {
        MasterDataProcessOwner.EmptyItem()
    }
    else if (ValForm == 'MasterDataLine') {
        MasterDataLine.EmptyItem()
    }
    else if (ValForm == 'MasterDataModel') {
        MasterDataModel.EmptyItem()
    }
    else if (ValForm == 'MasterDataCategory') {
        MasterDataCategory.EmptyItem()
    }
    else if (ValForm == 'MasterDataLineProcess') {
        MasterDataLineProcess.EmptyItem()
    }
    else if (ValForm == 'MasterDataMuser') {
        MasterDataMUser.EmptyItem()
    }
    else if (ValForm == 'MasterDataVendorProcess') {
        MasterDataVendorProcess.EmptyItem()
    }
    else if (ValForm == 'MasterDataChecklist') {
        MasterDataChecklist.EmptyItem()
    }
}


MasterDataLoad.hideAllForm = function()
{
    $('.IssueFocus').hide()
    $('.Period').hide()
    $('.Department').hide()
    $('.Criteria').hide()
    $('.Holiday').hide()
    $('.Vendor').hide()
    $('.Product').hide()
    $('.Plant').hide()
    $('.ProcessOwner').hide()
    $('.Line').hide()
    $('.Model').hide()
    $('.Category').hide()
    $('.LineProcess').hide()
    $('.MUser').hide()
    $('.VendorProcess').hide()
    $('.Layout').hide()
    $('.Checklist').hide()
}

MasterDataLoad.setDefaulClass = function()
{
    $('#BtnIssueFocus').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnPeriod').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnDepartment').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnCriteria').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnHoliday').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnVendor').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnProduct').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnPlant').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnProcessOwner').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnLine').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnModel').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnCategory').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnLineProcess').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnUser').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnVendorProcess').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnChecklist').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
    $('#BtnLayout').removeClass('btn btn-outline-primary2 btn-lg btn-block active').addClass('btn btn-outline-primary2 btn-lg btn-block')
}


MasterDataLoad.DownloadTemplate = function (FileName)
{
    window.location.href = '../MasterData/DownloadFile?FileUniqueName=' + FileName + '';
}
