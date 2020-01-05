(function (app) {
	// Start by defining the main module and adding the module dependencies
  	angular.module(app.applicationModuleName, app.applicationModuleVendorDependencies);

  	angular.element(document).ready(init);
  	
	function init() {
	    // Then init the app
		angular.bootstrap(document, [app.applicationModuleName]);
	}
}(ApplicationConfiguration));