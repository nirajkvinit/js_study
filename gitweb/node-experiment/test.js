var files_system = require('fs');
var https = require('https');

files_system.writeFile(__dirname + "/index.html", "<h1>HTML Rocks</h1>");

var dogUrl = "https://raw.githubusercontent.com/LearnWebCode/welcome-to-git/master/images/dog.jpg";
var dogFile = files_system.createWriteStream(__dirname + "/node-dog.jpg");
var request = https.get(dogUrl, function(response){
	response.pipe(dogFile);
});