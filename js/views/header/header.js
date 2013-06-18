define([
	'jquery',
  	'underscore',
  	'backbone',
  	'text!/templates/home/login.html',
	'text!/templates/home/logout.html',
	'models/app/sessionModel',
	'../../libs/jquery/jquery.cookie'
	], 
	
	function($, _, Backbone, loginFormTemplate, logoutFormTemplate,Session){
		//Should be loaded elsewhere: takes a <form> and converts children to objects
		$.fn.serializeObject = function(){
    			var o = {};
    			var a = this.serializeArray();
    			$.each(a, function() {
        			if (o[this.name] !== undefined) {
            				if (!o[this.name].push) {
                				o[this.name] = [o[this.name]];
            				}
            				o[this.name].push(this.value || '');
       	 			} else {
            				o[this.name] = this.value || '';
        			}
    			});
    			return o;
		};			


  		var headerView= Backbone.View.extend({
    			el: $("#login_container"),
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
				$('[type=submit]', ev.currentTarget).val('Logging in').attr('disabled', 'disabled');
				var creds = $(ev.currentTarget).serializeObject();
				Session.login(creds);
      				return false;
			},
			logout: function (ev) {
				$(ev.currentTarget).text('Logging out').attr('disabled', 'disabled');
				Session.logout();
			}
  		});
  	
		return headerView;
	}
);

