$(document).ready(function() {

jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[A-Za-z]+$/i.test(value);
}, "Letters only please"); 

jQuery.validator.setDefaults({
  success: "valid"
});

$( "#email_form" ).validate({
  rules: {
	fname: {
		required: true,
		lettersonly: true
	},
	lname: {
		required: true,
		lettersonly: true
	},
	phone: {
		required: true,
		phoneUS: true
	},
	email: {
    	required: true,
      	email: true
	}
  },
    messages: {
    phone: {
		phoneUS: "Must be a US phone number."
	}
  }
});

}); // end ready
