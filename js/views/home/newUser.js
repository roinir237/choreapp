define([
	'jquery',
  	'underscore',
  	'backbone',
  	'text!/templates/home/newUser.html',
	], 
	
	function($, _, Backbone, newUserTemplate){

  		var newUserView= Backbone.View.extend({
    			el: $(".content"),
			initialize: function () {
			
			},
			render: function(){	
				this.$el.html(_.template(newUserTemplate));
	  		}
		
  		});
  	
		return newUserView;
	}
);

