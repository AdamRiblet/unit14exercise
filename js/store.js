var items = [], subtotal = 0, listing = [], cart = [];

function shop() {
    var i, j;
    for (i = 0; i < cart.length; i += 1) {
        $("#cartcontents").empty();
        for (j = 0; j < cart.length; j += 1) {
            $("#cartcontents").append("<img class=thumb img-rounded src='" + cart[j].image + "' />");
            $("#cartcontents").append("<h3 class=carttitle>" + cart[j].title + "</h3><a href='#' onclick='cartremove(" + j + ")'><span class='glyphicon glyphicon-remove'></span></a><br />");
        }
        $("#cartcontents").append("<h2 class=subtotal>$" + subtotal.toFixed(2) + "</h2>");
    }
}

function cartadd(id, title, cost, image) {
    items.push(id);
    subtotal = cost + subtotal;
    listing.push(title);
    var purchase = {id: id, title: title, cost: cost, image: image};
    cart.push(purchase);
    shop();
    $("#orderlist").val(listing.toString());
    console.log(listing.toString());
    $("#sub").val(subtotal.toFixed(2));
}

function cartremove(index) {
    subtotal = subtotal - cart[index].cost;
    cart.splice(index, 1);
    listing.splice(index, 1);
    $("#orderlist").val(listing.toString());
    console.log(listing.toString());
    $("#sub").val(subtotal.toFixed(2));
    if (cart.length === 0) {
        subtotal = 0;
        $("#cartcontents").empty();
        $("#cartcontents").html("Your shopping cart is empty!<br /><br />");
    } else {
        shop();
    }
}

function store() {
    $.getJSON("https://my.api.mockaroo.com/halescogames.json?key=0ef48720", function (data) {
        $("#inventory").empty();
        $.each(data, function (key, value) {
            $("#inventory").append("<h1 class='gametitle inner-" + value.id + "'>" + value.title + "</h1>");
            $("#inventory").append("<a href='" + value.imagelarge + "' data-lightbox='image" + value.id + "' data-title='" + value.title + "' class='inner-" + value.id + "'><img src='" + value.image + "' class='img-rounded gameimage' /></a>");
            $("#inventory").append("<div class='funplexity inner-" + value.id + "'><p class='complexity'>Complexity: " + value.complexity + "</p><p class='fun'>Fun: " + value.fun + "</p></div>");
            $("#inventory").append("<button type='button' class='btn btn-default buyit inner-" + value.id + "' onclick='cartadd(" + value.id + ", &quot;" + value.title + "&quot;, " + value.cost + ", &quot;" + value.image + "&quot;)'>Add to cart</button>");
            $("#inventory").append("<p class='cost inner-" + value.id + "'>" + value.cost + "</p>");
            $("#inventory").append("<h2 class='publishername inner-" + value.id + "'>" + value.publisher + "</h2>");
            $("#inventory").append("<p class='inner-" + value.id + "'>" + value.description + "</p>");
            $(".inner-" + value.id).wrapAll("<div class='item' />");
        });
    });
}

$(document).ready(function () {
    store();
	$("#email").focus();
    $("#order_form").validate({
        rules: {
            email_1: {
                required: true,
                email: true
            },
            email_2: {
                required: true,
                email: true,
                equalTo: "#email_1"
            },
            first_name: {
                required: true
            },
            last_name: {
                required: true
            },
            address_1: {
                required: true
            },
            address_2: {
                required: false
            },
            city: {
                required: true
            },
            state: {
                required: true,
                rangelength: [2, 2]
            },
            zip: {
                required: true,
                rangelength: [5, 5],
                digits: true
            },
            card_number: {
                required: true,
                creditcard: true
            },
            expiry_month: {
                required: true,
                digits: true
            },
            expiry_year: {
                required: true
            },
            cvv: {
                required: true,
                digits: true,
                rangelength: [3, 3]
            }
        },
        messages: {
            zip: {
                rangelength: "Please enter 5 digits.",
                digits: "Please enter numbers only."
            },
            expiry_month: {
                digits: "Please select a month."
            },
            cvv: {
                rangelength: "Please enter 3 digits.",
                digits: "Please enter numbers only."
            }
        }
    });
});
