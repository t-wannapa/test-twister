'use strict';

angular.module('tweets').controller('MeController', [
	'$scope',
	'$http',
	'Authentication',
	function($scope, $http, Authentication) {
		$scope.profile = {
			name: Authentication.user.displayName,
			screenName: Authentication.user.username,
			tweetCount: 2,
			followerCount: 34,
			followingCount: 140
		};

		$http.get('/statuses/me_timeline')
		.then(
			function successCallback(response) {
				$scope.tweets = response.data;
			  },
			  function errorCallback(response) {
				$scope.error = response.message;
		  });
	}
]);