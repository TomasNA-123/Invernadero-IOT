from flask import Flask, request # type: ignore
import requests
from datetime import datetime
import json
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

@app.route("/sensores", methods=['GET'])
def get_datos_sensores():
    output = []

    try:
        response = requests.get("http://127.0.0.1:5001/sensores?registros=10")

        if response.status_code == 200:
            datos_sensores = response.json()
            
            alias_keys = [
                ("temperatura", "Temperatura", "°C"), ("co2", "Concentración de CO2", "ppm"),
                ("humedad_aire", "Humedad del aire", "%"), ("humedad_suelo", "Humedad del suelo", "%"), 
                ("ph_suelo", "PH del suelo", "pH")
            ]

            for key_sensor, alias_sensor, unidad in alias_keys:

                datos_sensor = {
                    "alias"     :alias_sensor,
                    "unidad"    : unidad,
                    "historico" : {},
                }

                for sensor in datos_sensores:
                    fecha_hora = datetime.fromtimestamp(sensor["timestamp"])
                    str_fecha = fecha_hora.strftime('%Y-%m-%d %H:%M:%S')

                    datos_sensor["historico"][str_fecha] = sensor[key_sensor]

                output.append(datos_sensor)

        else:
            output = {"error": f"{response.status_code}"}
    except Exception as e:
        output = {"error": f"fallo en el request: {str(e)}"}

    return json.dumps(output)

@app.route("/parametros", methods=['GET'])
def get_parametros_sensores():
    output = {}

    try:
        response = requests.get("http://127.0.0.1:5001/parametros")

        output = response.json()
    except Exception as e:
        output["error"] = str(e)

    return json.dumps(output)

@app.route("/parametros", methods=['PUT'])
def update_parmetros_sensores():
    output = {}

    try:
        data = request.get_json()    
        data_parametros = {}

        data_parametros["protocolo"] = data["protocolo_update"]

        valores_minimos = {}
        valores_maximos = {}

        for key in data.keys():
            if re.match("^min_", key):
                valores_minimos[re.sub("^min_", "", key)] = data[key]

            if re.match("^max_", key):
                valores_maximos[re.sub("^max_", "", key)] = data[key]
        
        data_parametros["min"] = valores_minimos
        data_parametros["max"] = valores_maximos

        json_data_parametros = json.dumps(data_parametros)

        response = requests.put("http://127.0.0.1:5001/parametros", json=json_data_parametros)

        output = response.json()
        # output["msg"] = "Parametros Actualizados"
    except Exception as e:
        output["error"] = str(e)

    return json.dumps(output)

if __name__ == "__main__":
    app.run(debug=True, port=5000)