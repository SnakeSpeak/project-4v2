from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

with open('LOCATION_ML_MODEL.pkl','rb') as model_file:
    accident_model = pickle.load(model_file)

@app.route('/',methods=['GET','POST'])
def index():
    result = None

    if request.method == 'POST':
        # Get the input values from the dropdown elements on index.html
        input_features = [request.form['dropdown1'], \
                           request.form['dropdown2'], \
                            request.form['dropdown3']]
        
        # May have to increase input features and preprocess if needed

        # Make predictions from the model
        prediction = accident_model.predict([input_features])[0]
    
        # Display the prediction
        result = f"Predicted Severity of Injury and Probability {prediction}"

    return render_template('index.html', result = result)

if __name__ == '__main__':
    app.run(debug = True)