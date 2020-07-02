var table,table2,pid;
function initial(){ loadMenu();
           
//$('#formFilter').trigger('submit');
loadData();
}
function loadData(){
               //alert("Asd");
                $("#loading").show();
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stBSA',
        type: 'GET',
        data: {type:"getBsaStockTransferPendingBranch"},
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
            { "data": "purchaseDate","defaultContent": "",},
            { "data": "branchName","defaultContent": "",},
            { "data": "reference","defaultContent": ""},
            { "data": "fstatus","defaultContent": ""},
                    
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-info vieww btn-icon' title='View'><i class='fa fa-eye' aria-hidden='true'></i></button>"
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
 
  
    $('#tableContent').on('click', '.vieww', function () {
     var data = table.row($(this).parents('tr')).data();
      //  $("#loading").show();
            var  id = data["id"];
            pid=id;
          //    console.log(data);
          //alert(bookingId);
   
          $("#modalView").modal('show');
          $("#loading").show();
     $.ajax({
        url: 'stBSA',
        async: false,
        type: 'Get',
            data:{type:'viewStockTransferPending',id:id},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
            return false;
            }
 //           console.log(data);
            data.shift();
$("#branchName").val(data[0].branchName);
$("#reference").val(data[0].reference);
$("#purchaseDate").val(data[0].purchaseDate);
$("#comment").val(data[0].comment);
            data.shift();
                
if (typeof(table2) != "undefined"){
    table2.destroy();
    }
            table2= $("#tableItem").DataTable( {
//          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
//    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
//    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                       //responsive: true,
        "data": data,
         
        "columns": [
            { "data": "itemName","defaultContent": "",},
            { "data": "batchName","defaultContent": ""},
            { "data": "bottle","defaultContent": ""},
                    { "data": "quantity","defaultContent": ""}
        ],
 
    } );
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
    });
  
    $("#buttonConfirm").on('click',function(){
        
       var c = confirm("Confirm!You cannot undo this action");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stBSA',
           
        type: 'POST',
            data:{id:pid,type:"confirmBsaStockTransfer"},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            location.reload();
},
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
        }        
    });
    

});