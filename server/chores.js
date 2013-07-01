var config = require('./config');

var mongoose = require('mongoose');
mongoose.connect(config.dbUrl);

var db = mongoose.connection;
//TO-DO: check if connection is already open...
//db.on('error', console.error.bind(console, 'connection error:'));


// Define the chore schema and the chore model
var Chore = mongoose.model('chores',{
	name: 			String,
	userId: 		mongoose.Schema.ObjectId
});

// Methods
exports.addChore = function(req,res,next) {
  console.log("add a chore");
  var newChore = new User(req.body);
  newChore.save(function(err){
	  console.log("err: " +err);
	  if(err) res.send(404,{err:err});
	  else{
	    console.log("Success");
		  res.send(200,{});
	  }
	});
}

exports.getChores = function(req,res,next){
	var id = req.query.user;
	Chore.find({userId:id},function(err,chores){
		res.send(200,chores);
	});
}



