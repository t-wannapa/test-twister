(function (window) {
	'use strict';

	var applicationModuleName = 'twister';

	var service = {
		applicationEnvironment: window.env,
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: ['ui.router', 'ui.bootstrap', 'ui.router.state.events'],
		registerModule: registerModule
	};

	window.ApplicationConfiguration = service;
	
	// Add a new vertical module
 	function registerModule(moduleName, dependencies) {
 		
    	// Create angular module
    	angular.module(moduleName, dependencies || []);
    	// Add the module to the AngularJS configuration file
    	angular.module(applicationModuleName).requires.push(moduleName);
  	}
}(window));