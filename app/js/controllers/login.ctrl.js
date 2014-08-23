var module = angular.module(PKG.name+'.controllers');


module.controller('LoginCtrl', function ($scope, myAuth, $alert, $state, $localStorage) {

  var invalidAlert = $alert({title:'Error', content:"Invalid indentifier!", type:"danger", show: false}),
      r = $localStorage.remember;

  $scope.credentials = {
    username: r ? r.username : '',
    tenant: r ? r.tenant : '',
    remember: !!r
  };

  $scope.login = function (c) {
    if(!c.username || !c.tenant) {
      invalidAlert.show();
    } else {
      myAuth.login(c).then(function(){
        $localStorage.remember = c.remember && myAuth.currentUser;
      });
    }
  };

  $scope.$on('$viewContentLoaded', function() { 
    if(myAuth.isAuthenticated()) {
      $state.go('home');
      $alert({content:"You are already logged in!", type:'warning', duration:5});
    }
  });

  $scope.$on('$destroy', invalidAlert.destroy);
});