import { RECEIVE_UPDATED_USER} from '../actions/user_actions';

export default function(state = {}, action) {
    switch (action.type) {
    case RECEIVE_UPDATED_USER:
     return {
        userUpdated: action.updatedUser
     };
    default:
     return state;
    }
}