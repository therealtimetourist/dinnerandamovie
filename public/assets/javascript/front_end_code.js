//gets today's date and puts in format needed for API
var m = moment().get('date');
var date = moment().format("YYYY-MM-DD");
var zipCode = $('#name-input').val();
var rndMovies = [];

$('#btnGoZipCode').on('click', function(event){
	event.preventDefault();
  	console.log(getRecommendations(""));
  	
});


//function pullMovies(){
 // 		var queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + zipCode + "&api_key=52hkegdyrb7rrj8eraadpwg4";

//  		$.ajax({url: queryURL,method: "GET"}).done(function(response){
//  			for (var i = 0; i < 3; i++){
//  				alert(response);
//  				var rndNum = Math.floor((Math.random() * 15));
// 				console.log('rndNum' + rndNum);
//  				rndMovies.push(response[rndNum]);
//  			}
  			//$("#movie-list").append(response[0].title + "<br>" + response[0].longDescription + "<br>" + response[0].genres);
//    	});

//    	sessionStorage.setItem('rndMovies', rndMovies);
//      console.log('rndMovies[0]' + rndMovies);
//      $(location).attr('href','choices.html');
//    };
    

