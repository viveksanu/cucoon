var table,table2;
function initial(){ loadMenu();
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
    }).datetimepicker("setDate", new Date());;;

$('#formFilter').trigger('submit');
}
$(function(){
 $("#formFilter").unbind('submit').bind('submit', function () {
    
        event.preventDefault();
               //alert("Asd");
                $("#loading").show();
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stMSA',
        type: 'GET',
        data: $("#formFilter").serialize()+"&type=getMSAAllAllocation",
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
            { "data": "fdate","defaultContent": ""},        
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-info vieww btn-icon' title='View'><i class='fa fa-eye' aria-hidden='true'></i></button>"
            },{ "data": null
             
            },{ "data": null,
             
            }
        
        ],
        "order": [[ 0, "asc" ]],
        
columnDefs: [{
        // puts a button in the last column
        targets: [-1], render: function (a, b, data, d) {
            if (data.status == '0') {
                return "<button class='btn btn-block btn-danger delete btn-icon' title='Delete'><i class='fa fa-trash' aria-hidden='true'></i></button>";
            }
            return "<button class='btn btn-block btn-danger disabled btn-icon'><i class='fa fa-trash' aria-hidden='true'></i></button>";
        }
    },{
        // puts a button in the last column
        targets: [-2], render: function (a, b, data, d) {
            if (data.status == '0') {
                return "<button class='btn btn-block btn-success edit btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>";
            }
            return "<button class='btn btn-block btn-success disabled btn-icon'><i class='fa fa-pencil' aria-hidden='true'></i></button>";
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
  
    $('#tableContent').on('click', '.vieww', function () {
     var data = table.row($(this).parents('tr')).data();
      //  $("#loading").show();
            var  id = data["id"];
          //    console.log(data);
          //alert(bookingId);
   
          $("#modalView").modal('show');
          $("#loading").show();
     $.ajax({
        url: 'stMSA',
        async: false,
        type: 'Get',
            data:{type:'viewStockPurchase',id:id,'ttype':-1},
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
            { "data": "brandName","defaultContent": "",},
            { "data": "itemName","defaultContent": "",},
            { "data": "batchName","defaultContent": ""},
            { "data": "msu","defaultContent": ""},
                    { "data": "cp","defaultContent": ""},
            
             { "data": "sp","defaultContent": ""},
            
                    { "data": "expiry","defaultContent": ""},
            { "data": "quantity","defaultContent": ""}
                    
        ],
 
    } );
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
    });
    $('#tableContent').on('click', '.delete', function () {
     var data = table.row($(this).parents('tr')).data();
  var id   = data["id"];
       var c = confirm("Confirm");
        if (c) {
            $(".btn").prop('disabled',true);
            $.ajax({
        url: 'stMSA',
           
        type: 'POST',
            data:{id:id,type:"deletePurchase"},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
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
    
    
$('#tableContent').on( 'click', '.edit', function () {
           var data = table.row( $(this).parents('tr') ).data();
           window.open("editMsa.jsp?pid="+data["id"],'_self');//add value to session
    });

});