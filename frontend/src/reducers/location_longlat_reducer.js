import { RECEIVE_LONG_LAT} from '../actions/user_actions';

export default function(state = {}, action) {
    switch (action.type) {
    case RECEIVE_LONG_LAT:
     return {
        longLatInfo: action.longLatInfo.data.results[0].geometry.location
     };
    default:
     return state;
    }
}