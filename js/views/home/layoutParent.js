define([
	'jquery',
  'underscore',
  'backbone',
  'text!/templates/home/layoutParent.html',
	'../../libs/jquery/jquery.cookie'
	], 
	
	function($, _, Backbone, HomeLayoutTemplate){
		
		var parentHomeLayoutView= Backbone.View.extend({
  		el: $(".content"),
			initialize: function () {
				this.render();	
			},
			render: function(){
					this.$el.html(_.template(HomeLayoutTemplate));
	  	},
	  	renderNested: function( view, selector ) {
        var $element = ( selector instanceof $ ) ? selector : this.$el.find( selector );
        view.setElement( $element ).render();
    	}
  	});
	
		return parentHomeLayoutView;
	}
);

