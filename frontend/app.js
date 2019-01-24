var myApp = angular.module('myApp',['ngParse']) ;

var TripModel = function(Parse) {
    this.Parse = Parse;
    this.data = {};
    this.collection = [];
    this.name = 'Trip';
    this.fields = [
            'destination'
    ];
    this.New = New;
    this.getById = getById;

    function New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name)
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }
    function getById(id) {
        return new this.Parse.Query(this.New()).get(id)
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                return Promise.resolve(result);
            }).catch(error => Promise.reject(error));
    }
    // function getByName(name) {
    //     console.log('name', name)
    //     return new this.Parse.Query(this.New())
    //         .equalTo('name', name)
    //         .first()
    //         .then(result => {
    //             this.Parse.defineAttributes(result, this.fields);
    //             this.data = result;
    //             console.log('result', result)
    //             return result
    //         })
    // }
    // class getAllAgencies() {
    //     return new this.Parse.Query(this.New()).find(agencies => {
    //         agencies.forEach(agency =>
    //             this.Parse.defineAttributes(agency, this.fields)
    //         );
    //         this.collection = agencies;
    //         return Promise.resolve(agencies);
    //     }).catch(error => Promise.reject(error));
    // }
}
TripModel
    .$inject = ['Parse'];
myApp
    .service('TripModel', TripModel);

angular.module('myApp')
  .config(['ParseProvider', function(ParseProvider) {
    var MY_PARSE_APP_ID = 'mzhOlXatBmYQSNUS1DM8qkFtWyUzUNPqCTtvS3Jk';
    var MY_PARSE_JS_KEY = 'fuErVJGUuOmR0lFKJYaycPfEPnNxckNB7eyLmpwp';
    ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
    ParseProvider.serverURL = 'https://parseapi.back4app.com';
  }]);


myApp.controller('mainController',['$scope', '$http', 'TripModel',function($scope,$http,TripModel) {

  TripModel.getById('srP5gJEtFt').then(function(result){
    console.log("trip result: ..", result);
  });
    
//   $http({
//   method: 'GET',
//   url: 'http://localhost:3000/gruber'
// }).then(function successCallback(response) {
//     // this callback will be called asynchronously
//     // when the response is available
//         console.log(response);
//         $scope.cards=response.data;
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });
 
}])
