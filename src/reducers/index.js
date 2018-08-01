import { combineReducers } from 'redux';
import WeaterReducer from './reducer_weather';
import StationsReducer from './reducer_stations';
import BoundsReducer from './reducer_select';

const rootReducer = combineReducers({
  weather: WeaterReducer,
  stations: StationsReducer,
  curentStation: BoundsReducer
});

export default rootReducer;
