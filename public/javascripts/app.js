angular.module('futsalApp', [])
	.filter('removeSpaces', [function() {
	    return function(string) {
	        if (!angular.isString(string)) {
	            return string;
	        }
	        return string.replace(/[\s]/g, '');
	    };
	}])
	.controller('menuCont', function($scope, $rootScope, $http, $window) {
		
	})
	.controller('indexCont', function($scope, $rootScope, $http, $window) {
		$rootScope.itemMenu = 'index';
		
	    $http.get('/rSumulas/listTeam')
        	.success(function(data) {
        		$scope.rSumulaListTeam = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	    
	    $http.get('/rSumulas/listTotal')
	        .success(function(data) {
	            $scope.rSumulaListTotal = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	    
	    $http.get('/rSumulas/listComp')
	    	.success(function(data) {
	    		$scope.rSumulaListComp = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	    
	    $http.get('/rSumulas/listCompTeam')
	    	.success(function(data) {
	    		$scope.rSumulaListCompTeam = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	    
	    $http.get('/rSumulas/listCompTotal')
	    	.success(function(data) {
	    		$scope.rSumulaListCompTotal = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	})
	.controller('userCont', function($scope, $rootScope, $http, $window) {
		$rootScope.itemMenu = 'users';
		
	    $http.get('/users/list')
	        .success(function(data) {
	            $scope.userList = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	
	    $scope.login = function(newPasswordRequired) {
	    	
	    	if (newPasswordRequired) {
		        $http.post('/changePassword', $scope.formData)
		            .success(function(data) {
		            	if (data == '') {
		            		$window.location = '/';
		            	} else {
		            		$rootScope.info = data;
		            	}
		            })
		            .error(function(data) {
		            	$rootScope.info = {message: data};
		            });
	    	} else {
		        $http.post('/login', $scope.formData)
		            .success(function(data) {
		            	if (data == '') {
		            		$window.location = '/';
		            	} else {
		            		if (JSON.parse(data) == 'newPasswordRequired') {
		            			$scope.newPasswordRequired = true;
		            		} else {
			            		$rootScope.info = data;
			            	}
		            	}
		            })
		            .error(function(data) {
		            	$rootScope.info = {message: data};
		            });
	    	}
	    };
	    
	    $scope.registerUser = function(firstUser) {	    	
	    	if (firstUser) {
	    		$scope.formData.status = 1;
	    	} else {
	    		$scope.formData.status = 0;
	    	}
	    	
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
		$rootScope.itemMenu = 'players';
		
	    $http.get('/players/list')
	        .success(function(data) {
	            $scope.playerList = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	    
	    $scope.fileReaderSupported = window.FileReader != null;
	    
	    $scope.photoChanged = function(element) {
	    	if (element.files != null) {
	    		var file = element.files[0];
	            if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
	            	var fileReader = new FileReader();
	            	fileReader.readAsDataURL(file);
	            	fileReader.onload = function(e) {
	            		$scope.photo_src = e.target.result;
	            		$scope.$apply();
	            	}
	            }
	        }
	    };
	    
	    $scope.inactivePlayer = function(_id) {
	    	$http.post('/inactivePlayer/' + _id)
	            .success(function(data) {
	            	$scope.playerList = data;
	            })
	            .error(function(data) {
	            	$rootScope.info = data;
	            });
	    };
	    
	    $scope.activePlayer = function(_id) {
	    	$http.post('/activePlayer/' + _id)
	            .success(function(data) {
	            	$scope.playerList = data;
	            })
	            .error(function(data) {
	            	$rootScope.info = data;
	            });
	    };
	    
	    $scope.deletePlayer = function(_id) {
	    	$http.post('/deletePlayer/' + _id)
	            .success(function(data) {
	            	$scope.playerList = data;
	            	$rootScope.success = {message: "Apagado com sucesso!"};
	            })
	            .error(function(data) {
	            	$rootScope.info = data;
	            });
	    };
	    
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
	    	var file = document.getElementById('playerPhoto').files[0];
	        var fd = new FormData();
	        fd.append('file', file);
	        if ($scope.player._id) {
	        	fd.append('_id', $scope.player._id);
	        }
	        fd.append('name', $scope.player.name);
	        
	        $http.post('/newPlayer', fd, //$scope.player,
	        		 {
		           transformRequest: angular.identity,
		           headers: {'Content-Type': undefined}
		        })
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
		$rootScope.itemMenu = 'sumulas';
		
	    $http.get('/sumulas/list')
	        .success(function(data) {
	            $scope.sumulaList = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	    
	    $http.get('/players/listActive')
        	.success(function(data) {
        		//$scope.playerList = data;
        		
        		for (i in data) {
        			data[i].idPlayer = data[i]._id;
        		}
        		
        		$scope.sumula = {
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
	            	$rootScope.success = {message: "Apagado com sucesso!"};
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
		$rootScope.itemMenu = 'reports';
		
	    $http.get('/rPlayers/list')
	        .success(function(data) {
	            $scope.rPlayerList = data;
	        })
	        .error(function(data) {
	        	$rootScope.info = data;
	        });
	});