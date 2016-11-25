angular.module('indexApp', [])
	.controller('indexCont', function($scope) {
	    $scope.title = "Express";
	});

angular.module('userApp', [])
.controller('userCont', function($scope, $http, $window) {
    $http.get('/user/list')
        .success(function(data) {
            $scope.userList = data;
        })
        .error(function(data) {
        	$scope.info = data;
        });

    $scope.login = function() {
        $http.post('/login', $scope.formData)
            .success(function(data) {
            	if (data == '') {
            		$window.location = '/';
            	} else {
            		$scope.info = data;
            	}
            })
            .error(function(data) {
            	$scope.info = data;
            });
    };
    
    $scope.registerUser = function() {
        $http.post('/register', $scope.formData)
            .success(function(data) {
            	if (data == '') {
            		$window.location = '/users';
            	} else {
            		$scope.info = data;
            	}
            })
            .error(function(data) {
            	$scope.info = data;
            });
    };
});