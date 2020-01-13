'use strict';

angular.module('tweets').controller('UserTimelineController', [
    '$scope',
    '$http',
    '$stateParams',
    function ($scope, $http, $stateParams) {
        $http.get('/friendships/show/' + $stateParams.username)
        .then(
			function successCallback(response) {
				$scope.profile = {
                    name: '',
                    screenName: $stateParams.username,
                    tweetCount: 1,
                    followerCount: 3,
                    followingCount: 34,
                    isFollowing: response.data.is_following,
                    isFollowed: response.data.is_followed
                };
			  },
			  function errorCallback(response) {
				$scope.error = response.message;
        });


        

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
                    $scope.profile.isFollowing = response.data.is_following;
                    $scope.profile.followerCount += 1;
                  },
                  function errorCallback(response) {
                    $scope.error = response.message;
            });
        }

        $scope.unfollow = function (unFollowUsername) {
          $http.post('/friendships/unfollow', {
            unfollow_username: unFollowUsername
          })
          .then(
              function successCallback(response) {
                  $scope.profile.isFollowing = response.data.is_following;
                  $scope.profile.followerCount -= 1;
                },
                function errorCallback(response) {
                  $scope.error = response.message;
          });
      }
    }
]);