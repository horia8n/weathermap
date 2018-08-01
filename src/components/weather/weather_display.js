import React, {Component} from 'react';
import {connect} from "react-redux";
import WeatherNow from './weather_now';
import WeatherHourly from './weather_hourly';
import WeatherShort from './weather_short';
import WeatherLong from './weather_long';

class WeatherDisplay extends Component {

    constructor() {
        super();

                this.state = {
            lastStationID: null,
            forecast: 'hourly'
        };
    }

    renderWeather(cityData, forecast) {

        if(this.props.curentStation.id !== this.state.lastStationID){

            this.setState({ lastStationID: this.props.curentStation.id, forecast: 'hourly' });

        }

        var hourly_limited = [];
        for (var i = 0; i < 24; i++) {
            hourly_limited[i] = cityData.hourly.periods[i];
            hourly_limited[i].hourC = hourly_limited[i].hour;
            hourly_limited[i].Temperature = hourly_limited[i].tc;
            hourly_limited[i].FeelsLike = hourly_limited[i].fc;
            hourly_limited[i].CloudCoverage = parseInt(hourly_limited[i].cloud_coverage, 10);
            hourly_limited[i].Wind = parseInt(hourly_limited[i].wk, 10);
            hourly_limited[i].Gust = parseInt(hourly_limited[i].wg, 10);
            hourly_limited[i].ChancePrecip = parseInt(hourly_limited[i].pp, 10);
        }

        var sterm_limited = [];
        for (var i in cityData.sterm.periods) {
            sterm_limited[i] = cityData.sterm.periods[i];
            sterm_limited[i].Temperature = sterm_limited[i].tc;
            sterm_limited[i].FeelsLike = parseInt(sterm_limited[i].f, 10);
            sterm_limited[i].Humidity = parseInt(sterm_limited[i].h, 10);
            sterm_limited[i].CloudCoverage = parseInt(sterm_limited[i].cloud_coverage, 10);
            sterm_limited[i].Wind = parseInt(sterm_limited[i].wk, 10);
            sterm_limited[i].Gust = parseInt(sterm_limited[i].wg, 10);
            sterm_limited[i].ChancePrecip = parseInt(sterm_limited[i].pp, 10);

        }

        var lterm_limited = [];
        for (var i in cityData.fourteendays.periods) {
            lterm_limited[i] = cityData.fourteendays.periods[i];

            var sufix = 'th';
            if (lterm_limited[i].day === '1' || lterm_limited[i].day === '21' || lterm_limited[i].day === '31') {
                sufix = 'st';
            } else if (lterm_limited[i].day === '2' || lterm_limited[i].day === '22') {
                sufix = 'nd';
            } else if (lterm_limited[i].day === '3' || lterm_limited[i].day === '23') {
                sufix = 'rd';
            }
            lterm_limited[i].WeekDay = lterm_limited[i].dn + ' ' + lterm_limited[i].day + sufix;

            lterm_limited[i].TemperatureMin = lterm_limited[i].tmic;
            lterm_limited[i].TemperatureMax = lterm_limited[i].tmac;
            lterm_limited[i].Humidity = parseInt(lterm_limited[i].h, 10);
            lterm_limited[i].Wind = parseInt(lterm_limited[i].wk, 10);
            lterm_limited[i].Gust = parseInt(lterm_limited[i].gust_kmh, 10);
            lterm_limited[i].ChancePrecip = parseInt(lterm_limited[i].pdp, 10);
        }

        switch (forecast) {

            case 'hourly':
                return <WeatherHourly data={hourly_limited}/>;
                break;

            case 'short':
                return <WeatherShort data={sterm_limited}/>;
                break;

            case 'long':
                return <WeatherLong data={lterm_limited}/>;
                break;

            default:
                return null;

        }

    }

    renderButtons(){

        return (
            <div className="forecastButtons">
                <div
                    key="0"
                    className={ 'col-xl-2 col-lg-3 col-md-4 col-sm-3 col-xs-12 ' + ((this.state.forecast === 'hourly') ? 'forecastButton selected' : 'forecastButton') }
                    onClick={() => this.setState({forecast: 'hourly'})}
                >Hourly Forcast</div>

                <div
                    key="1"
                    className={ 'col-xl-2 col-lg-3 col-md-4 col-sm-3 col-xs-12 ' + ((this.state.forecast === 'short') ? 'forecastButton selected' : 'forecastButton') }
                    onClick={() => this.setState({forecast: 'short'})}
                >Short Term Forcast</div>

                <div
                    key="2"
                    className={ 'col-xl-2 col-lg-3 col-md-4 col-sm-3 col-xs-12 ' + ((this.state.forecast === 'long') ? 'forecastButton selected' : 'forecastButton') }
                    onClick={() => this.setState({forecast: 'long'})}
                >Long Term Forcast</div>

                <div className="clearfix"></div>

            </div>
        );

    }

    render() {

        if (!this.props.weather) {
            return (

                <div className="mainWeather">

                    <p className="pickAStation">Click one of the weather stations on the map...</p>

                </div>

            );
        }

        return (

            <div className="mainWeather">

                <WeatherNow data={this.props.weather.obs} />

                <div className="weather_future">

                    <div className="overflowWrapBorder">

                        { this.renderButtons() }

                        { this.renderWeather(this.props.weather, this.state.forecast) }

                    </div>

                </div>

            </div>

        );

    }

}

function mapStateToProps(state) {
    return {

        weather: state.weather,
        curentStation: state.curentStation

    };
}

export default connect(mapStateToProps, null)(WeatherDisplay);