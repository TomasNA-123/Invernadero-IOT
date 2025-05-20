import './Parametros.css';
import { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Parametros(){
    const [protocoloUpdate, setProtocoloUpdate] = useState("REST");

    useEffect(() => {
        fetch('http://127.0.0.1:5000/parametros')
            .then(res => res.json())
            .then(data => {
                if(!Object.keys(data).includes("error")){
                    Object.keys(data).forEach(key => {
                        document.getElementById(key).value = data[key];
                    })
                }
                else{
                    console.error(data["error"]);
                }
            })
            .catch(error => {
                console.error('Error al consultar API:', error);
            });
        }, []
    );

    const Cambiar_Protocolo_Update = () => {
        setProtocoloUpdate(actual => actual=="REST" ? "MQTT" : "REST");
    }

    const Actualizar_Parametros_Sensores = async () => {
        let nuevos_rangos = {};

        let inputs_rango_sensores = document.querySelectorAll(".input_dato_sensor");
        inputs_rango_sensores.forEach(input => {
            nuevos_rangos[input.id] = input.value;
        })

        nuevos_rangos["protocolo_update"] = protocoloUpdate;

        await fetch('http://localhost:5000/parametros', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevos_rangos),
        })
        .then(res => res.json())
        .then(data => {
            if(!Object.keys(data).includes("error")){
                console.log(data);
            }
            else{
                console.error(data["error"]);
            }
        })
        .catch(error => {
            console.error('Error al consultar API:', error);
        });
    }

    return (
        <>
        <div className='row row_general d-flex justify-content-center'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                <Card>
                    <Card.Body>
                        <div className='row'>
                            <div className='col-12 text-center'>
                                <h3>Rango de datos de los sensores</h3>
                            </div>
                        </div>

                        <div className='fila_inputs row'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <Form.Label htmlFor="min_temperatura">Temperatura</Form.Label>
                                <InputGroup className="">
                                    <InputGroup.Text>Min.</InputGroup.Text>
                                    <Form.Control id='min_temperatura' aria-label="Valor mínimo de temperatura" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>°C</InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <InputGroup className="">
                                    <InputGroup.Text>Max.</InputGroup.Text>
                                    <Form.Control id='max_temperatura' aria-label="Valor máximo de temperatura" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>°C</InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>

                        <div className='fila_inputs row'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <Form.Label htmlFor="min_co2">Concentración de CO2</Form.Label>
                                <InputGroup className="">
                                    <InputGroup.Text>Min.</InputGroup.Text>
                                    <Form.Control id='min_co2' aria-label="Valor mínimo de co2" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>ppm</InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <InputGroup className="">
                                    <InputGroup.Text>Max.</InputGroup.Text>
                                    <Form.Control id='max_co2' aria-label="Valor máximo de co2" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>ppm</InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>

                        <div className='fila_inputs row'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <Form.Label htmlFor="min_humedad_aire">Humedad del aire</Form.Label>
                                <InputGroup className="">
                                    <InputGroup.Text>Min.</InputGroup.Text>
                                    <Form.Control id='min_humedad_aire' aria-label="Valor mínimo de la humedad del aire" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <InputGroup className="">
                                    <InputGroup.Text>Max.</InputGroup.Text>
                                    <Form.Control id='max_humedad_aire' aria-label="Valor máximo de la humedad del aire" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>

                        <div className='fila_inputs row'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <Form.Label htmlFor="min_humedad_suelo">Humedad del suelo</Form.Label>
                                <InputGroup className="">
                                    <InputGroup.Text>Min.</InputGroup.Text>
                                    <Form.Control id='min_humedad_suelo' aria-label="Valor mínimo de la humedad del suelo" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <InputGroup className="">
                                    <InputGroup.Text>Max.</InputGroup.Text>
                                    <Form.Control id='max_humedad_suelo' aria-label="Valor máximo de la humedad del suelo" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>

                        <div className='fila_inputs row'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <Form.Label htmlFor="min_ph_suelo">PH del suelo</Form.Label>
                                <InputGroup className="">
                                    <InputGroup.Text>Min.</InputGroup.Text>
                                    <Form.Control id='min_ph_suelo' aria-label="Valor mínimo del ph del suelo" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>pH</InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <InputGroup className="">
                                    <InputGroup.Text>Max.</InputGroup.Text>
                                    <Form.Control id='max_ph_suelo' aria-label="Valor máximo del ph del suelo" type='number' className="input_dato_sensor" defaultValue={0} />
                                    <InputGroup.Text>pH</InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>

                        <div className='fila_inputs row'>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs'>
                                <Button id='switch_mqtt' variant="success" onClick={Actualizar_Parametros_Sensores}>Actualizar ({protocoloUpdate})</Button>
                            </div>
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 col-12 col_inputs d-flex justify-content-end'>
                                <Form>
                                    <Form.Check
                                        type="switch"
                                        id="switch_protocolo"
                                        className='switch-xl'
                                        label="Actualizar con MQTT"
                                        onChange={Cambiar_Protocolo_Update}
                                    />
                                </Form>
                            </div>
                        </div>

                    </Card.Body>
                </Card>
            </div>
        </div>
            
        </>
    )
}

export default Parametros;