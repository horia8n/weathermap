import React from 'react';

const WeatherNowPiece = (props) => {

    const TRs = (data = props.data, displayProps = props.displayProps) => {

        return displayProps.map((displayProp, index) => {

            return (

                <tr key={index}>

                    <td className='label_w'>
                        {
                            (displayProp.label !== '') ? ' ' + displayProp.label : ''
                        }
                    </td>

                    <td className='value_w'>
                        {
                            ((displayProp.property !== '') ? props.data[displayProp.property] : '') +
                            ((displayProp.unit !== '') ? ' ' + displayProp.unit : '')
                        }
                    </td>

                </tr>

            );

        });

    };

    return (

        <div className="overflowWrapBorder weather_show_piece col-md-6 col-lg-3">

            <div className="atribBoxDiv">

                <table className="atribBox">

                    <tbody>{TRs()}</tbody>

                </table>

            </div>

        </div>

    );

}

export default WeatherNowPiece;