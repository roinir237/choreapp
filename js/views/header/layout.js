define([
	'jquery',
  'underscore',
  'backbone',
  'text!/templates/header/layout.html',
	'../../libs/jquery/jquery.cookie'
	], 
	
	function($, _, Backbone, HeaderLayoutTemplate){
		
		var headerLayoutView= Backbone.View.extend({
  		el: $("#header"),
			initialize: function () {
				this.render();	
			},
			render: function(){
					this.$el.html(_.template(HeaderLayoutTemplate));
	  	},
	  	renderNested: function( view, selector ) {
        var $element = ( selector instanceof $ ) ? selector : this.$el.find( selector );
        view.setElement( $element ).render();
    	}
  	});
	
		return headerLayoutView;
	}
);

