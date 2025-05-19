from flask import Flask # type: ignore
import requests
from datetime import datetime
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/sensores", methods=['GET'])
def hello_world():
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


if __name__ == "__main__":
    app.run(debug=True, port=5000)