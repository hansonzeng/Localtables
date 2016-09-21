var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyD5zq2uo3qneLzBxKoyDdqXCQcOQ6GTvAA",
    authDomain: "localtables-28928.firebaseapp.com",
    databaseURL: "https://localtables-28928.firebaseio.com",
    storageBucket: "localtables-28928.appspot.com",
    messagingSenderId: "600385979986"
  };

firebase.initializeApp(config);

module.exports = firebase;

