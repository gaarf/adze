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
        /#/clusters/...
       */

      .state(abstractSubnav('Cluster', {
        authorizedRoles: MYAUTH_ROLE.all
      }))

        .state('clusters.list', {
          url: '',
          templateUrl: '/partials/clusters/list.html',
          controller: 'ClustersListCtrl',
          data: {
            title: 'Live clusters'
          }
        })

        .state('clusters.edit', {
          url: '/edit/:id',
          templateUrl: '/partials/clusters/edit.html',
          controller: 'ClustersEditCtrl',
          data: {
            title: 'Edit cluster'
          }
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
        /#/catalog/...
       */

      .state(abstractSubnav('Template', {
        title: 'Catalog',
        ddLabel: 'Cluster Templates',
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
        /#/providers/...
       */

      .state(abstractSubnav('Provider', {
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
        /#/hardwaretypes/...
       */

      .state(abstractSubnav('HardwareType', {
        title: 'Hardware',
        ddLabel: 'Hardware Types',
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
        /#/imagetypes/...
       */

      .state(abstractSubnav('ImageType', {
        title: 'Images',
        ddLabel: 'Image Types',
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
        /#/services/...
       */
      .state(abstractSubnav('Service', {
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
     * create an abstract state object by assuming defaults
     * @param  {String} name of the model to base on eg 'Cluster'
     * @param  {Object} data optional overrides
     * @return {Object}      state object
     */
    function abstractSubnav(name, data) {
      var lower = name.toLowerCase(),
          plural = name + 's',
          stateName = plural.toLowerCase()
      return {
        name: stateName,
        abstract: true,
        templateUrl: '/partials/subnav.html',
        controller: 'SubnavCtrl',
        url: '/' + stateName,
        data: angular.extend({
          title: plural,
          ddLabel: plural,
          ddModel: name
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
      $alert({title:'Welcome!', content:'Your tenant is "'+myAuth.currentUser.tenant+'".', type:'success', duration:3});
      $state.go(myAuth.currentUser.hasRole(MYAUTH_ROLE.admin) ? 'home' : 'clusters.list');
    });

    $rootScope.$on(MYAUTH_EVENT.logoutSuccess, function (event) {
      $alert({title:'Bye!', content:'You are now logged out.', type:'info', duration:3});
      $state.go('home');
    });

    $rootScope.$on(MYAUTH_EVENT.notAuthorized, function (event) {
      $alert({title:'Authentication error!', content:'You are not allowed to access the requested page.', type:'warning', duration:3});
    });

    angular.forEach([
        MYAUTH_EVENT.loginFailed,
        MYAUTH_EVENT.sessionTimeout,
        MYAUTH_EVENT.notAuthenticated
      ], 
      function (v, k) {
        $rootScope.$on(v, function (event) {
          $alert({title:event.name, type:'danger', duration:3});
          if(!$state.is('login')) {
            $state.go('login');
          }
        });
      }
    );

  })

  ;
