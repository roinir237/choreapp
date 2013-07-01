define([
 	'jquery',
  'underscore',
  'backbone',
  'router', 
	'models/app/sessionModel',
	'models/app/userModel',
	'views/header/header',
	'views/menu/menu'
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
		  $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.url = 'http://localhost:8000' + options.url;
      });
      
			$.ajaxSetup({ cache: false });			

			Session.on('change:auth', function(){
				if(!Session.get('auth')) {
					 window.location.hash = "/login";
					 console.log(typeof menu.remove); 
					 if(typeof menu.remove == 'function'){
					 	menu.remove();
					 } 					
				}else{
					console.log("user is logged in: " + window.location.hash);
					if(window.location.hash === "#/login") {
					  window.location.hash = "/";
					}
					menu = new MenuView();
					menu.render();
				}
			});			

			mainUser.listenTo(Session,'change:auth',function() {
				if(Session.get('auth')){	
					var that = this;		
					this.set('id',Session.id);
					this.getUser(function(){
						console.log("welcome " +that.get("fname"));
					});
				}else {
				  console.log("Bye " +this.get("fname"));
				  this.clear();
				}
			});
			
			Router.initialize();
			
			Session.getAuth(function () {
				var header = new HeaderView();
				header.render();
				Backbone.history.start();
			});	
  	}

    return {initialize: initialize, mainUser: mainUser};
	}
);
