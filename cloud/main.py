from threading import Thread
from app import run_flask
from mqtt_client import run_mqtt
import os

if __name__ == '__main__':
    if os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
        hilo_mqtt = Thread(target=run_mqtt, daemon=True)
        hilo_mqtt.start()

    run_flask()