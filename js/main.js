function news() {
    $.getJSON("https://my.api.mockaroo.com/newsfeed.json?key=0ef48720", function (data) {
        $("#news").empty();
        $.each(data, function (key, value) {
            $("#news").append("<h3 class='storytitle'>" + value.title + "</h3>");
            $("#news").append("<p class='newsstory'>" + value.body + "</p>");
        });
    });
}

$(document).ready(function () {
    news();
});