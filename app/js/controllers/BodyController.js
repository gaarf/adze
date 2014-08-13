var app = angular.module('adze');


app.controller('BodyController', function($scope) {
  $scope.dropdown = [
    {
      "text": "<i class=\"glyphicon glyphicon-download\"></i>&nbsp;Another action",
      "href": "#anotherAction"
    },
    {
      "text": "<i class=\"glyphicon glyphicon-globe\"></i>&nbsp;Display an alert",
      "click": "$alert(\"Holy guacamole!\")"
    },
    {
      "text": "<i class=\"glyphicon glyphicon-book\"></i>&nbsp;External link",
      "href": "/auth/facebook",
      "target": "_self"
    },
    {
      "divider": true
    },
    {
      "text": "Separated link",
      "href": "#separatedLink"
    }
  ];
});