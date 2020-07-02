var bid,basicData;
function initial(){ loadMenu();
    loadBranch();
}
function loadBranch(){
    $("#loading").show();
    bid=getUrlParameter('bid');
     $.ajax({
        url: 'stBranchMaster',
        type: 'GET',
        data: {type: 'getBranchInfo',bid:bid},
        success: function (data, textStatus, jqXHR) {
            //console.log(data);
            
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
             data.shift();
             basicData=data[0];
             $("#name").text(data[0].name);
             $("#phone").text(data[0].phone);
             $("#address").text(data[0].address);
             $("#type").text(data[0].type);
             $("#cfc").text(data[0].cfc);
             $("#counter").text(data[0].counter);
             $("#invoicePrefix").text(data[0].invoicePrefix);
             $("#receiptPrefix").text(data[0].receiptPrefix);
             $("#invoiceCounter").text(data[0].invoiceCounter);
             $("#receiptCounter").text(data[0].receiptCounter);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });
}

$(function(){
   $("#editInfo").on('click',function(e){
       
      $("#modalEditBranch").modal('show'); 
      $("#ename").val(basicData.name);
      $("#ephone").val(basicData.phone);
      $("#eaddress").val(basicData.address);
      
      if(basicData.branchType=="1"){
          $("#eradioS").prop("checked", true);
            $.uniform.update();
          //alert("1 "+basicData.branchType);
    }else if(basicData.branchType=="0"){
          $("#eradioF").prop("checked", true);
         // alert("0"+basicData.branchType);
          $.uniform.update();
    }
   }); 
   
   $("#editCfc").on('click',function(e){
       
      $("#modalEditCfc").modal('show'); 
      $("#ecfc").val(basicData.cfc);
      $("#ecounter").val(basicData.counter);
      $("#einvoicePrefix").val(basicData.invoicePrefix);
      $("#ereceiptPrefix").val(basicData.receiptPrefix);
      $("#einvoiceCounter").val(basicData.invoiceCounter);
      $("#ereceiptCounter").val(basicData.receiptCounter);
      
   }); 
   
   $('#modalEditBranch').on('shown.bs.modal', function () {
       $("#ename").focus();
   });
      $('#modalEditCfc').on('shown.bs.modal', function () {
       $("#ecfc").focus();
   });
   
    $("#formEditBranch").unbind('submit').bind('submit', function () {
        
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stBranchMaster',
            
        type: 'POST',
            data:$("#formEditBranch").serialize()+"&type=editBranchInfo&bid="+bid,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
            return false;
            }
            $("#formEditBranch")[0].reset();
            $('#modalEditBranch').modal('toggle');
            
                alert("Updated");
                loadBranch();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
});

  $("#formEditCfc").unbind('submit').bind('submit', function () {
        event.preventDefault();
$("#loading").show();
   $(".btn").prop('disabled', true);
   //console.log($("#formNew").serialize());
   $.ajax({
        url: 'stBranchMaster',
            
        type: 'POST',
            data:$("#formEditCfc").serialize()+"&type=editBranchCfc&bid="+bid,
            success: function (data, textStatus, jqXHR) {
                   $(".btn").prop('disabled', false);
                   
            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);
            return false;
            }
            $("#formEditCfc")[0].reset();
            $('#modalEditCfc').modal('toggle');
            
                alert("Updated");
                loadBranch();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".btn").prop('disabled', false);
            }
   });
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