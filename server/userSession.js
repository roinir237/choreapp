var csrf = require('./csrf'),
Users = require('./users');

exports.connect = function (req, res, next) {
	res.send(200);
	//next();
};

exports.login = function (req, res, next) {
	Users.getUserCreds(req.body.email,function(err,creds) {
		if (err) return handleError(err);

		if(creds != null && req.body.password == creds.password) {
			req.session.email = creds.email;
			//req.session.id = creds._id;
			res.send({auth: true, id: creds._id, email: req.session.email});
		}else{
			res.send({auth: false, _csrf: req.session._csrf});
		}
	});
};

exports.logout = function (req, res, next) {
	// Logout by clearing the session
 	req.session.regenerate(function(err){
   		// Generate a new csrf token so the user can login again
   		// This is pretty hacky, connect.csrf isn't built for rest
    	csrf.generate(req, res, function () {
        res.send({_csrf: req.session._csrf});    
    	});
	});
};

exports.isAuthenticated = function (req, res, next) {
 	if(typeof req.session.email !== 'undefined'){
 	  Users.getUserCreds(req.session.email,function (err,creds) {
		  res.send({auth: true, id: creds._id, _csrf: req.session._csrf});
    });
  } else {
    res.send({auth: false, _csrf: req.session._csrf});
  }
};

