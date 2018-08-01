import React, {Component} from 'react';
import WeatherTable from './weather_table';
import {AreaChart, Tooltip, XAxis, YAxis, CartesianGrid, Area} from 'recharts';

class WeatherLong extends Component {

    render() {

        return (

            <div className="weather_long">

                <div className="overflowWrap">

                    <div className="overflowAdjust">

                        <WeatherTable data={this.props.data} th="WeekDay" td={["icon", "it"]}/>

                        <AreaChart key="l1" width={1094} height={100} data={this.props.data}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <XAxis dataKey="0" stroke="#bbb" />
                            <YAxis tick={{fontSize: 12}} stroke="#aaa" />
                            <Tooltip/>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f4"/>
                            <Area type="monotone" dataKey="TemperatureMax" stroke="#c6bf01" fillOpacity={0.2}
                                  fill="#c6bf01" unit="&deg;"/>
                            <Area type="monotone" dataKey="TemperatureMin" stroke="#c6bf01" fillOpacity={1}
                                  fill="#ffffff" unit="&deg;"/>
                        </AreaChart>

                        <AreaChart key="l2" width={1094} height={100} data={this.props.data}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <XAxis dataKey="0" stroke="#bbb" />
                            <YAxis tick={{fontSize: 12}} stroke="#aaa" />
                            <Tooltip/>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f4"/>
                            <Area type="monotone" dataKey="ChancePrecip" stroke="#00479C" fillOpacity={0.2}
                                  fill="#00479C" unit="%"/>
                        </AreaChart>

                        <AreaChart key="l3" width={1094} height={100} data={this.props.data}
                                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                            <XAxis dataKey="0" stroke="#bbb" />
                            <YAxis tick={{fontSize: 12}} stroke="#aaa" />
                            <Tooltip/>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f4"/>
                            <Area type="monotone" strokeDasharray="5 5" dataKey="Gust" stroke="" fillOpacity={0.2}
                                  fill="#931E1E" unit="km/h"/>
                            <Area type="monotone" dataKey="Wind" stroke="#931E1E" fillOpacity={0.1} fill="#540203"
                                  unit="km/h"/>
                        </AreaChart>

                    </div>

                </div>

            </div>

        );

    }

}

export default WeatherLong;