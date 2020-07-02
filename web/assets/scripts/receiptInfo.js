var cashTable, cashTableDetail, opdTable, opdTableDetail, procedureBranchTable,
    stockTable, stockTableDetail, interStockTable, sourceTable;

function initial() {
    $(".fromDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent: true
    }).datetimepicker("setDate", new Date());
    $(".toDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent: true
    }).datetimepicker("setDate", new Date());
    $(".collapse").trigger('click');
    loadMenu();
    loadClinics();
    }
function loadClinics() {
    $("#loading").show();
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {
            type: 'getClinicsAdmin'
        },
        success: function (data, textStatus, jqXHR) {
            // console.log(data);

            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            data.shift();

            $.each(data, function (i, dat) {
                //console.log(dat);
                $('.selectBranch').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
            });

            $('#selectBranch').trigger('change.select2');

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

$(function () {
    $("#formFilter").unbind('submit').bind('submit', function () {
        event.preventDefault();
        loadCashReport();
    });
    $("#formFilterOpd").unbind('submit').bind('submit', function () {
        event.preventDefault();
        loadOpdReport();
    });

$('#tableCashReportDetail').on('click', '.vieww', function () {
     var data = cashTableDetail.row($(this).parents('tr')).data();
     window.open("provisionalBill.jsp?rid="+data['receiptId']+"&tid="+data['treatmentId']);
});
});

function loadCashReport() {
    $("#loading").show();
    $.ajax({
        url: 'stReports',
        type: 'GET',
        async: false,
        data: $("#formFilter").serialize() + "&type=getCashReportBranch",
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            $(".btn").prop('disabled', false);
            $("#loading").hide();
           
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             $.fn.dataTable.moment('DD/MM/YYYY HH:mm');
            console.log(data);
            data.shift();
            $("#totalReceipts").text(data[2].totalInvoice);
            $("#totalReceiptAmount").text(data[2].totalAmount);
            if (typeof (cashTable) != "undefined") {
                cashTable.destroy();
            }

            cashTable = $("#tableCashReport").DataTable({
                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                //          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
                //    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
                //    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                responsive: true,
                "data": data[0],

                "columns": [{
                        "data": "branchName",
                        "defaultContent": "",
                    },
                    {
                        "data": "count",
                        "defaultContent": ""
                    },
                    {
                        "data": "amount",
                        "defaultContent": ""
                    },
                    {
                        "data": "cash",
                        "defaultContent": ""
                    },
                    {
                        "data": "card",
                        "defaultContent": ""
                    },
                    {
                        "data": "cheque",
                        "defaultContent": ""
                    },
                    {
                        "data": "online",
                        "defaultContent": ""
                    },
                ],
                "order": [
                    [0, "asc"]
                ],
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "Cash Report",
                    messageTop: "Cash Report",


                }],



            });

            if (typeof (cashTableDetail) != "undefined") {
                cashTableDetail.destroy();
            }

            cashTableDetail = $("#tableCashReportDetail").DataTable({
                //          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
                //    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
                //    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                //                       responsive: true,
                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                "data": data[1],

                "columns": [{
                        "data": "date",
                        "defaultContent": "",
                    },
                    {
                        "data": "receiptNumber",
                        "defaultContent": ""
                    },
                    {
                        "data": "patientName",
                        "defaultContent": ""
                    },
                    {
                        "data": "amount",
                        "defaultContent": ""
                    },
                    { "data": null,
             "defaultContent": "<button class='btn btn-block btn-info vieww btn-icon' title='View'><i class='fa fa-eye' aria-hidden='true'></i></button>"
            },
                ],
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "Receipts Generated",
                    messageTop: "Receipts Generated",


                }],
                "order": [
                    [0, "asc"]
                ],


            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

function loadOpdReport() {
    $("#loading").show();
    $.ajax({
        url: 'stReports',
        type: 'GET',
        async: false,
        data: $("#formFilterOpd").serialize() + "&type=getOpdReportBranch",
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $.fn.dataTable.moment('DD/MM/YYYY HH:mm');
            console.log(data);
            data.shift();
            $("#newPatient").text(data[2].new);
            $("#followUp").text(data[2].old);
            $("#noShow").text(data[2].noShow);
            if (typeof (opdTable) != "undefined") {
                opdTable.destroy();
            }

            opdTable = $("#tableOpdReport").DataTable({
                //          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
                //    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
                //    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                //responsive: true,

                "data": data[0],

                "columns": [{
                        "data": "branchName",
                        "defaultContent": "",
                    },
                    {
                        "data": "new",
                        "defaultContent": ""
                    },
                    {
                        "data": "old",
                        "defaultContent": ""
                    },
                    {
                        "data": "noshow",
                        "defaultContent": ""
                    }

                ],
                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "OPD Report",
                    messageTop: "OPD Report",


                }],
                "order": [
                    [0, "asc"]
                ],



            });

            if (typeof (opdTableDetail) != "undefined") {
                opdTableDetail.destroy();
            }

            opdTableDetail = $("#tableOpdReportDetail").DataTable({
                //          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
                //    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
                //    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                //                       responsive: true,
                "data": data[1],

                "columns": [{
                        "data": "branchName",
                        "defaultContent": ""
                    },
                    {
                        "data": "time",
                        "defaultContent": "",
                    },
                    {
                        "data": "name",
                        "defaultContent": ""
                    },
                    {
                        "data": "cfc",
                        "defaultContent": ""
                    },
                    {
                        "data": "contact",
                        "defaultContent": ""
                    }

                ],
                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "Missed Appointments",
                    messageTop: "Missed Appointements",


                }],
                "order": [
                    [0, "asc"]
                ],


            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
