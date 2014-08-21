var module = angular.module(PKG.name+'.directives');

module.directive('myNavbar', function($dropdown, $alert) {
  return {
    restrict: 'A',
    templateUrl: 'navbar/navbar.tpl',

    link: function(scope, element, attrs) {

      scope.title = PKG.name + "@" + PKG.v;

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
