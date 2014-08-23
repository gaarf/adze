angular.module(PKG.name)
  .config(function ($stateProvider, $urlRouterProvider, MYAUTH_ROLE) {

    /////////////////////////////
    // Redirects and Otherwise //
    /////////////////////////////

    $urlRouterProvider
      .when('/signin', '/login')
      .otherwise('/');


    //////////////////////////
    // State Configurations //
    //////////////////////////

    $stateProvider

      .state("home", {
        url: "/",
        templateUrl: '/partials/home.html'
      })

      .state("login", {
        url: "/login",
        templateUrl: '/partials/login.html',
        controller: "LoginCtrl"
      })

      .state("hello", {
        url: "/hello",
        templateUrl: '/partials/hello.html',
        data: {
          authorizedRoles: MYAUTH_ROLE.all
        }
      })

      .state("admin", {
        url: "/admin",
        templateUrl: '/partials/admin.html',
        data: {
          authorizedRoles: MYAUTH_ROLE.admin
        }
      })

      ;
  })
  .run(function ($rootScope, $state, $alert, MYAUTH_EVENT) {

    $rootScope.$on(MYAUTH_EVENT.notAuthenticated, function (event) {
      $alert({content:event.name, type:'warning', duration:3});
      $state.go('login');
    });

    $rootScope.$on(MYAUTH_EVENT.notAuthorized, function (event) {
      $alert({content:event.name, type:'danger', duration:3});
      $state.go('home');
    });

    angular.forEach([
        MYAUTH_EVENT.loginSuccess,
        MYAUTH_EVENT.logoutSuccess,
        MYAUTH_EVENT.loginFailed,
        MYAUTH_EVENT.sessionTimeout
      ], 
      function (v, k) {
        $rootScope.$on(v, function (event) {
          var s = event.name.match(/success$/);
          $alert({content:event.name, type:s?'info':'warning', duration:3});
          if(s) { $state.go('home'); }
        });
      }
    );

  })

  ;
