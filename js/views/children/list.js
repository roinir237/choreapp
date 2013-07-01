define([
	'jquery',
  'underscore',
  'backbone',
  'app',
  'vent',
  'collections/children',
  'text!/templates/children/list.html'
	], 
	
	function($, _, Backbone, App, Vent, ChildrenCollection, ChildListTemplate){
		
    var childListView= Backbone.View.extend({
      el: ".content",
      collection: new ChildrenCollection(),
			initialize: function () {
			  that = this; 
		    children = new ChildrenCollection();
			  $.each(App.mainUser.get("children"), function(ind,id){
			    children.addChild(id,function(){});
			    console.log("child added");
			  });
			  
			  this.children = children;
			},
			render: function(){
				thatView = this;
			  this.children.on("add",function() {
			    thatView.$el.html(_.template(ChildListTemplate,{names: this}));
			  });

			  this.$el.html(_.template(ChildListTemplate,{names: this.children}));
	  	},
	  	remove: function() {
	  	  this._rendered = false;
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
      },
			events: {
			  'click a':'changeActiveChild'
			},
			changeActiveChild: function(ev) {
				// get the ID of the child that was clicked
				var childId = $(ev.currentTarget).parent().attr('id');
				// trigger event
				Vent.trigger("changeActiveChild", childId);

				// change highlighted child
			  $("#child_list li").removeClass('active');
			  $(ev.currentTarget).parent().addClass('active');
			}
			
		});
  	
		return childListView;
	}
);

