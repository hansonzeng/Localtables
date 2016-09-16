var express = require('express');
var firebase = require("firebase");
var router = express.Router();
var mealsJSON = require('../seedData/seedMeals.json')

var config = {
    apiKey: "AIzaSyD5zq2uo3qneLzBxKoyDdqXCQcOQ6GTvAA",
    authDomain: "localtables-28928.firebaseapp.com",
    databaseURL: "https://localtables-28928.firebaseio.com",
    storageBucket: "localtables-28928.appspot.com",
    messagingSenderId: "600385979986"
  };

//   {
//   databaseURL: "https://localtables-28928.firebaseio.com",
//   serviceAccount: "/Users/hansonzihanzeng/Desktop/67-475\ Innovation\ in\ Information\ Systems/localtables-5dd14e3ea0e3.json",
//   storageBucket: "localtables-28928.appspot.com"
// }

firebase.initializeApp(config);

//loading firebase instances
var authData = firebase.auth();
var db = firebase.database();

//creating firebase references
var mealsRef = db.ref("meals/");

//Adding seed data into the database
// for(var i=0; i<mealsJSON.length; i++){
// 	var obj = mealsJSON[i];
// 	mealsRef.push(obj);
// }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Our meals YUM!' });
});

mealsRef.orderByChild("Price").on("value",function(dataSnapShot){
	console.log(dataSnapShot.val());
});

/* CRUD meals into database. */

router.put('/putMeal',function(req,res){
	console.log(req.body);
	console.log("req body is " + req.body.testMeal.Name);
	console.log("the user is " + req.body.userID);
	mealsRef.push(req.body.testMeal);
	res.render('layout', { title: 'Our meals created!'});
}); //CREATE

router.get('/getAllMeals',function(req,res){
	console.log('getting all the meals');
	mealsRef.on("value",function(dataSnapShot){
		console.log(dataSnapShot.val());
	});	
	console.log("after mealsRef");
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
}); //RETRIEVE

router.post('/:collection',function(req,res){
	console.log('updated the meal');
	res.render('layout', { title: 'Our meals updated!' });
}); // UPDATE

router.delete('/:collection',function(req,res){
	console.log('deleted the meal');
	res.render('layout', { title: 'Our meals deleted!' });
}); //DELETE


module.exports = router
