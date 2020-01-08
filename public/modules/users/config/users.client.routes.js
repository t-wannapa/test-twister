'use strict';

// Setting up route
angular.module('users').config([
	'$stateProvider',
	function($stateProvider) {
		$stateProvider
		.state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.jade'
		})
		.state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.jade'
		});
	} 
]);