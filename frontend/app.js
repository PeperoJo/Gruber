var myApp = angular.module('myApp',[]) ;

myApp.controller('mainController',['$scope', '$http', function($scope,$http) {
    
  $http({
  method: 'GET',
  url: 'http://localhost:3000/gruber'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
        console.log(response);
        $scope.cards=response.data;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
 
}])
