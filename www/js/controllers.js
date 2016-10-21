angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	
})


.controller('LocationCtrl', function($scope, $stateParams, $timeout, $cordovaGeolocation) {
	$scope.showMenuT = true;

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
	  
	  $scope.pos = position.coords;
    }, function(err) {
      // error
    });


  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
	  $scope.pos = position.coords;
  });


  //watch.clearWatch();

  
  
var map;

$timeout(function () {
	var div = document.getElementById("map_canvas");

	// Initialize the map view
	map = plugin.google.maps.Map.getMap(div);

	// Wait until the map is ready status.
	map.addEventListener(plugin.google.maps.event.MAP_READY, onBtnClicked);

}, 2999);

function onBtnClicked() {

  // Move to the position with animation
  map.animateCamera({
    target: {lat: $scope.pos.latitude, lng: $scope.pos.longitude},
    zoom: 17,
    tilt: 60,
    bearing: 140,
    duration: 5000
  }, function() {

    // Add a maker
    map.addMarker({
      position: {lat: $scope.pos.latitude, lng: $scope.pos.longitude},
      title: "Ashok Shah",
      snippet: "Gotch you",
      animation: plugin.google.maps.Animation.BOUNCE	
    }, function(marker) {

      // Show the info window
      marker.showInfoWindow();

      // Catch the click event
      marker.on(plugin.google.maps.event.INFO_CLICK, function() {

        // To do something...
        alert("Let's go!");

      });
    });
  });
}
	
});
