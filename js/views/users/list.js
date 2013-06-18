define([
	'jquery',
  	'underscore',
  	'backbone',
  	'collections/users',
  	'text!/templates/users/list.html'
	], 
	
	function($, _, Backbone, UserCollection,userListTemplate){
		
  		var UserListView = Backbone.View.extend({
    			el: $(".content"),
			initialize:function() {},
			render: function(){
				this.$el.html( _.template(userListTemplate));
      				//var userCollection = new UserCollection();
			/*	var that = this;

				userCollection.fetch({
					success:function (usersList) {
							var compiledTemplate = _.template(userListTemplate, {users:usersList.models});
							that.$el.html(compiledTemplate);
					},
					error: function(res,xhr) {
						console.log("ON ERROR");
						console.log(res);
						console.log(xhr)
					}	
				});*/
      			}
  		});
  	
		return UserListView;
	}
);

