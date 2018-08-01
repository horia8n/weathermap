import {FETCH_STATIONS} from "../actions/index";
import _ from 'lodash';

export default function (state = [], action) {

    switch (action.type) {

        case FETCH_STATIONS:

            const data = _.uniqBy(action.payload.data, 'id').filter( item => {
                return item.id;
            });

            const sorted_data = _.orderBy(data, ['country_en', 'name_en'], ['asc', 'asc']);

            return sorted_data;


        default:

            return state;

    }

}