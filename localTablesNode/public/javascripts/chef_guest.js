$(document).ready(function(){

	console.log("in the chef guest javascript file");
	console.log("The current UID is " + currentUid);
	console.log("The current UID is " + firebase.auth().currentUser.uid);
	var uid = firebase.auth().currentUser.uid;

	$("#guest a").attr("href","http://localhost:3000/chefs/getChefMeals/" + uid);

});