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
	    
	    $scope.updatePlayer = function(_id) {
	    	$window.location = '/updatePlayer/' + _id;
	    };
	    
	    $scope.findPlayer = function(_id) {
	    	if (_id != 0) {
		    	$http.get('/findPlayer/' + _id)
			        .success(function(data) {
			            $scope.player = data;
			        })
			        .error(function(data) {
			        	$rootScope.info = data;
			        });
	    	}
	    };
	    
	    $scope.createPlayer = function() {
	        $http.post('/newPlayer', $scope.player)
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
	})
	.controller('sumulaCont', function($scope, $rootScope, $http, $window, $filter) {
	    $http.get('/sumulas/list')
	        .success(function(data) {
	            $scope.sumulaList = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	    
	    $http.get('/players/list')
        	.success(function(data) {
        		//$scope.playerList = data;
        		
        		$scope.sumula = {
        				data: '',
        				quadro: '',
        				adversario: '',
        				golsFavor: '',
        				golsContra: '',
        				players: data
        			};
        		
        	})
        	.error(function(data) {
        		$rootScope.info = data;
        	});
	    
	    $scope.deleteSumula = function(_id) {
	    	$http.post('/deleteSumula/' + _id)
	            .success(function(data) {
	            	$scope.sumulaList = data;
	            	$rootScope.info = "Apagado com sucesso!";
	            })
	            .error(function(data) {
	            	$rootScope.info = data;
	            });
	    };
	    
	    $scope.viewSumula = function(_id) {
	    	$window.location = '/viewSumula/' + _id;
	    };
	    
	    $scope.findSumula = function(_id) {
	    	if (_id != 0) {
	    		$scope.view = true;
	    		
		    	$http.get('/findSumula/' + _id)
			        .success(function(data) {
			            $scope.sumula = data;
			            $scope.sumula.data = $filter('date')($scope.sumula.data,'yyyy-MM-dd');
			        })
			        .error(function(data) {
			        	$rootScope.info = data;
			        });
	    	} else {
	    		$scope.view = false;
	    	}
	    };
	    
	    $scope.createSumula = function() {
	        $http.post('/newSumula', $scope.sumula)
	            .success(function(data) {
	            	if (data == '') {
	            		$window.location = '/sumulas';
	            	} else {
	            		$rootScope.info = data;
	            	}
	            })
	            .error(function(data) {
	            	$rootScope.info = data;
	            });
	    };
	})
	.controller('rPlayerCont', function($scope, $rootScope, $http, $window) {
	    $http.get('/rPlayers/list')
	        .success(function(data) {
	            $scope.rPlayerList = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	});