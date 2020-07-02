var table,expiredItem,boxContents="",expiredFlag=0;
function initial(){ loadMenu();
 expiredAlert();
    loadData();
    if(expiredFlag==1)
    UIToastr.init();       
}

function loadData(){
         $("#loading").show();
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stBSA',
        type: 'GET',
        async: false,
        data: {type:'bsaViewStock'},
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
         "createdRow": function (row, data, index) {

$.each(expiredItem,function (i,dat){
    if(data.id==dat.id){
    $('td', row).css('color', 'red');
    }
});},
        "columns": [
            
            { "data": "name","defaultContent": "",},
            { "data": "quantity","defaultContent": "",},
            { "data": "pending","defaultContent": ""},
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

function expiredAlert(){
                $("#loading").show();
        $(".btn").prop('disabled', true);
        $.ajax({
        url: 'stBSA',
        type: 'GET',
        async: false,
        data: {type:"getExpiredStock"},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
$(".btn").prop('disabled', false);
            $("#loading").hide();

                        if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
expiredItem=data;
$.each(expiredItem,function (i,dat){
    expiredFlag=1;
    boxContents=boxContents.concat(dat.name+"<br>");
});

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
             "defaultContent": "<button class='btn btn-block btn-success track'>Track</button>"
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
    
    $('#tableContent').on( 'click', '.vieww', function () {
           var data = table.row( $(this).parents('tr') ).data();
           window.open("bsaViewBatch.jsp?id="+data["id"]+"&nm="+data["name"],'_self');//add value to session
    });

    
 
});

var UIToastr=function(){
    return{init:function(){
            var t,o=-1,e=0;
            
                var o="info",a=boxContents,i="Expired Item",s=1000,r=1000,l=5000,c=1000,v=e++;toastr.options={closeButton:true,positionClass:"toast-top-right",onclick:null,"showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"},1000,1000,5000,1000;var m=toastr[o](a,i);
        }    }}();