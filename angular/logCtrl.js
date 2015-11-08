(function(){
	var logCtrl = function($log){
		$log.info("hello info");
	}
	angular.module('app').controller('logCtrl', ['$log', logCtrl]);
}())