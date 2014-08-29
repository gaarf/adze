var module = angular.module(PKG.name+'.controllers');


module.controller('ClusterFormCtrl', function (CrudFormBase, $scope, $state, $log, myApi, myFocusManager) {
  CrudFormBase.call(this, $scope, $state);

  var id = $state.params.id;

  if(!id) { // creating a new cluster
    $scope.model = new myApi.Cluster({clusterTemplate:'base', numMachines:1});
    myFocusManager.focus('name');
  }
  else { // reconfiguring
    myApi.Cluster.get( {id:id}, function (model) {

      // normalize some read-only fields
      model.numMachines = model.nodes.length;
      model.clusterTemplate = model.clusterTemplate.name;


      $scope.model = model;

      myFocusManager.select('numMachines');
    });
  }

  $scope.showAdvanced = true;

  $scope.availableTemplates = myApi.Template.query(function (avail) {

    $scope.$watch('model.clusterTemplate', function (val) {
      var chosenTemplate = avail.filter(function (tpl) {
        return tpl.name === val;
      })[0];

      console.log('chosenTemplate', chosenTemplate);
      $scope.chosenTemplate = chosenTemplate;

    }); 
         
  });


});
