var express = require('express');
var firebase = require("firebase");
var router = express.Router();
var mealsJSON = require('../seedData/seedMeals.json')

firebase.initializeApp({
  databaseURL: "https://localtables-28928.firebaseio.com",
  serviceAccount: "/Users/hansonzihanzeng/Desktop/67-475\ Innovation\ in\ Information\ Systems/localtables-5dd14e3ea0e3.json"
});
var db = firebase.database()
var mealsRef = db.ref("meals/");

//Adding seed data into the database
// for(var i=0; i<mealsJSON.length; i++){
// 	var obj = mealsJSON[i];
// 	mealsRef.push(obj);
// }

mealsRef.on("chil",function(dataSnapShot){
	console.log(dataSnapShot.val());
});

// mealsRef.on("value", function(dataSnapShot){
// 	var meals = dataSnapShot.val();
// 	console.log(meals);
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Our meals YUM!' });
});

/* CRUD meals into database. */

router.put('/:collection',function(req,res){
	console.log('created the meal');
	mealsRef.push('The meal JSON');
	res.render('layout', { title: 'Our meals created!' });
});

router.post('/:collection',function(req,res){
	console.log('updated the meal');
	res.render('layout', { title: 'Our meals updated!' });
}); // CRUD Update

router.delete('/:collection',function(req,res){
	console.log('deleted the meal');
	res.render('layout', { title: 'Our meals deleted!' });
}); //CRUD Delete


module.exports = router
