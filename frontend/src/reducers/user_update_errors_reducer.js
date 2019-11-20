import { RECEIVE_USER_UPDATE_ERRORS} from '../actions/user_actions';

const _nullErrors = [];


const userUpdateErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
      case RECEIVE_USER_UPDATE_ERRORS:
        return action.errors;
      default:
        return state;
    }
  };
  
  export default userUpdateErrorsReducer;