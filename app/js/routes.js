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




      /*
        clusters
       */

      .state("clusters", {
        url: "/clusters",
        templateUrl: '/partials/lorem.html',
        data: {
          title: 'Clusters',
          authorizedRoles: MYAUTH_ROLE.all
        }
      })

        .state("clusters.create", {
          url: "/create"
        })


      /*
        cluster template catalog
       */

      .state("templates", {
        url: "/templates",
        templateUrl: '/partials/lorem.html',
        data: {
          title: 'Catalog',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      })

        .state("templates.create", {
          url: "/create"
        })


      /*
        providers
       */

      .state("providers", {
        url: "/providers",
        templateUrl: '/partials/lorem.html',
        data: {
          title: 'Providers',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      })

        .state("providers.create", {
          url: "/create"
        })


      /*
        hardwaretypes
       */

      .state("hardwaretypes", {
        url: "/hardwaretypes",
        templateUrl: '/partials/lorem.html',
        data: {
          title: 'Hardware',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      })

        .state("hardwaretypes.create", {
          url: "/create"
        })


      /*
        imagetypes
       */

      .state("imagetypes", {
        url: "/imagetypes",
        templateUrl: '/partials/lorem.html',
        data: {
          title: 'Images',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      })

        .state("imagetypes.create", {
          url: "/create"
        })

      /*
        services
       */

      .state("services", {
        url: "/services",
        templateUrl: '/partials/lorem.html',
        data: {
          title: 'Services',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      })

        .state("services.create", {
          url: "/create"
        })

      ;
  })
  .run(function ($rootScope, $state, $alert, $timeout, myAuth, MYAUTH_EVENT, MYAUTH_ROLE) {

    if(!myAuth.currentUser) {
      $timeout(function() {
        $state.go('login');        
      });
    }

    $rootScope.$on(MYAUTH_EVENT.loginSuccess, function (event) {
      $alert({title:event.name, content:"Hello, "+myAuth.currentUser.username+"!", type:'success', duration:3});
      $state.go(myAuth.currentUser.hasRole(MYAUTH_ROLE.admin) ? 'home' : 'clusters');
    });

    $rootScope.$on(MYAUTH_EVENT.logoutSuccess, function (event) {
      $alert({title:event.name, content:"Bye for now!", type:'info', duration:3});
      $state.go('home');
    });

    angular.forEach([
        MYAUTH_EVENT.loginFailed,
        MYAUTH_EVENT.sessionTimeout,
        MYAUTH_EVENT.notAuthorized,
        MYAUTH_EVENT.notAuthenticated
      ], 
      function (v, k) {
        $rootScope.$on(v, function (event) {
          $alert({title:event.name, type:'danger', duration:3});
          $state.is('login') || $state.go('login');
        });
      }
    );

  })

  ;
