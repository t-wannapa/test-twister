'use  strict';

angular.module('users').controller('AuthenticationController', [
	'$scope',
	'$http',
	'$state',
	'Authentication',
	function($scope, $http, $state, Authentication) {
		$scope.authentication = Authentication;

		$scope.signup = function(isValid) {
			if (isValid) {
				$http.post('/signup', $scope.user)
				.then(
					function successCallback(response) {
						$scope.authentication.user = response;
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
						$scope.authentication.user = response;
    					$state.go('home');
  					},
  					function errorCallback(response) {
						console.log(response);
  				});
			}
		};
	}
]);