'use strict';

angular.module('tweets').controller('MeController', [
	'$scope',
	'Authentication',
	function($scope, Authentication) {
		$scope.profile = {
			name: Authentication.user.displayName,
			screenName: Authentication.user.username,
			tweetCount: 2,
			followerCount: 34,
			followingCount: 140
		};

		$scope.tweets = [
			{
				name: 'test test',
				screenName: 'ssss',
				tweetText: 'Hello 1'
			},
			{
				name: 'test test',
				screenName: 'ssss',
				tweetText: 'Hello World2'
			},
			{
				name: 'test test',
				screenName: 'ssss',
				tweetText: 'Hello World3'
			}
		];
	}
]);