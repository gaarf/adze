var module = angular.module(PKG.name+'.controllers');


module.controller('SubnavCtrl', function ($scope, $state, myApi) {

  $scope.dropdown = [];

  var rootState = $state.get($state.current.name.split('.')[0]);

  myApi[$state.current.data.ddModel].query(function(list) {

    $scope.dropdown = list.map(function(item) {
      console.log(item);
      return {
        text: item.name,
        href: '#' + rootState.url + '/edit/' + (item.id || item.name)
      };
    });

  });


});
