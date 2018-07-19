require("dotenv").config();


//create variables
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var spotify = require('node-spotify-api');
var request = require('request');

var spotify = new spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var client = new Twitter(keys.twitter);

//Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];
//movie or song
var term = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    term = term + "+" + nodeArgv[i];
  } else{
    term = term + nodeArgv[i];
  }
}

console.log(term);

switch (command){
    case "movie-this":
    searchMovie();
    break

    case "spotify-this-song":
    searchSong();
    break


};




function searchMovie(){
    var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
  
          console.log("\n____________________________________");
          console.log("\nHere is some info on " + term.toUpperCase() + "!\n");
          console.log("Release Date: " + JSON.parse(body).Released);
          console.log("Rating: " + JSON.parse(body).Rated);
          console.log("Genre: " + JSON.parse(body).Genre);
          console.log("Cast: " + JSON.parse(body).Actors);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("Rotten Tomato Score: " + JSON.parse(body).Ratings[1].Value);
          console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
          console.log("\n____________________________________");
          console.log("----------------------------------");
          fs.appendFile("movies.txt", term + ", ", function (err) {
  
            if (err) {
              return console.log(err);
            }
          });
        }
      });
    }
    
function searchSong(){
   return spotify.search({ type: 'track', query: term }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        else {
        console.log("\n____________________________________");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Link: " + data.tracks.items[0].preview_url)
        console.log("____________________________________\n");
        console.log("----------------------------------");
        }
      });
}