(function() {
    var app = angular.module('app', []);
    var ctrl = function($scope, $http) {
        $scope.message = "from angular code";

        var url = "https://api.github.com/users/rockie-yang";
        $http.get(url).success(function(response) {
            $scope.userProfile = response;
        })
        var urlRepos = 'https://api.github.com/users/rockie-yang/repos';

        var onSuccess = function(response) {
            $scope.repos = response;
        }

        var onError = function(reason) {
            $scope.errorMsg = "Fail to fetch info " + reason;
        }

        $http.get(urlRepos).then(onSuccess, onError);
    }

    // the second parameter using an array
    // the last element of the array is the function
    // the previous element are parameters passed to the functoin
    // 
    // in minimize process, the parameter name in function ctrl
    // might minized from $scope => s
    // 
    // and pass it as array gives angular know that 
    // which parameter should inject in when invoke ctrl
	app.controller('acontroller', ['$scope', '$http', ctrl]);

	// if don't think about minimize, the following way also work
    // app.controller('acontroller', ctrl);
}());
