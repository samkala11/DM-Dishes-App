import { RECEIVE_WASHERS_ZONE } from '../actions/all_washers_actions';

export default function( state ={}, action ){
    switch (action.type) {
        case RECEIVE_WASHERS_ZONE:
         return {
            allWashers: action.washers
         };
        default:
         return state;
        }
}