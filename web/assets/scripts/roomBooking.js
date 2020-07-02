var table,bookingId,doctorBranchData,roomData;
function initial(){ loadMenu();
 $("#appointmentStart").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd hh:ii",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
    $("#appointmentStop").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd hh:ii",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
    $("#eappointmentStart").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd hh:ii",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
    $("#eappointmentStop").datetimepicker({
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
    }).datetimepicker("setDate", new Date());;
            $("#toDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    }).datetimepicker("setDate", new Date());;;
    getDoctorBranch();
    loadRoom();
    getPatient();
    loadClinicsAdmin();
     $('#formFilter').trigger('submit');
    loadSelectDoctor();
    loadSelectRoom();
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
                $('#selectBranchNew').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#selectBranchEdit').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                
           });    
         
            $('#selectBranch').trigger('change.select2');
            $('#selectBranchNew').trigger('change.select2');
            $('#selectBranchEdit').trigger('change.select2');
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
        data: {type:"getBranchDoctor"},
        success: function (data, textStatus, jqXHR) {
            
                
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
         $("#selectDoctor").empty();
   $('#selectDoctor').append($('<option>', {
                    value: "",
                    text: ""
                }));
                
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectDoctor').append($('<option>', {
                    value: dat.doctorId,
                    text: dat.doctorName
                }));
                $('#eselectDoctor').append($('<option>', {
                    value: dat.doctorId,
                    text: dat.doctorName
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
function loadSelectDoctor(){
        var bid=$("#selectBranchNew").val();
    $("#selectDoctor").empty();
//    console.log(doctorBranchData);
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
function loadESelectDoctor(){
        var bid=$("#selectBranchEdit").val();
    $("#eselectDoctor").empty();
//    console.log(doctorBranchData);
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
function loadSelectRoom(){
     var bid=$("#selectBranchNew").val();
     $("#selectRoom").empty();
     var flag=0;
    $.each(roomData,function(i,dat){
    
       if(dat.branchId==bid){
           flag=1;
               $('#selectRoom').append($('<option>', {
                    value: dat.id,
                    text: dat.name+"("+dat.type+")"
                }));
       }else{
           if(flag==1)
               return false;
       } 
    });
$("#selectRoom").trigger('change.select2'); 
    
}
function loadESelectRoom(){
     var bid=$("#selectBranchEdit").val();
     $("#eselectRoom").empty();
     var flag=0;
    $.each(roomData,function(i,dat){
    
       if(dat.branchId==bid){
           flag=1;
               $('#eselectRoom').append($('<option>', {
                    value: dat.id,
                    text: dat.name+"("+dat.type+")"
                }));
       }else{
           if(flag==1)
               return false;
       } 
    });
$("#eselectRoom").trigger('change.select2'); 
    
}
function getPatient(){
    $("#loading").show();
      $.ajax({
        url: 'stPatient',
        type: 'GET',
        async: false,
        data: {type:"getUpdatedCfc"},
        success: function (data, textStatus, jqXHR) {
            
                
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
         $("#selectName").empty();
         $("#selectCfc").empty();
   $('#selectName').append($('<option>', {
                    value: "",
                    text: ""
                }));
   $('#selectCfc').append($('<option>', {
                    value: "",
                    text: ""
                }));
            
         $.each(data, function (i, dat) {
                  //alert(dat.id);
//                $('#selectName').append($('<option>', {
//                    value: dat.id,
//                    text: dat.name
//                }));
                
                $('#selectCfc').append($('<option>', {
                    value: dat.id,
                    text: dat.mcfc
                }));
//                $('#eselectName').append($('<option>', {
//                    value: dat.id,
//                    text: dat.name
//                }));
//                
                $('#eselectCfc').append($('<option>', {
                    value: dat.id,
                    text: dat.mcfc
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


function loadRoom(){
        $("#loading").show();
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stRoomMaster',
        type: 'GET',
        async: false,
        data: {type:'getRooms'},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
     
            $(".btn").prop('disabled', false);
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
           return false;
            }
             data.shift();
             roomData=data;
         console.log(roomData);
                    

       
        },
        error: function (jqXHR, textStatus, errorThrown) {
           $(".btn").prop('disabled', false);
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
$(function(){
    $('#selectBranchNew').on('change', function() {
  //alert( this.value );
        loadSelectDoctor();
        loadSelectRoom();
});
  $('#selectBranchEdit').on('change', function() {
  //alert( this.value );
        loadESelectDoctor();
        loadESelectRoom();
});

$("#formNew").unbind('submit').bind('submit', function () {
        event.preventDefault();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stRoomMaster',
        type: 'POST',
        data:$("#formNew").serialize()+"&type=newRoomBooking",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   $("#loading").hide();
            
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
                return false;
            }else if (data[0].status == "2") {
                alert(data[0].errorMessage);
                return false;
            }
            $("#formNew")[0].reset();
            $('#modalNew').modal('toggle');
                alert("Saved");
            $('#formFilter').trigger('submit'); 
                          $("#selectName").val("").trigger('change');
              $("#selectCfc").val("").trigger('change');
            },
             
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});

$("#formEdit").unbind('submit').bind('submit', function () {
        event.preventDefault();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stRoomMaster',
        type: 'POST',
        data:$("#formEdit").serialize()+"&type=editRoomBooking&bookingId="+bookingId,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   $("#loading").hide();
            
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
                return false;
            }else if (data[0].status == "2") {
                alert(data[0].errorMessage);
                return false;
            }
            $("#formEdit")[0].reset();
            $('#modalEdit').modal('toggle');
                alert("Saved");
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
        url: 'stRoomMaster',
        type: 'GET',
            async: false,
        data: $("#formFilter").serialize()+"&type=getRoomBookings",
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
            { "data": "roomName","defaultContent": "",},
            { "data": "patientName","defaultContent": ""},
          
                    { "data": "cfc","defaultContent": ""},
             { "data": "mstartTime","defaultContent": ""},
            { "data": "mstopTime","defaultContent": ""},
                    { "data": "doctorName","defaultContent": ""},
            { "data": "bookedBy","defaultContent": ""},
                    { "data": "comment","defaultContent": ""},
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>"
            },{ "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete btn-icon' title='Delete'><i class='fa fa-trash' aria-hidden='true'></i></button>"
            }
        ],
        "order": [[ 3, "asc" ]],
       
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

$('#tableContent').on('click', '.edit', function () {
     var data = table.row($(this).parents('tr')).data();
//console.log(data);
                //alert(data['cfc']);
                var cfc=data['cfc'].substr(0,data['cfc'].length-2);
                //alert(cfc);
              bookingId = data["id"];
//              $("#eselectName").val(data['patientId']).trigger('change.select2');
var bid;
$.each(roomData, function (i, dat) {
    if(dat.id==data['roomId']){
        bid=dat.branchId;
        return false;
    }
    
});
$("#selectBranchEdit").val(bid).trigger('change');
//loadESelectDoctor();
              $("#eexcfc").val(cfc);
              $("#eselectRoom").val(data['roomId']).trigger('change.select2');
              $("#eselectDoctor").val(data['doctorId']).trigger('change.select2');
              $("#eappointmentStart").val(data['startTime']);
              $("#eappointmentStop").val(data['stopTime']);
              $("#ecomment").val(data['comment']);
              $("#ebuttonCFCSearch").trigger('click');
        $("#modalEdit").modal('show');     
        $("#eselectName").val(data['patientId']).trigger('change.select2');
    });
$('#tableContent').on('click', '.delete', function () {
     var data = table.row($(this).parents('tr')).data();
    bookingId = data["id"];
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stRoomMaster',
        type: 'POST',
            data:{bookingId:bookingId,type:"deleteRoomBooking"},
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
            }
   });
        }        
    });
    $("#buttonCFCSearch").on('click',function(){
        $("#loading").show();
        $("#selectName").empty().trigger('change.select2');
    var find=$("#excfc").val().trim();
    if(find==""){
        alert("Enter CFC");
        $("#excfc").focus();
        return false;
    }
//    $("#formExistingCustomer")[0].reset();
    $("#excfc").val(find);
    $.ajax({
        url: 'stRoomMaster',
        type: 'GET',
            data:{type:"getPatient",cfc:find},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            data.shift();
            if(data[0].found=="0"){
                alert("No Records Found");
                return false;
            }
         $.each(data, function (i, dat) {
                  //alert(dat.id);
                $('#selectName').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
            if(dat.sex=="Female"){
                $('#selectName').val(dat.id);
            }
         });
         $("#selectName").trigger('change.select2');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            alert("Error");
            }
   });
});

$("#ebuttonCFCSearch").on('click',function(){
        $("#loading").show();
        $("#eselectName").empty().trigger('change.select2');;
    var find=$("#eexcfc").val().trim();
    if(find==""){
        alert("Enter CFC");
        $("#eexcfc").focus();
        return false;
    }
//    $("#formExistingCustomer")[0].reset();
    $("#eexcfc").val(find);
    $.ajax({
        url: 'stRoomMaster',
        type: 'GET',
            async: false,
            data:{type:"getPatient",cfc:find},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            data.shift();
            if(data[0].found=="0"){
                alert("No Records Found");
                return false;
            }
         $.each(data, function (i, dat) {
                  //alert(dat.id);
                $('#eselectName').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));

         });
         $("#eselectName").trigger('change.select2');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            alert("Error");
            }
   });
});
});