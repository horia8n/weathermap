import React, {Component} from 'react';

class WeatherTable extends Component {

    render() {

        // const stationCondUrl = 'https://s1.twnmm.com/images/en_ca/icons/wxicons_large/';
        const stationCondUrl = 'img/';

        let var_tr;

        let prepareTH = this.props.data.map((period, index_th) => {
            return <th key={ index_th }>{ period[this.props.th] }</th>
        });

        let prepareTR = this.props.td.map((tr, index_tr) => {

            var_tr = tr;

            let row = this.props.data.map((period, index_td) => {

                if (var_tr === 'icon') {

                    var src = stationCondUrl + period[var_tr] + 'x.png'

                    return (
                        <td key={index_td} className="weather-td-icon">
                            <img src={ src } />
                        </td>
                    );

                } else {

                    return <td key={index_td}>{ period[var_tr] }</td>;

                }

            });

            return <tr key={index_tr}>{ row }</tr>;

        });

        return (

            <table className="weather-table">

                <thead>

                    <tr>{ prepareTH }</tr>

                </thead>

                <tbody>{ prepareTR }</tbody>

            </table>

        );
    }
}

export default WeatherTable;