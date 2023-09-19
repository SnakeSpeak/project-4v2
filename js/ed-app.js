const stateData = "Resources/gz_2010_us_040_00_500k.json"
const statePop = d3.json("http://yleep4flask.azurewebsites.net//api/v1.0/population")


function displayPop(state) {
    //parse out api data
    d3.json("http://yleep4flask.azurewebsites.net//api/v1.0/population")
    .then(data => {
        //filter to only see selected state data
        let value = data.filter(result => result.state == state);
        let statePop = value[0].population
        let name = value[0].state

        //adjust html elements to display population counts and state name
        const popEstElement = document.getElementById('popEst');
        const stateNameElement = document.getElementById('stateName');
        const stateName2Element = document.getElementById('stateName2');
        const stateName3Element = document.getElementById('stateName3')
        popEstElement.textContent = statePop.toLocaleString();
        stateNameElement.textContent = name.toLocaleString();
        stateName2Element.textContent = name.toLocaleString();
        stateName3Element.textContent = name.toLocaleString();
    })
}

function createLightingBarGraph(state) {
    //parse out api data
    d3.json("http://yleep4flask.azurewebsites.net///api/v1.0/lighting_conditions").then((data) => {
        //filter to only see selected state data
        let value = data.filter(result => result.state == state)
        const lightingCounts = {};
        //increase counts for specific lighting types
        value.forEach(item => {
            
            const lighting = item.lighting_condition;
            lightingCounts[lighting] = (lightingCounts[lighting] || 0)+1;
        })
        //create data for chart
        const lightingData = 
            {
                x: Object.keys(lightingCounts),
                y: Object.values(lightingCounts),
                type: 'bar'
            };
        //create layout, and slight adjustments for readability
        const layout = {
            xaxis: {
                title: 'Lighting Condition',
                automargin: true,
                tickangle: -45
            },
            yaxis:{
                title: 'Count'
            },
            width: 450,
            height: 400
        };
        //plot it out
        Plotly.newPlot('chart',[lightingData],layout);
    })

    
}