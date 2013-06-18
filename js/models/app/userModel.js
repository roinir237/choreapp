define([
	'jquery',
  	'underscore',
  	'backbone',
	], 
	
	function($, _, Backbone){
		var UserModel = Backbone.Model.extend({
			urlRoot: '/user/:id',
			initialize: function (id) {
				
			},
			edit: function(props) {
				that = this;
				
				this.save(props,{
					success:function() {
				
					}
				});
			},
			remove: function() {

			}
		});
	
  		return new UserModel();
	}
);
