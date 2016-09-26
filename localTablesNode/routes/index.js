var express = require('express');
var firebase = require("firebase");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/widget', function(req, res, next) {
  res.render('widget');
});

router.get('/chefGuest', function(req, res, next) {
  res.render('chef_guest');
});

router.get('/chefDetail', function(req, res, next) {
  res.render('detail_chef');
});

router.get('/createMeal', function(req, res, next) {
  res.render('create_meal');
});

router.get('/review', function(req, res, next) {
  res.render('review');
});


router.get('/checkout', function(req, res, next) {
  res.render('purchase');
});

router.get('/meals', function(req, res, next) {
  res.render('choose_meal');
});

router.get('/detail', function(req, res, next) {
  res.render('detail_meal');
});

module.exports = router;
