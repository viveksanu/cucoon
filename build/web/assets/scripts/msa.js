var iData,bData;
function initial(){ loadMenu();

    $("#itemExpiryDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true
    });
    
    $("#purchaseDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true
    });
    
    $("#batchExpiryDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true
    });
    loadItem();
    loadClinics();
    loadBatchData();
    loadBrand();
    
}

function loadBrand(){
    $("#loading").show();
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type: 'getBrandMaster'},
        success: function (data, textStatus, jqXHR) {
             console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             $('#selectBrand').append($('<option>', {
                    value: "",
                    text: "Select"
                }));
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectBrand').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));

           });    
         $('#selectBrand').trigger('change');
                
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
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
         $("#selectItemType").empty();
         $("#selectaddItemName").empty();
   $('#selectItem').append($('<option>', {
                    value: "",
                    text: ""
                }));
   $('#selectItemType').append($('<option>', {
                    value: "",
                    text: ""
                }));         
    
    $('#selectaddItemName').append($('<option>', {
                    value: "",
                    text: ""
                }));
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectItem').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#selectaddItemName').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#selectItemType').append($('<option>', {
                    value: dat.id,
                    text: dat.type
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
             $("#selectaddBatchName").empty();
             $('#selectaddBatchName').append($('<option>', {
                    value: "",
                    text: ""
                }));
                  
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function changeItemName(){
              $("#addCP").val("");
                $("#addSP").val("");
                $("#addMSU").val("");
    
   var item;
   var cur=$("#selectaddItemName");
   var itemCode=cur.val();   
   //alert(itemCode);
   $.each(iData,function (i,dat){
       
      if(dat.id==itemCode){
          item=dat;
          return false;
      } 
   });
   
    loadBatch(item.id);
}


function loadBatch(itemId){
    //console.log(bData);
    $("#selectaddBatchName").empty();
    var f=false;
            $.each(bData, function (i, dat) {
//                console.log(itemId+" "+dat.itemId);
              if(dat.itemId==itemId){
                  f=true;
                $('#selectaddBatchName').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                })).trigger('change');
            }
            else if (f==true) {
                return false;
            }
            });
           
    changeBatch();
}
function changeBatch(){
          $("#addCP").val("");
                $("#addSP").val("");
                $("#addMSU").val("");
    
    var batchId=$("#selectaddBatchName").val();
    var batch;
    
    $.each(bData, function (i, dat) {
              //  console.log(batchId+" "+dat.batchId);
              if(dat.id==batchId){
              batch=dat;
              return false;
         }
          });
          //$("#rpi").val(Number(batch.sp).toFixed(2));
          $("#addCP").val(batch.cp);
                $("#addSP").val(batch.sp);
                $("#addMSU").val(batch.msu);
                
}
function addItem(item,batch,qty){
    //console.log(batch);
var rowCount = $('#tableItem tr').length;    
var newRow=$("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td hidden></td><td hidden></td><td width='25px'><button class='removeItem btn btn-block btn-danger delete btn-icon' title='Delete'><i class='fa fa-trash' aria-hidden='true'></i></button></td</tr>")
newRow.children().eq(0).text(rowCount);
newRow.children().eq(1).text(item.name);
newRow.children().eq(2).text(batch.name);
newRow.children().eq(3).text(batch.msu);
newRow.children().eq(4).text(batch.cp);
newRow.children().eq(5).text(batch.sp);
newRow.children().eq(6).text(qty);
newRow.children().eq(7).text($( "#selectBrand option:selected" ).text());
newRow.children().eq(8).text($( "#selectBrand" ).val());
newRow.children().eq(9).text(batch.id);
$("#tableItem").append(newRow);

//$("#selectaddItemName").val("").trigger('change');
//$("#selectaddBatchName").empty().trigger('change');
$("#qty").val("1");
//$("#addmsu").val("");
//$("#addCP").val("");
//$("#addSP").val("");
    //grandTotal();
}
$(function(){
   $('#modalNewItem').on('shown.bs.modal', function () {
        $("#itemName").focus();
    }); 
    
    $('#modalNewBatch').on('shown.bs.modal', function () {
        $("#batchbatchName").focus();
    });
    
    
    
    $("#formNewItem").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stMSA',
        type: 'POST',
            data:$("#formNewItem").serialize()+"&type=newItem",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewItem")[0].reset();
            $('#modalNewItem').modal('toggle');
                alert("New Item Created");
                loadItem();
                loadBatchData();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                alert("Error");
            }
   });
});

$('#tableItem').on('click', '.removeItem', function () {
$(this).closest('tr').remove();
assignSl();

});

$("#clear").on('click',function (){
   
   $("#tableItem tbody").empty();
});

$("#formNewBatch").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stMSA',
        type: 'POST',
            data:$("#formNewBatch").serialize()+"&type=newBatch",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewBatch")[0].reset();
            $('#modalNewBatch').modal('toggle');
                alert("New Batch Added");
                loadBatchData();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                alert("Error");
            }
   });
});

$('input[type=radio][name=iType]').change(function() {
    $("#itemmsu").prop('disabled', false);
    if (this.value == '1') {
        $("#itemmsu").val("1");
        $("#itemmsu").prop('disabled', true);
    }
});
$("#selectItem").on('change',function(){
    $("#batchmsu").prop('disabled', false);
  $("#selectItemType").val(this.value);
 if($( "#selectItemType option:selected" ).text()=="1"){
     $("#batchmsu").val("1");
        $("#batchmsu").prop('disabled', true);
 }
});

$("#addStock").on('click',function (){
    //alert("asd");
    //alert("Decrease Quantity");
    //alert($("#itemCode").val());
    if($("#selectaddItemName").val()==""){
        alert("Select Item");
        return false;
    }
        if($("#selectBrand").val()==""){
        alert("Select Brand");
        return false;
    }
    var item,batch;
    $.each(iData,function (i,dat){
        if(dat.id==$("#selectaddItemName").val()){
            item=dat;
            return false;
        }
    });
    
       $.each(bData,function (i,dat){
        if(dat.id==$("#selectaddBatchName").val()){
            batch=dat;
            return false;
        }
    });
    //console.log(item.itemName+" "+batch.batchName);
    addItem(item,batch,$("#qty").val());
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
      var brandId=  $(this).find('td:nth-child(9)').text();   
      var batchId=  $(this).find('td:nth-child(10)').text();
      var qty=$(this).find('td:nth-child(7)').text();
      var msu=$(this).find('td:nth-child(4)').text();
      var cp=$(this).find('td:nth-child(5)').text();
      var sp=$(this).find('td:nth-child(6)').text();
      var obj={"batchId":batchId,"qty":qty,msu:msu,cp:cp,sp:sp,brand:brandId};
      jsonItem.item.push(obj);
  });
   jsonItem.item.shift();
  //console.log(jsonItem);
  $.ajax({
            url: "stMSA",
            type: 'POST',
            data: {type:"newStockAllocation",branchId:branchId,reference:reference,purchaseDate:purchaseDate,comment:comment,items:JSON.stringify(jsonItem)},
            success: function (data, textStatus, jqXHR) {
                if (data[0].status == "0") {
                    alert("Error");
                    console.log(data[0].errorMessage);
                    $("#buttonSave").prop('disabled', false);
                    return false;
                }
                alert("saved");
                location.reload();
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
    if($("#reference").val().trim().length<1){
        alert("Enter Reference Number");
        $("#reference").focus();
        return false;
    }
    if($("#purchaseDate").val().trim().length!=10){
        alert("Enter Valid Date");
        $("#purchaseDate").focus();
        return false;
    }

    return true;
}