import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {

    constructor(props) {
        super(props);    
        // this.state = {
        
    }    

    update(field) {
        return e => this.setState({
          [field]: e.currentTarget.value
        });
    }

    render(){
        const {user} = this.props;

        if (user.washerFlag) {
            return(
                <div className="home-page">
                <h3> Hi {user.name}! Let's get you setup and start cleaning  </h3>
            </div>
            )
        } else if (user.customerFlag) {
            return(
                <div className="home-page">
                <h4> Let's get your dishes done {user.name}</h4>
                <h2> </h2>
             </div>
                )
        }
    }
}

export default withRouter(Home);