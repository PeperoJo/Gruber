var myApp = angular.module('myApp', ['ngParse', 'ngRoute', 'ngMaterial', 'mapboxgl-directive']);

/* Trip Model */
var TripModel = function (Parse) {
	this.Parse = Parse;
	this.data = {};
	this.collection = [];
	this.name = 'Trip';
	this.New = New;
	this.getById = getById;
	this.getByName = getByName;
	this.getByDest = getByDest;
	this.getByDestAll = getByDestAll;
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
				this.data = result;
				console.log(result);
				return result;
			})
	}

	function getByDestAll(dest) {
		return new this.Parse.Query(this.New())
			.equalTo('destination', dest)
			.find()
			.then(result => {
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

var GeoDecoder = function($http) {
	this.getCoordsfromAddr = getCoordsfromAddr;
	function getCoordsfromAddr(location) {
		return $http({
			method: 'GET',
			url: 'http://localhost:3000/location/address',
			params: {
				address: location
			}
		})
	}
}

TripModel
	.$inject = ['Parse'];
GeoDecoder
	.$inject = ['$http'];
myApp
	.service('TripModel', TripModel);
myApp
	.service('GeoDecoder', GeoDecoder);

angular.module('myApp')
	.config(['ParseProvider', function (ParseProvider) {
		var MY_PARSE_APP_ID = 'mzhOlXatBmYQSNUS1DM8qkFtWyUzUNPqCTtvS3Jk';
		var MY_PARSE_JS_KEY = 'fuErVJGUuOmR0lFKJYaycPfEPnNxckNB7eyLmpwp';
		ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
		ParseProvider.serverURL = 'https://parseapi.back4app.com';
  }]);

angular.module('myApp').config(['$locationProvider', function ($locationProvider) {
	$locationProvider.hashPrefix('');
}]);

angular.module('myApp').config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})
		.when('/add', {
			templateUrl: 'pages/form.html',
			controller: 'secondController'
		})
		.when('/confirm', {
			templateUrl: 'pages/confirm.html',
			controller: 'secondController'
		})
		.when('/friends', {
			templateUrl: 'pages/friends.html',
			controller: 'friendController'
		})
		.when('/dest', {
			templateUrl: 'pages/destination.html',
			controller: 'mapController'
		})
})

/* Controller */
myApp.controller('mainController', ['$scope', '$http', 'TripModel', function ($scope, $http, TripModel) {

	$scope.currentNavItem = 'Gruber';

	$scope.goto = function (page) {
		$scope.status = "Goto " + page;
	};

	//   $http({
	//   method: 'GET',
	//   url: 'http://localhost:3000/gruber'
	// 	}).then(function successCallback(response) {
	//     // this callback will be called asynchronously
	//     // when the response is available
	//         console.log(response);
	//         $scope.cards=response.data;
	//   }, function errorCallback(response) {
	//     // called asynchronously if an error occurs
	//     // or server returns response with an error status.
	//   });
	// 
}])

myApp.controller('secondController', ['$scope', '$window', 'TripModel', function ($scope, $window, TripModel) {
	$scope.getFormData = function () {
		alert("submitted");
		console.log($scope.trip);
		TripModel.addTrip($scope.trip);
		$window.location.href = '#/confirm';
	}

	$scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
		'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
		'WY').split(' ').map(function (state) {
		return {
			abbrev: state
		};
	});
}]);

myApp.run([function () {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3J1YmVybmQiLCJhIjoiY2pydHVyamE0MDJpdDQ0b2gxOHlqM2VtaiJ9.KdzYKQORKLwPfgATFxYIZw';

}])

myApp.controller('mapController', ['$scope', '$http', 'TripModel','GeoDecoder', function ($scope, $http, TripModel, GeoDecoder) {
		
	//Get all the addresses objects from Parse given a destiation
	var getListOfAddrObj = TripModel.getByDestAll("Chicago").then(function (result) {
		return result;
	});

	//Return the coordinates array needed for map rendering
	var coordsArr = getListOfAddrObj.then(function(addrObjects){
		var coordsPromises = []
		addrObjects.forEach(function (addrObject){
//			addrObject.set("finished", true);
//			console.log(addrObject);
			coordsPromises.push(translateAddrToCoord(addrObject));
		});
		Promise.all(coordsPromises).then(data => {
			console.log(data);
			drawMarkers(data);
		});
	});													 

	function translateAddrToCoord(addr) {
		var addr_formatted = formatAddr(addr);
		return GeoDecoder.getCoordsfromAddr(addr_formatted);
	}
								   
	function formatAddr(addr) {
		var addr_formatted = addr.attributes.address + ',' + addr.attributes.city + ',' + addr.attributes.state;
		return addr_formatted;
	}
	
	function createElement(iconSize) {
		var element = document.createElement('div');
		element.style.backgroundImage = 'url(https://placekitten.com/g/' + iconSize.width + '/' + iconSize.height + '/)';
		element.style.width = iconSize.width + 'px';
		element.style.height = iconSize.height + 'px';
		element.style.borderRadius = '50%';

		return element;
	}

	$scope.glControls = {
		navigation: {
			enabled: true,
			options: {
				position: 'top-left'
			}
		}
	};
	
	function drawMarkers(coordArray) {
		$scope.glMarkers = [];
		coordArray.forEach(function (coord) {
			$scope.glMarkers.push({
				element: createElement({
					width: 35,
					height: 35
				}),
				popup: {
					enabled: true,
					message: 'Hello World',
					options: {
						offset: 20
					}
				},
				coordinates: [coord.data.lng, coord.data.lat]
			});
		});
	}
	
}]);

myApp.controller('friendController', ['$scope','TripModel', function ($scope, TripModel) {
	TripModel.getByDest('Chicago').then(function(getResponse){
		for(i = 0; i < $scope.messages.length; i++){
			$scope.messages[i].what = getResponse.attributes.city;
		}
	});
	var imagePath = 'img/list/60.jpeg';
	$scope.messages = [{
		face: imagePath,
		what: 'Stuff',
		who: 'Gary',
		when: '3:08PM',
		notes: " Let's go! "
    }, {
		face: imagePath,
		what: 'Downtown bar this weekend?',
		who: 'Shuai',
		when: '3:08PM',
		notes: " It's beer thirty! "
    }, {
		face: imagePath,
		what: 'Brunch this weekend?',
		who: 'Jordan',
		when: '3:08PM',
		notes: " I'll be in your neighborhood doing errands"
    }, {
		face: imagePath,
		what: 'Brunch this weekend?',
		who: 'Kobe',
		when: '3:08PM',
		notes: " I'll be in your neighborhood doing errands"
    }, {
		face: imagePath,
		what: 'Brunch this weekend?',
		who: 'James',
		when: '3:08PM',
		notes: " I'll be in your neighborhood doing errands"
    }];
}]);