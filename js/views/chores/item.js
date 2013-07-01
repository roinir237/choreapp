define([
	'jquery',
  	'underscore',
  	'backbone',
  	'text!/templates/chores/item.html'
	], 
	
	function($, _, Backbone, ChoreItemTemplate){
		
    	var childListView= Backbone.View.extend({
      		tagName: 'tr',
      		//collection: new ChildrenCollection(),
			initialize: function () {
				this.render();
			},
			render: function(){
				// this needs time and name defiened to show in the template.
				var compiled =_.template(ChoreItemTemplate,{chore:this.model});
				this.$el.html(compiled);
	  		},
	  		remove: function() {
	  			this._rendered = false;
        		this.undelegateEvents();
        		this.$el.empty();
        		this.stopListening();
        		return this;
      		},
			
		});
  	
		return childListView;
}
);

