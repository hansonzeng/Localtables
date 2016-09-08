var express = require('express');
var firebase = require("firebase");
var router = express.Router();

firebase.initializeApp({
  databaseURL: "https://localtables-28928.firebaseio.com",
  serviceAccount: "/Users/hansonzihanzeng/Desktop/67-475\ Innovation\ in\ Information\ Systems/localtables-5dd14e3ea0e3.json"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Our meals YUM!' });
});

/* CRUD meals into database. */

router.put('/:collection',function(req,res){
	console.log('created the meal');
	res.render('layout', { title: 'Our meals created!' });
}); // CRUD Create

router.post('/:collection',function(req,res){
	console.log('updated the meal');
	res.render('layout', { title: 'Our meals updated!' });
}); // CRUD Update

router.delete('/:collection',function(req,res){
	console.log('deleted the meal');
	res.render('layout', { title: 'Our meals deleted!' });
}); //CRUD Delete


module.exports = router
