import React, {Component} from 'react';
import WeatherNowPieceFirst from './weather_now_piece_first';
import WeatherNowPiece from './weather_now_piece';

class WeatherNow extends Component {

    render() {

        return (

            <div className="weather_now">

                <WeatherNowPieceFirst
                    data={this.props.data}
                    displayProps={[
                        {label: 'NowTemp', property: 'tc', unit: '°'},
                        {label: 'NowFeels', property: 'fc', unit: '°'},
                        {label: 'NowCond', property: 'wxc', unit: ''}
                    ]}
                />

                <WeatherNowPiece
                    data={this.props.data}
                    displayProps={[
                        {label: 'Humidity:', property: 'h', unit: '%'},
                        {label: 'Wind:', property: 'wk', unit: 'km/h'},
                        {label: 'Wind Gust:', property: 'wg', unit: 'km/h'}
                    ]}
                />

                <WeatherNowPiece
                    data={this.props.data}
                    displayProps={[
                        {label: 'Pressure:', property: 'p', unit: 'kPa'},
                        {label: 'Visibility:', property: 'v', unit: 'km'},
                        {label: 'Ceiling:', property: 'ce', unit: 'm'}
                    ]}
                />

                <WeatherNowPiece
                    data={this.props.data}
                    displayProps={[
                        {label: 'Sunrise:', property: 'sunrise_time', unit: ''},
                        {label: 'Sunset:', property: 'sunset_time', unit: ''},
                        {label: '', property: '', unit: ''}
                    ]}
                />

                <div className="clearfix"></div>

            </div>

        );

    }

}

export default WeatherNow;