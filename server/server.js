var express = require('express');
var connect = require('connect');

var userSession = require('./userSession');
var users = require('./users');
var chores = require('./chores');
var csrf = require('./csrf');


app = express();

var allowedHost = {
  'http://localhost:1337': true
};

var allowCrossDomain = function(req, res, next) {
  	if(allowedHost[req.headers.origin]) {
    		res.header('Access-Control-Allow-Credentials', true);
    		res.header('Access-Control-Allow-Origin', req.headers.origin)
    		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    		res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    		next();
  	} else {
    		res.send(403,{auth: false});
  	}
}

app.configure(function() {
    	app.use(express.cookieParser());
    	app.use(express.session({ secret: '1234567890QWERTY' }));
    	app.use(express.bodyParser());
    	app.use(allowCrossDomain);
    	app.use(csrf.check);
});

// routes
app.options('*',function(req,res,next){
	res.send(200);
});

app.get('/session',userSession.isAuthenticated);
app.post('/session',userSession.login);
app.del('/session/:id', userSession.logout);

app.get('/user/:id', users.getUser);
app.post('/user',users.addUser);

app.get('/chore', chores.getChores);
app.post('/chore',chores.addChore);

app.listen(8000);
console.log("listening on 8000");

