var express = require('express');
var firebase = require("firebase");
var router = express.Router();

// firebase.initializeApp({
//   databaseURL: "https://localtables-28928.firebaseio.com",
//   serviceAccount: "/Users/hansonzihanzeng/Desktop/67-475\ Innovation\ in\ Information\ Systems/localtables-5dd14e3ea0e3.json"
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Express' });
});


module.exports = router;
