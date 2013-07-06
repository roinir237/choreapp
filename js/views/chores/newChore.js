define([
	'jquery',
  'underscore',
  'backbone',
  'vent',
  'models/app/userModel',
  'text!/templates/chores/addNew.html',
	'models/chores/chore',
	'views/home/layoutDialogue'
	], 
	
	function($, _, Backbone, Vent, User, newChoreTemplate, Chore, Dialogue){

  		var newChoreView= Backbone.View.extend({
			  initialize: function () {
			  		// Subscribe to event listener
					_.bindAll(this,"renderDialogue");
    			Vent.bind('showNewChoreDialogue', this.renderDialogue);
    			
			  },
			  render: function(){	
			  	this.$el.html(_.template(newChoreTemplate,{user:this.user}));		
			  	//$(this.$el.selector).html(this.$el.html());
			  	//console.log(this.el);
				},
				renderDialogue:function(userID){
					var thatView = this
					var dialogue = new Dialogue();

					var user = new User.model(userID,function(){
						console.log(user.get('fname'))
						thatView.user = user;
			  		dialogue.renderNested(thatView,"#dialogueContent");
			  		Vent.bind("newChoreCreated", dialogue.remove);
			  	});
					
				},
	  		remove: function() {
          this.undelegateEvents();
          this.$el.empty();
          this.stopListening();
          return this;
        },
			  events: {
				  'click #saveChore':'submitChore'
			  },
			  submitChore: function(ev){
				  var submitBtn = $(ev.currentTarget);
				  submitBtn.attr('disabled', 'disabled');
				  
				  var props = $(ev.currentTarget).parent().parent().parent().serializeObject();
				  props.userId = this.user.id;
				
				  newChore = new Chore(props);
				  
				  newChore.save({},{
					  success: function(){ 
					  	Vent.trigger("newChoreCreated", props.userId);
					  },
					  error: function(resp,err){
						  submitBtn.removeAttr("disabled");
					  }
				  });
			  }
		
  		});
  	
		return newChoreView;
  }
);

