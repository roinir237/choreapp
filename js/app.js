define([
	'jquery',
  	'underscore',
  	'backbone',
  	'router', // Request router.js
	], 
	
	function($, _, Backbone, Router){
  		var initialize = function(){
    			// Pass in our Router module and call it's initialize function
			console.log('app: launching router.js');
    			Router.initialize();
  		}

  		return {initialize: initialize};
	}
);
