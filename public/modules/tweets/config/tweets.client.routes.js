'use strict';

angular.module('tweets')
.config([
	'$stateProvider',
	function($stateProvider) {
		$stateProvider
		.state('me', {
			url: '/me',
			templateUrl: '/modules/tweets/views/me.client.view.jade'
		})
		.state('feed', {
			url: '/',
			templateUrl: '/modules/tweets/views/feed.client.view.jade'
		});
	}
])
.run([
	'$rootScope',
	'$state',
	'Authentication',
	function ($rootScope, $state, Authentication) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParam, fromState, fromParam) {
		
			if ( ((toState.name !== 'signup') && (toState.name !== 'signin')) 
				&& !Authentication.user) {
				event.preventDefault();
				$state.go('signup');		
			}
		});
	}
]);
