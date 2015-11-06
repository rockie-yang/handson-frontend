(function() {
    var app = angular.module('pollApp', []);

    var pollCtrlFun = function($scope, $http) {
        var dbUrl = 'https://api.mongolab.com/api/1/databases/rockie_test';
        var apiKey = 'Wq6LkbyEZjQJ5D-HY22jAH7XWM3T2M7z';
        var optionsUrl = dbUrl + '/collections/options?apiKey=' + apiKey;
        var votesUrl = dbUrl + '/collections/votes?apiKey=' + apiKey;
        var voteInterval = 10000; // 10s

        $scope.options = {};

        var onError = function(response) {
            console.log(response);
        }

        // get the client ip
        $http.get('http://freegeoip.net/json/').then(function(response) {
            $scope.ip = response.data.ip;
        }, function(response) {
            $scope.ip = "unspecified";
        })

        // get the options for the question
        var getOptions = function() {

            $http.get(optionsUrl).then(function(response) {
                var data = response.data
                for (var i in data) {
                    var option = data[i]
                    var id = option['option'];
                    $scope.options[id] = option
                }

                $scope.lastVoteTime = new Date();

            }, onError);
        }
        

        // when click to vote one of the options
        $scope.vote = function(id) {
            var now = new Date();
            console.log('you vote ' + id + ' from ip ' + $scope.ip);

            // too frequent vote is ignored
            var elapsed = now - $scope.lastVoteTime;
            if (elapsed > voteInterval) {
                var data = {
                    'ip': $scope.ip,
                    'question': $scope.options[id].question,
                    'vote': id,
                    'time': new Date().toUTCString()
                }

                // only update the vote time, if data is successfully posted
                $http.post(votesUrl, data).then(function(response) {
                    console.log(response);
                    $scope.lastVoteTime = now
                })
            } else {
                console.log('ignore too frequent vote');
            }

        }
    }

    app.controller('pollCtrl', ['$scope', '$http', pollCtrlFun]);
}());
