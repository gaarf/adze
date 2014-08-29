var module = angular.module(PKG.name+'.controllers');


module.controller('CrudListCtrl', function ($scope) {
  // we already fetched the list in the parent view
  $scope.$watch('subnavList', function (list) {
    if(list) {
      $scope.list = list;
    }
  });

  // but we want it to be fresh
  if($scope.subnavList && $scope.subnavList.$resolved) {
    $scope.fetchSubnavList()
  }
});


var CrudFormBase = function ($scope, $state) {
  $scope.doSubmit = function (model){
    $scope.submitting = true;

    model.$save()
      .then(function () {
        $scope.fetchSubnavList();
        $state.go('^.list');
      })
      .finally(function () {
        $scope.submitting = false;
      });
  };
};


module.value('CrudFormBase', CrudFormBase);


module.controller('CrudEditCtrl', function ($scope, $state, myApi) {
  CrudFormBase.call(this, $scope, $state);

  myApi[$state.current.data.modelName].get( 
    $state.params, 
    function(model) {
      $scope.model = model;
    }
  );
});



module.controller('CrudCreateCtrl', function ($scope, $state, myApi) {
  CrudFormBase.call(this, $scope, $state);

  $scope.model = new myApi[$state.current.data.modelName]();
});
