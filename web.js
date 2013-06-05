var express = require("express");
var app = express();
app.use(express.logger());

app.get('/users', function(request, response) {
	var data = [
			{fname: 'Roi',lname: 'Nir',age: '21',id:'1'},
			{fname: 'Anna',lname: 'McEntire',age: '22',id:'2'}
		
		];
	response.set("Access-Control-Allow-Origin", "*");
	response.json(data);
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
