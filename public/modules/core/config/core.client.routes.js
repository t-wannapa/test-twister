'use strict';

angular.module('core').config([
	'$locationProvider',
	'$urlRouterProvider',
	'$stateProvider',
	function($locationProvider, $urlRouterProvider, $stateProvider) {
		$locationProvider.hashPrefix('!');
		$urlRouterProvider.otherwise('/');
	}
]);