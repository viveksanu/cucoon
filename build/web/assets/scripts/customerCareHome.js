var table,excfc;
function initial(){
    loadMenu();
    $("#appointmentDate").datetimepicker({
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
    $("#cfcappointmentDate").datetimepicker({
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
        useCurrent:true,
        todayBtn: true
    }).datetimepicker("setDate", new Date());
    $("#toDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        useCurrent:true,
        todayBtn: true
    }).datetimepicker("setDate", new Date());
    
    $("#excfcappointmentDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd hh:ii",
        showMeridian: true,
        autoclose: true,
        todayBtn: true
    });
    loadClinics();
    loadCustomerSource();
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
             $('#selectSource').append($('<option>', {
                    value: "",
                    text: "Select"
                }));
                $('#eselectSource').append($('<option>', {
                    value: "",
                    text: "Select"
                }));
                ;
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectSource').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
                $('#eselectSource').append($('<option>', {
                    value: dat.id,
                    text: dat.name
                }));
           });    
         $('#selectSource').trigger('change');
                
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
                $('#selectClinicMain').append($('<option>', {
                    value: "",
                    text: ""
                }));
                 $('#eselectClinicMain').append($('<option>', {
                    value: "",
                    text: ""
                }));
                $('#excfcselectClinic').append($('<option>', {
                    value: "",
                    text: ""
                }));
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectClinic').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                 $('#selectClinicMain').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#eselectClinic').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#excfcselectClinic').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
           });    
         
            $('#selectClinic').trigger('change');
                $('#selectClinicMain').trigger('change');
                 $('#eselectClinicMain').trigger('change');
                $('#excfcselectClinic').trigger('change');
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
$(function(){
     $("#formFilter").unbind('submit').bind('submit', function () {
        event.preventDefault(); 
        //alert("SDf");
        $("#loading").show();
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stCustomerCare',
        type: 'GET',
        data: $("#formFilter").serialize()+"&type=getBookings&ttype=1",
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
                       
        "data": data,
         
        "columns": [
            { "data": "branchName","defaultContent": "",},
                    { "data": "bookingDate","defaultContent": "",},
            { "data": "appointment","defaultContent": ""},
            
                    { "data": "cfc","defaultContent": "-"},
            
             { "data": "name","defaultContent": ""},
            
                    { "data": "contact","defaultContent": ""},
            { "data": "bookedBy","defaultContent": ""},
             { "data": "comment","defaultContent": ""},
             { "data": "sourceName","defaultContent": ""},
            { "data": "status","defaultContent": ""},
            { "data": null,
            }
        
        ],columnDefs: [{
        // puts a button in the last column
        targets: [-1], render: function (a, b, data, d) {
            if (data.cfc == "-") {
                return "<button class='btn btn-block btn-success editRefBooking btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>";
            }
            return  "<button class='btn btn-block btn-success editCfcBooking btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i> </button>";
        }
    }],
        "order": [[ 1, "asc" ]],

 
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
    $("#formNewCustomer").unbind('submit').bind('submit', function () {
        event.preventDefault();
            $("#loading").show();
   $(".btn").prop('disabled', true);
   $.ajax({
        url: 'stCustomerCare',
        type: 'POST',
            data:$("#formNewCustomer").serialize()+"&type=newClient",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                if(data[0].errorMessage=="-1"){
                    alert("Contact already exists!Go to existing patient booking")
                return false;
                    }
                    alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewCustomer")[0].reset();
            $('#modalNewCustomer').modal('toggle');
                alert("Booking Completed");
              if($("#selectClinicMain").val()!=""){
                $('#formFilter').trigger('submit');
            }
            $("#selectClinic").val("").trigger('change');
            $("#selectSource").val("").trigger('change');
            }
            
            ,
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            $("#loading").hide();
            alert("Error");
            }
   });
});

$('#tableContent').on('click', '.editRefBooking', function () {
     var data = table.row($(this).parents('tr')).data();
       //console.log(data);
              bookingId = data["bookingId"];
              $("#ecomment").val(data['comment']);
              $("#econtact").val(data['contact']);
              $("#eselectClinic").val(data['branchId']).trigger('change');
              $("#eselectSource").val(data['sourceId']).trigger('change');
              $("#ename").val(data['name']);
              $("#eappointmentDate").val(data['apTime']);
        $("#modalEditRefBooking").modal('show');     
    });
    
     $("#formEditRefBooking").unbind('submit').bind('submit', function () {
        event.preventDefault();
 
            $("#loading").show();
   $(".btn").prop('disabled', true);
   $.ajax({
        url: 'stCustomerCare',
        type: 'POST',
            data:$("#formEditRefBooking").serialize()+"&type=editRefBookingCC&bookingId="+bookingId,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                if(data[0].errorMessage=="-1"){
                    alert("Contact already exists!Go to existing patient booking")
                return false;
                    }
                    alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEditRefBooking")[0].reset();
            $('#modalEditRefBooking').modal('toggle');
                alert("Booking Updated");
                $('#formFilter').trigger('submit');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            alert("Error");
            }
   });
});

    $('#tableContent').on('click', '.editCfcBooking', function () {
     var data = table.row($(this).parents('tr')).data();
       //console.log(data);
              bookingId = data["bookingId"];
              $("#cfcname").val(data['name']);
              $("#cfcbranch").val(data['branch']);
              $("#ecfccomment").val(data['comment']);
              $("#cfcappointmentDate").val(data['apTime']);
        $("#modalEditCfcBooking").modal('show');     
    });
    
    $("#formEditCfcBooking").unbind('submit').bind('submit', function () {
        event.preventDefault();
 
            $("#loading").show();
   $(".btn").prop('disabled', true);
   $.ajax({
        url: 'stCustomerCare',
        type: 'POST',
            data:$("#formEditCfcBooking").serialize()+"&type=editCfcBookingCC&bookingId="+bookingId,
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
                alert("Booking Updated");
                $('#formFilter').trigger('submit');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            alert("Error");
            }
   });
});
$('#modalExistingCustomer').on('shown.bs.modal', function () {
        $("#excfc").focus();
        });
$("#buttonCFCSearch").on('click',function(){
    var find=$("#excfc").val().trim();
    if(find==""){
        alert("Enter CFC");
        $("#excfc").focus();
        return false;
    }
    $("#formExistingCustomer")[0].reset();
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
    $("#formExistingCustomer")[0].reset();
    $("#excfcContact").val(find);
    search("2",find);
});
$("#formExistingCustomer").unbind('submit').bind('submit', function () {
        event.preventDefault();
            $("#loading").show();
   $(".btn").prop('disabled', true);
   
   $.ajax({
        url: 'stCustomerCare',
        type: 'POST',
            data:$("#formExistingCustomer").serialize()+"&type=existingClientCC&cfc="+excfc,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formExistingCustomer")[0].reset();
            $('#modalExistingCustomer').modal('toggle');
                alert("Booking Completed");
                if($("#selectClinicMain").val()!=""){
                $('#formFilter').trigger('submit');
            }
            
            $("#excfcselectClinic").val("").trigger('change');
            },
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
        url: 'stCustomerCare',
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
            $("#excfcname").val(data[0].name);
            
            
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            alert("Error");
            }
   });
   
   
}
