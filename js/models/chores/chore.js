define([
	'jquery',
  'underscore',
  'backbone',
  
	], 
	
	function($, _, Backbone){
		var ChoreModel = Backbone.Model.extend({
			idAttribute:"_id",
			urlRoot:"/chore",
			initialize: function (id,callback) {

			},
			edit: function(props) {
						
			},
			getChore: function(callback){
			
			},
			remove: function() {

			}
		});
	
  	return ChoreModel;
	}
);
