$(document).ready(function(){
	var token;

	var payMeal = function(){
	Stripe.card.createToken({
  	number: "4242424242424242",
  	cvc: "123",
  	exp_month: "12",
  	exp_year: "2017"
	}, stripeResponseHandler)};

	var stripeResponseHandler = function(status, response){
		if(response.error){
			console.log(response);
		}
		else{
			token = response.id;
			ajaxToServer(token);
		}
	}

	var ajaxToServer = function(token){
		console.log("inside ajax to server?")

		$.ajax({
	      url: '/payments/processPayments',
	      type: 'POST',
	      dataType: "json",
	      contentType: "application/json",
	      data: JSON.stringify({stripeToken : token}),
	      success:function(result){
	        alert(result);
	      }
    	});
	}

	document.getElementById('pay-meal').addEventListener(
      'click', payMeal);
});