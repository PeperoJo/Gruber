var myApp = angular.module('myApp',['ngParse', 'ngRoute', 'ngMaterial', 'mapboxgl-directive']);

/* Trip Model */
var TripModel = function(Parse) {
    this.Parse = Parse;
    this.data = {};
    this.collection = [];
    this.name = 'Trip';
    this.New = New;
    this.getById = getById;
    this.getByName = getByName;
    this.getByDest = getByDest;
	this.addTrip = addTrip;
	
    function New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name);
            return parseObject;
        } else {
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
    function getByName(name) {
         console.log('name', name)
         return new this.Parse.Query(this.New())
             .equalTo('name', name)
             .first()
             .then(result => {
                 this.Parse.defineAttributes(result, this.fields);
                 this.data = result;
                 console.log('result', result)
                 return result;
             })
     }
    function getByDest(dest) {
         return new this.Parse.Query(this.New())
             .equalTo('destination', dest)
             .first()
             .then(result => {
                 this.Parse.defineAttributes(result, this.fields);
                 this.data = result;
                 return result;
             })
     }
	function addTrip(trip) {
		var newTrip = this.New();
		console.log(this.data);
		Object.keys(trip).forEach(function (key) {
			newTrip.set(key, trip[key]);
		});

		newTrip.save().then(
			(result) => {
				console.log('ParseObject created', result);
			},
			(error) => {
				console.error('Error while creating ParseObject: ', error);
			}
		);		
	}
    //     class getAllAgencies() {
    //         return new this.Parse.Query(this.New()).find(agencies => {
    //             agencies.forEach(agency =>
    //                 this.Parse.defineAttributes(agency, this.fields)
    //             );
    //             this.collection = agencies;
    //             return Promise.resolve(agencies);
    //         }).catch(error => Promise.reject(error));
    //     }
    
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

angular.module('myApp').config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

angular.module('myApp').config(function($routeProvider){    
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })
    .when('/add', {
        templateUrl: 'pages/form.html',
        controller: 'secondController'            
    })
    .when('/dest', {
        templateUrl: 'pages/destination.html',
        controller: 'mapController'            
    })
})

/* Controller */
myApp.controller('mainController',['$scope', '$http', 'TripModel',function($scope,$http,TripModel) {
    
    $scope.currentNavItem = 'Gruber';

    $scope.goto = function(page) {
      $scope.status = "Goto " + page;
    };

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

myApp.controller('secondController', ['$scope', 'TripModel', function ($scope, TripModel) {
    $scope.getFormData = function() {
        alert("submitted");
		console.log($scope.user);
		TripModel.addTrip($scope.user);
    }
    
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
    });
	console.log($scope.user);
}]);

myApp.run([function () {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ3J1YmVybmQiLCJhIjoiY2pydHVyamE0MDJpdDQ0b2gxOHlqM2VtaiJ9.KdzYKQORKLwPfgATFxYIZw';
}])

myApp.controller('mapController', ['$scope', function ($scope) {
        $scope.glControls = {
          navigation: {
            enabled: true,
            options: {
              position: 'top-left'
            }
          }
        };
}]);
