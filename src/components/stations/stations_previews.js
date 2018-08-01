import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchWeather} from "../../actions/index";
import {selectStation} from "../../actions/index";
import {bindActionCreators} from 'redux';

class StationsPreviews extends Component {

    displayStations() {

        const stationCondUrl = 'https://s1.twnmm.com/images/en_ca/icons/wxicons_medium/';

        // const stationCondUrl = 'img/';

        return this.props.stations.map((item, index) => {

            let selected = '';

            if (this.props.curentStation) {

                if (this.props.curentStation.id === item.id) {
                    selected = ' selected';
                    this.props.fetchWeather(this.props.curentStation.id);
                }
            }

            return (

                <tr
                    key={item['id']}
                    className={'station' + selected}
                    onClick={ () => this.props.selectStation(item['name_en'], index, item['id']) }
                >

                    <td className="name">{item['name_en']}</td>

                    <td className="temp">{item['temp'] + '°'}</td>

                    <td className="icon"><img src={stationCondUrl + item['icon'] + '.png'}/></td>

                    <td className="cond">{item['desc_en']}</td>

                </tr>

            );


        });

    }

    render() {

        return (

            <div className="wrapperMapStations col-lg-4 col-md-6">

                <div className="stationsPreviews">

                    <table className="table-striped">

                        <tbody>{this.displayStations()}</tbody>

                    </table>

                </div>

            </div>

        );

    }

    componentDidUpdate() {

        const selected = document.getElementsByClassName("station selected");

        if (selected.length > 0) {

            document.getElementsByClassName("stationsPreviews")[0].scrollTo(0, selected[0].offsetTop);

        }


    }

}

function mapStateToProps(state) {
    return {
        stations: state.stations,
        curentStation: state.curentStation
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            selectStation: selectStation,
            fetchWeather: fetchWeather
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StationsPreviews);