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

router.get('/getChefMeals/:uid', function(req, res, next) {
	var userid = req.params.uid;
	var allMealsIds = [];
	var allMeals = [];

	console.log("inside the getChefMeals/UID");
	console.log("the uid is " + userid);

	db.ref("chefs/" + userid).child("meals").once("value",function(dataSnapShot){
		dataSnapShot.forEach(function(snap){
			allMealsIds.push(snap.getKey());
		});
		allMealsIds.forEach(function(obj){
			console.log("obj should be key of meals " + obj);
			db.ref("meals/" + obj).once("value",function(dataSnapShot){
				// console.log("dataSnapShot is " + dataSnapShot);
				console.log("dataSnapShot key is " + dataSnapShot.getKey());
				console.log("value is " + dataSnapShot.val());
				allMeals.push({meal: dataSnapShot.val(), key: dataSnapShot.getKey()});
			});
		});
		console.log("Onside allmealsloop length",allMeals.length);
		res.render("detail_chef.ejs",{chefMeals: allMeals});	
	});
});

router.put('/putChef', function(req, res, next) {
	var userid = req.body.userID;
	var chef = req.body.chefData;
	console.log("userid is " + userid);
	db.ref("chefs/" + userid).push(chef);
  	res.send('sent successful~');
});

router.post('/postChef', function(req, res, next) {
  	res.send('sent successful~');
});


router.delete('/deleteChef', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
