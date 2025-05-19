import './Dashboard.css';
import { useState, useEffect } from 'react'
import CardGRafica from '../components/card_grafica/CardGrafica'
import Badge from 'react-bootstrap/Badge';

function Dashboard(){

        const [datosSensores, setDatosSensores] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/sensores')
            .then(res => res.json())
            .then(data => {
                setDatosSensores(data)
            })
            .catch(error => {
                console.error('Error al consultar API:', error);
            });
        }, []
    );

    let fecha_ultimo_valor = "-";
    if(datosSensores.length != 0) {
        fecha_ultimo_valor = datosSensores[0]["historico"] ? Object.keys(datosSensores[0]["historico"]).at(-1) : "-";
    }

    return (
        <>
            <div className='row p-2'>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
                    <h5>
                        <Badge pill bg="secondary">
                            Ultima consulta:

                            <Badge bg="primary" className='ms-2'>
                                {fecha_ultimo_valor}
                            </Badge>
                        </Badge>
                    </h5>
                </div>

                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'></div>
            </div>

            <div className='row p-2 contenedor_graficas d-flex justify-content-center'>
                {
                    datosSensores.map(sensor => (
                        <div key={`col_${sensor.alias}`} className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
                            <CardGRafica datos_sensor={sensor}></CardGRafica>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Dashboard;