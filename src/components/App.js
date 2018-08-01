import React, {Component} from 'react';
import Map from './stations/map';
import StationsPreviews from './stations/stations_previews';
import WeatherDisplay from './weather/weather_display';
import '../App.css';

class WeatherPage extends Component {

    render() {

        return (

            <div className="weather-page">

                <div className="mainStations">

                    <Map />

                    <StationsPreviews />

                    <div className="clerafix"></div>

                </div>

                <WeatherDisplay />

            </div>

        );

    }
}

export default WeatherPage;