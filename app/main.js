angular
  .module(PKG.name, [

    angular
      .module(PKG.name+'.services', [
        'ngResource'
      ]).name,

    angular
      .module(PKG.name+'.filters', [
        PKG.name+'.services'
      ]).name,

    angular
      .module(PKG.name+'.controllers', [
        PKG.name+'.services',
        PKG.name+'.filters'
      ]).name,

    angular
      .module(PKG.name+'.directives', [
        PKG.name+'.services',
        PKG.name+'.filters',
        'mgcrea.ngStrap.tooltip',
        'mgcrea.ngStrap.dropdown',
        'mgcrea.ngStrap.modal',
        'mgcrea.ngStrap.alert',
        'mgcrea.ngStrap.popover'
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

  .config(function ($alertProvider) {
    angular.extend($alertProvider.defaults, {
      animation: 'am-fade-and-slide-top',
      container: '#alerts > .container'
    });
  })

  ;