var module = angular.module('adze.filters');



module.filter('myChuckify', function(myChuckNorrisJoke) {

  return function(input) {
    return input + ' - ' + (myChuckNorrisJoke.joke||'a joke goes here');
  };

});