define([
	'jquery',
	'underscore',
  'backbone',
  'models/chores/chore'
	], 
	function($, _, Backbone, Chore){
	
		var ChoreCollection = Backbone.Collection.extend({
      model:Chore,
      url:"/chore",
      initialize:function(options) {
      	this.user = options.user;
      	
      },
      load:function(options){
      	this.fetch({
      		data: {user: this.user},
      		success: options.success,
      		error: options.error
      	});
      }
  	});
  	
		return ChoreCollection;
	}
);
