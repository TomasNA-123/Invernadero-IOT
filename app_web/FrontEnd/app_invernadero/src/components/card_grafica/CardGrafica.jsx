import './CardGrafica.css';

import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/modules/accessibility';


function CardGrafica({datos_sensor}){

    const Alias_Sensor = datos_sensor["alias"];
    const Unidad = datos_sensor["unidad"];
    const Historico_Keys = Object.keys(datos_sensor["historico"]);
    const Historico_Values = Object.values(datos_sensor["historico"]);

    const Ultimo_Valor = Historico_Values ? Historico_Values.at(-1) : "-";

    const options = {
        title: {
            text: '',
            enabled: false
        },
        series: [{
            name: Alias_Sensor,
            data: Historico_Values
        }],
        xAxis: {
            categories: Historico_Keys
        },
        yAxis: {
            title: {
                text: `${Alias_Sensor} (${Unidad})`
            }
        },

        accessibility: {
            description: 'Este gráfico muestra temperaturas simuladas para accesibilidad.'
        }
    };

    return (
        <>
            <Card>
                <Card.Header className='titulo_card'>{Alias_Sensor}</Card.Header>
                <Card.Body>
                    
                    <h4 className='mb-4'>
                        <Card.Text>
                            <Badge pill bg="secondary">
                                Ultimo Valor:

                                <Badge bg="primary" className='ms-2'>
                                    {Ultimo_Valor} {Unidad}
                                </Badge>
                            </Badge>
                        </Card.Text>
                    </h4>

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                    
                </Card.Body>
            </Card>
        </>
    ); 
}

export default CardGrafica;