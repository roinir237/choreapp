define([
	'jquery',
  'underscore',
  'backbone',
  'vent',
  'text!/templates/chores/addNew.html',
	'models/chores/chore',
	], 
	
	function($, _, Backbone, Vent, newChoreTemplate, Chore){

  		var newChoreView= Backbone.View.extend({
    	  el: "#newChoreContainer",
			  initialize: function () {
			  		// Subscribe to event listener
					_.bindAll(this);
    			Vent.bind('changeActiveChild', this.activeChildChanged);
			  },
			  render: function(){	
			  	this.$el.html(_.template(newChoreTemplate));
			  	//$(this.$el.selector).html(this.$el.html());
			  	//console.log(this.el);
				},
	  		remove: function() {
          this.undelegateEvents();
          this.$el.empty();
          this.stopListening();
          return this;
        },
        activeChildChanged:function(childId){
       		this.childId = childId;
       		this.render();
        },
			  events: {
				  'submit #newChoreForm':'createNewChore'
			  },
			  createNewChore: function(ev){
				  /*var submitBtn = $('[type=submit]', ev.currentTarget);
				  submitBtn.attr('disabled', 'disabled');
				  
				  var props = $(ev.currentTarget).serializeObject();
				  props.userId = this.childId;
				  
				  newChore = new Chore(props);*/
				  console.log("submitted form");
				  /*newChore.save({
					  success: function(){
						  
						  submitBtn.removeAttr("disabled");
					  },
					  error: function(resp,err){
						  submitBtn.removeAttr("disabled");
					  }
				  });*/
			  }
		
  		});
  	
		return newChoreView;
  }
);

