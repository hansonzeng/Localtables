var express = require('express');
var firebase = require("./firebase.js");
var router = express.Router();

// //loading firebase instances
var authData = firebase.auth();
var db = firebase.database();

//creating firebase references
var chefsRef = db.ref("chefs/");


/* GET users listing. */
router.get('/getChef', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/putChef', function(req, res, next) {
	var userid = req.body.userID;
	var chef = req.body.chefData;
	console.log("userid is " + userid);

	// var obj = {};
	// obj[userid] = chef;
	// db.ref("chefs/").push().set(obj);

	db.ref("chefs/" + userid).push(chef);

  	res.send('sent successful~');
});

router.post('/postChef', function(req, res, next) {
  	res.send('sent successful~');
});

//related to the put meals
router.post('/postChefMeal', function(req, res, next) {
	var userid = req.body.userID;
	var mealid = req.body.mealID;
	var obj = {};
	obj[mealid] = true;
	db.ref("chefs/" + userid).child("Meals").push(obj);
	res.send('respond with a resource');
});

router.delete('/deleteChef', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
