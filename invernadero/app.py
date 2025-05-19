from flask import Flask, jsonify

import json

app = Flask(__name__)

@app.route("/hw")
def hello_world():
    return "Hola mundo desde flask invernadero"

def run_flask():
    app.run(debug=True, port=5002)