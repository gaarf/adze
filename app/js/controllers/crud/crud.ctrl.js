var module = angular.module(PKG.name+'.controllers');


module.controller('CrudListCtrl', function ($scope, $state, $modal) {
  // we already fetched the list in the parent view
  $scope.$watch('subnavList', function (list) {
    if(list) {
      $scope.list = list;
    }
  });

  // but we want it to be fresh
  if(!$scope.subnavList || $scope.subnavList.$resolved) {
    $scope.fetchSubnavList();
  }

  $scope.doDelete = function (model) {
    model.$delete(function () {
      $scope.fetchSubnavList();
    });
  };
});



var CrudFormBase = function ($scope, $state, myApi) {

  function doThenList(model, method) {
    $scope.submitting = true;

    if(!angular.isFunction(model[method]) ) {
      model = new myApi[$state.current.data.modelName](model);
    }

    model[method]()
      .then(function () {
        $scope.fetchSubnavList();
        $state.go('^.list');
      })
      .finally(function () {
        $scope.submitting = false;
      });
  };

  $scope.doSubmit = function (model) {
    doThenList(model, '$save');
  };

  $scope.doDelete = function (model) {
    doThenList(model, '$delete');
  };

};


module.value('CrudFormBase', CrudFormBase);


module.controller('CrudEditCtrl', function ($scope, $state, myApi) {
  CrudFormBase.apply(this, arguments);

  var data = $state.current.data;
  if(data) {
    $scope.model = myApi[data.modelName].get($state.params);
  }
});



module.controller('CrudCreateCtrl', function ($scope, $state, myApi) {
  CrudFormBase.apply(this, arguments);

  var data = $state.current.data;
  if(data) {
    $scope.model = new myApi[data.modelName]()
  }
});
