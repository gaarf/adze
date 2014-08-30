var module = angular.module(PKG.name+'.controllers');


module.controller('ClusterFormCtrl', 
function (CrudFormBase, $scope, $state, $log, myApi, myFocusManager, myHelpers) {
  CrudFormBase.call(this, $scope, $state);

  var id = $state.params.id;

  $scope.model = new myApi.Cluster({clusterTemplate:'base', numMachines:1});

  if(!id) { // creating a new cluster
    myFocusManager.focus('name');
  }
  else { // reconfiguring
    myApi.Cluster.get( {id:id}, function (data) {
      angular.extend($scope.model, {
        id: id,
        name: data.name,
        numMachines: data.nodes.length,
        clusterTemplate: data.clusterTemplate.name
      });

      $scope.leaseDuration = myHelpers.parseMilliseconds(data.expireTime);
      myFocusManager.select('numMachines');
    });
  }

  $scope.showAdvanced = true;

  // fetch the cluster templates then make the chosen one available
  $scope.availableTemplates = myApi.Template.query(function (avail) {
    $scope.$watch('model.clusterTemplate', function (name) {
      $scope.chosenTemplate = avail.filter(function (tpl) {
        return tpl.name === name;
      })[0];
    }); 
  });


  $scope.leaseDuration = myHelpers.parseMilliseconds(0);

  $scope.$watchCollection('leaseDuration', function (timeObj) {
    $scope.model.initialLeaseDuration = myHelpers.concatMilliseconds(timeObj);
  }); 


});
