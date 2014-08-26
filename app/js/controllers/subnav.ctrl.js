var module = angular.module(PKG.name+'.controllers');


module.controller('SubnavCtrl', function ($scope, $state, $log, myApi) {

  $scope.modelList = myApi[$state.current.data.ddModel].query(function() {
    $log.log('you have '+$scope.modelList.length+' '+$state.current.data.ddLabel);
  });

});
