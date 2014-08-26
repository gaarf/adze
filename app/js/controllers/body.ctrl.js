var module = angular.module(PKG.name+'.controllers');


module.controller('BodyCtrl', function ($scope, $log) {

  $scope.bodyDemoObj = {
    "title": "Holy bodyAlertObj!",
    "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    "type": "info"
  };

  $log.log('hello from BodyCtrl', angular.version);

});