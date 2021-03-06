define([
	'jquery',
  'underscore',
  'backbone',
  
	], 
	
	function($, _, Backbone){
		var UserModel = Backbone.Model.extend({
			urlRoot: '/user',
			initialize: function (id,callback) {
			  if(id != null){ 
			    this.id = id;  
			    this.fetch({
					  success:callback
				  });
				}
			},
			edit: function(props) {
				that = this;
				
				this.save(props,{
					success:function() {
				
					}
				});
			},
			getUser: function(callback){
				this.fetch({
					success:callback
				});
			},
			remove: function() {

			},
			update:function(props,callback) {
				this.save(props,callback);
			}
		});

  	return {model:UserModel};
	}
);
