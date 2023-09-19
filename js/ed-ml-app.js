async function predict() {
    model = await tf.loadLayersModel("tfjs_model/model.json");
            // Get input values from the dropdown elements
    var carBodySelect = document.getElementById("car_body_type").value;
    var collisionSelect = document.getElementById("manner_of_collision").value;
    var dayOfWeek = document.getElementById("day_of_the_week").value
    var hour = document.getElementById("hour").value
    var month = document.getElementById("month").value
    var sex = document.getElementById("sex").value
    var speed = document.getElementById("speed").value
    var weather = document.getElementById("weather").value
    var age = document.getElementById("age").value
    
    var input = [[
        0,
        parseInt(carBodySelect),
        parseInt(collisionSelect),
        parseInt(dayOfWeek),
        0,
        parseInt(hour),
        parseInt(month),
        parseInt(sex),
        parseInt(speed),
        parseInt(weather), 
        parseInt(age)
    ]]
    var prediction = model.predict(tf.tensor(input))
    console.log(prediction.data())
    var noApparentInjury = (prediction.arraySync()[0][0] *100).toFixed(2) + "%";
    var possibleInjury = (prediction.arraySync()[0][1] *100).toFixed(2) + "%"
    var suspectMinInjury = (prediction.arraySync()[0][2] *100).toFixed(2) + "%"
    var suspectSerInjury = (prediction.arraySync()[0][3] *100).toFixed(2) + "%"
    var fatalInjury = (prediction.arraySync()[0][4] *100).toFixed(2) + "%"
    console.log([noApparentInjury,possibleInjury,suspectMinInjury,suspectSerInjury,fatalInjury])

    displayPrediction(noApparentInjury, possibleInjury, suspectMinInjury, suspectSerInjury, fatalInjury);

    var class1Element = document.getElementById("class1");
    class1Element.textContent = noApparentInjury.toLocaleString();

    var class2Element = document.getElementById("class2");
    class2Element.textContent = possibleInjury.toLocaleString();

    var class3Element = document.getElementById("class3");
    class3Element.textContent = suspectMinInjury.toLocaleString();

    var class4Element = document.getElementById("class4");
    class4Element.textContent = suspectSerInjury.toLocaleString();

    var class5Element = document.getElementById("class5");
    class5Element.textContent = fatalInjury.toLocaleString();
}

function displayPrediction(noApparentInjury, possibleInjury, suspectMinInjury, suspectSerInjury, fatalInjury) {
    document.getElementById("class1").textContent = noApparentInjury;
    document.getElementById("class2").textContent = possibleInjury;
    document.getElementById("class3").textContent = suspectMinInjury;
    document.getElementById("class4").textContent = suspectSerInjury;
    document.getElementById("class5").textContent = fatalInjury;

    // Show the prediction section
    document.getElementById("predictionSection").classList.remove("hidden");
}
