var basicData,table,receiptid,tempAmount,receiptHeaderJSON,invoiceHeaderJSON,invoiceMainParticularsJSON;
var receipts,procedureJSON,pharmacyJSON,lihJSON,receipts;
var receiptContents;
var description;

function initial(){
    loadReceipts();
 loadBasic();   
  //  getTreatmentData();
    getInvoice();
//    printWindow();

}
function loadBasic(){
    $("#loading").show();    
    var tid=getUrlParameter('tid');
    $.ajax({
        url: 'stPayment',
        type: 'GET',
        async: false,
        data: {type: 'getBasic',tid:tid},
        success: function (data, textStatus, jqXHR) {
           // console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
basicData=data[0];            
$("#billAmount").text(Number(basicData.totalAmount).toFixed(2));
$("#amountReceived").text(Number(basicData.receivedAmount).toFixed(2));
$("#balancePayable").text(Number(basicData.balanceAmount).toFixed(2));
//alert(basicData.invoiceFlag);
 
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

function getTreatmentData(){
       var tid=getUrlParameter('tid');
   $.ajax({
        url: 'stPayment',
        type: 'POST',
        async: false,
            data:{tid:tid,type:"getInvoicePrint"},
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



            procedureJSON=data[1];
            pharmacyJSON=data[2];
            lihJSON=data[3];
            
},
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("loading").hide();
                alert("Error");
            }
   });    
}

function getInvoice(){
       var tid=getUrlParameter('tid');
   $.ajax({
        url: 'stPayment',
        type: 'POST',
        async: false,
            data:{tid:tid,type:"getInvoice",invoiceType:1},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
$("#loading").hide();
                return false;
            }
console.log(data);


            $("#name").text(data[1][0].patientName);
                 
                $("#billDate").text(data[1][0].invoiceDate);
                $("#billNo").text(data[1][0].invoiceNumber);
                $("#doctor").text(data[1][0].doctorName);
                $("#age").text(data[1][0].age);
                $("#cfc").text(data[1][0].cfc);
                $("#branch").text(data[1][0].branchName);
                $("#sex").text(data[1][0].gender);
           
            invoiceMainParticularsJSON=data[2];
            
//            procedureJSON=data[3];
//            pharmacyJSON=data[4];
//            lihJSON=data[5];
$.each(invoiceMainParticularsJSON, function (i, dat) {
                
                        var newRow = $("<tr><td></td><td></td><td  style='width: 250px;' text-right></td></tr>");
                        newRow.children().eq(0).text(i+1);
                        newRow.children().eq(1).text(dat.procedureName);
                        newRow.children().eq(2).text(Number(dat.amount).toFixed(2));
                        newRow.appendTo($("#tableMain"));
                        
                    
                
            });
                
//console.log(invoiceHeaderJSON);
},
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("loading").hide();
                alert("Error");
            }
   });    
}

function loadReceipts(){
    $("#loading").show();
    var tid=getUrlParameter('tid');
    $.ajax({
        url: 'stPayment',
        type: 'GET',
        async: false,
        data: {type: 'getReceipts',tid:tid},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             receipts=data;
var amount=0;
   $.each(receipts, function (i, dat) {
//       console.log("-------------");         
//       console.log(dat);
                        var newRow = $("<tr><td></td><td></td><td></td><td></td><td  style='width: 250px;' text-right></td></tr>");
                        newRow.children().eq(0).text(i+1);
                        newRow.children().eq(1).text(dat.fdate);
                        newRow.children().eq(2).text(dat.receiptNumber);
                        newRow.children().eq(3).text(dat.mode);
                        newRow.children().eq(4).text(Number(dat.amount).toFixed(2));
                        newRow.appendTo($("#tableReceipts"));
             amount=amount+Number(dat.amount);           
                    
                
            });
           $("#rtotalAmount").text(amount.toFixed(2));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
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