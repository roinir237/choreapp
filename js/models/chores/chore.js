define([
	'jquery',
  'underscore',
  'backbone'
	], 
	
	function($, _, Backbone){
		var ChoreModel = Backbone.Model.extend({
			idAttribute:"_id",
			urlRoot:"/chore",
			initialize: function (id,callback) {
				_.bindAll(this);
			},
			edit: function(props) {
				this.save({
					success:function(){
						props.success();
					},
					error:props.error()
				});
			},
			getChore: function(callback){
			
			},
			remove: function() {

			}
		});
	
  	return ChoreModel;
	}
);
