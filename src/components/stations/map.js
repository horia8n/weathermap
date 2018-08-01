import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapStyles from './map_styles';
import {fetchStations} from '../../actions/index';
import {selectStation} from "../../actions";
import {bindActionCreators} from 'redux';

class Map extends Component {

    constructor() {
        super();
        this.state = {currentStation: null, currentStationIndex: 0, currentStationName: '', showMap: true, mapStyle: {}}
        this.map = null;
        this.WeatherStation = [];
        this.WeatherStationInfo = [];
        this.stationCondUrl = 'https://s1.twnmm.com/images/en_ca/icons/wxicons_medium/';
        // this.stationCondUrl = 'img/';
    }

    componentDidMount() {

        this.googleMapInit();

    }

    componentDidUpdate() {

        this.renderStations();

    }

    googleMapInit() {

        const mapProp = {
            center: {lat: 43.3411460202121, lng: -79.736328125},
            zoom: 8,
            tilt: 45,
            disableDoubleClickZoom: true,
            // mapTypeId: window.google.maps.MapTypeId.HYBRID,
            streetViewControl: false,
            overviewMapControl: true,
            mapTypeControl: false,
            zoomControl: false,
            panControl: false,
            keyboardShortcuts: false
        };

        this.map = new window.google.maps.Map(document.getElementById('mapdiv'), mapProp);

        this.map.setOptions({styles: mapStyles()});

        window.google.maps.event.addListener(this.map, 'tilesloaded', (function () {
            this.props.fetchStations(this.getMapBounds());
        }).bind(this),{passive: true});
        window.google.maps.event.addListener(this.map, 'dragend', (function () {
            this.props.fetchStations(this.getMapBounds());
        }).bind(this),{passive: true});
        window.google.maps.event.addListener(this.map, 'zoom_changed', (function () {
            this.props.fetchStations(this.getMapBounds());
        }).bind(this),{passive: true});

    }

    getMapBounds() {

        const Zoom = this.map.zoom;

        const NorthEastLat = this.map.getBounds().getNorthEast().lat();

        const SouthWestLat = this.map.getBounds().getSouthWest().lat();

        const NorthEastLng = this.map.getBounds().getNorthEast().lng();

        const SouthWestLng = this.map.getBounds().getSouthWest().lng();

        return {Zoom, SouthWestLat, SouthWestLng, NorthEastLat, NorthEastLng};

    }

    renderStations() {

        const stationsData = this.props.stations;

        if (stationsData === []) {
            return null;
        }

        this.WeatherStation.forEach((item, i) => {
            window.google.maps.event.clearListeners(this.WeatherStation[i], 'click');
            this.WeatherStation[i].setMap(null);
            this.WeatherStationInfo[i].setMap(null);
        });
        this.WeatherStation.length = 0;
        this.WeatherStationInfo.length = 0;

        for (var i = 0; i < stationsData.length; i++) {

            if (stationsData[i].temp) {

                this.WeatherStation[i] = new window.google.maps.Marker({
                    i: i,
                    map: this.map,
                    draggable: false,
                    id: stationsData[i].id,
                    position: new window.google.maps.LatLng(Number(stationsData[i].Y), Number(stationsData[i].X)),
                    title: stationsData[i].name,
                    zIndex: 8,
                    icon: new window.google.maps.MarkerImage('img/station1.png',
                        new window.google.maps.Size(50, 50), new window.google.maps.Point(0, 0), new window.google.maps.Point(0, 0),
                        new window.google.maps.Size(50, 50))
                });

                this.WeatherStationInfo[i] = new window.InfoBox({
                    position: new window.google.maps.LatLng(Number(stationsData[i].Y), Number(stationsData[i].X)),
                    content: "holding...",
                    title: stationsData[i].name_en,
                    id: stationsData[i].id,
                    disableAutoPan: true,
                    pixelOffset: new window.google.maps.Size(0, 0),
                    zIndex: 1,
                    closeBoxURL: "",
                    infoBoxClearance: new window.google.maps.Size(1, 1)
                });

                this.WeatherStationInfo[i].setContent(
                    '<div class="weathertempouter">' +
                    '<img src="' + this.stationCondUrl + stationsData[i].icon + '.png" /><br>' +
                    '<span class="weathertemp">&nbsp;' + stationsData[i].temp + '&#176;</span>' +
                    '</div>');

                this.WeatherStationInfo[i].id = stationsData[i].id;

                this.WeatherStationInfo[i].open(this.map, this.WeatherStation[i]);

                const that = this;

                window.google.maps.event.addListener(this.WeatherStation[i], 'click', (function (e) {

                    that.props.selectStation(this.title, this.i, this.id);

                }).bind(this.WeatherStation[i]),{passive: true});

            }

        }

        this.showSelectedStation()

    }

    showSelectedStation() {

        if (this.props.curentStation) {

            this.WeatherStationInfo.forEach((WeatherStationInfo, index) => {

                if (WeatherStationInfo.id === this.props.curentStation.id) {

                    this.WeatherStationInfo[index].setContent(
                        this.WeatherStationInfo[index].getContent().replace('weathertempouter', 'weathertempouter selected')
                    );

                } else {

                    this.WeatherStationInfo[index].setContent(
                        this.WeatherStationInfo[index].getContent().replace('weathertempouter selected', 'weathertempouter')
                    );

                }


            });

        }

    }

    render() {
        return (
            <div className="wrapperMapStations col-lg-8 col-md-6 col-sd-12">
                <div id="mapdiv" style={this.props.style}></div>
            </div>
        );
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
            fetchStations: fetchStations,
            selectStation: selectStation

        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);