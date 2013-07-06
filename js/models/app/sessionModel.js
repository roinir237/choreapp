define([
	'jquery',
  'underscore',
  'backbone',
  'vent',
	'../../libs/jquery/jquery.cookie'
	], 
	
	function($, _, Backbone,Vent){
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
			login: function (creds,callback) {
				that = this;
				this.save (creds, {
					success: function () {
						if(creds.rememberMe == 'on' && creds.email != '' && creds.password != '') {
							$.cookie('userEmail',creds.email);
							$.cookie('userPass',creds.password);
						}else{
							console.log("forgeting user");
							$.cookie('userEmail','');
							$.cookie('userPass','');
						}
										
						$.cookie('remember',creds.rememberMe);
						that.loadFromCookie();
						if(typeof callback !== 'undefined'){
						  if(typeof callback.success == 'function' && that.get('auth')) callback.success();		
					    if(typeof callback.error == 'function' && !that.get('auth')) callback.error();
					  }
					  Vent.trigger("authChanged", that.auth);
					}
				});
			},
			logout: function (creds) {
				var that = this;
				this.destroy ({
					success: function (model, resp) {
						model.clear({silent:true}); 
						that.set ({auth:false, _csrf: resp._csrf});
						Vent.trigger("authChanged", that.auth);
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
