$(document).ready(function(){
  
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
		  	var html = '<a href="./meals/getMeal/' + key + '"><div class="panel-body" style="height:50px;">\
						<div class="row" id="panel">\
							<div class="col-xs-2">\
								<img class="img-circle" src="' + obj.meal.Image + '"' + 'alt="Image" style="width:75px;height:75px;">\
							</div>\
							<div class="col-xs-8" style="position:absolute;right:11%">\
								<p><b>' + obj.meal.Name + '</b></p>\
								<p>' + obj.meal.Location + '<p>\
							</div>\
							<div class="col-xs-2" style="position:absolute;right:15%">\
								<p>' + '$' + obj.meal.Price + '</p>\
							</div>\
						</div>\
					</div><hr></a>'

	   $('#add').append(html);
	    // console.log(obj)
	  });

	}

	getAllMeals();

});