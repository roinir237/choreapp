
//var config = require('./config');

var mongoose = require('mongoose');

var databaseUrl = "appUser:237ssbbu@ocalhost:28017/choreapp",
	collections = ["users"],
	db = require("mongojs").connect(databaseUrl, collections);

db.users.find()

