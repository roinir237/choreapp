var csrf = require('./csrf');

exports.connect = function (req, res, next) {
	console.log("Oh hello there");
	res.send(200);
	//next();
};

exports.login = function (req, res, next) {
	console.log("attempted connection by post");
	if(req.body.loginEmail == 'roinir237@gmail.com' && req.body.loginPassword == '237ssbbu') {
		console.log("Welcome Roi!");  		
		req.session.email = req.body.loginEmail;
		req.session.id = 100;
		res.send({auth: true, id: req.session.id, email: req.session.email});
	}
	//next();
};

exports.logout = function (req, res, next) {
	// Logout by clearing the session
 	req.session.regenerate(function(err){
   		// Generate a new csrf token so the user can login again
   		// This is pretty hacky, connect.csrf isn't built for rest
    		// I will probably release a restful csrf module
    		csrf.generate(req, res, function () {
    			res.send({auth: false, _csrf: req.session._csrf});    
    		});
	});
	//next();  
};

exports.authenticate = function (req, res, next) {
	console.log("attempted connection by get");
 	if(typeof req.session.email !== 'undefined'){
		res.send({auth: true, id: req.session.id, username: req.session.username, _csrf: req.session._csrf});
  	} else {
    		res.send({auth: false, _csrf: req.session._csrf});
  	}
	//next();
};

