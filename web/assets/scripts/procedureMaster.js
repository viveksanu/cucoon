var table,procedureId;
function initial(){ loadMenu();
    getProcedure();
}
function getProcedure(){
    $("#loading").show();
      $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type:"getProcedureDetails"},
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
//                       
        "data": data,
         
        "columns": [
            { "data": "name","defaultContent": "",},
            { "data": "cost","defaultContent": ""},
            { "data": "description","defaultContent": ""},
             { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>"
            },
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger remove btn-icon' title='Delete Procedure'><i class='fa fa-trash' aria-hidden='true'></i></button>"
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
  
    $('#tableContent').on('click', '.edit', function () {
        var data = table.row($(this).parents('tr')).data();
              procedureId = data["id"];
        $("#ename").val(data['name']);
        $("#edescription").val(data['description']);
        $("#ecost").val(data['cost']);
        $("#modalEdit").modal('show');  
        

    });
    
$("#formNew").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stProcedure',
        type: 'POST',
            data:$("#formNew").serialize()+"&type=newProcedure",
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
                alert("New Procedure Created");
                getProcedure();
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
        url: 'stProcedure',
        type: 'POST',
            data:$("#formEdit").serialize()+"&type=editProcedure&id="+procedureId,
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
                alert("Data Updated");
                getProcedure();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});
    
    $('#tableContent').on('click', '.remove', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = data["id"];
        
        var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled', true);
            $.ajax({
                url: "stProcedure",
                type: 'POST',
                async: false,
                data: {type: 'deleteProcedure', id: id},
                success: function (data, textStatus, jqXHR) {
                    $(".btn").prop('disabled', false);
                    if (data[0].status == "0") {
                        alert("Error");
                        console.log(data[0].errorMessage);


                        return false;
                    }

                    alert("Procedure Removed");
                    // $(this).closest('tr').remove();
                    $("#loading").hide();
                    //table.destroy();
                    getProcedure();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error");
                    console.log(textStatus + " " + errorThrown);
                    $(".btn").prop('disabled', false);
                }
            });
        }
    });
});