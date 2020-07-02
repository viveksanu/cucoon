var table,itemId;
function initial(){ loadMenu();
                    $("#itemExpiryDate").datetimepicker({
        //format: "dd-mm-yyyy - HH:ii P",
        format: "yyyy-mm-dd",
        minView: 2,
        autoclose: true,
        todayBtn: true,
        useCurrent:true
    }).datetimepicker("setDate", new Date());
 loadClinics(); 
 $('#formFilter').trigger('submit');
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
                    text: "All Branch"
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


$(function(){
    $('input[type=radio][name=iType]').change(function() {
    $("#itemmsu").prop('disabled', false);
    if (this.value == '1') {
        $("#itemmsu").val("1");
        $("#itemmsu").prop('disabled', true);
    }
});
  $("#formFilter").unbind('submit').bind('submit', function () {
    
        event.preventDefault();
               //alert("Asd");
                $("#loading").show();
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stMSA',
        type: 'GET',
        data: $("#formFilter").serialize()+"&type=getViewStock",
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
            { "data": "name","defaultContent": "",},
            { "data": "quantity","defaultContent": "",},
            { "data": "pending","defaultContent": ""},
            
                    
            { "data": null,
             "defaultContent": "<button class='btn btn-block btn-info vieww btn-icon' title='View'><i class='fa fa-eye' aria-hidden='true'></i></button>"
            },
                        { "data": null,
             "defaultContent": "<button class='btn btn-block btn-success edit btn-icon' title='Edit'><i class='fa fa-pencil' aria-hidden='true'></i></button>"
            },
                        { "data": null,
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
    });
    
    $('#tableContent').on('click', '.vieww', function () {
     var data = table.row($(this).parents('tr')).data();
     //console.log(data);
  var id   = data["id"];
  //alert(id);
  window.open("editItem.jsp?iid="+data["id"],'_self');
   });
   
   $('#tableContent').on('click', '.edit', function () {
     var data = table.row($(this).parents('tr')).data();
     //console.log(data);
  itemId = data["id"];
  $("#eitemName").val(data["name"])
  $("#modalEditItem").modal('show');
   });
    
        $('#tableContent').on('click', '.delete', function () {
            var data = table.row($(this).parents('tr')).data();
  itemId = data["id"];      
       var c = confirm("Confirm!You cannot undo this action");
        if (c) {
            $(".btn").prop('disabled',true);
            $("#loading").show();
            $.ajax({
        url: 'stMSA',
           
        type: 'POST',
            data:{id:itemId,type:"deleteItem"},
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $('#formFilter').trigger('submit');
            
},
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                $("#loading").hide();
            }
   });
        }        
    });

    $("#formNewItem").unbind('submit').bind('submit', function () {
        event.preventDefault();

   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stMSA',
        type: 'POST',
            data:$("#formNewItem").serialize()+"&type=newItem",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formNewItem")[0].reset();
            $('#modalNewItem').modal('toggle');
                alert("New Item Created");
    $('#formFilter').trigger('submit');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                alert("Error");
            }
   });
});

$("#formEditItem").unbind('submit').bind('submit', function () {
        event.preventDefault();
//alert("SAd");
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stMSA',
        type: 'POST',
            data:$("#formEditItem").serialize()+"&type=editItem&itemId="+itemId,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            $("#formEditItem")[0].reset();
            $('#modalEditItem').modal('toggle');
                alert("Updated");
    $('#formFilter').trigger('submit');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
                alert("Error");
            }
   });
});
});