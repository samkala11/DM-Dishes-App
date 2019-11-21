import { connect } from 'react-redux';
import AllWashers from './all-washers';
import {getWashersByZoneThunk} from '../../actions/all_washers_actions';
import { getUserInfoId } from '../../actions/user_actions'

const mapStateToProps = (state) => {
    return{
        user: state.session.user,
        currentUser: state.entities.currentUserInfo.userInfo,
        allWashers: state.entities.allWashers.allWashers
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
       getWashersByZone: (zoneNumber) => dispatch(getWashersByZoneThunk(zoneNumber)),
       getCurrentUserInfo: (userId) => dispatch(getUserInfoId(userId)),

    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AllWashers);