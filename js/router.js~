define([
	'jquery',
  	'underscore',
  	'backbone',
	'models/app/sessionModel',
	'views/users/list',
	'views/header/header'
	], 
	
	function($, _, Backbone,Session, UserListView,HeaderView){
 
  		var AppRouter = Backbone.Router.extend({
    			routes: {
				'' : 'home',
				'login':'showNewUser',
      				'projects': 'showProjects',
      				'users': 'showUsers'
			}
  		});

  		var initialize = function(){
			var app_router = new AppRouter;		
	
			app_router.on('route:home', function(actions){
				console.log('Home page loaded');
				var userList = new UserListView();
				userList.render();
			});

			app_router.on('route:showNewUser', function(actions){
				if(!Session.get('auth')) {
					console.log('User needs to login');
					require(['views/home/newUser'], function (newUserPage) {				
						newUserForm = new newUserPage();
						newUserForm.render();	
					});
				}

			});


			app_router.on('route:showProjects', function(){
				console.log('show projects');
			});

			app_router.on('route:showUsers', function(){
				console.log('show users');
	     		});

		};

		var listenToRoutes = function(app_router) {
		
	
		};

  		return {initialize: initialize};
});
