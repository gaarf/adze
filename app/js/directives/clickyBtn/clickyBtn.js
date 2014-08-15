var app = angular.module('adze');


app.directive('myClickyBtn', function(dateFilter) {
  return {
    restrict: 'A',
    templateUrl: 'clickyBtn/clickyBtn.tpl',
    scope: {
      thing: '@myClickyBtn'
    },
    link: function(scope, element, attrs) {

      function changeThing() {
        element.toggleClass('btn-success btn-danger');

        scope.$apply(function(){
          scope.thing = dateFilter(Date.now(), 'mediumTime');
        });
      }

      element
        .addClass('btn btn-success')
        .on('click', changeThing);
    }
  };
});