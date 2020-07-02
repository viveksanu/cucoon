var table,editSid;
function initial(){
    loadMenu();
    loadData();
}
function loadData(){
    $("#loading").show();
    $.ajax({
        url: 'stGetBasics',
        type: 'GET',
        async: false,
        data: {type:"getCustomerCareSource"},
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
            { "data": "name","defaultContent": "",}
            ,{ "data": null,
             "defaultContent": "<button class='btn btn-block btn-success btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>"
            },{ "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete btn-icon' title='Delete'><i class='fa fa-trash' aria-hidden='true'></i></button>"
            }
             
            
        
        ],
        "order": [[0, "asc" ]],

 
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
    
  $("#formNew").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stCustomerCare',
        type: 'POST',
            data:$("#formNew").serialize()+"&type=newSource",
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
                alert("Source Added");
                loadData();
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});  
$('#tableContent').on('click', '.edit', function () {
        var data = table.row($(this).parents('tr')).data();
        
              editSid = data["id"];
        
        $("#ename").val(data['name']);
        
        $("#modalEdit").modal('show');  
    });
    $("#formEdit").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stCustomerCare',
        type: 'POST',
            data:$("#formEdit").serialize()+"&type=editSource&sourceId="+editSid,
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
                loadData();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});
    
    $('#tableContent').on('click', '.delete', function () {
        var data = table.row($(this).parents('tr')).data();
        var id = data["id"];
        
        var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled', true);
            $.ajax({
                url: "stCustomerCare",
                type: 'POST',
                async: false,
                data: {type: 'deleteSource', sourceId: id},
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
                     loadData();   
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