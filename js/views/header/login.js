define([
	'jquery',
  'underscore',
  'backbone',
  'text!/templates/header/login.html',
	'text!/templates/header/logout.html',
	'models/app/sessionModel',
	'../../libs/jquery/jquery.cookie'
	], 
	
	function($, _, Backbone, loginFormTemplate, logoutFormTemplate,Session){
		
  		var loginView= Backbone.View.extend({
    		initialize: function () {
					var that = this;							
					Session.on('change:auth',function (session) {
						that.render();
					});
				},
				render: function(){
					if(!Session.get('auth')){
						this.$el.html(_.template(loginFormTemplate));
						if($.cookie('remember')=='on') {
							$('#loginEmail').val($.cookie('userEmail'));
							$('#loginPassword').val($.cookie('userPass'));
							$('#rememberMe').prop('checked',true);
						}	
					}else{
						this.$el.html(_.template(logoutFormTemplate));
					}
		  	},
				events: {
					'submit #loginForm': 'login', // On form submission
					'click #logoutBtn':'logout'
				},
				login: function (ev) {
					var loginBtn = $('[type=submit]', ev.currentTarget);
					loginBtn.attr('disabled', 'disabled');
					var creds = $(ev.currentTarget).serializeObject();
					Session.login(creds,{
					  error: function() {
					    console.log("bad creds");
					    loginBtn.removeAttr("disabled");
					  }
					});
	      	return false;
				},
				logout: function (ev) {
					$(ev.currentTarget).text('Logging out').attr('disabled', 'disabled');
					Session.logout();
				}
  		});
  	
		return loginView;
	}
);

