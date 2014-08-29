var module = angular.module(PKG.name+'.directives');

module.directive('mySortable', function mySortableDirective ($log) {

  function getPredicate(node) {
    return node.attr('data-predicate') || node.text();
  }

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var headers = element.find('th');

      scope.sortable = {
        predicate: getPredicate(headers.eq(0).addClass('predicate')),
        reverse: false
      };

      headers.append('<i class="fa fa-toggle-down"></i>');

      headers.on('click', function(event) {
        var th = angular.element(this),
            predicate = getPredicate(th);

        scope.$apply(function() {
          if(scope.sortable.predicate === predicate){
            scope.sortable.reverse = !scope.sortable.reverse;
            th.find('i').toggleClass('fa-flip-vertical');
          }
          else {
            headers.removeClass('predicate');
            headers.find('i').removeClass('fa-flip-vertical');
            scope.sortable = {
              predicate: predicate,
              reverse: false
            };
            th.addClass('predicate');
          }
        });
      });

    }
  };
});
