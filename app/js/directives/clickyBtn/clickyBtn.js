var app = angular.module('adze');


app.directive('myClickyBtn', function(dateFilter, $popover) {
  return {
    restrict: 'A',
    templateUrl: 'clickyBtn/clickyBtn.tpl',
    scope: {
      thing: '@myClickyBtn'
    },
    link: function(scope, element, attrs) {

      var pop = $popover(element, {
        title: 'clickyBtn',
        content: 'you should totally click this',
        placement: 'top',
        trigger: 'hover',
        scope: scope
      });

      function changeThing() {
        element.toggleClass('btn-success btn-danger');

        pop.toggle();

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