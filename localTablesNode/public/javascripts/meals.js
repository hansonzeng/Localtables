$(document).ready(function(){

//FUNCTIONS ONLY FOR TESTING PURPOSES CRUD FOR MEALS; Should run these
//once user logged into the system
var putMeals = function(){
  console.log("within the meals.js too!")

  var testMealData = {
  "Name" : "Hawaii Cows",
  "Description" : "The best cow",
  "Location" : {
    "State" : "BC",
    "City" : "Vancouver",
    "Street" : "Granville Street"
  },
  "Price" : 20.00,
  "CookingLesson" : true
  };

  console.log("The userid is currently " + firebase.auth().currentUser.uid);

  $.ajax({
      url: '/meals/putMeal',
      type: 'PUT',
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({testMeal: testMealData, userID: currentUid}),
      success:function(result){
        alert(result);
      }
    });
}

var getAllMeals = function(){	
  $.ajax({
      url: '/meals/getAllMeals',
      type: 'GET',
      success:function(result){
        alert(result);
      }
    });
}

var postMeals = function(){
  $.ajax({
      url: './guessCollect',
      type: 'POST',
      data:{filter:picture,update:question,answer},
      success:function(result){
        alert(result);
      }
    });
}

var deleteMeals = function(){
  $.ajax({
      url: './guessCollect',
      type: 'PUT',
      data:{filter:picture,update:question,answer},
      success:function(result){
        alert(result);
      }
    });
}

	//ONLY FOR TESTING PURPOSES CRUD FOR MEALS
  document.getElementById('put-meals').addEventListener(
      'click', putMeals);
  document.getElementById('get-meals').addEventListener(
      'click', getAllMeals);
  document.getElementById('post-meals').addEventListener(
      'click', postMeals);
  document.getElementById('delete-meals').addEventListener(
      'click', deleteMeals);


});