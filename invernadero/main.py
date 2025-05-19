from app import run_flask
from mqtt_client import run_mqtt
import os

if __name__ == '__main__':
    
    if os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
        run_mqtt()
    
    run_flask()