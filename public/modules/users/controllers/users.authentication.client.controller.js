'use  strict';

angular.module('users').controller('AuthenticationController', [
	'$scope',
	'$http',
	'$state',
	'Auth',
	function($scope, $http, $state, Auth) {
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
		}
	}
]);