var module = angular.module(PKG.name+'.directives');

module.directive('mySortable', function($log) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var headers = element.find('th'),
          firstField = headers.eq(0).addClass('predicate').text();

      scope.sortable = {
        predicate: firstField,
        reverse: false
      };

      headers.append('<i class="fa fa-toggle-down"></i>');

      headers.on('click', function(event) {
        var th = angular.element(this),
            field = th.text();

        scope.$apply(function() {
          if(scope.sortable.predicate === field){
            scope.sortable.reverse = !scope.sortable.reverse;
            th.find('i').toggleClass('fa-flip-vertical');
          }
          else {
            headers.removeClass('predicate');
            headers.find('i').removeClass('fa-flip-vertical');
            scope.sortable = {
              predicate: field,
              reverse: false
            };
            th.addClass('predicate');
          }
        });
      });

    }
  };
});
