import paho.mqtt.client as mqtt
import json
import csv

def on_connect(client, userdata, flags, rc):
    print("Conectado al broker MQTT")
    client.subscribe("invernadero/datos")

def on_message(client, userdata, msg):
    datos_sensores = json.loads(msg.payload.decode())
    
    fila_datos = {}
    fila_datos["timestamp"] = datos_sensores["timestamp"]

    sensores = datos_sensores["data"]
    for sensor in sensores.keys():
        fila_datos[sensor] = sensores[sensor]

    with open('datos_sensores.csv', mode='a', newline='', encoding='utf-8') as f:
        columnas = ["timestamp","temperatura","humedad_aire","humedad_suelo","co2","ph_suelo"]
        escritor = csv.DictWriter(f, fieldnames=columnas)
        escritor.writerows([fila_datos])
    

def run_mqtt():
    mqtt_client = mqtt.Client()
    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message
    mqtt_client.connect("localhost", 1883, 60)
    mqtt_client.loop_forever()