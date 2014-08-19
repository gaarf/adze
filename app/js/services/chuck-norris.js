var module = angular.module('adze.services');


module.factory('MyChuckNorrisRequest', function($resource){

  return $resource( 'http://api.icndb.com/jokes/random', 
    { 
      callback: 'JSON_CALLBACK' 
    }, 
    {
      getJoke: { 
        method: 'JSONP',
        transformResponse: function(data, headers) {
          return data.value;
        }
      }
    }
  );

});



module.service('myChuckNorrisJoke', function(MyChuckNorrisRequest){

  return MyChuckNorrisRequest.getJoke();

});