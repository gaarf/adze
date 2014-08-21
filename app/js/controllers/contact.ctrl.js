var module = angular.module(PKG.name+'.controllers');


module.controller('ContactCtrl', function ($scope, myChuckNorrisJoke) {

  $scope.something = 'whatever';

  $scope.joke = myChuckNorrisJoke;

});