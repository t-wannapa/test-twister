angular.module('users').factory('Authentication', [
	function() {
		return {
			user: window.user
		};
	}
]);