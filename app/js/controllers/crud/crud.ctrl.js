var module = angular.module(PKG.name+'.controllers');


module.controller('CrudListCtrl', function ($scope, $log) {
  // we already fetched the list in the parent view
  $scope.$watch('subnavList', function (list) {
    if(list) {
      $log.log('CrudListCtrl', list);
      $scope.list = list;      
    }
  });
});


module.controller('CrudEditCtrl', function ($scope, $state, $log, myApi) {
  myApi[$state.current.data.modelName].get( 
    $state.params, 
    function(model) {
      $log.log('CrudEditCtrl', model);
      $scope.model = model;
    }
  );
});



module.controller('CrudCreateCtrl', function ($scope, $state, $log, myApi) {
  var model = new myApi[$state.current.data.modelName]();
  $scope.model = model;
  $log.log('CrudCreateCtrl', model);
});
