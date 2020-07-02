var table;
function initial(){ loadMenu();
    loadBranch();
}
function loadBranch(){
    $("#loading").show();
     $.ajax({
        url: 'stBranchMaster',
        type: 'GET',
        data: {type: 'getAllBranch'},
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            
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
    table= $("#tableContent").DataTable( {
//          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
//    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
//    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                       
        "data": data,
         
        "columns": [
            { "data": "name","defaultContent": "",},
            { "data": "cfc","defaultContent": "",},
            { "data": "phone","defaultContent": ""},
            
                    { "data": "type","defaultContent": "-"},
            
          { "data": null,
             "defaultContent": "<button class='btn btn-block btn-info vieww btn-view btn-icon' title='View'><i class='fa fa-eye' aria-hidden='true'></i></button>"
            }
        ],
        "order": [[ 0, "asc" ]],
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
    $("#formNewBranch").unbind('submit').bind('submit', function () {
        
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stBranchMaster',
            
        type: 'POST',
            data:$("#formNewBranch").serialize()+"&type=newBranch",
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
            return false;
            }
            $("#formNewBranch")[0].reset();
            $('#modalNewBranch').modal('toggle');
            
                alert("Saved");
                loadBranch();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});

$('#modalNewBranch').on('shown.bs.modal', function () {
        $("#name").focus();
    });
    $('#tableContent').on( 'click', '.vieww', function () {
           var data = table.row( $(this).parents('tr') ).data();
           window.open("branchInfo.jsp?bid="+data["id"],'_self');//add value to session
    });
});