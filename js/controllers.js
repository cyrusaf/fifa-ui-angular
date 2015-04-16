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
	    url: globals.getIP() + "/matches",
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

controllers.controller('playerController', ['$scope', '$http', 'globals', '$routeParams', function ($scope, $http, globals, $routeParams) {
	$scope.player = {};

	// Make request for player
	$http.get(globals.getIP() + "/players/" + $routeParams.playerID)
		.success(function(data, status, headers, config) {
			$scope.player = data;
		});
}]);

function suffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
