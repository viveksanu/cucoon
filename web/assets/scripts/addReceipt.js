var basicData,table,receiptid,tempAmount,receiptHeaderJSON,invoiceHeaderJSON,invoiceMainParticularsJSON;
var receipts,procedureJSON,pharmacyJSON,lihJSON;
var receiptContents;
var description;
function initial(){ loadMenu();
        $("#receiptDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
     $("#ereceiptDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
    loadBasic();
    getTreatmentData();
    
    
    loadReceipts();
    
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
          if (typeof(table) != "undefined"){
    table.destroy();
    }
    //console.log(data);
   $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         table= $("#tableContent").DataTable( {
        "data": data,
         
        "columns": [
            { "data": "receiptNumber","defaultContent": ""},
            { "data": "fdate","defaultContent": ""},
            { "data": "name","defaultContent": "",},
            { "data": "description","defaultContent": "","visible":false},
            { "data": function ( row, type, val, meta ) {
                    var description="";
                    var js=row['description']
               //     console.log("---"+row['receiptNumber']);;
             //console.log(js);
                    js=JSON.parse(js)
                           
                    $.each(procedureJSON, function (i, dat) {
                  
                 var i=0;
                 for(i=0;i<js.procedure.length;i++){
                     if(js.procedure[i]==dat.procedureId){
                         description=description.concat(dat.procedureName+"<br>");
                         js.procedure.splice(i, 1);
                        break;
                        
                     }
                 }
                 
            });
            $.each(lihJSON, function (i, dat) {
                  //console.log(dat);
                 var i=0;
                 for(i=0;i<js.lih.length;i++){
                     if(js.lih[i]==dat.lihId){
                         description=description.concat(dat.lihName+"<br>");
                         js.lih.splice(i, 1);
                            break;
                        
                     }
                 }
                 
            });
            $.each(pharmacyJSON, function (i, dat) {
                  //console.log(dat);
                 var i=0;
                                  for(i=0;i<js.pharmacy.length;i++){
                     if(js.pharmacy[i]==dat.itemId){
                         description=description.concat(dat.itemName+"<br>");
                         js.pharmacy.splice(i, 1);
                                break;
                        
                     }
                 }
                 
            });

                    return description;
            }
        },
          { "data": "amount","defaultContent": ""},
          { "data": "mode","defaultContent": ""},
          { "data": "branchName","defaultContent": ""},
          { "data": "createdBy","defaultContent": ""},
        
        { "data": null,
             "defaultContent": "<button class='btn btn-block btn-warning printReceipt btn-icon' title='Print'><i class='fa fa-print' aria-hidden='true'></i></button>"
            },
        { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>"
            },
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete btn-icon' title='Delete'><i class='fa fa-trash-o' aria-hidden='true'></i></button>"
            }
            
        ],
        "order": [[ 1, "desc" ]],

 
    } );
   
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
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
$("#totalAmount").text(Number(basicData.totalAmount).toFixed(2));
$("#receivedAmount").text(basicData.receivedAmount);
$("#balanceAmount").text(Number(basicData.balanceAmount).toFixed(2));
//alert(basicData.invoiceFlag);
if(Number(basicData.invoiceFlag)>0){
$("#newInvoice").text("View Invoice");
$("#detailedInvoice").text("View Detailed Invoice");
}else if(Number(basicData.invoiceFlag)==0){
$("#newInvoice").text("Generate Inoice");
$("#detailedInvoice").text("Generate Detailed Invoice");
} 
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
            var pr=[],ph=[],li=[];
            
            $.each(procedureJSON, function (i, dat) {
                  //console.log(dat);
                $('#selectProcedure').append($('<option>', {
                    value: dat.procedureId,
                    text: dat.procedureName
                }));
                
                 $('#eselectProcedure').append($('<option>', {
                    value: dat.procedureId,
                    text: dat.procedureName
                }));

                    
            });
                        $.each(pharmacyJSON, function (i, dat) {
                  //console.log(dat);
                $('#selectPharmacy').append($('<option>', {
                    value: dat.itemId,
                    text: dat.itemName
                }));
                $('#eselectPharmacy').append($('<option>', {
                    value: dat.itemId,
                    text: dat.itemName
                }));
                 
            });
                     $.each(lihJSON, function (i, dat) {
                  //console.log(dat);
                $('#selectLih').append($('<option>', {
                    value: dat.lihId,
                    text: dat.lihName
                }));
                $('#eselectLih').append($('<option>', {
                    value: dat.lihId,
                    text: dat.lihName
                }));
                
            });
            $("#selectProcedure").val(pr).trigger('change.select2');
            $("#selectPharmacy").val(ph).trigger('change.select2');
            $("#selectLih").val(li).trigger('change.select2');
//console.log(invoiceHeaderJSON);
},
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("loading").hide();
                alert("Error");
            }
   });    
}

function loadSelectors(){
pr=[];
ph=[];
li=[];
//alert(pr+" "+ph+" "+li);
  $("#selectProcedure").val(null).trigger('change.select2');
            $("#selectPharmacy").val(null).trigger('change.select2');
            $("#selectLih").val(null).trigger('change.select2');
    $.each(procedureJSON, function (i, dat) {
                  //console.log(dat);
                  
                  var dd=$("#receiptDate").val();
                var today = new Date(dd);
                today.setHours(0,0,0,0)
                var d=dat.date;
                d=d.split("-").reverse().join("-");
                var tDate=new Date(d);
                tDate.setHours(0,0,0,0)
                if(tDate.valueOf()===today.valueOf()){
                    pr.push(dat.procedureId);
                }
            });
                        $.each(pharmacyJSON, function (i, dat) {
                  //console.log(dat);
                                  var dd=$("#receiptDate").val();
                var today = new Date(dd);
                today.setHours(0,0,0,0)
                var d=dat.date;
                d=d.split("-").reverse().join("-");
                var tDate=new Date(d);
                tDate.setHours(0,0,0,0)
                if(tDate.valueOf()===today.valueOf()){
                    ph.push(dat.itemId);
                }
                 
            });
                     $.each(lihJSON, function (i, dat) {
                                  var dd=$("#receiptDate").val();
                var today = new Date(dd);
                today.setHours(0,0,0,0)
                var d=dat.date;
                d=d.split("-").reverse().join("-");
                var tDate=new Date(d);
                tDate.setHours(0,0,0,0)
                if(tDate.valueOf()===today.valueOf()){
                    li.push(dat.lihId);
                }
    });
    //alert(pr+" "+ph+" "+li);
            $("#selectProcedure").val(pr).trigger('change.select2');
            $("#selectPharmacy").val(ph).trigger('change.select2');
            $("#selectLih").val(li).trigger('change.select2');

}

function getInvoice(invoiceType){
       var tid=getUrlParameter('tid');
   $.ajax({
        url: 'stPayment',
        type: 'POST',
        async: false,
            data:{tid:tid,type:"getInvoice",invoiceType:invoiceType},
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
//console.log("ssssssssssssssssss");


invoiceHeaderJSON = [
                {title:"Name",value:""+data[1][0].customerName},
                {title: "Treatment", value: ""+data[1][0].treatmentName},
                {title: "Bill Date", value:""+ data[1][0].invoiceDate},
                {title: "Bill No", value: data[1][0].invoiceNumber},
                {title: "Consulting Doctor", value: data[1][0].doctorName}
                
            ];
            invoiceMainParticularsJSON=data[2];
            procedureJSON=data[3];
            pharmacyJSON=data[4];
            lihJSON=data[5];
//console.log(invoiceHeaderJSON);
if(invoiceType==1)
            generateFinalInvoicePDF();
 else if(invoiceType==2)
                generateDetailedInvoicePDF();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("loading").hide();
                alert("Error");
            }
   });    
}
$(function(){
    
    $("#receiptDate").on('change',function(){
        loadSelectors(); 
    });
    $("#newInvoice").on('click',function(){
       if(Math.round(Number(basicData.balanceAmount))!=0){
           alert("Bill cannot be generated until full payment is received");
           return ;
       }
//getInvoice(1);
if($("#newInvoice").text()=="View Invoice"){
var tid=getUrlParameter('tid');
window.open("finalBill.jsp?tid="+tid);
return;    
}
var c = confirm("Confirm!Generate bill only after full treatment is completed and payment is done!");
        if (c) {
var tid=getUrlParameter('tid');
window.open("finalBill.jsp?tid="+tid);
        }

    });
    
    $("#detailedInvoice").on('click',function(){
       if(Math.round(Number(basicData.balanceAmount))!=0){
           alert("Bill cannot be generated until full payment is received");
           return ;
       }
       if($("#detailedInvoice").text()=="View Detailed Invoice"){
var tid=getUrlParameter('tid');
window.open("detailBill.jsp?tid="+tid);
return;    
}
       var c = confirm("Confirm!Generate bill only after full treatment is completed and payment is done!");
        if (c) {
       var tid=getUrlParameter('tid');
window.open("detailBill.jsp?tid="+tid);            
        }

    });
    
   $('#modalNewPayment').on('shown.bs.modal', function () {
    $("#receiptDate").datetimepicker("setDate", new Date());
     $("#amount").focus();   
     $("#name").val(basicData.name);
        loadSelectors();
    });
    
    $('#modalEditPayment').on('shown.bs.modal', function () {
     $("#eamount").focus();   
    
    });
    
$("#formNewPayment").unbind('submit').bind('submit', function () {
        event.preventDefault();
if(Number($("#amount").val())>Number(basicData.balanceAmount).toFixed(2)){
       alert("Amount exceeds bill value");
       $("#amount").focus();
       return false;
   }
   var tid=getUrlParameter('tid');
   var pro=$("#selectProcedure").val()
   var pha=$("#selectPharmacy").val();
   var lih=$("#selectLih").val();
   if(pro==null){
       pro=[];
   }
   if(pha==null){
       pha=[];
   }
   if(lih==null){
       lih=[];
   }
   if(pro.length+pha.length+lih.length==0){
       alert("Add Procedure/Lab Investigation Report/Pharmacy Item ");
       return false;
   }
$("#loading").show();
   $(".btn").prop('disabled', true);

    var description={
  "procedure":pro,
  "pharmacy":pha,
  "lih":lih
};
//   console.log(description);
   $.ajax({
        url: 'stPayment',
        type: 'POST',
            async: false,
            data:$("#formNewPayment").serialize()+"&type=addNewReceipt&tid="+tid+"&description="+JSON.stringify(description),
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
$("#loading").hide();
                return false;
            }
            $("#formNewPayment")[0].reset();
            $('#modalNewPayment').modal('toggle');
            $("#selectMode").trigger('change.select2');
            $("#selectProcedure").trigger('change.select2');
            $("#selectPharmacy").trigger('change.select2');
            $("#selectLih").trigger('change.select2');
                alert("Saved");
                loadBasic();
                
                loadReceipts(); 
                
            },
            
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("loading").hide();
                alert("Error");
            }
   });
});

$("#formEditPayment").unbind('submit').bind('submit', function () {
        event.preventDefault();
if(Number($("#eamount").val())>(Number(basicData.balanceAmount)+Number(tempAmount))){
       alert("Amount exceeds bill value");
       $("#amount").focus();
       return false;
   }
$("#loading").show();
   $(".btn").prop('disabled', true);
   var tid=getUrlParameter('tid');
 var tid=getUrlParameter('tid');
   var pro=$("#eselectProcedure").val()
   var pha=$("#eselectPharmacy").val();
   var lih=$("#eselectLih").val();
   if(pro==null){
       pro=[];
   }
   if(pha==null){
       pha=[];
   }
   if(lih==null){
       lih=[];
   }
   
   var description={
  "procedure":pro,
  "pharmacy":pha,
  "lih":lih
};
   
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stPayment',
        type: 'POST',
            async: false,
            data:$("#formEditPayment").serialize()+"&type=editReceipt&tid="+tid+"&id="+receiptid+"&description="+JSON.stringify(description),
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
$("#loading").hide();
                return false;
            }
            $("#formEditPayment")[0].reset();
            $('#modalEditPayment').modal('toggle');
                alert("Saved");
                loadReceipts(); 
                loadBasic();
                $("#eselectMode").trigger('change.select2');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("loading").hide();
                alert("Error");
            }
   });
});

$('#tableContent').on('click', '.delete', function () {
     var data = table.row($(this).parents('tr')).data();
  var id   = data["id"];
  var tid=getUrlParameter('tid');
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stPayment',
        type: 'POST',
                async: false,
            data:{id:id,type:"deleteReceipt",tid:tid},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Deleted");
                    loadBasic();
                    //getTreatmentData();
                    loadReceipts();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
                alert("Error");
            }
   });
        }        
    });

$('#tableContent').on('click', '.edit', function () {
     var data = table.row($(this).parents('tr')).data();

      //alert(data['batchId']);
              
              receiptid=data['id'];
              $("#ereceiptDate").val(data['billDate']);
              $("#ename").val(data['name']);
              $("#eselectMode").val(data['mode']).trigger('change.select2');
              tempAmount=data['amount'];
              $("#eamount").val(data['amount']);
                //$("#edescription").val(data['description']);
                      var js=data['description']
               //     console.log("---"+row['receiptNumber']);;
             //console.log(js);
             $("#eselectProcedure").val(null).trigger('change.select2');
            $("#eselectPharmacy").val(null).trigger('change.select2');
            $("#eselectLih").val(null).trigger('change.select2');
  
                    js=JSON.parse(js);
                  var pr=[],ph=[],li=[];         
                    $.each(procedureJSON, function (i, dat) {
                    var i=0;
                 for(i=0;i<js.procedure.length;i++){
                     if(js.procedure[i]==dat.procedureId){
                         pr.push(dat.procedureId);
                         js.procedure.splice(i, 1);
                        break;
                        
                     }
                 }
                 
            });
            $.each(lihJSON, function (i, dat) {
                  //console.log(dat);
                 var i=0;
                 for(i=0;i<js.lih.length;i++){
                     if(js.lih[i]==dat.lihId){
                         li.push(dat.lihId);
                          js.lih.splice(i, 1);
                        break;
                     }
                 }
                 
            });
            $.each(pharmacyJSON, function (i, dat) {
                  //console.log(dat);
                 var i=0;
                                  for(i=0;i<js.pharmacy.length;i++){
                     if(js.pharmacy[i]==dat.itemId){
                         //alert(dat.itemId);
                         ph.push(dat.itemId);
                          js.pharmacy.splice(i, 1);
                        break;
                     }
                 }
                 
            });
            $("#eselectProcedure").val(pr).trigger('change.select2');
            $("#eselectPharmacy").val(ph).trigger('change.select2');
            $("#eselectLih").val(li).trigger('change.select2');


        $("#modalEditPayment").modal('show');     
        
    });

$('#tableContent').on('click', '.printReceipt', function () {
     var data = table.row($(this).parents('tr')).data();
         var id=data['id'];
        //getReceipt(id);
        var tid=getUrlParameter('tid');
        window.open("provisionalBill.jsp?rid="+id+"&tid="+tid);
    });

});

var fontSizes = {
    HeadTitleFontSize: 18,
    Head2TitleFontSize: 16,
    TitleFontSize: 14,
    SubTitleFontSize: 12,
    NormalFontSize: 10,
    SmallFontSize: 8
};

var lineSpacing = {
    NormalSpacing: 20,
};
function getReceipt(id){
    var tid=getUrlParameter('tid');
    $("#loading").show();
    $.ajax({
        url: 'stPayment',
        type: 'GET',
        async: false,
            data:{id:id,type:"getInvoiceReceipt",tid:tid},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
$("#loading").hide();
                return false;
            }
            //console.log("Ssssssssssssssssss");
            data.shift();
            console.log(data);
            receiptContents=[
                {amount:data[0].amount,description: data[0].description},
                
            ];
//console.log(data[0]);
receiptHeaderJSON = [
                {title:"Name",value:data[0].name},
                {title: "Bill Date", value: data[0].fdate},
                {title: "Bill No", value: data[0].receiptNumber},
                {title: "Payment Mode", value: data[0].mode},
                {title: "Branch", value: data[0].branchName}
            ];
            //console.log(receiptHeaderJSON);
            generate_ReceiptPDF();
            
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("loading").hide();
                alert("Error");
            }
   });
}

function generate_ReceiptPDF() {

    var doc = new jsPDF('p', 'pt');

    var rightStartCol1 = 400;
    var rightStartCol2 = 480;


    var InitialstartX = 40;
    var startX = 40;
    var InitialstartY = 40;
    var startY = 0;
var half=doc.internal.pageSize.width/2;
    var lineHeights = 12;

doc.setFontType('normal');
doc.rect(20, 25, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');

//
    doc.setFontSize(fontSizes.Head2TitleFontSize);
    doc.setFontType('bold');
    doc.textAlign("Provisional Bill", {align: "center"}, startX, startY += lineSpacing.NormalSpacing + 2);
//
//    doc.setFontSize(fontSizes.SubTitleFontSize);
//    doc.setFont('times');
//    doc.setFontType('bold');
//
//
//    doc.textAlign(companyJSON.bussinessName, {align: "left"}, startX + 100, startY);
//    doc.setFontSize(fontSizes.NormalFontSize);
//    doc.textAlign("GSTIN", {align: "left"}, startX + 100, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//
//    doc.textAlign(companyJSON.gstin, {align: "left"}, 190, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("State", {align: "left"}, startX + 100, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//    doc.textAlign(companyJSON.stateName, {align: "left"}, 190, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("Address", {align: "left"}, startX + 100, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//    doc.textAlign(companyJSON.address, {align: "left"}, 190, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("PIN", {align: "left"}, startX + 100, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//    doc.textAlign(companyJSON.pin, {align: "left"}, 190, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("Website", {align: "left"}, startX + 100, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//    doc.textAlign(companyJSON.website, {align: "left"}, 190, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("Phone: ", {align: "left"}, startX + 100, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//    doc.textAlign(companyJSON.phone, {align: "left"}, 190, startY);
//
////draw line
//doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY + lineSpacing.NormalSpacing-8);
//
    doc.addImage(company_logo.src, 'PNG', startX, startY +=20, half-50, company_logo.h);

    var tempY = InitialstartY;
doc.setFontSize(fontSizes.NormalFontSize);
    $.each(receiptHeaderJSON, function (i, dat) {
//console.log(dat.title+""+dat.value)

        doc.setFontType('bold');
        doc.textAlign(dat.title, {align: "left"},half+50, tempY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(": "+dat.value, {align: "left"}, half+180, tempY);
        
    });
    startY=tempY;
    //draw line
doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY + lineSpacing.NormalSpacing-8);
//    
//    
//    doc.setFontSize(fontSizes.NormalFontSize);
//    doc.setFontType('bold');
//
//    //-------Customer Info Billing---------------------
//    var startBilling = startY;
//    startY+=5;
//    doc.setFontType('bold');
//    doc.textAlign("Customer", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//    doc.textAlign(customerJSON.customerName, {align: "left"}, 98, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("GSTIN", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//    doc.textAlign(customerJSON.gstin, {align: "left"}, 98, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("Supply State", {align: "left"}, 340, startY);
//    doc.setFontType('normal');
//    doc.textAlign(customerJSON.stateName, {align: "left"}, 400, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("Billing Address", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//
//    doc.textAlign(customerJSON.ba, {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
//
//
//    //-------Customer Info Shipping---------------------
    var rightcol1 = 340;
    var rightcol2 = 400;
//
//    startY = startBilling;
//
//    doc.textAlign("", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
//    doc.textAlign('', {align: "left"}, 98, startY);
//
//    doc.textAlign("", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
//    doc.textAlign('', {align: "left"}, 98, startY);
//
//    doc.textAlign("", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
//    doc.textAlign('', {align: "left"}, 98, startY);
//
//
//    doc.setFontType('bold');
//    doc.textAlign("Shipping Address", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('bold');
//
//    doc.setFontType('normal');
//
//    doc.textAlign(customerJSON.sa, {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
//
    var options = {

        margin: {
            top: 10
        },
theme: 'plain',
        styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 'auto',
            columnWidth: 'auto'
        },
        columnStyles: {
            1: {columnWidth: 'auto'},
            2: {columnWidth: 'auto'},
        },
        startY: startY += 25
    };

    var columns = [
        {title: "Description", dataKey: "description", width: 'auto'},
        {title: "Amount", dataKey: "amount", width: 'auto'},
    ];
    var rows = receiptContents;

//console.log(receiptContents);
////draw line    
//doc.line(20, startY , doc.internal.pageSize.width-20, startY);

    doc.autoTable(columns, rows, options);   //From dynamic data.
  
////draw line
doc.setFontSize(fontSizes.NormalFontSize);
doc.setDrawColor(0, 0, 0);
doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);

 startY = doc.autoTableEndPosY() + 5;
    doc.setFontSize(fontSizes.NormalFontSize);

doc.setFontType('bold');
        doc.textAlign("Total Received", {align: "left"}, half+50, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(": "+receiptContents[0].amount, {align: "left"}, half+180, startY);
        
////
//
//    
//    //-------Invoice Footer---------------------
//    
//    startY = doc.autoTableEndPosY() + 5;
//    doc.setFontSize(fontSizes.NormalFontSize);
//
////draw line
//doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);
//    var ty=startY;
//    doc.setFontType('bold');
//    doc.textAlign("Bank Details", {align: "left"}, startX, ty += lineSpacing.NormalSpacing);
//    $.each(bankJSON, function (i, dat) {
//        doc.setFontType('normal');
//        doc.textAlign(dat.title, {align: "left"}, startX, ty += lineSpacing.NormalSpacing);
//        doc.setFontType('bold');
//        doc.textAlign(dat.value, {align: "left"}, startX+100, ty);
//
//    });
//    
//    
//    
//    var rightcol1 = 380;
//    var rightcol2 = 480;
//
//    $.each(footerJSON, function (i, dat) {
//        doc.setFontType('normal');
//        doc.textAlign(dat.title, {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
//        doc.setFontType('bold');
//        doc.textAlign("Rs."+dat.value, {align: "left"}, rightcol2, startY);
//
//    });
//    startY+=lineSpacing.NormalSpacing
//var words=inWords(Number(footerJSON[2].value));
//if(startY<ty){
//    startY=ty;
//}
//        doc.setFontType('bold');
//        doc.textAlign("Amount In Words", {align: "left"},startX, startY+=lineSpacing.NormalSpacing);
//        doc.setFontType('bold');
//        doc.textAlign(words, {align: "left"},startX, startY+=lineSpacing.NormalSpacing);
////draw line
//startY += lineSpacing.NormalSpacing;
//    doc.setFontType('bold');
//    doc.line(20, startY+3 , doc.internal.pageSize.width-20, startY+3);
//startY += lineSpacing.NormalSpacing;
//
//
//
// doc.setFontType('bold');
// doc.textAlign("Terms and Conditions :", {align: "left"},startX, startY += lineSpacing.NormalSpacing);
//        doc.setFontType('normal');
//    doc.textAlign(conditionsJSON.value, {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
doc.setFontType('bold');
    doc.textAlign('For Cocoon Fertility Clinic,', {align: "center"}, rightcol2, startY += lineSpacing.NormalSpacing + 20);
    doc.textAlign('Authorised Signatory', {align: "center"}, rightcol2, startY += lineSpacing.NormalSpacing + 10);
doc.autoPrint();
window.open(doc.output('bloburl'), '_blank');


  //  doc.save(invoiceName + ".pdf");
}

function generateDetailedInvoicePDF() {

    var doc = new jsPDF('p', 'pt');

    var rightStartCol1 = 400;
    var rightStartCol2 = 480;


    var InitialstartX = 40;
    var startX = 40;
    var InitialstartY = 40;
    var startY = 0;
var half=doc.internal.pageSize.width/2;
    var lineHeights = 12;

doc.setFontType('normal');
doc.rect(20,25, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');

//
    doc.setFontSize(fontSizes.Head2TitleFontSize);
    doc.setFontType('bold');
    doc.textAlign("Final Bill", {align: "center"}, startX, startY += lineSpacing.NormalSpacing + 2);
//
////draw line
//doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY + lineSpacing.NormalSpacing-8);
//
    doc.addImage(company_logo.src, 'PNG', startX, startY +=20, half-50, company_logo.h);

    var tempY = InitialstartY;
doc.setFontSize(fontSizes.NormalFontSize);
    $.each(invoiceHeaderJSON, function (i, dat) {
//console.log(dat.title+""+dat.value)

        doc.setFontType('bold');
        doc.textAlign(dat.title, {align: "left"},half+50, tempY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(": "+dat.value, {align: "left"}, half+180, tempY);
        
    });
    startY=tempY;
    //draw line
doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY + lineSpacing.NormalSpacing-8);

    var rightcol1 = 340;
    var rightcol2 = 400;
//
    var options = {

        margin: {
            top: 10
        },
theme: 'plain',
        styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 'auto',
            columnWidth: 'auto'
        },
        columnStyles: {
            0: {columnWidth: 'auto'},
            1: {columnWidth: 'auto'},
        },
        startY: startY += 25
    };

    var columns = [
        {title: "Description", dataKey: "procedureName", width: 'auto'},
        {title: "Amount", dataKey: "amount", width: 'auto'},
    ];
    var rows = invoiceMainParticularsJSON;

    doc.autoTable(columns, rows, options);   //From dynamic data.
  
////draw line
doc.setFontSize(fontSizes.NormalFontSize);
doc.setDrawColor(0, 0, 0);
doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);

 startY = doc.autoTableEndPosY() + 5;
    doc.setFontSize(fontSizes.NormalFontSize);

doc.setFontType('bold');
        doc.textAlign("Bill Amount", {align: "left"}, half+50, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(basicData.totalAmount, {align: "left"}, half+180, startY);
        
        doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY += lineSpacing.NormalSpacing-8);



//New
startY+=50; 
{
       if(startY>770){
      doc.addPage();
    startY=16;
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
}
doc.setFontType('bold');
doc.textAlign("Receipts", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY += lineSpacing.NormalSpacing-8);
 options = {

        margin: {
            top: 10
        },
theme: 'plain',
        styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 'auto',
            columnWidth: 'auto'
        },
        columnStyles: {
            0: {columnWidth: 'auto'},
            1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
            3: {columnWidth: 'auto'},
        },
        startY: startY += 25
    };

    var columns = [
        {title: "Date", dataKey: "fdate", width: 'auto'},
        {title: "Receipt No", dataKey: "receiptNumber", width: 'auto'},
        {title:"Payment Method", dataKey: "mode", width: 'auto'},
        {title: "Amount", dataKey: "amount", width: 'auto'},
    ];
     rows = receipts;
    doc.autoTable(columns, rows, options);   //From dynamic data.
  
////draw line
doc.setFontSize(fontSizes.NormalFontSize);
doc.setDrawColor(0, 0, 0);
doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);

 startY = doc.autoTableEndPosY() + 5;
    doc.setFontSize(fontSizes.NormalFontSize);
doc.setFontType('bold');
        doc.textAlign("Total Received", {align: "left"}, half+50, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(basicData.totalAmount, {align: "left"}, half+180, startY);

}

startY+=50; 
{
       if(startY>770){
      doc.addPage();
      
    startY=16;
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
}
doc.setFontType('bold');
doc.textAlign("Procedures", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY += lineSpacing.NormalSpacing-8);
 options = {

        margin: {
            top: 10
        },
theme: 'plain',
        styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 'auto',
            columnWidth: 'auto'
        },
        columnStyles: {
            0: {columnWidth: 'auto'},
            1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
            3: {columnWidth: 'auto'},
        },
        startY: startY += 25
    };

    var columns = [
        {title: "Date", dataKey: "date", width: 'auto'},
        {title: "Procedure", dataKey: "procedureName", width: 'auto'},
        {title:"Amount", dataKey: "amount", width: 'auto'},
        {title: "Discount(%)", dataKey: "discount", width: 'auto'},
        {title: "Net Amount", dataKey: "netAmount", width: 'auto'},
    ];
     rows = procedureJSON;
    doc.autoTable(columns, rows, options);   //From dynamic data.
  
////draw line
doc.setFontSize(fontSizes.NormalFontSize);
doc.setDrawColor(0, 0, 0);
doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);
var netAmount=0;
$.each(procedureJSON, function (i, dat) {
//console.log(dat.netAmount);

    netAmount=netAmount+Number(dat.netAmount);    
    });
 startY = doc.autoTableEndPosY() + 5;
    doc.setFontSize(fontSizes.NormalFontSize);
doc.setFontType('bold');
        doc.textAlign("Total Amount", {align: "left"}, half+50, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(""+netAmount, {align: "left"}, half+180, startY);

}



startY+=50; 
{
       if(startY>770){
      doc.addPage();
    startY=16;
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
} 
//alert(startY);
doc.setFontType('bold');
doc.textAlign("Pharmacy", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY += lineSpacing.NormalSpacing-8);
 options = {

        margin: {
            top: 10
        },
theme: 'plain',
        styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 'auto',
            columnWidth: 'auto'
        },
        columnStyles: {
            0: {columnWidth: 'auto'},
            1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
            3: {columnWidth: 'auto'},
        },
        startY: startY += 25
    };

    var columns = [
        {title: "Date", dataKey: "date", width: 'auto'},
        {title: "Name", dataKey: "itemName", width: 'auto'},
        {title: "Quantity", dataKey: "quantity", width: 'auto'},
        {title:"Amount", dataKey: "amount", width: 'auto'},
        {title: "Discount(%)", dataKey: "discount", width: 'auto'},
        {title: "Net Amount", dataKey: "netAmount", width: 'auto'},
    ];
     rows = pharmacyJSON;
    doc.autoTable(columns, rows, options);   //From dynamic data.
  
////draw line
doc.setFontSize(fontSizes.NormalFontSize);
doc.setDrawColor(0, 0, 0);
doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);
var netAmount=0;
$.each(pharmacyJSON, function (i, dat) {
//console.log(dat.netAmount);

    netAmount=netAmount+Number(dat.netAmount);    
    });
 startY = doc.autoTableEndPosY() + 5;
    doc.setFontSize(fontSizes.NormalFontSize);
doc.setFontType('bold');
        doc.textAlign("Total Amount", {align: "left"}, half+50, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(""+netAmount, {align: "left"}, half+180, startY);

}
startY+=50; 
{
       if(startY>770){
      doc.addPage();
      
    startY=16;
    doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
}
doc.setFontType('bold');
doc.textAlign("Lab Investigation Report", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY += lineSpacing.NormalSpacing-8);
 options = {

        margin: {
            top: 10
        },
theme: 'plain',
        styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 'auto',
            columnWidth: 'auto'
        },
        columnStyles: {
            0: {columnWidth: 'auto'},
            1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
            3: {columnWidth: 'auto'},
        },
        startY: startY += 25
    };

    var columns = [
        {title: "Date", dataKey: "date", width: 'auto'},
        {title: "Name", dataKey: "lihName", width: 'auto'},
        {title:"Amount", dataKey: "amount", width: 'auto'},
        {title: "Discount(%)", dataKey: "discount", width: 'auto'},
        {title: "Net Amount", dataKey: "netAmount", width: 'auto'},
    ];
     rows = lihJSON;
    doc.autoTable(columns, rows, options);   //From dynamic data.
  
////draw line
doc.setFontSize(fontSizes.NormalFontSize);
doc.setDrawColor(0, 0, 0);
doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);
var netAmount=0;
$.each(lihJSON, function (i, dat) {
//console.log(dat.netAmount);

    netAmount=netAmount+Number(dat.netAmount);    
    });
 startY = doc.autoTableEndPosY() + 5;
    doc.setFontSize(fontSizes.NormalFontSize);
doc.setFontType('bold');
        doc.textAlign("Total Amount", {align: "left"}, half+50, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(""+netAmount, {align: "left"}, half+180, startY);

}

doc.setFontType('bold');
    doc.textAlign('For Cocoon Fertility Clinic,', {align: "center"}, rightcol2, startY += lineSpacing.NormalSpacing + 20);
    doc.textAlign('Authorised Signatory', {align: "center"}, rightcol2, startY += lineSpacing.NormalSpacing + 10);
doc.autoPrint();
window.open(doc.output('bloburl'), '_blank');


  //  doc.save(invoiceName + ".pdf");
}
function generateFinalInvoicePDF() {

    var doc = new jsPDF('p', 'pt');

    var rightStartCol1 = 400;
    var rightStartCol2 = 480;


    var InitialstartX = 40;
    var startX = 40;
    var InitialstartY = 40;
    var startY = 0;
var half=doc.internal.pageSize.width/2;
    var lineHeights = 12;

doc.setFontType('normal');
doc.rect(20,25, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');

//
    doc.setFontSize(fontSizes.Head2TitleFontSize);
    doc.setFontType('bold');
    doc.textAlign("Final Bill", {align: "center"}, startX, startY += lineSpacing.NormalSpacing + 2);
//
////draw line
//doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY + lineSpacing.NormalSpacing-8);
//
    doc.addImage(company_logo.src, 'PNG', startX, startY +=20, half-50, company_logo.h);

    var tempY = InitialstartY;
doc.setFontSize(fontSizes.NormalFontSize);
    $.each(invoiceHeaderJSON, function (i, dat) {
//console.log(dat.title+""+dat.value)

        doc.setFontType('bold');
        doc.textAlign(dat.title, {align: "left"},half+50, tempY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(": "+dat.value, {align: "left"}, half+180, tempY);
        
    });
    startY=tempY;
    //draw line
doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY + lineSpacing.NormalSpacing-8);
//    
//    
//    doc.setFontSize(fontSizes.NormalFontSize);
//    doc.setFontType('bold');
//
//    //-------Customer Info Billing---------------------
//    var startBilling = startY;
//    startY+=5;
//    doc.setFontType('bold');
//    doc.textAlign("Customer", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//    doc.textAlign(customerJSON.customerName, {align: "left"}, 98, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("GSTIN", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//    doc.textAlign(customerJSON.gstin, {align: "left"}, 98, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("Supply State", {align: "left"}, 340, startY);
//    doc.setFontType('normal');
//    doc.textAlign(customerJSON.stateName, {align: "left"}, 400, startY);
//
//    doc.setFontType('bold');
//    doc.textAlign("Billing Address", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('normal');
//
//    doc.textAlign(customerJSON.ba, {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
//
//
//    //-------Customer Info Shipping---------------------
    var rightcol1 = 340;
    var rightcol2 = 400;
//
//    startY = startBilling;
//
//    doc.textAlign("", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
//    doc.textAlign('', {align: "left"}, 98, startY);
//
//    doc.textAlign("", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
//    doc.textAlign('', {align: "left"}, 98, startY);
//
//    doc.textAlign("", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
//    doc.textAlign('', {align: "left"}, 98, startY);
//
//
//    doc.setFontType('bold');
//    doc.textAlign("Shipping Address", {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
//    doc.setFontType('bold');
//
//    doc.setFontType('normal');
//
//    doc.textAlign(customerJSON.sa, {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
//
    var options = {

        margin: {
            top: 10
        },
theme: 'plain',
        styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 'auto',
            columnWidth: 'auto'
        },
        columnStyles: {
            0: {columnWidth: 'auto'},
            1: {columnWidth: 'auto'},
        },
        startY: startY += 25
    };

    var columns = [
        {title: "Description", dataKey: "procedureName", width: 'auto'},
        {title: "Amount", dataKey: "amount", width: 'auto'},
    ];
    var rows = invoiceMainParticularsJSON;

//console.log(invoiceMainParticularsJSON);
////draw line    
//doc.line(20, startY , doc.internal.pageSize.width-20, startY);

    doc.autoTable(columns, rows, options);   //From dynamic data.
  
////draw line
doc.setFontSize(fontSizes.NormalFontSize);
doc.setDrawColor(0, 0, 0);
doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);

 startY = doc.autoTableEndPosY() + 5;
    doc.setFontSize(fontSizes.NormalFontSize);

doc.setFontType('bold');
        doc.textAlign("Bill Amount", {align: "left"}, half+50, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(basicData.totalAmount, {align: "left"}, half+180, startY);
        
        doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY += lineSpacing.NormalSpacing-8);
startY+=50;
doc.setFontType('bold');
doc.textAlign("Receipts", {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
doc.line(20, startY + lineSpacing.NormalSpacing-8, doc.internal.pageSize.width-20, startY += lineSpacing.NormalSpacing-8);
 options = {

        margin: {
            top: 10
        },
theme: 'plain',
        styles: {
            overflow: 'linebreak',
            fontSize: 10,
            rowHeight: 'auto',
            columnWidth: 'auto'
        },
        columnStyles: {
            0: {columnWidth: 'auto'},
            1: {columnWidth: 'auto'},
           2: {columnWidth: 'auto'},
            3: {columnWidth: 'auto'},
        },
        startY: startY += 25
    };

    var columns = [
        {title: "Date", dataKey: "fdate", width: 'auto'},
        {title: "Receipt No", dataKey: "receiptNumber", width: 'auto'},
        {title:"Payment Method", dataKey: "mode", width: 'auto'},
        {title: "Amount", dataKey: "amount", width: 'auto'},
    ];
     rows = receipts;
//{ "data": "receiptNumber","defaultContent": ""},
//            { "data": "fdate","defaultContent": ""},
//            { "data": "name","defaultContent": "",},
//            { "data": "description","defaultContent": ""},
//          { "data": "amount","defaultContent": ""},
//          { "data": "mode","defaultContent": ""},
//          { "data": "branchName","defaultContent": ""},
//          { "data": "createdBy","defaultContent": ""},
        
//console.log(invoiceMainParticularsJSON);
////draw line    
//doc.line(20, startY , doc.internal.pageSize.width-20, startY);

    doc.autoTable(columns, rows, options);   //From dynamic data.
  
////draw line
doc.setFontSize(fontSizes.NormalFontSize);
doc.setDrawColor(0, 0, 0);
doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);

 startY = doc.autoTableEndPosY() + 5;
    doc.setFontSize(fontSizes.NormalFontSize);
doc.setFontType('bold');
        doc.textAlign("Total Received", {align: "left"}, half+50, startY += lineSpacing.NormalSpacing);
        doc.setFontType('normal');
        doc.textAlign(basicData.totalAmount, {align: "left"}, half+180, startY);

////
//
//    
//    //-------Invoice Footer---------------------
//    
//    startY = doc.autoTableEndPosY() + 5;
//    doc.setFontSize(fontSizes.NormalFontSize);
//
////draw line
//doc.line(20, doc.autoTableEndPosY() + 2 , doc.internal.pageSize.width-20, doc.autoTableEndPosY() + 2);
//    var ty=startY;
//    doc.setFontType('bold');
//    doc.textAlign("Bank Details", {align: "left"}, startX, ty += lineSpacing.NormalSpacing);
//    $.each(bankJSON, function (i, dat) {
//        doc.setFontType('normal');
//        doc.textAlign(dat.title, {align: "left"}, startX, ty += lineSpacing.NormalSpacing);
//        doc.setFontType('bold');
//        doc.textAlign(dat.value, {align: "left"}, startX+100, ty);
//
//    });
//    
//    
//    
//    var rightcol1 = 380;
//    var rightcol2 = 480;
//
//    $.each(footerJSON, function (i, dat) {
//        doc.setFontType('normal');
//        doc.textAlign(dat.title, {align: "left"}, rightcol1, startY += lineSpacing.NormalSpacing);
//        doc.setFontType('bold');
//        doc.textAlign("Rs."+dat.value, {align: "left"}, rightcol2, startY);
//
//    });
//    startY+=lineSpacing.NormalSpacing
//var words=inWords(Number(footerJSON[2].value));
//if(startY<ty){
//    startY=ty;
//}
//        doc.setFontType('bold');
//        doc.textAlign("Amount In Words", {align: "left"},startX, startY+=lineSpacing.NormalSpacing);
//        doc.setFontType('bold');
//        doc.textAlign(words, {align: "left"},startX, startY+=lineSpacing.NormalSpacing);
////draw line
//startY += lineSpacing.NormalSpacing;
//    doc.setFontType('bold');
//    doc.line(20, startY+3 , doc.internal.pageSize.width-20, startY+3);
//startY += lineSpacing.NormalSpacing;
//
//
//
// doc.setFontType('bold');
// doc.textAlign("Terms and Conditions :", {align: "left"},startX, startY += lineSpacing.NormalSpacing);
//        doc.setFontType('normal');
//    doc.textAlign(conditionsJSON.value, {align: "left"}, startX, startY += lineSpacing.NormalSpacing);
//
doc.setFontType('bold');
    doc.textAlign('For Cocoon Fertility Clinic,', {align: "center"}, rightcol2, startY += lineSpacing.NormalSpacing + 20);
    doc.textAlign('Authorised Signatory', {align: "center"}, rightcol2, startY += lineSpacing.NormalSpacing + 10);
doc.autoPrint();
window.open(doc.output('bloburl'), '_blank');


  //  doc.save(invoiceName + ".pdf");
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

var company_logo = {
//  js  src :'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAABnCAIAAAB3kcyHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMDSURBVHhe7ZbrceMwDAZTlwpyPa7GzbgYn2QBFAk+5LsxNTebb3+FJAgQWCfxz0uAkE4U0olCOlFIJwrpRCGdKKQThXSikE4U0olCOlFIJwrpRCGdKKQThXSikE4U0olCOlFIJwrpRCGdKKQThXSikE4U0olCOlFIJwrpRCGdKKQThXSikE4U0olCOlFIJwrpRPFtnc/78rOx3J+2s+Kbxu1h+32yG0WmQEi8kYU3TjcsIj8tX/S4vTfrwnbg7AG+WYan7HWWmUzX2Z7pidHiUnsg7bxv/EKYvmPH/RotnYNcKVHWVGvvCmbrbHx2t61xl5bkdrPLVXSmohj6njzWbhezHMuyp8qC7N6ROSuXhW27e0zVZLVxFZN1huVn2KV1ch0hvt0R5XRuG1ZluT9SOcPuVXL65bzNPeKfmv4OV/12no0+47DZMTLWdDCOSzqfFhj1VS2M6nnQemlcdi5X/+9M+13KYTZmU5XokTzkxIe91/azFSlfkBoY60mvsj/ep6+bwnSdK2kgzqjVcpYtn9VO1OYHcf9NSmyvsvUeuy/snp18qDOUOwuexBU6d0qpvXbLUW74lCp7KaaY44ofVDcLSp2+3GLLN3ysM+swe/61XKdzJ42+PZxoJicMvk7hlz3wr3R6+Bps92KaXksHZ83P52qd4xn7YRvPmXyGInHuw1K1TttJX3Wrcp1EB6fNT+fbOsNIt2XeXM/Ejl2uzqKnbML5iGOYrz/V6Tfs28xx4oka0UVukM7U8Zs40UCz38EwPE121Mm8cVLcFLR05p+T4iTfL/gFOstu4lDbvysns2j43GgIyyJ6DgY685TVQ2O16qUgneJ/QDpRSCcK6UQhnSikE4V0opBOFNKJQjpRSCcK6UQhnSikE4V0opBOFNKJQjpRSCcK6UQhnSikE4V0opBOFNKJQjpRSCcK6UQhnSikE4V0opBOFNKJQjpRSCcK6UQhnSikE4V0opBOFNKJQjpRSCcK6UQhnSikE4V0opBOFNKJQjpRSCcK6QTxev0Bw+JX66QY5BoAAAAASUVORK5CYII=',
//src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAD9BB0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9+x1paQdaWgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEdwg5+lRm9hDYMiKeeCcdOtLdMEj3N91Tk1+Pv/AAXW/wCC5vxC/YO/ab0n4e/DGbQPtFrpSXniH7ZY/aWLSEFFQ7xtICv05Oee1AH7DA5orw//AIJ6/tWxftj/ALI/g/4giSOS61y0VrwRqFSO4AAkUDsAccHnmvbYZfNHTFA7D6KKKBBmmiVT3ql4knvLbRbyTToI7q+jt5GtoHbassgHygt2BPB+tfkD+27/AMFx/wBrz/gn1fWTfEL4F/DnStK1q9lt9NvUu7iZJ1TH3gs/ynDD65PpQB+xe9fUUqsHHHNflZ/wR/8A+DhPWf8AgoT+0NdfD3x54Z8L+F768tDNo7aYZv8ASZFzvVvMkbttxjHU1+pmmvvtl+XbxyD1B70DsWKCwXqcUV57+1R8dtN/Zn+Avibxzq0kK2vh2xkutshwsjgZVeo6mgR6CHU9xSGZQ+3cM1/P4v8Awd1/GDUdY+z6P8KfAF59smMdhGwu1knBYLHk/acDPfiv1G/4J0/tEftMfHzU7zUvjT8LvB/gHwzLZRXGl3Gl30kk9w7Akh1eRsADb0H8XtQOx9f5opqfXNOJxQITeM4pa88/aN8S+NfC3wm1y++G+k6b4g8ZW0G/TtNv5zFBdvkDDEEHABPcV+Qv7Wn/AAcc/tR/sR/EtfB/xG+CPw50LXJoRcQI13cypMhzhgVnHoPzoA/b2gsF6nFfjn+yp/wW7/bR/bX8E3XiL4bfs6/D/wAQaPZ3JtJblby4RFkABI5n579PSrnxh/4Lx/tSfshxw33xk/Ze0+x0XzdktzpWoSptXjc25mkUYyvXHWgfKfr95ik9acWxXxT/AME6v+C4Pwd/4KEXkOjaPJfeGfFzD5tH1PG5jzzHIMCRTjsBj8a+yWuBcEfeUI+05X+vagLF0NmkZwvU4r8uv+ClX/BV/wDau/4J66trWvSfBn4fX3w0g1AWdhq013cPPIp6NIEmAB5HYZ5r57/Zm/4OVv2mv2xvixbeC/h78FPhv4g164ia48lLq6jCxr94kmc9Mj9aAs9z9yElVz8rA0pdV6kD8a89/Zq8S+OfFPwl0W++JGh6V4b8Y3UW6/07T5zNBA3PCkkn8ya8i/4KMfG79oH4I6Fpt/8ABL4b+GPHsaxyy6x/a968JtQoUp5ao6lsjzM9cbR60CPqANkU0yKvVl/Ovxu/Yz/4Lrftcftx+PNQ0LwN8B/h3eL4dlWDWne9uIzYNvKtyZ8Nna2AOm3vmv1j1TU/EEfw5uLqz0yKbxJ9gLx2DSYi+1BAdhfP3dxx6470AdckiyDKkN9KdX4w/tm/8F5P2tv+Ce+s2Nl8Svgb8NtKt9WeUWF0l5cypchOTws52kAr1POfaof2Rv8Agvz+11+3X/bC/C/4BfD/AMRjQfLF7IlxcokBkBKZ3TjOdr9PSgrlZ+0m4UZzX5A/HD/guz+1P+xjZx6j8Y/2X9M0/Q2bD3enapLGAAV3YJMo/iHXH49vrr/gm7/wWj+E/wDwUbkfTPDr6l4e8UQqGl0bVUCyNwc+VIDiQDHJAGMjjmgVj7EzzTVlVuhpksrKv91mztz0Hpmvyu/4KHf8FbP2uv2A7zWtc1P4KfDq6+H9rftbWGsNezyNOmRguFmG08jtz26UC3P1WpGcL1IH1r8Nv2bf+Dlf9p39rr4jr4R+H3wP+HfiLXHgadY4bi5VUUYzu3XI6+3pXs3xV/4K6fttfs3+HLjxD8Qf2VtAPh2zGZ5tNupiYB6s3nOAPw7Ggdj9YDcxg/eXmpM1+cf/AATv/wCDi34Tftw+J7Hwvqum3nw98YXh8uK2vJlmt7iToQr4HQ44/wBoV+iizF7ZiX+7gbsZB9wB2oFYn3ClBzX5mf8ABSX/AIKZ/tbfsE3HirxVa/Bf4f6x8K9GuFS31ia8na5eMkDdIiTDb19Ofwr5X+An/B0H+0f+0x8RrDwn4L+Cvw71jXNSDeTFHNdckHnINxkcEfrQOz3P3bpqyZWvzHP7en/BRPeq/wDDLfgHnJJ+3T8geg+0Vyv7LH/BdL43+I/+CinhH4E/Gn4V+Gfh1deIGZT5Mdw0xYjK7XadkxkDqpzmgR+sbOqdTikMi4HPWsnxFPfHQ7ybTYlmv44ZPIgc7VklGdoJ7DI5+tfkj+3F/wAFwv2uv+Cfl7ayeP8A4H/DvT9H1S7lt9Nv0uriZboLg/MFn+VsFevXJ9KA3P2F3r60nmLn7wr8Tf2Uv+Dhz9rD9uDXtS034Y/AnwB4mvNHtknujHNcxpbly20Nm45yEbp6V6d8Uf8AgsF+2h+zfpUutfEP9lfSRoduw8+40y6nfylxySfMfb14yOxoHY/WYMG6HNFfnH+wP/wchfB/9r3xLZeF/EOnal8OfF19N9nitr9hLazSZIwsoxjt1HcV+itndLcLlSGXggjow7EexoET0UU1iQy4HB6n0oAHnSNgGZQW6DPWlZwoyeK+aP8AgoR8Z/2gfg1oGk3nwL+HPh7x9M299Xj1W9MH2VAAV2BWUtnD9DxtGeor8pbP/g61+PWpeP08Lx/B34eNrj339mNYm4ujKLncVxn7RjGR6UBufvkG3UFttfNf/BPD4xftAfGHwrqV98dfh74X8B3JZG0uLR55JPtMZ3Fi4eRypHyemdx9K+jZGxs6rnkkjigCbevrS5r8o/8Agpz/AMFfv2q/+CdfijUNS1X4LeA7j4czapLYaNrZuriV512bo2lVZxtPHPAz2xiuy/4Ipf8ABdq6/wCCk3xA8ReC/G2h+H/Cviyxi+06bb6dJJsv4gXDn947nI2qeD3oHY/SonFBbFUXufOh8yMqzFT5aZwWOOAT25Br8of+Cg3/AAWc/aw/YA8Zt/wknwP8BnwrqGpSWGjait3cTNefd8sPtnAVjuHbnnGMUCP1r3jNLmvmH/gmx8evj1+0B4Gu9Z+N3w98M+ADeJDPosOlTySPcxMrMxkDyPtxlMdM7j6V9NYJkX/ZHPPSgB5cKetLur83f+Cq3/BS79qL/gn/AK94g8TaH8H/AAP4h+EultEsOtXN1O10dxw3mIkyhcEjHHPPpXzP+y//AMHFX7VX7Z3i280L4c/Af4f+INR0+Dz51jublBEMnGc3HcA/lQOz3P263UV+TPxU/wCCwf7ZX7M+nf258SP2U9Lbw3E2ZZtIv5jLEgwWY/O479wPxr6Y/wCCcn/Bbr4O/wDBRBhpOizX3hfxgoHmaLquEkc8/wCrb+PGDngYyPWgR9nUjuI1yxwKSNlbdt/hOD9ar6rK0EKsvJ6BTwGJ9T2oAsJKsiblOQadnNfkz/wUg/4LMftS/wDBPDxjdT618F/AJ8C3moyWOi6rJeTyvc7V3ZkCTAKeV7DOTjpWb/wTu/4Ld/tTf8FB/HENv4Y+C/w9uPDun3kNvreoJd3ERtVcEkpunIJwreuMe9A7Pc/XfePWl3A96yLy4vE0aSaO3U3nlNsgLZXzduQpb0zxmvyW/bB/4La/tcfscfGvTfBuv/Ar4f8A2jxVe/Y/Drx3dxL/AGgSwC5xcDbwy/XPbFAj9f8AeAetLXhn7EnxE+MHxO+EseqfGjwjoXgvxQ1wwjsNKkdo/KwMFg7uQ3/Avwr2+4n8mLcBuIG7HqKAHs6p94gfU0w3Mef9YnHXkcV8Z/8ABVj/AILK+Bf+Cafh+30+8sbrxV451VSbDQ7IqHA+XDSEg4XLD0Jr5o+Ff7Vv/BSL9rDwna+LvCXw7+GPg3wzqQE1la6rJ5c9xFyeQzkgnA5GOtAH6yrOj9GU/Q0obd0r8qP2VP8Agth8avBv7bHh/wCA/wC0d8MNM8P654imENnqWkSMYeQ20ncxBBwOnvX6o20u7av8W0FuOn+cGgCUyKpwWpwOa8x/az+Mk37O/wCz74x8cQpbTS+GdNlvkhnJ2SlBkA4IP5EV+Xv7Pv8AwXC/bV/al8Bf8JT4F/Zl8Na14fmOLe5IuY/MGSMj/SOQcdqAP2Qozivwv/aG/wCDmn9pj9lL4iSeFfHfwP8AAeh62kKzfZpXudxDf9vP0/OvZfAX/BWT9vr4m+BNN8S6L+y54Lv9F1a1W6trhLi4/eKe4H2igD9aRIpPWnE4r84/+CTX/BXr4lftvftK+Nvhp8TvAOh+AvEHhS1E4trPzfMdssDu3yvwNo6Ada/RaWbap2ruVRlsdfwoAlVg3SlJwK+Kv+CmH7Xn7SX7KEsmufCn4WeEPG3gfT9ON7qWoaleSRz25HUBFkT37dq/Pj4F/wDBz5+0d+038TLHwf4L+Cvw+1bXtTZlht1muQU2/e3f6Rz7Y9DQB+7m4YoDZr8nviV/wVt/bc/Z00Btc8e/sq6NJoVqN9xPpd3NlFH3iSZXC9sZHrXtf/BNL/gvv8Kf+Cg+s2/ht7O+8D+NZmKf2VqMissrDORHJgbunpxketA7H3tQTio7eXzd3DLtO0g1X1+5mtdLma1jSa7EbGCN22rI+OAT2BNAi2HDHg0Fwp5Nfjv+3p/wW/8A2uf+CeGvQSeOvgf8M7PQdYvLi30e+W+uJftSxru+cLP8rYK/Xn0qX9hz/gtr+1z/AMFBNVmn8C/A74a3uhaZfR2+qX7X1xGLZGJ+6Gn+Ztqn6ccc0DsfsIDmhm2jmqehvcSaXbvdxpDdPEhmiRtyxyY+YA9wDXmX7aXjb4pfD/4Falqfwf8AC+k+MPGluVNtpuoztFDMuRu+6VJP0YfjQI9ZVtw4oLba/B/4sf8AB0X+0V8AvifqngrxV8GPAOm+J9Kufss1hLNcl1c4C/N54HJJ/IV9LeFv+CjP/BQbxr4YsdY079mPwFcWOpRLPBIt9Ou5GGQcG4oHbqfqR5i5xmlDAkj061+S3hj/AILf/tJfDT9sz4efDL43/BXwr4F0zxpqUVidQt5pmb5+vllpmUEfL1B61+sloWy+dxweGP8AEKBExOKY1xGg+Z1X6mmXEjAHG3GDyex7fh1r8x/+ChX/AAcFQ/Aj44r8Jvgr4Lh+J/xFeUQSeZc7bW2c8fdXluc9xjHvQG5+nb3Ecf3nRc9MnrS+Yv8Ah71+VP8AwuD/AIKcy+GP+Epbwb8J47XyDeHR1ciYJwQp+fJOM969Y/4JDf8ABXjX/wBvvxz4z8D+PPA1v4K+IHgdA17DbOxhuPmKjAYkjG09+cjpQB+gGc0U2Nslv9k4H5CnUAIOtLSDrS0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRTZJNhX/a4xigDP8AFerW+gaBeahdSCO1sbeS4mYnAVEXcT+lfyz/ALY/wf8AFH7aPhv44ftXeZNdaFpnjYaZa7gTHLbqzowA67VwvQ4+av3O/wCC+X7Vsn7NP/BObxi1hceRrXixP7BsGXO8yTEoduCDnp+dcz+xl/wTusYv+CJen/CHUrJRqHifw3Jf3YIG43cy7w44+9kDqD1oBHyn/wAGmv7Xq6h4N8ZfBnUbkfa9JlOs6UjE7mhctvUZOOML0FftVbMzLz0wK/kr/wCCbvxt1L/gnx/wU18N3WomSA6PrT+H9WSTIXyi+w7gCOxBHbNf1jaRqsep2kdxDKs1vdRpPA69GjZQVP480FvY0qKbGMCnUEDZU8xcf1r8k/8Ag7R0pZf2VfhZCSgWbxglszEfMVMLck+xxX62v9w/Svyg/wCDsZFk/Zf+E6uu5T40jBPoDC//ANagEfjf468O+Jv+CVf/AAUE02TzJo7zwTqFtqUEnObmzIU/NjGQysc4x90V/V3+zz8XdM+PHwY8N+MdInS40/xFp8V7C6nOdy5IPuGyK/G7/g5p/Ymkufgx8OfjfpNmsjaXY2+la8yJlZIGt18pmwM5BDck49q9D/4NUf2228c/s/a78G9YvJJdU8DubvSzK+5p7N+WHX+E+gHGKC3sfr/cP5ahvTr+Vfl1/wAHBHxZ1T46698Mv2XfCkkw174lail3q4gbD2tlGMnPYZBPUEcV+m2v6pb6ToF5eXdx5NnaQPcTyg48uNBuJ59h/Ovyq/4JReG7v9v/AP4KT/Fr9pvVI2uPDuh3Evhvw0X/ANXsUSI7KDk7gAnIIHJ4oIPwp8G+GY/C/wC0xpWmjb/xLPEkVqGTIyEnVMHse9f2QfD2yjj8HaTtz+7sLdF9h5a1/HhbnzP2xlKjaG8Vq23+6ftQzX9i/gOPZ4L0k92soCf+/a0GklY1Qu36enpS0UUGZXewj8z+L5zzzj19Oa/ny/4O4YxD+2J8Ox97b4bJy3LE+eV5PU8AV/QnJ93d/d5r+e//AIO6OP2xvh7/ANiwxz6f6S3P60DjufZv/BqZa4/4Jzahh32/8JRdsEz8oJVB9e1fot8WvhPovxl8A6p4W8Q20OpaRrlvJbXFvMgZXDKRnp1HUV+ZH/BsB8XvCngH/gnlfWuueKPD+j3Q8SXTmK81COCTBC4O1iDg4r6P/b1/4LV/Bb9jz4Wapdr400XxF4kNpIlnpelXIuJHlIAVmZchVBI9znjpQWfzba/fXP7Gn7cGoz+G7qazuvAnit7S1nhZvMaJbjaiNzgqQSDgDoOlf13fBTxHJ8R/hH4c1ufdHNqmmW9xIRwQ7Ipbg57+ua/mJ/4Jv/8ABPb4gf8ABUL9sddfutJ1C08J3WsNrWs6pLCY4MNKZAsTMCG6Ecg449a/qU8JaFB4Z0W10+zRks7C3itoM45VF2g4H0oJkfB//ByrbCP/AIJWeLG3EsdUszuIGc/P7V+Xn/BqQgl/4KPakrf9CrdrkDDHBTnPr9K/Uj/g5aGP+CVXir/sJ2f83r8uf+DUIZ/4KRap/wBivefzjoK+yf0fwW6xlvvEZ4BOccCo77Tor8MkgJV0ZTz2I2n9CasJwW+v9BRL90fUfzoMz8gf+DYO3+1+M/2lAzf6zxFhsAZG95mIBxnA3HH9a/XZtNQj5dw57N6DFfkX/wAGuxz4z/aU/wCxnX+b1+vg6fiaAPxf/wCDv2DyPhT8I2OSzandozfdZh5UfBIxmsj/AIM/ofN8KfGgM0jf6VYbQXPyZjmBxW7/AMHgfPwm+EHVv+JpeMQOpHlxg4/OvnH/AINu/wDgo58H/wBhHQfiXb/FDxbJ4buNens5LIJpd3eCQIku7PkRuBjcn3iud3GecBrHY/cT9tr4Y6H8U/2SviHoevQLNp9x4eu5ZBIeFMUbMrZPRgQK/ln/AOCYvizVvh//AMFEPhrceHZZl1KTXEtZvJJB8kuRJgfQJ1zX66f8FAf+C8eh/tXfC/XPhN+zrpWqeKvEXiy0bTp9V1DbpdnaxycZVpWVgWy2Mg428ij/AIIhf8EAbv8AZn8d6f8AFv4pappur+JLWNnsNK05kuYLVyBy8i7g7fd6Y5FApR0P2Ctt00fzNyyg8jsR+XrX5+/8HLdmLf8A4JSeMG2qP+JnZNwoG7Bfriv0Es1byMMfm74P3fb8K+Av+DmAf8an/Fy/9RGz/m9BMdz8sP8Ag1nthff8FJJtwXaug3WF2jA4TpkV/Rp4g8L2niHRZdMv4YryzvYTaywypuSRGBzleh/EHFfy/f8ABA79r7wD+xX+2rJ4w+I2uNoOhto88BuBbyT4Zgv8KAnAwPzr9Wv2lf8Ag5V+EC+FrrQfgy2q/Ebxxqdu0Vgq2j2dmjsMBmeXZt68c9jQD3Pw6/bM8OL8C/8AgoT46tfCMzwjQfFrJpzRt+8jbzV2qu3A2nnIAHQV/Wp+znqV9rvwM8H3uqf8hC60WzluCM4MhiBbg89fWvxF/wCCYf8AwQU8bfH/AOOsfxk+N+saHY2s1++tnQ7C9iv7qeV33KsjKWAUbRwRk5PPFfvNpFlBptotvaqkdvCipHGi4WMAYwPyFANnyV/wXfjWL/gkx8bJAq+YuiqyttHB8+MZ+vNfhT/wbjNv/wCCqPg3cFdmguGLEck4T8O1fux/wXk4/wCCSXxu/wCwIv8A6Pir+fj/AIIafHnwj+zd/wAFD/C/irxvrdn4f0Czt51lvbmQKkZO3HHU/hQV0P6s2f7KZNrhS7F3JyzYOc7Rn6ewr4Y/4KQ/8ExvEn7Vf7XHwh+K3gbVtE0nW/h7qUdxqT3eQ93bgrwCvUgBuMjGRWb+2F/wXS/Zstv2c/Gi+Hvi1oepa5caVPbWNvp7M1xJM6kLhh90Z9evHpVz/g228Zan8Qf+CZmg6nq9/qGoXs2q3u6W8maaUqWBGXYkkf4UGZ95WI89fm+bHfJ+b37d81+TX/B3Lb/Zf2NPALJ8jf8ACUAZUAFgIjjJ/Gv1vEYD7ufTrX5Lf8Hdabv2MvAXOB/wlA/9FGgqO54J/wAGgMZb4h/FllYr/oFmxA9czc1+6HiPTbfUNPeO8jjmt5YmSeORd8cybeVZehznvX4K/wDBpn8SfD/w78dfFaTXte0XRFm0+0WJr+8S3WVgZehYjOO/1Ffrf+0v/wAFP/gf+zT4GvNY8TfEjwyq2CE/Y7O9Sea6fbwi7c9ePzoDqfzmf8Fsv2fNL/ZN/wCCm3jfR/C0J0+xhni1i28qQo9sZEEvy4wBg9AB065r+iD/AII5fHHUv2hP+Cc3w18TavJJNfXGniGSSTO6TZ8oJzz0r+ej4i+GviN/wW4/4KGa7rvhXw9qTQeKNURUuWhZrewskGwbz6soyOcfKa/pl/Y+/Zzs/wBlL9m7wf8AD+xPmQ+HNPjt3kwPnfHzHjAPPtQDZ6sBgUEZpF6UtBJVvLJJJEb5g2WGQfVSK/km+Fw/42628Xylf+FjSoSyKxI8/wBxX9b8/WP/AHj/AOgmv5IvheMf8Ffbb/spMv8A6PNBUdz+tTS4dsWc/M23JwOflFWbgZA7/WodN5hH0X/0EVYkTePpQHU/Nf8A4OeNDt9R/wCCe2k2k27yrrxfYRSN0wjCRT0+tfjz8dfhj4m/4Iq/8FGfDWuaTNcQ2tlNb61Zzglhc2EqqZYyRjOMjIGOor9kv+Dmlj/wwj4bTPyt440oMP7wLsuP/HjWN/wXk/4J3L+2F/wT20vxhodun/CZfD3SYNQhwgJvLYxxmaJuNxGEBABHegGz71/Zr+Nmi/tM/A3wz440O6S80zxHp6XSspBUMwBZeO6nI59a+Cf+DnGxjX9ln4aqwLIvj3TsqcAP84HOME9a+af+DV79v5ra71L4D+ILqWBJpJbzQFlc7ocZ8yLk467QAAK+l/8Ag5xZ0/ZZ+HBJ3f8AFd6bn/eEi5/DpQSfov8ADbT47fwNobLuLLptsu4nnAjGBW8qbWY/3qyvAC7fA2i/9eEA/wDIa1r0AfFf/BwHZRyf8EmPjAdu1pLK3yRwcm5iXP1AJr8xf+DRiLf+1F4+k6yDRFfJ5ydxH+frX6gf8F/lz/wSV+L59LK2/wDSuGvzB/4NFTj9qD4gD/qBJz/20ag0+yfv5rPh618Qae1nfRC5tZYzHLFJzHMmMFXHQ5z+lfzL/wDBbH9nWf8A4Jd/8FOofFXgDztDstU2a3pT2zYaM7wZYhjA25IBGM8da/p2c4HP5etfiX/weCeBIk8P/BzxBHGq3Mk17YCQDnYvkvj6/NQZ7n6i/wDBPP8Aatg/bJ/ZG8GePIWVrjVLJEvVAwFnQAP3J5PPJr225Qyx7ezDB4r8xP8Ag1V8aS+IP+Cfd9p8kjSLo2vSwR7uoQqGH65/IV+n9AH5R/8AB2hGLf8AYM8KMv8AF4ri3DAG79y/pXI/8GicAl/Zs+In8O7Wk5ABI/d9iQa6/wD4O2/l/YJ8J/8AY1xD/wAgyVyn/BocP+MbviJ/s60n/oug0+yfsAbQRKu1mXauwDPH1x61+Wn/AAXwtFT9s39kENtbPjSJSxRdx+dOpxntX6ny/d/EV+Wf/BfXcf2yP2Q/+x1h6/760GZ+ow0yMTtL8xkbAZu7AdPyp18zRQFhn5eOPvdRU1MlLKV285OCPWgD+XH/AIK3/El9U/4LVaveeMPtE2kaNr1nFNExzusUcHPPA757Edq/pf8Ahl4n0Xxz8O9J1bQZrO80W+soJ7AwANCsWwBUXHTbz9C35fkd/wAHFn/BF/xH8bNfuPjf8L9NfWdSjthHrmiQ8TTKnIkTA7DdkHOeMY7/ABT/AMErf+C8fj7/AIJz38PhHxdFfeKPhzHN5dzYXeUvdHbJDLGOyj3B+7QB+zP/AAU0/wCCdXiX9qj4+/A7x54PutLtNY+HHiOO51Ce+BSSez+UkArjcQVbr0yOK+1rGdnRGZt3mDP0PfsOK8p/ZN/bG8B/to/DW18U+AvEFnrOnzxgyRRyg3FmT1WRevbsOx69vWrdlkbI6YBHPrQOx8+/8FRvgr4u/aQ/Yr8ceBvA0NnN4k8RWX2a3F1P5MYBI3ZbHoa2P+Cf/wCzrdfsq/sjeCPh9fLb299oOmRw3LWj7lM3G75sYPPtXtslusrZYZppt1Mq/ezjrn0xQI/mb/4Ojo/+Nmerbo4z/wASO06jr6f5Ffvf/wAE04T/AMMBfCN1PlhfDVr8q9Pu54z61+B//B0yM/8ABTTVDk/8gKzGK/fT/gmWPM/4J+/CPP8A0Ldr/wCg0AeI+GP2EfGXgD/gsnqnxu0m00m38A+JPDf2HU/34W4W45+baMZyf6+tfbsVvvQbvquBjA7fjUrQI3VFP1FOAwc0AeV/trWyr+yV8SGVVy3h+8z8oOf3Z5OR2r+bX/g3dC3H/BWnwKZI43ZxeMTtA53e30r+k79tV9v7JXxG/wCxevD/AOQjX80n/Bv54m03wd/wVU8E3+rX1npljCl4GuLqZYYVJbgM7cDPNA47n9SetaJb6zp01vdRLc2t0HhlilJaORXO0hlzgjHrX8o//BQXwsv7Fn/BWjxovhOaTT28M+KI57Jomw0YdlJQbcDacnIAzwOa/pG/aS/4KVfBj9mv4ealrviD4ieFl+wwSSR2tpqcc8ty4IIVNuec4H41/Pr8Af2cvHH/AAWo/wCCnWqeLtL0m6tvDOsa7/auo6jKhMFpbIwKrkj7zBTjOehoG9j+mL9nzxVN46+CHhPWrnd9q1PSreeYkdWMYJ/WuunjEi4bp9Ky/Afh+Hwp4V0/S7VZFtNNtYrSHcMblRdu7HvWtJQJbn4//wDB3zarb/spfCdhyT4qmU5UfMBZS9eK0v8Ag0uhWb9jzxo3yqW8QPnCj/nkvqKo/wDB4Cf+MT/hT/s+Krhv/JKT/GtD/g0rG39jzxr/ALPiBv8A0UtBUtj9bIl2DaOi8VHdqWC445HIOD94VIhzu+tR3bbdv1H/AKEKCD+WP/gu3bLb/wDBYrx+v8I1WzkXI3c5XPJ+tf0w/s8KsHwD8Gja21dCtQoRckfulHHv0r+Zz/gvfepZf8FhPiBcTOscMN/aySOxwsaqUyT+Vftn8Nv+C3P7Mfg34CaDZXnxe8NpqWm6HCs1shff5iQ/c9jkf57BfQ3f+CsP/BPHWP26LD4b33hPUtHsfFHw88S22qrdXg5dI2BdCV56AZGR1FfYnhuKeDR7dLp45J0iRZGRiQzgYbHHTPSvzN/4Nwvjpe/tGy/tAeJLjWdU1bS9Q8avNpn2q6aVYoCrFQgP3V56ewr9QFwScduKCDhP2j9evvDnwJ8Z6hprbb6y0e5lgx1MgjbbX823/BAz4taBoX/BWjTdW8eTRi61ia+jW5u2HyXsj4RSW7enfrzX9PWq6Ra6paTQ3UaTQTxtHKjjKshGCPyr+Z3/AILSf8EgPG37Cnx01L4jeDbPUtS+H+rXbaja6nYxl5tIm3BvnCAYwX+U44wc5oKjuf0sW9oRMGkZmnX7xI+ZhknAI4Kn0xXx78JP+CdXiD4L/wDBWzxp8aNIuNLh8D+MtBWC5tTlZvtWTnGOMDryO9fnn/wSW/4OUrvwpLo/w5+OU0l1ZxlYLHxMr7nG3gLOSSOcr2HQ1+4Xw48c6L8UfCVrreg6pbaxpOoIJYLqB1kjfPJA9PpQEjegXbu454zjofpUlNRs8ewNOoJEHWlpB1paACiiigAooooAKKKCcUAFFJuFG4UALRSbhSg5oAKKKKACiiigAooooAKKKCcUAFFJuFKDmgAooooAKKKKACiiigApssgjGTTqyvFviO18K6LdajdSxx2+l28t7NuO3EcaEsc+2RQB+KH/AAcX/tR+HfEn7evwY+GPiLUZofCfgm7ttd8S/ZYjMw3yKwyoznAX0719baX/AMHHf7KPh7SrW0t/EXif7LZxiCNl8PzrtC/LgcdOP1r5y/4Im+DLX9vv/goH+0F8evFWl6frmjHUW0nS47yATQoAzABd+c4Ead/4j6jH6tt+zT8PWuiX8DeE2bblv+JTCASTwPu49aAP5Wf+CtvxN+HXxq/bk8U+MPhTqmoSaD4jZL1vPsGs3gnwWypYYJJX04wc5yMf0Nf8EOf2tF/a7/4J4+B9YuZFk1rQbZdF1IKeRLFhQSCSfukd6+bv+DmX9hPw74j/AGGrXxp4W8O6Tpmp+BdUFxKbOzSENbyjbJu2AE48te/Gfevkz/g1B/a7XwH8efEvwpv7hvsnjW0XUtOAk+VLiMtvVQT3BT3z3oKvpY/oOiYsnPXJHFOqGa7+zRpuHzNxjpgn1NeT3f7ePwisfi2ngOb4heF4/FzyiAaabxfMEh6L9TQSeuv92vye/wCDsaQr+zD8Kvfxkin/AL8mv1djn82P5htOMnHzAfjX5Mf8HYF0037MHwrG3cy+NEJ2Hdx5RAOOKAPvz49fs/af+1J+xlqHgHUYo5LfxJ4fS1jLgERzeQjRtyDyCP1NfzP/ALB3x81j/gl5/wAFL9Om1OOa0j8O6+/h/XYuVWW1aXy2JXIPO5SD04PBr+qXwHb/AGrwBoMbSGNv7OtyrDghvLTBHUdjX4Gf8HTf7Fa/CT9prRvi5pVmsOleOoEs79Y49qR38ZwHJ/2t+fqtBV9LH6Rf8F3f2wZPg5+wG2k+F7zf4p+L08Xh/QUhyXkFxtBZNpBwFZefc17V/wAE3P2WIf2Kf2JvCHguK38m/s9OW61FjjM108bPIWwBnlRX5E/8EWfEXi//AIKp/tf/AApm8bLNeeEf2bdDCfvQWS6vMt5TPuyGb92ckAcKuMc5/fHWlZbGZWZmyj84+VT5b5/mKCT+OiPj9syT/pn4wYD8LvH9K/sa8D/8iXo//XlD/wCi1r+Ofy9n7Z8qlsM3jFycLuwPth9xiv7FvAb7vBOje9hAf/Ia0Gk5J7GtRSK2aWgzGyn5D9DX89v/AAd1/P8AthfD9f73hkjj/r5av6EJ2wByqjuT6V/Pf/wdyHf+2J8Pfu/8ixuZg2QP9IPbtQCOm/4Ia/8ABIT4P/t7fsLa14q8ZaRfT+KpNXvLO2u4L+SBbcqgCMFHHXGcg9sYr87fG/w+1T/gm/8At2/2X4q0G11pvA+sCaWz1KEypqNoH4HJG4Femc8iv26/4NSU+0f8E5b513bT4lvAOMbuE457f4Vy/wDwc2f8E3pPjb8Gh8X/AAvp63HiXwdCf7UjjjAe4tMp8/HJ2YOcno1BopI/Q79jD4neDfjJ+z74Y8VeA7PT7Hw3rlml1DBYwpGluSBuiYKMblPX8K9ejzz8oHoR3Ffz3f8ABsd/wUyb4N/FyT4LeJtUkbwr4mkE+jvO+I9Puju3pknG18pgYyNp5Nf0G2sjHcrLsKcAZySPX8aCGfAv/ByzJn/glV4s9tSsyPzevy7/AODUUAf8FJNSwww3he7+vVK/Xv8A4LvfCC++Mv8AwTM+I2n6fH51xpsKamEAyXEW4n+dfhZ/wb1ftJaV+zZ/wUk8L3muOtlp/iKxl0l7hnCxwyS7QA2ehyvGfegfNpY/qaQEZz3NRahcG3t2YD5gpYZ6ZAzzTLW/+0MPu4I3Aq25SD0IPfPtXnv7Wfxy039nX4BeKfGGuXEVjp+i6fPKJJHCh38ttq9e5+hoJPzP/wCDYCLyPHX7TKK24R+LGTPsskyj/wBBH61+vWevsa/Kb/g1d8A3k3wA+J3xGureS3tviN4omurIN/HEHkbd/wCRBiv1Zc7c9u/SgD8Y/wDg8G5+EPwg/wBnVLtvriOPj6V5/wD8GoHwW8I/Ffw38YJPE3hvRdeks7qyWBr+zS48oGOYnG4H2/IV3/8AweBPu+EvwhX+7qN4SR3/AHUeMfUisj/gz6Im8KfGplz8l5YHk4/5ZS/yOaC1KyP0A/ap/wCCN3wF/ad+H+qaTcfD3w3oOsXEDRWeraXaJZ3VtJ8uGDINpOcdVOO2Oa/BXwP+2L8Zf+CKH7b3iDwbH4s1bVNB8K6t9lvdNu5nngurPI2PjI+cKXyRgcjiv6kby7ijimaZo4YoSJZHkbCoowSSe3TvX8mX/BX/AOKFj+0X/wAFMfiVqXh4x3trqGtNpNk8LbhI4+QcfxDJOcegoFzH9VP7PPxg0/8AaA+CnhnxtpZ/4l/iewiv4R6B1/xzXxh/wcwf8oofF3/YRs/5vX0N/wAExfhbefA79gT4V+GNSZmv9J8PwRTbxhs8tz/31Xzv/wAHLkqv/wAEn/GB+9jUbPhTuxy9Ao7n5Mf8GzPw50P4n/8ABQWTT/EGkWGtaevh+4l+zXkXmRFhtwSvQ4zX71/F/wD4JkfA/wCOHhubStc+G3hlobhDCZbe28iaBSvJRlxhs45r8L/+DV+X7P8A8FIpFbGX0G5jH0wpr+kT7UZJI2TZJn+6epxz9AKAZ/MX+3n4L+JH/BCX9ultO+GfjLxBa6GyDVNJt3mLwyw/MfLkH8YzgYGCMnnmv6Fv+Cev7TK/tf8A7Hvgb4iM1t9q8Saest6sClUS5UlJQAScDcucZPWvwe/4OovjXovxC/bt02w0+8t5pPCGjJFeyI+9d5Lbk475x+dfr3/wQK+FV/8AB7/gld8K9Pv8tcahZSasEJ+ZRcStIB7Adh6YoEaX/BeZsf8ABJL43f8AYEX/ANHxV+BP/BBL4WeHPjH/AMFKPCOgeKtF0zxBot1FMZrK/t1mhkI24yGHb2r99f8AgvG3m/8ABJX42L/1BUBxz/y3ir8KP+DcgFf+CqPgmRvlje3nKDILE8dqClLQ/c/9rX/glb8EfE37Nvjay0X4ReE4NXk0y5ayk07So47gTYOwKVH5ZzXMf8G8vwf8SfAL/gnXpPhvxXouoaDq9prF5m1u0Kv5RYbG59q+4I0D7hyzbjyDjuc8Zr5r/wCCpn/BQG1/4Jt/syT+PJNKj1/VJ7yLT9O0uSfyZLt5GwSuM525XPTqKCOtz6gSTe5wQa/Jf/g7r5/Yw8BjHXxQD/5CNfpt+z3491D4ofBfwv4i1TTBo2pa3psN7cWXmeYbbzF3AFq/Mf8A4O4ZBd/saeA1XG4eJwSc9MxHAx6nB/KgaPhH/g3a/wCCenwy/b38VfEa1+JGmXepW+gWNvNaJb3TQNGZGZXPy9fur19PrXiv/BXX9gK+/wCCcP7Z8mk2dhLdeF9SuRf6A9yxnjlQc+Wxbg4AUHGDzX27/wAGgEin4ifF/aNsi6bZbQ38R3yZH+fav0U/4LZ/8E7oP27/ANjjVrSxt/M8ZeFUfVNEuNo85imWeEHB+8NuBx0oKbGf8ETf2j/h5+05+xloeveC9B0fw7qulxpp2t2mn2yRyRzouGdurYY7sZJ719pwRCJMD65z1r+WL/gil/wUM1T/AIJuftmQ6frXnWnhXxNdf2P4is5WKra3G7aJCM8FCSST/er+ozQvEVtr2i2eoafcQ3dhexLNBKsgIlRgCrA9wQaCTUooB4ooAhu32GP/AHj/AOgtX8kvwuGf+Cv1v7fEmX/0ea/rauRvMfDNhs4Ujjgj+tfyR/DJzF/wWAtV5Lt8SZ8gjHAuWHqfSgqLsz+tjThiIfQf+girR5qppkisu3PzAKcY6fKKss+3r07n0oJPzl/4OY4vN/YV8N/9jzpX/o0193eDdGi1f4S6DbTJHNDcaTBHLFIu6OaMwgMhHuD+lfCP/By+fM/YR8N7W3Y8c6VkryB+8Y88j0r75+Fc7SfDjw+pUj/iVWrL0zzEtAH80X/BUT9mTxL/AMEj/wDgprB4s8LyXFnoupaiuvaLOv8Aq2RpAZbYlQvQZ4GPxr73/wCC0P7T+jftkf8ABML4G/ELRJlktdf8YaWzqrZ8qVZFEiEdQwOM59RX1P8A8F4f+Cfn/DdX7GeqR6Xbq3i7wgn9p6TKQNzbAS8fTJyAOARX87fwr/ae17TPg5Y/BjUhJJp8Pjax1q2hk3A6ZcJNsliGTgITtJGM5HWgD+u/4ftu8CaI3rYQf+i1rXrF+HoaLwRosfBVbCAAjv8AulrZZto/+tQB8Zf8F/jj/gkp8X/+vK1/9K4a/ML/AINGBj9qHx+P+oCn/oxq/Tr/AIOAZSf+CSXxgEYJk+w25AwT0uoTz6dK/Mj/AINHUx+1N8QF+6p0VQuTyV8xwP5Ggq+lj+gaRljXcxwq96/FX/g8A8VRHwJ8FtBEgFx9vvr4Z67D5C/lwa/Z7Vtat9JsWuJ5oY7aFTLPLI22OKNeWYnoMe9fzQ/8Fzv2mLn/AIKZ/wDBRzS/CfgBZtY0/R9nh/SDD86zyM/72QKOmDjJ6HK+hyBF2Z+lX/Bqj4Qm0H/gnpdahJG8f9r67NIhYcMqfKCK/UKvBv8AgnJ+y6v7Gf7IPgn4ftta60ewQ3cgxl52GXzgDkV7z1NAmflL/wAHbi5/YI8J84/4quI/+QZK5P8A4NDwyfs3fEXd8rf2yh/8h161/wAHTfwyvPHP/BNuTU7WFpk8M63b30u0ZKKQyZI9ME5/CvlT/g0n/aC03SdW+IXw9uLpEvNSaPUrEs3+vwrhgB3wAv50D5tLH7quNycHuOa/LP8A4L5o0n7Zf7Isa53f8JnCwPriRa/UKO+Lqv3W6ZCZZuncdua/KL/gqX4rh/ab/wCCzP7Nfwy0Sb7deeC73+3dUWAhjahSrYPUAdM596CT9aaZNMsK5Y44z0pYwQPm698VHddY/m2gnGf5UARlmugVKfI45VwOQex5NfnP/wAFXv8AggD4F/bYs7zxR4JtbPwX8SBGzLcWoWKDUsYO2RdpGeDyMfeNdd/wTx/4KVeKPjZ+3L8Zvg34/fSYdY8I3u7Qkt4DbvcWwMmc5Y7jgL0x9K+5rmRryL5QrZXIVWG8dOeehFAH8nf7LH7QfxS/4JC/tx29jcNfeH5tP1NLTWtLkZja3UTMVL7MjgjOOe561/Vd8KPHdr8TPAOj+ILH/jz1uzivIif9sZI+gr+d7/g6HsNG17/gpJo9loq27a1eaJaQX2zG83DS7UBAPJwp+mTX70/sMeDb7wB+yX8PdE1JXW+03QbVJdx+Ykpnmgps9cprna34H+lOxzUc7AD7wViOM9+lBJ/M3/wdLc/8FMtU9tCs6/fP/gmOc/8ABP34R/8AYt23/oNfgd/wdGp5/wDwU31JSNu7RbMcsOQAfy/Gv3u/4Jguz/8ABPv4R7lCt/wjVqSAc44PegD3iiikZwpGf4jge9AHmH7a6bv2SPiQ393w5ff+iWP9K/l6/wCCOf7OHhH9rD/gob4T8D+NLW4vNB1Q3LTQxSmJnKgMPmHuxr+oP9ta5C/sjfEr+H/inb4ZPr5LD+tfzdf8G7ce7/grJ4FkT5gRdcEcg4A9uKARd/4Lnf8ABNaw/wCCbX7T2i33hHT7qTwPqyx3VhBdS/aY1njcF4m3D7p3LxweDzX7uf8ABH/49eBv2if2LfDXibwXo+i6D5sQstTttPt0hSK7jUBwwHzc9sk9DWX/AMFlv2B4P25/2Kdc0SONW8TaFGdT0q42Derx7mKZ54PGQMZxX48/8G4X7dc/7Iv7W998K/Ety1j4d8aXJsJI7hikdpqMbMA65OF3F+4PSgq+h/SJbSeau7I9sDoKdJUOnOzo+7bu3c7TkZx1HsetSXMnlR7sE45oJR+Qv/B4D/yaf8Kv+xouf/SJ60f+DS3/AJM98bf9jA3/AKKWsz/g70lW6/ZS+E6k/e8VzhsdgbRwP51p/wDBpYR/wx540+8WbXiSQPlU+SmRQU2frXH0P1qO96L9f5c/0p8JyD93r2NMvFLKu0biD90dT2/rQSj+WX/gvJCtz/wWF+IcUmPL/tKz3AgHcMRkqc8YO45/Cv3y+Ef/AATU+AvjD9n/AMNtefCXwLNdahokEksraanmM7Qfez1zk1+Bf/Bd6Vpv+CxPxAGyRd2o2W44yFOUHUH/AGR+tf0zfs+Lv+A3g7LR7W0OzUMj5/5ZL7UFNnwz/wAEAP2ZNf8A2X9Y+Pmk6t4f1LQNNuvGkjaQl3B5ay2wQ4KcAFRkdB3r9HoJAxYd+prwv/god+2FZ/sFfspeKviVeWMeqy6PGv2WzkuPJ+1zOdqoGxx0rsv2Ufi5qHx7/Z98I+MdW0qHQ7/xFpcOoSWEc3nfZvMGQC2OaCT0OSXYfulvYYrG8V+GNP8AHOh3WlapptvqOn3kTRTW9ygaOQHsV6Vxv7XXizxH4D/Z38aa94TFq3iTQ9KnvrATxmRGZFLEEAg447EV4n/wRy/bnvv2/v2OtH8Xa1NayeJ4LiW31eG3Ty1gkViBhSxYZwcZJ6GgD86/+Cyv/BuLZ6XomufEr4J2qLaxMb/U/DDJ+7IXBZ4goDcZP8XFeJ/8G4//AAUe8TfAP9quz+D/AIl1bULrwn4vdrK3tLly39nXIzsVcn5eWI5B6V/RJry2qafJLeYjtVik8535URbfmB7c8flX8vv7N/w6/wCFrf8ABdm2sfBsP/Eth8dyXi/Z+RFBGxLkY6dRQVc/qSs0aNWVsZzzjoD7e3T86mqOAYDfdznkjuakoJEHWlpB1paACiiigAoopGODQAtBGab5qj+IVR1jXINJsJrieaOGC3jaaWRztWNF5Yk/SjULpK7L+yjYK8Kk/wCCkXwTglaNviHoIaNipH2jOCKb/wAPJ/gj/wBFE0EfWc/4V1fUcQ1dQf3HmvOMEt6q+8932ClAxXg5/wCClHwRH/NRvD//AIEH/CtrwB+3T8Kfid4mg0fQfHGhahqV0cRQJPlnPoOlEsFXiryg7egQzjBTlyxqq/qevUVDFdCVGI/hbafrUobNcp6XWwtFFFABRRTXmVOtADqCM1k+KvF+m+EdButT1K8isrGxjM080hwsaDqSa8Rj/wCCovwFLMP+FmeHVKnBzcYwfyranh6k/gi2c9bFUqTtUkkfQewUoGK+ff8Ah6F8Bf8Aop3hv/wIP+FB/wCCofwFH/NTvDf/AIEn/CtPqVdbwf3GP9pYX+dfefQVFeWfBz9sj4cftAavNYeDfFuk6/dQJvlS2l3+WDnGenXB/I16jFJ5iA8cjtWNSlODtNWOqnVhUjzQd15DqKKKzNAooooAazEMuO55+lfHP/BWL4YftHfHH4cSeC/gXeeE9NsfEVnNa63darO0FwiOFVRC2COnmZ49OtfZBGTTdgJPvQB+Wf8AwRU/YG/ai/4Jz6yvhHxPN8PL74b6pfSXupPb3ry3sc20AbThVweTgqeR1FfqUBucdx1xnj2P6dqcY1JXIzt6E9qULhi3PPvQB8Tf8Fg/gl+0J+0r8Nbj4ffCMeB18K+JtNltNbl1q4eC4Ry6lTEwyv8AezlTjj1r8tfgb/wbd/tcfs8fFTQvG3hXV/h3Z+IPDtwt1auurlgcdUI8sfK3GQCM4HIr+iIRqM8dTk/WnUAeV/s/Dx7f/AjT4vii+hx+MJIGhvn0ti1srEEBhnkfma/DX4i/8G637Qmu/wDBRGfxBHNYvod54jGrL4mjvds0Vv5gcAAg8gDHTua/odZQ3X0xTVgVE2r8vuAKAMS1sLzSPCEcNm8V1fWtmIVllkMaSSqgXPQ8EivyD/4Ka/8ABNz9t3/gpFqmmw69ffCvT/D/AIZu5rjRre0vnhdvM2jdJuDgsAi4OByTX7MeSCwOW4/2iP0pdgz/APXoA+R/+Ccej/tOeDdJk0L47SeBZ9J02wSHTLjQpmnuHcE581jgDA2gcc89MVs/8FUv2HI/+Cg37IXiTwH+5i1qZBc6XcSkKLe5j5UjIPBJ59h1FfUBGfeorkooyyqzDkA/hmgD4m/4Ipf8E3L3/gmt+zBJoevfYZvG2v3TXmrXFoQY3YgiNR3Cr82ASTljzXbf8FAl/aW8Q6dpNj8CP+EFjjuLSVNUl8QTSQsshAVfLKEZGC+fQhfWvSP2iP24/hP+ylqNrb/ETxlpXhWS8UPDJeI/lyDJAAZQQD06+tekeB/G+k/EbwtYazol5BqGl6nbpdWtxASY5o2zhgffFAH868X/AAbCftUP4lOtPq3w9OqLdm+eb+2ssZDJ5nH7n1z+Ffsd/wAE8LD9p/w202k/HaTwC+kabZQxaZPoMjy3EhQFW81mOOnl4+Xn5ulfSfxG+JWi/CfwnqGveItStdJ0fS4GuLm5uG2xxIOcniuI/Z5/bW+Fn7Wkt1/wrrxfp/ixLHInks0k8uM7mUDcygHJRumfu/SgD1ONmLsrfwng+op9AOTRQBw/x81Dxpa/C/VW8AQ6PP4sWLdYR6m7LbM4I+9t5I/EV+Kf7e//AARW/bT/AOCivxcs/F/jzUvhaLzT7YWltb2mqPFFDGGL4KlWOST69h75/eGQqo+Y7QevOK8a+KX7dXws+EfxW0nwTrHjDTbfxZrl2lrbaWjFpy7dNwGMZ7Z96APzu/4Jf/sEfts/8E39KXwrp83wl1LwRqGqi/voZ7+Wa4hBOH8rG0Dg+h6c5r9XfEPhWz8YeGLjT9Wtbe4stQt2t7yBgDHKjrh0PHKnPt0rWgXcz5ztztG7OfepDECf4l+hoA/n1/aC/wCDYn41ab+0vr2u/CjWvCdj4aj1Rr/Rjcai1vcWhLbtoKpjC8YBHHvX6tf8EyvDX7TXgrQdQ0b9oC+8FapaaZa20Wj3uj3L3F3KV8wS/aGOB08rGF5+b0r6wWJUYlRjccnHeuR+Nvxq8K/s/wDga48SeMtesfD+iWoIkurt9sanr06npQBv+JPD1j4t0W803UrWO8sb6FoJ4JBuWZCOVI96/FH/AIKBf8Gt2t+IvibqPjH4F67p1rDfTtejSL/MTWc2QVMbLt6HdjPT3r9if2fvjl4Z/aR+F1h4w8IaguqeH9WLNbXKDCy4OCR7cV2giXfu/i9fSgD8U/g1o/8AwVG/Zq8NWvh2003Q/FWn2a+VFc6hLHK0Sjgck8j0+neuq1j/AIJk/te/8FI/EelwftJ+PtN8OfD+3mWebQ9G2K18P4kbAIAGB94HO7jHOf2E200Qop4VR+FAHG/AX4D+Gf2cvhfo/hHwlp8Wl6HolusFvDEm0HAALH3OBmtvx/NrFv4R1B9BWxbV1tpPsgu5CkPm4+XdgHjP0rZpCu4jrx70Afid/wAFEv8Agl5+25/wU4vNHfxlqHwotdM0B5X062stSkt1TfgbmDBzuIUd6w/2E/8AgkX+3X/wTrvPEEnw38R/C2zj8TeX9uiutRNxHIYwwVgPLGCNx/Ov3NxtP4YpMZ6sPwoA/Jn4v/si/wDBRz9pXwvceH/EHxS+G3hbSr5PKuJNIdvMdSMHt/8ArzWv/wAE6f8Ag2o8D/smeObPxl8RNeT4geJbUiVEEO2ySYklpMMpZnJ287sDb0r9TxGNwbuKBEA+75voTn/P4UAQWtsLa2Xy1WNFXaExhQoHA9sV+VH/AAVG/Yr/AG1v+Cgem654Itrj4V6b8N5r/wA6yjj1GWK9kjU/J5hO5T/3yPwr9X2Tf1/L1oK5NAH4Dfsi/wDBB79sz9hz4wp448Ba98M7HXPIe3PnamZI2VsA5Bjz27EdTnPGPq3xT8Ef+Cl3xM0SfSbrx78LdBhuozG91p0u6RQeuMAH+f4V+pjZ7UijH/66APx0/ZX/AODXkL8WF8cfHT4gN421Se5+1XdnaWx23T5yVdpA3y5A6ep9q/XPw14R07wP4bs9N0uxttP07TYhBawIfLjt4wAAo68Cthow5Ge1ATH09PSgD8zv+CpH7MX7aH7b2heLPh34bm+F+l/C7V2WKORr2SHUJ4wythm+Zeqjqnevib9lz/g30/bA/Y9+NWm+PfBOp/DG21/S93kvNqrOgDdcgx8/gRX9BYRVYkKAW6kDrS0AfmLD4T/4KbBG3eI/gruwRnzCcZ/4DXg/7Rf/AASp/bf/AG6PiX4MuPi74s+Huo+GfDusQ3k1hY3ZRCgZS2Btzk7B3P4V+18z7APu/ieteJfH7/gor8Fv2X/Fseh/EL4gaH4V1KQApDe+YpO7phghBPsKAPRtJ05/DHgq303S4rVJtNsRa2qSzMqB1TAGcHK5Ar8jf+Cl3/BOf9tz/gpcumaX4quvhTY+G/D9/JeabbWt9Jbs5Pyq0mQ2SFA9Oa/RvwZ/wVC+AHjzXYbDTvij4bkvJ2CRJLNJbhyegBkVQSfavfbW5jvLdJopElilUOjocqynoQe9AH4b/wDBOz/gkR+2x/wTR8farrngPUPhPc/23AsV9a6hfvPHMqZwQAEO4bj0PXtX7RfC+88Q3ngfSm8WLp0fiJbVHv0spN1usxBztyAdvXjJrqSuT1P+NRXkq26KWZVXPV+n/wBb60Afin/wVj/4NufHX7Rv7VuoePPg1N4ZsdF8SxC61Kyv5/s/l3ecsy4Xo3X1GBzX05/wSh/Z/wD2xP2V7/RvBvxQ1jwPrnw20q3aMXEd802o2gHCRqx+XZ7bM8da+jfHf/BTL4S+DPGWoaNHrOr+Ir7RuL5fD2l3GpxWZ7rI8KsoIwepHQ+9ei/AP9qDwH+034YfWPBPiCx161hJWdYgUmtnHVZI2wysPQjsaAPQLY7gW+U7uQR3p7c/jSIOc5zu560pXJB/u0AfNP7fk37RjabY2PwFXwKsl1BMuoTeIJXjeMnYIzEVPP8Ay0z6cdc1+Nml/wDBtp+1l4f+K0Pje31z4cR+IodT/tcS/wBsn5pvMaQ5/ddMuehBxjmv6KQoFMlfyE55yQOT1yaAPnf9gD/hoO28KXtn8eIvBJ1CzMaWU2gXEkolUBg/mbycfwY9ct0r6HYAFZGwuBzk8CuT+MHxr8MfBDwVca/4q1yx0PSLfIe6uW2qW5wijOSx2ngA5xXg1v8A8FefgqFt5rrVPEml6VdOsMGq3ug3ltZOzYGPNeMJ1IwenNAHyL/wVh/Ya/bG/wCCg3iK48N2d58L9P8Ah7o2tjUNFI1B4bqYJgxmXIdSR3+VetfXP/BMjw9+0h4J8GXOi/HuTwPdR6TbQ22k3GhTvNJIqZUiUnjoExxzhulfTul6vbarp0N5ZzRXNrcRq8cwI2yg4III9jXknjf9un4XeFvjl4d+G914u00+N/EFy0NlpURMspdVZvmxjAIBx9DQB7FLElwGWUK0bIQQ3Qg8EH/PevwK/wCClP8AwQB+J93/AMFA7vxZ8J/DcWseCdav7fVJgJAjWEnmq0nQAEN2wONp65r989PT9yVZCo4J3dyeT/Op3jVh6duDigDF+H9vNY+E9Ls7hfLuLGyghlj/ALjiMAjPfpW03+sXjsec/ShF2k85zSlcmgD81v8Agrr+yj+11+29B4m+Hfgm8+Hdl8KdUMY8ye+kg1KfayvtkOGTAZegXuee9fIv7FX/AARY/bW/4J/fEDUPEnw91v4V2eoalbG0mFxqLSoE3M3Qp1yxr94ymfX86Cme7fnQB+SnxV/YW/4KBftlaNN4b8efGLwP4R8N3BC3Y0MbvOQ8EHaFI6d85yenf6C/4Jn/APBDD4V/8E9dTj8RRmTxd46IBk1i8UMI35yYxtGOp56190lc/wCNIIwGz3oAalsqtux8x5J9akoooA5P4z/CnR/jf8OtZ8K+ILOG/wBH1y1e0uYZYw6bWGN2P7w6g/zr8P8A4z/8G3Xx5/ZS+Ph8efs4eMLSSK0kaawElwILyzGQTGeArq3TAXjZ15r96jEGbPP50GJQRhV/LpQB+PGh6/8A8FSPF+jR+GbnT/CehvcJ5La3L/rV/wBpcPyfw719O/8ABL7/AIJP3H7InjDWfiV8RPEU3jj4w+KU26hqcqDbZqSSVjOM49OeOc5yMfdRXd1oMILA88e9ABGDjJ9OlQ6mrNb/ACYLAg4I6gGrFBGf8aAPyA/b5/4I2ftCS/8ABQHUP2gfgN4o0K31C5CSLbTSmF8j76N/eVvwxjrXYXXx4/4KUX/hRvDsfwx+HdpqTIIv7cN625c9WUb/AG71+pwQKeBjPX3pcc0Afkv+wV/wb+6xbftDr8aP2kfE1v458ZG5+1w6eib0il3Ftsh28qpxtAwRzzX6xWlmtouF6YAAwAEA6KMdh6U9IFjPGfXkk0+gAPSvK/2stV+J1r8I7xvhJB4bn8ZiRPsq61Iy2u3vkKMnt3H416oW2jnivGdT/bX+GVp+0Lpfwx/4Sqyk8bau7+VpsEpaQKq5JYDGO2M570AfjD+2h/wQg/bE/bq+Od9488bat8KW1rUI1iMVtq7RwwKucAL5ZI692PSvvT/gmf8AB/8AbM/Zmh8G+AviBJ8L9R+G/h+2FmbqyvZJdSjjX7oB4Vu/8PbtX6HRphBjcvHSgxBmB+bj3oAbB8xZ/wC8B6/ypt4CY+Ny8HlRkj6VIkYjHH5nrSlAWDYG5ehx0oA+K/8AgqD8Of2o/jTpdx4V+Dcvw+tfCevaU9rqM+sXkkF4S4x8vUdC3b061+Yn7Kv/AAb8/te/sgfHbRfiF4R1L4af8JFoTF41n1VpIpweu4BFJ/4CRX9B4QK2fXrSFB6n8zQB5v8AAHUfHusfBzTV+I9voSeLmTbqMWlSM9r6HAbkZB9TX4//APBRf/g3B+J/xH/bT1jx78GtQ8MaVoeqTRahEt3eG1lsrnJJZPlYHk+nHvnj9yFXBoeMSKV5GRjg4oA+V/8AgmvoP7RXgP4bzaD8er7wnqd1pKx22lXejTPLNOiBgxnZuCx/d4IAz83Ar6c1j7U2iXDWPl/b/IfyPMyE344yewzirhjBPr9adigD8Xf+ClH/AATa/bY/4KbPpumeJrz4SWvhrw7ezXWm29pqkqSMXGwNIGVsEKoxjuTV7/gmd/wTh/ba/wCCZ7XWleHbr4TX3hTWrqO41G2utSlkdNvylowAvzFSeueQK/ZTGDRQBV0Zp5NOha6EYumjXzhG25d+OcHA4zmvOP2vpPignwavP+FQw+HJPGbMq2x1qV47ZRnk/KMk/iPx7eogYooA/nr/AGiv+DeT9rn9p/46618QPE2qfDZvEWtXC3M7W2sMqQsCCNoMZOOP4i3evsjwd8Jv+Clngbwnpuj2Xib4N/Y9Lt0toA8jM2xFCjJ25PAr9TKKAPxf/ay/4Jzft9ft4adpPh74l+LfhzN4Vtb+K9nsNOu/KjnCOhII288Djr3r9fvhR4NX4e/DzRNDjRY4tHsILNVVty/IgB7DvXQlQxH+z0pQMUAYnxB8JR+NvB+qaW7eWNStJbQvt3bN6kZx3HqO9fi58Cf+CUn7a/8AwTI+MHiDXvgnrPg7xZ4Y1q8lu5dMurloYplZmKgxk5BG5u/ev29KBmBIGV6HHSmeRhQOG/3qAPyX+NUv/BRz9sLwpJ4RuPCvgb4Y6XqUZt7zUre+Mj7TgEgKwPr69e1e4/8ABI7/AIImeH/+CcAuPE2r6mfFXxG1eIreai0Y8mEsSWMeV3bjnrk9K++dpb72Pwo8sFt3P50ANt0KRge351JRRQAg60tIOtLQAUUUUAFBGTRSMcUAVpo9zdO3XsK+Qf8Ags7+04/7Nn7FHiD7HL5eseKFGlWRXkgycE/lmvr25+cFdxABycdx/nFfiJ/wcM/tGzeO/wBpzT/ANrKw0/whZx3EyjOGnk5GecfKE9P4q9PJ8O8RWUT5zibGfV8HJ9WfEXgO/wDtWnNasw823faHdFLyg9Sxxyc56YrfQtGzBZEX1yg5/IV57o2oNpOpLc7mKq3zA9816BZzLcQiRSCHGa/bctqRlSUJRWh/LGee2oVeaM3qxzF5OrRv/wAB6V1XwQ+Iknwg+Lfh3xMmV/sm/imcoozs3fNXM9aa6MzcFuAc+mK6sZg4VaTpOK1PLweZVqFeNbmd00f0tfC/xvZ/EXwPpuuWLb7XVraO5Q5zwyiumi6V+ff/AAQx/asj+InwbuPAeoXPmav4XYtB5h/eT2xzjvztxzgDqK/QC0lLBlfbuX07jsa/A8xwbw2JlTZ/YXD+aLMMFDEre2pNRRSNmuE9wUjIqGRNqMWqUnC1Q1C78q3kZ2VY4/mZ2OAoHc+2M046uxMpKK5mfEn/AAXT/aji+A/7Id94ftZhHrXjcmxgUfeWL5d7fX5h7deK/BqNfLG1iquoCsCg5I78DqfevrH/AILF/tWL+05+2FqS2N19p0Hwkx06zCsTG7r99uvXIHIxXygNqkkcM3U+tfpGQ4L2VK8tz8N4qzSeIxklGXuoXr08tv8AgNI6qyYby/mIA+WmzSED5a1vCGk/2vqCud3lR8mvocPRhUmonxuIxkqMOdyZ9Of8Eqvi+P2aP2qvDGpTybbLVJRYXSjiPEnCk+45x6ZNf0KaPNHcWMckbKyMoYEdweRX8w9tcSWAjlgklV45FKsCAUI5BHuMfrX7+f8ABNf9oyL9oj9lTw1qoljkvrO2WyvADyJI+OeSeRXy3GuU+xlGrDY+48K+IZVZVMJWlr0Poaio1m4pynLV+fH7d5DqKKKACiiigAooooAKKKKACiiigAooooAKR13DrjnP1paKAPg3/g4J+B8Hxy/Yg07w39nt2vvEXjLRdHjufLXz0E9wY8K2OMbzj3x1o/4N7vjpffET9iiTwVrlwZPEvwp1W48N30TE7oljbEedxJ5APtxXpH/BW2Ld8GPhuQSP+Lq+FDn0/wCJlHn9M18v/s46nJ+xR/wXm+JHgZVFn4b+N2kr4g07dxELpNzHpgcjdx1yRQB7D/wXs8XX1/8AsizfDvRblodY8fech2n5ltLeJpJmHpgmMZ6cnisL/g2w0CGw/wCCW3gy4t7e3hkvLi9aWXb87f6TIvXr2PX1q3+1nYj42fGb47eIrgPPpfwl+HF1oFnuOY1v7qF5rhx/00VBAMjGM8g9n/8ABt7tP/BKPwO20K0l1dsV/ukyEkfTJP50Afdmsavb+H9PmvLqaG3tYUMk000gjjiUdWZicAV53oP7Z3wt8VeLo9B0vx/4QvtYlbatrHqabnb0U9GPsK5X/gop+ynrH7Zn7PreBdJ8VSeEo76/gkvrlELme3VsvFgdmFfBP/BcaX4Ifs//ALCUemeD9Q8G6R4/8C3djdaO2kiP7VvjdVkMjxruG44JDNzjjHOQD9aPNF5FuVmVOQw24IP4jtX5ff8ABZbwxp+n/wDBSj9kTVI7CyW+1DxHMst0IVWaUD7PjcwALY7ZzjJ9a/Q/9mbxVdeO/wBnXwPrF9KZrzVNDtLieT++7QqWP4k1+f8A/wAFphj/AIKEfsa+/iW4/wDaFAH6YS3P2KNncsyqu5jjJI57Vw/xL/ar+HXwZ1JbPxZ408L+HrtuTDfanFDIg9SrEH07d67a5Lb1EbKkzJhC3Qfh37cV8W/Bz9i74e/sha98SPG/xm8VeFfE+qePtYnvW1DxCUX7LaOQEto4pd3C7iPlGenNAH2J4T+IGk+O9Fs9S0a/s9U06+TzILq1mWaGUezKSDXjX/BUjwrp/i39gT4pQ6lY2uoW8GgXU6xzxh1V1jO1hnuPWvjr/g32+IdlrPxu/aY8I+Hb5rvwL4a8XJcaEmW226TefuSMN0j/AHa4FfaX/BSyV4v2C/iwy7do8M3m7PUfuzigDxn/AIIQ+IrLwp/wSK+EtxeTwWtnb6W2+aaRIkT962MkkCvsDQfHOl+LLRrjSb6z1O1V/L8+0uI54g+Om5WNfjL+x/8AtH6L8av+CffwG/ZR0C40efxF480+Qa1e3Uu1dLtI523iPBB85xjaeQNrZU5GP1s/Zw/Zf8H/ALLXwt03wj4P0uPS9P02NTuT5nnkxhpGJ6scZ/woA67xX4603wRpgvNWuodPtC6xCadgiF2OFUZPU1YvPEMNjayXE0kMNpCnmyXDOPLRMZJJ7V+Zf/Bxp8OLawsvgb4qt77WrXUZviBpumyxxX8i208TOCd0edpPH09jXtf/AAXF+G9l4u/4JleOtSku9Y0++0PTFvLabTtQltDuwilXCEBlI7EZHYjJyAfY/hvxTZeKtDtdQsbqC6s7yFbiGWJtyujDIOenrVDW/ibpPhm8sbfUr6xsrjUpBDbQy3CLNO7dFVM5OcGvFP8AgkszS/8ABNH4GszuzSeDdPYlmLHJhDE5OSTz3Jr4T/4OC/ghA/7YX7OGsaHqmsaL4g8YeKIdKvbm2uyoEQ2jKKQQr4Y84xzyDQB+mF1+1p8N7T4gx+Fbjxt4Th8SM2waa+qxi4DdNpX+97Zr0L7Soj3Yz6BRkt9PWvyx/wCC337FfgH9nT/gnDJ4w8MaLb6f428D6tYTW2vRKBfXEhlxIZpMZffwW6dBjFfo1+znrlx4s+AfgvULp91xfaLayzEfxMYVJPryTQBtaj8S9H0jWLfT7rULKzv7oMYraaVVmcLgsduc7QDyxwBketcz4U/ax+HnjrxbJ4f0Xxl4Z1XXo926wttRjkmBXORgHrwfyr8uf2+/2W7HWP8Aguh8KdA0fXPEGh2/xD02aTWvJ1B2aWLK744w25UUgAHAyc9emOs/4LM/s2eDP2UdQ/Z/8dfD/wAP6X4V8Qab43stIN7pkRt5LqBzsZJiD+8+7kE85ZvWgD9WoLr7QMrjDAFcj1A/+vXG/E79o/wR8FmjHi3xToHh1pVLol9epHIwGOdvXuK6nRpvtejWkjN/roVkIxx0Gf6V8gaV+xT4V+En7TfxG+NHxg8UeG/EEPiSSMaPba6ka2ujWilhtHm7lBbcucKc7B0oA+rPhz8WPDvxb0Man4b1jTdc09m2fabG4WeLcOoyp6jI6461sXepx2UTvIwVIwWdj8qqB1JJOAK/K/8A4JHfEbw/bf8ABX39orwn8OdUsrv4b3NhDq1tFYOTaR3PmFX8oYChfn52jnA5r9Bv2wPhbpfxl/Zw8YaLrTXa2Uum3D7ra4eCRWVHIIZSD2FAGp4q/ah8BeBvDn9sa14u8NaTpLOYUvLnUY0haQdVDZ5x3x049am8VftL+A/Ang2x8Ra14u8O6XoOpRCa0vrm/SOK6Q9GjOfmX3HqK/MP/g37/Ys8I/HL9iXVtW8dW6eMFuNW1HTLO11f/TLeyhUujGNXBKswKEtknKL0xXb/APBGj9j7wz8Xv2ePELeOoF8cWvh3X9V8L6JY6qBcWumWUF26KEQjhiu0E5x8o4FAH6S+AviBo/xN8M2usaDqen6tpt4m+G5srhZ4X+jLxkdx2zW1mvzI/wCDfS6n8GePv2j/AId200o8N+C/Hdwuk2rHP2NH3ZjXsF+UYGK/TcUANnj86Jl7MMHnFflr/wAHN3h+3Hwn+DF39nt2uZPHllamRolZ/LMkeVLEZPQdSa/Uyvy5/wCDoi8n039nv4RXNrbPfXVv48tZYrZWCeey7WC7zwuSAOaAPpL/AIKKfsWeA/j9+wr4ss9W8PaKl5pfhqbUNPvI7VILizngtjIjpIgBX5lGfX2rB/4N/wD43ax8eP8AgmJ4H1TXLu5v73TZbrSDcXBJklFvM0YJJ5PAHP1rh/2i/FH7V37ZX7P+ofDfQ/g3pvwts/ElmdNvvEWr+Kra6MNq8YRniig+YMVJxv8Abg819VfsGfst6f8AsY/sr+Ffhzp9xHeL4ftyJ7pFwLmZ2LyPnAByxPOB2oA9gr5F/wCC3n7TWo/su/8ABP8A8Uapod19j8Qa88eh6dMufMikuDt3LyPmA789a+ug2TX5m/8ABz685/ZZ+GUcZYRSePNP8/8Au7BImc0AfU//AATQ/ZZ0n9mL9jrwfodjZLHqWoadFqGrXZCtcXl1MN8ryPj5iTjg9Oa+Sf2gJrf/AIJ9/wDBaj4Y6t4dW20Xwv8AHG3NprtnBH5du90rFVcIuFDfOSM56n2x+kXw7gWHwFoflYZBYQFcHjBjSvzD/wCDiCZ7f9pz9keS0X/Tl8cwgFfvNH5kec+3JoA/VleG7U6mrgFv1pwOaACob5cwFuNy/MuemamqG+bbB2xznPpigD8u/wBsDUf+G6/+C1HgX4G6l5l14E+Hem/8JHq9nuKx3N0MMu/qGA54x3619v8A7Zv7ONl+0J+yR4u8BQWNi39pacY9Lt3VYo7adcGFgQPl2lRjj1FfBP7H7yt/wcoftBLeSFtugA2u7qEKR9P1r9VUtEuVJJkDcAlT7DigDk/gZoeq+HPg74W0nWHX+1NL0u2sbwxtvRpYoVBZSRjqPSvzr/b48PWOhf8ABe79lG9t7O1ju7tr2W4lSBE3hbObLO3HTJ5Oa/UZ4seWMtwcc/Q1+TP/AAWH+Gkvxi/4LD/sv+GV1LUNJXV0vIZLqxkWOZI/s0pYKzKwGRx0oA/SLw1+1X8OfEnj6TwtpXjjwvqnibdzp0GpRyXLEDBBC8A8dO/NejGUqq7lyzdh/D9a/Jz/AILb/sx+C/2T/hh8HfHnw80O08M+ItA8a6fZpqNmvlXF2kjIJfOZcGTftGc++MZNfqn4cvm1Pwvp9433ri1jlkwODlQT3zQBzfxJ/aJ8GfByON/FXibQfDqzJ5ka316kUkijqQvXjj860Ph78Y/DXxZ0H+1PDGuaXr+nhxGbixuVmjDfLkZB7Z718vr+w34T8CftcePfjl8WvEvh/XdP1iBINGstejRLPRoBu348wlcvuTsSdlfOP/BNv4k+FYP+C1Xxo8MfDO/s5fh7rHh6PUzBZKVtEulfaxiHC7cN2WgD9TJdUW3jZ5GXaucncFxjqeTjArjfEX7S/gTwp4YbWtS8XeHbHR45zbPey30fkLIP4N2ev8qg/aV+Fuj/ABT+BXibQ9Y+3HTptNmD/ZpzDICEJDB15Bz+HtX5kf8ABvL+yJ4b+LvwL8Uaz443eMtN0nxJqGlaRpep4uLSzjEoDMUcEs7DZyT/AA9BQB+rXw7+KPh/4r+HY9W8Oa1pOvadMcLPp12lzHnOMblJGfbjFbclyEZR13ZHTv8A071+Yn/BHvTovgl/wUn/AGqPhf4dH2Lwfo2ppdabpoUCGyZi5bYFAABOOPavrL/gqx8a9X/Z6/YF+Jvirw/K9vq2naXKkEkf3kZ1xuH0yeaAPQtV/bD+GGheL10G+8feEbHWDJ5X2SbU4ll3/wB3BIwfxruNE8Z6X4iupIbPUdOupI137ILqOVtvqQpOB71+fn7JX7BHw88df8EgbGLWNLsdS1zxZ4Rk1291q4CvqAvJI3kEi3DAn5WBGO2fcVW/4NtPDHh7xH+xBa+LI9Ct7TxW15d6LfashYvqccEpVCxJOSoJ5GB8x4oA/Q/xN4q0/wAH6VNqGp31pp+n2qGS4uLiVY44kH8RZiAK4r4e/tY/Dr4sa9/ZXhrxt4Z1rUu1ta3qvI49h744+hry/wD4KG/sSzftqW/gvS77xK2i+DdB1hNV1+xGcaxBHjbExBHyA7sjPO6vh3/gsx8RfhL8HfEPwZvPhfeeFdH8feG/F9lZBNDZI5Ps7OqiKcxAKVIBwGJPB565AP1we98tWYjKjoQOc/3cetYtx8UdFtPEB0ubVNLh1DyHuBA92gkCpjcSM8AZGSeBkVcsYo9R0iG4mh2yyRCVlLfdZlBOMV+RPxd/ZW03xD/wcGWPhHTtY8QaP4f8V+FptQ1y2tr4n7UnyF4x5gYKjZwQBk8c0AfqZ4A/am+HvxT8T3Oi+HfGnhfXNYsyVmsrHUY55kI68A/Xnvg13clz5Q+Zcc4P09a/Kn/gqT8FvC37Hv7ZH7Lfiz4ZaRY+D9TvvEsei3B0yBbdLu0PljZKFAMh5PLEnk+pr9T7of6Ku0fe+dhtyeoJP/1qAON+JX7TvgP4N3EcPizxd4c8PzTrujivL5UmPp8nXHqa6Hwb8SdE+Inh6PVtB1Ox1jTZsbLuynWeF+QCAynqMjI7ZFfJngT9jTwB+zT8U/iR8UPjJ4m8O+JL/wAbakZoLjXo4xFpliSRHBHHKGx1YHb6CvD/APgiB8SdFu/2zf2oPCfgfULe6+H9hrEd/o0VqxNpB5hk3CJT90HaMj6UAfp1cXa28eW9cDjvnivP9V/a2+G+heNU8OX3jjwnZ65JJ5X2KbVI1mD/AN0joD+NeS/8Fd/2nb79kv8AYF8f+L9KuFtddSz/ALO0+XBJjmuMKpAyOnPPUcV5T+zb/wAEv/BXjX/gmfp/hTVtPt28XeOtGXULrxLdQrc6jBfzLvWVZSNwCk9AeBQB94285uk3rwjdDwdw7EEHGDX5cftQaHpug/8ABxf8C7y1sdPs7i78N3dzeTJGIzJiPqzdOOeT61+gn7J3wq1n4Gfs8eEfCGv6x/wkGreH9Pjsp9Q2lftO3cASCSemOpr82/8Agpn8Im+On/BdT4EeFf7Wv9Ht9V8PXH2yWzkWOWaBUkLx7mVsBuAeM0AfpT4S/ap+HfjrxxN4Z0Txt4Z1fXrcsj2NvqEb3G9SQRtU+x6dcV3dveC53FWBXOB8v+emDX5Q/wDBZn9mLwX+yJ4l/Z68afD3QrPwrr1j41t9M+1WCeTJdQyMu/ziuDITj+I8ZOOpr9UbC88rw/b3DDKtbLLKBwPu7ifqaAML4l/H3wf8GtPW68WeJNH8P2z42PfXCw7weBgE5698ccVreCfiHpPxF0WPUtD1Cx1bTZv9Xd2c6zQPyBgMp5I79MZFfmB+xH8T/CP7aX/BQv44fET4qax4avNN8G6gPDPhzStXniW1sohuMjLFM2Gdtibjz90YAzz2v7F3xE0z4I/8FjviN8LfC2p6bd+AvGGjp4isrbT7lJbOwuxnzViVGKorZTjGcg8nsAfo9PqC2oZpPkjVSSxGFGOuT0HtXGeKP2lPA/gvWNN0/V/FXh7Tb7V32WcF3fxxPcHjO0E8kZH5ivIv+Ctvw1s/iL+wn4+kn1DWNOutD0ua/tZtOv5bV1dUyN2wjcOO/wCGMmvjP/gmH/wTE8Fftjf8ErfBuoeMrrVNQ8Ta+Yr0a9LcGbULIwzFgInfOwHgHg5A9hQB+rgv1KqyqzKSM7Rk89Dgdveuf8ZfGLw38ONPurrxBrmk6Pb2agzyXNwqiLdnbnnjOD+VTN4Jhn8FroU0l1Jb/YhaNKshikZVRU4KnIyBn6mvyJ/4Js/sgaD8Wf8Agpn+014Y8U3uveKPCvgq8iW20vVL+W7inMvnBd+5hwnOAuOooA/Xzwb8RdH+Inh2HWNB1C01jSboZgvLSVZYpvYEVXuPi54Zt9W/s+TxBocN/kKbeS/hEysegKbt2a89/Ys/Y30P9ij4RyeD/Dt9e3um/wBoT6hCLpty2xlOfLQDACrjjv71+e3/AAVN+COi/szf8FRvgj8bm0u2l8O+KNVXRtbiaNhClyxjEcjKCBknd1460Afqrrvj/SfCrRjVNR0/T/O/1ZurmOEP06bm56jgVpadfjUYfNj8tom+46tkP7jjp7ivi/8A4KP/AA10H9pj47fAv4b3Gl2epNqGvtr12726GW0sLWJWdUYDhHeSAHIOQtfY3hbTLfRtJjtbO3htbK3Cx28US7VRAo4x9c0AaVFFFABRRRQAUUUUAFFFFABRRRQAUUUUAIOtLSDrS0AFFFFABSHmlpskqxD5uKGBzXxL8YW/gHwdqmsXjeXaaXayXU7k4wiKScH1JAr+ZH9pv4xXnx8+PvizxdeMzSa5qUtwu4/cXOFVe4UADAJPU1+zf/Bf39p9fg5+x9J4YsLho9b8dTpZp5bYkW3z+8ZeeDyo5yOvFfhWYmRzuznJyc8HHH9P1r7bhfC2g6rPyXj/ADByqxw0H6jgmFPfjoa6jwBevJZtDuDMpGM/jXMg7Bmp/DupNpesxSfw5wV/vZIFfbYSrKnL3nofleOoKrTs1qehudrY/OnFcx49eT70XlrLZ3LRzRvC4b7jjDDgHn86CcKK+k9op01OLPg5x9nVtJHrH7DP7RE37M37TnhbxH50kdit0LW7AJ2vFJwQ2O1f0GeE9dt/Euk2t9ayLJbXkSzQuD95GGR+Wa/mVmRmBUYXzBs3H+AnGCPcY4r9sP8AgjJ+1BH8aP2bbfQ7y687XPCP+iyox+do+fLY5POdrdOOlfnfHGVp2xdNep+3+E/EDTeAqPTofalNc8ihJN4prfMee1fmSlfVH73YJ5Si/KN39K+Uf+CuP7VUP7Mn7HevX0Ev/E08QD+ytPCsVfzJBgsOc8c9Pavqa9mMad89AR275PtxX4O/8F4/2tl+P/7WEXhXS7z7R4c8Cw+RH5bHy3umOZD1wSu0AfWvXyfC+3rxVtD5rinMVhcHLXV7Hw+js7MWkMjsS7sxyzuSSzMe5J/lTu1NRArHHpSs+3+Z+lfqMZQSsj8BlzTvKT1bGMd0ik9uMD3rvfB9mLHSVAXBfrnrXJ+FtHbVdRVmyYI32tIB8oPUAn1rv4wAeAoXoAPSvVy+h9o+Yz2vKPLRRJ5a+QqsoKrk575r9Gv+DfT4yw6f4n8ZeCJpPLa+ij1SyjyeGQuJQOemHU/hX5zMMx16X+xR8b3/AGff2p/B/iXzfJtob5ba6xna8UmVYNz07/hUcSYX6xgprrY34LzF4DNY1ZfC2f0URvuY/dxxUycCsfwfrVv4k0S1vrWRZre9iSaJ1PDKRxWyp5x6V+DShyyaP6/pVFUhGouqFooooNAooooAKKKKACiiigAooooAKKKKACgtj8aKbIm/8O3rQB8o/wDBXS7UfBT4clW+aL4p+FZTgFsAaihO4KDxgN6dK+fv+DgjwpdfBHTfhR+0Jolr52p/CXxFDJf+WcNdWLk5iYjnblEHXnca+sf2rP8AgnT4C/bP1XSrjx0viC4h0SWO5s7Ww1q4sLdZo2DJKywsu91IGCxIHOAMnPU+OP2R/CfxH/Z3k+F/iC1uNX8KS20VtLHdXDT3Eqx7drNI+SW+Uc+54oA+aPg/oN8f+CTHxC8XeIoxb+JPifo2qeK76OWQeYv2mMmNMnsI1QAHJwAMms//AINvXEv/AASt8F7ZI5JPtd2WG8Ap+86Eda+nPjt+xz4U/aC+DcPgDWhrFl4VtkRBZ6Tq9zp2YVQIsBaF1LR4ByDk88EZNYf7GP8AwTp+HX7CGjz6d8Oo9fsNIuBn7Df63c6jBGcsTsE7sU+8fukZ4znAwAeBf8F7/wBpfxZ8Dv2ffCmg+EdXvNBvPiN4mtfD9zqtsQjWVtIwEjBzwrYbAOD34ryH/grp+xx8N/2Tv+CNXi2z0HR9LGsTLZ+bq848zUNSl8xS0oklBLE7iflAHPavvv8AbB/Yv8G/tufBubwT42svtWltMtzDJCwSe0mX7skbkHaw+hrxaw/4IsfDjW/h7ceGfHuvePPippL2gsraDxTrZuFsI/8ApkIkiCnheSD9wUAe7fsd38afsnfDdmkZVHhqwy0qBP8Algv4Z49a+GP+Czv+l/8ABQn9jry/mjg8SziVkBYRZ8jBYjoD/SvvX9nf9nPRf2ZPhhY+EfDJvo9F01BFaw3V290bdR0ALkn0/KvJv2kv+CTnwo/au+L2l+OvGkHivU/EWhyCXTJV8SXkUOnPxloYlk8tCdq5wvO0elAHv3izXG0bQ768Eay/Ybd5THzuLIGbI456DGPU1+Z//BIP4X6f/wAFDPE/xA+OXxXuG8Y6xb+LLzStL0rUkZrTRbeB8DETHau4beWzny+O9fpjofg9NG0K304PcTQWsSwJ9ouHmaRQCp3FiSSQefWvky2/4IpeA/DnxY8QeIPC/jD4l+D9N8UXbXuq6HpOtJDpt7IxycoYS4Ay3R8/MeTxgA8R/wCCGkFna/t9ftlRWKwR2cfiWyFusCARqgN0BgKMDvX2R/wUsi+0fsIfFhWCso8N3jEFiobEXQkA9axvgP8A8EuvhL+zP8adQ8deCNBvfDutaugW+a31W5Md2w/jdC5DMcnrkcnAGa9H/af/AGYPDf7WvwtvPB/io6t/Yd+4a5isNQls2ulxgo5Qjcp9PyIoA/Fbw3+w80P/AARf+C3x6+HemxWPxI+HEw8QXU0KSF762EzNLCxwCVAHQevNfsn+w9+1Dpn7Yf7LvhH4iaTIslvr1jG8yL8zQTjiVDwOjfjz3rK/Zm/YA8A/sm/CC48B+ErPVR4SuYngOmX+qTXkMUbghkTzGJUHPODzgegqH9kL/gnb8O/2Hm1CP4eWutaTY6lO9xJYTatNdWcbuSWMcbkhOp+7jPGc4GAD5U/4OU5m074BfBvVGVks9K+JGmXNxOULRwrvA+bHTPP5V6r/AMFqvG+l6T/wSj+Il1PqFnDb6posSWhkcqbrf5ZUJgHLHk19A/tZ/sneE/20fgxqHgbxtZNeaPfMsgMchjkgkX7siHoGXsSCPavnd/8AgiJ4A1T4SXfg3xH4x+KHjbSZbYWlomta3FL/AGWmQSYAkCAN8qjLhsAcY5oA9I/4JOt9m/4JnfA0Mf8AV+DNPOcEKAIF6k8d6+Uf+C68y3H7WP7IO11kgXx/B5kkfzbVynJwDjt+dfdH7Kf7Jfh/9jz4NaX4F8J3WtPoejwxwWi6jfNdPEqIEABIAx8ucYxknGK87/ai/wCCVvwv/bG+J2j+LvHkHibUtY8OypcaU0XiC7hh06RTnfFEr7ELYXOBztFAHkX/AAcbq0n/AASs8bRxxsWbU7H+FiP9cOenH15FfVv7JsyRfsyeASzqv/Egsnzk7cGFehIGen+eK479q7/gnx4E/bQ+GNj4N8fR69q3huyVR9ij1q5hWcrja0hV8uwwOT7+td/8EfgLpP7Pvw00zwn4el1JdJ0iEW9ot3ePdSQRjooZySAPagD4F/a+Kz/8HCX7O4Df6vQ7wSEDdsO0EDj1O304rS/4OKHz8JfgeDu2/wDCzNN4IO/kk5xjgZ45r6G8f/8ABKH4V/Er9pbTfi5q0fiy48d6TMs1nfnxDdFbULj5EjLFVQ4GQoGcD0rV/a4/4Jm/DX9t7UdGuPiFD4k1JdBZZbK3t9fu7WGGVSSJcRuCzjPViQMcAZOQD3PQ5/K8OWS/KWS2jLKD833R29+a/MP9ijwxbf8ABTH/AIKCfG7xN8Up7jXtF+Guuto3h/wtd5+xWoVvmlaIk7s7EPzHB28DrX6aeBvBkPgLwnp+i2ct41nptuttC1xcPcSlVAA3O5LE4FfK3xB/4I0eB/FP7QOvfETw/wCK/Hnw91bxVL52txeGdTS1g1VsAAyK8TnI+b7pH329sAHz5+wdZabpf/BwN+0La6PDYw6Vb+F7aOCOwiSO2iAlGUCoAFI6dOce1fot8cJ41+DfixQQ23SbskBhniNs/lkV4p8OP+CSnwd+FHx0s/iNoOhX2n+Lre2FtPqMWrXIbUBlSWnXftdiVHbHJwBmvY/jR8FbH44fD/UfCusXGqRaXq0bRXR0++ks5nQkkrvjIODnFAHxP/wbTt5X/BPSaPKlh4o1PdgHC/vc8/L6e9dh/wAEIblZv2YfGDI0LvJ8QNeYgPnaDeMT0Hv7dq9a/Zi/4JqfDv8AY48Aax4V+H//AAk2j6Dryus9q3iG7mELPndJEXclHOTyDz6Vd/Zs/wCCePgP9kzwj4g0PwVJ4ssdN8SPNJdxXHiC5uQJJSS8se9j5bkk5K4zxkHAoA+RP+CGEbn9rb9rxhHJt/4TuTY7RsquP3gyCRyK/TOI8fgOexr5w/ZR/wCCX3wt/Y3+KWueLvBFjrVhrXiSRptTkutaurpbyQ/xsjPtyMt2/iPtj6Ph6H5i3PUigBZ5PKiZsqu0ZyxwPzr8wf8Ag5wmX/hSPwXZj8p8fWQYFtsZDOgJ3ewPGAfw7/p7MrP91gvvjkfSvmf9rz/glD8KP25PGFrrHxEsde1SbT3WW1it9duraCFx/GqK+FbgcjHSgD6H8MLHc6FYttBzbRMAQO6Dt17d/etBYxET8zsW45Of06D8K474DfA7S/2e/AkPhzRbnWrjTbY5h/tPU5tQmQenmTMzY6cZrtGXI/2sYB9KAOR+Hvxp8K/FTVdWs/DviLSNauNCuDZ6hFaTiVrWcZyjY6Hg8exr5W/4L8/s/wCo/Hf/AIJ0+I5NFhafWvB9zB4htYwB+88hssnryD29K9e/Y/8A+Cevgn9ivxb491jwnJrUlx8QtYfW9RS+uI5Y4523ZEYWNSq/MeGLH3r27V9Jj1mzkgmjjkikUo6SIHV1PVSCCCDQB4x/wTw+Pmm/tG/sbeAfFmm3Ed0s2lw210sTeYYbiNAskZx/ErYznpXxL+3Fo8n7ZP8AwW1+C3gPR2huLH4UR/27rs0YMkdvLlWWMt0Bwp4xkEV9N23/AASZ8I+A/EesX3w68Z/EP4T2+vyNPqGm+GNSijsrlycswjmil8snJzsxnPsK9C/Ze/Ya8Cfsiw6pJ4T026k1rxBKbjU9Yv5jcX1856lnPGOvAA60AezMyw2kjq33iXyx49fywKy/AfxF0H4iWl1NoOtabrUNnO1tNJZzLKsMq4yjEE/MM1a8RWUd7pU0LtN5cyOr+Wu7K7CrKPcgnHvXyn/wSN/ZOs/2YvCnxJl0u11rT9F8VeK7jUrG11N90yryGfoOGJ7DtQB9gVFejdbOMZ3KQPyqXpQRkj2OaAPyV/ao1CH9g/8A4L7+DfiTrxFh4N+L2mDQJdQlJWG3uWCLywGAOBjd6nr2/SD9on46ad+z98D9e8cX1xEtjpVjJdxLu+S8l24hjVv+mjbcYB4z7Vn/ALXP7GHgX9tb4Y/8In480ldU01T5kMoYpcWsgxtkjdSNrDscGvGvhf8A8EcvA/gfU9LbXfGHxM8faTociyabo3iPXBcafZlemI0RS2MLjcTjb9aAPe/2ePHuvfEb4LeG/EPiaxttH1bVrOO8uraKQ+XAXQsFXdznBGcmvgn/AIKD/vv+C8n7IqqBJtkvRIpPAH2Ofk9e5Xjvmv0ySzMFsscZXaqBACPlAHTAHH+RXzP8YP8AglF8Lfjf+0NpvxQ8SR+Kr/xhokom065/4SG78uxbBX91GXKx5HUKBnAznAoA+e/+DkyQL+yj8OAFb/kftLARVO7/AFnUgjgAg81+g3gqeM+DNIh86HcLOAMqOGzlB29+fyrxX9sH/gmz8Of26Y9Jh+Ilv4g1S30V0e2ig1u6tERgchyI3G5gRwWzjJ9TXr3w1+F9t8KfAdj4d0ua8ex0yPy7Zru5e5mCjAUF3JJoA/Nn9lvwpD/wUs/4KU/Ga8+Jlxcar4Y+E+oppeheGLksLPG58zSwg/OxKLySF+Xpyc2v2WdJ0fw1/wAHEvxUsdHt9OsrO38ExQxQWoWOKM71IUCNdoGA3HX5Tkmvob4k/wDBHbwT4w/aH1D4m+HfFfj74a+JtdULq58LalHbw6v1yJlkik45bOCD83UVt+Bv+CRPwd+Gvxf0nx9oui6tYeMdLg8htUg1u5WW/wCclpxv2yE+4wOcAZNAH0N8RJ1k+HevNuUf8S657dvLbPX8K+AP+DbVfL/Y78Ybv9YfHeqhQeGbEqnpjpxX3Z8WPhLa/GbwBqXh3WJtTgsNTh8mdrK9e2lZO670IPNeUfsm/wDBPP4b/sSaNrmmfDq18Q6ZpevFp7qC51u5njEpDAunmMxVjvJJUjnHXAwAfJ3/AATgKxf8Fs/2uvmC+ZcwGLd8m4FScjP3ud2cdMCvr7/gox4r8J+GP2L/AIiXXjKzk1LwzNpcsFzDGOXLqqqQ2CAQxzkisX4Ef8Es/hX+zX8d9W+I3hmHxTD4s8RFjqd2+vXMgvSQAN6bgrbecZHG4+tZv/BWv46aP8Df2QtcXWdDs/EkvjK5t/DOn6bdOVhuLm6JWNpMMpIUjPysDQB85fst/szftG6L+wtpfwt0Pxh8P28I69pgNlqkkrzX+m6fcAnyhhwGcK2M4wD2PSvtP9iH9lDQf2I/2cvD/wAOfD7Ty2mhxHzbqZAst3Kx3SStgAZYnsB0r4P+GP8AwbiaNp3w30//AISD44fGbSteaEPNaaHrS2+m2UrLuEMSNE8hVSVHMh4B9c13H/BIDW/iV8Df2rfjJ+z7468Zah8SNN8AxWt3pGuXbGSZI5l3eTI+eWA4PA6D3oAf/wAFsvij4k8TfGz4E/A3TNfvfC2h/FbX1t9f1C1fyZHtkK5iWQg7d24gjqa8u/4La/s1/D79lz9l34Q6B4Q0HR9H2+OtOXIiUXd0BKA0ryNmRj0JLEj5uAOa+7v25/8Agnt4H/b38NaTZ+LBqVjqHh25F5pOraXc/Zr7TpAQd0blWXkgdVPSvNb/AP4Ip/Crx94LOl/EK+8afEu8VkaHU/EGtGW7tCmdpiMSRouM/wBw9BQB9WaRLHB4cs8SR+W1pHtPOG+QdG7/AICvzj8SKx/4OVvCv7tmVvAF0C6qxUf6sgZKgduea/Qb4YfCWy+EXgjS/D+jyXhsdJjWKJrq4aeVlAIGWb2PbHQV4XN/wSU+Fdx+01D8YJF8WSfECCQsmpP4guWAU8+X5ZbZs9ttAHzn/wAF4B5vx6/ZVkQTSQr48iBaOBmVB+76t06/X8K/RrU9QFho00zL5jWsJlEasVdioJ4HevBf2qv+CX3wv/bN+IGheJvH1r4gvtU8NMkmmPa61cW0dnIuDvWNW2BjgZO3nAr3LRPCq6DoVtpsEk0kVjCsKGe4MzOoGBvLc898EZoA/NP/AIJkfDWz/wCCjfxv+Kfxc+LEl14ouvDniibRdD0K+DfY9Mt4X4byixGT8v3uDs4HWr3/AASatbC0/wCCr37W8OlrZR2K3NkttFZxIkMK5n+UBAAAMele3XX/AARX8AW/xj8ReLvDniz4heCR4slM2s6V4f1kW1hfyE5JdGiduMnGGH3m68Y7j4Of8Eqvg98AvjbJ488J6DfaL4jnhEdxPBq1yEuzj78i78O3+9kDJwBk0Aeb/wDBfv4T3nxZ/wCCY3jxdNhuLu40OW21cxQDe8qwOCwxjnrXtX7DPxY034mfsafD3xJY3ULafN4dgaWRG+S3ZIgJA5/g2Y5Gc8+1eveJfCtr4x8OXmlapDHfWGoQtb3MEg+SaNhhlOOeR6GvlXwl/wAEevBfw+k1LTfDPjT4j6B4H1aZprnwpZa0q6WSTkqFaJpQpycgSc0AfTnw/wDHuk/ELwpBrGi6hbalpcztsuYnLIwBI4OOea/O/wDa0gL/APBxB+z5tjkby/DN2XYK2F4ZcZ246N6+n0r9GvBHgrT/AAF4S0/RdJs4dO03S4lgtreFcJEi9AP69zXzv4//AOCTvwp+If7TVl8YdUj8WzePNMnE1nejxFdKlsAc7Ej3bQh7gdcCgD57/wCDjSQH4cfA1sO234jWX3V6YdQSfYV+hOn2K6loFpbmRf8AjzVGKtkAMm0ZHvk4+leG/tcf8Eyfhr+3DrWjX3xCi8Sak/h9llsobfXLmzhikByHKxsu5hxyc9Prn3D4c+BLb4beDNP0OzlvJrPTYVhgN1cNcShV6ZdiWP4mgD8nf+CPf7P3gWP9s39pb4cfELwho2reI7HxM2r2kOp2olka0lMu10VgclgnO3HRa/RT4e/B/wCDnwe+NFnY6D4X8J6D4yvrKSaE2VikV0YARlW2gEYBXG7PfGO/M/tHf8E0fBvx7+M1n8SLHUvEvgX4g2Efkrr/AIavhZ3k0ZAG1yyOjDA/iU+2MnPa/s9/siaH8BNRvNXbUdf8U+KNQAW617Xbxbu+lUAgKCqIiqMngKM55zxQBi/8FJblB+wj8VMsdreG7s5bIB+Q8ZCnmvMf+CDkUY/4JV/CTJj3NprnAB/56N6gciveP2n/ANmjw5+1b8OpfCvi6TWW8P3bA3MFhqElm04wRscoRuU55B9BgjnPP/se/sKeC/2HPCDeHfACaxZ6CCDFZ32qTXscABY4jEhOz7xzjGeM9BQB7NI2x12/MzcZx7jrgV+Zf/BJGRU/4Ky/tnfvPlk1CzKblx5qhp+Vz1x36V+lHiPRI9f0a4sXedI7qNo3aGVo3APcFTkGvm34B/8ABJX4Ufsx/Gy++IXhKPxdYeKNanNxqdx/wkV00epHnAmj3BHC7mwCONx9aAPp2GNX3LxtXADLxnv2r5a/4LIfs3yftG/sH+L7OzXGt6AiazpkgXc6zwHK49/pivqZGEKZZvmx3PWuL+P/AMQ7LwB8G/FOqX3kvDpumXE7q7AJIypkRnJ5ySAR70AfFP8AwRf+M9x+3FrN38WtQgnX/hHfDFj4MtmmHzLcpg3cgz3ZlQZHYc5r9C7WPyw3Tbk4A7cmvmj/AIJKfAO1+AX7Gvh6zhsV0+41wya5PEqbRm5cuMnJyQPyGK+nAMCgAooooAKKKKACiiigAooooAKKKKACiiigBB1paQdaWgAoooNADXbaKq3szEL/AA7Tx6Zx39utWJX+X37V4r+3t8fbf9mr9l/xX4omnWK4t7KSG0Un707qQvHB456GtKMHOooIxxNZUqLqPofij/wWi/agb9oz9tfV7ezuGuND8HgaZZrk7Q6/6xhzjJOPyFfJscAjC4LcKFwT9efqc/pVrU9ZuPEGqXV/dMZLi+le4kdjlmZmJJP51XJxX61gsHGhQil1P50zbFvFYuVWW7Y4ZfivYP8Agn98AJv2lf2ufB3hRY2kgmvkurwgfdtozlz3HUoOexNeNl9p3c7R1x3Pb9a/Tj/g26+Bl7dfEfxx8Qri33Wun2yaRZSlfld3JaTb/tKY0GRxhq5c2r+xw8n1O3IcvWIxkIPa+pJ/wW5/ZFj+FfxB0fx14fs4bfQdWhW2vVhTEVvJHhcgDpnI656GvhInKr/eAw31/wA4r+hv9sD9nvT/ANo79n/xF4TuItrX1u5tnYDMcw+Zccdyf0r+ffxv4Pv/AIf+NdW0XU4Wt73TLlreWNlKtleM4PY9vxrs4LzVYmj7Gb1R5PiVw39Sx/1mjH93JaLsZbLvRlPRhj6e9fQn/BM/9pCX9nT9qzRNQmuGh0nWJF0+9TJ2OX4Rjz1Hzc+9fPROCKkSVrf5laSN0HmIyNhlYfdx75xj8a+mxmFWJpToz2sfA5HmU8DioYinpqf036ZqSX0CzRFWSRVdWHIYEcYqyJMn5q+eP+CZvxyX42/sgeEtQmuFn1Czthp98QclJo+DnknoRX0FIPu/UdPxr+f8Vh3Rqypvoz+yMrxqxOHhWi/iR4P/AMFIf2nrX9lL9lXxN4kaTZqTQNZWAB+bzpBhcfTFfzd6zqtz4k1281K+kaa8vp3uZnJyWZzk5r9Rv+Dj79ou21jV/Cfw2sbiO4vLOQanqIibiI8BVPPoDx1r8sYxtVfkVWxkkH73Jr7rhnC+zo876n5PxrmTrYz6v/KDHaadFFLcELDGZpZGWGONV3M7sflGPTjmmuC3Tr2Hqa+t/wDgjv8AsZyftSftTWOo3kDTeGfB5+33k2PkkdT8sY6jOQf/AK1e7jsUsPSc2fL5XgpYrEqhHvqfT+q/8EvI/ht/wSV+3f2esnjSN08STuUAkAI/1Z4ztA7dfevz1il8xuwPB2j+H2/PNf0ta74Us9e8KXekyRrJb3Vs1u0LD5UjKgbcewr+eD9pb4af8Kd/aC8XeG2jaMafqUjRAjnymOV/kelc3BubzrynSqO/Y08S+HaeFhSxFJWXU4tj+7qpLbNcrIqsVdhhCOqtkYI+lWpThVxUYUAN1BIwD6e4/KvvZWkrM/IruLut0ftt/wAEZf2iv+FyfsoWen3Nx5upeFZDp8xcncY1+6x569favsSCRmLFh15B7GvxK/4ItftKp8If2pD4evptmmeMYfIKk4RJV6Ec9Tu756V+19nIxZl/hXAFfh3E+XvC4+SWz1P6x4BzpZhlUHL4o6FtWzS00DaOKVWzXz59wLRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXmf7W3xG8a/Cf4Kat4g8B6NoWva5pUL3RtNVu3t4niQbnwVGSce4x716ZXK/HD/kjviz5d3/EkvRgnAx5LUAfJ3/BI/wD4KPfEr/go78OtT8aeIPBHhHwn4ZtbmWwt/serSXFxLcxPtYNkEKnTt3PPFTfsq/t9/GL9o39sHxp4KHgPwPH4A8C6xJpd94jtdVlZp2CkhYV5VmGPm6AZHTNfAH/BNr9t61/ZR/4JHW/hTS9UtLX4j/Ejx1qWiaKGl/492nmVTMRkHCAg9epFfrp+xp+y/pP7JPwK0XwjpczTTRr9p1W83bpNSvn+aad2xyWJAyMcKKAPXIHJXcw2buinqKkDZrM8Tara+G9IutRvLiO0sbKF57m4lICW6Iu4s3sADXxto3/BU7xn8XvDuseLPhT8EfEHjj4d6PNIn9uf2rHaPqCREiRraBkLS9D0Ixx1zwAfbmcVDe3i2UBlZlWNBl2Y4CAckk9gADXkf7In7YXhn9s/4SW/ivwldMyMzRXlpcLtn02dTh4JFzkOpznpXiv/AAWw/bB1r9k39i7xheaN4Z1nWZtT0+XTzeWpVYtP80BQ7kspDHLbcHGVOaAPsPTtTi1K0inikjkhnUPG6HKsp6EH6Ut3fLapuZ0VRnLMcKoAyST6YBr5i/4Ju/tG658XPgf4V06/8AeMvC8em+HrFV1DVEjNtqL+TgvEVZiw+UFs4++MVzf/AAWb/bE1z9kj9ifxlqWk+GNY1y6vtLmtPt1uirb6c0qGPe2XQ5w524PBXn0IB9d2OsR6parPbskkcn3WB3Kw4IIP0Iq6pyvNfJX/AASy/aL1z4tfALwRpOp/D/xr4dj03wvZN/bOsCH7LqknlgFomR2LdMsTj7y4717D+2F+1X4b/Y2+B+peO/FMs39naeVhjhgTfNeXD8RQRjP3nOQPpQB6rnFIXAr4U8b/APBW7xp8DfD/AIc8XfEj4D+IPB/w78SXMFuusnWIrqex88gRNPbqgaMHOeSc89Mc/bWmavHrmi295ZyLcQ3kSzwSKpxIjAMCB2yD3NAGlmjdXxt4j/4K7aH4Y/besfgPcfDv4hL4q1aYfY7p7eD7HNDz+8BWQnHB64/nXpv7XP7b0H7HsXhd9Q8G+KvFP/CVaiulwDRVgdoJ2I2iQPICP4umfunp3APfM5o3ZrL03WZrzQobyW1uLFpolkkinC77XIyQ+Gxx3wa+QF/4KleJPi74q8YWnwV+Emr/ABI0nwTPJa6hq76tFp1tLNHnckIZGMhGG4BGOPXgA+080ZxXhP7Bf7ceg/t3fCu78RaRZ6hot7pN7Jpeq6RfgfadOu4jh1JHBXng4HSsn/goZ/wUS8N/8E6/hivibxTpOtala3Unk232G3MkavlB+9fog+cdeuD6UAfRm6jOa+B/jH/wWwm+Hfwzs/iHovwi8XeJfhjGkJ1fxHHKkMWnGTGWVDkyKvzZIxjA9a3Pin/wV3uZfhtJ4w+Evwr8UfFjwvZWC6ne6rZyraQQwnBIQMGMjAb84xjaOuaAPtyivKP2K/2svDf7bP7PGhfETwv50ena0jboJjmS0lUkPE3+0p616vQAUE4FFB5oA5f4rar4k0zwRqVx4TsdJ1HxBDAz2NvqEzRQyyDoCV5wee4r5X/4Ji/8FCPin+29qXjObxV4G8H+F9F8H6tPoMs9jq0k8k97EQCuDnavI65/SvsuS1Vz1b8zX40fs9/ty2v7Fv7Lvxps7G9tY/HHjb4w6po3h2EyhWimuGijM7qMEqoOeTwce+QD7C/Zv/4KEfGP9oD9tvxl8PbX4f8AgqbwL4F1BrDUvEdrqsm52IJVYgchmXad4xxlema+07G5+0xbui9MHqD3rxr9hz9l/Sf2YPgDpXh+1lF9qFwhvdWv85fUbyU7pZmbqWJwMjjAFesa/qtt4b0q4vbqVbe1t42kmmYfLAirkuxyPlUDJoHY1M5or4fsv+CtWvfEXRPEPi74dfCDxB4u+GPhe6ktbzxGL6O3+0iInzZbeEgtKgA7HjHfIx9RfAT9oPw5+0n8JdH8aeFL77ZoutRCSJm4kjbkNGy9QwPFAjvqK+Y/22P+CpHw0/YS8Q6FpPji61WPUNeuY7e2itrF5A5f/a6en51yvwP/AOCqNx8T/wBqvTPh3qnwy8TeFtL8VWMl94c1y/kBj1JI9u/KBcpjenU87/Y0AfY2cUbq4f44/G/Q/wBnj4U67408UXQsdB8O2j3l3Oq7yVXHyqucliTgV8h65/wV88a6B8Hbf4r3nwD8SWvwjlKzPrUurxC8S1ZgBcfZdu7ac560AfeExbHydenTOOR7ivh/9vD/AIKPePv2XP2u/hZ8P7PwbYSeHviDrkWnR60+oeY7DPzgRjbsIyvXdnPtX118IPiRpfxo+Gei+KtHmF1pOv2kN9ZybSuY5EVx+PP6V+e//Bby0jP7aP7H8m1Qy+M+oHXmPrQB+lsqrKVJz8hyMZ4NNs7SOzyF3dACWP1/DvSXEjImVZs8nA74P/16+Ufip/wUp1M/tIat8J/hV8P9S+J3i7w3CJtZmiv47DT9NY8rG8jqfnYB8c9UNAH1tnNFfNf7FX/BQi1/aw8beLPBuq+G9R8D+P8AwTKq6tod5cLcGJH3BWSVQA4Oxug449a+kohgZyxz0zQA6iiigCrrM8trp00kKxtMiMY1kfarN2BPOBmvzpP/AAVY/aCT/goTH+z0fhZ8O5NektzqQv11yXy/sYYfNsPO7afXHtX6OXKB4/m5HpnrX5emBX/4Oh7XOf3fw/uNvPTIiNAH6daPeTXdmrXKwpMFUSLE5dVfHzAEgZ5q2rhulZPiPWV8L6PdXjeaLe0haZ2AMhG3HAHUk5OMelfFHgL/AILi+D/jN418ZeF/B/g/xlrnizwteLY22i+UIbjVJDv3MpIwiLtGSQfvigD7uzzRXyH+xx/wVKb9oP8AaN174Q+Ovh7q/wALfiNo9st9Hpl9drdpd27bsMkiqoYgLyB0yPWvrKeZkUFWVeMkseOOtAC6mzLYTPFH580cbFIy2zeccDPvXxn+x/8A8FHfGH7QX/BQf4ifCHxF4NtfC1v4HsxJGy3P2iS6DHgnn5enpzuHoa0tR/4Kgah8Svjd4l8H/Bz4aat8VI/BZ8rWtVi1GKysYJcjMUbMp3yDD8A9QPWvmD/gmD8V1+Nn/Bb34/eIBo+q6DLPpEMU9lqEIjuIZEJUq3A3Adj3yaAP1O8UeJ7bwjoN9ql5IIbHTYHuriQru2xIu5se9fJuvT/C7/guL+xndf2HqmpQ6IurE2upC2Tz9PvrVyElQMp5BJx/+qvoD9pn4p+Gvg78ItU1jxhDdzeGYYmiv47e2a4Zoih3DYuDyOM9q8N/4I+eJ/hR43/ZTfVfg74Zv/DHg+81W5aKO6JWSeTedz7eNo56e9AFfw1+z9+1J4d8O2/h9fjD4N1CxtYhbpq9xoczaoExgOQJlQuB3Kge1enfsbfsV6N+ynD4i1D+09Q8SeM/GFyLvxB4gvwFudSkH3RtHCovzYAyeTknir/7ZH7V/hX9iz4LXnjbxQt1dW8MiWttaW677jULiQ4jhXPGWPHIOK+evGP/AAVf8ZfAB/C+tfFX4I614M8DeKrmGyh1iHWIb57B5ceWJ4FRTGPmHc556YoA+6AMGis/w9qMeq6dFdRs0kd0iyRuV2rIpGQwGSQCD3rQLbetABRSK6v0IP0paAGuSCMV8h+IP+Ci3ij4vfHbxN8PfgZ4HsfG154MPla5rWq3xstNtJ+f3CMoJd/lbuNuB1zx75+1D8RG+Fv7PnjbxCzmJdH0a6uFdeCjCNirZ9j/ADr4H/4Im/Gv4e/sxf8ABPDTfFvjzxNp3h/WPiRq19r939ruD51x5kuPMKDLFQMYznGTzzQB9L/sQf8ABR6P9qD4g+KPh/4m8MTeCfiZ4LkWPVdFe5E6OhLATwvgbkO0/pX0jqfiCHSdJuLy4mht7e1iknllfpHGuSWx34FeB/s+/Cz4MfFH496v8evh/qlhrmva5YLpN9qNjdeZHNHGSeUxlWG7r3z04r0z9obwbdfEX4B+L9F06RYL7VNJubO0kBwRI0bBQO/OaAPmnwB/wUh+J37V97rGp/BH4a6Hq/gnR7mW1TV/EOrPYtqrxEh/s6Kp3YI7kY3L1zx6L+wh/wAFEtN/bI1HxT4evtFuPCXjnwROLbWtHnl80RElgro2ASp2t19K+K/+CFv/AAUE8FfBn4Bap8EPiRqkXgnxv8OtRuorm3v2Nv8AbIhKX85ScEthTkjruHFd/wD8EsNC1L4//wDBQz47fHyx0/UNN8CeKJE03R5LhPLTUvL8wNKo7jpz/tUAfo/PfeQpkI/dqeT6D1r48u/+CkHjr46fFrxP4Z+BHw90fxlY+DZ3tdQ1vV9WNnZz3CgkwwbVO9htYHkYyvrXsH7f/wAWX+Bf7HPxG8VW9w0N1o2hXDxsD9xzHgEDr3r5C/4JGfHf4a/sf/8ABNrwPP4z8ZaN4Z1bxck/iC9W5uD5ks08gJlYKM88dTxQB9LfsFf8FDrL9sy+8VaHfeHp/B/jjwPdLZa3os9yJmiY5xIjbVyhKt27CvpDzN65U+1eBfszfDD4Q+Kviv4m+Nnw5v7DWtT8eRRW+o6nZXYuLeVo/QA/KRk9fU9e3uzzYJkTOQDkdmAJxz270AfBv7Q//Bb/AFL4QftE+LPAXhz9n/4jfEZPCVyLS41TRpUFs0mMleUNenf8E/8A/goZ4y/bV8W65ba38GvFHwu07SbdJIZdbYM147l+FwAPl2c8fxr0rw39kD9vf4c/AFPijd+ItS1W/wBY1zxxqN1c2+i6ZJfm2QMqjcyg7VAz1PrX2p+zh+0d4F/ad8Grr3gXXLHWNP3GK4EOVmicdVkQ8qR/jQB23izxNb+E9GudRvpI7exsonmuJZDkRIq7i5HcDHrXxr4A/wCClHxP/auh1jWvgZ8NNC17wbpFw9tFqmvawbV9XaMsH+zRIvIGB1P8Q654+tPi/wDDHT/jL8Pda8K6t5n9n69Yy2M4iyjBHXB+bt1rzf4PfDn4Z/8ABOn9mzSfCtnqdj4c8MeGYj+9vLlI3IGXZznBYtjFAGF/wT+/4KK6P+3Ro+vWy6LdeFfF/g+8fT/EGjXUgke0lQ4JU8ZUkHGR09a+iri58s8EDp8zD5V6f41+YP8AwRU0PUfi3+27+0R8bLaxvtL8H+PdXaDSPPiKDUApJ84dtvHBH941+m96nzH6g7ezDK8fX5TQB8OftS/8FpNS+A37RXiT4feH/gH8RviV/wAIwIxd6joZRrdZGyQGBUnt69jXzz+wtL8av26vjz8QNB8S6X4+8CfCfXNSXXZ7TxJapNcFiWzbROVCrCMAFdpY5HzcV7H+zj+3B8O/gV8WPjbfa9fa1e6xqnjW5/0LSNLuNSnghiVRgmFSABu/iI74zzj7E/Zx/ar8B/taeF5td8B69HqtnbyGK8hMZintn7rJGw3KwI6HHegD0LQNFh8PadFZ2sccFnbxpHBBGm1YVVQoUD04HH1q9UdsGC/OwZzycDoOwqSgAooooAKKKKACiiigAooooAKKKKACiiigBB1paQdaWgApr06muu4UARXUipHvb7qgkmvx6/4OOv2lpNV8ReG/hnZTSf6Ch1PUY43++7bPKVu23AfjGfev148WaxBoHhu9vLri3s7d7mT/AHUG4/yr+Y/9sj46XX7R/wC054x8W3U0kn2zUZYock7ViQ7VC5zx+NfScNYRVcQ5vofE8bY6VHBqC+0eaxps3fKFLHcQD0z2pWbFJHgDp+PrQ4wufcKB7k/4A/pX6NKPNaPY/FtNWCWk2p3UNtb/ADXN06wW64yGlYjbn9a/pA/4Jh/s4j9mX9jbwfoEkKR6hJai9vWA+Z5pfmJNfif/AMEo/wBm5v2k/wBtDw1p81u02maG/wDa12wHyoIz8gbII55/Kv6MNGtVtrVY1VVQKuwIMKq4wAPyr4XirGc8lSiz9T4Dy/mpyxE16DruDzY13bvmOMgcg+tflP8A8F2v2S/+Ed1qx+Kml2qx294yWeqiNf4uiuQB168mv1iZMpjp7+leUfth/BaH46fs9eKPDM1utw2pWMiwccrMBlGGe+RXh5Hjp4PExlF6XPpOLcnjmGAnTe6Wh/Osu4sQ38Jxkd/88U5/mHKhvTPY+tXvFPhu78F+ItQ0e/jaG+0u4e2nRhj5lOM/Q1QjkOWr9+oVIziqq6o/kPEYV4eU6U90z7p/4Ic/tOt8OPjhc+BNQmYaX4oXzYFLcRzLuyeuMtvXt2r9XvjB8UbL4R/CnXPEmpO0Nnodm88h3D5tikjn3JFfzo+AfGl58PfGul67YyPFd6RcLdxshwW2HJU/7JGcgY6DmvvD/gsL/wAFD7H4j/sWeC/Dfhq+H2v4hW8d3qXkv81tCgTKnnjcWPXP3TX5nxJkrljI1aa0lufuHAPFUqeVTw9V+9DY/Nn49/GO++Pnxk8ReLtQmkmm1y9e4TcSfLj3EKg5+6B29zXILtAO0Y5z9KSJlCEKvlx7iVT+6OnHtxTlO6RV/vcfjXvYeiqVNJHzuKxUq9eVeW7Y+1sbjVL63s7RfMvL+RbS3UDJ8xyAp/Dmv6K/+CX37H1t+yB+ytoGiNDGutX0K32pSgDfJJIM4Y46Dnj61+On/BH/APZYu/2nP2x9Bm8nztD8KudQvpCv7tXQjYpJyOcN+Vf0N6XaqI2+722gDGExwP518TxJmDlP2UWfpvAuUwUZY2S1kRyQnymBb7wJJ/ib/OBX5F/8F3v2eV8GfFrRvHdrD5Nr4ii8q6YDgSJtHp/td896/X+a03L8v5+lfNn/AAVP/ZyX9oL9kPxBYxx+ZqOkr/aVoQAWzHyVHB4I6j2ry8ixzwuLjJdf1Pb40ylY/LJ07ax1XyPwY3fKOhOSOPSlkXgUk1s1rcsrqyMpwysMFSOoqUdK/dsPJ+yUl1P5DtytxlvdpkvhjxFceDPE2n6pas0d1p86XUTqeQyHOPoRnP0Ff0SfsifGWx+PX7P3hfxRZsrLqVjGZCD0cDDfrX86kxURkt/CCc+nB/8ArV+o3/BAP9odbrwj4g+HN9cc6bKL7Tg7fMY3HzqO2AcdBXxHGuXurh1X6xP1jwtzh4bGPCPaf+Vz9N0bIpcYqG1LYZW+8pxx34z/AFqavya9z+klfqFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFcn8dlVvgz4u3D/mCXozjgDyWrrK8j/bi+N+j/AAG/Zt8UatrQ1OS3uNOuLOKKws3uJ5ZZIyqgBVOOvcUAfhX+xn/wTCh/aV/4JCfEb4jaXcXF1468O+ILy+8PmOTC6c1pMzsY1xndIGXdzz5a4xzn9gv+CQP7X8X7aP7EPg/xNJcLLq2nw/2TqyniSO5gAV9wJJx6Z96+WP8Ag2h+Kel2/wCylq3wx1jSde03xF/bGoatNbajpU1tDPaTucDLqMkjOfwrkv2TtX1L/gkr/wAFWviF8OdV0nxBdfC74k3Y1bSLq0sZJbewnkLHYSoChT5gzxngc8UAfan/AAW08b33w9/4JjfFXUNPmaK4k0swB1zwrkA9D6V03/BMDwhaeDv+Ce/wj0+3Qoh8O2su5ABhpRuOMDHc5rW/bw+BLftafsaePvANlIv2vxHpMkFi7LsVpgN8a/N3YjH+FfL/APwTy/4KQ+D/AID/ALFWk+Ffilft4R8cfC61fR9R0K9hkS8uWgyE8lNp378DBBx+dAHJf8EV79vB/wDwUE/a48D248vRdM8SfbraFVASOWRpN+MeuB+Ve0f8HBw/41UfEpuuI7depGMygHp/WuK/4Id/AnxJYXPxY+M3izSb3RLz4weIZdQsrS6TZLHZhmMbEcnJDDr716d/wXQ+HmsfEz/gl98T9P0Ozmv74Wkd0sES7mdY5FY4H0oA9w/Y4Xd+yd8N1JZtvhqwTr1HkIP6V87/APBwdDn/AIJQfFIqM7bSIKD0XMgGf/111X/BN39t74f/ABq+CvgLwt4d1STUNc0/w5bpf2sdu+dPkhjVXWUkAAk5x67TWf8A8Fv/AABrnxc/4Ji/FTR9BsZNQ1JtNW5it4/mkmRGDHaoySRQB65+wRCJf2KfhXuAUf8ACLWClV4U4hXt/hTf24bv4U6F8CbrWPjJBpUngvQZ49QZ71WYRXEZzF5aryz5zgeteR/8Erf24Ph/8Yv2dPhr4N0PVpb3xJp3hyCDULNLWUNp8sMYV0lJUBSTnGTzg+lea/8ABxj4c1zWf2RvBWsWFjd6x4a8M+N9O1PxFptuGZry0RjncqgllX5iR7igDwL/AIK6/tleNv2s/wDgmn4w1rw78Lr7w/8AC9XtDDruuXP2S4uwJQElii5baBnqP4hz1r9P/wBlSMy/sv8Aw9YzSTH/AIR2wO7cRu/0deSeCev6V+cf/BU39tzwb+2f/wAE29d8C/Bax1rxlqlzaW1xJaadpUoTSrWFkYh8rjI+YDHXafSvvL/gnz8Y9P8AjB+yR4Gv9Ph1a3a00i2sJ49QtXt5EliiVWG1gOMjqO2KAPj/AP4LqeGbj4CfEr4G/tHafHJHN8NfElvp2sSqc7rCeRQWbucYfJJxyPfPunxJ8W2n7R37ePwy0XSWa40HwRoreMbwRnbGZLkAWxOOvAc4PfpjnPq3/BQT9nux/an/AGO/H3gW+jjk/tzSJ0g3AZjmVC6ODg4IK/rXyv8A8G9fw38UT/sy6p438cT/AGzxPqtwugrMQR/odj8kSjOTt59euelAH6Ay2kbWMqzLG6vEVlZx94EYbd7Yr4g8Pftj+EPhn8R9Y+Ev7NHwuHjTWLbUZbjW5tNIt9G065kGXeWVifmJU9D/AAt7V9lfEzRr/Wfht4gs9PkZL+60+4jtivUyMjbR+ZFflB/wRl/bT8B/sSfAfxj4D+JEOsaV8TLPX72e9s20yRrvWvMmPlqjY+f+QDe9AHf/APBuvdapL8T/ANqRdcs4NN1T/hOmkubWCXzYYHYOW2v3Gc/TFesf8HGBU/8ABKj4g5VWCva8MMg5lA/rXi3/AAQq8X33w7/an/aF8P8Aizwp4q8L6x438UNrenRXunyLF9mbeV+f7o4I4A7816b/AMHG3jy3t/8AgnZr/hVbLVr7WvE08Qs7exspLpnWKRC5OwHGNy9euTQBrftJ+GbLQP8AggX4it7O3ht44vhskgVIUwzCFDkjbjPPXGa2P+CTHhWx0z/gjH4DW3tYbdb7wdNPKI1xvZomJ/PArgv2jfj5ouu/8EGdVit4NWkvtU8FpokVn/Z0/wBoFz5aqV2BCe3pWr/wTH/aD0Xwr/wRj8Orfx6ha3XhfwzJpd5bTWU6TeeY3CqqFMnPP5e9AHP/APBsxLI/7AWpRtIzIvi/VQik8IPOPAFfo5EQq9a/NH/g2Z8Uxwfsg694durHVtP1iy8R31/JBeWUtviKaRjGRvUbs7W6dMe9fTP/AAUO/wCCiWmf8E+vCnhXWNT8P6jr0PifWIdMItvlForsqGRjjoC6/rQB9M0VU0bUv7XsIblRthuIUlT1+YZ/qP1q2aAEY4I9zX4KeAv+CYFn+15+zd+1F44tZrm48beH/H2qTeHSJMCyktyHdlGPvthMnP8AD2r9xPir8UtN+EHgnUPEWs/aF0/SYWuJjBC8z4HYKqknrX54/wDBBP4/6P4vj+MHhWbTvEdleeIPHWqeIbcahpMtvDc2cu3gF1HXHv1oA96/4Isftcx/tZ/sI+FdRupzJ4j8ORf2HraHO9LqAlWJGSRn3rS/4LO/EK9+G3/BNX4ralYNNHcjRpLZpIVyyrIMMBzxn1r4n+A2raj/AMEiP+CvvjrwvqGl+IpPhL8YJF1S1urLT5J7WwvJGbanyDCjL859Otfo1+2h8DR+1p+yR438C27Ri68VaTLbWxYAASlMqxznHbr0zQU2fGv/AATT+OHj7wJ/wTm+HHhXRf2bvEmtaLdeGlzf22q20MF75wcMxRhuyc5JB9K9T/4Ig/AL4jfs3/s6694e+IXhufwzJ/wkl5d6Taz3MdxIlrI5YKSvTGR6Z49DXmn/AASb/b08Lfs5fsiab8KfjNeSeA/G3wuEmm3FpqsR/wCJhBGzBJbfj5846L6j1r7U/Zv+Leq/GzwjP4kvNG/sPT7q4f8AstbhPKuLq1H+rmdO2/sO2DQSfDv/AAcg6ZDqWlfs/wAcsMUiy/EOxhk3LyyFlyM9cfSv0S03wVpo/su6bT7N7nTLVILSZoVZ7aPaPlUkZA6fkK/M/wD4OLfihaXeufBTQ7Ww16+1Lw/4vs9cv1s9LmuY4bdGUsSyA44z19K/S74PfEjSfi58OdN8QaHJPLp+oW6vF50TRSLx0KsAc0AYP7S2i+Cdb+B3iGP4ipp7eC4bTzdV+2/6lIUO4s3I7gdOua/Pr9r39ufXP2nP2CPifa/B34V3S/DPSfDs9kniXVWSxtXiRQALWM8vHhc8kkZHPNe4/wDBe34a+LPip/wTT8daf4UgvLq7ga3uru2tY98l3apIGljA6ncB0FeH+OP+Cg/w1+Pf/BL/AFH4a/CnSta1rxhrHhH+yIfDFnpDpLpkwhVX8zKhVUEE+p554oA+of8AgimZG/4JcfBhpJfOZvD0CliSxO0lepPPTtivnr/gt9uT9sj9kBtuP+Kz/rHXs/8AwQ3+IsOu/wDBPH4f+HJdP1fTNZ8H2K6Rqdvf2L2zJOhfdtDdV46ivmb/AILgfHHTbn9tX9nKC1sfEOoHwD4pW/1trfS55I7KJim07guDna3020AfqxdfKuN2Np3nH3jjJ4/HFfF/xb/a++Gn7MX7QWt+DPht4BvPH/xl8YMl1q+laMojVG42yXVy2ViC7yQCDn5sYwa+t/Dfjmz8caDZ6ppzSTWd5GtxF8jI7If7ysAR1r8p/wBhz9orwp+wX/wUL/aP0341R3ej+JvF+u/2lousT2Uk/wBvsQJNsETAEfICOPV6AN//AIJz6x4u1r/guj8bLjxpo9n4d1ybwzDPLYWM/nQRDfhRu6MwyckV+rAO08t7c1+TH7JPxxc/8FtfGXjjUfCfi/SfDfxN8Ow2Hh++uNNlENxsk4ZuMLw2e2cj0r9P/jD8SoPhP8Lde8UzWs19BoNlLfNbwgmW4CKTsQf3jgDvQB1QbNFeH/8ABPf9tLTf29v2crD4gabo95oUd1PLazWV0f3sEkbYIP6V7hQBHcHER/z3r8wITv8A+DoWH/Z+H9x/KL/Gv0313UI9L0ya4kYrHbxtNIQhchF5bAHevxtP7ZPh23/4OCLX4mf2P4w/4Q2Xw9L4e/tJtEuBD57lFHO08ZXrxQB+zgQZNfl7/wAEjfDlpd/8FYf2wNRa2hkv7HVLVYJjGPMiDvOrBf7oI64xnAzmv0o1Tx7ZaR4Ym1mZsafDbm6dwjs4TAP3Auc47V+XP/BHP4xWF3/wU0/aavWsdcsLbx3fxXGi3F5plxDFdJC0pfDMmON6fnQB0/xNT7H/AMHK/g/y1VPP8CSbsE5zvxnrjJAFfff7SviC48L/ALPnjLVLaQx3Nhol1PDjtIsT7f51+avxW+NWnTf8HFHhTX4tP1650ex8Pf2HLeQ6XOYI5mORukKgYzu/Kv1F+IHh6Dxx4D1bRpNskerWctjkesiEDr06+9AHwZ/wbO6Jb3H/AATqTX2j/wBO8R+JNRu74nkzTiXO8k85/Gsn9jq3Rf8Ag4L/AGjmA2sNDsl4PX5d35/Ma5X/AIJB/HvTf+Cbo+IXwH+L00nhW68O6zc6lot7cxP9l1O3kdiRGwBDOMpnGM7l4qj/AME8vjha/EP/AILgfGzxVNpmraLpPirTYYNNa/s5I/tSxggSA7cbWAGKAP04+OkCSfBXxiGVXB0a7BDAEH9w3avij/g3APlf8E57bG4tJ4g1Bhkk4/fHgewr6t/a6+Mek/Cb9nXxXqWr/aPJn0yeCJbeGSZpZHiZQAFUnqa+M/8Ag28+JVmv7G0/hGWz1ey13StWubqWC+0+W12xTSOYyDIo3Z2np049aAPrL9uPXPhH4N+EcPif4zJpreG/C17HqEBulaRvtS/6tY4xy7nBwPUCvze/4LCftceOf2sf+Cfd3rum/DK68L/DltXsZLHVtelEN3qC+aAsqRggr0P3geCuOhz7X/wcN+FNePw4+FfiuPTdU1jwf4R8a2moeI7Owia4l+zgr8zRL99FwxJ7fjXAf8Fdf2w/CP7bP7B914X+DOm694+uPNsr25bS9JkaHTbaJtwRvlxvHzcDptOe1AH6X/s5fL8A/BO5laRtEtATnJP7le/evnvxv/wV68B+CvizdeDbnwT8XbnUre/GnGe28LSSWfmE4DebuAC9a9h/Yi+Ken/GD9mLwbqmnw6hCtvpVvaSJfWbWsqSRxqrAqwB4I7V6ddaLDes/mRrIr4JRgNuR39c0AN0G4+02yyBWUTRrIFddrqGGQGXJwavhs1XgsvKk3Z59gOfrVigDwn/AIKV6S2t/sH/ABYt0jEzt4duWCYPzYXPYivkX/g3f/Zk0U/8E+PDfirxFZ2fibXNaWW3jlvoY7mO1tUY7YUV1O0DJzjr3r9GPHfhG38c+D9U0W6Utb6tay2smQCu10KnP5/pX5x/8EzfjXpv/BNLT/FnwF+MF0/hlfCus3epeHdau45PsWq2UrlgiFVILoCM8gfMuB1oA5X4R6X/AMMU/wDBf+/+HnhmRtN8H/Ezw6dVm0yLiCKUZyyIMKvL9h/Sv0c/aG+M2nfs7/BTxF411hVbTfDNhJfyKvDsEU4wTxnOOo718C/sb+Bda/bl/wCCtHiT9oyPT73T/h74W0saB4dnvIWjbUmBIdwGAJX7vTHUV9r/ALcn7P0v7Uv7I/jzwDDI0d14n0qeytyGCgSclecdyMUAfmp4Y/4JKN/wWh+G158ePiTqH/CK+I/G1tJJ4fttNiW2jtYd5CPNkMzNIAmTux8h4FdR/wAEaf2gfiR+yj+1vrX7InxYuP7Tl0KJrvw3fKoXzLUA4HHBH3e3evVf+CY/7ffhP4Ifsq6P8Mfi/eD4f+NPhvA2l3Vlq0ciC7iiYhJYCFPmDAzjPBYdc8cb+yZ4d1D9vH/gsNrH7RGl6PqGn/D7wjpJ0LStQvrZ7c6y2CHdFZQSF2rz6OKAPpn/AILJaLcav/wTI+LMcKxtdf2JI4IHXB5/lXkP/BCX9mHw/b/8E9PBOta1ZWfiDWPEGnA3M99Etwv2deFhUMMBRub396+1vjV8JrT42fCHX/C18FNvr2mz2J3dEMiEA/h179K+B/8AgmT+07o/7BPwh1P4KfGLUH8I6p8N72c2F7dwyGDV7EuxVYtoO5wAM8gfMuBQBy/7FLSfsZf8FxfiR8HdD8yz8D+MtFGvQ6YjloLKYFiTGucJnd0xX6fXMP2uzYTLhZsoY8nDA/Q/X86/On/gnB8O9W/a6/4KTfEj9py90m+0nwjNaronhlbyJo5b2JS4aQBgDj7p49RX6BfFLQdQ8Q/DnXtO0a++watfWE9pZT4/1M7x4Rs+xoA534Hfsy+Df2dfDt9Y+E9Es9Ji1a7e6upERWku5JXy29iOVOTx6V+f37E9kn7Of/Bfz4xfDvQI/sfhvxToqa89lGx8mGc72YoucKORxj1rqf8AgnP/AMFGm+AXws1z4ZftIa1eeHfHngO9nKX+rRSKmtWwkJVoCFO4gdv9tcU3/gl78Ntb/aL/AOChPxX/AGndS0m/0Xw7r0Y0Twul9C0M13boW3TbWAOG3LjGBjtQB+j8pUBlduG+U57jbkmvDP2t/wDgn18K/wBti3X/AIWJoNzrAghMdvNFeSQ/ZlIGXCqdpPT7wP3frn0T49eHdZ8X/CTxNpfh+6l03XNS0y4tLC6jYB4ZnjwrgnIGPcV8I/8ABM7/AIKL3PwW+GuofC79o7VLzwv488BzSWw1XWo5NuuW+44aMqpDEBR6feGAelAFT9hX4r+Lv2Iv+CkOqfsr+Itak17wTdaZ/avhKaeJBNZwYOIiyBVI+4Pu5HPNfpFfRqwVd0iL91AuOc54+lfm/wDsheHNT/bv/wCCs+rftEWukahp/wAPPCGi/wDCPaHc3lu0LapJzukQMBkZAJ4HBX8f0P8AHGlXOreHb+1s7hrW9urWWG3nBAaOVkOw/gTQByPwV/Zm8F/AV9Ybw3olnp8viC+k1C/mEau9zNJ1y5BOODwPWvz9+Cqr+zX/AMHGHizwb4fUWHh/x/4XXVr2xi4gM43HeFGAOW9O5610n/BOz9v/AFD9mrR/F3wr/aQ1q+0HxT4X1W6uLHWtXifyNVtGkJVIiqnc6r7/AMS4FR/sB+CNQ/a//wCCpHjr9phtPvtO8F6fp3/COeHTeQtDNqCru3S7HGcdMEYByPTkA/SxBgt7mnUirt/lS0AFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAIOtLSDrS0AFRyS7SMc88/SpDyKqXT+VIu37xBxkd6mTaWgXtqz5c/4K+ftMr+zr+xN4jvIpFXUtfj/smxweWabIYgZzwo/UV/O2isiRqzeZhPvk5ZzubJPvX6If8ABw3+0ePiN+0HpPgGxvGOl+EYjcTIhODPIFHPbjYe2ea/PMqm9mUBd3OB0FfpHDmF9jQ57as/EeNsxdfGezT92IIcU2ZRKjLuK7lKg+nTJ+uM04ECuh+EvwwvfjZ8VPDvhPTVZrzXb6O1UgZ2Kxwx/AV72Iqexg5s+Ro03UqKC6s/ZH/g3y/Zei+Hv7NmoeOb6226n4ynxC7AbktkyFxxn5s5PNfovaDamBwvYelcb8EPhlafCL4V6D4asY0jtdDsIbIBRjcyIAzfUnmuytvlBr8jx2I9tXlJn9EZNglhcLGkuxI5IHFUrm4w3z5y2VUAcE1ezUMkYDcfxd/SubfY9N2+1sfkD/wXK/ZMHw88f2PxI0uCOPTNexb6gkSYWKYY+bHbdnvnpXwDGhCBiNu4YIPqP6dK/oo/a5+AGn/tF/ArXvC99DGzXsDG2cgbknAJQjg96/nx8f8AgHUvhl401TQdWjaK+0i5e2lVuCdp4OPev17gvNfrNB4eT1R/NPiZw39Ux31qkvdkYx+/Hx/GOfY8EfrWB8UnZl0mNmdo47QIqlshVDNgCt7cGlVfQgn8xXP/ABQOW0r3tT/6G1fTZhFeyUXuj43Ied1XrocqiKi8L3601PMnmhhhXzLi4lSGBFUszyscKPp1z+FOO4jCjr3/AKfjX2B/wRT/AGQZP2mf2rLfVr61Wbw34OT7Xdll3I0+f3a5II/hbI69K+Xx2IVGk5y6H3eW4OeKxEaMe5+qf/BI/wDY7h/ZS/Zb0qG4t44fEWvxLe6jKqgO27JVScdBk8e5r60txgt+Haq1haR2v7uPAWPAVAMbFxwPpVuP77V+U4is61Vzkf0JgcLDD0I0IbJD6pa5bLd2ZjdVkjYFZEIyHUjBB9uau1DdxmUr265x39qy5ranRNJxs+p/P3/wUz+A0/7On7XniDSVVjp+pP8A2jZHA2hJCTtGABxXhasTGrcc8Y7giv1m/wCC/H7PC+Jvg5o/j2xt/wDTfDk32a6ZAMtC5XBPGeNp796/JRW2sed2478+x6V+48L5j9awim3qtD+SOPsl/s/Np8ukXqh0qLOAHUMAc4Pevbf+Cc3xZX4Jftf+DdSkna3sLi8Fndc/KUk45+hAxXiu35aZFdSWd1HNC7RzW7CSNlPIKkEH9P1r18woKvhpU5djwspxzwmLhWi+p/Tro8y3VjHKr7xIAQ394dQfyq3u5rwL/gnz+0JD+0J+yl4X8QLMrXMdottdqv8ADNGArdST6da94jO9jyeD+lfz9iKDpVJQl0Z/Y+W4qOIw0K0Xo0iaigDAorA7wooooAKKKKACiiigAooooAKKKKACq+oabFqcapNGJEU7tpJwT2yO/wCNWKKAKB0CFpGcqd7Ls3A4YLnOM9e1Ou9Egv2bzo0k3EH5kVunTqO3OPqau0UAVJtP80gMomGMfvOdvuPQ/wCFYmtfCXw3r+pC+v8AQtHvr7cCLi4sYZplx23spb9a6aigCpaaXDbDbGixooAVEUKqgdgBUt7aLewNHIqtHIpVlZQwYHqCCDxU1BOKAMPw78NtB8JJOuk6Ppuk/aRiU2VrHbmTnJJKAZ/GtG701ZYmTO0SLsbCr8y+hyOlWwc0UAYvhvwFovhTzf7L0nT9Lab/AFrWdukDSn/aKgbvxrS1LSrfV7N7e4jjmhkXayOodWHoQwIP41YJxQDmgDG8OfD3RPB9vJDpOl6fpsMqbGS1to4QRznO1RnPvmr5to7FVWFVXqEQLhR9AOwxVqo7gMVyrBcA9R096APkv4x/8FH/AAT4z/Z0+I114I1iDWPFGkXMvhi10tGxdz6pLmCKMQkh9peTOc9EPIr2z9kD4O/8KF/Zz8K+E3Ytc6TZIt0xA3POfmlJx1PmFhn0A+tZVr+xJ8L7D4zt8Q4PBOgR+MJpxdSaksBEjTL92XaCF3jJ+bGa9Z0+EQIw3bjxztA/kPXJ+pNAEzBh939a52X4U+HZfEP9ry6Do02q5JN49lE05z/tlcjoOnpXSUUAU7bSoYpmkVFWRsAvgbm9ct15479qWbR4ZJlfy4229AyhgKt0jHHfFAFJdFijjWNY0WNTu2D7mfp0pw0yGJWXyY9jNuKgfKT646VaHzfxGnAYoApw6dHC/mLGqyKMbgoBI9OK8i/a2/Z0P7UPhzQ/Dt9cWsOjQ6zBqN+sluJJJViYOqIx4UZHPHORyK9pLYqM28cvVc85oAr6Pbx2sHlwhvKjURpuXGFGcAew7Vc70AYoDZNAFe50+O5Lb9zLIpVk3HawPqO9Qnw/a/aPMEEasRtO1QOOOB6dO2M1eooApyaTHMuJB5nGF3KrbfTGR27Z9afDpy26Mq7lDHLf7R78+9WaKAOe1j4X6Dr+oreXuj6bdXq/cuJbWNpEx05xzjtnNa1rpMdrnb8o6gcHHr+fHHTjjFW6KAKUug20jqxhjZ8bWcopZxzwSR05NTWGnx6dbrDCvlwxqFVB91Rz0H41OTigHNAFW+06K7ULJGsg7hlByPTnsaydB+HGh+FrmSfStG0nTZplKu9taRwu+epLKASfqa6CigCnZ6bHp0ZWOONdwxuVAp/QCoZPD1vcuzSRrKzLtLSKHJ9OSO1aVNc4HJxQBDFZbY9pJ+7t/D/PpWN4j+GGg+KL6G61LR9M1C6hIxNc2kUsnHQbmXP5YrfQ5HBzTqAKcOkQh9xRdyABDtH7sDOAvHAHtVLx1pd1qXg7VLWxkhjubi1eKIzr5kYYggbh3HNbNDLuXFAHmP7JHwKtv2dPg9a+GoPJaZJZLu6khQLHLNIxLEAfhXp1NhhWBcLwM5p1ADWj3sDluO2eDVFvD1tGqqscaopB2iNQpI6Z4rQooAqCwVpGb59zEk/vG747Zx2/CootAhg2+WvllBgFDtOO/I9eM/QVoEZpNvuaAKSaHCGbdGj7mL/MAxz65PP696sNablYfNhh3OcH1+tTAYooAw/EXw70TxZcRzano2k6hcQ8pLdWcczoeOhZTjoKmtfBun2F/JdW9na2t1KRvliiXew6YyQSB7DFaxOKRXDdDmgCpPpEN0oWRWkQEHYzEqSOhxTRoFuzyMy5kkBXfgBgD2GB7VeJxQDmgClqGgWup2klvcQx3FvKCGjkUMpBxkYI6HHSqGgfD7R/CdrJBpOm2Ol28nWKyt47aP34QAH8c1uUE4oAitbVbVSq8D06AfQDipaAc0UAFFBOKTcKAArls+2KwvE/w60XxcYf7U0jTdUERyv2uBZdnTpkew/Kt4HNFAFGx0G3023WOGJI41GAiKERenRRgDp2FTG124+8eCM59Tk1YooA53xH8MvD/i+fzNU0LR7+Tbt33FlFI+OP4mUnt61qaZoVrpsTRwQpDHjCxoNqIPRVHC/gOavE4oBzQBH9lUx7ct13A91PtWJ4o+G+h+L5A2qaLpeqSFQpe7tEkYAdMEjI/wD1Vv0UAVNN0WDSoI44E8qOFBHGi8JGo7Beg/CppY/ckMMEf1qUDFFAHPa98NND8XXUdxq2j6TqtxDjbLeWcUzrjpgle1a+naTDpyKkaeXGgARAflTHoOg/DFWicUm4UARy2wkcN82cEdfWsLxJ8LPD/jOVZNZ0bTdWnjxtluraORxjpzjtXRA5ozzQBV0vSLfSLdYreGOGNAAqIoVFx6KMKPwAqVrRXQBmZip3Bj1B9fwqXPNFAGF4l+G+ieMHjfVdJ03VJIjlZLu0ilZfoSv+cVoaZoNtpUMccEMcMcIwipwq/QdB+FXSM0AYoAMUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAIOtLSDrSk80AGOa4P9on4sWnwS+EniDxReSLHb6PYyzlieNwU7R+ddxLP5S7jwK/Nz/g4k/aW/4V/wDs/wCl+AbOdlv/ABlPm48tsPFDGUzn67x1z0NdeBourWUDzc4xywmElWfb8z8efiv8UNQ+MfxM1vxNqlxJcXmsXT3JLdEVmO1R3wB6k1z+4VHDKuJPUOc4HA7YH5frSiVicbdxb7uK/WaMeSEYxP51xNdc8qlXW7HNKkaEs2OgHvk4r9GP+Deb9nGDxl8a9c+Ier26/Z/Cg+y2LSqoUyvuywye20YIr8/NF8JTaod02xY1/hI+9n/Cu/8AC2p6h4R0VbHTdU1TT7cculvdvGJD6nB6mnisrqYui4RdrnFg+JqGAxUalWPNY/pittXhtol3SxszDBO5Pm9/ve9SDxFbD70kf/faf/FV/NRcfEDxAjbl17XPmJJ/4mE3/wAVSQ/EDxFJn/iodeX6X8v9Wr5X/UOtzX5z72XjHhr6UnY/pZPia0X/AJaR/jIn/wAVT4detrp9qSRsw5wHU8dzwTX80z+P/EUaZ/4SLXm+t/L/AI16P+x9+1d4i+BP7QPhzxBNrmrS2Ed0kF6kt28iNE5w2VJwelTU4Frwg5qV7HRg/FvDV60aLp25na5/Qs3+kOxH90leOD7g9DX5W/8ABdn9kKPQNSsfino9nsS8l+y6x5Q4z8uxyMdfv5Nfp14O8S23ibQLPUrG4W4stQiW5gkQ5XYwzgc4471g/tAfBzT/AI8/CXXPDOoLGYdWtnhUsAQkhHysMg8g183k+MngcV7Vaa2Z99xNlNPNcudLdtXX5n836SBpkXglRyw6Hmuf+J5wdJ/69T/6G1ehfFb4b3Pwe+J+ueF7zm50HUZLItjG9VYYb6n8q87+LA2NpOP+fYge53mv2rG1PaUKdVdT+Zspw06OLq4aW8Wc/pOmTa9q9vp9nG8l7qDi1gVBlt7kAEV/RZ/wTI/ZBs/2SP2YtE0WGzitdW1KJb7U5FA3yyOAcMcduePc1+UH/BDL9mC1+OH7W/8AbWrRfaNJ8HQ/aiMAo85+4GyDx8rcDB96/e+xt/LhXn3xjAHsPavy7ibHc0/Yxfqfu/AuUxhD28lqLBbskrMx+8c1OBg0EZFAG2vkbn6QFQ3SsSu2pqR+lG4pbHCfHb4WWfxi+Fut+HNSiWa11a0kgIIGVYj5SMgjINfzs/FX4e3Xwn+JeveG76N47rRL6S0cMOu08fhgj9a/paurfzo+emD9c+1fi9/wXU+Ca/D/APai0/xHaxrHbeLrIucDAM0RUOT7nePyr7jgnMHTxPsJPSR+QeK2Tqrg1io7xPiiOQsDn8KjeLee6+4qQru29uM4zzUm35a/Wpdj+cYydrn6Af8ABBb9oWTwx8VdY+Ht5cBrHW4WvLFHJ/dzLncq84wcrxjPHWv1ytJA54z6HPtX82fwB+Lt58CPjn4X8WWcrRto+oxSSAZ2yRk4YHGDjHvX9F3wu8b2nxD8H6ZrVi2+11K2S5ifOQQwzj8Oa/H+NcB7DGe1jtI/pbwrzpYnA/VJvWB1FFJu4oU5r40/WBaKKKACiiigAooooAKKKKACgttrhf2jf2i/CP7Kvwm1Txt441SHRvDukR77i5kI4PZQO5PpX5PfHj/g8p+FHhTUZtP+Hvw88TeMrrd5dvcTSrbwTsemBgk9+9AH7MtMqd/wPGaI5llHykfTPSv58dQ/4O1f2hvFbyXnhz9nuy/s1JChdo7m4YEdhjjP0rW8Kf8AB4N8SPAep4+I3wBkgtodrSvaTyW8sSHPJRx37Zx0NAH79buaM5r81f2If+Dof9nr9snxppfhe4j8ReB/EWqyCC3i1WBfs80h/hWRWPqOo7j8P0mt2DRhg27cAcjoR6igCSiisDx78SNH+G9rZ3Gtaja6bb311HZxSTnCySyMFRB7knigDblm8tS38K8k+grxP9pn/goT8M/2UNS0vTPFWqXUviLXBnTtD021a81G854KxL25HXH3hXtCIZoEdo/mkUAj+7nGf8+1flB/wTdgh/ab/wCC6/7SHjTxHIbq++HTnQ9Ht7h8pbxhgu5FIODgdQRQB9o+Bf8AgqP8O/EHxQ03wb4k0/xd8OPEWtQiXTrXxXpZ09b/ACeFicsyu3I44I3D1r6OS72WyySKYwwzjOefSvhn/g4E+B0PxC/4Jy+KfFFqi2vij4d3EGvaTqC4863aOZQVV2BbawxkAjJUdK9+/wCCcvxwb9pj9iP4b+N5ZPPutb0aJriU/wAUqZRjznutAGp+1F+3F8Mf2PPCz6r4+8WaTooVSY7N50+1znKj5Y85/iHbvXovgPxnY/ETwdpevaaZG0/WLWO8tnddpaN13LkfQj86/LL/AIOeP2UfAOifsWap8RofDdn/AMJrPrunRPqzlpJivmngBiVHXsBnj0r9If2ToQv7NPgGT70jeHrFS3TIEK44HHc9KAPQycV53+0b+1F4H/ZX+H0nibxxr9joOjo/lh58tJO56JGg5Zj/AIetehSdVr8kv+Cpb/8ADRf/AAW7/Z2+EeutI3hi3tV1me1Zv3NxOZDtDKcqwHlDgjPJ55oA+u5f+Cw3w20bSbHWdc8M/FDwr4V1J1SDxBq3howaa244DmUOxCcjkqOvft9Q+FvF2n+MtHtNQ0y8h1Cxv4Eura5gcPFcRNyrqw6g1xX7QHwK0H4zfAjxT4N1Wyt5tH17SprBrfyUVEARtu0Ywu3HHHGT1r4j/wCDcD44ah4y/ZS8TfD/AFC6a6vfhb4iu9FtZJOsdvukESn1H7s+nSgD6d+MX/BTL4b/AAq+LLeA7RfEXjbxlEheXR/DGnHUbi3AxnzMEKnX+I8846GoPhX/AMFQvhj8QvixbeA9T/4SLwJ40vsfZtH8UaedPuLrOceWSSr9Ox4yPUV8I/8ABC/40aP4C/bS/aS8D+PryPTfilrfimS5ilvmWOa7sg02yNGOMKMjHXrWt/wX9ltPiB+0d+zb4c8Gt53xUs/FcM6tbL501pZboS/mOOikDnpnFAH6w2tz9o3cbSrFSp6j/wDXXGftD/Hzw3+zP8JtZ8aeLL37Doeg27XFzIF3M2BwijIyx7D2rptIM0VhbCYrJdeUvmlf4sAAn8/51+bH/BZLxZ/w154Q+JXw90l5ZvCXwx8Mza74mlRv3cuokN5FqWH/ADzEchdRz+8XkUAfcP7HX7XnhP8Abe+BOm/ETwX/AGkug6pI8MQvrfyJt6fe+XJ454NeW/tI/wDBZ/8AZ3/ZK+LV54I8e+Nv7E8RWKK81sbOSTaGGRyoPOP515f/AMG3cKy/8Em/A28bfMmusqeTgSkA/XC17V8Pv+CfXgjRvi98RfG3irRfDvirWPHWqLqHm31ity1tbxpsiiXeDjGWzjqT9MAHlM3/AAcbfsi2yFm+Jq4wT/yDbjnoMfd6819c/Db4waH8Wfhnp3i7RrzzND1a0+3W1xNC0GYcZ3kNzgDk1+e37c/wi8JftM/ts+A/2b/BPhDwjo+n6e8finxxqFjp0MMkNpDgpAGC8FyxwCD0b8PQ/wDgu/8AHG5/ZP8A+CYuv2vhOaTSbrVFg8O2XkLsEEb4Qqp6jKkdPegD0mX/AIK4fDvVdY1S18JaB8Q/iJb6NMbe71HwzoDXdikgzkeYzr6HpnODXqX7L37Z/wAP/wBr3wzfal4J1aS7k0yY29/YXUJt72xkGcpJE3Kng+o4riP+CY37Pumfs6/sOfDnw/p8Isy2jw3lzwGZ7iVN7Sk4yWJ65yPaviLxXO/7F/8AwcceG4tHH9n+H/jRo6jUrWIlbeW6Ab94EyAGy3v1PtgA/VrWfElro1lNcXVxDZ29um+SWd1jjjHqSxAA+przf9nf9tX4e/tTeJvFWmeBdaj15vBl0tjqdzAA1uJzu+RHBIbGw5x0yK674mfCbQ/jH4GuvD3ijTYdW0jUHQ3VrPykoDj5TjHHHSvgf/giT8P9F+FX7Xf7X3hzw/YW2l6Lofj77NZ2lvGI4reNY3woUADueepoA/Q7xT4w03wh4eu9V1K8t7HTtPge4ubmdxHFbxqMszE8cV8w6b/wWL+GvibTL/VvDPhr4n+MPDOlki68QaJ4ba501ApIZg+8EqMdQD3/AB8H/wCDnj4u6t8Pv2A9P8PaXeT2EPjbxFbaVeTRLkmAnLKT2ByPwr7I/Y4+Duj/AAl/Zc8C+HdHs7W20mz0S2UwW8aiKRXhVpMrjB3lufXA6dwDpf2ef2mvBn7Unw2g8W+CNbtdc0KYlDPEGV4ZF+9HIjDKMOOD71z37UH7c3w7/ZDg0seMNWlTUNal+z6fpNjbtd6jfycECOJeT75x1FfAv7DGvr+yB/wXR+MXwV0uSa38F+MrP/hILHT/ADS0NpPt3kIucKD5h4AzwOeKwv2q/i1pHwK/4ON/Auu/Eto4fCd74dNnoN1dsy2lteOqqHXOV3ZI5PoKAPs3V/8Agrr8OfBl5pcfjXw78SPhza6zIsNpqPiXw81tZu7YwC6u2Oo+9jqPfH01oniG11/S4byxuLe8trqJZoZYX3LMpGQR7Gvif/gul4w8Ej/gmN47g1+50/ULjXrSOPRIopFkmvL/AHKsZjxgnGc8dCa7b/gn/revfAP/AIJN+CNU8azXDa74d8JNfXazKBJGEViqN9Btz35oA7P43f8ABSL4c/Bb4mx+B/8AifeLvHDRNOdA8NWJ1C+jRSgYsAQq43jhmGecdDT/ANm7/go58N/2mfHmp+D9Jm1jQfHGkjfc+HPEFkdP1JE+bDBCSGHynlWOMc44r5B/4N9/B8Xi34V/EX4/eJ5k/wCEk+JHiS5k+3zOFEdtG7iJMueEG84HPfmvoX4k/wDBO3Rvip+3h8Pf2gNB8TLpupeGrWWyvo7JVkj1RWA4JXIGMHP+8PSgD2n9pj9rjwL+yN4EHiLx5rcOh6fLMLa3DqZJ7yY4xHFEvzOx9uhx614nr3/BY/4b+CLWw1Txd4V+LHgnw1qTBbbXtc8MNb6bLuIAJkV2IXkckDqPwq/tjf8ABNb/AIbB/bA+EfjvVvEUf/CJ/DlnuW0OZWb7Zc5Uo+37pPynOR/dxjnOx/wVv1vwX4W/4J9/E5fGP2ODTbrQpLW3hlO1pZsERBE6bgc4wOM0AfSXgvxppvj3QLPV9JvYtQ03UoEuLa4iYNFNGwyrKR61sA818Rf8G+Gk+JNN/wCCWnw4i8UJdw3XlytbR3IPmrblh5ed3bHSvt3vQAUUFsGsT4gfEHSPhj4ck1bXNRtdK06J0je5uW2xqzsFUfUk4oA157gQbd3AY4z7+leH/tL/APBQ74a/sseJdM0DxFf6hqHirWMGz8P6LZNfalMpx83lrwoGR94jrx3r2Y6jHc2qzKUdAN+Qd2V7MP6V+S//AASLsY/2k/8Agrf+0v8AETxAVvtY8O3y6Tpb3C+Y1tCGlHyBshTwOcUAfdPw5/4Ke/Dfxl8WLPwPq9r4s8B+KNTRXsbDxTpf9nve7s4EZ3MrHgcZ43D1r6FlvxAm5lKjGcdz6jH5V8D/APBw58L7fVf2DLrx/Zq1v4t+GOp2+raTqBbE9vtceYoP919qkgYzt619QfsRfGRv2lP2T/h/40kkkkm17RbeeaRWKh32jccZ9QeuaAI/2pf28/hf+x1oi3nj7xTpukzTOkcFmJQ91OzEDCx9eNy/mK9U8LeIbbxb4esdUs2ZrPUreO5gLrtYo67hkduCK/Jn/g51/Zf8C+D/ANnPRfHun+HbK38Yap4w0+KfVAWMzK0i8cnAxjsO561+pnwMj8v4MeExlmxo9oMnqf3S0AdVQWwfrRVPW9RTSrCS4mkSG3hRnmmYhVgQDLOSewA5oA8X/bu/4KC/Dz/gnt8N7PxN4+vLpbfULpbO1tLOHzrm4diBlRkfKMjJ/wBoV6v4J8ZW3jXwdpeuWMcws9ZtYru3Eke1tkihgG54ODX4af8ABeTxLL+138D7/wCMjRXC+F9D8W2nhvwmrsVjlRJCLm629/MPk7T0+Toa/aH9n+KW6/Ze8G+UoMn/AAjlsVHOS/2dQvSgDzv4qf8ABTf4b/D74rzeB9Oh8U+O/F1mcXOk+FNL/tK4tunMnzKqgc9Tzg+lP+C//BTP4Z/Fv4vf8IDM3iLwX42kXdDoXijTTp15cDn5oxuZXHToePxFfBf/AAb0/GTw/wCGPjZ8fPA/jK+t7P4qal4tubl/twCXV7a75fLjVm52KM4H+1W1/wAFsZLbx9+39+zFoPgGSNvidYa+0l6bODdJZ2Ia2JEjj+EgN1/u0Afq5PdeQ3I6gfXJPA/Hn8q8X+Mn/BQr4U/Az4oeG/BeveKLEeKvFN4tnZ6bbyCacMxwN4Unb+PvXsU1j9shkSR2w4KnIB3KQARjpg4Pavxn/wCCof7LXgH9m7/grP8Asn3PgnwzpWg3Ova+02ozW0IEl7IJEIeRjksRvbGTgbjgDJoA/aCCTc8i7lYqegGMfWi4nW2iLsdqLyxPYU6OPyy3zFtxzk1HdR+YvTccEAHoelAHjv7T/wC3t8Nf2Ro9Lj8Ya1JHqmtME0/SLG1a61HUGOOIol5OMrnP94V53df8Fefhr4T8S6VpnjbQviF8Nf7clWCwvfFGgtaWdw7EAAOHbHVc5x94de1O5/4JtL4s/wCCn5/aA1rxHHqtnp2jLpuj6HOm4WE4zulHYZwP++RXn3/BxTc+F9N/4JceOI9cmDX175MekLIczteBj5bJn5hye3tQB92wapDdWEd1G6PayR+aswcbChGQ+f7pHNfNer/8FYPhpceNtX8P+EdO8bfErUNBZo7/AP4RTRm1CG1cZ+V5NwA6N652n0rO/Yo+H/jL4mf8EnvBfh3WdTm0XxZrHgxbD7ZISZLYvHhXbueMe+K2f+CaX7CNl/wT6/ZcsfBdvcxaxq81xLfanqcMRha9nkbcWZyc7Rz97PU0AdN+yx/wUO+GP7X19qmm+EtUu4/EehnGpaFqdsbTUrHry8Tc44bkE9DXVftC/tU+C/2W/AU3iTxtrVnoukxuIY3kbdLdSnGEiiHLk59eOK/MnSNRXxt/wc0x6j8O2jnsbHQWi8Sz2nzWxfbgq7LgFjg4yTzmvsr9uP8A4Jxf8NpfH/4TeI9R8QLa+HPAN619d6G0BkXUnzGUJP3QF2HORzu4xjkAdrP/AAV/8BeFPD1tr2v+Cfi54d8KXXKa/qXhhodP2nGH3iRiF56kD8e30Z8PPixoPxZ8Faf4g8Mahb63o+rRJLaXds26GcN6H27+lee/trz+GdF/ZJ8f/wDCTyadbeHYvD9zHOtw6i3Vdn7uMqAOcj5ce9fAH/BDL4l+Ivgp/wAEYfG3jDVGuodN0B9UvdDW5Y7VhGfKx0+Xp0xQB9ufFX/gpx8Ofh78VLjwPpVv4o+IHi6xJ+2aV4T03+0ri0xjO8BlCnngE84b0rT/AGdv+Cinw5/aP8fXng/TZta8P+NLGITz+HvENgdP1JIyXAPlliDnY3QnpXy5/wAG4Hw0juv2MNS+KGqH7R4t+JmvXeoX19ImZXjDny0DDDBBvbAJPU81wn/Be/Rv+GaP2gP2fPjp4e26Zrul+JV0fUb2FDH59tI8OFkxy38fU/1oA/S34sfGDQvgn8OtU8WeJb0aX4f0W3N3e3Txs4ijHXIXkHpXyJL/AMHFf7Jbxkr8TFUpnd/xK7htuMdgvftXYf8ABVzxOut/8E/ta+zyxx/8JY1haRAORvWeaLPy5w3y7utaXhXw/wDs06HDpXhu5h+D7atb2cUHkzCz+1OyoqklNudxI9etAHpH7J37ZHgn9tX4Yv4x8DTaldeH/tDW0Vzc2rW5nI7qrc4rmPj3/wAFHvhp8APiRB4Nuptc8TeMphu/sHw9p51C/jX5csyAgKBuHU/yr1Wz0HR/hz4CuhoOm2umafZ2kt3DbWsSxwk7c7tq8dhjFfmP/wAG7mmr8dvjZ+0B8YNYZtQ8TX3iWbSkurg7pLeCOV/3YB6L0/KgD7j+Cf8AwUh+HPxj+KUngZh4g8H+NFUSponibTzp95PGc4eNSSGB2noTjjPUV6/45+J2h/DbwpfeINe1K10nRdLga4uL24kCxRKOuffjp3r88/8Ag418Lr8NfhF8OPjZokg0/wAYfDvxRbxRahH8srWsj5liJ7qdg4r2r9tX9l7UP+Cpn7EHhHRtO8Sf8I5b+JG0/Wb9o0ZlurfaGePC+uT14570AWov+CyHw31Twxd+JtJ8JfFjXvCFqxV9e07ww81iQDguGLglB6gGvev2b/2lvBv7Vvw2t/FngXXLXXtDuGMfnxfK0Ug+9G6HlWHcGq+j+CPDfwI+A1voSmx0vwp4e0f7LK8jL9lWFI9rblIAJbnOB/hX5w/8G1lrqEnxG/aI1DR7eWH4a33iUyaKRGUgkcST+YYx0xyvT2oA/WUNk/rS02NNmenoMelOoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEHWkkOBSjrSS9KL2FLVGfrF+LC1aZm2xwgu/soGSfwr+cf/gqP+0pP+1H+2R4s1hbySXSdKuTpenQk/LGsRwWA9WyMkcfKOK/bX/gqh+0Sf2af2NPFmuW+f7SvLZtNssZyJJRtzxzxX88mleELi/f7RqEy/aH+eQn70jEkknPc5r7LhfAe1k6jPyzxDziVGlGhHbqYumaPdatKIl+4TksR92us0Twxb2EfzBpJE6lsbfw4rUsoYbKEJGqLxycD5v1p7OoGAV/DH+NfpuGwUIq8mfgGOxlevLkSdvQngiXy/ur/hTkTZ3P402GVQuCTx0xg/1pXuI06vt+u0f+zV6cZUYrRnlyw9WWskxzJvpUjCg1Gt1E3/LVf/Hf/iqJLyNBxIpz/u//ABVHtod0T9VqLWzCT5lIqAosZy6syqNwx16ini7jz99T/wACUf8As1SJdRyn7w+X0ZTn9amVeCWrQRoVL/Cz9Pv+CI/7ckmsQTfCfxFfPPfW4afR5pj/AKyMdY855P3cYxX6XbFn+UtsUnapPUHGfpmv5sPhx8StQ+EfjXSfEWi3Cw6jo90l1ExbblVPzL8pyQfw6V/QD+yD+0hpf7UXwW0fxRp08EjXMCi6jjbPlTYw2R1HI4zX5FxflcaNf2tLZn9H+GvEM8Thvq+JvdaK6Pzx/wCC537JH/CLeNbD4oaVabLPVnS21URjASUEbX6d8nr6V+aPxHs5tR1DQYEXNxcw+VFEOWlkaQhVH14/Wv6Tv2qfglZ/tBfBPXfDV9As/wButmEXHzLKASjD3B9u9fkv/wAE5v8AgnnqXxG/bqtP+Em09v7J+GJaScSJhbibexgzkHONr5xjt0ruyvPYvLnCo9Y7HDnPCMnm6qUlpNn6Ef8ABKP9iqx/ZG/Za0mzmsoY/EuvQJfarcAfvN7jcI8+ig/+PGvqyHOWz7fhVewtVtlKxqoC44HTP+cVaUYr4LEYh16rqy3Z+uYLCRw1GNGHRDqKKKzOwKaw5p1GOaAI5/4T/dOa+L/+C0/7N8fxq/ZSuNWt7ffrHhGUX1u6j5imRvU98HAzjHQV9pMuVxXO+PfCkHjPwrqWl3UayW2oWsls6kdQ4xXZl+JlQxEai7nkZ1l0MbhKlCfVH80I2qzFRwzk89e39c1Nu+X8K7P9p34S3HwG+PfibwtdLIn9m3zmElfvRMcrzwM9entXDNcqi/eH44H9a/esPiIVaKmnukfxtjsHPD4qdFxej7ENxH83mddnJU9DX7If8EMP2lT8TPgDceE7+68zU/Cc+wCQ/M0D7tvfttP51+OXnKysBtbcu0/OvHT39q+lv+CUP7RNv+z/APtcadLqN0ltpHiCN7K7kklHloWxtOAfvdcZ9+vbweKcLSxGElJWbVv0PseAMZXweZxbulJ6n71hvkPfuKdH0qhpF9Hf26zQv5kcyKyMOjIehH1q+vFfi7upOJ/Vqs7SQ6iiigoKKKKACiiigAooooA+Jf8AgvF/wTp8Xf8ABTL9jm38A+C9b0/Q9VXVobp5L1ysEkQ+8GwOenqK/Jn4gf8ABst4N/4J9fAHxB8V/jN8ZIbWbwzaPe2dlpUQiWe7A/dRLuyXVjxgYIx15r+jTW38q0MjLujjDM4HcBSeO2cgda/jz/4LF/8ABUn4kft3ftaasnii+iXwz4L1qWy0vR7SJo7VhBKAS6Fjudti5J444A5oA+2P+Ce/xR/aO/Zi/Zd0zWPF3x0+FvwL8E+KrqS+0CHxjp8d9q12shGCEXlI/wDV43Lk7+vHHk/7WHwN+Knx5/bu0rTfjt8SPCsnh34uaa9honjLw/Gi+H72ZVBgDDH7tiXGQW/i4xWx+11+yDrX/Bb208B/GP4M+JvB8xs/Dlj4e1nw7q2qw2N1pM9urKzbGwpjbnouRs68ivOf+Cl/jzQf2QP+CdXw4/ZY/t6x8W/ETw1rc3iLWdQs7lbu00zcq7IYZBkjkNwD/CKAMf4Uf8G9v7THhv8Abk8P+CZPB97Da6ffW+pHxPZgPpjWqOG8xXU87hjA3etf1l+DdJfQfCml2MkjTSWVnDbvKf8AloUQKT+Yr8Xv+DSn/gpR8SP2o/DXi74U+Mr6HWdN8A2FvPpd7KjNceXL5g8t3LHcB5YGMDFfthbose5VVVVT0UYHQUAYvxJ+IWmfCvwZqHiDW7oWOj6TA9zeXJikl8mNep2oCT+FfmL/AMFNf+Cwf7Ofx2+Dng/TfDPxIsdRvrLxvo+ozI+mX8BhhinJY8w9R6c5r9Std0qLV7RoZoIbiKQFHjlG5HU9QR0P418T/wDBXX4GeGdK+CXgk6T4V0n7a3j3Qw32bTog/km4xICQv3MHn6CgD0b9nv8A4K3fAH9qH4kWPg/wL8Rodc8SXiM8dmdMu4C6oFL/ADSRKuRkc57nr1r5X+KP7PXxQ/4J1f8ABTPxR8ffAPgvWviF8OfidAR4l0jR4o5NQsZdynzI49wMnfGORg5zkY/Rjw78JvDfhO8F9pOhaHp91DuQT2tjDEyouRt3KoPQDPPc18s+EP8AgpPe6N/wVP8AFnwL8cafpfh7SFsorvwrqmBF/aYKEyo0jHBYEpjbt+9zmgDwb/gq/wDtM+Mv2zv2BPH1n4d8EeMvhz4HsdON9q2q+LLH+z7q4EbhhFDEHOctkNuz1XGK+iv+CBmkXGif8EnfhFDcMxdtNeZQRjCvM7Dj8a8w/wCDgH4yf8Jx+zXYfAfwfINV8f8Axe1G30xbO0kWWa0tFkVpZZNudgAIwT1GetfaP7Knwai/Z0/Z18H+CU8tR4c0uGybZ90sq/MR65OaAPib/g6L5/4Jf6h7eINPP/kUV9ufspDH7M3gH/sAWf8A6JWvgb/g6N+KHh6L/gnTd6D/AG1pDa5ca7ZOlh9sj+0bEfczbM5AHHUd6+3P2HfiXoPxH/Ze8DzaDq+m6tDb6JZxTNa3Cy+U/krlW2n5TkHr6UAetypvX8R/Ovzp/wCCv/7DfxC8dfHT4b/H74P2UeveOPhfcZk0RJBHJqtupDFVyQWZfmGAw+8K/RZidwx/9avi3/got/wUa1z9hX9pT4TWV/ollcfDXxlfSWGs6rJC+/TpD5QjdZFYBAS75JB+6KAKEv8AwUO+IP7RngZ/DPg74MfEfw34z1C0NvfXfibTDp+laQzJ+8ZZd2ZWA34CkdBnOa+Yv+DXvwnqHg5v2hjfXpvoYPEyxfbZflw6+e8khX0yzAHuAPx/QH9t39snwr+y/wDsm+JvHcutWdxJ/ZzHSIYLj7Q2pTyKVhSJc5bJYZxXzt/wRg/Yo8RfAX/gmhqlnqlvJpnjX4lRXus3CElnt5blTsBZuc4IyCTjtigD5R/aw/Zy03/gth+25rupfBCybwS3w9uWttb+IquY4r6ZOBEgXG47kYE84z715t8CfHfxM/4Ig/tx2tv+0B4et/G+k+Mpo7G08ZSCS4nt87sbJC+xAN68bc19Y/8ABuh4u074DfD34jfBLxa8GhfEfwv4svri4srthFJqEMzlhKm4jep2c9ccdM1T/wCDmPxX4f8Ai18BfBHwh8PtBrXxF8TeKbR9OsbRxLcWkSkec7Fd2wEMnX+77UAfbH7Z37X+ifsyfssXXj6GSG4N9BFHoEAk+a/up1xCq+vLFjyPu181/Er4feHPgP8A8Eifinpt94m0K68ZeLtAvNX1+5/tC3e4v76dAX43gnjauO2019KaH+xJ4P8Aiz+y14F8C/E7wzpnimHw3ptqRBegvHFcxpgMCCDuHPfvXy7/AMFMv+Cdf7MHwL/Yt+JGqWvgbwX4a1+HRJ20/dN5UzyAfwh3/ecnnrjI6Z5AOi/4NsfEljP/AMEtvA2ltfWaasjXMj2f2iJrqNS+dxRWJC8nGRX258U/G9j8M/h/rPiK8kWOz0ezkvJpOPlVF3cHp1Ffm/8A8Gynwl+GNv8AsV+GfFei2XhtfiI0c9tqE1tNm8EORgMgcqo+9jK+tfQX/Bdn4qSfCD/gl78UL+OXyZrqxFhCwOMGTIHfvg0AeFf8G/lpfftATfGL9orW/wDSNU+I3iaexsbl1J2Wdu7gIuckL869/Ws7/g6gt5pP2FvCskbMYYPFdnJcIM4YB1OT+VfR/wDwQv8Ahcnwn/4Jc/CuxjjEU19po1CccYMkpySPrgUz/gtr+yTqn7Xv/BPTxt4e0OP7R4h02Iavp8YXLStBlmRTjqR09cUAfQX7OYjk+BPgtowvlzaLZspHoYAa/Mn/AIKrW8t3/wAF7P2U4YW/eB0eQJ1CBzmvr/8A4JL/ALW+g/tAfsN+Cpv7SsbTXPDOnx6XrNndXCxz6fPCpjIlRiGAwpx64NfKngTS5P2/P+C/LfEDQ2W78C/BnShYx6knzwXF4NwAB6EZDZxj+Hkc5AP1XkQIvDE7nGef9r/9dfnx/wAEhm3ft2ftqZ+8/wAQif8AyG9fe2s+JdP8N6NJeX15b2NnA4MtxcSLHHH8wPJJHrx9K/OP/gjt8aPCWo/t8ftfRweItHkk1jx95tgi3cZa7Qo4Gwbst0PTPagD6G/4K+fsIyft/wD7G+r+DdPvLfTvEdrOl9o1zMcKlwgOFJ6Ddx+VeP8A7J//AAUM+KXwl+DWh/D34h/AP4sTfEjw1appKyadpavouoiJNiTfai5CKwUE5znPGMV9Bf8ABU39qLxh+x1+x7rnxA8DaHbeItY0O5t5LixmiaXdalsSttUg5C4Oa6D9n/8AbL8FfHX9mXR/idHrum2ui3Gmre6g8lwvl6cVTMgZS2QQcjBBoA/Kn9nDwz43vf8Ag5Zt9U8aSWVv4gu9DfVL6xtJGkh0+Nogoh3Enlfl7nBr3D/gtXP4T/be+KHhv9mvw/4Sj8V/FafZcpq5nMEfhuAMC8jOoyCcqRk/wmr3/BJX4c3v7U//AAUH+NX7UV5azR+F9Wkbw94VaVdq30SMRJOinOAQqcjAOawvhRr9v+xf/wAHBPxKu/iBdJp2l/FnR1Tw/qt2dtujKUPlq5+UHkDn+8aAPkH9oT9hz4//APBIrxp4X+I3ieaP45/DPwq0byQ3TS3sWnc4djGxG1lIGG6HaeOK/Uf4x/tNaV+2P/wRw8cfELwc0dtY654Oum8uNRmCUIokjG3ocdBXoX/BTv4/eA/hV+xB8QrnxXqWnzWOpaPcWVpYCRZpdRuJF/dpEi5LEsRj0/KvnX/ghP8Asda94P8A+CQ//CH+K7OSzbx6b64+xXAP+hwXCnYCD0xxxQB4z/wQa/ZBX9rD9h3w3efEi41C68H6b5tppWhW11Lb20ycl5JwjBnkJVeQyjg8c1L8W5NU/wCCN/8AwU5+Gdj4P1rVm+EPxinXTrjQrm6lnisp8gAxF2JUDzD1Le+eK9L/AOCA3xHT4HeDvHH7Pvi6VdL8ZfDnX7kWVvdMImvbSRpDHJHuIDqQvbpx61wv/BUF4/25f+CsXwG+GfhHdrKfDu7bWNdvLVhJFYqfLIVmGQrfuzj8aAP1YujNqVqwt2e3eRSqOoG6IY5ZSQRnpX5lf8FGf+CbfxI0W0vPixb+M774xW/hNpNXl8G+KozJayRJ8zCNYBETgL3Y9B716r+2X/wUp8T/ALDf/BQn4f8AhfxVp8cfwU8YaQlt/a4ibNtfbtvzPnaByvYHrz6fRH7Xn7Vfgn4Jfsv+KPF2ra3psmmzaLcC1eG4WRr6R4nEccaBssSSM455oAw/+CYX7Zfhz9uX9lbQfGXh3S00CKOMWFzpC8Lp0sYAMYGOFyTgHJ4619GfxV+a3/Bvt8M779kn/gm/rnjPx2t5oNr4i1S88UGK6QhrazPzLhSSR944Ffbv7KH7WXgf9sz4WJ4x8A6susaHJO9r5wGNsiHDCgDtPG3i+z8DaBeatqUy2mmabC1xdXDKzCFFwT8qgk/h6V+Y/wDwVg/4LAfs6/G79j3W/C/h34kWd7rTapYSfZn0u+iwsV5Eznc0KjgA9Ca/Ui/02LUUZJo0mikUo8cg3RuD2K9D+NfFv/BZH4FeG9O/YV1ttJ8JaLDdtq+mbfsNhFDNzeRhsFEyflLEg0AdR+zf/wAFcf2ev2gPFmheCfCPxHsdY8TX0CRxaeNOuo5GZBym5owvr3/GvlvWP2ePiZ/wS4/4KL+Nvi/4R8IeIfiR8J/ikBPrNjoNutxqWlTZJysG5S4yzYwONpznIx+iXw9+EXhXRfD+j6hY+H9Ftby3t4zFPbWcccyHAUYZVDZ4OffNfMvwJ/4KXalq3/BSb4hfBDx9pel+GotKjW58NXzIbdtTT5vNXzJHIZv9X93b196APnb/AILLftBeOP2uv+CfXjKTR/A/ijwD8PtNtxdajqHiyAWV9fNg7EigDEqB827dnO5MYwc/Wn/BDnTZtJ/4JdfCWG4aRmGjoy7uykkjFeG/8F7Pij/wuL4WeG/2fPB7NrXjj4oaxbRTW1oVmksLBHUzSSlchVAYYLZzzX3Z+zz8MbH4DfBbwv4PtfJhh0PTobSONSPn2KASAOuT6CgD4C/4OnB/xgr4U9vGenH/AMirX6HfBM7vg34T/wCwPaf+iUr81f8Ag6Y+Jmgyfse+F9FXVtPbVo/FtlNJZfaY1uERHUs5UnOBx2r9Dv2X/iRofxA+B/ha40TV9N1i3j0m0jaazuElVX8lcqdpO0jHegD0N3WNdzHA9a+R/wDgqH8f1tbDw38G9Dv7a38VfFC5NjKzXAiay0/K+c5J4G4EAE+h4NfWs0Xmenp/L/CvG/2hv2BvhL+1J4rsda+IHgPQ/FWp6fB5MNzeKTLGg7LjnnvgjoPbAB+eP/BxT4f8I/DL/gl14F8H+F9S0me30fX9OtUgtLqKSRlTJZyoYZyw5b3r9KP2ZfGOl3v7MXg26tNT02eCy0Cz+0zQXCTJbEW6FgxUkAjB4r8j/wDg4s/ZF/Z8/Zn/AGTtFHgPwv4T8N+KpPElvFLbWk6RXP2YBvM3I5JKjcOTz8xxiv0D/ZI+AngCz/4J+zab8Kk0WzXxX4U2Ty6VOZFN89qAASWbawY9Pc0Afnt8df2Urb/gtb+2n4k8YfAez/4VzH4Knezv/GxZ4v7Vu1JGyPZweUOc5+8K5H9k34ufED/git+3fb+Hv2hPDdv4ih8cTLbWnjiXzLidMbtqrKzbFHz8gLmvrz/g2/8Ailovwz/Zs8S/BnxDcW+j/EPwZ4kvnvtPuJRFPdrK52yDdjeTsPI6e1cn/wAHLmv6H+0F8P8A4Z/Bzww1vr3xI1rxNBc2ltbt582mwAqszOVJ2Eh1IycHZ3waAP1Y06/t9TtIZrWVZoZo1kjkQ5V0IJUg1+Uv/BbNSv8AwVY/Y7Y/9Bp8f99xV+mHwU8JXPw2+DnhjR76RpLjSdKgt5mbqXWPByenavyp/wCC13xp8KXP/BVL9k8x+ItFuF0HVnk1GSG9ikSzG+Lh8N8p470AfsSpzn64pHAYfNVHwt4n0/xhosOo6XfWmpWNyN0VxbSCSNx7EE1cvOYGwVVsYQns3agDy/8Aa5/ak8N/sd/A/VvHXiS5K2diojigTHmX0zH5IU4yXOCBX59fBj9i74if8FffjHpfxr+P0N54b+HWlzG48L+B1RlZ1VgUe5VmIyQEPAGcnGKi/bd/ao+F3xO/4Kt6L4L+MHjTQ9B+Hvwj03+1m07UrkpBquoy42MRjDeV5OccY8wc819HeLv+C3f7Mfhnwjd3Vl8V/C+pTafbedFb28u5pGVG2RgADjIAA9zQB9e6dpdvpWjQ2tvDDbW8MKxRIo8tUjUYCgc4ArxT9tr9lXxJ+1R4Fj0nQviZ4k+Hr7H82XSyix3KHb8shZDwuDjbt++2c8Y420/aa+JXj7/gl7cfFbw/YaW3jvUNBk1fTrZYj5cg3ny1KE7sFR/eznvUf/BLX/go3pH7ev7PFrrl/dWWl+ONDH2HxJo004jls7hcguUJG2M4bHU/KeaAPlP9gH4qL/wTi/bmk/Zx8feFtFj1bxkjXGjeNNPjfz9cVj/y1Z3bkZHQD75r9OPiH490j4X+DdU13X7pbDRNIhaa7uJpNiRRKuWYn2xj8a/LX9rNov24/wDgu18H9N8Cz/2lp/wlhS+13WLMB7SM7siEuuQScPwD2Fel/wDBcD9prwnD47+FfwX8XeJrPwt4U8bXx1PxJdXMxiVrG3IbyieRtcsARjoKAPPPEHh/4pf8F+/GrYbUfh3+zFod3tjLxbbrxWUbllB6xHZxlf4zzX1N/wAFFvhBpPwb/wCCR/xP8I+ErJbDTNF8LSQWlvAoXYAuMkDucc/0qv4J/wCCvX7I/wAO/Cdno2j/ABW8F2OlaPbJDZ28L/LDEgG1EUDjvjOSasfs1ftCr/wVE/Zs+Lclj/Z8nhHW7i90DQp4kKfakKEb2LZ+Ykrg4x7UAZn/AAb5GOb/AIJO/CtflZo7R1k28fOG5z714p/wdObW/Y08EwxktcTeNLAQqDyT5i9PzrQ/4N8fi2nwg+Dvi79nvxYf7L8b/DPXbtYrS6mWOW9tHY+WybsBvuHJXAGRwK5v/gr3q0P7eX7bvwJ+AnhFxqzaDra+IvEtzauJY7CNTGyo7DKqTsbrnoaAPrz9oL9i/Tv23P2OvBHgnWtUv9N0mNNKv7tYGCSTeQgbaW6qMnnHJrB+P3/BKn4PeN/2ctR8L6f4L02zvY7F2stTgcjUY3UFvME5y24nBGc1yv8AwVj/AG3vHn/BPV/hb4g8O6Va3Xw9m1VLHxRdvbNL9itz5aKQVPyjG/J9q92+MX7W3gnwJ+yzq3xGbxBps3h9tIe+tLmCZG8/eh2xoAcscnpxjP5AHyj/AMG8/wC1T4g/aA/Zp8XeBfFl/Nqeo/DXWJ9DFxcszSSWwZ1RWYklmwjen0rzf4G/DD4nf8Ecf2yfiJqVj8P/ABV8R/gr8Sro6pFd+FrP7ZeaZMWZtrW+5d3L9gPumu0/4Nw/gHrPgL9njxt481uznsJ/iZ4hn1extLiLy5Fi3uY3IIyCwk4/GvVf2FP+CmmpfHP9q34pfCfx/p1n4W8UeENUkOj25bym1Wy5AZd7YZhtBO3A+YcCgD44/wCC/nxh8dftdfsKXWrw+FPEnw++Hem39syDxDbfZNT1e7ZmCr5O4mNF5yGBLbxgjBz+mv8AwT7sW0r9iD4U2twds6+HLRSC5Q5CDj1718Wf8FsPEy/tofGP4V/s3+DJk1jVdS12DXPEhtGEq6VZwshCylchWbL43Z+63Fev/wDBVT9qfx9/wTp+AHgLxN8P9EXVPCWi6lb6b4kQQ+Y8FgqgeYgGCCCGyent0oAl/wCCiv8AwTg8eftbvqWoaD8YPEGkQJHug8NXG1tHuHUZ8tlVVf58AEh65v8A4Ip/tr6V8TdI8XfBi98D6b8NvGvwtu2tdR0qwBWC7yD/AKQqszMN2wnljX1V8NP2rPA3xW+CVj8QtN8RaUfDV9ZLfSXclyqx26bAWV+eHHI6fhX52/8ABGbwXqPx7/4Ka/tCfHvS4JovA2qznTNKnkXCai2XDOpwNwG0c/7XvQB+sFlL5kIz1UYz61NUNmhji2n+Hj9BU1ABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAg60yY4xTx1pHTfQBx/xZ+DPhv42aFHpnifSbPWLGOTzRDcKWXcO9edx/wDBPD4Oqfm8BeH29Cbfcf1Ne5+QtL5CitqOMxFJctOTSPPxWU4TESU60E2u54a//BPX4O4/5EHw+f8At2Wm/wDDvX4Ng/N8P/Dp+tsK9yaAGhYF7it/7SxfWo/vOf8AsHL1tRj9x4jH/wAE/fg2nT4eeGj9bRT/ADqRP2A/g6v/ADTzwuPrYof6V7X9nWkNsp9aP7QxP/Px/ew/sLAf8+Ynisn7AvwdP/NPfC//AIAR/wCFNH7A3wdH/NPfC/42Ef8AhXtgtlHrQYF9KP7QxP8Az8f3i/sHAf8APmJ4sn7BHwf7fD3wuv8A3D4/8Kev7BfwfUf8k+8L/wDgvj/wr2b7OG9vpR9lX/apPMMS1b2j+8cchwC1VGP3Hja/sD/CF+V8A+GVK8/LZqufyrtPhf8ABXw38HdKksPDekWejWbv5hitU2qx56/TJ/OuwW3VfWl8hfesq2JrVH78m/U6MPlmGoO9GCj6EEqs64U45ycVmaF4E0zQdRv7y0sYLa61GQSXEsahWlPufz/M1teQPelRNlZczStE7pRi5czQkce0n65p4NJtxSgYqOpQUUUUwCiiigAJwKqzK0jMB6Yq0eaZ5C571Mo3VgPMPHv7Jnw6+Iuvyapr/hDRtU1Cb789xAHdvxrFH7CfwgYf8k/8NfjZKa9me3X/AGjTkgH+0tdkcdXjHlU3955c8owc23OjF/I8aT9hH4Q/9E/8L/jYIf5ilX9hX4SRTRsvgHw2rRuJF2Wax4YdD8uOleyG3Dd2oFso9abx+Ias5v7yaeSYGMuZUkinpmmx6TZpDCu2GNQiJ2RR0Aq5b/xUrRZpY02VxK925HqKCVrDqKKKooKKKKACiiigAooooAqaxa/bLVow3ls6lAxXcF3DbyMjPWvwH+Ln/Bmj4u+J/wAVPE3iBPjVodjHrmq3Woxwf8I/NIYRLKzDkTDnGPzr+gGSISde3fFJ5Cnqob6jpQB/Pbo3/Bl78QvDu/8As/8AaD02xaQYZodCuIS3r92fnNU7z/gyc8aXzs0nx10F2Yk7v+EemZsn1JmyfxJ71/Q99mj/ALopPsyf3R+VAH5lf8ENP+CDeuf8Ehfib421zVviDp/i6HxdYwWiRWumvZmBo2kJJ3O+7PmDGMY2nrnj9N4l27vrSCBV6AD3AFPFAARmqOsaBa64qLd21vdRo6yBJow6q6nKsM9CD3q9RQBDHAypt+UrkkgjrnJP8681+OP7HPw5/aOW2bxl4V0vWrizOYbmSPZcJ7CRcMB06EdBXqFFAHjfwT/YU+Gv7P3iB9W8N+FbG31h12DUZ2a4ulXn5Q7kkAZNeuJZeUBtzwcgbjgfrViigDyb4mfsO/Cf4zeJ5ta8WeAPDPiHVbjHm3N/ZrM8mAQM547noBXRfBr9nfwf+z9pdzZeDvD+m+H7O7dXlhsoViRioIXgDtk4+prtyM0AYoAjKNu4/EHvXK/FX4IeGfjh4Sl0Hxdoun+INJmIJtryISKCM4I7g89RXXUUAfPvg7/gmB8FfAviKz1Sz8E2c91pzeZaC8uJbqK2YHIKRyMUBHbivd4dN2HczMWXH8XDYGOg49OgHQVbooA8d+Mn7Cnwv/aA8RrrHirwhpl9rSgp/ace63vCpxlfMjKnBwB+FM+EP7BHwr+Bnin+2vD3hHTYdXXGy+uAbm4TGcYeQkjGTjHr9K9looAr21j5CBdzNtxjPc88n65rhvjH+zD4F/aEaH/hNPCuh+JPsqNHCNQthMIg2N2A2RztXP8AuivQaKAPNfg1+yL8N/2e764ufBfgvw/4YnugFlfTLVbfeBnAIXAOMnHHc1a/aS/Zo8J/tZfC668HeONNXWPD95Kk01ozbVkZfu5/OvQKKAMD4X/DnSfhH4B0vw3oNnHp2j6PbrbWltHnbCi9AM1tXEBeNtp/A9KlooA8F8cf8E1/hB8QvEt1rV94Tt7fUtQJa6ksZntBOx6syxkBifcHqfU16R8IvgL4U+AvhUaJ4P0HT/D+l5LNBaxhfMY9WZvvMT6k12VFAHO+Ovhjo/xN8OXmka/p9vqumXxzLb3ChkPT/CvO/CX/AAT6+DPgPxHa6xo3w28J6ZqllL58F1bWSxzRycZfcOSTgZyT0r2aigDP1vQYfEOlXNjeRxz2t4hinikUOkqEYKkNkYIrwO8/4JT/AAMur+aZfAtnbx3Ehea1t55YrWbPVWiDbSp7jFfRlFAGL4L8BaX8O/Dlro+h6fZaTpNjGsVtZWsKxQwKBjChRXM/GH9mbwX+0DoseneMvDum6/ZwEGJbmIFoyM42uPnX8COgr0CigD558Of8Euvgv4Z1q11BPBsF/c2LeZbnULqa6SBxyGVHYqCO3Fe8afoyabYR20KRwwxAAJGNoI9Mf4VeooA8h+NX7Dvw2/aD8Rx6x4p8L2N7rEKGNL9C0FyEOPl3xkEjgda0vgh+yN4A/Zxt7pfBnhnTNDmvSTPdQoWuZvZpHyzDr1PGTXplBGaAOL+MfwC8KftA+FJND8ZaDpviDSJCG+y3cIZUYdCp6qR7EV5RoP8AwSv+Cfh7ULO4XwTY332GQSW8d/PNcxQMOhVGYqPy7CvosDFFAHIfEjwhZ3Hwt1TSX0u31SzuLF7QaaQscdyu0hYhgYUduleQf8Evv2Sof2PP2dJ9Ai0+10d9W1a51eTTbZt0WnmVuIge+AOfrX0ZLCsw+amwWsdsW2KF3cnHegCSqms6Nb67Z/Z7u3gurcsrmOaMSISpDA4PHBFW6M0AVI9N8r7u1eCOnqcj8u1ecfHT9jb4c/tIXtvdeMfCmk6xe2v+qumQx3CDjgSKQwBwOh7D0r1LNN3jNAHknwV/Ye+G/wCz9r8mr+F/DNnZa1JH5J1F2ae6EfPyB3JOOTXqLaW3lhY5GjC4AwSMAdBwen1zVyigDyD4h/sHfCP4teJpdZ8T/Drwdr2pTkGS4vdNSV3xnqTn1rqfhB+z54R+AulXFj4R8P6V4esrmUSvBYW6woSBgcAdBzj6mu2ooAaoxQ6bxz9etOooA8j+Kn7D3wr+OHiefWPFngPw34g1K4G2S4v7NZmYYwB8wOMD0xXTfC74B+GPgr4dfSfCei6b4f0xpvPFtZQiKNHwoBAHpt4znqa7aigDxv4xfsGfDD47eIX1jxF4V02XWJOGv7YG1uW9cyR4JzgZz6U74NfsH/C34Ca+dY8N+ENLtdaZQv8AaMwa4usDOPnkJPGTjHrXsVFAFV7AyQmNmZlZdhzzuHfIPBzn0rxnXP8AgnB8D/E+ryahqPwt8F3l9NIZXuJNNj8xnPVtwAOa9wooAwfhx8N9H+FHha30XQbC20zS7NdsNvBGERBz6D371t3ERmjK525p9FAHj3xF/YJ+EHxe8X3WveKPhz4S1zV7wATXV5YLLJIB7msd/wDgmJ+z+3/NIPAKnOcppaL/ACr3migDJ0LwlaeGPD9rpWn29vaabZwi3hto41EccY4CAYxgenvXi/jv/gmf8G/H/ie91y68Fafa6tqDmS4nsHazM5bG7eIyA2cDrnqcYya9+ooA8++CP7Mngr9nXSZrPwZ4d0vw/BcyGWZbaEbpCf7znLMOvUnqfWqHxn/Y4+Gn7Q+qW99438EeHfFF5axeTFLqNsJWRM52j0FeoUUAeCj/AIJj/AJpAzfCHwDlRtXGloMD0r1D4bfBrw78HfC0Wh+FdH03w/o8DF47OzgWOJXP8YAHWuqooA8e+NH7Cvw0+P3iFNY8S+F9PutaRDH/AGjDut7pgcZy8ZUnOBnPp2rQ+Bv7Hnw//Zwa5k8G+G9N0W7vOJruJN9zKPRpHyxxk4ye5r1GigDB8ZfDvSfiF4dm0fXNPtNU0m5XbPZ3MQlhmHoytkGvErP/AIJTfAmzvfN/4QGxkhWf7QlpJdTtaxN1AWLfsAHpivouigDO07w/Do2nQ2dpDDBa28YiihRAqRIv3VAA4C9vrXlvxn/YS+GPx+8QRav4o8J6bfaxGApv491vdOvcGSMq2DxnBHQV7HRQB5b8Bv2Ovh/+zXJdS+D/AA3p+k3d5xJdhTLdMvPymV8uyjJwCTjJ9a7rxZ4MsvG2iXOm6nZ2l9p95EYZreeISRup6jaeOa2CM0AYoA+b/wDh1B8CxeNJH4HtbWFnDta295cR2rnnOYd+wg56Yr3L4e/DXRfhZ4ct9H8P6bZ6RpdnxDa2sSxRR564AFb1FACBcfliloooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEHWlpB1paACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKa8qx/eOKdVXWLlbOwkmdlSOFTI7HsoGT+gNAFhZVccMKXcK/F7W/+DnXxz8Xv2mvEHw/+B/wPm8dNol1LbI11qIt5rko7ISg3DcCUboOMd8120f/AAWI/biDkL+xPqi9MhtTy34jdxQB+te8ClDbq/Jlv+CwP7crAY/Yq1NfrqX/ANlTT/wWD/bjhRnk/Yr1TYvHGpjr2H36AP1mEilsZ5FHmru255r8Yfj5/wAHCX7UH7KXhaPxJ8Sv2UW8IaJvVHmu9aVZGZiMBU3EsT7dPxr9Av8Agl7/AMFMvBv/AAVF+AcfjbwrDfabcWM32LVdNuv9ZYXGMlScDIODj6UAfTwPNFY/jvxpp/w78KahrmrXK2el6Tbvd3c7KSI40GSa4n9lb9rbwT+2X8Krfxp4A1VdX8P3M8lss23aRJGcMKAPTqCeaKKAGtOiZ3Mq47k4pI7hJR8rK3OODXiP7fP7ZGh/sH/s6658Qtchl1CPTlEdpYRuiyXtwwPloCx6ZHOATXztoX/BTX4qfDH4r/Caw+K3w806z8N/GF1j0y80KWS4Olu+CgnZgF5DpkDPQ8igD76oqOCQMW2tlVO38R1p5bkf4UALRWXr/jLTfC2k3GoajeWun2NqC01zdSiGGIDuWPHPb1xXj97/AMFKPgjYar9jk+IGjtJ2kRJXhJ7LvVSAfrxQB7pRXO/D/wCKmg/FPQY9U8PavpesabN8q3FpcrIhfuvHQjjg+tb0U28nPHp7f5waAJKKTeB3oDg96AFoozmgttoAKKQOD3pc5oAKKKCcUAGcU0yKGC5GW6VU1m8ktbCaaGGS6khRnEKEK0pA6AnjJr4r/Y8/4Ktap+1h+3146+DM3gW48JzeA9Nlu5ZryYSSXDiVEGNpwFw3TGeRzwaAPuHOaa0iqOWFQv5ixH5vmJ/iHA+bH8q+Jf8AgoJ/wVX1T9i/9o34f/D1fh9eaivj/VYbG21aaf8A0cqWw5UDB3DcvUnr0oA+4gc0VX05XjtY/NCrIyglQc4PpmrFABRRnFGc0AFFGcUhbA9fagBaK8f/AGnv25/ht+yDf+Frbx7ryaPN4wvxpumKULGabKgjjpjev5161aXUd3Eskbbo5FDq394HkGgCaijOaA2TQAUUUUAFFFFABRRRQAUUVXvrv7Ns+YBnyBnp6kn2FADdU1ODTbd5p7iC3hgUyzSSNhY0XlmJyMADqTwK+R/iX/wW+/Z3+H3ijVdDbxp/wkGo6GyR348Pafcatb2rswXa08KlFPI645B64NfFf7d//BVnwL+1X+1/4o+DmpfECfwX8F/AsEl14pv7NZFm8UXESnFhHOoYIm4MGGBneMk448X/AGc/ij+zr4D/AOCXHxmvZvFHhfQvH3xQNxqdloltYTeZY28Eq/ZIsKhJOwMxJYElm554AP1J8Uf8Fh/hH4D+IFv4Z1i18fWGrXFiNRt7YeFb6SS5gPO9AsR3DBB7Yz3r1L9mT9uv4Wfte2FxL4F8YaXq9xYnFzZEtBe2/UZeCQB1yQeCOxr8wPi58c/Gf/BUf4B/C9vgZ8I/GrePPBVrZ3mmfEm/iXTLPT5Ej+dEOd08TmIgoemB13V5V4i/Z01rXf2NPEX7Xmn/ABKu9H/aa8EarJ/by3EyWenpNA+17BrdQMiReRzk+tAH76xOGXhlbHBxTq+Pf+CNn/BT/Tf+CnX7Ktn4pNudP8XaWy2ev6cfvQyjgSKP7jENj6V9gINooAdRRRQAUUZxRuoAKKAc0UAFFBODSBwxPt1oAWiiigAoozijOaACijcKNwHegAopN49aWgAoozTVkVuhoAdQTijOaZLII+v8qAEkuUiUlmUY9TTlkVyQOcdcV8X/APBZn9vbx7/wTx/Z6Hjjwn4Z0fWLQTx2txeXdwY/sbuwC4TPz5+b6Y96+n/2e/iBcfFH4J+FfEV99lF9relW19OLcERh5Iwxx+dAWOyZ1QfMQv1pBOjKWVlYLycHOKxviBf6np3hS8n0Wyh1LVoo2a2tZZfLWZsHjNfGP/BIv/go/wCNP2+fHPxesfFWjab4eX4f6qmlRWtrL5jBgZlbeT/1zXp70Afc8cglQMvQ06mxjaoHoBTqACijOKM5oAKKKjuZPLH3guQcE/8A66AJKK+df2Tf+Cl/w/8A2wvjV4+8C+Fl1KPWPh7eGyvzdRhElYFhlPUfIf0r6ISXKjdtHAOM0AOopA4PelzmgAooooAKKKKACiiigAooooAKKKKACiiigBB1paQdaWgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACsP4kW/n+BdY+Zh/oM68e8ZBP1AJrcrH+IWf8AhBNZx/z5Tf8AoBoA/Fr9kP8A4Ix+Gf22v+CfPgP4heCdeu/hd8aNG1HUm0/xPp7MvnOLx+JxhtwO0Z6e2Oa+g/2W/wDgrt46/Zm/aJ0X9nv9rDQf7A8UTD7Npnjq3cppOu4wFLMxO1jle/JfpXsH/BAlI4v+CZnhPc+3/iYalnnjH2qQnPt718hf8Favi9b/APBYb9qXS/2RfhPY2eqf2LfLqPifxl5AuYvD6xYKrDMp+VyQ+Qd33BxQB+wq3a3MaSqVlt5EDRyB9ynPQgg/MG9umPevkv8A4Ka/8FbPC/8AwTz8P6XpOn6JefEL4neJpWttF8J6RIJLmWRdg8yUclEUyoe2Rnnivz5sf2hv23v+CUP2r4CTeD7r4zvrkZtvAfiyGOR1slbK5nKsAcbk7L901yeqfs6/Fz/gi18d/A37V3xsuovi5J4nkFn45UxPPL4VEuCjw8ALt3Nyd2NnOeKAPpn4R/8ABIL4ift8/G7T/jP+11rUN9Dbn7bpPw7tlcWGlcAr5qksS/CfxfwngVrf8GyeiW+g+Hf2lbC1t1s7Wx+K2oR29sihUgjGQqKAM4AHQk1+iXwL+NPhn9o74QaP4w8J6tb6zoPiC0F1bXUcgYMCOVJHdc4Nfn1/wbYkm3/agyP+as6jg53Z5PegD7S/by+Ovwy+B/wB1iT4saoNM8KazaT2VxiKSV5lKfMFVAeeRyePrXg//BMP4jfAv4C/8E0bPxp8M11bSPhVHeahPFLd2rXF1IY7qWNnKxgZBCZHyjHNe3/8FLtKt9T/AGCfiwbiGOcWvhm+njWRQwV1hYq3PcV82f8ABvLpsN3/AMET/AaXC+csia5HJvA/eAX12MsOhOB3FAHTfC3/AILqfC348+DrzUPAGk+KfGGqf2lNpum6DZ2LLqGotFs3yANwiDeuc/3h6Gun/ZH/AOCs3hr9pf8AaF1X4T654R8VfDb4kaVCboaLrsIVrqHuyMOOxr5O/wCDYDwDo9xpHx81/wCyI2sR+O7rT0u2G6SOHajbUJ+594/dxkYznAq1+1DZrp//AAc2/Bv7OWh+3+FF+0bTzKP3xwT1P3B196AM/wD4Ojfjebf4NeCvBq6D4s32/jHTtSkv4dP3WFzH5VwRCJC4DNlTlR1OOnf7e/Z3/aa8M/Gn4YQ32ueB/FvhOw8C2Fteve+LdGXTokWOEkzwhmbKrjkjB+Zevb5T/wCDpCBU/Yz+Ge0sufiPpvPD8GObI+bOAfatH/g4f+LWo/C//gkXDZ6Pc3FtJ4vm0zS5tsjYEDxEugOcgHao5JHFAHrnhn/grrJ8WPC2reKvh78H/H3jfwFo8kkb+IbZ4LdLkRn5pIYJCryqcE5TPT3Fe6/sj/tj+Cf21/hfbeLPA2pSXVn5j213bTDy7qwnQhXiljzlWBIxnrz6U39iX4fab8Nv2Qfhlo2mReTZ2PhywVVTC8vFGzcDA5LHtnpX51/8EpNRuPg5/wAFx/2pPhxpszQ6DebtVhtR/q1mSQc4Hr5xzjngfiAet+PLmX/go9+2F4003xLrE2l/s/8AwMdoNVg8zyo9bvo13yGZxw0UXl8gAHEnWsjxH/wUQh8Kfs66l8QPAfwE8O3nwb0+8TTNPub24htZtWYyeUrwx+WS8eTxnnk8nt4v/bGsaD/wSs/ay0nRzcN4q03x5qR1SGHc1w1tLdI0jsACxQx7uO4Xrwa0v2rv2qvCnxB+BvwL8P8Agazu7P4EeFfEOlR+JfEAspUjXyQSI/J25Kh1bcQOSRyKAPoTwppP/DG/7f3wxi8O2cmh+Fvj9pc8Wp6BG4a107VIIFuUeHP3cl2DdeB9K9S8bf8ABUrQx8dtW+GPw38H+Jvix428PpnVrfRRFFY6dJk5SS4ldVVjhuBn7v5+f/BLxFP+33+3HoPxT0mx1C0+F/wn0u507QLu5tvLfWr+4ykkyK6/KiIiAYAPzjmnat8ePgH/AME/vj14i0X4e+HL/wAT/FPx5qDXuraR4cRrq4lm+XcZXYlYVG7Pvub04APVP2QP+Clnhv8Aat+JXivwLNomteCPiH4OGdS8NauqGeMfNh1lRmV1O09AMe+a5/47f8Flvg78CP2jNL+F+qahrDeJL64MMx/s2aOC2AzyGdVEn3SPkJwR7jPxB+y34y8Q+L/+DlrXL7XvDM3gu+1Lwehn0lpg7BTCrCRwCRk7j+tdD/wWM8G6T4n/AOC1X7ItpfadaXEGrRlboNGB5uZ3OTjGTwOtAH0T48/4Ln+FfhT4/wDD9v4p+G/xC8N+CfFF2LLTvF2oWix2EzltocqTlU75J5z7V0P7Qf8AwWN0H4NaZqGtaD8O/HvxA8G6Dg6t4k0S0U6faqRncpY5cfe6dNvvXkv/AAc8+FNO/wCHWd5N9li8yx8Q6XBbELgQoJJAFUdAAK+jPBXw40fR/wDglnHpNvp9rBps3gMyPAkYCNI1oWZyMcsTg5PpQB13gT9vP4c/EH9lzTfjFH4gi0/wLf2wuGvbmJ2a2PdHRATu/wAK8RP/AAXJ+F/jb4fX2ufDPRvFnxSuLK4uEbT9FsiJVhgAMkzlvuLzkbhk7W9K8n/4NxtPXxd/wSQvLHUMXkMmp6ta4lUNtj3EAAYxwM44rmf+DWHwDpF1+yV8RNXk0mxGoal4wvba5nCEvNFjd5bEkkqPNYAelAH0bqv/AAXF+B/hn9kjR/jDrGq3+l6HrSPHBYSWbveNcRkCSHA4BQsoJPXcMd694H7WHhfTf2brP4ratdT6P4RutNi1UyzW7NLHC4BGUXJ5z7Yr42/4OF/hH4Z+Fv8AwSG8X2Ph/QtJ0azsb61eCO0tUj2M8h3nOM5OeTnsK+jvgLpFrqv/AATD8PxTRRyRzfD1Uk3qG3gWhIBzkHnPWgDa/Ye/bo8Ff8FCfhxq/izwPJc3OhaXq0ukrLMmBcNGVJcDA4PpX5jfAz9o/T/2bv8Ag4H/AGlLy403VNcvtVtm0/TdL0218ye9lZ4iFBHCgbRyf71e7/8ABq5M03/BP7xGp+Vf+E01Bgq/dXPltx+f6CuH/YAsIbn/AIOPv2mriSNWltdNleIlQdh8yIZGfb0oA+svg9/wVm0Hxd+0Ta/Cvx94F8XfCPxpqo8zTrbX3haHUVy2PLkRiOwyCBjevvj5J/4ORfFlj4B/aK/ZR1jUpY4bPTPE0k9yyRvI8gV7clUQdSeMc8e/be/4OddNg+G/wf8AhL8UNPVovEHgnxfH9nuN5aQo+GZM53FWMYyARwO1c9/wXkv18V/Hf9jCaZfOXUtdiuJIpBmNhJ9mPI/D170AfSvxA/4LKWfwYTTdc8XfB/4neH/hzqUyxw+KruGP7NGpIG541yyLyMbiM8+lfXGlfFTSPEXgG38U2Wo2Mnh25shqUd/v/c/Ziu4yE5GMDqK8y/b6+GGi/E/9ib4keHdStIZrOTw3Odm0KF2RllI46r29M1+RnhH9rTX9M/4NitYVbyaS/s9Wbw1A7ltzWxl2dRyTj3A6cUAfojB/wWRsfFnh/WvFXg34U+PvGvw28NzPDqPiqwSOO3AQkO8UTHfIq7SSVzgY9RXvvhf9snwB4s/Z2t/ilaeIrVvBdxai6+3+U7NF13I8a5YMvQ+9fIP7BP7R0fgX9gnwB4Psfgj8UdR09vDcdtNPb6RCtvcPNHl2BLcqxPUjPAqP/gih8GviB8Jv2bvit4W+IfhLVvD+l/21fXGiWWrQoc2sokbCrlhxhM8DqKAPRD/wXN+E/jvwlqOofDPTPFnxQv8ATZJg+naLYHzGjiGZJCzcKo9xk19IfswftE6X+1P8BPDfj7RYLqz07xJYrcpFdALNayZKvE69irDFfm//AMGu/gnS5Pht8bdSOn28l9N4zvbdpdoBEXmSjyxjgLjtX6n+HPBemeDdKt9O0e0t9Js7YFIobaJEVAck4GO5oA/Pr/gqd8a/2W/H3xz+F3gn4q3F5rnjjSfFFs2j2GnQyloZ5XTBdyoXB2L0z93t3+gv22/+CnHwz/4J421hB4yuNUa61Jkg0+ytrORg5JRQGlYlVUBhkmvjn/g4WsLWP9rz9ju5FrB9ouPGwEkgXa0g820HJGCcZ4yeK7L/AIOltNt3/wCCcMchijkLeIrKNyyAsylmO3f94DjsRQB6/wDFb/gsXpfhLRr3VfBPwz8efFHQNEiWXWdX0S222Wn5UMVV2z5pUbtxXgY9xXvP7HH7YHhH9tz4Maf468GTzSaXf5R4p1CzWsi/eR8HqKzPgz8ONH+H37DGm6RpNha2enf8IiC1uqARuzWhLMfVmzyT1xXxN/wa0SFP2XPidbqQsFp46vY4Y1+7Gp+bA/Fj+QoA/USiiigAooooAKKKKACvGP8AgoL4+1T4ZfsgePNY0X5dWh0iaGzfONssmEXPfGT2Ir2evBP+Cm07af8AsTeOL4yLHDplol7MSu5dkcqO2fbaGyBzQB+Cn7PnxB1T9lr/AIJnfFzQ/FHwX8V6tN4+8QPZXHjK1tY9RtVJutrkjAdZPmIXDYPORxX6J6J/wU1/Zc0P4EL4T0/4WfExb0aKmlBIfhrMsnmeR5RkMojIPzc5YkZz614/8JPif4d+LP8AwRR+Lq+HNcsb7/hD/Gcut28BugrTRfb0uIzs4Ygow6HnBr9ffhl4hsvGPwu8NarbNE9vrGmQXEW2RQY45IkfGOh5GDQB+Y//AAS+/bU+PHjX9jXw34L+EfwJvribQXuLL/hJ/FN5FYabABPJtJtlYSSOAASNy7SF4O7jDsv+CeOoaP8A8FWPDK/Hm4sfF1l8XLa41qfRtLV7XQ4tVt0UFpIcnzNwcZ5zmPg88/an7Fnjrwv8BvD/AMVNN17XNF0Wy8O+M76V5r+7hiihWVUkwCZMjJLdB2FfHf8AwUD/AOCk+g/HX9uP4B6f+znGvxK+IXhvUb4JiKSPSSHgUAmc7Q6qVJIU+nNAHD/sVeGIP2C/+C9WvfDXwpfWtnpXii8nin04kj7VZyQpNbvsGFV43EyggY2t0J5r9qJ5WtwfLHmSdwTwcc4Huc8V+F/7LnhLxN4H/wCDguzj+K+u6f4u+JGrQ2l9Ld20eyLSd1vP5ltD32x7ogd248jmv3Qlt1miKyKsnIDgcfNxzQB8ZeC/+Cvt14v/AG57j4DyfCPxNp/iK1cytdz3sSQm15xKARk9O1a/7eX/AAVSm/YR+I3hXQdU+GOveILXxldR2OmalZX0KQyzsQGUq3I27l796+df+Cu1q37Jn/BTb9n348QxmOx1W9XwtrUo5XbJkRZ/xJxXE/8ABcr4bXn7Xuu+MNV0N5JI/wBnbw5aa3B5LFVa+llEr428HbHEvHB560Afol+0z+1lqn7Nf7NVz8Q7jwHquuPp8Mc97pNrfwQz2yuQB8znBOSBgetfP37SX/BaS9/Zbi+Hp8SfBPxdD/wslYV01hqNuywyyFf3cmAcFd656ZzxWR42+OMH7Zv7KX7O+g2dw1xN8WLuyvNThjOD9ltQjTDI55cR53Z71sf8F+/2e7j4u/8ABPnVdU0uKNde+HtzD4gsSE5UQMGdF7hdoHAweBzQB7N+19+25rH7If7NUvxJvvh7qXiC10u3W71ews76KKbTojt+Ylshs7u3TafWtT9kv9sG9/a5/ZytfiHpvgu+0KHVIGn02wvb2OSa9A5BDLgLnB6/418h/G/4tL/wUQ/4J6/A3wPpdwGuPjZ5NvqaqMSfZLWEm4Ut2BdohznjPrmuH/4JTftSr+z7/wAE1fjF4S1abbq3wT1DUdDtoW/1iFyVtVX+I/M3HtQB7F4//wCC6N58Mv2eb/4nal8CfGx8K6Xq02j3NxFqNq22WN9hb5S3yk9M479e30R4b/bE1jxX+yJH8WtP8AatPFdaeNVi0g3kX2h7baX3bumQoPavNfGH7E8fj7/gk3efCu4t/tGp6h4bNzcCTB33skZnaTkfeDvj8B1618z/ALD37UWoa3/wRCOgNL5njDR7s/DySFRiTznm8oA55wI/MP1A7cUAfXX/AATo/wCCl1v/AMFEfh/q3ijS/BOqeFdF0y4a0WW/vYZmuJlPzIoXGDwfzFb37P37bmsfGr9pDx18O7z4c6z4fk8BypBeapNeQTW0rSRiSPaEJPIz+lfE3/BHWK3/AOCef7Vnx4+AuoTSW2l6GieKdP3N87wlcyseingk5CjnFfXf/BKbw5daz8A9Y+IWtR4134q69e+I5ZHGXFtJKyW6gnkKI0GAScZPPoAelftgftf+Fv2KfgVq/j7xjNLDpekBYzFEpMlzNJxGiH/aII7/AOPzT40/4Kk/F/wB+z0vxk1L4ErD8NVRbqYf22G1aC0PScw7ehHOPavov9t/UfhP4a+Auqal8Yo9Gm8D6bi7nTU8yRmaMFowidWfg4AIr4m/a6/bU+IH7WH7A/xI1L4Z/CttJ+GS+HLi1XxDrtwtpNLaqGANvDwcBQPvA43CgD6u8Sf8FHfCmlfsT2Px00rSfEXijwrfWC3ywaVaiW4QEHKsN3y7SME4NeK/s/8A/BZbW/2z/hWuqfBn4T3/AIu19fMlubO7vhZ29lGpAVZJCCN7/MAM9UNcX/wSfjE//BvTbvxuTwzqSo/DEjaeemCTjritT/g160m3tP8AgmFps8UUcU1xrd60rqoDSkSnG49TjJxnpk0Abf7N/wDwXM039oPRdW0G3+Huqw/GLRtSbTJfBUV2GkkYNtMgnK7dinG7I/iFdF+zh/wVp1rxT+2hN8Bfix8N5vhx46urZr/R2W/W7tdRh6DlRw3HbOc9Bivnj/gkHolqn/Ba/wDa6K28EclnfKsUgjBZV805UEg7Qc87cE4HpWh/wURso7D/AIOF/wBk8QKsPn6U6zbFA8wefLwT1P40AfUH7dH/AAWB+HP7AnjLRtB8Yad4rW+1y7S2tp4tIm+xndjJEzKFbGf4c4yM9RniX/4K+67ovxw8D6frHwl8QWPw6+JF29joXiFZfOmeRQpLyQquUT51xnrk88GvGf8Ag5q06O40b9nG3Kborj4hwpIrMSGVpYMg89D6V+nEHhHT5ba0D2tuzaeqLaMYUzahVG3Zx8uMnGKAPlX4Sf8ABX7wn8aP+CgMvwE0fw74ig1Ww0+5vby91K0azj/clQTEG++p3fhx60v7ev8AwVz8K/sP/FHwf4L1Dw/4k1LXvGGoW1jaSJaGOzPnSBchz94gdcdM181eD7eO6/4OntcjK7Y/+FfSMy7iwc4XsxIHvtxnv0FV/wDg5JJi+J/7K+1trHx3AuR1UeZAcD24/nQCO6/4OcM3v/BLLVpGSOH/AInlk7DHmNF83TA7n/Ctr4S/t/fF7wh+xz4Z8WeEfgTda94H8N6BbC7lvNYW21K5WKICSSCDbllAGcfzzxm/8HOSKP8AgljqTbR/yG9PyOmTuHPHPevsL9kXT7e6/ZB8AxzKrLN4YtYmJUHKtDgj6c/jQU2Z/wCxd+2l4T/by+A2n+PPB9zMthdAxXNpLGUmsZ1Vg8UnPVSO2On5flX/AMEV/j74q+Fn7Qv7TGg+A/Atx448Q6p4znmAkvBZWVpGjy7mmmKttzvGBg5w1exf8G6t7ceFfjz+1F4LgbboPh3xU01pGB8oLSTZ9u5zgDoKi/4NybVW+O/7V7Mqsf8AhN5QGyBuTzbgYPH8sdKCT6h/Za/4Kj3XxI/aivvgn8UfAtx8M/iVbwfabO1a9F3ZarEATvgmwN3GOMcZHrXSftW/8FFIfgZ8X/Dfwx8J+HW8dfE7xUvm2mix3Ito7aIYzJPMQRGBnuOcH0r4v/4Lr3cnwp/4KUfsn+NdF3DWx4gTTpHjPzyRtJECj4wSpU5PPYfjwv7OHxd8Xan/AMF9vjxrmj+B7vx5qXh+0/s2yhbUUtWtoc8HD5DZ3vyBxtFAH3x8L/8Ago3qVt+0/b/Bn4reDf8AhAfHGs2ZvdEmtrv7fp+qKPvIrgA7kyueedw6Vj/tif8ABaT4afsT/GTRvA/inS/FkmraxKBHMmlvFaBCPvCRuCd2Bj/aFeI/twfAz49ftg/tHfAvxdpXwmk8GXHwz8QC6vbyXWoZzcWrOismE2naFUkgdcr2FcL/AMF/9Mg1L9uX9ju1vbcTRzeJvLuIpclJ082H5W+Y7hkZ/AUAfTHgn/gqp4qvP2p/B/gfxR8H9e8M+HfiFbtdaFq7y+axjXGfPUD92fnQgHqGPpX1R8YPiVY/CvwDqXiDULW+vLXTIyzR2Ni15cN7JEpBbI9CK37vwvp17fW9xNZWk01rxC7xKWh4x8pxkcAfkKnuGwrfL91GAOevHtQB8G/8Elf2ivhD+1F8YvjNrXwt+Hd94OuLTUY49Wv7+AQ3uoSky7sw9UIIbGc/e9qk8c/8F4/BXgD9ra9+FOq+CPGum6jYwSzNNe2giN4ynbEkC5y5kOef4ce4x49/wby20bftLftbMBt/4rE453EZeboTk8YrM+OPh2x1n/g6L8Dw3tvb3kaeEI5xHcRiRTIoJVwDwGGe2PfNAHtHxu/4LC/EL9lXWfCes/FD4F33hj4c+LryOyttXi1dLi4tXkYBPtEYUeVkMCAc7vm6ba+9PDGu2/ibRLXULSVZrW+iSeFx3RhkV+ef/B0LbRj/AIJhXEjLvKeKNLcZ/vCRsHivtv8AZU2/8M4eAyv8Xh6xY/UwgmgD0GiiigAooooAKKKKACiiigAooooAKKKKAEHWlpB1paACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKw/iVI6+A9YWPmR7G428Z5ETEfqB+dblV9S0+PUYtkiqycqykZDAgqQfbBoA/np/ZR/bn+Kn7SXwJ8K/sj/s5fbNH8Qrc6gfGfiiZNiaVbPctlYmyArFfMxkH7vev2C/4J4f8ABNv4Z/8ABOP4YR6N4Ot4X1y+xNrGvXMqyXmrzHl2kfofmLdAOtfMvxT/AODX74U+Kfi/rni/wf48+InwzuvEErS3cHh2/S3icsxYj7m7GSepPXt3w/8AiF50JRt/4aK+PEcYJICa4x60AfqE72c8yySSWrvH/qyGX939DXP/ABU+Hnh34xeAr7wx4js9N1rQtWha3vLS8YOksZ69859+1fm83/Brvobf83HfHzHb/id/45pY/wDg150WE7l/aS+Pit7a11oA8p+LeifET/g3X+Olv4u8FNqHjL9k7xJqAj1PQo5jczeGHlON8fICxZJONpPyck8V6d/wa0+NdP8AiP8ADv8AaE8RaTNHcaX4i+JN5qVm6ZGYpNzLkHocfnSap/war+CfFWm/2fr3x2+N2uaTMNtxaXWr7kkAIPRgR+YNfe/7Fv7C/wAPf2CfhHbeDPh3pK6XpULeZK3Hm3UmMF5COp+gHU0Acb/wVn+NXhf4RfsK/ESDxJq1vpj+ItBvdPsEZWaS6maPARFUEk/MPpkV8of8EBf2rfAvgL/gjlouk69r1npOp+EIdTl1i0nWQS2onu7l04KDO4scAZPHPrX6Z6z4dtdcCC4hhnEZLKJY1kCkjGQGBGaq/wDCEafFE8cOn6bHFMczp9nVVn5z8wGA3PPNAH5R/wDBrr8WNBHh/wCOGgterHrGp+NbjV7W3kikj862dE2yZZAADj8awf2uf2i/COn/APByR8Ktam1hF0nw/oUel31ytvK0dtdM0oWMttw2Q55HTHPWv1707wbY6XN5ltZ2trNjb5sECRNt4+TKgfLwOtMb4e6S9y0zaXprPI29i1rGWLeu7G7PvmgD8rf+DoP9oHwpqHwF+Hfgy21a0vPElr4007WJrGDdI0Nou5WlZgpAG1849RXsH/BSH4c6X/wVE/4JHahp/wALtUtfEWq6RaWuqWAh6yy20ZDRYPO4hj6ZIGO9ffFz4Psby786aztZpNoVWkiVio+pGT+OcdsVYstEh060WGCOOFI+VEaBAD6gAYz+FAHxf+wN/wAFPfhdqf7F/hq48WeKtG8IeIPB2kQ6fruj6pdCG9tZ4ECbRE2GYt5ZxjNeHf8ABE34I+JPjH+2V8fP2ldS0290bQfH189h4c+1RGKaeAOxeUBs/KdseD71+hHif9kn4beNPEH9rax4D8H6tqhfzGurvSIJJWb+8Ts5Pua7zRtHh0OzS3toYbe3iUJHFCgjjQDoAowo/ACgD40+P37FnxE+Dv7TeqfGL4L2+k60viu0+z+MPBN7OLe2187domjcgKsihpD85IJfpxXQW37RXjfXvDA8O2f7LusWE0kgZrHVr/TYNJjYnl/MVjuwf9jJ4r60dc/yqJLPyk2xllGc/fJ/nmgDmtA0q+t/AUEMum2Gm6s9o3+i2f8Ax72shU/KpGBwQBnHavx7/wCCMXx88D/sv/tafH+1+OGtaf4X+JGo+IZpre91olDNZgzHEbMOcZThT/EPUV+1QgZTxz9Tn+dcV40/Zq8B/EfXY9U8QeC/CutahHyLi90uCaXP+8yk+nfsKAPyb8G/tDeHpv8Ag4rj+KNwusaf4F8W+HU0bQ9XutNkW31OWOOJCI2CZK/MOST96k/4K2ftKeCT/wAFqP2Z76PXY203wG6w6xdCKRo7J2lYorkL1YE9OmK/YhvBdk9vbxNbwtHaKqW6iNVW3C/c2BQAm3oNuOPXAw2XwLpc800j6fYySznc7yQLIzN6ksDk/WgD82/+DnH4y+Gr3/gmpHo0OqQ3Gpa/rlhfWMESSObiBHZmkUqhGFDrkH1FfQXh39pnwWP+CUNtr3/CQWP9lr4L+wGf5mP2j7Ns8vZjdnPHSvqa/wDCFjqrxtdWVndNCuyPzYVYRj2BGKd/wiln/ZYshaWa2uQTD5C+WT/uD5f0oA/KX/g3x/ao8DfCH/glh4ks/EHiKx0fUtC1LUrm5tbneskSzFzBwyru37GwF6Y5xkU7/g1l+OXhfT/2fPGfgmXVI4PEl54svdQt7GZHWSW3J2o4JUDlUB+tfqmvgfTUgmi+waeIZiC0aWyquR7Y5/GnW3gvT7S4WWOxs45EJKusCKyZxkAgZA4HSgD4+/4L3fCHWvjl/wAEx/iJo+h2d5qF/GkV+sMCbmZYWLEYGcf1ry/9m7/gqj8Kb3/gmToOl2uux33jKHwq+ht4YtctqSXMcDI25DjCgkZJwAD1r9HZtN8+ORHbfHINroyqVZe6kY5B9647wp+zJ4B8Ca9fapong3wzpGo6kGW6ntNPjje4VvvKxA6HvQB+c/8AwavfEnR7f9kXxT4RmvYbfxNb+Kbu7m09smSKNtgUlsbSeD0PauH/AGevidZfs0f8F8/2g/GHja01bQfBevNJokOv3Fm66elwWiYK0vQA4OD04NfrP4L+FmheALNbbRtE0nS7ePOxLW1SPqcnkDPpU2v/AA40nxVpV1Yalp9jf2N8xkube4to5Y52OPmYMpyRjr70Aflt/wAFbPHmm/8ABTf49fCP4E/DG5t/F1vZ6yuu+J9R02X7TZafbAgKplA27mHmEDnBQ9ad/wAF/wDw3qGg/HX9lq60nRdY1yx8Ka9JdXK2Fq80kNrF9m3MSoIUL71+m3w5+BHhH4QxTp4V8N6J4dW4bc/9nWUUBYnrkhcn8fwxXR3OjRXDq7Rr5io0auVBIVsZHPGDjuKAPhf/AIKEf8FOfhrbfsReIovBviHT/Fni7xppraPo+g2c2/UXupRsIkjAyipkZzjPODXlHh3/AIJL+IZv+CAt58HbhFXxxqVmfEMkBQ+X9rz5qxDHPGMdc81+hml/su/D/RPGDeILHwX4WsdaY7lvLfSrdJkbuwbZnd7nNdtLp5eNRvfcp3byed3rjp+mKAPgT/glD/wUa+H8H7Fvh3w18QPE+m+CPGXw+sF0TWNM1txZzR+R8gdFfmQEKcbQSO/UV7z4d/bP0nxh8FPGHjvWLdPD/gmzWeDTtWuZVI1JNjAOEChvmOMcd69I8Ufst+AfG3iaPWtZ8F+F9W1eNg/26602J7jcO+7bnPrjrgZ6V2U3hm2n037JJHHLalQnkyRq0SgdAEI28fSgD8kf+DXv44eFrDQPih4WutUjtdf17xXd6lYWssUifarcySHcpZQO4PXvX27+0R/wU48M/s6/ts/D/wCC+oaBrV9rXj8bob6FdttbduSwAbqPuk4xzjIr6L0vwTp2jTrLbWNlDMF2744EjJX0O0AY/Cqes/CjQfEXiLT9YvtH0u71XSRizvJbdTNbD/YYcr+HoKAPyT/4ODv2i/BMv7Y37MtlHrKTXXgHxYL3XkSN2+wQ+bbEMSFwc7G5B4211H/By3+0x4D+JH/BPfQ9G0fxJY6jqmva1ZapaW9uxZpLUSHc/AONoYcGv1Pm8E6fdXHmzWdnPJjBeSIOzg5zuLZJz/SnHwbYPDCkljZTLbrsi82FX8teyjjoM0AeHfD79pTwTqH7AGn+Ko9esJvD0PhZYJbsFuJRbBCgQAtnOR+X4fEf/BrN8StFl+EPxQ8Pfa2i1q78X3epw2stvLC0luxIVwHUcYXP41+qCeF7Yac1o0FvJbMu0xNGpj+uzG0fgKj0jwRp+h3DTWtnZ2tww2tLDaxRyOPQlVHFAGsjbhTqjh3bm3Ko6dB1qSgAooooAKKKKACuZ+L/AMPdP+LPw61jwzqiK9hr9nLYSgjPEi475H6V01RzAnH+fxoA/np/Zg+FfgP9j3/gox4m/Zs+Pmi29j4c8aac9hpesGVrW2cIm2Jy24IzFMFjjqqkADIP1B/wTe/ZL+GD+K/H/wAEvH2pahdeMPh/qElxplxaeLporXWNGmINtJFiU8qgwR0Gegr7M/4Kff8ABJb4c/8ABUH4WrpPiq3/ALP8SaepbSdet0UXNnJjHLYJ2ngHHYcV+Rn7UP8AwSE8bfs//D6PTbz4HaprXibwt5Tad4y8F6vPOut28TKBb3sLN5ihwVACuucN0xQB9f8Awf8AC/7Mf7Nn7f3x48P+OJvBVv4ftoNN1vTbjXdQS7heSaLbIqb3PmPwuQQSCBXlnxQ/4KB6D8Rf+Cguna5+zb4D0/x14P8Ag7oV2o1GzWPS9D0/UZV2ySTtsUFY1hBABBJJ57V498K/hxaeHfjfpXi7Rf2N/Fd5rV14IbTLzQ9c0pp7e21pGAhuA8zOdvGQM5HOSflx9Of8E+/+CO/xe8ffDh7H47S6P4K8I65qj65rXhPQ1Ec+tyO25YLkp8oiToFUKSJGyTgUAVf+CAv7Lvjr9o79ov4iftf/ABmjtZPEniy5fTvD8ax7YkhjyjSRL/cI2AMDzg9eMfsAFbLfhisfwB4E034d+FbHR9HsrbTdL023S1srS3jCR2kKjCxqPQe+Tyea2guGzk9MYoA+N/8Aguv+zo37Q/8AwT28XRWULSa54aEWt6e0S7phJA4bCDBOcZ6VxP8AwSQ+DmrfF3/gm5q+seOIVj8TfGBLm4v0uImUpF5YgjjZWywACZwSeWPbgffF5YLeAhmO1htZcKysPQgg1HaaUunW6w2wW3hThUjRVVR6AAdKAPyT/wCDfr4MeNLb42+NNN8XW9xHo/wTuLnQPDYuIyu9ZpmMjgng/Kq4K4AwOtfqd8TfA9v8Sfhtrnh2+RZINYsprRxKNykOrIMjv2P1ra0vw1aaTdSTQW8MMkrF3Mcap5jHqWwBknjrVqe183adzKy9GHUf0oA/IX/ggF8EvF3hT4/fEHQvFkN22ifBe4vNE8PvNEygfapCzMmRg4WEDIxjIrD+Jv7JnibRf+C51/4G0u3nX4ffE+4svFuqN5ZEEhtvmKEgbcM2Mggk+or9jLXQYbG5kmhjjjkmO6RljRTIx6sxAGWPqfShfD9uL6O7aGFr2JBEtyY1M2zk7d2OnPagAig+zLg7THjaVHRUyf6cfQV+Pf7N37OHif4ff8Fv/GfwvFvOvwx/tj/hYbv5TCAzBXWKPd93kyucYzlRz6/sgYfnVtoDLwCPSqNz4ct5717n7Pbm6mUI9x5SiYoDkLuAzj2NAH5G/wDBbX4S+MPBX/BRD4WeNPAsV59s+Jlg3g3VpYYmYwwO8YZnKjGdp6nj2r9BPj/8Tbj9hX9h7Ute0Lw3c+JJvA+ixJa6TZg7pzHEqBVVRnHy5PfJPrXuF34ct7+WKSdI5pIXMkbSRI5jY91JUkEe1Tz2AnLbgGWRdrqwBVx7g8f/AK6APyV/4K96t8QP+Ch3/BH7wB4/0PwfrGm3P9qW2s634eYv5yxDhgYwpYgAuQM+nWu/8ef8FBPBf7W3/BPPV/hr8J/DfijxB4z1nwu2kDQYtBlh+wSiJVffI6hFGQccEnaa/SiDTfs8exPlj27FQABVHoFHFQWvhi1sPM+z28FsJvv+RGsRY+5UA/rQB+WP/BPj4r3XwK/4Ip638O/Efgnx9p/izw3pd5pU2ntoEzPNLIGC+Wy5VxwckAdq7X/g3F8RXHww/YDm8K+IvD/izQdY8N3t3qU8F/o00DSQM+5dgI+ZuD09RX6RHT8up3SfKAABKwA/I8/jTmtGZ2LMzb+qljt/KgD8kf8Agkn4l1Tw9/wV1/aG8Rat4N8eaXovxHuzJo97d+HbuKCTbJk5cx7ccjmnf8FF/GF/f/8ABcT4A+MdP8G/EDUvDPw7thY6vqFt4cupIYpJJpSp3bAGGAckdPxr9aV0/c+ZEgbGNpCYKgdqetmyMxX5N390Yx6/5NAH5O/8HD3i69+K+ufBDTPDPhLx7r9x4R8TQeIdSex8O3EsUFuZImXJwMHCP+Vfpx8Gfizp/wAZfh/aa7pdvqVrBdRg+Tf2rW80TADIZWrqhasgwrFeMDB6fnQlpsYEHbg5xk4NAH5N/tk6ve/sCf8ABdXQfj14j0fWZvh34o8PHQbvVLSzku49Oc7RlkjGec8c/wAJ615h/wAFqf2lZv2uPij8Cdc8E+E/FGqeCfCXiu3vX1YadMGugrRlykRUNtGB19a/a2+0OHVIBFeQw3kStuCToHUH6Yx+dQxeFbWEQ4t4c25JjJjX92T6DGB+AHQUAfAP/BdXwrrn7ZP/AATFg0z4c6BrPiLWNc1ewe106O1ZLkhTliykZULgdc9a2PAv/BUXwf8As+/sf2fhvxNY6xo/xK8M6Gmlf8InNY3DX9zdRxhF8srGVZSSO4x68194GwaTHmM0jKCA2dpH4riqtx4Xt7y9W4lhglkRdqtJGGZfo+N360AfCv8AwQl/ZA8Ufs7fBnxf428fWNxpPiz4qazLrs1hNHtktoHYmNCpJYEhuhNfOP8AwSg8eX3/AAT1+Nfxw1T4seF/EHhPwr8QvF15daVrlxZyTWoKTy/fEaltp8xcfjX7BGxYgfdbaVIJyW4ORyeagfw9DcWbW80ayQnkIwDKDktuwRjOSaAPy28TaFc/8Fav+Cq/w78V+HbPUG+D3wV/0p9YntpLdNYu8g/u/MQZwUAPy9CuMU79oD4fa/8A8E1f+Cvd18fm0LUtU+FfxE037Frl3p9mbhtJn3Kd5CgkDkY4PAb2x+p1jo8OnwNHDGsUbNuKooUEnr0HekvNIiu1KsoeNs5jYbkOfVTwfxoA+ZLf/goBofx58R6PovwYhm8YXl1cxnUtTl06aCy0q2LbmLs6p85IxxkfIeORXxL/AMF0PE2oeNf24v2frzR/CvjrX7f4Y60L3XLvTvD0s1qgLxMPLkX7w4b1xjqa/W638M2tlF5dvbW9rH3WCMRq3rkDjmrJtmDBmaQkdMNgD2wOKAOf8GfEaz+JngK18QaXa6gtreRfaI4bu1aCfGOhVsEH86+VP2Qv+Cp198etZ+NEfij4c+JPCul/C2++yw3QtZJjqaHzQSq45I8sdP7wr7IbT1lX+IsF2hiclfp2FR23h+CyWcQQxwfaSWk8tQu8nGScdScdTQB+S/8AwQV8aXnw/wD2pfjxb+IPCPj3Q4/iN4ibUtFurzw9cx29xCPNYksFO3AZeuM7vY1T+Ivji/1P/g4t8P8AxGh8EfEY+C9L0YaBNq7+GrtbUXA+U4cxgbfev16exMk/mNywOVzzt4xxnp+FK1mzMDx9MkKT6kDigD84/wDg5Xv9Q+JH7Ddr4F8M+GfGHibxDq2t2WoxwaVok91st4XJkLFV4OGGAfQ19k/sM+Nbfx3+yz4JuoLLVtOa20e2sprXUrN7W4hkijCsGRwD1r1KGx8nsu7+8PvHr1P41NDF5WflVfoKAJKKKKACiiigAooooAKKKKACiiigAooooAQdaWkHWloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAIzSbfc0tFAABiiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAIzSbfc0tFABRRRQAUUUUAFFFFABRRRQAFd3r+dQtZRvKHbczL0+Y4/Lv+NTUUAV/wCzo1VlUNhyWPznqcc5z7U5LNFk3bdrdyDyfqamooAAMUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABQRmiigAAxRRRQAUUUUAFFFFABRRRQAUUUUABGaAMUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//Z',
//src:'data:image/png;base64,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',
src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAABVCAYAAABjEfcuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjY4QTkwQTI5NzE5MTFFOEFFODVBQkQzMEI1NDg2QjYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjY4QTkwQTE5NzE5MTFFOEFFODVBQkQzMEI1NDg2QjYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZGQUM3Q0EyOTYzNjExRThCRDBERUQwRUUxQTZEMTkzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZGQUM3Q0EzOTYzNjExRThCRDBERUQwRUUxQTZEMTkzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+auJfQQAAI4RJREFUeNrsfQd8HMXZ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',
    w: 80,
    h: 70
};
