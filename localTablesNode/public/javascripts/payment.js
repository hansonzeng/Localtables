$(document).ready(function(){

	console.log("payment.js loaded");
	console.log("LOADING******************PAYMENT.JS");

	var token;
	var price = parseFloat($("#price_meal").text().slice(1,5))*100
	var name = $("#name_meal").text()

	var payMeal = function(){
		console.log("inside the paymeals function");

		window.location.href = "../../meals"

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
	      data: JSON.stringify({stripeToken : token, mealPrice: price, mealName: name}),
	      success:function(result){
	        alert(result);
	      }
    	});
	}

	document.getElementById('pay-meal').addEventListener(
      'click', payMeal);
});