$(document).ready(function(){


$('#confirm').click (function (e) {
   e.preventDefault(); //will stop the link href to call the blog page
   $('#alert').addClass('in'); // shows alert with Bootstrap CSS3 implem
});

$('#amount').blur(function (){    
    this.value = parseFloat(this.value.replace(/,/g, ""))
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")});


$('#confirm').click(function() {
  putMeals();
})

//Function here puts meal and also redirects to detail chef page
var putMeals = function(){

  var x = document.getElementsByClassName("form-control");
  var y = document.getElementById("lessons");
  var img = document.getElementById('img').src;

  console.log("y",y.checked);
  console.log("party",x[3].value);
  console.log("img",img);

  var testMealData = {
  "Name" : x[0].value,
  "Description" : x[1].value,
  "Location" : x[2].value,
  "Party" : x[3].value,
  "Price" : x[4].value,
  "CookingLesson" : y.checked,
  "Image" : img
  };

  var uid = firebase.auth().currentUser.uid;
  console.log('uid',uid);

  //Put Meals
   $.ajax({
      async: false,
      url: '/meals/putMeal',
      type: 'PUT',
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({testMeal: testMealData, userID: uid}),
      success:function(result){
        console.log(result);
      }
    });

   setTimeout(function () {
       window.location.href = "./chefs/getChefMeals/" + uid; //will redirect to your blog page (an ex: blog.html)
    }, 1000); //will call the function after 2 secs.

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
  // document.getElementById('confirm').addEventListener(
  //     'click', putMeals);
  // document.getElementById('get-meals').addEventListener(
  //     'click', getMeal);
  // document.getElementById('get-all-meals').addEventListener(
  //     'click', getAllMeals);
  // document.getElementById('post-meals').addEventListener(
  //     'click', postMeals);
  // document.getElementById('delete-meals').addEventListener(
  //     'click', deleteMeals);

});