from info import *
from flask import Flask, render_template, request, redirect, url_for
import json
from time import sleep
from pycaret.classification import *
from pycaret.datasets import get_data
model = load_model('saved_lr_model')

def predict_disease(symptoms):
    feature_vector = get_data('precautions')
    for symptom in symptoms:
        feature_vector[symptom] = 1
        
    prediction_result = predict_model(model, data=feature_vector)
    predicted_disease = prediction_result['prediction_label'][0]
    return predicted_disease

app = Flask(__name__)
result = None

@app.route("/")
def home():
   return render_template("index.html")

@app.route("/symptoms/<symptomList>", methods=['GET'])
def process_symptoms(symptomList):
   global result
   symptoms = json.loads(symptomList)
   print("help", symptoms)
   result = predict_disease(symptoms)

@app.route('/success', methods=['GET'])
def wait_for_diagnosis():
   global result
   while result is None:
      sleep(.1)
   temp = result
   result = None
   return redirect(url_for('display_diagnosis', disease=temp))

@app.route('/diagnosis/<disease>', methods=['GET']) 
def display_diagnosis(disease):
   return render_template('res.html', disease=disease, description=symp_desc[disease], precaution=symp_prec[disease])

if __name__ == '__main__':
   app.run(host='0.0.0.0', debug=True)