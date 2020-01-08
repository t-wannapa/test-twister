'use strict';

angular.module('tweets').controller('MeController', [
	'$scope',
	function($scope) {
		$scope.profile = {
			name: 'test name',
			screenName: 'kkkk',
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