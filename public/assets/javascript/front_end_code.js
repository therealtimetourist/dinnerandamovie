//gets today's date and puts in format needed for API
var m = moment().get('date');
var date = moment().format('YYYY-MM-DD');
var zipCode = $('#zipCode').val();
var userPref = {};

var rndMovies = [];

$('#btnGoZipCode').on('click', function(event) {
  event.preventDefault();
  //populateSearchResults('zip');
  populateSearchResults('ll');
});

$('#btnGoLatLong').on('click', function(event) {
  event.preventDefault();
  populateSearchResults('ll');
});

function buildChoices() {
  var movieList = getRecommendations();
  console.log(movieList);
  var choiceDiv = $('#choiceContiner');   // main choices

  for (var i = 1; i <= 3; i++) {
    var movieName = movieList[i - 1].movie.movieName;
    var movieDesc = movieList[i - 1].movie.movieDesc;
    var movieGenre = movieList[i - 1].movie.movieGenre;
    var theatreName = movieList[i - 1].movie.theatreName;
    var theatreAddress = movieList[i - 1].movie.location.address;
    var theatreCity = movieList[i - 1].movie.location.city;
    var theatreState = movieList[i - 1].movie.location.state;
    var theatreZip = movieList[i - 1].movie.location.zip;

    var restaurantName = movieList[i - 1].restaurant.restaurantName;
    var restaurantCategory = movieList[i - 1].restaurant.category;
    var restaurantAddress = movieList[i - 1].restaurant.location.address;
    var restaurantCity = movieList[i - 1].restaurant.location.city;
    var restaurantState = movieList[i - 1].restaurant.location.state;
    var restaurantZip = movieList[i - 1].restaurant.location.zip;
    var restaurantPrice = movieList[i - 1].restaurant.price;

    var strChoices = '<div class="row">';
    strChoices += '    <div class="col-lg-12 well well-lg text-success">';
    strChoices += '        <h1>Combo ' + i + '</h1>';
    strChoices += '        <div class="row">';
    strChoices += '            <div class="col-sm-6" data-toggle="modal" data-target="#restaurantModal' +
        i + '">';
    strChoices += '                <div class="row">';
    strChoices += '                    <div class="col-sm-6">';
    strChoices += '                        <img alt="dinner choice ' + i +
        '" src="http://via.placeholder.com/200x300">';
    strChoices += '                    </div>';
    strChoices += '                    <div class="col-sm-6 text-center">';
    strChoices += '                        <h3>' + restaurantName + '</h3>';
    strChoices += '                        <p>Lorem ipsum dolor sit amet</p>';
    strChoices += '                    </div>';
    strChoices += '                </div>';
    strChoices += '            </div>';
    strChoices += '            <div class="col-sm-6" data-toggle="modal" data-target="#movieModal' +
        i + '">';
    strChoices += '                <div class="row"></div>';
    strChoices += '                    <div class="col-sm-6">';
    strChoices += '                        <img alt="movie choice ' + i +
        '" src="http://via.placeholder.com/200x300">';
    strChoices += '                    </div>';
    strChoices += '                    <div class="col-sm-6 text-center">';
    strChoices += '                        <h3>' + movieName + '</h3>';
    strChoices += '                        <p>Lorem ipsum dolor sit amet</p>';
    strChoices += '                    </div>';
    strChoices += '                </div>';
    strChoices += '            </div>';
    strChoices += '        </div>';
    strChoices += '        <div class="row"><div class="col-sm-12 text-center">';
    strChoices += '            <button type="button" class="btn btn-lg btn-success">';
    strChoices += '            Choose Combo ' + i + '</button>';
    strChoices += '        </div>';
    strChoices += '    </div>';
    strChoices += '</div>';

    choiceDiv.append(strChoices);
  }
}

function populateSearchResults(searchMode) {
  $.when(
      getRecommendations(userPref, userLat, userLon, zipCode, searchMode)
  ).done(function() {
    //console.log(recommendations.length);
    $('#results').empty();
    for (var i = 0; i < recommendations.length; i++) {
      addRecommendationsRow(recommendations[i], i);
    }

  });

}

function shiftResults() {

}

/**
 * This function takes an individual recommendation item and adds it to a table row object
 * @param {object} Rec This object is the recommendations object
 * @param {integer} index This is the index of the array that is being used
 */
function addRecommendationsRow(rec, index) {

  var $newRow = $('<tr>');
  var $newCol1 = $('<td>');
  var $newCol2 = $('<td>');
  var $newCol3 = $('<td>');
  var $newCol4 = $('<td>');
  var $newCol5 = $('<td>');
  var $newCol6 = $('<td>');
  var $newCol7 = $('<td>');
  var $newCol8 = $('<td>');
  var $newRowLink = $('<a>');

  //Column layout tied to the Recommendations table
  $newCol1.text('');
  $newCol2.text(rec.restaurant.restaurantName);
  $newCol3.text(rec.restaurant.category);
  $newCol4.text(rec.restaurant.rating);
  $newCol5.text(rec.restaurant.price);
  $newCol6.text(rec.movie.movieName);
  $newCol7.text(rec.movie.showtime.theatre.name);
  $newCol8.text(rec.movie.movieGenre.toString());

  //Add row attributes to the link
  $newRow.attr('data-toggle', 'modal');
  $newRow.attr('data-target', 'showRecommendationsModal');
  $newRow.append($newCol1);
  $newRow.append($newCol2);
  $newRow.append($newCol3);
  $newRow.append($newCol4);
  $newRow.append($newCol5);
  $newRow.append($newCol6);
  $newRow.append($newCol7);
  $newRow.append($newCol8);
  $newRow.attr('id', index);
  $newRow.on('click', function(event) {
    var rec = recommendations[$(this).attr('id')];

    $('#restRecTitle').
        text(rec.restaurant.restaurantName);
    console.log('This is the image ' + rec.restaurant.imgURL);
    $('#restRecImage').
        attr('src', rec.restaurant.imgURL);
    $('#restRating').
        text(rec.restaurant.rating);
    $('#restCategory').
        text(rec.restaurant.category);
    $('#restCity').
        text(rec.restaurant.location.city);
    $('#movieCardTheater').
        text(rec.movie.showtime.theatre.name);
    $('#movieCardGenre').
        text(rec.movie.movieGenre.splice(', '));
    $('#movieCardDesc').
        text(rec.movie.movieDesc);
    $('#movieCardRating').
        text(rec.movie.movieRating);
    $('#movieCardTitle').
        text(rec.movie.movieName);

    console.log($(this).attr('id'));
    $('#showRecommendationsModal').modal();
  });

  $('#results').append($newRow);
  $('#resultsPanel').show();
}