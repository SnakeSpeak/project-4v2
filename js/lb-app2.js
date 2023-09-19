// Creating our initial map object:
// Initialize separate marker cluster groups for each weather layer
let clearCluster = L.markerClusterGroup();
let rainCluster = L.markerClusterGroup();
let snowCluster = L.markerClusterGroup();
let cloudyCluster = L.markerClusterGroup();
let otherCluster = L.markerClusterGroup();

// Create a Leaflet map and set its center and zoom level.
  const myMap = L.map('map', {
    center: [37.0902, -95.7129],
    zoom: 5,
    maxZoom: 18, // Add the maxZoom property
    layers: [
      clearCluster,
      rainCluster,
      snowCluster,
      cloudyCluster,
      otherCluster
    ]
  });

  // Create the tile layer that will be the background of our map.
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


  // Create an overlays object to add to the layer control.
  let overlays = {
    "Clear": clearCluster,
    "Rain": rainCluster,
    "Snow": snowCluster,
    "Cloudy": cloudyCluster,
    "Other": otherCluster
  };

  // Create a control for our layers, and add our overlays to it.
  let layerControl = L.control.layers(null, overlays).addTo(myMap);

  // Create a legend to display information about our map.
  let info = L.control({
    position: "bottomright"
  });

  // When the layer control is added, insert a div with the class of "legend".
  info.onAdd = function() {
    let div = L.DomUtil.create("div", "legend");
    return div;
  };

  // Add the info legend to the map.
  info.addTo(myMap);

// Initialize an object that contains icons for each layer group.
let icons = {
  CLEAR: L.ExtraMarkers.icon({
    icon: "ion-star",
    iconColor: "white",
    markerColor: "yellow"
  }),
  RAIN: L.ExtraMarkers.icon({
    icon: "ion-umbrella",
    iconColor: "white",
    markerColor: "green"
  }),
  SNOW: L.ExtraMarkers.icon({
    icon: "ion-ios-snowy",
    iconColor: "white",
    markerColor: "blue"
  }),
  CLOUDY: L.ExtraMarkers.icon({
    icon: "ion-cloud",
    iconColor: "black",
    markerColor: "white"
  }),
  OTHER: L.ExtraMarkers.icon({
    icon: "icon ion-ios-circle-filled",
    iconColor: "white",
    markerColor: "black"
  })
};

// Initialize an array to hold all the marker cluster groups
let markerClusters = [clearCluster, rainCluster, snowCluster, cloudyCluster, otherCluster];

// Function to clear existing marker clusters and reset weatherCount object
function clearMap() {
  // Remove all marker clusters from the map
  markerClusters.forEach(cluster => myMap.removeLayer(cluster));
  // Clear the marker clusters
  clearCluster.clearLayers();
  rainCluster.clearLayers();
  snowCluster.clearLayers();
  cloudyCluster.clearLayers();
  otherCluster.clearLayers();

  // Reset the weatherCount object
  let weatherCount = {
    CLEAR: 0,
    RAIN: 0,
    SNOW: 0,
    CLOUDY: 0,
    OTHER: 0
  };

  // Update the legend with the reset weatherCount
  updateLegend(weatherCount);
}

function createWeatherMap(value) {
  clearMap();

  // Fetch weather data using promises
  const url2 = "http://yleep4flask.azurewebsites.net/api/v1.0/weather_conditions";
  fetch(url2)
    .then(response => response.json())
    .then(data => {
      let weatherCount = {
        CLEAR: 0,
        RAIN: 0,
        SNOW: 0,
        CLOUDY: 0,
        OTHER: 0
      };
      let stateOutput = [];
      let bounds = [];

      for (let k = 0; k < data.length; k++) {
        let row = data[k];
        if (row.state == value) {
          stateOutput.push(row);
        }
      }

  // Loop through the stations (they're the same size and have partially matching data).
  for (let i = 0; i < stateOutput.length; i++) {
  
    // Loop through weather conditions
    if (stateOutput[i].weather_condition == "Clear") { 
      weatherStatusCode = "CLEAR";
    }

    else if (stateOutput[i].weather_condition == "Rain") {
      weatherStatusCode = "RAIN";
    }

    else if (stateOutput[i].weather_condition == "Snow") {
      weatherStatusCode = "SNOW";
    }

    else if (stateOutput[i].weather_condition == "Cloudy") {
      weatherStatusCode = "CLOUDY";
    }

    else {
      weatherStatusCode = "OTHER";
    }
  

    // Update weather count
    weatherCount[weatherStatusCode]++;
  
    let newMarker = L.marker([stateOutput[i].lat, stateOutput[i].lon], {
      icon: icons[weatherStatusCode]
    });

    let popupContent = `<b>State:</b> ${stateOutput[i].state}<br><b>Weather:</b> ${stateOutput[i].weather_condition}<br>`;

    newMarker.bindPopup(popupContent);

    // Add the marker to the appropriate weather layer group based on the weatherStatusCode
    if (weatherStatusCode === "CLEAR") {
      clearCluster.addLayer(newMarker);
    } else if (weatherStatusCode === "RAIN") {
      rainCluster.addLayer(newMarker);
    } else if (weatherStatusCode === "SNOW") {
      snowCluster.addLayer(newMarker);
    } else if (weatherStatusCode === "CLOUDY") {
      cloudyCluster.addLayer(newMarker);
    } else {
      otherCluster.addLayer(newMarker);
    }

    bounds.push([stateOutput[i].lat, stateOutput[i].lon]);
  }

  // Add the markerCluster groups for each weather layer to the map
  myMap.addLayer(clearCluster);
  myMap.addLayer(rainCluster);
  myMap.addLayer(snowCluster);
  myMap.addLayer(cloudyCluster);
  myMap.addLayer(otherCluster);

  // Update the legend
  updateLegend(weatherCount);

  myMap.fitBounds(bounds, {
    padding: [20, 20]
  });
})
.catch(error => {
  console.error("Error fetching weather data:", error);
});
}

function updateLegend(weatherCount) {
  document.querySelector(".legend").innerHTML = [
    "<p class='clear'>Clear: " + weatherCount.CLEAR + "</p>",
    "<p class='rain'>Rain: " + weatherCount.RAIN + "</p>",
    "<p class='snow'>Snow: " + weatherCount.SNOW + "</p>",
    "<p class='cloudy'>Cloudy: " + weatherCount.CLOUDY + "</p>",
    "<p class='other'>Other: " + weatherCount.OTHER + "</p>",
  ].join("");
}

// Add an event listener to the dropdown menu to detect state selection changes
const stateDropdown = document.getElementById("selDataset1"); // Replace "selDataset1" with the actual ID of your dropdown menu
stateDropdown.addEventListener("change", function () {
  const selectedState = stateDropdown.value;
  createWeatherMap(selectedState);
});

// Call the createWeatherMap function to display markers for Alabama initially
function init() {
  createWeatherMap("Alabama");
}

init();