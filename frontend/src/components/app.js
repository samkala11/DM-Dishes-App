import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';
import './app.css';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import profilePageContainer from './profile/profile_container';
import allWashersContainer from './washers/all-washers_container';

const App = () => (
  <div>
    <NavBarContainer/>
    <Switch>
        <AuthRoute exact path="/" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <ProtectedRoute exact path="/profile" component={profilePageContainer} />
        <ProtectedRoute exact path="/browse" component={allWashersContainer}/>
    </Switch>
  </div>
);

export default App;