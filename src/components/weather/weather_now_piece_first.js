import React from 'react';

const WeatherNowPieceFirst = (props) => {

    const TRs = (data = props.data, displayProps = props.displayProps) => {

        return displayProps.map((displayProp, index) => {

            return (
                <tr key={index}>
                    <td className='value_f' id={displayProp.label}>
                        {
                            ((displayProp.property !== '') ? props.data[displayProp.property] : '') +
                            ((displayProp.unit !== '') ? displayProp.unit : '')
                        }
                    </td>
                </tr>
            );

        });

    };

    return (

        <div className="overflowWrapBorder weather_show_piece col-md-6 col-lg-3">

            <div className="atribBoxDiv">

                <img id='NowIMG' src={'img/' + props.data.icon + '.png'}/>

                <table className="atribBox">

                    <tbody>{TRs()}</tbody>

                </table>

            </div>

        </div>

    );

}

export default WeatherNowPieceFirst;