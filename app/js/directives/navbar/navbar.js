var app = angular.module('adze');

app.directive('myNavbar', function($dropdown, $alert) {
  return {
    restrict: 'A',
    templateUrl: 'navbar/navbar.tpl',

    scope: {},

    link: function(scope, element, attrs) {

      scope.foo = 'bar';

      scope.navbarAlert = function(type, content) {
        $alert({title:'from navbar', content:content, type:type});
      };

      $dropdown(angular.element(element[0].querySelector('a.dropdown-toggle')), {
        template: 'navbar/dropdown.tpl',
        animation: 'am-flip-x',
        placement: 'bottom-right',
        scope: scope
      });

    }
  };
});
