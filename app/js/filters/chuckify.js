var module = angular.module('adze.filters');



module.filter('chuckify', function(myChuckNorrisJoke) {

  return function(input) {
    return input + ' - ' + (myChuckNorrisJoke.joke||'a joke goes here');
  };

});