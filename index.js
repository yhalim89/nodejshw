var keys = require("./keys.js");

var request = require("request");

var twitter = require("twitter");

var spotify = require("node-spotify-api");

var fs = require("fs");

var command = process.argv[2];
var keyword = process.argv[3];
	if(command === "my-tweets") {

		twitterfeed();
	};


function twitterfeed(){

	client = new twitter(keys.twitterKeys);
    client.get('statuses/user_timeline', { screen_name: 'node282', count: 20 }, function(error, tweets, response) {
	
	for(i= 0; i < 20; i++) {

		console.log(tweets[i].text);
		console.log(tweets[i].created_at);
		}
	
	});
}

if (command === "movie-this"){

	movieSearch();
}

function movieSearch() {


var queryUrl = "http://www.omdbapi.com/?t=" + keyword + "&y=&plot=short&apikey=40e9cece";


request(queryUrl, function(error, response, body) {
	if (!error && response.statusCode === 200) {
    
    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log(JSON.parse(body).imdbRating);
    for(i = 0; i < 1; i++){
    	console.log(JSON.parse(body).Ratings[1]);
    };
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);
  }

});

}

if(command === "spotify-this-song") {

		spotifyThis();
	};

function spotifyThis(){



	client = new spotify(keys.spotifyKeys);
	client.search({ type: 'track', query: keyword }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
		 }

		console.log("Artist: "+data.tracks.items[0].artists[0].name);
		console.log("Song Name: "+data.tracks.items[0].name);
		console.log("Link: "+data.tracks.items[0].external_urls.spotify);
		console.log("Album: "+data.tracks.items[0].album.name);
 
     
	});
}


if(command === "do-what-it-says") {

	fs.readFile("random.txt", "utf8", function(err, data) {
    
    if (err) {
      return console.log(err);
    }

   var dataArr = data.split(",");

    command = dataArr[0];
    keyword = dataArr[1];
    console.log(command);
    console.log(keyword);
        if (command === "my-tweets"){
            twitterfeed();
        }
        
        if (command === "spotify-this-song"){
            spotifyThis();
        }
        
        if (command === "movie-this"){
            movieSearch();
        }
    });  
};