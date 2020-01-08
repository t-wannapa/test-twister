'use strict';

angular.module('core').config([
	'$locationProvider',
	'$urlRouterProvider',
	'$stateProvider',
	function($locationProvider, $urlRouterProvider, $stateProvider) {
		$locationProvider.hashPrefix('!');
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/modules/tweets/views/feed.client.view.jade'
		});
	}
]);