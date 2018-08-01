import { STATION_SELECTED } from "../actions/index";

export default function(state=null, action){

    switch (action.type){

        case STATION_SELECTED:
            return action.payload;

        default:
            return state;

    }

}