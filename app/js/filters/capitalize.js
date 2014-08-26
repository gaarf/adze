var module = angular.module(PKG.name+'.filters');


module.filter('myCapitalizeFilter', function () {

  return function(input) {
    input = input ? input.toLowerCase() : '';
    return input.substring(0,1).toUpperCase() + input.substring(1);
  }
});

