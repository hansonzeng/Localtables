$(document).ready(function(){

	console.log("payment.js loaded");
	console.log("LOADING******************PAYMENT.JS");

	$('#pay-meal').click (function (e) {
		console.log("in here")
		$('#alert').addClass('in');
		setTimeout(function () {
	       	window.location.href = "../../meals" 
	    }, 1000); //will call the function after 2 secs.
	});

	var token;
	var price = parseFloat($("#price_meal").text().slice(1,5))*100
	var name = $("#name_meal").text()
	var cookLesson = false;

	Stripe.setPublishableKey('pk_test_TK18ZwUnK2CT1Wmof8WsQl8S');

	var payMeal = function(){
		console.log("inside the paymeals function");

		var x = document.getElementsByClassName("form-payment");

		console.log("Number is " + x[0].value)
		console.log("CVC is " + x[1].value)
		console.log("Exp_Month is " + x[2].value)
		console.log("Exp_Year is " + x[3].value)
		console.log("The Stripe Object is",Stripe)

		if(x.length == 5){
			cookLesson = x[4].checked;
		}

		Stripe.card.createToken({
	  	number: x[0].value,
	  	cvc: x[1].value,
	  	exp_month: x[2].value,
  		exp_year: x[3].value
  		}, stripeResponseHandler)

	};

	var stripeResponseHandler = function(status, response){
		console.log("IM IN THE RESPONSE HANDLER!!!!+++++***")
		if(response.error){
			console.log("THERE IS AN ERROR!!***")
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
	      data: JSON.stringify({stripeToken : token, mealPrice: price, mealName: name, cookLesson: cookLesson}),
	      success:function(result){
	        alert(result);
	      }
    	});
	}

	document.getElementById('pay-meal').addEventListener(
      'click', payMeal);
});