define([
 	'jquery',
  'underscore',
  'backbone',
  'router', 
	'models/app/sessionModel',
	'models/app/userModel',
	'views/header/layout',
	], 

	function($, _, Backbone, Router, Session,User,HeaderView, MenuView){
		//Should be loaded elsewhere: takes a <form> and converts children to objects
		$.fn.serializeObject = function(){
    			var o = {};
    			var a = this.serializeArray();
    			$.each(a, function() {
        			if (o[this.name] !== undefined) {
            				if (!o[this.name].push) {
                				o[this.name] = [o[this.name]];
            				}
            				o[this.name].push(this.value || '');
       	 			} else {
            				o[this.name] = this.value || '';
        			}
    			});
    			return o;
		};			

    var mainUser = new User.model();

  	var initialize = function(){
  		// Direct all ajax requests to the server and don't cache the response
		  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.url = 'http://localhost:8000' + options.url;
      });
      
			$.ajaxSetup({ cache: false });			

			// When the Session auth changes redirect to the login page if auth==false. Go to home page otherwise.
			Session.on('change:auth', function(){
				if(!Session.get('auth')) {
					 window.location.hash = "/login";
					 console.log(typeof menu.remove); 
					 /*if(typeof menu.remove == 'function'){
					 	menu.remove();
					 } */					
				}else{
					console.log("user is logged in: " + window.location.hash);
					/*if(window.location.hash === "#/login") {
					  window.location.hash = "/";
					}*/
					//menu = new MenuView();
					//menu.render();
				}
			});			

			// Reload main user details when the user authenticates and clear it when he logs out.
			mainUser.listenTo(Session,'change:auth',function() {
				if(Session.get('auth')){	
					var that = this;		
					this.set('id',Session.id);
					mainUser.getUser(function(){
						// TO-DO: need to load the home page only after this is loaded!
						if(window.location.hash === "#/login") {
					  		window.location.hash = "/";
						}
						console.log("hello "+mainUser.get("fname"));
					});
				}else {
				  this.clear();
				}
			});
			
			// Initialize the router check authentication and render Header. 
			Router.initialize();
			
			Session.getAuth(function () {
				var header = new HeaderView();
				header.render();
				require(['views/header/login'], function (LoginView) {				
					loginView = new LoginView();
					header.renderNested(loginView,"#login_container")
				});
				Backbone.history.start();
			});	
  	}

    return {initialize: initialize, mainUser: mainUser};
	}
);
