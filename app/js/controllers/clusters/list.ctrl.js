var module = angular.module(PKG.name+'.controllers');


module.controller('ClustersListCtrl', function ($scope) {

  $scope.$watch('subnavList', function (list) {
    $scope.list = list;
  });

});