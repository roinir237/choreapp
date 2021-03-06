define([
	'jquery',
  'underscore',
  'backbone',
  'text!/templates/home/newUser.html',
	'models/app/userModel',
	'models/app/sessionModel'
	], 
	
	function($, _, Backbone, newUserTemplate, User,Session){

  		var newUserView= Backbone.View.extend({
    	  el: $(".content"),
			  initialize: function () {
			    this.listenTo(Session, "change:auth", function() {
			      if(Session.get('auth')){
			        this.remove();
			      }
			    });
			  },
			  render: function(){	
				  this.$el.html(_.template(newUserTemplate));
	  		},
	  		remove: function() {
          this.undelegateEvents();
          this.$el.empty();
          this.stopListening();
          return this;
        },
			  events: {
				  'submit #newUserForm':'createNewUser'
			  },
			  createNewUser: function(ev){
				  var submitBtn = $('[type=submit]', ev.currentTarget);
				  submitBtn.attr('disabled', 'disabled');
				  
				  var props = $(ev.currentTarget).serializeObject();
				  
				  newUser = new User.model();
				  console.log(JSON.stringify(newUser));
				  newUser.update(props,{
					  success: function(){
						  Session.login(props,{
						    success:function() {
						      newUser.destroy();
						    },
						    error:function() {
						      newUser.destroy();
						    }
						  });
					  },
					  error: function(resp,err){
						  submitBtn.removeAttr("disabled");
						  newUser.destroy();
					  }
				  });
      		return false;
			  }
		
  		});
  	
		return newUserView;
  }
);

