import { combineReducers } from 'redux';

import UserReducer from './user_reducer';
import UserInfoReducer from './user_info_reducer';
import cityInfoReducer from './location_city_name_reducer';
import LongLatReducer from './location_longlat_reducer';
import allWashersReducer from './all_washers_reducer';

export default combineReducers({
  userUpdatedInfo: UserReducer,
  currentUserInfo: UserInfoReducer,
  currentUserCityName: cityInfoReducer,
  curentUserLongLat: LongLatReducer,
  allWashers: allWashersReducer
});