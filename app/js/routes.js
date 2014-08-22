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

    angular.forEach(MYAUTH_EVENT, function (v, k) {
      $rootScope.$on(v, function onAuthEvent (event) {
        $state.go('home');
        console.log(event);
        $alert({content:event.name, type:'info', duration:5});
      });
    });

  })

  ;
