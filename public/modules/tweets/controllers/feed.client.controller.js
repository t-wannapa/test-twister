'use strict';

angular.module('tweets').controller('FeedController', [
	'$scope', 
	'$uibModal',
	'$http',
	'Authentication',
	function($scope, $uibModal, $http, Authentication) {
		$scope.profile = {
			name: Authentication.user.displayName,
			screenName: Authentication.user.username,
			tweetCount: 2,
			followerCount: 34,
			followingCount: 140
		};

		$scope.timeline = [
			{
				name: 'test test1',
				screenName: 'ssss1',
				tweetText: 'Hello World',
				tweetTime: '2019-02-1T16:21:43.403Z'
			},
			{
				name: 'test test2',
				screenName: 'ssss2',
				tweetText: 'Hello World',
				tweetTime: '2019-04-1T16:21:43.403Z'
			},
			{
				name: 'test test3',
				screenName: 'ssss3',
				tweetText: 'Hello World',
				tweetTime: '2019-01-1T16:21:43.403Z'
			}
		];

		$scope.postTweet = function(tweetText, name, screenName) {
			$scope.timeline.push({
				name: name,
				screenName: screenName,
				tweetText: tweetText,
				tweetTime: new Date().toISOString()
			});

			$http.post('/statuses/update', {
				name: name,
				screenName: screenName,
				tweetText: tweetText,
				tweetTime: new Date().toISOString()
			})
			.then(
				function successCallback(response) {
					$scope.tweetText = '';
					$scope.profile.tweetCount += 1; 
				  },
				  function errorCallback(response) {
					$scope.error = response.message;
			  });
		};

		$scope.replyTo = function(screenName) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: '/modules/tweets/views/replymodal.client.view.jade',
				controller: 'ReplyModalController',
				resolve: {
					tweetText: function() {
						return '@' + screenName + ' ';
					}
				}
			});

			modalInstance.result.then(function(tweetText){
				$scope.postTweet(tweetText, $scope.profile.name, $scope.profile.profileName);
			});
		}
	}
]);