import React from 'react';
import {withRouter} from 'react-router-dom';

class AllWashers extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        this.props.getCurrentUserInfo(this.props.user.id)
        .then( ()=> {
            debugger;
            this.props.getWashersByZone(this.props.currentUser.userInfo.zoneNumber) } )
    }

    render() {
        return(
            <div className="washers-index">
                <h3> Choose the best for your job</h3>
            </div>
        )
    }
}

export default withRouter(AllWashers);