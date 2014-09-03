var module = angular.module(PKG.name+'.controllers');


module.controller('ClusterFormCtrl', function ($scope, $state, $q, myApi, myFocusManager, myHelpers) {
  var id = $state.params.id;

  $scope.model = new myApi.Cluster({id:id, clusterTemplate:'base', numMachines:1});

  $scope.showAdvanced = false;
  $scope.showConfig = !!id;

  $scope.leaseDuration = myHelpers.parseMilliseconds(0);

  var allHardware  = myApi.HardwareType.query(),
      allImages = myApi.ImageType.query(),
      allServices = myApi.Service.query();

  $scope.availableTemplates = myApi.Template.query();
  $scope.availableProviders = myApi.Provider.query();
  $scope.chosenProvider = {};
  $scope.availableHardware = [];
  $scope.availableImages = [];
  $scope.availableServices = [];

  $q.all([
    allHardware.$promise,
    allImages.$promise,
    allServices.$promise,
    $scope.availableProviders.$promise,
    $scope.availableTemplates.$promise
  ]).then(function () {

    $scope.$watch('model.clusterTemplate', function (name) {

      var chosen = $scope.availableTemplates.filter(function (tpl) {
        return tpl.name === name;
      })[0];

      $scope.chosenTemplate = chosen;

      $scope.model.numMachines = Math.min(
        Math.max(
          $scope.model.numMachines,
          chosen.constraints.size.min
        ), 
        chosen.constraints.size.max
      );

      $scope.availableHardware = allHardware.filter(function (item) {
        return chosen.compatibility.hardwaretypes.indexOf(item.name)>=0;
      });

      $scope.availableImages = allImages.filter(function (item) {
        return chosen.compatibility.imagetypes.indexOf(item.name)>=0;
      });

      $scope.availableServices = allServices.filter(function (item) {
        return chosen.compatibility.services.indexOf(item.name)>=0;
      });

      // set the template defaults on the model
      angular.extend($scope.model, chosen.defaults);
    }); 


    $scope.$watch('model.provider', function (name) {
      var chosen = $scope.availableProviders.filter(function (p) {
        return p.name === name;
      })[0];

      console.log('chosen provider', chosen);

      $scope.chosenProvider = chosen;

    }); 

  });



  if(!id) {
    /*
    creating a new cluster
     */

    $scope.$watchCollection('leaseDuration', function (timeObj) {
      $scope.model.initialLeaseDuration = myHelpers.concatMilliseconds(timeObj);
    }); 


    myFocusManager.focus('inputClusterName');






  } else {
    /*
    reconfiguring
     */
    myApi.Cluster.get( {id:id}, function (data) {
      // what we "get" doesnt look at all like what we will "put"
      console.log('reconfiguring cluster', data);

      // but we still need a populated model for display purposes
      angular.extend($scope.model, {
        name: data.name,
        numMachines: data.nodes.length,
        clusterTemplate: data.clusterTemplate.name,
        provider: data.provider.name,
        hardwaretype: data.nodes[0].properties.hardwaretype,
        imagetype: data.nodes[0].properties.imagetype
      });

      $scope.leaseDuration = myHelpers.parseMilliseconds(data.expireTime);

      myFocusManager.select('inputClusterConfig');
    });



  }



  /*
  updating a cluster means reconfiguring it, so we cannot use CrudFormBase
   */
  $scope.doSubmit = function (model){
    $scope.submitting = true;

    var promise;

    if(id) { // reconfiguring
      promise = myApi.ClusterConfig.update({clusterId:id}, {
        config: model.config
      }).$promise;
    }
    else { // creating
      promise = model.$save();
    }

    promise
      .then(function () {
        $scope.fetchSubnavList();
        $state.go('^.list');
      })
      .finally(function () {
        $scope.submitting = false;
      });
  };



});
