# Import the dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify
from flask_cors import CORS


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///SQLiteDatabase/Accidents_Database.db")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

# Defining accident and population
accident = Base.classes.accidents
population = Base.classes.population
CRSS_data = Base.classes.CRSS_data

################################################
# Flask Setup 
################################################
app = Flask(__name__) 

# Setting CORS support_credentials to True
CORS(app, support_credentials=True)

#################################################
# Flask Routes
#################################################

# Main route listing all API routes
@app.route("/")
def welcome():
    """List all aviailable API Routes."""
    return(
        f"<h3>Available Routes:</h3>"
        f"/api/v1.0/lighting_conditions<br>"
        f"/api/v1.0/weather_conditions<br>"
        f"/api/v1.0/accident_type<br>"
        f"/api/v1.0/population<br>"
        f"/api/v1.0/CRSS_data<br>"
        )


# Route for lighting conditions
@app.route("/api/v1.0/lighting_conditions")
def lighting():
    # Open session
    session = Session(engine)

    # Query returning state, latitude, longitude and lighting conditions from the accidents table
    lighting_results = session.query(accident.STATENAME, accident.LATITUDE, accident.LONGITUD, accident.LGT_CONDNAME).all()
        
    # Close session
    session.close

    # Open empty lighting list to record output
    lighting = []

    # For loop through the query results
    for STATENAME, LATITUDE, LONGITUD, LGT_CONDNAME in lighting_results:
        # Open empty dicitionary
        light_dict = {}

        # Write output into dictionary
        light_dict["state"] = STATENAME
        light_dict["lat"] = LATITUDE
        light_dict["lon"] = LONGITUD
        light_dict["lighting_condition"] = LGT_CONDNAME

        # Append dictionary to lighting list
        lighting.append(light_dict)
    
    # Jsonify the output
    return jsonify(lighting)
    

# Route for weather conditions
@app.route("/api/v1.0/weather_conditions")
def weather():
    # Open session
    session = Session(engine)

    # Query returning state, latitude, longitude and weather conditions from the accidents table
    weather_results = session.query(accident.STATENAME, accident.LATITUDE, accident.LONGITUD, accident.WEATHERNAME).all()
        
    # Close session
    session.close

    # Open empty weather list to record output
    weather = []

    # For loop through the query results
    for STATENAME, LATITUDE, LONGITUD, WEATHERNAME in weather_results:
        # Open empty dicitionary
        weather_dict = {}

        # Write output into dictionary
        weather_dict["state"] = STATENAME
        weather_dict["lat"] = LATITUDE
        weather_dict["lon"] = LONGITUD
        weather_dict["weather_condition"] = WEATHERNAME

        # Append dictionary to weather list
        weather.append(weather_dict)
    
    # Jsonify the output
    return jsonify(weather)


# Route for accident types
@app.route("/api/v1.0/accident_type")
def accident_call():
    # Open session
    session = Session(engine)

    # Query returning state, latitude, longitude and accident type from the accidents table  
    accident_results = session.query(accident.STATENAME, accident.LATITUDE, accident.LONGITUD, accident.HARM_EVNAME).all()
        
    # Close session
    session.close

    # Open empty accident list to record output
    accident_list = []

    # For loop through the query results
    for STATENAME, LATITUDE, LONGITUD, HARM_EVNAME in accident_results:
        # Open empty dicitionary
        accident_dict = {}

        # Write output into dictionary
        accident_dict["state"] = STATENAME
        accident_dict["lat"] = LATITUDE
        accident_dict["lon"] = LONGITUD
        accident_dict["accident_type"] = HARM_EVNAME

        # Append dictionary to accident list
        accident_list.append(accident_dict)
    
    # Jsonify the output
    return jsonify(accident_list)


# Route for population
@app.route("/api/v1.0/population")
def population_call():
    # Open session
    session = Session(engine)

    # Query returning state and 2021 population estimate from population table
    population_results = session.query(population.NAME, population.POPESTIMATE2021).all()
        
    # Close session
    session.close

    # Open empty population list to record output
    population_list = []

    # For loop through the query results
    for NAME, POPESTIMATE2021 in population_results:
        # Open empty dicitionary
        population_dict = {}

        # Write output into dictionary
        population_dict["state"] = NAME
        population_dict["population"] = POPESTIMATE2021

        # Append dictionary to population list
        population_list.append(population_dict)
    
    # Jsonify the output
    return jsonify(population_list)


@app.route("/api/v1.0/CRSS_data")
def CRSS_call():
    # Open session
    session = Session(engine)

    # Query from CRSS_data table
    CRSS_results = session.query(CRSS_data.BODY_TYP, CRSS_data.SPEEDREL, CRSS_data.AGE, CRSS_data.SEX, \
                                  CRSS_data.DRUGS, CRSS_data.INJ_SEV, CRSS_data.MAN_COLL, CRSS_data.WEATHER, \
                                    CRSS_data.MONTH, CRSS_data.HOUR, CRSS_data.DAY_WEEK, CRSS_data.ALCOHOL).all()
        
    # Close session
    session.close

    # Open empty CRSS_dataing list to record output
    CRSS_list = []

    # For loop through the query results
    for BODY_TYP, SPEEDREL, AGE, SEX, DRUGS, INJ_SEV, \
        MAN_COLL, WEATHER, MONTH, HOUR, DAY_WEEK, ALCOHOL in CRSS_results:
        # Open empty dicitionary
        CRSS_dict = {}

        # Write output into dictionary
        CRSS_dict["body_type"] = BODY_TYP
        CRSS_dict["speed"] = SPEEDREL
        CRSS_dict["age"] = AGE
        CRSS_dict["sex"] = SEX
        CRSS_dict["drugs"] = DRUGS
        CRSS_dict["inj_sev"] = INJ_SEV
        CRSS_dict["collision"] = MAN_COLL
        CRSS_dict["weather"] = WEATHER
        CRSS_dict["month"] = MONTH
        CRSS_dict["hour"] = HOUR
        CRSS_dict["day_of_week"] = DAY_WEEK
        CRSS_dict["alcohol"] = ALCOHOL


        # Append dictionary to CRSS_dataing list
        CRSS_list.append(CRSS_dict)
    
    # Jsonify the output
    return jsonify(CRSS_list)


if __name__ == '__main__':
    app.run(debug=True)
