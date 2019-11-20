import { RECEIVE_CITY_NAME} from '../actions/user_actions';

export default function(state = {}, action) {
    switch (action.type) {
    case RECEIVE_CITY_NAME:
     return {
        cityName: action.cityName.data.results[0].address_components
     };
    default:
     return state;
    }
}