var map;
var infoWindow;
var service;
var places = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.60616, lng: -122.328111},
    zoom: 15,
    // styles: [{
    //   stylers: [{ visibility: 'simplified' }]
    // }, {
    //   elementType: 'labels',
    //   stylers: [{ visibility: 'off' }]
    // }]
  });

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  // The idle event is a debounced event, so we can query & listen without
  // throwing too many requests at the server.
  map.addListener('idle', performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    // keyword: 'best view'
    type: 'store'
  };
  service.radarSearch(request, callback);
}
function callback(results, status) {
  places = results
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    console.log(result)
    return;
  }

  for (var i = 0, result; result = results[i]; i++) {
    addMarker(result);
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

  google.maps.event.addListener(marker, 'click', function() {
    console.log(place)
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      console.log(result)
      infoWindow.setContent(`<p>${result.name} <br />${result.formatted_address} <br /> rating: ${result.rating}</p>`);
      infoWindow.open(map, marker);
    });
  });
}
var newPlaces = []
for (var i = 0; i < places.length; i++){
service.getDetails(places[i], function(result, status) {
  if (status !== google.maps.places.PlacesServiceStatus.OK) {
    console.error(status);
    return;
  }
  console.log(result)
  newPlaces.push(result)
})
}
