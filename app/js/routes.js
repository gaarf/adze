angular.module(PKG.name)
  .config(function ($stateProvider, $urlRouterProvider) {

    /////////////////////////////
    // Redirects and Otherwise //
    /////////////////////////////

    $urlRouterProvider
      .when('/foo/:foo', '/about/:foo')
      .otherwise('/');


    //////////////////////////
    // State Configurations //
    //////////////////////////

    $stateProvider

      .state("home", {
        url: "/",
        templateUrl: '/partials/home.html'
      })

      .state('about', {
        url: '/about',
        templateUrl: '/partials/about.html',
        data: {
          foo: 'Butters!'
        }
      })

        .state('about.foo', {
          url: '/:foo'
        })

      .state('contact', {
        url: '/contact',
        templateUrl: '/partials/contact.html',
        controller: 'ContactCtrl'
      })

        .state('contact.modal', {
          url: '/modal',
          data: {
            foo: 'Cartman!'
          },
          onEnter: function($state, $modal) {
            var m = $modal({
              // contentTemplate is buggy
              template: '/partials/modal.html',
              show: false
            });
            m.$promise.then(function() {
              m.$scope.$on('modal.hide', function(){
                $state.transitionTo('contact');
              });
              m.show();
            });
          }
        })

      ;
  });