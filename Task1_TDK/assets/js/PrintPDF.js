$(document).ready(function () {
    Loading.UnblockPage_()
    PDF.GeneratedHTML()
});


function PDF() { }


PDF.GeneratedHTML = function()
{
    var AuditNumber = GetParam.ParameterFromURL('AuditNumber').split(',')
    
    var Loc = window.location.origin
    var HTML_PrintPDF = $("#HTML_PrintPDF")
    HTML_PrintPDF.empty()
    var divhtml
    Loading.BlockPage()
    for (var i = 0; i < AuditNumber.length; i++) {
        $.ajax({
            url: "../CaseCompleted/GetAllData",
            method: "POST",
            dataType: "JSON",
            data: {
                AuditNumber: AuditNumber[i]
            },
            success: function (j) {
                if (j.Result == true) {
                    console.log(j.Data[0])
                    divhtml = "";

                    divhtml += '<div class="container mt-5" id="PrintDiv">'
                    divhtml += '<div class="row">'
                    divhtml += '<div class="col-lg-12">'
                    divhtml += '<div class="row">'
                    divhtml += '<div class="col-lg-6 col-xxl-4 order-1 order-xxl-2">'
                    divhtml += '<div class="card card-custom card-stretch gutter-b" style="background-color:#fff">'
                    divhtml += '<div class="card-header border-0">'
                    divhtml += '<h3 class="card-title font-weight-bolder text-dark">Case - '+j.Data[0][0].AuditNumber+'</h3>'
                    divhtml += '<div class="card-toolbar"></div>'
                    divhtml += '</div>'
                    divhtml += '<div class="card-body pt-2">'
                    divhtml += '<div class="form-group">'
                    divhtml += '<label>Issue Tittle</label>'
                    divhtml += '<div></div>'
                    divhtml += '<input value="' + j.Data[0][0].IssueTittle + '" type="text" class="form-control form-control-solid" disabled />'
                    divhtml += '</div>'
                    divhtml += '<div class="form-group">'
                    divhtml += '<label>Photo</label>'
                    divhtml += '<div></div>'
                    divhtml += '<div class="form-control form-control-solid" style="height:250px; background-color:#fff">'
                    divhtml += '<div style="height:250px">'
                    divhtml += '<img src="' + Loc + '/FileHandler.ashx?imagePath=' + j.Data[0][0].SubmitImage + '" class="swiper-slide" style="background-color:#fff" />'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '<div class="form-group">'
                    divhtml += '<label>Issue Description</label>'
                    divhtml += '<div></div>'
                    divhtml += '<textarea class="form-control form-control-solid" rows="4" disabled>' + j.Data[0][0].IssueDescription + '</textarea>'
                    divhtml += '</div>'
                    divhtml += '<div class="form-group row">'
                    divhtml += '<label class="col-4 col-form-label">Plant</label>'
                    divhtml += '<div class="col-8">'
                    divhtml += '<input  class="form-control" type="text" value="' + j.Data[0][0].IssueDescription + '" disabled>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    if (j.Data[0][0].VendorCode != "")
                    {
                        divhtml += '<div class="form-group row IsVendor">'
                        divhtml += '<label class="col-4 col-form-label">Vendor</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].VendorCode + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'
                    }
                    if (j.Data[0][0].VendorProcess != "") {
                        divhtml += '<div class="form-group row IsVendorProcess">'
                        divhtml += '<label class="col-4 col-form-label">Vendor Process</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input  class="form-control" type="text" value="' + j.Data[0][0].VendorProcess + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'
                    }
                    divhtml += '<div class="form-group row">'
                    divhtml += '<label class="col-4 col-form-label">Process Owner</label>'
                    divhtml += '<div class="col-8">'
                    divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].ProcessOwner + '" disabled>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '<div class="form-group row">'
                    divhtml += '<label class="col-4 col-form-label">Issue Focus</label>'
                    divhtml += '<div class="col-8">'
                    divhtml += '<input  class="form-control" type="text" value="' + j.Data[0][0].IssueFocus + '" disabled>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '<div class="form-group row">'
                    divhtml += '<label class="col-4 col-form-label">Criteria</label>'
                    divhtml += '<div class="col-8">'
                    divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].Criteria + '" disabled>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    if (j.Data[0][0].Department != "") {
                        divhtml += '<div class="form-group row IsDepartment">'
                        divhtml += '<label class="col-4 col-form-label">Department</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].Department + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'

                    }
                    if (j.Data[0][0].Product != "") {
                        divhtml += '<div class="form-group row IsProduct">'
                        divhtml += '<label class="col-4 col-form-label">Product</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].Product + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'

                    }
                    if (j.Data[0][0].Area != "") {
                        divhtml += '<div class="form-group row IsArea">'
                        divhtml += '<label class="col-4 col-form-label">Area</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].Area + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'

                    }
                    if (j.Data[0][0].Line != "") {
                        divhtml += '<div class="form-group row IsLine">'
                        divhtml += '<label class="col-4 col-form-label">Line</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].Line + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'

                    }
                    if (j.Data[0][0].Model != "") {
                        divhtml += '<div class="form-group row IsModel">'
                        divhtml += '<label class="col-4 col-form-label">Model</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].Model + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'

                    }
                    if (j.Data[0][0].MachineNumber != "") {

                        divhtml += '<div class="form-group row IsMachine">'
                        divhtml += '<label class="col-4 col-form-label">Machine No.</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].MachineNumber + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'

                    }
                    if (j.Data[0][0].MaterialDescription != "") {
                        divhtml += '<div class="form-group row IsMaterial">'
                        divhtml += '<label class="col-4 col-form-label">Material Description</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].MaterialDescription + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'

                    }
                    if (j.Data[0][0].SessionID != "") {
                        divhtml += '<div class="form-group row IsSession">'
                        divhtml += '<label class="col-4 col-form-label">Session ID</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].SessionID + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'
                    }
                    if (j.Data[0][0].FGCode != "") {

                        divhtml += '<div class="form-group row IsFGCode">'
                        divhtml += '<label class="col-4 col-form-label">FG Code</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].FGCode + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'
                    }
                    if (j.Data[0][0].LotNumber != "") {

                        divhtml += '<div class="form-group row IsLotNumber">'
                        divhtml += '<label class="col-4 col-form-label">Lot No.</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].LotNumber + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'
                    }
                    if (j.Data[0][0].Process != "") {
                        divhtml += '<div class="form-group row IsProcess">'
                        divhtml += '<label class="col-4 col-form-label">Process</label>'
                        divhtml += '<div class="col-8">'
                        divhtml += '<input class="form-control" type="text" value="' + j.Data[0][0].Process + '" disabled>'
                        divhtml += '</div>'
                        divhtml += '</div>'
                       

                    }
                    divhtml += '</div>'
                    divhtml += '<div class="card-footer">'
                    divhtml += '<div class="row">'
                    divhtml += '<div class="col-2"></div>'
                    divhtml += '<div class="col-2"></div>'
                    divhtml += '<div class="col-2"></div>'
                    divhtml += '<div class="col-1"></div>'
                    divhtml += '<div class="col-5">'
                    divhtml += '<div class="form-group mb-0">'
                    divhtml += '<label>Submitted By :</label>'
                    divhtml += '<div></div>'
                    divhtml += '<label><span style="color:#04acc4">' + j.Data[0][0].PostBy + '</span></label>'
                    divhtml += '<label><span>' + j.Data[0][0].PostDate + '</span></label>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '<div class="col-lg-6 col-xxl-4 order-1 order-xxl-2">'
                    divhtml += '<div class="card card-custom card-stretch gutter-b" style="background-color:#fff">'
                    divhtml += '<div class="card-header border-0">'
                    divhtml += '<h3 class="card-title font-weight-bolder text-dark">Action</h3>'
                    divhtml += '<div class="card-toolbar">'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '<div class="card-body pt-2">'
                    divhtml += '<div class="form-group validated">'
                    divhtml += '<label>Action Plan Target Date</label>'
                    divhtml += '<div></div>'
                    divhtml += '<div class="input-group date">'
                    divhtml += '<input type="text" class="form-control" value="' + j.Data[0][0].TargetDateAction + '" disabled readonly="readonly" placeholder="Select date" />'
                    divhtml += '<div class="input-group-append">'
                    divhtml += '<span class="input-group-text">'
                    divhtml += '<i class="la la-calendar-check-o"></i>'
                    divhtml += '</span>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '<div class="form-group validated">'
                    divhtml += '<label>Upload Photo</label>'
                    divhtml += '<div></div>'
                    divhtml += '<div class="form-control form-control-solid" style="height:250px">'
                    divhtml += '<div  style="height:250px">'
                    divhtml += '<img src="' + Loc + '/FileHandler.ashx?imagePath=' + j.Data[0][0].ActionImage + '" class="swiper-slide" style="background-color:#fff" />'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '<div class="form-group validated">'
                    divhtml += '<label>Action Plan</label>'
                    divhtml += '<div></div>'
                    divhtml += '<textarea class="form-control form-control-solid" rows="4" disabled>' + j.Data[0][0].ActionDescription + '</textarea>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '<div class="card-footer">'
                    divhtml += '<div class="row">'
                    divhtml += '<div class="col-2"></div>'
                    divhtml += '<div class="col-2"></div>'
                    divhtml += '<div class="col-2"></div>'
                    divhtml += '<div class="col-1"></div>'
                    divhtml += '<div class="col-5">'
                    divhtml += '<div class="form-group mb-0">'
                    divhtml += '<label>Submitted By :</label>'
                    divhtml += '<div></div>'
                    divhtml += '<label><span style="color:#04acc4">' + j.Data[0][0].PostByAction + '</span></label>'
                    divhtml += '<label><span>' + j.Data[0][0].PostDateAction + '</span></label>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '</div>'
                    divhtml += '<div class="col-lg-6 col-xxl-4 order-1 order-xxl-2">'
                    divhtml += '<div class="card card-custom card-stretch gutter-b" style="background-color:#fff">'
                    divhtml += '<div class="card-header border-0">'
                            divhtml += '<h3 class="card-title font-weight-bolder text-dark">Resolution</h3>'
                            divhtml += '<div class="card-toolbar">'
                            divhtml += '</div>'
                        divhtml += '</div>'
                        divhtml += '<div class="card-body pt-2">'
                            divhtml += '<div class="form-group validated">'
                                divhtml += '<label>Resolution Plan Target Date</label>'
                                divhtml += '<div></div>'
                                divhtml += '<div class="input-group date">'
                                divhtml += '<input type="text" value="' + j.Data[0][0].EffectiveDate + '" class="form-control"  disabled readonly="readonly" placeholder="Select date" />'
                                    divhtml += '<div class="input-group-append">'
                                        divhtml += '<span class="input-group-text">'
                                            divhtml += '<i class="la la-calendar-check-o"></i>'
                                        divhtml += '</span>'
                                    divhtml += '</div>'
                                divhtml += '</div>'
                            divhtml += '</div>'
                            divhtml += '<div class="form-group validated">'
                                divhtml += '<label>Upload Photo<span class="text-danger EditResolution">*</span></label>'
                                divhtml += '<div></div>'
                                divhtml += '<div class="form-control form-control-solid" style="height:250px">'
                                    divhtml += '<div style="height:250px">'
                                    divhtml += '<img src="' + Loc + '/FileHandler.ashx?imagePath=' + j.Data[0][0].ResolutionImage + '" class="swiper-slide" style="background-color:#fff" />'
                                    divhtml += '</div>'
                                divhtml += '</div>'
                            divhtml += '</div>'
                            divhtml += '<div class="form-group validated">'
                                divhtml += '<label>Resolution</label>'
                                divhtml += '<div></div>'
                                divhtml += '<textarea disabled class="form-control form-control-solid" rows="4">' + j.Data[0][0].Resolution + '</textarea>'
                            divhtml += '</div>'
                            divhtml += '<div class="form-group validated">'
                                divhtml += '<label>Issue Focus</label>'
                                divhtml += '<div></div>'
                                divhtml += '<div class="col-lg-12">'
                                divhtml += '<div class="row">'
                                var datasIssueFocus = j.Data[0][0].DatasIssueFocusResolution.split(',')
                                var HTML = "";
                                for (var k = 0; k < datasIssueFocus.length; k++) {
                                    HTML += '<div class="col-md-6">'
                                    HTML += '<div class="funkyradio">'
                                    HTML += '<div class="funkyradio-info">'
                                    if (j.Data[0][0].IssueFocusResolution == datasIssueFocus[k])
                                    {
                                        HTML += '<input checked="checked" type="radio" disabled="disabled" name="IssueFocus' + j.Data[0][0].AuditNumber + '" id="Radio' + j.Data[0][0].AuditNumber + datasIssueFocus[k] + '"  value="' + datasIssueFocus[k] + '">'
                                    }
                                    else {
                                        HTML += '<input type="radio" disabled="disabled" name="IssueFocus' + j.Data[0][0].AuditNumber + '" id="Radio' + j.Data[0][0].AuditNumber + datasIssueFocus[k] + '"  value="' + datasIssueFocus[k] + '">'
                                    }
                                    
                                    HTML += '<label for="Radio' + j.Data[0][0].AuditNumber + datasIssueFocus[k] + '" class="color">' + datasIssueFocus[k] + '</label>'
                                    HTML += '</div>'
                                    HTML += '</div>'
                                    HTML += '</div>'
                                }

                                    divhtml += HTML
                                    divhtml += '</div>'
                                divhtml += '</div>'
                            divhtml += '</div>'
                            divhtml += '<div class="form-group validated">'
                                divhtml += '<label>Tangible CR/ Month($)</label>'
                                divhtml += '<div></div>'
                                divhtml += '<input value="' + j.Data[0][0].TangibleCRMonth + '" disabled class="form-control" type="number">'
                            divhtml += '</div>'
                            divhtml += '<div class="form-group validated">'
                                divhtml += '<label>Category</label>'
                                divhtml += '<div></div>'
                                divhtml += '<div class="col-lg-12">'
                                divhtml += '<div class="row">'
                                var datasCategory = j.Data[0][0].DatasIntangibleBenefit.split(',')
                                HTML=""
                                for (var k = 0; k < datasCategory.length; k++) {
                                    HTML += '<div class="col-md-6">'
                                    HTML += '<div class="funkyradio">'
                                    HTML += '<div class="funkyradio-info">'
                                    if (j.Data[0][0].IntangibleBenefit == datasCategory[k]) {
                                        HTML += '<input checked="checked" type="radio" disabled="disabled" name="Category' + j.Data[0][0].AuditNumber + '" id="Radio' + j.Data[0][0].AuditNumber + datasCategory[k] + '"  value="' + datasCategory[k] + '">'
                                    }
                                    else {
                                        HTML += '<input type="radio" disabled="disabled" name="Category' + j.Data[0][0].AuditNumber + '" id="Radio' + j.Data[0][0].AuditNumber + datasCategory[k] + '"  value="' + datasCategory[k] + '">'
                                    }
                                    HTML += '<label for="Radio' + j.Data[0][0].AuditNumber + datasCategory[k] + '" class="color">' + datasCategory[k] + '</label>'
                                    HTML += '</div>'
                                    HTML += '</div>'
                                    HTML += '</div>'
                                }
                                divhtml += HTML
                                    divhtml += '</div>'
                                divhtml += '</div>'
                            divhtml += '</div>'
                            divhtml += '<div class="form-group validated">'
                                divhtml += '<label>Reason</label>'
                                divhtml += '<div></div>'
                                divhtml += '<textarea disabled class="form-control form-control-solid" rows="4">' + j.Data[0][0].ReasonIntangible + '</textarea>'
                            divhtml += '</div>'
                        divhtml += '</div>'
                        divhtml += '<div class="card-footer">'
                            divhtml += '<div class="row">'
                                divhtml += '<div class="col-2"></div>'
                                divhtml += '<div class="col-2"></div>'
                                divhtml += '<div class="col-2"></div>'
                                divhtml += '<div class="col-1"></div>'
                                divhtml += '<div class="col-5">'
                                    divhtml += '<div class="form-group mb-0">'
                                        divhtml += '<label>Submitted By :</label>'
                                        divhtml += '<div></div>'
                                        divhtml += '<label><span style="color:#04acc4">' + j.Data[0][0].PostByResolution + '</span></label>'
                                        divhtml += '<label><span>' + j.Data[0][0].PostDateResolution + '</span></label>'
                                    divhtml += '</div>'
                                divhtml += '</div>'
                            divhtml += '</div>'
                        divhtml += '</div>'
                    divhtml += '</div>'
                divhtml += '</div>'
            divhtml += '</div>'
        divhtml += '</div>'
        divhtml += '<div class="col-lg-12">'
            divhtml += '<div class="card card-custom" style="background-color:#fff">'
                divhtml += '<div class="card-body">'
                    divhtml += '<div class="col-lg-12 mb-0">'
                        divhtml += '<div class="row">'
                            divhtml += '<div class="col-lg-4">'
                                divhtml += '<div class="form-group validated">'
                                    divhtml += '<label>Resolution Approval</label>'
                                    divhtml += '<div></div>'
                                    divhtml += '<div class="col-lg-12">'
                                        divhtml += '<div class="row">'
                                            divhtml += '<div class="col-md-6">'
                                                divhtml += '<div class="funkyradio">'
                                                divhtml += '<div class="funkyradio-info">'
                                                if (j.Data[0][0].ResolutionApproval == 'Approved')
                                                {
                                                    divhtml += '<input checked="checked" type="radio" disabled="disabled" name="ApprovalStatus' + j.Data[0][0].AuditNumber + '" id="RadioApprovalStatus_0' + j.Data[0][0].AuditNumber + '" value="YES">'
                                                }
                                                else
                                                {
                                                    divhtml += '<input type="radio" disabled="disabled" name="ApprovalStatus' + j.Data[0][0].AuditNumber + '" id="RadioApprovalStatus_0' + j.Data[0][0].AuditNumber + '" value="YES">'
                                                }
                                                        
                                                divhtml += '<label for="RadioApprovalStatus_0' + j.Data[0][0].AuditNumber + '" class="color">YES</label>'
                                                    divhtml += '</div>'
                                                divhtml += '</div>'
                                            divhtml += '</div>'
                                            divhtml += '<div class="col-md-6">'
                                                divhtml += '<div class="funkyradio">'
                                                divhtml += '<div class="funkyradio-info">'
                                                if (j.Data[0][0].ResolutionApproval != 'Approved') {
                                                    divhtml += '<input checked="checked" type="radio" disabled="disabled" name="ApprovalStatus' + j.Data[0][0].AuditNumber + '" id="RadioApprovalStatus_1' + j.Data[0][0].AuditNumber + '" value="YES">'
                                                }
                                                else {
                                                    divhtml += '<input type="radio" disabled="disabled" name="ApprovalStatus' + j.Data[0][0].AuditNumber + '" id="RadioApprovalStatus_1' + j.Data[0][0].AuditNumber + '" value="YES">'
                                                }
                                                divhtml += '<label for="RadioApprovalStatus_1' + j.Data[0][0].AuditNumber + '" class="color">NO</label>'
                                                    divhtml += '</div>'
                                                divhtml += '</div>'
                                            divhtml += '</div>'
                                        divhtml += '</div>'
                                    divhtml += '</div>'
                                divhtml += '</div>'
                            divhtml += '</div>'
                            divhtml += '<div class="col-lg-4">'
                                divhtml += '<div class="form-group validated">'
                                    divhtml += '<label>Approval Comment</label>'
                                    divhtml += '<div></div>'
                                    divhtml += '<input value="' + j.Data[0][0].ApproverComment + '" disabled="disabled" type="text" class="form-control form-control-solid" />'
                                divhtml += '</div>'
                            divhtml += '</div>'
                            divhtml += '<div class="col-lg-4">'
                                divhtml += '<div class="form-group validated">'
                                    divhtml += '<label></label>'
                                    divhtml += '<div></div>'
                                    divhtml += '<div class="row">'
                                        divhtml += '<div class="col-lg-6">'
                                        divhtml += '</div>'
                                        divhtml += '<div class="col-lg-6">'
                                            divhtml += '<div class="form-group mb-0">'
                                                divhtml += '<label>Submitted By :</label>'
                                                divhtml += '<div></div>'
                                                divhtml += '<label><span style="color:#04acc4">' + j.Data[0][0].PostByApproval + '</span></label>'
                                                divhtml += '<label><span>' + j.Data[0][0].PostDateApproval + '</span></label>'
                                            divhtml += '</div>'
                                        divhtml += '</div>'
                                    divhtml += '</div>'
                                divhtml += '</div>'
                            divhtml += '</div>'
                        divhtml += '</div>'
                    divhtml += '</div>'
                divhtml += '</div>'
            divhtml += '</div>'
        divhtml += '</div>'
    divhtml += '</div>'
    divhtml += '</div>'
    HTML_PrintPDF.append(divhtml)
                    Loading.UnblockPage_()
                }
            },
            error: function (xhr, error, text) {
                Loading.UnblockPage_()
                Notification.ShowToast('error', '' + error + '')
            }
        });
    }
    
}