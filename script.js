// mapboxgl  object brought in from the mapbox scripts
mapboxgl.accessToken = 'pk.eyJ1IjoiamFkaXMiLCJhIjoiY2twcGN2Mms4MDYxOTJ3azlycGQ0Y3lsMSJ9.LnjO-ZOu9SA0J3iG_bUBJg';

//allow or block your current location pop-up
navigator.geolocation.getCurrentPosition(successLocation,
   errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
   setupMap([2.2770196, 48.8589507])
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: 'map',
    //without park location points
    // style: 'mapbox://styles/mapbox/streets-v11',
    // with bucharest park points
    style: 'mapbox://styles/jadis/ckpr8uji007k718nte0mex3e7',
    // bucharest
   // center: [26.10626, 44.43225],
    center: center,
    zoom: 10
  })

  const zoom = new mapboxgl.NavigationControl()
  map.addControl(zoom, 'top-right')

// add an event listener that runs when a user clicks on the map element

map.on('click', function(e) {
  //if the user clicked on one of your markers, get its information
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['bucharest-parks3']
  });
  if (!features.length) {
    return;
  }
  var feature = features[0];

  //create a popup, specify its options and properties, and add it to the map

    var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      '<h3>' + feature.properties.title + '</h3>' +
      '<p>' + feature.properties.description + '</p>'
      )
    .addTo(map);

});

var directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  unit: 'metric'
})

map.addControl(directions, 'top-left')
}
