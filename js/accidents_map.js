//create tile layer
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

// Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "street Map": streetmap
  };  
  // Create an overlayMaps object to hold the accident_loc layer
  // Use a filter through each of the states
  let overlayMaps = {
    "Accident Locations": accident_loc
  };

  //create drop down containing filtered data by state


  // Create the map object with options.
  let myMap = L.map("map-id", {
    center: [39.50, 98.35],
    zoom: 10,
    layers: [streetmap, accident_loc]
  });

 //Create the createMarkers

//Binding popup to markers

//Pass map layers into our layer control.
//Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

//ACTION: add div that holds our map to html file "<div id="map-id"></div>"
//ACTION:  <!-- Leaflet JavaScript code -->
  //<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  //integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  //crossorigin=""></script>
//ACTION: add 