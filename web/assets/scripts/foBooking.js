var table,bookingId,branchData,doctorBranchData,excfc,editcfc;
function initial(){ loadMenu();
 $("#appointmentDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd hh:ii",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
    $("#appointmentDatemnc").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd hh:ii",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
    $("#eappointmentDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd hh:ii",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
        $("#refappointmentDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd hh:ii",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
     $("#exappointmentDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd hh:ii",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
        $("#fromDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    }).datetimepicker("setDate", new Date());
            $("#toDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    }).datetimepicker("setDate", new Date());
    
    getDoctorBranch();
    getExistingCfc();
    loadClinicsAdmin();
    
     $('#formFilter').trigger('submit');
    loadSelectDoctor(); 
    loadCustomerSource();
    loadEXSelectDoctor();
}
function loadClinicsAdmin(){
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
                branchData=data;
         $.each(data, function (i, dat) {
                  //console.log(dat);
                $('#selectBranch').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#selectBranchmnc').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#selectBranchNP').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#selectBranchEP').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#eselectBranchEP').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
           });    
         
            $('#selectBranch').trigger('change.select2');
            $('#selectBranchmnc').trigger('change.select2');
            $('#selectBranchNP').trigger('change.select2');
            $('#eselectBranchEP').trigger('change.select2');
            $('#selectBranchEP').trigger('change.select2');    
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
                $('#selectSourcemnc').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#eselectSourcemnc').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#selectSource').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#eselectSource').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
           });    
         $('#selectSourcemnc').trigger('change');
         $('#selectSource').trigger('change');
                
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function getDoctor(){
    $("#loading").show();
      $.ajax({
        url: 'stDoctor',
        type: 'GET',
        async: false,
        data: {type:"getAllDoctorBasicAdmin"},
        success: function (data, textStatus, jqXHR) {
            
                
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
//         $("#selectDoctor").empty();
//   $('#selectDoctor').append($('<option>', {
//                    value: "",
//                    text: ""
//                }));
//                
//           $('#exselectDoctor').append($('<option>', {
//                    value: "",
//                    text: ""
//                }));
//                           $('#cfcselectDoctor').append($('<option>', {
//                    value: "",
//                    text: ""
//                }));
//                $('#eselectDoctor').append($('<option>', {
//                    value: "",
//                    text: ""
//                }));
//           
//         $.each(data, function (i, dat) {
//                //  console.log(dat);
//                $('#selectDoctor').append($('<option>', {
//                    value: dat.doctorId,
//                    text: dat.doctorName
//                }));
//                 $('#exselectDoctor').append($('<option>', {
//                    value: dat.doctorId,
//                    text: dat.doctorName
//                }));
//                 $('#cfcselectDoctor').append($('<option>', {
//                    value: dat.doctorId,
//                    text: dat.doctorName
//                }));
//                $('#eselectDoctor').append($('<option>', {
//                    value: dat.doctorId,
//                    text: dat.doctorName
//                }));
//           }); 
//           
         doctorData=data;
         console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
           $(".btn").prop('disabled', false);
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function getDoctorBranch(){
    $("#loading").show();
      $.ajax({
        url: 'stDoctor',
        type: 'GET',
        async: false,
        data: {type:"getDoctorBranch"},
        success: function (data, textStatus, jqXHR) {
            
                
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();

         doctorBranchData=data;
         console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
           $(".btn").prop('disabled', false);
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function getExistingCfc(){
     $("#loading").show();
      $.ajax({
        url: 'stFrontOffice',
        type: 'GET',
        async: false,
        data: {type:"getExistingCfc"},
        success: function (data, textStatus, jqXHR) {
            console.log(data);
                
           $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             $("#selectCfc").empty();
             $("#eselectCfc").empty();
   $('#selectCfc').append($('<option>', {
                    value: "",
                    text: ""
                }));
                $('#eselectCfc').append($('<option>', {
                    value: "",
                    text: ""
                }));
                $("#eselectPatient").empty();
                $("#selectPatient").empty();
   $('#selectPatient').append($('<option>', {
                    value: "",
                    text: ""
                })); 
                $('#eselectPatient').append($('<option>', {
                    value: "",
                    text: ""
                })); 
   
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectCfc').append($('<option>', {
                    value: dat.cfc,
                    text: dat.cfc
                }));
                              $('#selectPatient').append($('<option>', {
                    value: dat.cfc,
                    text: dat.name
                }));
                
                $('#eselectCfc').append($('<option>', {
                    value: dat.cfc,
                    text: dat.cfc
                }));
                              $('#eselectPatient').append($('<option>', {
                    value: dat.cfc,
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
function loadcfcselectDoctor(bid){
    
    $("#cfcselectDoctor").empty();
    //console.log(doctorData);
//    alert(bid);
var flag=0;
    $.each(doctorBranchData,function(i,dat){
    
       if(dat.branchId==bid){
           flag=1;
              $('#cfcselectDoctor').append($('<option>', {
                    value: dat.doctorId,
                    text: dat.doctorName
                }));    
       }else{
           if(flag==1)
               return false;
       } 
    });
    $("#cfcselectDoctor").trigger("change.select2");
}
function loadSelectDoctor(){
    var bid=$("#selectBranchNP").val();
    $("#selectDoctor").empty();
    //console.log(doctorData);
//    alert(bid);
var flag=0;
    $.each(doctorBranchData,function(i,dat){
    
       if(dat.branchId==bid){
           flag=1;
              $('#selectDoctor').append($('<option>', {
                    value: dat.doctorId,
                    text: dat.doctorName
                }));    
       }else{
           if(flag==1)
               return false;
       } 
    });
    $("#selectDoctor").trigger("change.select2");
}

function loadEXSelectDoctor(){
    var bid=$("#selectBranchEP").val();
    $("#exselectDoctor").empty();
    //console.log(doctorData);
//    alert(bid);
var flag=0;
    $.each(doctorBranchData,function(i,dat){
    
       if(dat.branchId==bid){
           flag=1;
              $('#exselectDoctor').append($('<option>', {
                    value: dat.doctorId,
                    text: dat.doctorName
                }));    
       }else{
           if(flag==1)
               return false;
       } 
    });
    $("#exselectDoctor").trigger("change.select2");
}
function loadESelectDoctor(){
    var bid=$("#eselectBranchEP").val();
    $("#eselectDoctor").empty();
    //console.log(doctorData);
//    alert(bid);
var flag=0;
    $.each(doctorBranchData,function(i,dat){
    
       if(dat.branchId==bid){
           flag=1;
              $('#eselectDoctor').append($('<option>', {
                    value: dat.doctorId,
                    text: dat.doctorName
                }));    
       }else{
           if(flag==1)
               return false;
       } 
    });
    $("#eselectDoctor").trigger("change.select2");
}
$(function(){
    $('#selectBranchNP').on('change', function() {
  //alert( this.value );
        loadSelectDoctor();
});
 
 $('#selectBranchEP').on('change', function() {
  //alert( this.value );
        loadEXSelectDoctor();
});

$("#buttonCFCSearch").on('click',function(){
    var find=$("#excfc").val().trim();
    if(find==""){
        alert("Enter CFC");
        $("#excfc").focus();
        return false;
    }
    $("#formExistingPatient")[0].reset();
    $("#excfc").val(find);
    search("1",find);
});
$("#buttonContactSearch").on('click',function(){
    var find=$("#excfcContact").val().trim();
    if(find==""){
        alert("Enter Number");
        $("#excfcContact").focus();
        return false;
    }
    $("#formExistingPatient")[0].reset();
    $("#excfcContact").val(find);
    search("2",find);
});



    $('#modalNew').on('shown.bs.modal', function () {
        
        $("#name").focus();
        
    });
    
    $("#formNew").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stFrontOffice',
        type: 'POST',
            data:$("#formNew").serialize()+"&type=newPatientBooking",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
                        if (data[0].status == "0") {
             //   alert(typeof (data[0].errorMessage))
                if(data[0].errorMessage=="-1"){
                    alert("Contact already exists!Go to existing patient booking")
                return false;
                    }
                    alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNew")[0].reset();
            $('#modalNew').modal('toggle');
                alert("Saved");
                  $('#formFilter').trigger('submit');
                  $("#selectDoctor").val("").trigger('change');
},
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});

$('#selectCfc').on('change', function() {
  //alert( this.value );
  $("#selectPatient").val(this.value);
});


$('#selectPatient').on('change', function() {
  //alert( this.value );
  $("#selectCfc").val(this.value);
});

$('#eselectCfc').on('change', function() {
  //alert( this.value );
  $("#eselectPatient").val(this.value);
});


$('#eselectPatient').on('change', function() {
  //alert( this.value );
  $("#eselectCfc").val(this.value);
});
$("#formExistingPatient").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stFrontOffice',
        type: 'POST',
            data:$("#formExistingPatient").serialize()+"&type=existingPatientBooking&cfc="+excfc,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formExistingPatient")[0].reset();
            $('#modalExistingPatient').modal('toggle');
                alert("Saved");
                $("#exselectDoctor").val("").trigger('change');
                $('#formFilter').trigger('submit');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});

$("#formFilter").unbind('submit').bind('submit', function () {
    
        event.preventDefault();
               //alert("Asd");
                $("#loading").show();
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stFrontOffice',
        type: 'GET',
        data: $("#formFilter").serialize()+"&type=getBookings&ttype=2",
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
                
if (typeof(table) != "undefined"){
    table.destroy();
    }
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
         //console.log(data[0]);
             $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         table= $("#tableContent").DataTable( {
//          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
//    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
//    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                       //responsive: true,
        "data": data,
         
        "columns": [
            { "data": "bookingDate","defaultContent": "",},
            { "data": "appointment","defaultContent": ""},
            { "data": "cfc","defaultContent": ""},
                    { "data": "name","defaultContent": ""},
            
             { "data": "doctor","defaultContent": ""},
            
                    { "data": "contact","defaultContent": ""},
            { "data": "bookedBy","defaultContent": ""},
                    { "data": "comment","defaultContent": ""},
            { "data": "status","defaultContent": ""},
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-info viewProfile btn-icon' title='View Profile' style='25px'><i class='fa fa-eye' aria-hidden='true'></i></button>"
            },
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success toggle'>Toggle Status</button>"
            },{ "data": null
             
            },{ "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete btn-icon' title='Delete'><i class='fa fa-trash' aria-hidden='true'></i></button>"
            }
        
        ],
        "order": [[ 1, "asc" ]],
        
columnDefs: [{
        // puts a button in the last column
        targets: [-3], render: function (a, b, data, d) {
            if (data.doctorId == '-1') {
                return "<button class='btn btn-block btn-success generateCfc'>Create CFC</button>";
            }
            return "<button class='btn btn-block btn-success toggle'>Toggle Status</button>";
        }
    },{
        // puts a button in the last column
        targets: [-2], render: function (a, b, data, d) {
            if (data.doctorId == '-1') {
                return "<button class='btn btn-block btn-success editRefBooking btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>";
            }
            return "<button class='btn btn-block btn-success editCfcBooking btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>";
        }
    }],

 
    } );
    
       
        },
        error: function (jqXHR, textStatus, errorThrown) {
           $(".btn").prop('disabled', false);
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
    });
    
    $('#tableContent').on('click', '.generateCfc', function () {
        
     var data = table.row($(this).parents('tr')).data();
        
              bookingId = data["bookingId"];
              $("#cfcName").val(data['name']);
              loadcfcselectDoctor(data['branchId']);
        $("#modalGenerateCfc").modal('show');     
    });
    
    $("#formGenerateCfc").unbind('submit').bind('submit', function () {
        
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stFrontOffice',
            async: false,
        type: 'POST',
            data:$("#formGenerateCfc").serialize()+"&type=generateCfc&bookingId="+bookingId,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
             //   alert(typeof (data[0].errorMessage))
                if(data[0].errorMessage=="-1"){
                    alert("Contact already exists!Change contact number")
                return false;
                    }
                    alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formGenerateCfc")[0].reset();
            $('#modalGenerateCfc').modal('toggle');
            
                alert("Saved");
            $('#formFilter').trigger('submit');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});

$('#tableContent').on('click', '.toggle', function () {
     var data = table.row($(this).parents('tr')).data();
        $("#loading").show();
              bookingId = data["bookingId"];
          //    console.log(data);
     $.ajax({
        url: 'stFrontOffice',
            async: false,
        type: 'POST',
            data:{type:'toggleStatus',bookingId:bookingId},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Updated");
            $('#formFilter').trigger('submit');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
    });
$('#tableContent').on('click', '.editCfcBooking', function () {
     var data = table.row($(this).parents('tr')).data();
bookingId=data['bookingId'];
console.log(data);
      //alert(data['cfc']);
      editcfc=data['cfc'];
              $("#eselectBranchEP").val(data['branchId']).trigger('change.select2');
              $("#ecomment").text(data['comment']);
              $("#eselectCfc").val(data['cfc']);
              $("#eselectPatient").val(data['cfc']);
              $("#eselectDoctor").val(data['doctorId']).trigger('change.select2');
              $("#eappointmentDate").val(data['apTime']);
              loadESelectDoctor();
             $("#modalEditCfcBooking").modal('show');     
    });
    
    $("#formEditCfcBooking").unbind('submit').bind('submit', function () {
        
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stFrontOffice',
            async: false,
        type: 'POST',
            data:$("#formEditCfcBooking").serialize()+"&type=editCfcBooking&bookingId="+bookingId,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEditCfcBooking")[0].reset();
            $('#modalEditCfcBooking').modal('toggle');
            
                alert("Updated");
            $('#formFilter').trigger('submit');
//$("#eselectPatient").val("").trigger('change');
//$("#eselectCfc").val("").trigger('change');
//$("#eselectDoctor").val("").trigger('change');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
});

$('#tableContent').on('click', '.editRefBooking', function () {
     var data = table.row($(this).parents('tr')).data();
//alert(data['contact']);

      //alert(data['cfc']);
              bookingId = data["bookingId"];
              $("#refcomment").text(data['comment']);
              $("#refcontact").val(data['contact']);
              $("#eselectSourcemnc").val(data['sourceId']).trigger('change.select2');
              $("#refappointmentDate").val(data['apTime']);
        $("#modalEditRefBooking").modal('show');     
    });
    $('#tableContent').on('click', '.delete', function () {
     var data = table.row($(this).parents('tr')).data();
    bookingId = data["bookingId"];
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stFrontOffice',
           
        type: 'POST',
            data:{bookingId:bookingId,type:"deleteBooking"},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Deleted");
            $('#formFilter').trigger('submit');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
        }        
    });
$("#formEditRefBooking").unbind('submit').bind('submit', function () {
        
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stFrontOffice',
            async: false,
        type: 'POST',
            data:$("#formEditRefBooking").serialize()+"&type=editRefBooking&bookingId="+bookingId,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEditRefBooking")[0].reset();
            $('#modalEditRefBooking').modal('toggle');
                alert("Updated");
            $('#formFilter').trigger('submit');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
});

$('#tableContent').on('click', '.viewProfile', function () {
      //alert("ASd");
     var data = table.row($(this).parents('tr')).data();
    // console.log(data);
          cfc = data["cfc"];
 window.open("patient.jsp?cfc="+cfc,'_self');//add value to session
    });


 $("#formNewCustomermnc").unbind('submit').bind('submit', function () {
        event.preventDefault();
            $("#loading").show();
   $(".btn").prop('disabled', true);
   $.ajax({
        url: 'stCustomerCare',
        type: 'POST',
            data:$("#formNewCustomermnc").serialize()+"&type=newClient",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
           // console.log(data);
            if (data[0].status == "0") {
               // alert(typeof (data[0].errorMessage))
                if(data[0].errorMessage=="-1"){
                    alert("Contact already exists!Go to existing patient booking")
                return false;
                    }
                    alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewCustomermnc")[0].reset();
            $('#modalNewCustomer').modal('toggle');
            $("#selectSourcemnc").val("").trigger('change.select2');    
            $('#formFilter').trigger('submit');
                alert("Booking Completed");
//              if($("#selectClinicMain").val()!=""){
//                $('#formFilter').trigger('submit');
//            }
//            $("#selectClinic").val("").trigger('change');
            }
            
            ,
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            $("#loading").hide();
            alert("Error");
            }
   });
});

});
function search(type,find){
    $("#loading").show();
     $(".btn").prop('disabled', true);
     
   $.ajax({
        url: 'stFrontOffice',
        type: 'GET',
            data:{type:"getPatient",ttype:type,keyword:find},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            data.shift();
            var f=data.pop();
            if(f.found=="0"){
                alert("No Records Found");
                return false;
            }
            $("#excfc").val(data[0].cfc);
            excfc=data[0].cfc;
            $("#excfcContact").val(data[0].contact);
            $("#excfcName").val(data[0].name);
            console.log(data);
            
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            alert("Error");
            }
   });
   
   
}