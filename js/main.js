require.config({
	paths: {
		jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone'
	},
	shim: {
    		underscore: {
      			exports: '_'
    		},
    
		backbone: {
      			deps: ["underscore", "jquery"],
      			exports: "Backbone"
    		}	
	}  
});


require([
	// Load our app module and pass it to our definition function
	'app',
	], 

	function(App){	
  		App.initialize();
	}
);
