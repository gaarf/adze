var app = angular.module('adze');


app.controller('BodyCtrl', function ($scope, $log) {

  $scope.bodyLogger = function (it) {
    $log.log(it, 'logged from BodyCtrl');
  };

  $scope.bodyString = 'I come from the BodyCtrl';

  $scope.bodyAlertObj = {
    "title": "Holy guacamole!",
    "content": "Best check yo self, you're not looking too good.",
    "type": "info"
  };

  $scope.something = 'OMG where is Kenny?';

});