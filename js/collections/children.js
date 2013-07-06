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
    	  thatCollection = this;
    	  
    	  var child = new this.model(id,function(){
    	    thatCollection.add(child);
    		  callback();
    	  });
    	   
    	}
  	});
  	
		return ChildrenCollection;
	}
);
