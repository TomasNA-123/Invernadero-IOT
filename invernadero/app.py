from flask import Flask, request
from flask_cors import CORS

import json
import csv

app = Flask(__name__)
CORS(app)

@app.route("/parametros", methods=["GET"])
def get_parametros():
    arr_reader = []

    with open('sensores.csv', newline='', encoding='utf-8') as csvfile:
        
        for fila in csv.DictReader(csvfile):
            arr_reader.append(fila)

    return json.dumps(arr_reader)

def update_parametros(datos):
    nombre_sensores = ["temperatura","humedad_aire","humedad_suelo","co2","ph_suelo"]
    with open('sensores.csv', mode='w', newline='', encoding='utf-8') as archivo:
        escritor = csv.DictWriter(archivo, fieldnames=nombre_sensores)
        
        escritor.writeheader() 
        escritor.writerows(datos)

@app.route("/parametros", methods=["PUT"])
def update_parametros_rest():
    output = {}

    try:
        data = json.loads(request.get_json())

        update_parametros(data)

        output["msg"] = "Parametros Actualizados"
    except Exception as e:
        output["error"] = str(e)

    return json.dumps(output)

def run_flask():
    app.run(debug=True, port=5002)