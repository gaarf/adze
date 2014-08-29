var module = angular.module(PKG.name+'.controllers');


module.controller('SubnavCtrl', function ($scope, $state, myApi) {

  var path = $state.current.name.split('.')[0],
      detail = $state.get(path+'.detail') || $state.get(path+'.edit');


  function fetchSubnavList () {
    console.log('fetchSubnavList');

    $scope.subnavList = myApi[$state.current.data.modelName].query();

    $scope.subnavList.$promise.then(function (list) {
      $scope.dropdown = list.map(function(item) {
        return {
          text: item.name,
          href: detail ? $state.href(detail, item) : '#/TODO'
        };
      });
    });
  }

  $scope.fetchSubnavList = fetchSubnavList;

  fetchSubnavList();

});
