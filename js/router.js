define([
	'jquery',
  'underscore',
  'backbone',
	'models/app/sessionModel'
	], 
	
	function($, _, Backbone,Session){
 
  		var AppRouter = Backbone.Router.extend({
    		routes: {
					'' : 'home',
					'login':'showNewUser'
				}
  		});

  		var initialize = function(){
			  var app_router = new AppRouter;		

			  app_router.on('route:showNewUser', function(){
				  if(!Session.get('auth')) {
					  console.log('User needs to login');
					  require(['views/user/newUser'], function (newUserPage) {				
						  newUserForm = new newUserPage();
						  newUserForm.render();	
					  });
				  }
			  });
			
			  app_router.on('route:home', function(){
				  console.log('Home page loaded');
				  require(['views/children/list','views/chores/list','views/chores/newChore'], function (ChildrenListView,ChoreListView,newChoreView) {				
						childrenList = new ChildrenListView();
						childrenList.render();
						choreList = new ChoreListView();
						newChore = new newChoreView();
					});
			  });

		};

		var listenToRoutes = function(app_router) {
		
	
		};

  		return {initialize: initialize};
});
