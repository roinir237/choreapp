var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
	var data = {
		fname: 'Roi',
		lname: 'Nir',
		age: '21'};

  response.send(data);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

//var mongo = require('mongodb');

//var mongoUri = process.env.MONGOLAB_URI || 
//  process.env.MONGOHQ_URL || 
//  'mongodb://localhost/mydb'; 
//
