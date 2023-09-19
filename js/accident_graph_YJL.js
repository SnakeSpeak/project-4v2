// Defining the URL for the API
let url = "http://yleep4flask.azurewebsites.net//api/v1.0/accident_type"

// Creating function to extract and graph data
function graph(data,value){
  // Creating empty lists
  let output = []
  let type_list = []
  let accident_count = []

  // For loop to extract accident type data 
  for (let i=0;i<data.length;i++){
    // Defining rows
    let row = data[i]

    // Conditional based on state selection
    if (row.state == value){
      // Push the data for the selected date to the output list
      output.push(row)
    }
  }

  // Define hashMap
  let hashMap = {}

  // Create a map object to count the number of each accident type
  output.map(element => {
  hashMap[element.accident_type] = hashMap[element.accident_type] + 1 || 1;
  });

  // Create a new object holding the accident type with their counts
  let aggregatedData =
  Object.keys(hashMap).map(element =>
  ({
    accident_type: element,
    count: hashMap[element]
  })
)

  // Sort aggregateData by accident type counts in descending order
  let new_data = aggregatedData.sort(function(a,b){return b.count - a.count})

  // Loop through the sorted data for only the first 10 accident types
  for (let a=0; a<10; a++){
    // Define the row in the new data
    sorted_row = new_data[a]

    // Define the accident type and accident type counts
    let type = sorted_row.accident_type
    let type_count = sorted_row.count

    // Push the accident type and accident type count to the corresponding list
    type_list.push(type)
    accident_count.push(type_count)
  }

  
  // Call bar_plot function to graph output values
  bar_plot(type_list, accident_count)


}

// Create function to graph the bar plot
function bar_plot(x_value, y_value){
  // Defining plot values
  let bar_plot = [{
      x: x_value,
      y: y_value,
      text: x_value,
      type: "bar"
  }];

  // Defining plot layout values
  let bar_layout = {
      xaxis: {
        title: 'Accident Type',
        automargin: true,
        tickangle: -45
      },
      yaxis: {
        title: 'Count'
      },
      width: 700,
      height: 400
  };

  // Plot the bar graph
  Plotly.newPlot("accident", bar_plot, bar_layout);
};

// Create initiation function
function init(){
    // Fetching JSON data
    d3.json(url).then(function(data){ 

        // Call data extraction/graphing function for first state
        graph(data, "Alabama")

    });

};


// On change to the DOM, call getData()
d3.selectAll("#selDataset1").on("change", getData);

// Create function for getData()
function getData(){
    // Assign the dropdown menu option to a letiable
    let dropdownMenu = d3.select("#selDataset1");

    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");

    // Fetching JSON data
    d3.json(url).then(function(data){

        // Call data extraction/graphing function based on value selected
        graph(data, dataset)
                    
    }); 


}

// Call initiation function
init();