'use  strict';

angular.module('users').controller('AuthenticationController', [
	'$scope',
	'$http',
	'$state',
	function($scope, $http, $state) {
		$scope.user = {
			email: 'a@gmail.com'
		};

		$scope.signup = function(isValid) {
			if (isValid) {
				$http.post('/signup', $scope.user)
				.then(
					function successCallback(response) {
    					$state.go('home');
  					},
  					function errorCallback(response) {
						console.log(response);
  				});
			}
		};

		$scope.signin = function(isValid) {
			if (isValid) {
				$http.post('/signin', $scope.user)
				.then(
					function successCallback(response) {
    					$state.go('home');
  					},
  					function errorCallback(response) {
						console.log(response);
  				});
			}
		};
	}
]);