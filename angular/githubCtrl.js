(function() {
    var app = angular.module('app', []);

    var githubCtrl = function($scope, $http, $interval) {
        $scope.username = "angular";
        $scope.orderByField = "stargazers_count";
        $scope.reverseSort = true;
        var onError = function(response) {
            console.log(response);
            $scope.error = response.data;
        }

        var getRepos = function(url) {
        	$http.get(url).then(function(response) {
        		$scope.repos = response.data;
        		console.log($scope.repos[0]);
        	}, onError);
        }

        var changeOrder = function(columnName) {
        	$scope.orderByField = columnName;
        }


        $scope.search = function() {
            var url = "https://api.github.com/users/" + $scope.username;
            $http.get(url).then(function(response) {
                $scope.user = response.data;
                getRepos($scope.user.repos_url);
                var gravatar_id = $scope.user.gravatar_id
            }, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.leftTime = 0;
            }
        }

        $scope.leftTime = 5;
        var countdown = function() {
            $scope.leftTime -= 1;
            if ($scope.leftTime == 0) {
                $scope.search();
            }
        }
        var countdownInterval = $interval(countdown, 1000, 5)
    }
    app.controller('githubCtrl', ['$scope', '$http', '$interval', githubCtrl]);
}());
