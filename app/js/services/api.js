var module = angular.module(PKG.name+'.services');

module.factory('MYAPI_PREFIX', function($location){
  return $location.protocol() + '://' + $location.host() + 
            ':' + $location.port() + '/localhost:55054/v1/loom/';
});


module.factory('myApi', function(myAuth,
    myApi_clusters,
    myApi_hardwaretypes,
    myApi_imagetypes,
    myApi_providers,
    myApi_provisioners,
    myApi_services,
    myApi_templates,
    myApi_tenants
  ){

  return angular.extend({}, 
    myApi_clusters,
    myApi_hardwaretypes,
    myApi_imagetypes,
    myApi_providers,
    myApi_provisioners,
    myApi_services,
    myApi_templates,
    myApi_tenants
  );

});

