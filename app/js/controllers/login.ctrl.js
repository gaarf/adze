var module = angular.module(PKG.name+'.controllers');


module.controller('LoginCtrl', function ($scope, myAuth, $alert) {

  var invalidAlert = $alert({title:'Error', content:"Invalid indentifier!", type:"danger", show: false});

  $scope.credentials = {};

  $scope.login = function (credentials) {
    if(!credentials.username || !credentials.tenant) {
      invalidAlert.show();
    } else {
      myAuth.login(credentials);
    }
  }

  $scope.$on('$destroy', invalidAlert.destroy);
});