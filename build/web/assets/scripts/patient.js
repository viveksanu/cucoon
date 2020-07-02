var cfcEditSex,cfc,postType,table,tableBranch,maleExist=0,femaleExist=0,basicData;
function initial(){ 
    //alert("ASd")
    loadMenu();
     cfc=getUrlParameter('cfc');
     loadCustomerSource();
getPatientInfo(cfc);    
getPatientInfoBasic(cfc);
    getTreatmentDoctor(cfc);
    getTreatmentFiles(cfc);
    getBranchAccess(cfc);
    loadClinics(cfc);
$("#cfcF").text(cfc+"-F");
$("#cfcM").text(cfc+"-M");
$("#dob").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true
    });
            $("#startDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
    
                $("#dueDate").datetimepicker({
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
    
                $("#edueDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    });
//$(".collapse").trigger('click');
}
$(function(){
    $("#editBasic").on('click',function(){
       $("#bename").val(basicData.name);
              $("#becontact1").val(basicData.number1);
              $("#becontact2").val(basicData.number2);
              $("#beaddress").val(basicData.address);
              $("#beemail").val(basicData.email); 
              $("#beselectSource").val(basicData.sourceId).trigger('change.select2');
       $("#bmodalEditPatient").modal('show'); 
       
    });
    $("#bformEditPatient").unbind('submit').bind('submit', function () {
        
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stPatient',
            
        type: 'POST',
            data:$("#bformEditPatient").serialize()+"&type=editPatientMaster&cfc="+cfc,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
             if(data[0].errorMessage=="-1"){
                 alert("Primary contact already exists!");
             }else{
                    alert("Error");
                console.log(data[0].errorMessage);
                }
                return false;
            }
            $("#bformEditPatient")[0].reset();
            $("#bselectSource").trigger("change.select2");
      $("#bmodalEditPatient").modal('hide');      
                alert("Updated");
                getPatientInfoBasic(cfc);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
});
    
    $('#modalAddInfo').on('shown.bs.modal', function () {
        
    if(postType=="editInfo"){
        if(cfcEditSex=='Female'){
        $("#name").val($("#nameF").text());
        $("#dob").val($("#dobF").text().split("-").reverse().join("-"));
        }else if(cfcEditSex=='Male'){
            
        $("#name").val($("#nameM").text());
        $("#dob").val($("#dobM").text().split("-").reverse().join("-"));
        }
        
    }
        $("#name").focus();
    });
    $('#modalNewTreatment').on('shown.bs.modal', function () {
        $("#treatmentName").focus();
        $("#dueDate").datetimepicker("setDate", new Date());
        $("#startDate").datetimepicker("setDate", new Date());
    });
    $('#modalEditTreatment').on('shown.bs.modal', function () {
        $("#etreatmentName").focus();
        
    });
   $(".cfc").on('click',function(e){
      postType="addInfo";
    //   alert("cfc");
        if($(this).hasClass('male')){
           // alert("male")
            cfcEditSex='Male'
            $("#gender").val("Male");
            if(maleExist==1){
                postType='editInfo'
            }
        }else if($(this).hasClass('female')){
           // alert("female")
           if(femaleExist==1){
                postType='editInfo'
            }
            cfcEditSex='Female'
            $("#gender").val("Female");
        }
        $("#modalAddInfo").modal('show');
   });
   
   $(".ecfc").on('click',function(e){
      postType="editInfo";
        if($(e.target).hasClass('male')){
            cfcEditSex='Male'
            $("#gender").val("Male");
            if(maleExist==0){
                postType='addInfo'
            }
        }else if($(e.target).hasClass('female')){
            cfcEditSex='Female'
            $("#gender").val("Female");
            if(femaleExist==0){
                postType='addInfo'
            }
        }
        $("#modalAddInfo").modal('show');
   });
   $("#formAddInfo").unbind('submit').bind('submit', function () {
        event.preventDefault();
//        if(patientExist==0){
//            postType="addInfo";
//        }
//        alert(postType+" "+patientExist);
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stPatient',
        type: 'POST',
            data:$("#formAddInfo").serialize()+"&type="+postType+"&cfc="+cfc+"&sex="+cfcEditSex,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error!Make sure you have entered data ");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formAddInfo")[0].reset();
            $('#modalAddInfo').modal('toggle');
                alert("Saved");
                getPatientInfo(cfc);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});

$("#formNewTreatment").unbind('submit').bind('submit', function () {
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stPatient',
        type: 'POST',
            data:$("#formNewTreatment").serialize()+"&type=newTreatment&cfc="+cfc,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewTreatment")[0].reset();
            $('#modalNewTreatment').modal('toggle');
            $("#selectDoctor").trigger('change');
            $("#selectPatient").trigger('change');
                alert("Saved");
                getTreatmentFiles(cfc);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});
   $("#formNewBranchAccess").unbind('submit').bind('submit', function () {
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stPatient',
        type: 'POST',
            data:$("#formNewBranchAccess").serialize()+"&type=newBranchAccess&cfc="+cfc,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                if(data[0].errorMessage=='Access Denied'){
                alert("Access Denied");
                    return;
                }
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewBranchAccess")[0].reset();
            $('#modalNewBranchAccess').modal('toggle');
                alert("Saved");
                    getBranchAccess(cfc);
                    loadClinics(cfc);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});
    $('#tableTreatment').on('click', '.edit', function () {
     var data = table.row($(this).parents('tr')).data();

      //alert(data['name']);
              tid = data["id"];
              $("#etreatmentName").val(data['name']);
              $("#eselectDoctor").val(data['doctorId']).trigger('change.select2');
              $("#estartDate").val(data['startDate']);
              $("#edueDate").val(data['dueDate']);
              $("#ecomment").val(data['comment']);
              $("#eselectPatient").val(data['patientId']).trigger('change.select2');
        $("#modalEditTreatment").modal('show');     
    });
    
    $("#formEditTreatment").unbind('submit').bind('submit', function () {
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stPatient',
        type: 'POST',
            data:$("#formEditTreatment").serialize()+"&type=editTreatment&cfc="+cfc+"&tid="+tid,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
                return false;
            }
            $("#formEditTreatment")[0].reset();
            $('#modalEditTreatment').modal('toggle');
                alert("Updated");
                getTreatmentFiles(cfc);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});
$('#tableBranchAccess').on('click', '.delete', function () {
     var data = tableBranch.row($(this).parents('tr')).data();
  var id   = data["id"];
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stPatient',
           
        type: 'POST',
            data:{id:id,type:"deleteBranchAccess"},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Deleted");
                    getBranchAccess(cfc);
                    loadClinics(cfc);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
        }        
    });
$('#tableTreatment').on('click', '.delete', function () {
     var data = table.row($(this).parents('tr')).data();
  var id   = data["id"];
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stPatient',
           
        type: 'POST',
            data:{id:id,type:"deleteTreatmentFile",cfc:cfc},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Deleted");
                    getTreatmentFiles(cfc);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
        }        
    });
    
    $('#tableTreatment').on('click', '.add', function () {
     var data = table.row($(this).parents('tr')).data();
  var id   = data["id"];
  window.open("treatmentFile.jsp?tid="+data["id"],'_self');
   });
   
   $('#tableTreatment').on('click', '.payment', function () {
     var data = table.row($(this).parents('tr')).data();
  var id   = data["id"];
  window.open("addReceipt.jsp?tid="+data["id"],'_self');
   });
});

function getTreatmentFiles(cfc){
   // alert(cfc);
   $("#loading").show();
     $.ajax({
        url: 'stPatient',
        type: 'GET',
        data: {type: 'getTreatmentFiles',cfc:cfc},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
          if (typeof(table) != "undefined"){
    table.destroy();
    }
   $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         table= $("#tableTreatment").DataTable( {
        "data": data,
         
        "columns": [
            { "data": "name","defaultContent": "",},
            { "data": "patientName","defaultContent": "",},
                    { "data": "doctorName","defaultContent": "",},
            { "data": "sDate","defaultContent": ""},
          { "data": "totalAmount","defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )},
          { "data": "pDate","defaultContent": ""},
          { "data": "receivedAmount","defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )},
        { "data": "balanceAmount","defaultContent": "",render: $.fn.dataTable.render.number( '', '.', 2, '' )},
        { "data": "comment","defaultContent": ""},
        { "data": null,
             "defaultContent": "<button class='btn btn-block add btn-icon btn-info' title='View'><i class='fa fa-eye' aria-hidden='true'></i></button>"
            },
        { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></button>"
            },
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success payment btn-icon purple' title='Payment'><i class='fa fa-shopping-cart' aria-hidden='true'></i></button>"
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
function getPatientInfo(cfc){
   // alert(cfc);
   $("#loading").show();
     $.ajax({
        url: 'stPatient',
        type: 'GET',
        async: false,
        data: {type: 'getPatientInfoBasic',cfc:cfc},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
            var flag=true; 
            console.log(data);
            $("#selectPatient").empty();
            $("#eselectPatient").empty();
         $.each(data, function (i, dat) {
             $('#selectPatient').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                 $('#eselectPatient').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
               if(dat.sex=='F'){
                   $("#nameF").text(dat.name);
                   $("#dobF").text(dat.dobf);
                   $('#selectPatient').val(dat.id).trigger('change.select2');
                                femaleExist=1;

               }else if(dat.sex=='M'){
                      maleExist=1;                   
                   
                   $("#nameM").text(dat.name);
                   $("#dobM").text(dat.dobf);
               }
                
           });    
           $('#selectPatient').trigger('change.select2');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function getPatientInfoBasic(cfc){
   // alert(cfc);
   $("#loading").show();
     $.ajax({
        url: 'stPatient',
        type: 'GET',
        async: false,
        data: {type: 'getPatientBasicInfo',cfc:cfc},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             basicData=data[0];
$("#bname").text(data[0].name);
$("#bsource").text(data[0].sourceName);
$("#bprimaryContact").text(data[0].number1);
$("#bsecondaryContact").text(data[0].number2);
$("#baddress").text(data[0].address);
$("#bemail").text(data[0].email);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function getTreatmentDoctor(cfc){
   // alert(cfc);
   $("#loading").show();
     $.ajax({
        url: 'stPatient',
        type: 'GET',
        async: false,
        data: {type: 'getTreatmentDoctor',cfc:cfc},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             //console.log(data);
        $("#selectDoctor").empty();
   $('#selectDoctor').append($('<option>', {
                    value: "",
                    text: "Select Doctor"
                }));
      $('#eselectDoctor').append($('<option>', {
                    value: "",
                    text: ""
                }));          
         $.each(data, function (i, dat) {
               console.log(dat);
                $('#selectDoctor').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
               $('#eselectDoctor').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
           }); 
       $('#selectDoctor').trigger('change.select2');
   },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
    
}
function getBranchAccess(cfc){
   // alert(cfc);
   $("#loading").show();
     $.ajax({
        url: 'stPatient',
        type: 'GET',
        data: {type: 'getPatientBranch',cfc:cfc},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
          if (typeof(tableBranch) != "undefined"){
    tableBranch.destroy();
    }
   $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         tableBranch= $("#tableBranchAccess").DataTable( {
        "data": data,
         
        "columns": [
            { "data": "name","defaultContent": "",},
            { "data": null,
             "defaultContent": "<button class='btn btn-small btn-danger delete btn-icon' title='Delete'><i class='fa fa-trash' aria-hidden='true'></i></button>"
            }
        ],
        "order": [[ 0, "asc" ]],

 
    } );
   
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
    
}

function loadClinics(cfc){
    
        $.ajax({
        url: 'stPatient',
        type: 'GET',
        async: false,
        data: {type: 'getPatientRemainingBranch',cfc:cfc},
        success: function (data, textStatus, jqXHR) {
           // console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
                $("#selectBranch").empty();
         $.each(data, function (i, dat) {
                  //console.log(dat);
                $('#selectBranch').append($('<option>', {
                    value: dat.id,
                    text: dat.name
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

function loadCustomerSource(){
    $("#loading").show();
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type: 'getCustomerCareSource'},
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
                //  console.log(dat);
                $('#beselectSource').append($('<option>', {
                    value: dat.id,
                    text: dat.name
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

