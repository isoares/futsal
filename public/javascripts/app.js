angular.module('futsalApp', [])
	.controller('indexCont', function($scope, $rootScope) {
	    $scope.title = "Express";
	})
	.controller('userCont', function($scope, $rootScope, $http, $window) {
	    $http.get('/users/list')
	        .success(function(data) {
	            $scope.userList = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	
	    $scope.login = function() {
	        $http.post('/login', $scope.formData)
	            .success(function(data) {
	            	if (data == '') {
	            		$window.location = '/';
	            	} else {
	            		$rootScope.info = data;
	            	}
	            })
	            .error(function(data) {
	            	//$rootScope.info = data;
	            	//$rootScope.info = data;
	            	$rootScope.info = {message: data};
	            	//$rootScope.info.message = data;
	            });
	    };
	    
	    $scope.registerUser = function() {
	        $http.post('/register', $scope.formData)
	            .success(function(data) {
	            	if (data == '') {
	            		$window.location = '/users';
	            	} else {
	            		$rootScope.info = data;
	            	}
	            })
	            .error(function(data) {
	            	$rootScope.info = data;
	            });
	    };
	})
	.controller('playerCont', function($scope, $rootScope, $http, $window) {
	    $http.get('/players/list')
	        .success(function(data) {
	            $scope.playerList = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	    
	    $scope.createPlayer = function() {
	        $http.post('/newPlayer', $scope.formData)
	            .success(function(data) {
	            	if (data == '') {
	            		$window.location = '/players';
	            	} else {
	            		$rootScope.info = data;
	            	}
	            })
	            .error(function(data) {
	            	$rootScope.info = data;
	            });
	    };
	});