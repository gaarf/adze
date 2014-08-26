angular.module(PKG.name)
  .config(function ($stateProvider, $urlRouterProvider, MYAUTH_ROLE) {

    /////////////////////////////
    // Redirects and Otherwise //
    /////////////////////////////

    $urlRouterProvider
      .when('/signin', '/login')
      .otherwise('/');


    var abstractSubNav = {
      abstract: true,
      templateUrl: '/partials/subnav.html'
    };

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

      .state("clusters", angular.extend({
        url: "/clusters",
        data: {
          title: 'Clusters',
          ddLabel: 'Clusters',
          authorizedRoles: MYAUTH_ROLE.all
        }
      }, abstractSubNav))

        .state("clusters.list", {
          url: "",
          templateUrl: '/partials/clusters/list.html',
          controller: "ClustersListCtrl"
        })

        .state("clusters.create", {
          url: "/create",
          templateUrl: '/partials/clusters/create.html',
          controller: "ClustersCreateCtrl",
          data: {
            title: 'Create a cluster'
          }
        })


      /*
        cluster template catalog
       */

      .state("templates", angular.extend({
        url: "/templates",
        data: {
          title: 'Catalog',
          ddLabel: 'Templates',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      }, abstractSubNav))

        .state("templates.list", {
          url: "",
          templateUrl: '/partials/lorem.html'
        })

        .state("templates.create", {
          url: "/create",
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create a cluster template'
          }
        })


      /*
        providers
       */

      .state("providers", angular.extend({
        url: "/providers",
        data: {
          title: 'Providers',
          ddLabel: 'Providers',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      }, abstractSubNav))

        .state("providers.list", {
          url: "",
          templateUrl: '/partials/lorem.html'
        })

        .state("providers.create", {
          url: "/create",
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create a provider'
          }
        })


      /*
        hardwaretypes
       */

      .state("hardwaretypes", angular.extend({
        url: "/hardwaretypes",
        data: {
          title: 'Hardware',
          ddLabel: 'Hardware Types',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      }, abstractSubNav))

        .state("hardwaretypes.list", {
          url: "",
          templateUrl: '/partials/lorem.html'
        })

        .state("hardwaretypes.create", {
          url: "/create",
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create a hardware type'
          }
        })


      /*
        imagetypes
       */

      .state("imagetypes", angular.extend({
        url: "/imagetypes",
        data: {
          title: 'Images',
          ddLabel: 'Image Types',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      }, abstractSubNav))

        .state("imagetypes.list", {
          url: "",
          templateUrl: '/partials/lorem.html'
        })

        .state("imagetypes.create", {
          url: "/create",
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create an image type'
          }
        })


      /*
        services
       */

      .state("services", angular.extend({
        url: "/services",
        data: {
          title: 'Services',
          ddLabel: 'Services',
          authorizedRoles: MYAUTH_ROLE.admin
        }
      }, abstractSubNav))

        .state("services.list", {
          url: "",
          templateUrl: '/partials/lorem.html'
        })

        .state("services.create", {
          url: "/create",
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create a Service'
          }
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
      $state.go(myAuth.currentUser.hasRole(MYAUTH_ROLE.admin) ? 'home' : 'clusters.list');
    });

    $rootScope.$on(MYAUTH_EVENT.logoutSuccess, function (event) {
      $alert({title:event.name, content:"Bye for now!", type:'info', duration:3});
      $state.go('home');
    });

    $rootScope.$on(MYAUTH_EVENT.notAuthorized, function (event) {
      $alert({title:event.name, content:"You are not allowed to access the requested page.", type:'warning', duration:3});
    });

    angular.forEach([
        MYAUTH_EVENT.loginFailed,
        MYAUTH_EVENT.sessionTimeout,
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
