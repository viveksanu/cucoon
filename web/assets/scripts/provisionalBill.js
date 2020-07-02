var basicData, table, receiptid, tempAmount, receiptHeaderJSON, invoiceHeaderJSON, invoiceMainParticularsJSON;
var receipts, procedureJSON, pharmacyJSON, lihJSON;
var receiptContents;
var description;

function initial() {
    loadBasic();
    getTreatmentData();
    getReceiptData();
//    printWindow();
}
function loadBasic() {
    $("#loading").show();
    var tid = getUrlParameter('tid');
    $.ajax({
        url: 'stPayment',
        type: 'GET',
        async: false,
        data: {type: 'getBasic', tid: tid},
        success: function (data, textStatus, jqXHR) {
            // console.log(data);

            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            data.shift();
            basicData = data[0];
            $("#totalAmount").text(basicData.totalAmount);
            $("#receivedAmount").text(basicData.receivedAmount);
            $("#balanceAmount").text(Number(basicData.balanceAmount).toFixed(2));
//alert(basicData.invoiceFlag);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

function getTreatmentData() {
    var tid = getUrlParameter('tid');
    $.ajax({
        url: 'stPayment',
        type: 'POST',
        async: false,
        data: {tid: tid, type: "getInvoicePrint"},
        success: function (data, textStatus, jqXHR) {
            $(".btn").prop('disabled', false);

            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
                $("#loading").hide();
                return false;
            }
//            
            console.log(data);



            procedureJSON = data[1];
            pharmacyJSON = data[2];
            lihJSON = data[3];

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(".btn").prop('disabled', false);
            $("loading").hide();
            alert("Error");
        }
    });
}

function getReceiptData() {
    $("#loading").show();
    var rid = getUrlParameter('rid');
//    alert(rid);
    $.ajax({
        url: 'stPayment',
        type: 'GET',
        async: false,
        data: {type: 'getReceiptPrint', rid: rid},
        success: function (data, textStatus, jqXHR) {


            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            data.shift();
            console.log(data);
            $("#name").text(data[0].patientName);
            $("#doctor").text(data[0].doctorName);
            $("#sex").text(data[0].gender);
            $("#billNo").text(data[0].bill);
            $("#billDate").text(data[0].billDate);
            $("#cfc").text(data[0].cfc);
            $("#paymentMethod").text(data[0].mode);
            $("#branch").text(data[0].branchName);
            var js = {};
            js = JSON.parse(data[0].description);
//           console.log(js);
            var k = 0, amount = Number(0);
            $.each(procedureJSON, function (i, dat) {
                var i = 0;
                 for (i = 0; i < js.procedure.length; i++) {
                    
                    if (js.procedure[i] == dat.procedureId) {
                        k = k + 1;
                        var newRow = $("<tr><td></td><td></td><td  style='width: 250px;' text-right></td></tr>");
                        newRow.children().eq(0).text(k);
                        newRow.children().eq(1).text(dat.procedureName);
                        newRow.children().eq(2).text(dat.amount);
                        newRow.appendTo($("#billTable"));
                        amount = amount + Number(dat.amount);
                        js.procedure.splice(i, 1);
                        break;
                    }
                }
            });

            $.each(lihJSON, function (i, dat) {
                var i = 0;
                for (i = 0; i < js.lih.length; i++) {
                    if (js.lih[i] == dat.lihId) {
                        k = k + 1;
                        var newRow = $("<tr><td></td><td></td><td style='width: 250px;' text-right></td></tr>");
                        newRow.children().eq(0).text(k);
                        newRow.children().eq(1).text(dat.lihName);
                        newRow.children().eq(2).text(dat.amount);
                        newRow.appendTo($("#billTable"));
                        amount = amount + Number(dat.amount);
                        js.lih.splice(i, 1);
                        break;
                    }
                }
            });


            $.each(pharmacyJSON, function (i, dat) {
//                var temp=js
//                console.log(js);

                var i = 0;
                for (i = 0; i < js.pharmacy.length; i++) {
//                 console.log(js.pharmacy.toString());   
                    if (js.pharmacy[i] == dat.itemId) {
                        k = k + 1;
                        var newRow = $("<tr><td></td><td></td><td style='width: 250px;' text-right></td></tr>");
                        newRow.children().eq(0).text(k);
                        newRow.children().eq(1).text(dat.itemName);
                        newRow.children().eq(2).text(dat.amount);
                        newRow.appendTo($("#billTable"));
                        amount = amount + Number(dat.amount);
                        js.pharmacy.splice(i, 1);

                        break;
                        
                    }
                }
            });
            $("#billAmount").text(Number(amount).toFixed(2));
            $("#adjustBill").text(Number(data[0].amount).toFixed(2));
            $("#balanceAmount").text(Number(basicData.balanceAmount).toFixed(2));

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function printWindow() {

    var
            printContents = document.getElementsByTagName('main')[0].innerHTML;


    var
            originalContents = document.body.innerHTML;



    document.body.innerHTML =
            printContents;



    window.print();

    setTimeout(function () {

        document.body.innerHTML =
                originalContents;

    }, 600);




}
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
