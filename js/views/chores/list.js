define([
	'jquery',
  'underscore',
  'backbone',
  'vent',
  'collections/chores',
  'views/chores/item',
  'text!/templates/chores/list.html'
 	], 
	
	function($, _, Backbone, Vent, ChoreCollection, ChoreItemView, ChoreListTemplate){
		
    var choreListView= Backbone.View.extend({
			initialize: function () {
					// Subscribe to event listener
				_.bindAll(this, 'changeActiveChild');
				_.bindAll(this, 'updateList');
    		Vent.bind('changeActiveChild', this.changeActiveChild);
    		Vent.bind('newChoreCreated', this.updateList);
			},
			render: function(){
				var compiled = _.template(ChoreListTemplate);
				that = this;
				if(typeof this.collection !== 'undefined') {
					this.$el.css("display","none");
					this.$el.html(compiled).show("fast");

					this.collection.each(function(chore){
						var choreItem = new ChoreItemView({model:chore});
						that.$("tbody").css("display","none");
						that.$("tbody").append(choreItem.el).fadeIn("fast");
					});
				}
	  	},
	  	events:{
	  		"click #addChoreBtn":"addChore"
	  	},
	  	addChore:function(ev){
	  		Vent.trigger("showNewChoreDialogue", this.childId);
	  		console.log("triggered showNewChoreDialogue event");
	  	},
      changeActiveChild:function(childId){
      	that = this;
      	this.childId = childId;
      	this.collection = new ChoreCollection({user:childId});
      	this.collection.load({	
      		success:function(){
      			that.render();
      		}
      	});	
      },
      updateList:function(userID){
      	var that = this;
      	if(userID == this.childId ) {
					this.collection.load({	
      			success:function(){
      				that.render();
      			}
      		});	   		
      	}
      }
			
		});
  	
		return choreListView;
	}
);

