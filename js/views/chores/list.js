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
      el: "#chore_list",
			initialize: function () {
					// Subscribe to event listener
				_.bindAll(this, 'changeActiveChild');
    		Vent.bind('changeActiveChild', this.changeActiveChild);
			},
			render: function(){
				var compiled = _.template(ChoreListTemplate);
				that = this;

				this.$el.html(compiled);

				this.collection.each(function(chore){
					var choreItem = new ChoreItemView({model:chore});
					that.$("tbody").append(choreItem.el);
				});
				
				$(this.$el.selector).html(this.$el.html());
	  	},
      changeActiveChild:function(childId){
      	that = this;

      	this.collection = new ChoreCollection({user:childId});
      	this.collection.load({	
      		success:function(){
      			that.render();
      		}
      	});	
      }
			
		});
  	
		return choreListView;
	}
);

