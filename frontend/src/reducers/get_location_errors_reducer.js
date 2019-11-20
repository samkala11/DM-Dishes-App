import { RECEIVE_LOCATION_ERRORS} from '../actions/user_actions';

const _nullErrors = [];


const getLocationErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_LOCATION_ERRORS:
        return action.errors;
      default:
        return state;
    }
  };
  
  export default getLocationErrorsReducer;