var table,cfc;
function initial(){ loadMenu();
    loadClinicsAdmin()
//    loadInitial();
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
function loadInitial(){
             $("#loading").show();
        //$(".btn").prop('disabled', true);
        
        $.ajax({
        url: 'stPatient',
        type: 'GET',
        async: false,
        data:$("#formFilter").serialize()+"&type=getPatientMasterAll",
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
                
if (typeof(table) != "undefined"){
    table.destroy();
    }
            //$(".btn").prop('disabled', false);
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
            { "data": "cfc","defaultContent": "",},
            { "data": "name","defaultContent": ""},
            { "data": "number1","defaultContent": ""},
                    { "data": "number2","defaultContent": ""},
            
             { "data": "email","defaultContent": ""},
            
                    { "data": "address","defaultContent": ""},
{ "data": null,
             "defaultContent": "<button class='btn btn-block btn-success vieww'>View</button>"
            },{ "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete'>Delete</button>"
            }
        
        ],
        
        

 
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
  $('#tableContent').on('click', '.delete', function () {
     var data = table.row($(this).parents('tr')).data();
   var cfc = data["cfc"];
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stPatient',
           
        type: 'POST',
            data:{cfc:cfc,type:"deletePatient"},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert(data[0].errorMessage);
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Deleted");
                   loadInitial();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
        }        
    });
//  $('#tableContent').on('click', '.edit', function () {
//      //alert("ASd");
//     var data = table.row($(this).parents('tr')).data();
//    // console.log(data);
//          cfc = data["cfc"];
//              $("#ename").val(data['name']);
//              $("#econtact1").val(data['number1']);
//              $("#econtact2").val(data['number2']);
//              $("#eaddress").val(data['address']);
//              $("#eemail").val(data['email']);
//        $("#modalEditPatient").modal('show');     
//    });  
    
    

$('#tableContent').on('click', '.vieww', function () {
      //alert("ASd");
     var data = table.row($(this).parents('tr')).data();
    // console.log(data);
          cfc = data["cfc"];
 window.open("patient.jsp?cfc="+cfc,'_self');//add value to session
    });
    
    $("#formFilter").unbind('submit').bind('submit', function () {
        event.preventDefault();
        loadInitial();
});
});