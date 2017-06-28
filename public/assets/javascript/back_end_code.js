
var sessionUser = sessionStorage.getItem('email');



$(document).ready(function() {


  // Initialize Firebase

  var config = {
    apiKey: 'AIzaSyDwvX6WztC5DIZ3fZaWG7O8z86qBrIndyk',
    authDomain: 'te2timekeeper.firebaseapp.com',
    databaseURL: 'https://te2timekeeper.firebaseio.com',
    projectId: 'te2timekeeper',
    storageBucket: 'te2timekeeper.appspot.com',
    messagingSenderId: '679714174028',
  };

  firebase.initializeApp( config );

  // Get a reference to the database service

  // Get a reference to the database service
  var users = firebase.database().ref('users/');

  users.orderByChild('userDisplayName').on('value', function(snapshot) {

    $('#userTable').empty();
    //Console.log(snapshot.val());
    snapshot.forEach(function(childSnapshot) {

      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      //Console.log(childKey);
      //console.log(childData);
      var $deleteButton = $('<i>');
      $deleteButton.addClass('fa fa-trash-o');
      $deleteButton.attr('aria-hidden', 'true');
      $deleteButton.attr('id', childKey);
      $deleteButton.on('click', deleteUser);

      var $newRow = $('<tr>');
      var $newUserFlags = $('<td>');
      var $newUserActive = $('<td>');
      var $newUserDisplayName = $('<td>');
      var $newUserEmail = $('<td>');
      var $newUserRole = $('<td>');
      var $newLastLogin = $('<td>');
      var $newCreateDate = $('<td>');
      var $delBtnCell = $('<td>');

      $newUserDisplayName.text(childData.userDisplayName);
      $newUserEmail.text(childData.userEmail);
      $newUserRole.text(childData.userRole);
      $newLastLogin.text(childData.lastLoginDate);
      $newCreateDate.text(childData.entryDate);

      //Var hours = moment.duration(minAway, 'minutes').asHours();
      //var time = moment(hours, 'hours').format("HH:mm");

      $delBtnCell.append($deleteButton);

      $newRow.append($delBtnCell);
      $newRow.append($newUserFlags);
      $newRow.append($newUserActive);
      $newRow.append($newUserDisplayName);
      $newRow.append($newUserEmail);
      $newRow.append($newUserRole);
      $newRow.append($newLastLogin);
      $newRow.append($newCreateDate);

      $('#userTable').append($newRow);
    });
  });

  //Set up the initial Screen and hide the non used panels
  $('#userManager').hide();

  //Check to see if there is a logged in user otherwise don't display the full page.
  if (!sessionStorage.getItem('email')) {
    console.log('Checking the user credentials--- ');
    $('.panel').hide();
    console.log(sessionUser);
  } else {
    $('.panel').show();
    if (sessionStorage.getItem('userRole') != 'Admin') {
      $('#adminMenu').hide();
    }
  }
  //Check to see if the logged on user is an admin before displaying the Admin Menu

  function getAppUserProfile() {
    //Get the app profile from the user that just logged in.
  }

  $('#signout').click(function() {
    console.log('Signing out');
    firebase.auth().signOut().then(function() {
      $('#user-name').
          text('You are now signed out... Please sign in to use the app');
      console.log('Signed Out');
      sessionStorage.clear();
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  });

  $('#btnRefreshRestaurants').click(function() {

    get4SquareVenues('movie%20theater');
    get4SquareVenues('restaurants');
    pullMovies();

  });

});

/**
 * This function takes a set of Query Terms and returns venues from the 4Square Service
 * @param queryTerms
 * @returns {Array}
 */
function get4SquareVenues(queryTerms) {
  //Connect to FourSquare and run the search based on the paramenters set.
  var url = '';
  var ll = sessionStorage.getItem('currentLat') + '%2C%20' +
      sessionStorage.getItem('currentLong');
  var limit = 10;
  url = 'https://api.foursquare.com/v2/venues/explore?v=20131016';
  url += '&client_id=' + 'XUYA5NQ3ME2D0SSMNKUA5ALL4I0DBWG13M42U1PQII5PBWDH';
  url += '&client_secret=' +
      'BNWEGFBMCZW0QA5VA2E1HZ20NG1FT4D0OEBBVQIRICFGTHTY';
  url += '&ll=' + ll;
  url += '&limit=' + limit;
  url += '&query=' + queryTerms;
  url += '&venuePhotos=1';
  url += '&radius=' + '17600';

  //url = "https://api.foursquare.com/v2/venues/search?v=20161016&ll=41.878114%2C%20-87.629798&query=coffee&intent=checkin&client_id=XUYA5NQ3ME2D0SSMNKUA5ALL4I0DBWG13M42U1PQII5PBWDH&client_secret=BNWEGFBMCZW0QA5VA2E1HZ20NG1FT4D0OEBBVQIRICFGTHTY";
  console.log(url);

  addEventLogEntry(sessionStorage.getItem('email'), '4SquareQuery', url);

  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(response) {

    addEventLogEntry(sessionStorage.getItem('email'), '4SquareQueryResponse',
        response.response);

    console.log('This is the response object: ');
    console.log(response.response);
    var items = response.response.groups[0].items;
    console.log(' This is the list of items from 4Square ');
    console.log(items);

    if (queryTerms == 'movie%20theater') {
      for (var i = 0; i < items.length; i++) {
        addTheaterRow(items[i].venue);
      }
    }

    if (queryTerms == 'restaurants') {
      for (var i = 0; i < items.length; i++) {
        addRestaurantRow(items[i].venue);
      }
    }

  });

}

/**
 * This function takes an individual venue item and adds it to a table row object
 * @param venue
 */
function addTheaterRow(venue) {

  var $newRow = $('<tr>');
  var $newCol1 = $('<td>');
  var $newCol2 = $('<td>');
  var $newCol3 = $('<td>');
  var $newCol4 = $('<td>');
  var $newCol5 = $('<td>');
  var $newCol6 = $('<td>');
  var $newCol7 = $('<td>');

  //Column layout tied to the theater table
  $newCol1.text('');
  $newCol2.text(venue.name);
  $newCol3.text(venue.location.address);
  $newCol4.text(venue.location.city);
  $newCol5.text(venue.location.postalCode);
  $newCol6.text(venue.location.distance);

  $newRow.append($newCol1);
  $newRow.append($newCol2);
  $newRow.append($newCol3);
  $newRow.append($newCol4);
  $newRow.append($newCol5);
  $newRow.append($newCol6);

  $('#theaterTable').append($newRow);

}

/**
 * This function takes an individual venue item and adds it to a table row object
 * @param venue
 */
function addRestaurantRow(venue) {

  var $newRow = $('<tr>');
  var $newCol1 = $('<td>');
  var $newCol2 = $('<td>');
  var $newCol3 = $('<td>');
  var $newCol4 = $('<td>');
  var $newCol5 = $('<td>');
  var $newCol6 = $('<td>');
  var $newCol7 = $('<td>');

  //Column layout tied to the theater table

  $newCol1.text(venue.name);
  $newCol2.text(venue.location.address);
  $newCol3.text(venue.location.city);
  $newCol4.text(venue.categories[0].name);
  $newCol5.text(venue.location.distance);
  $newCol6.text(venue.rating);  //rating
  $newCol7.text(venue.price.tier);  //price

  $newRow.append($newCol1);
  $newRow.append($newCol2);
  $newRow.append($newCol3);
  $newRow.append($newCol4);
  $newRow.append($newCol5);
  $newRow.append($newCol6);
  $newRow.append($newCol7);

  $('#restaurantTable').append($newRow);

}

/**
 * This function takes the Key of the selected user and deletes it from the firebase table
 */
function deleteUser() {
  //Connect to the db
  console.log('Delete ID ' + $(this).attr('id'));
  //Delete the user using the key from the DB
  var user = firebase.database().ref('users/' + $(this).attr('id'));
  user.remove();
}

/**
 * This function adds an entry into the event log for troubleshooting searches later
 * @param {string} userName The username of the person creating the entry
 * @param eventType
 * @param eventText
 */
function addEventLogEntry(userEmail, eventType, eventText) {
  console.log('---------Add Event function');
  //Prepare the user object
  var event = {
    userEmail: userEmail,
    eventType: eventType,
    eventText: eventText,
    eventDate: moment(Date.now()).format('YYYY-MM-DD HH:mm'),
    latitude: sessionStorage.getItem('currentLat'),
    longitude: sessionStorage.getItem('currentLong'),
  };

 


  //Get a unique key
  //Get a key for a new Post.
  var newEventID = firebase.database().ref().child('events').push().key;

  //Add the event
  firebase.database().ref('events/' + newEventID).set(event);

}
/**
 * This function gets todays date and puts it in format needed for API
 * @param m Todays date
 * @param date Todays date in YYYY-MM-DD format
 * @param {string} zipCode Zip code passed from user input
 */


function pullMovies() {
  var m = moment().get('date');
  var date = moment().format('YYYY-MM-DD');

//need to pass input zip code to this var
  var zipCode = '';
  var queryURL = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + date + '&lat=' + currentLat + '&lng=' + currentLong + '&radius=10&api_key=52hkegdyrb7rrj8eraadpwg4';

  $.ajax({
    url: queryURL,
    method: 'GET',
  }).done(function(response) {
    console.log(response);
    console.log(response[0].title + '  ' + response[0].longDescription + '  ' +
        response[0].genres);
    for (var i = 0; i < response.length; i++) {
      var movie = {
        theaterName: response[i].title,
        location: {
          address: '',
          city: '',
          state: '',
          zip: '',
          distance: '',
        },
        movieName: '',
        movieDesc: '',
        movieGenre: '',
      };

      movies.push(movie);
    }
    console.log(movies);
  });
}
;

var movies = [];
var restaurants = [];
var recommendations = [];
var recommendation =
    {
      restaurant: {
        restaurantName: 'Tiki Taco',
        location: {
          address: '12234 Any Street',
          city: 'Ocoee',
          state: 'FL',
          zip: '34761',
          distance: '.5 miles',
        },
        category: 'Sushi',
        price: '3',
      },
      movie: {
        theaterName: 'Jo Mamas House',
        location: {
          address: '65 Butter Ave.',
          city: 'Ocoee',
          state: 'FL',
          zip: '34761',
          distance: '1.0 miles',
        },
        movieName: 'Transformers: The Last Battle',
        movieDesc: 'Theyre more than meets the eye',
        movieGenre: 'Action',

      },
    };

/**
 * This function returns an array of three recommendation objects back to the caller
 * @param {object} userPref
 * @return {array} recommendations
 */
function getRecommendations(userPref) {




  //TODO Add functionality to select three of the closest movie theaters

  //TODO Add functionality to select three of the closest restaurants
  for (var i = 0; i < 3; i++) {
    var newRec = recommendation;
    newRec.movie.movieName = ' This is movie #' + i;
    recommendations.push(newRec);
  }

  return recommendations;

}


