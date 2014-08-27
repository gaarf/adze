angular.module(PKG.name)
  .config(function ($stateProvider, $urlRouterProvider, MYAUTH_ROLE) {

    /////////////////////////////
    // Redirects and Otherwise //
    /////////////////////////////

    $urlRouterProvider
      .when('/signin', '/login')
      .otherwise(function($injector, $location){
        $injector.get('$state').go($location.path() ? '404' : 'home');
      });


    //////////////////////////
    // State Configurations //
    //////////////////////////

    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: '/partials/home.html'
      })

      .state('404', {
        templateUrl: '/partials/404.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: '/partials/login.html',
        controller: 'LoginCtrl'
      })


      /*
        clusters
       */
      .state(abstractSubnav('clusters', {
        authorizedRoles: MYAUTH_ROLE.all
      }))

        .state('clusters.list', {
          url: '',
          templateUrl: '/partials/clusters/list.html',
          controller: 'ClustersListCtrl'
        })

        .state('clusters.edit', {
          url: '/edit/:id',
          templateUrl: '/partials/clusters/edit.html',
          controller: 'ClustersEditCtrl'
        })

        .state('clusters.create', {
          url: '/create',
          templateUrl: '/partials/clusters/create.html',
          controller: 'ClustersCreateCtrl',
          data: {
            title: 'Create a cluster'
          }
        })


      /*
        cluster template catalog
       */

      .state(abstractSubnav('templates', {
        title: 'Catalog',
        authorizedRoles: MYAUTH_ROLE.admin
      }))

        .state('templates.list', {
          url: '',
          templateUrl: '/partials/lorem.html'
        })

        .state('templates.create', {
          url: '/create',
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create a cluster template'
          }
        })


      /*
        providers
       */

      .state(abstractSubnav('providers', {
        authorizedRoles: MYAUTH_ROLE.admin
      }))

        .state('providers.list', {
          url: '',
          templateUrl: '/partials/lorem.html'
        })

        .state('providers.create', {
          url: '/create',
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create a provider'
          }
        })


      /*
        hardwaretypes
       */

      .state(abstractSubnav('hardwaretypes', {
        title: 'Hardware',
        ddLabel: 'Hardware Types',
        ddModel: 'HardwareType',
        authorizedRoles: MYAUTH_ROLE.admin
      }))

        .state('hardwaretypes.list', {
          url: '',
          templateUrl: '/partials/lorem.html'
        })

        .state('hardwaretypes.create', {
          url: '/create',
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create a hardware type'
          }
        })


      /*
        imagetypes
       */

      .state(abstractSubnav('imagetypes', {
        title: 'Images',
        ddLabel: 'Image Types',
        ddModel: 'ImageType',
        authorizedRoles: MYAUTH_ROLE.admin
      }))

        .state('imagetypes.list', {
          url: '',
          templateUrl: '/partials/lorem.html'
        })

        .state('imagetypes.create', {
          url: '/create',
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create an image type'
          }
        })


      /*
        services
       */
      .state(abstractSubnav('services', {
        authorizedRoles: MYAUTH_ROLE.admin
      }))

        .state('services.list', {
          url: '',
          templateUrl: '/partials/lorem.html'
        })

        .state('services.create', {
          url: '/create',
          templateUrl: '/partials/lorem.html',
          data: {
            title: 'Create a Service'
          }
        })

      ;


    /**
     * create an abstract state object
     * @param  {String} name of the state
     * @param  {Object} data optional overrides
     * @return {Object}      state object
     */
    function abstractSubnav(name, data) {
      var human = name.substring(0,1).toUpperCase() + name.substring(1);
      return {
        name: name,
        abstract: true,
        templateUrl: '/partials/subnav.html',
        controller: 'SubnavCtrl',
        url: '/' + name,
        data: angular.extend({
          title: human, // capitalized name
          ddLabel: human, // same as above
          ddModel: human.substring(0, human.length-1) // remove the plural
        }, data || {})
      };
    }

  })
  .run(function ($rootScope, $state, $alert, $timeout, myAuth, MYAUTH_EVENT, MYAUTH_ROLE) {

    if(!myAuth.currentUser) {
      $timeout(function() {
        $state.go('login');        
      });
    }

    $rootScope.$on(MYAUTH_EVENT.loginSuccess, function (event) {
      $alert({title:event.name, content:'Hello, '+myAuth.currentUser.username+'!', type:'success', duration:3});
      $state.go(myAuth.currentUser.hasRole(MYAUTH_ROLE.admin) ? 'home' : 'clusters.list');
    });

    $rootScope.$on(MYAUTH_EVENT.logoutSuccess, function (event) {
      $alert({title:event.name, content:'Bye for now!', type:'info', duration:3});
      $state.go('home');
    });

    $rootScope.$on(MYAUTH_EVENT.notAuthorized, function (event) {
      $alert({title:event.name, content:'You are not allowed to access the requested page.', type:'warning', duration:3});
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
