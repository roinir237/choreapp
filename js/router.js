define([
	'jquery',
  	'underscore',
  	'backbone',
	], 
	
	function($, _, Backbone){
 
  		var AppRouter = Backbone.Router.extend({
    			routes: {
				'' : 'home',
      				'projects': 'showProjects',
      				'users': 'showUsers'}
  		});

  		var initialize = function(){
			var app_router = new AppRouter;
				console.log('router: listening for routes');

				app_router.on('route:home', function(actions){
			      		console.log('Home page loaded');
			   	});

			    	app_router.on('route:showProjects', function(){
					console.log('show projects');
			    	});
			    	app_router.on('route:showUsers', function(){
			    	});
			    	

			    	Backbone.history.start();
		   	};

  		return {initialize: initialize};
});
