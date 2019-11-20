import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import userUpdateErrorsReducer from './user_update_errors_reducer';
import getLocationErrorsReducer from './get_location_errors_reducer';
export default combineReducers({
  session: SessionErrorsReducer,
  userUpdate: userUpdateErrorsReducer,
  getLocation: getLocationErrorsReducer
});