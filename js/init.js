
init();

function init() {
    let dropdown1 = d3.select("#selDataset1");
    d3.json(stateData).then(function(data){
        // Extract the state names from the data
        let stateNames = data.features.map((feature) => feature.properties.NAME);
        // Sort the state names alphabetically
        stateNames.sort();

        // Clear existing options before adding alphabetized ones
        dropdown1.html("");

        // Append the sorted state names to the dropdown
        stateNames.forEach((stateName) => {
            dropdown1.append("option").text(stateName).property("value", stateName);
        });
        let init_state = stateNames[0];
        displayPop(init_state)
        createLightingBarGraph(init_state)
    });
}


function newState(state) {
    displayPop(state);
    createLightingBarGraph(state);
    createWeatherMap(state);
};