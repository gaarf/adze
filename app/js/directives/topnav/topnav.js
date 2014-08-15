var app = angular.module('adze');

app.directive('myTopnav', function($dropdown) {
  return {
    restrict: 'A',
    templateUrl: 'topnav/topnav.tpl',
    scope: {},
    link: function(scope, element, attrs) {
      $dropdown(angular.element(element[0].querySelector('a.dropdown-toggle')), {
        template: 'topnav/dropdown.tpl',
        animation: 'am-flip-x'
      });
    }
  };
});