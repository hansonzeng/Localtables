var express = require('express');
var firebase = require("firebase");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Express' });
});


module.exports = router;
