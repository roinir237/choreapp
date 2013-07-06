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
					'login':'loginPage' 
				}
  		});

  		var initialize = function(){
			  var app_router = new AppRouter;		

			  app_router.on('route:loginPage', function(){
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
				  require(['views/home/layoutParent', 'views/home/childList','views/chores/list','views/chores/newChore'], function (HomeLayoutView,ChildListView,ChoreListView,newChoreView) {				
						pageLayout = new HomeLayoutView();
						pageLayout.render();
						childList = new ChildListView();
						pageLayout.renderNested(childList,"#child_list");
						choreList = new ChoreListView();
						pageLayout.renderNested(choreList,"#chore_list");
						newChore = new newChoreView();
						newChore.setElement($("body"));
					});
			  });

		};

		var listenToRoutes = function(app_router) {
		
	
		};

  		return {initialize: initialize};
});
