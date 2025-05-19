import csv
import random

def get_rango_sensores():
    rangos_sensores = {}

    #Se guardan los rangos en los que se generaran los datos en un archivo .csv para almacenarlos y modificarlos más fácilmente
    with open('sensores.csv', newline='', encoding='utf-8') as f:
        lector = csv.DictReader(f)
        columnas = lector.fieldnames
        filas = list(lector)

        for col in columnas:
            rangos_sensores[col] = {
                "min" : float(filas[0][col]),
                "max" : float(filas[1][col])
            }
        
    return rangos_sensores


def get_datos_sensores():
    rangos_sensores = get_rango_sensores()
    datos_sensores = {}

    #Los valores deberían de obtenerse individualmente por sensor, en este caso como solo se esta emulando se dan a todos en conjunto.
    for sensor in rangos_sensores.keys():
        datos_sensores[sensor] = round(random.uniform(rangos_sensores[sensor]["min"],rangos_sensores[sensor]["max"]),1)
    
    #Al ser la concentración el único valor entero se le asigna el valor por separado
    datos_sensores["co2"] = random.randint(rangos_sensores["co2"]["min"],rangos_sensores["co2"]["max"])

    return datos_sensores
