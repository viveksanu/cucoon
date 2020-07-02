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
    loadProcedures();

}

function loadProcedures() {
    $("#loading").show();
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {
            type: "getProcedureDetails"
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
                $('#selectProcedure').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
            });

            $('#selectProcedure').trigger('change.select2');

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

function loadClinics() {
    $("#loading").show();
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {
            type: 'getClinics'
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

    $("#formFilterProcedureBranch").unbind('submit').bind('submit', function () {
        event.preventDefault();

        loadProcedureBranchReport();
    });

    $("#formFilterProcedure").unbind('submit').bind('submit', function () {
        event.preventDefault();

        loadProcedureReport();
    });

    $("#formFilterStock").unbind('submit').bind('submit', function () {
        event.preventDefault();

        loadStockReport();
    });


    $("#formFilterInterStock").unbind('submit').bind('submit', function () {
        event.preventDefault();

        loadInterStockReport();
    });

    $("#formFilterSource").unbind('submit').bind('submit', function () {
        event.preventDefault();

        loadSourceReport();
    });
});


function loadCashReport() {
    $("#loading").show();
    $.ajax({
        url: 'stReports',
        type: 'GET',
        async: false,
        data: $("#formFilter").serialize() + "&type=getCashReport",
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
            $("#totalReceiptAmount").text(Number(data[2].totalAmount).toFixed(2));
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
                        "defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )
                    },
                    {
                        "data": "cash",
                        "defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )
                    },
                    {
                        "data": "card",
                        "defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )
                    },
                    {
                        "data": "cheque",
                        "defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )
                    },
                    {
                        "data": "online",
                        "defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )
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
                        "defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )
                    },
                    {
                        "data": "branchName",
                        "defaultContent": ""
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
        data: $("#formFilterOpd").serialize() + "&type=getOpdReport",
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

function loadProcedureBranchReport() {

    $("#loading").show();
    $.ajax({
        url: 'stReports',
        type: 'GET',
        async: false,
        data: $("#formFilterProcedureBranch").serialize() + "&type=getProcedureBranchReport",
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

            data.shift();
            console.log(data);
            if (typeof (procedureBranchTable) != "undefined") {
                procedureBranchTable.destroy();
            }

            procedureBranchTable = $("#tableProcedureBranchReport").DataTable({
                //          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
                //    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
                //    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                //responsive: true,
                "data": data,

                "columns": [{
                        "data": "name",
                        "defaultContent": "",
                    },
                    {
                        "data": "total",
                        "defaultContent": ""
                    },
                    {
                        "data": "free",
                        "defaultContent": ""
                    },


                ],
                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "Procedure Report",
                    messageTop: "Stock Report",


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

function loadProcedureReport() {

    $("#loading").show();
    $.ajax({
        url: 'stReports',
        type: 'GET',
        async: false,
        data: $("#formFilterProcedure").serialize() + "&type=getProcedureReport",
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

            data.shift();
            console.log(data);
            if (typeof (procedureTable) != "undefined") {
                procedureTable.destroy();
            }

            procedureTable = $("#tableProcedureReport").DataTable({
                //          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
                //    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
                //    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                //responsive: true,
                "data": data,

                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "Stock Report",
                    messageTop: "Stock Report",


                }],
                "columns": [{
                        "data": "name",
                        "defaultContent": "",
                    },
                    {
                        "data": "total",
                        "defaultContent": ""
                    },
                    {
                        "data": "free",
                        "defaultContent": ""
                    },


                ],
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

function loadStockReport() {
    $("#loading").show();
    $.ajax({
        url: 'stReports',
        type: 'GET',
        async: false,
        data: $("#formFilterStock").serialize() + "&type=getStockReport",
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            $("#loading").hide();
            $(".btn").prop('disabled', false);
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            

            $.fn.dataTable.moment('DD/MM/YYYY HH:mm');
            console.log(data);
            data.shift();
            $("#totalStockTransfer").text(data[2].total);
            $("#totalStockPending").text(data[2].pending);
            if (typeof (stockTable) != "undefined") {
                stockTable.destroy();
            }

            stockTable = $("#tableStockReport").DataTable({
                //             dom:"<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
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
                        "data": "total",
                        "defaultContent": ""
                    },
                    {
                        "data": "pending",
                        "defaultContent": ""
                    }

                ],
                "order": [
                    [0, "asc"]
                ],

                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "Stock Report",
                    messageTop: "Stock Report",


                }]

            });

            if (typeof (stockTableDetail) != "undefined") {
                stockTableDetail.destroy();
            }

            stockTableDetail = $("#tableStockReportDetail").DataTable({
                //          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
                //    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
                //    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                //                       responsive: true,
                "data": data[1],

                "columns": [{
                        "data": "date",
                        "defaultContent": "",
                    },
                    {
                        "data": "branchName",
                        "defaultContent": ""
                    },
                    {
                        "data": "recepitNumber",
                        "defaultContent": ""
                    },
                    {
                        "data": "status",
                        "defaultContent": ""
                    }

                ],
                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "Stock Transaction Report",
                    messageTop: "Stock Transaction Report",


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

function loadInterStockReport() {

    $("#loading").show();
    $.ajax({
        url: 'stReports',
        type: 'GET',
        async: false,
        data: $("#formFilterInterStock").serialize() + "&type=getInterStockReport",
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

            data.shift();
            console.log(data);
            if (typeof (interStockTable) != "undefined") {
                interStockTable.destroy();
            }

            interStockTable = $("#tableInterStockReport").DataTable({
                //          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
                //    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
                //    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                //responsive: true,
                "data": data,

                "columns": [{
                        "data": "date",
                        "defaultContent": "",
                    },
                    {
                        "data": "referenceNumber",
                        "defaultContent": ""
                    },
                    {
                        "data": "source",
                        "defaultContent": ""
                    },
                    {
                        "data": "destination",
                        "defaultContent": ""
                    },
                    {
                        "data": "status",
                        "defaultContent": ""
                    },


                ],

                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "Internal Stock Transfer Report",
                    messageTop: "Internal Stock Transfer Report",


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

function loadSourceReport() {
    $("#loading").show();
    $.ajax({
        url: 'stReports',
        type: 'GET',
        async: false,
        data: $("#formFilterSource").serialize() + "&type=getSourceReport",
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

            data.shift();
            if (typeof (sourceTable) != "undefined") {
                sourceTable.destroy();
            }
            //console.log(data[0]);          
            sourceTable = $("#tableSourceReport").DataTable({
                //          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
                //    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
                //    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                //responsive: true,

                "data": data,

                "columns": [{
                        "data": "source",
                        "defaultContent": "",
                    },
                    {
                        "data": "count",
                        "defaultContent": ""
                    }

                ],
                dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                buttons: [{
                    extend: 'csv',
                    className: 'btn dark btn-outline',
                    text: 'Export',
                    title: "Source Report",
                    messageTop: "Source Report",


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