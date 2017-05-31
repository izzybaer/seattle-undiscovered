'use strict';

var map;
var infoWindow;
var service;
var category;
var gmarkers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.60616, lng: -122.328111},
    zoom: 15,
    styles: []
  });
  category = 'restaurant'
  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  // The idle event is a debounced event, so we can query & listen without
  // throwing too many requests at the server.
  map.addListener('idle', function() {performSearch(category)});
}

function performSearch(category) {
  var request = {
    bounds: map.getBounds(),
    type: category
  };
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    if (result.rating < 4.2){
      addMarker(result);
    }
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(10, 17)
    }
  });
  gmarkers.push(marker)

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }

      infoWindow.setContent(`<p> ${result.name} <br />  ${result.formatted_address} <br /> rating: ${result.rating} stars ${result.types}</p>`);
      infoWindow.open(map, marker);
    });
  });
}

function removeMarkers(){
  for(var i = 0; i < gmarkers.length; i++){
    gmarkers[i].setMap(null);
  }
}

$('form').submit(function(event) {
  event.preventDefault();
  var selectedCategory = document.getElementById('type');
  category = selectedCategory.options[selectedCategory.selectedIndex].value;
  removeMarkers();
  map.addListener('idle', function() {performSearch(category)});
})
