var table;
function initial(){ loadMenu();
 loadData();
}

function loadData(){
         $("#loading").show();
         var itemid=getUrlParameter('id');
         var itemName=getUrlParameter('nm');
         $("#itemHead").text(itemName);
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stBSA',
        type: 'GET',
       data: {type:'bsaViewBatch',itemId:itemid},
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
         console.log(data);
             $.fn.dataTable.moment('DD/MM/YYYY HH:mm');

         table= $("#tableContent").DataTable( {
//          dom: '<"row"<"col-sm-6"Bl><"col-sm-6"f>>' +
//    '<"row"<"col-sm-12"<"table-responsive"tr>>>' +
//    '<"row"<"col-sm-5"i><"col-sm-7"p>>',      
                       //responsive: true,

        "data": data,
     "createdRow": function (row, data, index) {
    var today = new Date();
    var d=data.expiryDate;
    if(typeof d !== "undefined"){
       
        d=d.split("/").reverse().join("-");
        var ex=new Date(d);
        
    if(today>ex){
        
    $('td', row).css('color', 'red');
    }
    }
},         
        "columns": [
            { "data": "name","defaultContent": "",},
            { "data": "quantity","defaultContent": "-",},
            { "data": "msu","defaultContent": ""},        
                    { "data": "expiryDate","defaultContent": ""},
            { "data": "sp","defaultContent": ""},
            
            { "data": "comment","defaultContent": ""},        
{ "data": null,
             "defaultContent": "<button class='btn btn-block btn-success printBarcode btn-icon' title='Print Barcode'><i class='fa fa-wrench' aria-hidden='true'></i></button>"
            }
        
        ],
        "order": [[ 3, "asc" ]],
       

 
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