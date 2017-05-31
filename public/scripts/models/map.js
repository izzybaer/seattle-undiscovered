'use strict';

var map;
var infoWindow;
var service;
var category;
var gmarkers = [];

var iconBase = 'img/png/';
var icons = {
  bar:  {icon: iconBase + 'Beer_4.png'},
  cafe: {icon: iconBase + 'Coffee_5.png'},
  night_club: {icon: iconBase + 'Beer_4.png'},
  park: {  icon: iconBase + 'Flower_4.png'},
  restaurant: {icon: iconBase + 'Food_4.png'},
  point_of_interest: {icon: iconBase + 'Flag_4.png'}
};

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
    // if (result.photos[0] === 'undefined'){
    //   return
    // }
    if (result.rating < 4){
      addMarker(result);
    }
  }
}

function addMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon:
    {
      url: icons[category].icon,
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(35, 35)
    }
  });

  gmarkers.push(marker)

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      console.log(result)
      console.log(result.photos)
      if (result.photos === undefined){
        infoWindow.setContent(`<img class="infopic" src="http://corbitlibrary.org/wp-content/uploads/2014/06/Sad-face.jpg"><p><b>${result.name}</b><br />  ${result.formatted_address} <br /> Rating: ${result.rating} stars <br /> Phone number: ${result.formatted_phone_number} <br /></p> `);
        infoWindow.open(map, marker);
      }
      else {infoWindow.setContent(`<img class="infopic" src="${result.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 300})}"><p><b>${result.name}</b><br />  ${result.formatted_address} <br /> Rating: ${result.rating} stars <br /> Phone number: ${result.formatted_phone_number} <br /></p> `);
      infoWindow.open(map, marker);
}
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
  performSearch(category)
  map.addListener('idle', function() {performSearch(category)});
})
