angular
  .module('adze', [
    'ngAnimate', 
    'ngSanitize', 
    'ui.router',
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.dropdown',
    'mgcrea.ngStrap.modal',
    'mgcrea.ngStrap.alert',
    'mgcrea.ngStrap.popover'
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
        .when('/foo/:bar', '/about?bar')
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
          templateUrl: '/partials/about.html'
        })

        .state('contact', {
          url: '/contact',
          templateUrl: '/partials/contact.html',
          controller: 'ContactCtrl'
        })

          .state('contact.modal', {
            url: '/modal',
            onEnter: function($state, $modal) {
              var m = $modal({
                title: 'My Modal',
                contentTemplate: '/partials/lipsum.html',
                show: false
              });

              m.$scope.$on('modal.hide', function(){
                $state.transitionTo('contact');
              });

              m.$promise.then(function() {
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