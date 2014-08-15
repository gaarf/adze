var app = angular.module('adze');

app.directive('myNavbar', function($dropdown, $log) {
  return {
    restrict: 'A',
    templateUrl: 'navbar/navbar.tpl',
    scope: true,
    link: function(scope, element, attrs) {

      $dropdown(angular.element(element[0].querySelector('a.dropdown-toggle')), {
        template: 'navbar/dropdown.tpl',
        animation: 'am-flip-x',
        placement: 'bottom-right',
        scope: scope
      });

      scope.foo = 'bar';
      scope.log = function(it) {
        $log.log(scope, it);
      };

    }
  };
});