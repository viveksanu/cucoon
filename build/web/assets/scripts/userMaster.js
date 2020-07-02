var table,editDid,userId;
function initial(){
    loadMenu();
    getUsers();
    loadClinics();
     loadUserRole();
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
                    value: "",
                    text: "Select Branch"
                }));
             $('#eselectClinic').append($('<option>', {
                    value: "",
                    text: "Select Branch"
                }));
                
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectClinic').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
                $('#eselectClinic').append($('<option>', {
                    value: dat.clinicId,
                    text: dat.clinicName
                }));
           });    
           $("#selectClinic").trigger('change');
           $("#eselectClinic").trigger('change');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
function loadUserRole(){
        $.ajax({
        url: 'stUserMaster',
        type: 'GET',
        async: false,
        data: {type: 'getUserRoles'},
        success: function (data, textStatus, jqXHR) {
           // console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             $('#selectRole').append($('<option>', {
                    value: "",
                    text: "Select User Role"
                }));
                $('#eselectRole').append($('<option>', {
                    value: "",
                    text: "Select User Role"
                }));
                
         $.each(data, function (i, dat) {
                //  console.log(dat);
                $('#selectRole').append($('<option>', {
                    value: dat.role,
                    text: dat.name
                }));
                $('#eselectRole').append($('<option>', {
                    value: dat.role,
                    text: dat.name
                }));
           });    
           $("#selectRole").trigger('change');
           $("#eselectRole").trigger('change');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}
    
function getUsers(){
    $("#loading").show();
      $.ajax({
        url: 'stUserMaster',
        type: 'GET',
        async: false,
        data: {type:"getUsers"},
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
         //console.log(data[0]);
             $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         table= $("#tableContent").DataTable( {
//          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
//    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
//    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                       responsive: true,
        "data": data,
         
        "columns": [
            { "data": "username","defaultContent": "",},
            { "data": "userrole","defaultContent": "",},
            { "data": "branchName","defaultContent": ""},
          { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>"
            },  { "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger updatePassword btn-icon green-meadow' title='Change Password'><i class='fa fa-wrench' aria-hidden='true'></i></button>"
            },  { "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger remove btn-icon' btn-icon='Remove User' title='Delete'><i class='fa fa-trash' aria-hidden='true'></i></button>"
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
        url: 'stUserMaster',
        type: 'POST',
            data:$("#formNew").serialize()+"&type=newUser",
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
                alert("New User Created");
                $("#selectRole").val("").trigger('change.select2');
                $("#selectClinic").val("").trigger('change.select2');
                getUsers();
                
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
        url: 'stUserMaster',
        type: 'POST',
            data:$("#formEdit").serialize()+"&type=editUser&id="+editDid,
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
                getUsers();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});
$("#formUpdatePassword").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stUserMaster',
        type: 'POST',
            data:$("#formUpdatePassword").serialize()+"&type=updatePassword&id="+userId,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formUpdatePassword")[0].reset();
            $('#modalUpdatePassword').modal('toggle');
                alert("Updated");
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});
$('#tableContent').on('click', '.remove', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = data["id"];
        
        var c = confirm("This cannot be reversed. Confirm");
        if (c) {
            $(".btn").prop('disabled', true);
            $.ajax({
                url: "stUserMaster",
                type: 'POST',
                async: false,
                data: {type: 'deleteUser', id: id},
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
                    getUsers();
                    
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
        
              editDid = data["id"];
        //alert("ASD");
        $("#ename").val(data['username']);
        $("#eselectClinic").val(data['branchId']).trigger('change.select2');
        $("#eselectRole").val(data['userType']).trigger('change.select2');
        
        $("#modalEdit").modal('show');  
        

    });
   
$('#tableContent').on('click', '.updatePassword', function () {
        var data = table.row($(this).parents('tr')).data();
        
              userId = data["id"];
        //alert("ASD");
        
        $("#modalUpdatePassword").modal('show');  
        

    });

});
