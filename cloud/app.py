from flask import Flask, request
import pandas as pd
import json
import requests
import csv
from flask_cors import CORS

from mqtt_client import mqtt_update_parametros

app = Flask(__name__)
CORS(app)

@app.route('/sensores', methods=['GET'])
def get_sensores():
    output_filas = {}
    registros = request.args.get('registros', default=1, type=int)

    try:
        df = pd.read_csv('datos_sensores.csv')

        output_filas = df.tail(registros).to_dict(orient='records')

    except Exception as e:
        output_filas = {"error": str(e)}

    return json.dumps(output_filas)

@app.route('/parametros', methods=["GET"])
def get_parametros():

    # recargo el archivo cache con los datos mas recientes
    try:
        response = requests.get("http://127.0.0.1:5002/parametros")
        if response.status_code == 200:
            datos_response = response.json()

            with open('cache_parametros.csv', mode='w', newline='', encoding='utf-8') as archivo:
                escritor = csv.DictWriter(archivo, fieldnames=datos_response[0].keys())
                
                escritor.writeheader() 
                escritor.writerows(datos_response)
    except Exception as e:
        print(e)

    # Leo el cache para que en caso que no se encuentre el invernadero conectado poder extraer los parametros
    parametros = {}

    with open('cache_parametros.csv', newline='', encoding='utf-8') as csvfile:
        
        array_filas = []
        for fila in csv.DictReader(csvfile):
            array_filas.append(fila)

        for min_parametro in array_filas[0].keys():
            parametros[f"min_{min_parametro}"] = array_filas[0][min_parametro]

        for max_parametro in array_filas[1].keys():
            parametros[f"max_{max_parametro}"] = array_filas[1][max_parametro]

    return json.dumps(parametros)

@app.route("/parametros", methods=["PUT"])
def set_parametros():
    output = {}

    try:
        data = json.loads(request.get_json())

        protocolo = data["protocolo"]
        json_data_parametros = [data["min"], data["max"]]

        if(protocolo == "REST"):
            response = requests.put("http://127.0.0.1:5002/parametros", json=json.dumps(json_data_parametros))

            output = response.json()
        elif(protocolo == "MQTT"):
            mqtt_update_parametros(json_data_parametros)
            output["msg"] = "Parametros pendientes a actualizar MQTT"

    except Exception as e:
        output["error"] = str(e)

    return json.dumps(output)

def run_flask():
    app.run(debug=True, port=5001)



