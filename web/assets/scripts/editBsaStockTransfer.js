
var stockData,bData,iData,tcData;
function initial(){
    loadMenu();
    $("#loading").hide();
    
    $("#purchaseDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true
    });
    loadClinics();
    loadItem();
    loadBatchData();
    loadStockData();
    loadData();
}
function loadData(){
    var id=getUrlParameter('pid');
    //alert(id);
    $("#loading").show();
    $.ajax({
        url: 'stBSA',
        async: false,
        type: 'Get',
            data:{type:'viewStockTransfer',id:id},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
            return false;
            }
            //console.log(data);
            data.shift();
$("#selectClinic").val(data[0].branchId).trigger('change.select2');;
$("#reference").val(data[0].reference);
var pdate=data[0].purchaseDate.split("/").reverse().join("-");
$("#purchaseDate").val(pdate);
$("#comment").val(data[0].comment);
            data.shift();
            tcData=data;
             console.log(bData);
             console.log(stockData);
             console.log(iData);
             console.log(tcData);
//            console.log(tcData);
//            console.log(bData);
//            console.log(iData);
            $.each(tcData,function (i,dat){
      var batchId=dat.batchId;
      var batch,item;
             $.each(bData,function (i,bdat){
                 if(bdat.id==batchId){
                     batch=bdat;
                     
                 }   
            });
            $.each(iData,function (i,idat){
       //console.log(batch);
            if(idat.id==batch.itemId){
                item=idat;
                return false;
            } 
             });
            //console.log(batch);item,batch,qty,msu,cp,sp
        addItem(item,batch,dat.quantity,dat.bottle);         
   });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
}
function loadClinics(){
    $("#loading").show();
        $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type: 'getClinics'},
        success: function (data, textStatus, jqXHR) {
           // console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             $('#selectClinic').append($('<option>', {
                    value: "",
                    text: ""
                }));
                
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectClinic').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                
           });    
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function loadItem(){
    $("#loading").show();
      $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type:"getItemDetails"},
        success: function (data, textStatus, jqXHR) {
            
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            
             data.shift();
             //console.log(data);
             iData=data;
         $("#selectItem").empty();
         
   $('#selectItem').append($('<option>', {
                    value: "",
                    text: ""
                }));

                     $("#eselectItem").empty();
         
   $('#eselectItem').append($('<option>', {
                    value: "",
                    text: ""
                }));

         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectItem').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#eselectItem').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
           }); 
           
         
        },
        error: function (jqXHR, textStatus, errorThrown) {
           $(".btn").prop('disabled', false);
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function loadBatchData(){
    $("#loading").show();    
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type: 'getBatchBasic'},
        success: function (data, textStatus, jqXHR) {
           // console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             bData=data;
             $("#selectBatch").empty();
             $('#selectBatch').append($('<option>', {
                    value: "",
                    text: "Select"
                }));
             $("#eselectBatch").empty();
             $('#eselectBatch').append($('<option>', {
                    value: "",
                    text: "Select"
                }));     
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function loadStockData(){
    
    //console.log("dsd");
    $("#loading").show();    
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type: 'getStockDetails'},
        success: function (data, textStatus, jqXHR) {
           // console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             stockData=data;
             $("#selectBottle").empty();
             $('#selectBottle').append($('<option>', {
                    value: "",
                    text: "Select"
                }));
             $("#eselectBottle").empty();
             $('#eselectBottle').append($('<option>', {
                    value: "",
                    text: "Select"
                }));
                  
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function changeItem(){

                
    loadBatch($("#selectItem").val());
}
function loadBatch(itemId){
    //console.log(bData);
    $("#selectBatch").empty();
    var f=false;
    var item;

            $.each(bData, function (i, dat) {
//                console.log(itemId+" "+dat.itemId);
              if(dat.itemId==itemId){
                  f=true;
                  item=dat;
                $('#selectBatch').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                })).trigger('change');
            }
            else if (f==true) {
                return false;
            }
            });
//$("#expiryDate").val(item.expiryDate);
//$("#mrp").val(item.sp);
//loadBottle();
}

function loadBottle(){
    var batchId=$("#selectBatch").val();
//    if(batchId=""){
//        return;
//    }
    $("#selectBottle").empty();
    var f=false;
    
            $.each(stockData, function (i, dat) {
//                console.log(itemId+" "+dat.itemId);
              if(dat.batchId==batchId){
                  f=true;
                   
                $('#selectBottle').append($('<option>', {
                    value: dat.bottle,
                    text: dat.bottle
                })).trigger('change');
            
            }
            else if (f==true) {
                return false;
            }
            });
    
}
function bottleChange(){
    var id=$("#selectBatch").val();
    //var bottle=$( "#selectBottle option:selected" ).text()
    var bottle=$( "#selectBottle").val()
    $("#currentStock").val("");      
    //alert(bottle);
    $.each(stockData, function (i, dat) {
                //console.log(id+" "+bottle+" "+dat.id+" "+dat.bottle);

              if(dat.batchId==id && dat.bottle==bottle){
        $("#currentStock").val(dat.stock);      
        }
            });
}

function changeBatch(){
         
    var batchId=$("#selectBatch").val();
    if(batchId==null){
        return;
    }
//alert(batchId);
    var batch;
    
    $.each(bData, function (i, dat) {
              //  console.log(batchId+" "+dat.batchId);
              if(dat.id==batchId){
              batch=dat;
              return false;
         }
          });
          $("#addMSU").val(batch.msu);
loadBottle();

                
}


function addItem(item,batch,qty,bottle){
    //console.log(batch);
var rowCount = $('#tableItem tr').length;    
var newRow=$("<tr><td></td><td></td><td></td><td></td><td></td><td hidden></td><td width='25px'><button class='removeItem btn btn-block btn-danger remove btn-icon' title='Remove Doctor'><i class='fa fa-trash' aria-hidden='true'></i></button></td</tr>")
newRow.children().eq(0).text(rowCount);
newRow.children().eq(1).text(item.name);
newRow.children().eq(2).text(batch.name);
newRow.children().eq(3).text(bottle);
newRow.children().eq(4).text(qty);
newRow.children().eq(5).text(batch.id);
$("#tableItem").append(newRow);

//$("#selectaddItemName").val("").trigger('change');
//$("#selectaddBatchName").empty().trigger('change');
$("#qty").val("1");
//$("#addmsu").val("");
//$("#addCP").val("");
//$("#addSP").val("");
    //grandTotal();
}
function assignSl(){
     $('#tableItem tr').each(function(index) {
      var t=  $(this).find('td:first');
      //console.log(t.text());
      t.text(index);
    });
}

function validate(){
    if($("#selectClinic").val()==""){
        alert("Select Branch");
        return false;
    }
    if($('#tableItem tr').length==1){
        alert("Add Item");
        
        return false;
    }
    if($("#purchaseDate").val().trim().length!=10){
        alert("Enter Valid Date");
        $("#purchaseDate").focus();
        return false;
    }

    return true;
}
$(function(){
    $("#clear").on('click',function (){
   
   $("#tableItem tbody").empty();
});
$('#tableItem').on('click', '.removeItem', function () {
$(this).closest('tr').remove();
assignSl();

});
   $("#addStock").on('click',function (){
    //alert("asd");
    if(Number($("#qty").val())>Number($("#currentStock").val())){
    alert("Decrease Quantity");
        return false;
    }
    if(Number($("#qty").val())<1){
    alert("Increase Quantity");
        return false;
    }
    //alert($("#itemCode").val());
    if($("#selectItem").val()==""){
        alert("Select Item");
        return false;
    }
    var item,batch;
    $.each(iData,function (i,dat){
        if(dat.id==$("#selectItem").val()){
            item=dat;
            return false;
        }
    });
    
       $.each(bData,function (i,dat){
        if(dat.id==$("#selectBatch").val()){
            batch=dat;
            return false;
        }
    });

    //console.log(item.itemName+" "+batch.batchName);
    addItem(item,batch,$("#qty").val(),$("#selectBottle option:selected").text());
});

$("#buttonSave").on('click',function(){
    $("#buttonSave").prop('disabled', true);
  var val=validate();  
  if(val==false){
      $("#buttonSave").prop('disabled', false);
      return false;
  }
  var branchId=$("#selectClinic").val();
  var purchaseDate=$("#purchaseDate").val();
  var reference=$("#reference").val();
  var comment=$("#comment").val();
  var jsonItem = {
    item: []
};
  $('#tableItem tr').each(function(index) {
         
      var batchId=  $(this).find('td:nth-child(6)').text();
      var qty=$(this).find('td:nth-child(5)').text();
      var bottle=$(this).find('td:nth-child(4)').text();
      var obj={"batchId":batchId,"qty":qty,bottle:bottle};
      jsonItem.item.push(obj);
  });
   jsonItem.item.shift();
  //console.log(jsonItem);
  var pid=getUrlParameter('pid');
    $.ajax({
            url: "stBSA",
            type: 'POST',
            data: {type:"editBsaStockTransfer",purchaseId:pid,branchId:branchId,reference:reference,purchaseDate:purchaseDate,comment:comment,items:JSON.stringify(jsonItem)},
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $("#buttonSave").prop('disabled', false);
                    return false;
                }
                alert("saved");
            
                //console.log(data[0]);
                //window.location="viewSInvoice.jsp?type=1&sid="+data[0].salesId;
                $("#buttonSave").prop('disabled', false);
            },
          error: function (jqXHR, textStatus, errorThrown) {
                alert("Error");
                console.log(textStatus + " " + errorThrown);
                $("#buttonSave").prop('disabled', false);
            }
          
             
  });
 //console.log(jsonItem);
});

});

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