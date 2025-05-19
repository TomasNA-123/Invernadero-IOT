from flask import Flask, request
import pandas as pd
import json
import requests

app = Flask(__name__)

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


def run_flask():
    app.run(debug=True, port=5001)



