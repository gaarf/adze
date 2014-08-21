var module = angular.module(PKG.name+'.directives');


module.directive('myClickyBtn', function(dateFilter, $popover) {
  return {
    restrict: 'A',
    templateUrl: 'clicky-btn/clicky-btn.tpl',
    scope: {
      text: '@myClickyBtn'
    },
    link: function(scope, element, attrs) {

      var pop = $popover(element, {
        title: 'clicky button',
        content: 'you should totally click this',
        placement: 'top',
        trigger: 'hover',
        scope: scope
      });

      function changeThing() {
        element.toggleClass('btn-success btn-danger');

        pop.toggle();

        scope.$apply(function(){
          scope.text = dateFilter(Date.now(), 'mediumTime');
        });
      }

      element
        .addClass('btn btn-success')
        .on('click', changeThing);
    }
  };
});