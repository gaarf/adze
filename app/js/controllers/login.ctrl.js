var module = angular.module(PKG.name+'.controllers');

module.controller('LoginCtrl', function ($scope, myAuth, $alert, $state, cfpLoadingBar, $timeout, MYAUTH_EVENT) {

  $scope.credentials = myAuth.remembered();

  $scope.submitting = false;

  $scope.doLogin = function (c) {
    $scope.submitting = true;
    cfpLoadingBar.start();
    myAuth.login(c)['finally'](function(){
      $scope.submitting = false;
      cfpLoadingBar.complete();
    });
  };

  $scope.$on('$viewContentLoaded', function() { 
    if(myAuth.isAuthenticated()) {
      $state.go('home');
      $alert({content:"You are already logged in!", type:'warning', duration:5});
    }
    else {
      focusLoginField();
    }
  });

  $scope.$on(MYAUTH_EVENT.loginFailed, focusLoginField);

  function focusLoginField() { // should be a directive...
    $timeout(function() {
      document.getElementById($scope.credentials.username ? 'loginPassword' : 'loginUsername').select();
    }, 10); // the timeout is so this triggers AFTER any potential focus() on an $alert
  }

});
