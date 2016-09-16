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

module.exports = router;
