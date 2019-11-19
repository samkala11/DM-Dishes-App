import { connect } from 'react-redux';
import Home from './home';


const mapStateToProps = (state) => {
    return {
      session: state.session,
      user: state.session.user
    };
};
  
// const mapDispatchToProps = (dispatch) => {
// return { };
// }


export default connect(
    mapStateToProps,
    null
  )(Home);