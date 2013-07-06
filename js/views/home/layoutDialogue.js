define([
	'jquery',
  'underscore',
  'backbone',
  'vent',
  'text!/templates/layouts/dialogueBox.html',
	'../../libs/jquery/jquery.cookie'
	], 
	
	function($, _, Backbone, Vent, DialogueTemplate){
		
		var DialogueView= Backbone.View.extend({
  		el: $("body"),
			initialize: function () {
        _.bindAll(this);
				this.render();	
			},
			render: function(){
				this.$el.append(_.template(DialogueTemplate));
	  	},
	  	renderNested: function( view, selector ) {
        var $element = ( selector instanceof $ ) ? selector : this.$el.find( selector );
        view.setElement( $element ).render();
        this.$(".dialogueBox_container").fadeIn("fast");
    	},
    	events:{
    		"click #closeDialogue":"remove"
    	},
    	remove: function() {
        console.log("remove dialogueBox")
    		this.undelegateEvents();
    		var that = this;
    		this.$(".dialogueBox_container").fadeOut("fast",function(){
    			that.$(".dialogueBox_container").replaceWith("");
        	that.stopListening();
        	return that;	
    		});
      }
  	});
	
		return DialogueView;
	}
);

