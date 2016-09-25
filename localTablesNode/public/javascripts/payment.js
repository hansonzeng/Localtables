$(document).ready(function(){

	console.log("payment.js loaded")
	var token;

	var payMeal = function(){
		console.log("inside the paymeals function");
		var x = document.getElementsByClassName("form-payment");
		Stripe.card.createToken({
	  	number: x[0].value,
	  	cvc: x[1].value,
	  	exp_month: x[2].value,
  		exp_year: x[3].value
  }, stripeResponseHandler)};

	var stripeResponseHandler = function(status, response){
		if(response.error){
			console.log(response);
		}
		else{
			console.log("submitting ajax to server with token");
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