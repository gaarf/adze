var module = angular.module(PKG.name+'.controllers');


module.controller('LoginCtrl', function ($scope, myAuth, $alert, $state, $localStorage, cfpLoadingBar) {

  var r = $localStorage.remember;

  $scope.credentials = {
    username: r ? r.username : '',
    tenant: r ? r.tenant : '',
    remember: !!r
  };

  $scope.doLogin = function (c) {
    $scope.submitting = true;
    cfpLoadingBar.start();
    myAuth.login(c)
      .then(function(){
        $localStorage.remember = c.remember && myAuth.currentUser;
      })
      ['finally'](function(){
        $scope.submitting = false;
        cfpLoadingBar.complete();
      });
  };

  $scope.$on('$viewContentLoaded', function() { 
    if(myAuth.isAuthenticated()) {
      $state.go('home');
      $alert({content:"You are already logged in!", type:'warning', duration:5});
    }
  });

});