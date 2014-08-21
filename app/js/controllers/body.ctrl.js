var module = angular.module(PKG.name+'.controllers');


module.controller('BodyCtrl', function ($scope, $log) {

  $log.log('hello from BodyCtrl');

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