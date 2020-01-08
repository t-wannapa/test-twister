'use strict';

angular.module('tweets').controller('UserTimelineController', [
    '$scope',
    '$http',
    '$stateParams',
    function ($scope, $http, $stateParams) {
        $scope.profile = {
            name: '',
            screenName: $stateParams.username,
            tweetCount: 1,
            followerCount: 3,
            followingCount: 34
        };

        $http.get('/statuses/user_timeline/' + $stateParams.username)
        .then(
			function successCallback(response) {
				$scope.tweets = response.data;
			  },
			  function errorCallback(response) {
				$scope.error = response.message;
		  });
    }
])