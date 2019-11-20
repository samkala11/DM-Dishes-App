import { RECEIVE_USER_INFO} from '../actions/user_actions';

export default function(state = {}, action) {
    switch (action.type) {
    case RECEIVE_USER_INFO:
     return {
        userInfo: action.userInfo.data
     };
    default:
     return state;
    }
}