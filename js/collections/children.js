define([
	'jquery',
	'underscore',
  'backbone',
  'models/app/userModel'
	], 
	function($, _, Backbone, User){
	
	  var ChildrenCollection = Backbone.Collection.extend({
      model:User.model,
    	addChild:function(id) {
    	  var child = new this.model(id);
    		this.add(child); 
    	}
  	});
  	
		return ChildrenCollection;
	}
);
