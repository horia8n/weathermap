import React, {Component} from 'react';
import WeatherTable from './weather_table';
import {AreaChart, Tooltip, XAxis, YAxis, CartesianGrid, Area} from 'recharts';

class WeatherHourly extends Component {

    render() {

        return (

            <div className="weather_hourly weather_future_period">

                <div className="overflowWrap">

                    <div className="overflowAdjust">

                        <WeatherTable data={this.props.data} th="hourC" td={["icon", "it"]}/>

                        <AreaChart key="h1" width={1660} height={100} data={this.props.data}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <XAxis dataKey="0" stroke="#bbb" />
                            <YAxis tick={{fontSize: 12}} stroke="#aaa" />
                            <Tooltip/>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f4"/>
                            <Area type="monotone" dataKey="Temperature" stroke="#c6bf01"  fillOpacity={1}
                                  fill="url(#colorTc)" unit="&deg;"/>
                            <Area type="monotone" strokeDasharray="5 5" dataKey="FeelsLike" stroke="#facc40"
                                  fillOpacity={1} fill="url(#colorFc)" unit="&deg;"/>
                        </AreaChart>

                        <AreaChart key="h2" width={1660} height={100} data={this.props.data}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <XAxis dataKey="0" stroke="#bbb" />
                            <YAxis tick={{fontSize: 12}} stroke="#aaa" />
                            <Tooltip/>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f4"/>
                            <Area type="monotone" strokeDasharray="5 5" dataKey="CloudCoverage" stroke="#246F9C"
                                  fillOpacity={0.1} fill="#00479C" unit="%"/>
                            <Area type="monotone" dataKey="ChancePrecip" stroke="#00479C" fillOpacity={0.2}
                                  fill="#00479C" unit="%"/>
                        </AreaChart>

                        <AreaChart key="h3" width={1660} height={100} data={this.props.data}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <XAxis dataKey="0" stroke="#bbb" />
                            <YAxis tick={{fontSize: 12}} stroke="#aaa" />
                            <Tooltip/>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f4"/>
                            <Area type="monotone" strokeDasharray="5 5" dataKey="Gust" stroke="" fillOpacity={0.1}
                                  fill="#931E1E" unit="km/h"/>
                            <Area type="monotone" dataKey="Wind" stroke="#931E1E" fillOpacity={0.2} fill="#540203"
                                  unit="km/h"/>
                        </AreaChart>

                    </div>

                </div>

            </div>

        );

    }

}

export default WeatherHourly;