var app = angular.module('app', [
  'ngRoute',
  'controllers'
]);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'partials/home.html',
			controller: 'homeController'
		}).
    when('/player/:playerID', {
			templateUrl: 'partials/player.html',
			controller: 'playerController'
		}).
		otherwise({
			redirectTo: '/'
		});
  	}
]);

app.service('globals', function() {
  var IP = 'http://10.101.22.62:9001';

  return {
    getIP: function() {
      return IP;
    }
  }
})
