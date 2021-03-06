define([
	'jquery',
  'underscore',
  'backbone',
  'text!/templates/home/navigation.html',
	], 
	
	function($, _, Backbone, navigationTemplate){
		
    var headerView= Backbone.View.extend({
      el: $("#menu"),
			initialize: function () {
			  
			},
			render: function(){
			  this.$el.html(_.template(navigationTemplate));
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
			  $("#main_navigation li").removeClass('active');
			  //$(ev.currentTarget).removeClass('active');
			  $(ev.currentTarget).parent().addClass('active');
			}
		});
  	
		return headerView;
	}
);

