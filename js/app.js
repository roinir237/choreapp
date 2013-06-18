define([
 	'jquery',
  	'underscore',
  	'backbone',
  	'router', 
	'models/app/sessionModel',
	'views/header/header'
	], 

	function($, _, Backbone, Router, Session,HeaderView){
  		var initialize = function(){
			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        			options.url = 'http://localhost:8000' + options.url;
      			});

			Router.initialize();

			Session.on('change:auth', function(){
				if(!Session.get('auth')) {
					 window.location.hash = "/login"; 					
				}else{
					window.location.hash = "/";
				}
			});
				
			
			Session.getAuth(function () {
				var header = new HeaderView();
				header.render();
				Backbone.history.start();
			});	
  		}

  		return {initialize: initialize};
	}
);
