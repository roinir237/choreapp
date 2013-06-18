define([
	'jquery',
	'underscore',
  	'backbone'
	], 
	
	function($,_, Backbone){
  		var UserCollection = Backbone.Collection.extend({
    			url: '//hidden-depths-4113.herokuapp.com/users'
  		});
  	
		return UserCollection;
	}
);
