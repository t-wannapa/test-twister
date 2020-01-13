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
            followingCount: 34,
            is_following: false
        };

        $http.get('/statuses/user_timeline/' + $stateParams.username)
        .then(
			function successCallback(response) {
				$scope.tweets = response.data;
			  },
			  function errorCallback(response) {
				$scope.error = response.message;
        });
          
        $scope.follow = function (followUsername) {
            $http.post('/friendships/follow', {
                follow_username: followUsername
            })
            .then(
                function successCallback(response) {
                    console.log(response.data.is_following);
                    $scope.profile.is_following = response.data.is_following;
                    $scope.profile.followerCount += 1;
                  },
                  function errorCallback(response) {
                    $scope.error = response.message;
            });
        }
    }
])