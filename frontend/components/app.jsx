import React from 'react';
import Splash from './splash/splash';
import Profile from './profile/profile';
import {Route} from 'react-router-dom';
import {AuthRoute} from '../utils/route_util';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";
import DemoLoginContainer from "./session_form/demo_form_container";


const App = props => {
  const RootComponent = props.currentUser ? Profile : Splash;
  return ( 
    <div>
      <Route exact path="/" component={RootComponent}/>
      <AuthRoute path="/login" component={LoginFormContainer}/>
      <AuthRoute path="/signup" component={SignupFormContainer}/>
      <AuthRoute path="/demologin" component={DemoLoginContainer}/>
    </div>
  )
};

export default App;