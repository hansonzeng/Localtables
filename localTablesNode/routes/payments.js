var express = require('express');
var firebase = require("./firebase.js");
var router = express.Router();

// //loading firebase instances
var authData = firebase.auth();
var db = firebase.database();

//creating firebase references
var paymentsRef = db.ref("payments/");
var stripe = require("stripe")("sk_test_TrUq42PqYiMFQx7GhesFAkv6");

router.post('/processPayments', function(req, res, next) {
  var token = req.body.stripeToken;
  var price = req.body.mealPrice;
  var name = req.body.mealName;

  var charge = stripe.charges.create({
  amount: price, // Amount in cents
  currency: "usd",
  source: token,
  description: "Charges for " + name
}, function(err, charge) {
  if (err && err.type === 'StripeCardError') {
    console.log("Card has been denied")
  }
});

});


module.exports = router;