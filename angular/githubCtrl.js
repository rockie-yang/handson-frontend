(function() {
    var app = angular.module('app', []);

    var githubCtrl = function($scope, $http) {
        $scope.username = "rockie-yang";
        var onError = function(response) {
            console.log(response);
            $scope.error = response.data;
        }

        var getRepos = function(url) {
        	$http.get(url).then(function(response) {
        		$scope.repos = response.data;
        	}, onError);
        }

        $scope.search = function() {
            var url = "https://api.github.com/users/" + $scope.username;
            $http.get(url).then(function(response) {
                $scope.user = response.data;
                getRepos($scope.user.repos_url);
                var gravatar_id = $scope.user.gravatar_id
            }, onError);
        }
    }
    app.controller('githubCtrl', ['$scope', '$http', githubCtrl]);
}());
