$(document).ready(function(){

  $(".back_button").click(function() {
    history.back(-1);
  })

  
  
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
	  		var key = obj.key;
		  	var html = '<a href="http://localhost:3000/meals/getMeal/' + key + '"><div class="panel-body" style="height:50px;">\
						<div class="row" id="panel">\
							<div class="col-xs-6 col-md-2">\
								<img class="img-circle" src="' + obj.meal.Image + '"' + 'alt="Image" style="width:50px;height:50px;">\
							</div>\
							<div class="col-xs-6 col-md-2" style="position:absolute;right:40%">\
								<p><b>' + obj.meal.Name + '</b></p>\
								<p>' + obj.meal.Location.Street + '<p>\
							</div>\
							<div class="col-xs-5 col-md-4" style="position:absolute;right:0%">\
								<p>' + '$' + obj.meal.Price + '</p>\
							</div>\
						</div>\
					</div><hr></a>'

	   $('#add').append(html);
	    console.log(obj)
	  });

	}

	getAllMeals();

});