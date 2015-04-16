var controllers = angular.module('controllers', []);

controllers.controller('homeController', ['$scope', '$http', 'globals', function ($scope, $http, globals) {

	// Property Definitions
	$scope.users  = [];
	$scope.winner;
	$scope.looser;

	// Function Definitions
	function getUsers() {
		$http.get(globals.getIP() + "/players")
			.success(function(data, status, headers, config) {
				$scope.users = data;
			});
	}

	// Start Code
	getUsers();

	$scope.submit = function() {
		if ($scope.winner == undefined || $scope.loser == undefined) {
  		alert("Missing either winner or loser");
  		return
  	}

  	$http({
	    url: "http://104.236.138.84:9001/matches",
	    method: "POST",
	    data: JSON.stringify({
	    	player1: $scope.winner,
	    	player2: $scope.loser,
	    	winner: 1
	    })
		}).success(function(data, status, headers, config) {
			getUsers();
		}).error(function(data, status, headers, config) {
		    console.log("HTTP Error");
		});
	}
}]);
