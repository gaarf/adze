var module = angular.module(PKG.name+'.controllers');


module.controller('ClusterEditCtrl', function ($scope, $state, $log, myApi, myFocusManager) {
  var id = $state.params.id;

  if(!id) {
    $scope.model = new myApi.Cluster({clusterTemplate:'base', numMachines:1});
    myFocusManager.focus('name');
  }
  else {
    myApi.Cluster.get( {id:id}, function (model) {

      // normalize some read-only fields
      model.numMachines = model.nodes.length;
      model.clusterTemplate = model.clusterTemplate.name;


      $log.log('ClusterEditCtrl', model);
      $scope.model = model;

      myFocusManager.select('name');
    });
  }

  $scope.availableTemplates = myApi.Template.query();

  $scope.doSubmit = function (model){
    $scope.submitting = true;

    model.$save();
  };

});
