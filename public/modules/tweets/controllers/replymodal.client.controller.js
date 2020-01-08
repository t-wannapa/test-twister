'use strict';

angular.module('tweets').controller('ReplyModalController', [
	'$scope',
	'$uibModalInstance',
	'tweetText',
	function($scope, $uibModalInstance, tweetText) {
		$scope.tweetText = tweetText;

		$scope.reply = function() {
			$uibModalInstance.close($scope.tweetText);
		}

		$scope.close = function() {
			$uibModalInstance.dismiss();
		}
	}
]);