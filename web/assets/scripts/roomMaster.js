var table,roomId;
function initial(){ loadMenu();
    loadRoom();
}
function loadRoom(){
        $("#loading").show();
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stRoomMaster',
        type: 'GET',
        data: {type:'getRooms'},
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
        "data": data,
         
        "columns": [
            { "data": "name","defaultContent": "",},
            { "data": "type","defaultContent": ""},
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>"
            },{ "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete btn-icon' title='Delete'><i class='fa fa-trash' aria-hidden='true'></i></button>"
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
        $('#modalNewRoom').on('shown.bs.modal', function () {
        
        $("#name").focus();
        
    });
     $('#modalEditRoom').on('shown.bs.modal', function () {
        
        $("#ename").focus();
        
    });

   $("#formNewRoom").unbind('submit').bind('submit', function () {
        event.preventDefault();
            $("#loading").show();
   $(".btn").prop('disabled', true);
   $.ajax({
        url: 'stRoomMaster',
        type: 'POST',
            data:$("#formNewRoom").serialize()+"&type=newRoom",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewRoom")[0].reset();
            $('#modalNewRoom').modal('toggle');
                alert("Room Created");
              loadRoom();
            }
            
            ,
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
}); 

$('#tableContent').on('click', '.edit', function () {
     var data = table.row($(this).parents('tr')).data();

      //alert(data['name']);
              roomId = data["id"];
              $("#ename").val(data['name']);
              $("#eselectRoomType").val(data['rtype']);
              $("#modalEditRoom").modal('show');     
    });
    
    $("#formEditRoom").unbind('submit').bind('submit', function () {
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stRoomMaster',
            
        type: 'POST',
            data:$("#formEditRoom").serialize()+"&type=editRoom&roomId="+roomId,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEditRoom")[0].reset();
            $('#modalEditRoom').modal('toggle');
                alert("Updated");
                loadRoom();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});

 $('#tableContent').on('click', '.delete', function () {
     var data = table.row($(this).parents('tr')).data();
    roomId = data["id"];
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stRoomMaster',
           
        type: 'POST',
            data:{roomId:roomId,type:"deleteRoom"},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
                alert("Deleted");
                    loadRoom();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
        }        
    });
});