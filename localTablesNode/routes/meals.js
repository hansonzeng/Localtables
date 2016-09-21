var express = require('express');
var firebase = require("./firebase.js");
var router = express.Router();
var mealsJSON = require('../seedData/seedMeals.json')

//loading firebase instances
var authData = firebase.auth();
var db = firebase.database();

//creating firebase references
var mealsRef = db.ref("meals/");

// Adding seed data into the database
var putSeedData = function(){
	for(var i=0; i<mealsJSON.length; i++){
	var obj = mealsJSON[i];
	mealsRef.push(obj);
	}
}

putSeedData();

//prints all the meals in console
// mealsRef.orderByChild("Price").on("value",function(dataSnapShot){
// 	console.log(dataSnapShot.val());
// });

/* CRUD meals into database. */

router.put('/putMeal',function(req,res){
	console.log("the user is " + req.body.userID);

	var key = mealsRef.push().key;
	mealsRef.push(req.body.testMeal);

	//sends back unique Meal Key
	res.contentType('json');
  	res.send(JSON.stringify({uniqueKey: key}));
}); //CREATE

router.get('/getMeal/:mealID',function(req,res){	
	console.log("The mealid is " + req.params.mealID);
	var mealid = req.params.mealID;
	var resultMeal;

	var getMealRef = db.ref("meals/" + mealid);
	getMealRef.on('value',function(snapshot){
		resultMeal = snapshot.val();
		console.log(snapshot.val());
	});
    res.send(resultMeal);
}); //RETRIEVE Specific One

router.get('/getAllMeals',function(req,res){	
	console.log('getting all the meals');
	var allMeals = [];
	allMeals.push("foo");

	mealsRef.on("value",function(dataSnapShot){
		dataSnapShot.forEach(function(child){
			console.log(child.val());
			var oneMeal = child.val();
			allMeals.push(oneMeal);
		});
	});	

	allMeals.forEach(function(obj){
		console.log(obj);
	});
	// console.log("list of meals " + allMeals.length);
    res.send(allMeals);
}); //RETRIEVE ALL

router.post('/postMeal',function(req,res){
	console.log("the mealID is " + req.body.mealID);
	console.log("the child edited is " + req.body.child);
	console.log("the new value is " + req.body.newVal);

	var mealid = req.body.mealID;
	var children = req.body.child;
	var value = req.body.newVal;

	var obj = {};
	obj[children] = value;

	db.ref("meals/" + mealid).update(obj);

	res.send("Updated the meals of interest")
}); // UPDATE

//delete meal and also delete user's meals related to it
router.delete('/deleteMeal',function(req,res){
	console.log('deleted the meal');

	var mealid = req.body.mealID
	db.ref("meals/" + mealid).remove()

	res.send("Deleted the meals of interest")
}); //DELETE


module.exports = router
