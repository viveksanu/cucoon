var table,batchId;
function initial(){ loadMenu();
    loadBatch();
                $("#batchExpiryDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    }).datetimepicker("setDate", new Date());
    
                    $("#ebatchExpiryDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    }).datetimepicker("setDate", new Date());
}
function loadBatch(){
   var itemId=getUrlParameter('iid');
   $("#loading").show();
     $.ajax({
        url: 'stMSA',
        type: 'GET',
        data: {type: 'getBatchDetails',itemId:itemId},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
          if (typeof(table) != "undefined"){
    table.destroy();
    }
    //console.log(data);
   $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         table= $("#tableContent").DataTable( {
        "data": data,
         
        "columns": [
            { "data": "name","defaultContent": ""},
            { "data": "costPrice","defaultContent": "",},
            { "data": "sellingPrice","defaultContent": ""},
          
          { "data": "fdate","defaultContent": ""},
          { "data": "msu","defaultContent": ""},
          { "data": "comment","defaultContent": ""},
          
        { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit'>Edit</button>"
            },
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-danger delete'>Delete</button>"
            }
        ],
        "order": [[ 3, "asc" ]],

 
    } );
   
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
    
}

$(function(){
   $("#formNewBatch").unbind('submit').bind('submit', function () {
        event.preventDefault();
var item=getUrlParameter('iid');
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stMSA',
        type: 'POST',
            data:$("#formNewBatch").serialize()+"&type=newBatch&item="+item,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewBatch")[0].reset();
            $('#modalNewBatch').modal('toggle');
                alert("New Batch Added");
                loadBatch();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                alert("Error");
            }
   });
});

$("#formEditBatch").unbind('submit').bind('submit', function () {
        event.preventDefault();
var item=getUrlParameter('iid');
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stMSA',
        type: 'POST',
            data:$("#formEditBatch").serialize()+"&type=editBatch&item="+item+"&batchId="+batchId,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEditBatch")[0].reset();
            $('#modalEditBatch').modal('toggle');
                alert("Updated");
                loadBatch();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                alert("Error");
            }
   });
});

$('#tableContent').on('click', '.delete', function () {
            var data = table.row($(this).parents('tr')).data();
  var batchId = data["id"];      
  var itemId=getUrlParameter('iid');
       var c = confirm("Confirm!You cannot undo this action");
        if (c) {
            $(".btn").prop('disabled',true);
            $("#loading").show();
            $.ajax({
        url: 'stMSA',
           
        type: 'POST',
            data:{id:batchId,type:"deleteBatch",itemId:itemId,batchId:batchId},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
                    loadBatch();
            
},
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
        }        
    });

$('#tableContent').on('click', '.edit', function () {
     var data = table.row($(this).parents('tr')).data();
     //console.log(data);
  batchId = data["id"];
  $("#ebatchName").val(data["name"]);
  $("#esellingPrice").val(data["sellingPrice"]);
  $("#ecostPrice").val(data["costPrice"]);
  $("#ebatchExpiryDate").val(data["expiryDate"]);
  $("#ecomment").val(data["comment"])
  $("#ebatchmsu").val(data["msu"])
  $("#modalEditBatch").modal('show');
   });

});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};