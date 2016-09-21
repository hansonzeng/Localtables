$(document).ready(function(){

//FUNCTIONS ONLY FOR TESTING PURPOSES CRUD FOR MEALS; Should run these
//once user logged into the system
var putMeals = function(){
  console.log("within the meals.js too!")

  var testMealData = {
  "Name" : "Hawaii Pineapples",
  "Description" : "The best pineapples",
  "Location" : {
    "State" : "BC",
    "City" : "Vancouver",
    "Street" : "Granville Street"
  },
  "Price" : 20.00,
  "CookingLesson" : true,
  "Image" : "http://tinyurl.com/hyk4ae9"
  };

  var uniqueKey;

  //Put Meals
   $.ajax({
      async: false,
      url: '/meals/putMeal',
      type: 'PUT',
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({testMeal: testMealData, userID: currentUid}),
      success:function(result){
        uniqueKey = result.uniqueKey;
      }
    });

  // Update Chef
    $.ajax({
      url: '/chefs/postChefMeal',
      type: 'POST',
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({mealID: uniqueKey, userID: currentUid}),
      success:function(result){
        console.log("successful post to chef")
      }
    });

}

var getAllMeals = function(){	
  var allMeals;

  $.ajax({
      async: false,
      url: '/meals/getAllMeals',
      type: 'GET',
      success:function(result){
        allMeals = result;
      }
    });

  console.log(allMeals);
}

var getMeal = function(){ 

  var mealid = "-KS9dLGch6sDnyWgP4Kg";
  var meal;

    $.ajax({
      async: false,
      url: '/meals/getMeal/' + mealid,
      type: 'GET',
      success:function(result){
        meal = result;
      }
    });

  console.log(meal);
}

//change prices

var postMeals = function(){

  var mealid = "-KS9dLGch6sDnyWgP4Kg";
  var editField = "Price";
  var newValue = 75;

  console.log("Mealid is " + mealid);

  $.ajax({
      url: '/meals/postMeal',
      type: 'POST',
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({mealID: mealid, child: editField, newVal: newValue}),
      success:function(result){
        alert(result);
      }
    });
}

//delete the whole meal
var deleteMeals = function(){

  var mealid = "-KS8UNcrUJOxxpyOQBbQ";

  $.ajax({
      url: '/meals/deleteMeal',
      type: 'DELETE',
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({mealID: mealid}),
      success:function(result){
        alert(result);
      }
    });
}

	//ONLY FOR TESTING PURPOSES CRUD FOR MEALS
  document.getElementById('put-meals').addEventListener(
      'click', putMeals);
  document.getElementById('get-meals').addEventListener(
      'click', getMeal);
  document.getElementById('post-meals').addEventListener(
      'click', postMeals);
  document.getElementById('delete-meals').addEventListener(
      'click', deleteMeals);

});