var module = angular.module(PKG.name+'.directives');

module.directive('myNavbar', function($dropdown, myAuth) {
  return {
    restrict: 'A',
    templateUrl: 'navbar/navbar.tpl',

    link: function(scope, element, attrs) {

      $dropdown(angular.element(element[0].querySelector('a.dropdown-toggle')), {
        template: 'navbar/dropdown.tpl',
        animation: 'am-flip-x',
        placement: 'bottom-right',
        scope: scope
      });

      scope.logout = myAuth.logout;

      scope.navbarAdminLinks = {
        'templates': 'Templates',
        'providers': 'Providers',
        'hardwaretypes': 'Hardware',
        'imagetypes': 'Images',
        'services': 'Services'
      };

    }
  };
});
