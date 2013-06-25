define([
	'jquery',
  'underscore',
  'backbone',
  'collections/children',
  'text!/templates/children/list.html'
	], 
	
	function($, _, Backbone, ChildrenCollection, ChildListTemplate){
		
    var childListView= Backbone.View.extend({
      el: $(".content"),
			initialize: function (user) {
			  childCollection = new ChildrenCollection();
			  $.each(mainUser.children, function(ind,id){
			    childCollection.addChild(id);
			    console.log("added child: " + id);
			  });
			 
			},
			render: function(){
			  this.$el.html(_.template(ChildListTemplate));
	  	},
	  	remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        this.stopListening();
        return this;
      },
			events: {
			  'click a':'changeActive'
			},
			changeActive: function(ev) {
			  $("#child_list li").removeClass('active');
			  //$(ev.currentTarget).removeClass('active');
			  $(ev.currentTarget).parent().addClass('active');
			}
			
		});
  	
		return childListView;
	}
);

