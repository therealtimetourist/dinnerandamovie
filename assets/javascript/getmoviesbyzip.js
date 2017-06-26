//need to add momentjs script into html   
<script src="https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js"></script>

       
//gets today's date and puts in format needed for API
     var m = moment().get('date');
     var date = moment().format("YYYY-MM-DD");


//need to pass input zip code to this var
     var zipCode = "32825"


      function pullMovies() {
      

      var queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + zipCode + "&api_key=52hkegdyrb7rrj8eraadpwg4";
      
      

        $.ajax({url: queryURL,method: "GET"})
        .done(function(response) {
          console.log(response);
          $("#movie-list").append(response[0].title + "<br>" + response[0].longDescription + "<br>" + response[0].genres);
          

        });

        
      };
      pullMovies();

      
       