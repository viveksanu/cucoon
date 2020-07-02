var procedureData,tableProcedure,pid,bData,stockData,tableStock,sid,discountData,lihData ,tableLih;
function initial(){
    loadMenu();
//    $("#loading").hide();
    $("#startDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
    
    $("#estartDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
    
    $("#startDateI").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
    $("#estartDateI").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
    $("#lihstartDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
    $("#elihstartDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
    getProcedure();
    getLabInvestigationReport();
 //console.log(procedureData);
 getPatient();
    loadItem();
    loadBatchData();
    loadStockData();
    getTreatmentProcedures();
    getTreatmentLih();
    getTreatmentStock();
    getDiscount();
    loadClinicsAdmin();
}

function loadClinicsAdmin(){
//    alert("ASd");
    $("#loading").show();    
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type: 'getClinicsAdmin'},
        success: function (data, textStatus, jqXHR) {
           // console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
//                branchData=data;
         $.each(data, function (i, dat) {
                  //console.log(dat);
                $('#selectBranch').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#eselectBranch').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                 $('#lihselectBranch').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#elihselectBranch').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
           });    
         
            $('#selectBranch').trigger('change.select2');
            $('#lihselectBranch').trigger('change.select2');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function getPatient(){
    $("#loading").show();
    var tid=getUrlParameter('tid');//get value from session
      $.ajax({
        url: 'stTreatmentFile',
        type: 'GET',
        async: false,
        data: {type:"getPatientList",tid:tid},
        success: function (data, textStatus, jqXHR) {
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
               return false;
            }
             data.shift();
//                $('#selectPatient').append($('<option>', {
//                    value: "",
//                    text: ""
//                }));
//                $('#selectPatientI').append($('<option>', {
//                    value: "",
//                    text: ""
//                }));
             $.each(data, function (i, dat) {
//                 console.log(dat);

                $('#selectPatient').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                 $('#eselectPatient').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#selectPatientI').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#eselectPatientI').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#lihselectPatient').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#elihselectPatient').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                if(dat.sex=="Female"){
                    $('#selectPatientI').val(dat.id).trigger('change.select2');
                    $('#selectPatient').val(dat.id).trigger('change.select2');
                    $('#lihselectPatient').val(dat.id).trigger('change.select2');
                }
           });

           $("#selectPatient").trigger('change');
           $("#lihselectPatient").trigger('change');
           $("#selectPatientI").trigger('change');
},
        error: function (jqXHR, textStatus, errorThrown) {
           $(".btn").prop('disabled', false);
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function getDiscount(){
    $("#loading").show();
    //var tid=getUrlParameter('tid');//get value from session
      $.ajax({
        url: 'stTreatmentFile',
        type: 'GET',
        async: false,
        data: {type:"getDiscount"},
        success: function (data, textStatus, jqXHR) {
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
               return false;
            }
             data.shift();
             discountData=data;
//                $('#selectDiscount').append($('<option>', {
//                    value: "0",
//                    text: "0"
//                }));
//                $('#eselectDiscount').append($('<option>', {
//                    value: "0",
//                    text: "0"
//                }));
//                $('#selectDiscountI').append($('<option>', {
//                    value: "0",
//                    text: "0"
//                }));
//                $('#eselectDiscountI').append($('<option>', {
//                    value: "0",
//                    text: "0"
//                }));
//                $('#lihselectDiscount').append($('<option>', {
//                    value: "0",
//                    text: "0"
//                }));
//                $('#elihselectDiscount').append($('<option>', {
//                    value: "0",
//                    text: "0"
//                }));
////                alert(data[0].discount)
//              for(var i=1;i<=Number(data[0].discount);i++){
//                $('#selectDiscount').append($('<option>', {
//                    value: i,
//                    text: i
//                }));
//                $('#eselectDiscount').append($('<option>', {
//                    value: i,
//                    text: i
//                }));
//                $('#selectDiscountI').append($('<option>', {
//                    value: i,
//                    text: i
//                }));
//                $('#eselectDiscountI').append($('<option>', {
//                    value: i,
//                    text: i
//                }));
//                $('#lihselectDiscount').append($('<option>', {
//                    value: i,
//                    text: i
//                }));
//                $('#elihselectDiscount').append($('<option>', {
//                    value: i,
//                    text: i
//                }));
//              }  
             

           $("#selectDiscount").trigger('change');
           $("#lihselectDiscount").trigger('change');
           $("#selectDiscountI").trigger('change');
           
},
        error: function (jqXHR, textStatus, errorThrown) {
           $(".btn").prop('disabled', false);
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function getProcedure(){
    $("#loading").show();
      $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type:"getProcedureDetails"},
        success: function (data, textStatus, jqXHR) {
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
               return false;
            }
             data.shift();
             procedureData=data;
             $('#selectProcedure').append($('<option>', {
                    value: "",
                    text: ""
                }));
             $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectProcedure').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                
                $('#eselectProcedure').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));

                
                 
           });    
           $("#selectProcedure").trigger('change');
},
        error: function (jqXHR, textStatus, errorThrown) {
           $(".btn").prop('disabled', false);
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function getLabInvestigationReport(){
    $("#loading").show();
      $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type:"getLIHDetails"},
        success: function (data, textStatus, jqXHR) {
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
               return false;
            }
             data.shift();
             lihData=data;
             $('#selectLih').append($('<option>', {
                    value: "",
                    text: ""
                }));
             $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectLih').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                
                $('#eselectLih').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));

                
                 
           });    
           $("#selectLih").trigger('change');
},
        error: function (jqXHR, textStatus, errorThrown) {
           $(".btn").prop('disabled', false);
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}


function updateCostProcedure(){
    var procedure={};
    var pid=$("#selectProcedure").val();
    $("#pDescription").text("");
    
 $.each(procedureData, function (i, dat) {
                //  console.log(dat);
               if(dat.id==pid){
                   var c=Number(dat.cost);
                   var p=Number($("#selectDiscount").val());
//                   alert(p);
                   if( $('input[name=discountProcedure]:checked').val()=="amt"){
                   $("#costProcedure").val(c-p);    
                   }else{
                   $("#costProcedure").val(c-((c*p)/100)); 
               }
                              $("#pDescription").text(dat.description);
               } 
           });

   if( $('input[name=free]:checked').val()==1){
       $("#costProcedure").val(0);
       return;
   }
//console.log(procedure);
}
function updateCostEditProcedure(){
    var pid=$("#eselectProcedure").val();
    $("#epDescription").text("");        
    var p=Number($("#selectDiscounte").val());
    $.each(procedureData, function (i, dat) {
                //  console.log(dat);
               if(dat.id==pid){
                var c=Number(dat.cost);
                   
                   if( $('input[name=discountProceduree]:checked').val()=="amt"){
                   $("#ecostProcedure").val(c-p);    
                   }else{
                   $("#ecostProcedure").val(c-((c*p)/100)); 
               }
                   
           $("#epDescription").text(dat.description);        
               } 
           });
           
   if( $('input[name=efree]:checked').val()==1){
       $("#ecostProcedure").val(0);
       return;
   }
                    
}

function updateCostLih(){
    
    var procedure={};
    var pid=$("#selectLih").val();
    $("#lihDescription").text("");
    
 $.each(lihData, function (i, dat) {
                //  console.log(dat);
               if(dat.id==pid){
                   
                var c=Number(dat.cost);
                   var p=Number($("#selectDiscountLih").val());
                   if( $('input[name=discountLih]:checked').val()=="amt"){
                   $("#costLih").val(c-p);    
                   }else{
                   $("#costLih").val(c-((c*p)/100)); 
               }
                //   $("#costLih").val(c-((c*p)/100)); 
                   $("#lihDescription").text(dat.description);
               } 
           });
           
   if( $('input[name=lihfree]:checked').val()==1){
       $("#costLih").val(0);
       return;
   }
//console.log(procedure);

}
function updateCostEditLih(){
    var pid=$("#eselectLih").val();
    $("#elihDescription").text("");        
    $.each(lihData, function (i, dat) {
                //  console.log(dat);
               if(dat.id==pid){
                var c=Number(dat.cost);
                   var p=Number($("#selectDiscountLihe").val());
                      if( $('input[name=discountLihe]:checked').val()=="amt"){
                   $("#ecostLih").val(c-p);    
                   }else{
                   $("#ecostLih").val(c-((c*p)/100)); 
               }
                   //$("#ecostLih").val(c-((c*p)/100));
           $("#elihDescription").text(dat.description);        
               } 
           });
           
   if( $('input[name=elihfree]:checked').val()==1){
       $("#ecostLih").val(0);
       return;
   }
                    
}


function loadItem(){
    $("#loading").show();
      $.ajax({
        url: 'stTreatmentFile',
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

function getTreatmentProcedures(){
   var tid=getUrlParameter('tid');
   $("#loading").show();
     $.ajax({
        url: 'stTreatmentFile',
        type: 'GET',
        async: false,
        data: {type: 'getTreatmentProcedure',tid:tid},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
          if (typeof(tableProcedure) != "undefined"){
    tableProcedure.destroy();
    }
    //console.log(data);
   $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         tableProcedure= $("#tableProcedure").DataTable( {
        "data": data,
         
        "columns": [
            { "data": "fstartDate","defaultContent": ""},
            { "data": "branchName","defaultContent": "",},
                    { "data": "procedureName","defaultContent": "",},
            { "data": "patientName","defaultContent": ""},
          { "data": "netAmount","defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )},
          { "data": "discount","defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )},
          { "data": "type","defaultContent": ""},
        { "data": "comment","defaultContent": ""},
        
        { "data": "createdBy","defaultContent": ""},
       
        { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit'>Edit</button>"
            },
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete'>Delete</button>"
            }
        ],
        "order": [[ 0, "desc" ]],

 
    } );
   
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
    
}

function getTreatmentLih(){
   var tid=getUrlParameter('tid');
   $("#loading").show();
     $.ajax({
        url: 'stTreatmentFile',
        type: 'GET',
        async: false,
        data: {type: 'getTreatmentLih',tid:tid},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
          if (typeof(tableLih) != "undefined"){
    tableLih.destroy();
    }
    //console.log(data);
   $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         tableLih= $("#tableLih").DataTable( {
        "data": data,
         
        "columns": [
            { "data": "fstartDate","defaultContent": ""},
            { "data": "branchName","defaultContent": "",},
                    { "data": "lihName","defaultContent": "",},
            { "data": "patientName","defaultContent": ""},
          { "data": "netAmount","defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )},
          { "data": "discount","defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )},
          { "data": "type","defaultContent": ""},
        { "data": "comment","defaultContent": ""},
        
        { "data": "createdBy","defaultContent": ""},
       
        { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit'>Edit</button>"
            },
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete'>Delete</button>"
            }
        ],
        "order": [[ 0, "desc" ]],

 
    } );
   
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
    
}
function loadBatchData(){
    $("#loading").show();    
    $.ajax({
        url: 'stTreatmentFile',
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
        url: 'stTreatmentFile',
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

                $("#costMedicine").val("");
   
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
function totalMedicineCost(){
    //alert($("#quantity").val()+" "+$("#mrp").val());
    if( $('input[name=freeI]:checked').val()==1){
       $("#costMedicine").val(0);
       return;
   }
   var c=Number(Number($("#quantity").val()*Number($("#mrp").val())));
                   var p=Number($("#selectDiscountStock").val());
                   if( $('input[name=discountStock]:checked').val()=="amt"){
                   $("#costMedicine").val(c-p);    
                   }else{
                   $("#costMedicine").val(c-((c*p)/100)); 
               }
                //   $("#costMedicine").val(c-((c*p)/100));
                   
    //$("#costMedicine").val(Number($("#quantity").val()*Number($("#mrp").val())));
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
          //$("#rpi").val(Number(batch.sp).toFixed(2));
$("#expiryDate").val(batch.expiryDate);
$("#mrp").val(batch.sp);
loadBottle();
    totalMedicineCost();         
                
}


//edit modal functions

function echangeItem(){
 $("#ecostMedicine").val("");
   
    eloadBatch($("#eselectItem").val());
}
function eloadBatch(itemId){
    //console.log(bData);
    $("#eselectBatch").empty();
    var f=false;
    var item;

            $.each(bData, function (i, dat) {
//                console.log(itemId+" "+dat.itemId);
              if(dat.itemId==itemId){
                  f=true;
                  item=dat;
                $('#eselectBatch').append($('<option>', {
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

function eloadBottle(){
    var batchId=$("#eselectBatch").val();
//    if(batchId=""){
//        return;
//    }
    $("#eselectBottle").empty();
    var f=false;
    
            $.each(stockData, function (i, dat) {
//                console.log(itemId+" "+dat.itemId);
              if(dat.batchId==batchId){
                  f=true;
                   
                $('#eselectBottle').append($('<option>', {
                    value: dat.bottle,
                    text: dat.bottle
                })).trigger('change');
            
            }
            else if (f==true) {
                return false;
            }
            });
    
}
function ebottleChange(){
    var id=$("#eselectBatch").val();
    //var bottle=$( "#selectBottle option:selected" ).text()
    var bottle=$( "#eselectBottle").val()
    $("#ecurrentStock").val("");      
    //alert(bottle);
    $.each(stockData, function (i, dat) {
                //console.log(id+" "+bottle+" "+dat.id+" "+dat.bottle);

              if(dat.batchId==id && dat.bottle==bottle){
        $("#ecurrentStock").val(dat.stock);      
        }
            });
}
function etotalMedicineCost(){
    //alert($("#quantity").val()+" "+$("#mrp").val());
    if( $('input[name=efreeI]:checked').val()==1){
       $("#ecostMedicine").val(0);
       return;
   }
    var c=Number(Number($("#equantity").val()*Number($("#emrp").val())));
                   var p=Number($("#selectDiscountStocke").val());
    if( $('input[name=discountStocke]:checked').val()=="amt"){
                   $("#ecostMedicine").val(c-p);    
                   }else{
                   $("#ecostMedicine").val(c-((c*p)/100)); 
               }               
    //$("#ecostMedicine").val(c-((c*p)/100));
  
    //$("#ecostMedicine").val(Number($("#equantity").val()*Number($("#emrp").val())));;
}
function echangeBatch(){
         
    var batchId=$("#eselectBatch").val();
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
          //$("#rpi").val(Number(batch.sp).toFixed(2));
$("#eexpiryDate").val(batch.expiryDate);
$("#emrp").val(batch.sp);
eloadBottle();
    etotalMedicineCost();         
                
}



$(function(){
    $('#modalNewProcedure').on('shown.bs.modal', function () {
    $("#startDate").datetimepicker("setDate", new Date());
        
    });
    $('#modalNewLIH').on('shown.bs.modal', function () {
    $("#lihstartDate").datetimepicker("setDate", new Date());
        
    });
    $('#modalEditLIH').on('shown.bs.modal', function () {
    $("#elihstartDate").datetimepicker("setDate", new Date());
        
    });
    $('#modalNewMedicine').on('shown.bs.modal', function () {
    $("#startDateI").datetimepicker("setDate", new Date());
        
    });
   
    $('#quantity').on('input', function() {
        if(Number($("#quantity").val())>Number($("#currentStock").val())){
            alert("Decrease Quantity");
            
            return;
        }
        
        totalMedicineCost();
});

    $('#equantity').on('input', function() {
        if(Number($("#equantity").val())>Number($("#ecurrentStock").val())){
            alert("Decrease Quantity");
            
            return;
        }
        
        etotalMedicineCost();
});

   $("#selectProcedure").on('change',function(){
       
        updateCostProcedure();
});
$("#eselectProcedure").on('change',function(){
       
        updateCostEditProcedure();
});

$("#selectLih").on('change',function(){
       
        updateCostLih();
});
$("#eselectLih").on('change',function(){
       
        updateCostEditLih();
});
 $('input[type=radio][name=free]').change(function() {
            updateCostProcedure();
});
 
    $('input[type=radio][name=efree]').change(function() {
        
        updateCostEditProcedure();
});

$('input[type=radio][name=freeI]').change(function() {
            totalMedicineCost();
});

$('input[type=radio][name=efreeI]').change(function() {
            etotalMedicineCost();
});

$('input[type=radio][name=lihfree]').change(function() {
            updateCostLih();
});
 
    $('input[type=radio][name=elihfree]').change(function() {
        
        updateCostEditLih();
});

$("#selectDiscount").on('input',function() {
            updateCostProcedure();
});
$("#selectDiscounte").on('input',function() {
            updateCostEditProcedure();
});
$("#selectDiscountLih").on('input',function() {
            updateCostLih();
});
$("#selectDiscountLihe").on('input',function() {
            updateCostEditLih();
});
$("#selectDiscountStock").on('input',function() {
            totalMedicineCost();
});
$("#selectDiscountStocke").on('input',function() {
            etotalMedicineCost();
});
$('input[type=radio][name=discountProcedure]').change(function() {
            updateCostProcedure();
});
$('input[type=radio][name=discountProceduree]').change(function() {
            updateCostEditProcedure();
});

$("#selectDiscountStock").change(function() {
            totalMedicineCost();
});
$('input[type=radio][name=discountStock]').change(function() {
            totalMedicineCost();
});
$('input[type=radio][name=discountStocke]').change(function() {
            etotalMedicineCost();
});

$("#lihselectDiscount").change(function() {
            updateCostLih();
});
$('input[type=radio][name=discountLih]').change(function() {
            updateCostLih();
});
$('input[type=radio][name=discountLihe]').change(function() {
//    alert("sad");       
        updateCostEditLih();
});

$("#formNewProcedure").unbind('submit').bind('submit', function () {
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   var tid=getUrlParameter('tid');
   //console.log($("#formNew").serialize());
   var pid=$("#selectProcedure").val();
    var dFlag=0;
    var p=Number($("#selectDiscount").val());
 $.each(procedureData, function (i, dat) {
                //  console.log(dat);
                
               if(dat.id==pid){
                   var c=Number(dat.cost);
                   
//                   alert(p);
                   if( $('input[name=discountProcedure]:checked').val()=="amt"){
                   p=p/(c/100);
                    
                   }
                   if(p>Number(discountData[0].discount)){
                       
                       dFlag=1;
                       return;
                   }
                              
               } 
           });
   if(dFlag==1){
       alert("Decrease Discount");
       $("#selectDiscount").focus();
       $("#loading").hide();
      $(".btn").prop('disabled', false);
       return false;
   }
   $.ajax({
        url: 'stTreatmentFile',
        type: 'POST',
            data:$("#formNewProcedure").serialize()+"&type=addNewProcedure&tid="+tid+"&discount="+p,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                console.log(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewProcedure")[0].reset();
            $('#modalNewProcedure').modal('toggle');
            $("#selectProcedure").trigger('change');
            $("#selectPatient").trigger('change');
                alert("Saved");
                $("#radioNotFree").prop("checked", true);

                $.uniform.update();
                getTreatmentProcedures();          
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("loading").hide();
                alert("Error");
            }
   });
});

    $('#tableProcedure').on('click', '.edit', function () {
     var data = tableProcedure.row($(this).parents('tr')).data();

      //alert(data['name']);
              tid = getUrlParameter('tid');
              pid=data['id'];
              $("#eselectPatient").val(data['patientId']);
              $("#eselectBranch").val(data['branchId']).trigger('change.select2');
              $("#eselectProcedure").val(data['procedureId']);
              $("#estartDate").val(data['startDate']);
              
//        {   
//            $("#eselectDiscount").empty();
////            alert(discountData);
//        for(var i=0;i<=Number(discountData[0].discount);i++){
//                
//                $('#eselectDiscount').append($('<option>', {
//                    value: i,
//                    text: i
//                }));
//                 
//        }    
//    }
              var discount=data['discount'];
//              if($("#selectDiscount option[value="+discount+"]").length <= 0){
//          $('#eselectDiscount').append($('<option>', {
//                    value: discount,
//                    text: discount
//                })).trigger('change.select2');    
//          }
          
//          $("#eselectDiscount").val(discount).trigger('change.select2');
                $("#selectDiscounte").val(discount);
                
              $("#ecomment").val(data['comment']);
              $("#eselectProcedure").trigger('change');
              $("#eselectPatient").trigger('change');
              if(data["isFree"]=="0"){
                $("#eradioNotFree").prop("checked", true);
                $.uniform.update();  
              }else if(data["isFree"]=="1"){
                $("#eradioFree").prop("checked", true);
                $.uniform.update();  
              }
        updateCostEditProcedure();
        $("#modalEditProcedure").modal('show');     
        
    });
    
    $("#formEditProcedure").unbind('submit').bind('submit', function () {
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   var tid=getUrlParameter('tid');
      var ppid=$("#eselectProcedure").val();
    var dFlag=0;
    var p=Number($("#selectDiscounte").val());
 $.each(procedureData, function (i, dat) {
//                  console.log(dat);
                
               if(dat.id==ppid){
                   var c=Number(dat.cost);
                   
//                   alert(p);
                   if( $('input[name=discountProceduree]:checked').val()=="amt"){
                   p=p/(c/100);
                    
                   }
                   if(p>Number(discountData[0].discount)){
                       
                       dFlag=1;
                       return;
                   }
                              
               } 
           });
   if(dFlag==1){
       alert("Decrease Discount");
       $("#selectDiscounte").focus();
       $("#loading").hide();
      $(".btn").prop('disabled', false);
       return false;
   }
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stTreatmentFile',
        type: 'POST',
            data:$("#formEditProcedure").serialize()+"&type=editProcedure&tid="+tid+"&pid="+pid+"&discount="+p,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEditProcedure")[0].reset();
            $('#modalEditProcedure').modal('toggle');
                alert("Updated");
                getTreatmentProcedures();          
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
               alert("Error");
            }
   });
});

$('#tableProcedure').on('click', '.delete', function () {
     var data = tableProcedure.row($(this).parents('tr')).data();
  var id   = data["id"];
  var tid=getUrlParameter('tid');
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stTreatmentFile',
           
        type: 'POST',
            data:{id:id,type:"deleteTreatmentProcedure",tid:tid},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Deleted");
                    getTreatmentProcedures();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
                alert("Error");
            }
   });
        }        
    });

$("#formNewLih").unbind('submit').bind('submit', function () {
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   var tid=getUrlParameter('tid');
   var pid=$("#selectLih").val();
    var dFlag=0;
    var p=Number($("#selectDiscountLih").val());
 $.each(lihData, function (i, dat) {
                //  console.log(dat);
                
               if(dat.id==pid){
                   var c=Number(dat.cost);
                   
//                   alert("b4 if "+p);
                   if( $('input[name=discountLih]:checked').val()=="amt"){
                   p=p/(c/100);
                //    alert(p);
                   }
//                   alert($('input[name=discountLih]:checked').val());
                   if(p>Number(discountData[0].discount)){
                       
                       dFlag=1;
                       return;
                   }
                              
               } 
           });
   if(dFlag==1){
       alert("Decrease Discount");
       $("#selectDiscountLih").focus();
       $("#loading").hide();
      $(".btn").prop('disabled', false);
       return false;
   }

   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stTreatmentFile',
        type: 'POST',
            data:$("#formNewLih").serialize()+"&type=addNewLih&tid="+tid+"&discount="+p,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                console.log(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewLih")[0].reset();
            $('#modalNewLIH').modal('toggle');
            $("#selectLih").trigger('change');
            $("#lihselectPatient").trigger('change');
                alert("Saved");
                $("#lihradioNotFree").prop("checked", true);

                $.uniform.update();
                getTreatmentLih();          
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("loading").hide();
                alert("Error");
            }
   });
});

$('#tableLih').on('click', '.edit', function () {
     var data = tableLih.row($(this).parents('tr')).data();

      //alert(data['name']);
              tid = getUrlParameter('tid');
              pid=data['id'];
              $("#elihselectPatient").val(data['patientId']);
              $("#elihselectBranch").val(data['branchId']).trigger('change.select2');
              $("#eselectLih").val(data['lihId']);
              $("#elihstartDate").val(data['startDate']);
              
//        {   
//            $("#elihselectDiscount").empty();
////            alert(discountData);
//        for(var i=0;i<=Number(discountData[0].discount);i++){
//                
//                $('#elihselectDiscount').append($('<option>', {
//                    value: i,
//                    text: i
//                }));
//                 
//        }    
//    }
              var discount=data['discount'];
//              if($("#lihselectDiscount option[value="+discount+"]").length <= 0){
//          $('#elihselectDiscount').append($('<option>', {
//                    value: discount,
//                    text: discount
//                })).trigger('change.select2');    
//          }
  $("#selectDiscountLihe").val(discount);        
//          $("#elihselectDiscount").val(discount).trigger('change.select2');
              $("#elihcomment").val(data['comment']);
              $("#eselectLih").trigger('change');
              $("#elihselectPatient").trigger('change');
              if(data["isFree"]=="0"){
                $("#elihradioNotFree").prop("checked", true);
                $.uniform.update();  
              }else if(data["isFree"]=="1"){
                $("#elihradioFree").prop("checked", true);
                $.uniform.update();  
              }
        updateCostEditLih();
        $("#modalEditLih").modal('show');     
        
    });
$("#formEditLih").unbind('submit').bind('submit', function () {
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   var tid=getUrlParameter('tid');
   //console.log($("#formNew").serialize());
   var pidd=$("#eselectLih").val();
    var dFlag=0;
    var p=Number($("#selectDiscountLihe").val());
 $.each(lihData, function (i, dat) {
                //  console.log(dat);
                
               if(dat.id==pidd){
                   var c=Number(dat.cost);
                   
//                   alert("b4 if "+p);
                   if( $('input[name=discountLihe]:checked').val()=="amt"){
                   p=p/(c/100);
                //    alert(p);
                   }
//                   alert($('input[name=discountLih]:checked').val());
                   if(p>Number(discountData[0].discount)){
                       
                       dFlag=1;
                       return;
                   }
                              
               } 
           });
   if(dFlag==1){
       alert("Decrease Discount");
       $("#selectDiscountLihe").focus();
       $("#loading").hide();
      $(".btn").prop('disabled', false);
       return false;
   }

   $.ajax({
        url: 'stTreatmentFile',
        type: 'POST',
            data:$("#formEditLih").serialize()+"&type=editLih&tid="+tid+"&pid="+pid+"&discount="+p,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEditLih")[0].reset();
            $('#modalEditLih').modal('toggle');
                alert("Updated");
                getTreatmentLih();          
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
               alert("Error");
            }
   });
});

$('#tableLih').on('click', '.delete', function () {
     var data = tableLih.row($(this).parents('tr')).data();
  var id   = data["id"];
  var tid=getUrlParameter('tid');
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stTreatmentFile',
           
        type: 'POST',
            data:{id:id,type:"deleteTreatmentLih",tid:tid},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Deleted");
                    getTreatmentLih();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
                alert("Error");
            }
   });
        }        
    });

$("#formNewMedicine").unbind('submit').bind('submit', function () {
        event.preventDefault();
   var tid=getUrlParameter('tid');
   //console.log($("#formNew").serialize());
//   var pid=$("#selectS").val();
    var dFlag=0;
    var c=Number(Number($("#quantity").val()*Number($("#mrp").val())));
    var p=Number($("#selectDiscountStock").val());
    if( $('input[name=discountStock]:checked').val()=="amt"){
                   p=p/(c/100);
                   }
 
   if(p>discountData[0].discount){
       alert("Decrease Discount");
       $("#selectDiscountStock").focus();
       $("#loading").hide();
      $(".btn").prop('disabled', false);
       return false;
   }
   if(Number($("#quantity").val())>Number($("#currentStock").val())){
            alert("Decrease Quantity");
            $("#quantity").focus();
            return false;
        }
        $("#loading").show();
$(".btn").prop('disabled', true);

   $.ajax({
        url: 'stTreatmentFile',
        type: 'POST',
            data:$("#formNewMedicine").serialize()+"&type=addNewMedicine&tid="+tid+"&discount="+p,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewMedicine")[0].reset();
            $('#modalNewMedicine').modal('toggle');
                loadStockData();
                alert("Saved");
                resetMedicineNew();
                getTreatmentStock()();          
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                alert("Error");
            }
   });
});

$("#resetNewMedicine").on('click',function(){
   resetMedicineNew();
});

$("#resetEditMedicine").on('click',function(){
   resetMedicineEdit();
});

$('#tableStock').on('click', '.delete', function () {
     var data = tableStock.row($(this).parents('tr')).data();
  var id   = data["id"];
  var tid=getUrlParameter('tid');
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stTreatmentFile',
           
        type: 'POST',
            data:{id:id,type:"deleteTreatmentStock",tid:tid},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Deleted");
                    getTreatmentStock();
                    loadStockData();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
                alert("Error");
            }
   });
        }        
    });

$('#tableStock').on('click', '.edit', function () {
     var data = tableStock.row($(this).parents('tr')).data();

      //alert(data['batchId']);
              tid = getUrlParameter('tid');
              sid=data['id'];
              $("#estartDateI").val(data['startDate']);
              $("#eselectPatientI").val(data['patientId']).trigger('change');
              $("#eselectItem").val(data['itemId']).trigger('change');
              $("#eselectBatch").val(data['batchId']).trigger('change');
              $("#eselectBottle").val(data['bottle']).trigger('change');
              $("#equantity").val(data['quantity']);
                $("#ecommentI").val(data['comment']);
//$("#eselectDiscountI").val(data['discount']).trigger('change');
$("#selectDiscountStocke").val(data['discount']);
              if(data["isFree"]=="0"){
                $("#eradioNotFreeI").prop("checked", true);
                $.uniform.update();  
        //        $("#ecostMedicine").val(Number(data['amount'])*Number(data['amount']));
                
              }else if(data["isFree"]=="1"){
                $("#eradioFreeI").prop("checked", true);
                $.uniform.update();  
          //      $("#ecostMedicine").val(0);
              }
        etotalMedicineCost();
        $("#modalEditMedicine").modal('show');     
        
    });

$("#formEditMedicine").unbind('submit').bind('submit', function () {
        event.preventDefault();
   var tid=getUrlParameter('tid');
   //console.log($("#formNew").serialize());
//   if(Number($("#quantity").val())>Number($("#currentStock").val())){
//            alert("Decrease Quantity");
//            $("#quantity").focus();
//            return false;
//        }
        $("#loading").show();
$(".btn").prop('disabled', true);
var dFlag=0;
    var c=Number(Number($("#equantity").val()*Number($("#emrp").val())));
    var p=Number($("#selectDiscountStocke").val());
    if( $('input[name=discountStocke]:checked').val()=="amt"){
                   p=p/(c/100);
                   }
 
   if(p>discountData[0].discount){
       alert("Decrease Discount");
       $("#selectDiscountStocke").focus();
       $("#loading").hide();
      $(".btn").prop('disabled', false);
       return false;
   }
   $.ajax({
        url: 'stTreatmentFile',
        type: 'POST',
            data:$("#formEditMedicine").serialize()+"&type=editNewMedicine&tid="+tid+"&sid="+sid+"&discount="+p,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error "+data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEditMedicine")[0].reset();
            $('#modalEditMedicine').modal('toggle');
                loadStockData();
                resetMedicineEdit();
                getTreatmentStock();
                alert("Updated");
          
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                alert("Error");
            }
   });
});

$("#goToPayment").on('click',function(){
   var id   =getUrlParameter('tid')
  window.open("addReceipt.jsp?tid="+id,'_self'); 
});
});

function getTreatmentStock(){
   var tid=getUrlParameter('tid');
   $("#loading").show();
     $.ajax({
        url: 'stTreatmentFile',
        type: 'GET',
        data: {type: 'getTreatmentStock',tid:tid},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
          if (typeof(tableStock) != "undefined"){
    tableStock.destroy();
    }
    //console.log(data);
   $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         tableStock= $("#tableStock").DataTable( {
        "data": data,
         
        "columns": [
            { "data": "fstartDate","defaultContent": ""},
            { "data": "branchName","defaultContent": ""},
                    { "data": "patientName","defaultContent": ""},
            { "data": "itemName","defaultContent": "",},
            { "data": "batchName","defaultContent": "",},
            { "data": "bottle","defaultContent": "",},
            { "data": "quantity","defaultContent": "",},
          { "data": "netAmount","defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )},
          { "data": "discount","defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )},
          { "data": "type","defaultContent": ""},
        { "data": "comment","defaultContent": ""},
        
        { "data": "createdBy","defaultContent": ""},
       
        { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit'>Edit</button>"
            },
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete'>Delete</button>"
            }
        ],
        "order": [[ 0, "desc" ]],

 
    } );
   
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
    
}

function resetMedicineNew(){
    $("#formNewMedicine")[0].reset();
    $("#radioNotFreeI").prop("checked", true);
    $.uniform.update();
    $("#selectPatientI").val("").trigger('change');
    $("#selectItem").val("").trigger('change');
    $("#selectBatch").val("").trigger('change');
    $("#selectBottle").val("").trigger('change');
    $("#quantity").val(1);
                
}
function resetMedicineEdit(){
    $("#formEditMedicine")[0].reset();
    $("#eradioNotFreeI").prop("checked", true);
    $.uniform.update();
    $("#eselectPatientI").val("").trigger('change');
    $("#eselectItem").val("").trigger('change');
    $("#eselectBatch").val("").trigger('change');
    $("#eselectBottle").val("").trigger('change');
    $("#equantity").val(1);
                
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