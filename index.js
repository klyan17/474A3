var express = require('express');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8080;


function send404Response(response) {
	response.writeHead(404, {"Content-Type" : "text/plain"});
	response.write("Error 404: Page not found");
	response.end();
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.get('/', function(request, response) {
	response.sendFile(__dirname + "/" + "index.html");
});


app.listen(port);
console.log('Server running on port: ' + port);