import { connect } from 'react-redux';
import Profile from './profile';
import { updateUser, getUserInfoCurrent, getUserInfoId, getCityNameThunk, getLongLatThunk} from '../../actions/user_actions'

import {updateAddress, updateLocationLongLat} from '../../util/user_api_utils'

const mapStateToProps = (state) => {
    return {
      session: state.session,
      user: state.session.user,
      currentUserInfo: state.entities.currentUserInfo.userInfo,
      currentCityInfo: state.entities.currentUserCityName
    };
};
  
const mapDispatchToProps = (dispatch) => {
return { 
  updateInfo: (user, userId) => dispatch(updateUser(user, userId)),
  getUserInfoCurrent: () => dispatch(getUserInfoCurrent()),
  getUserInfo: (userId) => dispatch(getUserInfoId(userId)),
  getCityInfo: (lat, long) => dispatch(getCityNameThunk(lat, long)),
  getLongLatInfo: (city, state, country) => dispatch(getLongLatThunk(city, state, country)),
  updateAddressInfo: (userId, addressInfo) => updateAddress(userId, addressInfo),
  updateLocationLongInfo: (userId, addressInfo) => updateLocationLongLat(userId, addressInfo),

 };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile);