
function showData() {
    //parse out api data
    d3.json("http://127.0.0.1:5000//api/v1.0/CRSS_data").then((data) =>)
}

function createLightingBarGraph(state) {
    //parse out api data
    d3.json("http://127.0.0.1:5000//api/v1.0/lighting_conditions").then((data) => {
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