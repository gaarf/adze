var app = angular.module('adze.controllers');


app.controller('BodyCtrl', function ($scope, $log) {

  $scope.bodyLogger = function (it) {
    $log.log(it, 'logged from BodyCtrl');
  };

  $scope.bodyAlertObj = {
    "title": "Holy bodyAlertObj!",
    "content": "lorem ipsum... Blah Blah Blah...",
    "type": "info"
  };

  $scope.something =  '\'sup?';

  $scope.somebody = {
    name: 'Kenny'
  };

});