var module = angular.module('adze.controllers');


module.controller('ContactCtrl', function ($scope, myChuckNorrisJoke) {

  $scope.something = 'whatever';

  $scope.joke = myChuckNorrisJoke;

});