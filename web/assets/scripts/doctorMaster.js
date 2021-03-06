var table,editDid;
function initial(){
    loadMenu();
    getDoctor();
    loadClinics();
     $("#dob").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true
    });
        $("#edob").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true
    });
}

    function loadClinics(){
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
                    value: "-1",
                    text: "Select Branch"
                }));
                
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectClinic').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
           });    
           $("#selectClinic").trigger('change');
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
        data: {type:"getAllDoctor"},
        success: function (data, textStatus, jqXHR) {
            
                
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
         console.log(data);
             $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         table= $("#tableContent").DataTable( {
//          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
//    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
//    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                       responsive: true,
        "data": data,
         
        "columns": [
            { "data": "doctorName","defaultContent": "",},
            { "data": "contact","defaultContent": ""},
            { "data": "sex","defaultContent": ""},
            { "data": "fdob","defaultContent": ""},
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger remove btn-icon' title='Remove Doctor'><i class='fa fa-trash' aria-hidden='true'></i></button>"
            },{ "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>"
            }
             
            
        
        ],
        "order": [[ 0, "asc" ]],

 
    } );
    
       
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
   $('#modalEdit').on('shown.bs.modal', function () {
    
        $("#ename").focus();
    });
   $('#modalNew').on('shown.bs.modal', function () {
        
        $("#name").focus();
        
    });
    $("#formNew").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stDoctor',
        type: 'POST',
            data:$("#formNew").serialize()+"&type=newDoctor",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNew")[0].reset();
            $('#modalNew').modal('toggle');
                alert("New Doctor Created");
                getDoctor();
                
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
        url: 'stDoctor',
        type: 'POST',
            data:$("#formEdit").serialize()+"&type=editDoctorAdmin&did="+editDid,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEdit")[0].reset();
            $('#modalEdit').modal('toggle');
                alert("Updated");
                getDoctor();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});
$('#tableContent').on('click', '.remove', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = data["doctorId"];
        
        var c = confirm("This cannot be reversed. Confirm");
        if (c) {
            $(".btn").prop('disabled', true);
            $.ajax({
                url: "stDoctor",
                type: 'POST',
                async: false,
                data: {type: 'deleteDoctor', id: id},
                success: function (data, textStatus, jqXHR) {
                    $(".btn").prop('disabled', false);
                    if (data[0].status == "0") {
                        alert("Error");
                        console.log(data[0].errorMessage);


                        return false;
                    }

                    alert("Removed");
                    // $(this).closest('tr').remove();
                    $("#loading").hide();
                    //table.destroy();
                    getDoctor();
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error");
                    console.log(textStatus + " " + errorThrown);
                    $(".btn").prop('disabled', false);
                }
            });
        }


    });

$('#tableContent').on('click', '.edit', function () {
        var data = table.row($(this).parents('tr')).data();
        
              editDid = data["doctorId"];
        
        $("#ename").val(data['doctorName']);
        $("#edob").val(data['dob']);
        $("#ephoneNumber").val(data['contact']);
        
        if(data['sex']=='Male'){
        $('#eradioMale').prop('checked',true);
           }else if(data['sex']=='Female'){
        $('#eradioFemale').prop('checked',true);
           }else if(data['sex']=='Others'){
        $('#eradioOthers').prop('checked',true);
           }
        
        $("#modalEdit").modal('show');  
        

    });
   
$("#buttonAddDoctor").on('click',function (){
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stDoctor',
        type: 'POST',
            data:$("#formAddDoctor").serialize()+"&type=addDoctorToBranch",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formAddDoctor")[0].reset();
            $('#modalAddDoctor').modal('toggle');
                alert("Doctor Added");
                getDoctor();
                $('#selectDoctor').val("").trigger('change');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});

});
