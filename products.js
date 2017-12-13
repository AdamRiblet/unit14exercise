// work on send/retrieve line 45

$(document).ready(function(){
	
	var baseUrl = "https://my.api.mockaroo.com/adam_schema.json?key=66960e30";
	
	// setup links
	$.getJSON(baseUrl, function(data){
		$("#product-list").empty(); // remove any old links
		// data is an array of product objects
		$.each(data, function(i, e){
			var $price = $("<p></p>");
			var $a = $("<a href='#'></a>");
			var $li =$("<li></li>");
			
			$a.text(e.name);
			$price.text(e.price);
			
			$a.append($price);
			$li.append($a);
			$("#product-list").append($li);	

			$a.click(createClickHandler(e));

		});		
	});

	function createClickHandler(e) {
		return function onClick() {
			let details = ""
			details = e.description
			$("#product-details").text(details);
			$("#order-button").show();
			$("#label").show();
			$("#quantity").show();
		}
	}
	
	var orderButton = document.getElementById("order-button");

	orderButton.onclick = function() {
	// MODAL
	var modal = document.getElementById("myModal");
	var span = document.getElementsByClassName("close")[0];

//******************* Send quantity and retrieve total price here */
//******************* Display total price in $("#total-price") here */

	modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}
	
});
