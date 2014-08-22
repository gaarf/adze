var module = angular.module(PKG.name+'.controllers');


module.controller('LoginCtrl', function ($scope, myAuth, $alert, $state) {

  var invalidAlert = $alert({title:'Error', content:"Invalid indentifier!", type:"danger", show: false});

  $scope.credentials = {};

  $scope.login = function (credentials) {
    if(!credentials.username || !credentials.tenant) {
      invalidAlert.show();
    } else {
      myAuth.login(credentials);
    }
  };

  $scope.$on('$viewContentLoaded', function() { 
    if(myAuth.isAuthenticated()) {
      $state.go('home');
      $alert({content:"You are already logged in!", type:'info', duration:5});
    }
  });

  $scope.$on('$destroy', invalidAlert.destroy);
});