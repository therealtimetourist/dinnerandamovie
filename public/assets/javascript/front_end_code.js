//gets today's date and puts in format needed for API
var m = moment().get('date');
var date = moment().format("YYYY-MM-DD");
var zipCode = $('#name-input').val();
var rndMovies = [];

$('#btnGoZipCode').on('click', function(event){
  event.preventDefault();
  $(location).attr('href','choices.html');
});
    
function buildChoices(){
  var movieList = getRecommendations();
  console.log(movieList);
  var choiceDiv = $('#choiceContiner');

  for (var i=1; i < 4; i++){
    var movieName      = movieList[i-1].movie.movieName;
    var movieDesc      = movieList[i-1].movie.movieDesc;
    var movieGenre     = movieList[i-1].movie.movieGenre;
    var theaterName    = movieList[i-1].movie.theaterName;
    var theaterAddress = movieList[i-1].movie.location.address;
    var theaterCity    = movieList[i-1].movie.location.city;
    var theaterState   = movieList[i-1].movie.location.state;
    var theaterZip     = movieList[i-1].movie.location.zip;

    var restaurantName     = movieList[i-1].restaurant.restaurantName;
    var restaurantCategory = movieList[i-1].restaurant.category;
    var restaurantAddress  = movieList[i-1].restaurant.location.address;
    var restaurantCity     = movieList[i-1].restaurant.location.city;
    var restaurantState    = movieList[i-1].restaurant.location.state;
    var restaurantZip      = movieList[i-1].restaurant.location.zip;
    var restaurantPrice    = movieList[i-1].restaurant.price;

    var strChoices = '<div class="row">';
    strChoices    += '    <div class="col-lg-12 well well-lg text-success">';
    strChoices    += '        <h1>Combo ' + i + '</h1>';
    strChoices    += '        <div class="row">';
    strChoices    += '            <div class="col-sm-6" data-toggle="modal" data-target="#restaurantModal' + i + '">';
    strChoices    += '                <div class="row">';
    strChoices    += '                    <div class="col-sm-12">';
    strChoices    += '                        <img alt="dinner choice ' + i + '" src="http://via.placeholder.com/200x300">';
    strChoices    += '                        <h3>' + restaurantName + '</h3>';
    strChoices    += '                        <p>' + restaurantAddress;
    strChoices    += '                        <br>' + restaurantCity + ', ';
    strChoices    +=                           restaurantState + ' ' + restaurantZip + '</p>';
    strChoices    += '                    </div>';
    strChoices    += '                </div>';
    strChoices    += '            </div>';
    strChoices    += '            <div class="col-sm-6" data-toggle="modal" data-target="#movieModal' + i + '">';
    strChoices    += '                <div class="row">';
    strChoices    += '                    <div class="col-sm-12">';
    strChoices    += '                        <img alt="movie choice ' + i + '" src="http://via.placeholder.com/200x300">';
    strChoices    += '                        <h3>' + movieName + '</h3>';
    strChoices    += '                        <p>' + theaterName;
    strChoices    += '                        <p>' + theaterAddress;
    strChoices    += '                        <br>' + theaterCity + ', ';
    strChoices    +=                           theaterState + ' ' + theaterZip + '</p>';
    strChoices    += '                    </div>';
    strChoices    += '                </div>';
    strChoices    += '            </div>';
    strChoices    += '        </div>';
    strChoices    += '        <div class="row">';
    strChoices    += '            <div class="col-sm-12 text-center">';
    strChoices    += '                <button type="button" class="btn btn-lg btn-success">';
    strChoices    += '                    Choose Combo ' + i;
    strChoices    += '                </button>';
    strChoices    += '            </div>';
    strChoices    += '        </div>';
    strChoices    += '    </div>';
    strChoices    += '</div>';

    choiceDiv.append(strChoices);
  }
}
