angular
  .module('adze', [

    angular
      .module('adze.services', [
        'ngResource'
      ]).name,

    angular
      .module('adze.directives', [
        'mgcrea.ngStrap.tooltip',
        'mgcrea.ngStrap.dropdown',
        'mgcrea.ngStrap.modal',
        'mgcrea.ngStrap.alert',
        'mgcrea.ngStrap.popover'
      ]).name,

    angular
      .module('adze.controllers', [
      ]).name,

    angular
      .module('adze.filters', [
      ]).name,

    'ngAnimate',
    'ngSanitize',
    'ui.router'
  ])

  .run(function ($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

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
  })

  .config(function ($alertProvider) {
    angular.extend($alertProvider.defaults, {
      animation: 'am-fade-and-slide-top',
      container: '#alerts > .container'
    });
  })

  ;