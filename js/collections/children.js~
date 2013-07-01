define([
	'jquery',
	'underscore',
  'backbone',
  'models/app/userModel'
	], 
	function($, _, Backbone, User){
	
	  var ChildrenCollection = Backbone.Collection.extend({
      model:User.model,
    	addChild:function(id,callback) {
    	  that = this;
    	  
    	  var child = new this.model(id,function(){
    	    that.add(child);
    		  callback();
    	  });
    	   
    	}
  	});
  	
		return ChildrenCollection;
	}
);
