function loadMenu() {
    $("#loading").show();
    $.ajax({
        url: 'stGetBasics',
        async: false,
        type: 'GET',

        data: {
            type: 'getMenuBar'
        },
        success: function (data, textStatus, jqXHR) {
            // console.log(data);

            $("#loading").hide();
            if (data[0].status == "0") {
                alert("Error");
                console.log(data[0].errorMessage);

                return false;
            }
            data.shift();

            $.each(data, function (i, dat) {

                $(".page-sidebar-menu").append("<li class='nav-item start'> <a class='nav-link' href='" + dat.url + "'> <i class='icon-settings'></i> <span class='title'>" + dat.tag + "</span></a></li>");
            });
            //$("#homePage").attr("href", data[0].home);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error");
            $("#loading").hide();
            console.log(textStatus + " " + errorThrown);
        }
    });


};