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

// putSeedData();

/* CRUD meals into database. */

router.put('/putMeal',function(req,res){
	var userid = req.body.userID
	var value = true;

	//save inside meals node and also update chef's meals node
	var key = mealsRef.push(req.body.testMeal).key;
	db.ref("chefs/" + userid + "/meals/").child(key).set(value);

  	res.send("success");
}); //CREATE

router.get('/getMeal/:mealID',function(req,res){	
	var mealid = req.params.mealID;
	var resultMeal;

	var getMealRef = db.ref("meals/" + mealid);
	getMealRef.once('value',function(snapshot){
		resultMeal = snapshot.val();
	});
    res.send(resultMeal);
}); //RETRIEVE Specific One

router.get('/getAllMeals',function(req,res){	
	console.log('getting all the meals');
	var allMeals = [];

	mealsRef.once("value",function(dataSnapShot){
		dataSnapShot.forEach(function(child){
			var oneMeal = child.val();
			allMeals.push({meal: oneMeal, key: child.key});
		});
		res.send(allMeals);
	});	
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
