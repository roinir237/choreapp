define([
	'jquery',
  	'underscore',
  	'backbone',
	'../../libs/jquery/jquery.cookie'
	], 
	
	function($, _, Backbone){
		var SessionModel = Backbone.Model.extend({
			urlRoot: '/session',
			initialize: function () {
				var that = this;

				this.loadFromCookie();

				$.ajaxPrefilter (function (options, originalOptions, jqXHR) {
					options.xhrFields = {withCredentials: true};

					if(typeof that.get('_csrf') !== 'undefined') {
						jqXHR.setRequestHeader('X-CSRF-Token', that.get('_csrf'));
					}

					var originalSuccess = options.success;

    					options.success = function (resp) {
						if(resp.auth == false) {
							that.set({auth:false, _csrf: resp._csrf});
						}	
                				originalSuccess(resp);
    					};
				});
			},
			loadFromCookie: function () {
				this.set('userEmail',$.cookie('userEmail'));
				this.set('userPass',$.cookie('userPass'));
				this.set('remember',$.cookie('remember'));
			},
			login: function (creds) {
				that = this;
				
				this.save (creds, {
					success: function () {
						if(creds.rememberMe == 'on' && creds.loginEmail != '' && creds.loginPassword != '') {
							$.cookie('userEmail',creds.loginEmail);
							$.cookie('userPass',creds.loginPassword);
						}else{
							console.log("forgeting user");
							$.cookie('userEmail','');
							$.cookie('userPass','');
						}
										
						$.cookie('remember',creds.rememberMe);
						that.loadFromCookie();				
					}
				});
			},
			logout: function (creds) {
				var that = this;
				this.destroy ({
					success: function (model, resp) {
						model.clear();
						model.id = null;
			
						that.set ({auth:false, _csrf: resp._csrf});
					}
				});

			},
			getAuth: function (callback) {
				this.fetch({
					success: callback				
				});
			}			
		});
	
  		return new SessionModel();
	}
);
