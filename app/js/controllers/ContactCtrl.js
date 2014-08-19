var module = angular.module('adze.controllers');


module.controller('ContactCtrl', function ($scope, ChuckNorris) {

  $scope.something = 'whatever';

  $scope.joke = ChuckNorris.getJoke();

});