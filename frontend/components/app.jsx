import React from 'react';
import Splash from './splash/splash';
import ProfileContainer from './profile/profile_container';
import {Route, Redirect, Switch} from 'react-router-dom';
import {AuthRoute} from '../utils/route_util';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import DemoLoginContainer from "./session_form/demo_form_container";


const App = props => {
  const RootComponent = props.currentUser ? ProfileContainer : Splash;
  return ( 
    <div>
      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer}/>
        <AuthRoute path="/signup" component={SignupFormContainer}/>
        <AuthRoute path="/demologin" component={DemoLoginContainer}/>
        <Route exact path="/" component={RootComponent}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  )
};

export default App;