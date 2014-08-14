var app = angular.module('adze');


app.directive('clickyBtn', function(dateFilter) {
  return {
    restrict: 'A',
    templateUrl: 'clickyBtn/clickyBtn.tpl',
    scope: {
      thing: '@clickyBtn'
    },
    link: function(scope, element, attrs) {

      function changeThing() {
        element.toggleClass('btn-success btn-danger');

        console.log(this, arguments);

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