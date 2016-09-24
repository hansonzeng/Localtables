$(document).ready(function(){

var mealIDTest = "-KSDCc1zyKs7YfJAiQK-";
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


  //Put Meals
   $.ajax({
      async: false,
      url: '/meals/putMeal',
      type: 'PUT',
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({testMeal: testMealData, userID: currentUid}),
      success:function(result){
        console.log(result);
      }
    });

}

var getAllMeals = function(){	
  console.log("Getting all meals now");
  var allMeals;

  $.ajax({
      async: false,
      url: '/meals/getAllMeals',
      type: 'GET',
      success:function(result){
        allMeals = result;
      }
    });

  allMeals.forEach(function(obj){
    console.log(obj)
  });

}

var getMeal = function(){ 

  var mealid = mealIDTest;
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

  var mealid = mealIDTest;
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

  var mealid = mealIDTest;

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
  document.getElementById('get-all-meals').addEventListener(
      'click', getAllMeals);
  document.getElementById('post-meals').addEventListener(
      'click', postMeals);
  document.getElementById('delete-meals').addEventListener(
      'click', deleteMeals);

});