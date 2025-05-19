import paho.mqtt.client as mqtt
import threading
import time
import json

from sensores import get_datos_sensores

def on_connect(client, userdata, flags, rc):
    print(f"Conectado al broker MQTT")


def publicar_periodicamente(mqtt_client):
    while True:

        mensaje = {
            "timestamp" : time.time(),
            "data"      : get_datos_sensores()
        }

        mensaje = json.dumps(mensaje)
        mqtt_client.publish("invernadero/datos", mensaje)

        time.sleep(60) 


def run_mqtt():
    mqtt_client = mqtt.Client()
    mqtt_client.on_connect = on_connect
    mqtt_client.connect("localhost", 1883, 60)

    try:
        mqtt_client.loop_start()

        hilo_publicacion = threading.Thread(target=publicar_periodicamente, args=(mqtt_client,))
        hilo_publicacion.daemon = True
        hilo_publicacion.start()
    except KeyboardInterrupt:
        mqtt_client.disconnect()