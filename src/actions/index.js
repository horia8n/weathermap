import axios from 'axios';
export const FETCH_STATIONS = 'FETCH_STATIONS';
export const FETCH_WEATHER = 'FETCH_WEATHER';
export const STATION_SELECTED = 'STATION_SELECTED';

export function fetchStations({ Zoom, SouthWestLat, SouthWestLng, NorthEastLat, NorthEastLng }) {
    const url= 'http://wayagent.localhost/url.php?url=http://www.theweathernetwork.com/api/maps/regional/' +
        Zoom + '/' + SouthWestLat + '/' + SouthWestLng + '/' + NorthEastLat + '/' + NorthEastLng;
    const request = axios.get(url);
    return {
        type: FETCH_STATIONS,
        payload: request
    };
}

export function selectStation(currentStationName, currentStationIndex, id) {
    const payload = {
        currentStationName: currentStationName,
        currentStationIndex: currentStationIndex,
        id: id
    };
    return {
        type: STATION_SELECTED,
        payload: payload
    };
}

export function fetchWeather(stationCode) {
    const url= `https://www.theweathernetwork.com/api/data/${stationCode}/hourly/cm?ts=1732`;
    const request = axios.get(url);
    return {
        type: FETCH_WEATHER,
        payload: request
    };
}
