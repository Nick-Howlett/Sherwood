import React from 'react';
import Splash from './splash/splash';
import {AuthRoute} from '../utils/route_util';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";


const App = () => (
  <div>
    <Splash/>
    <AuthRoute path="/login" component={LoginFormContainer}/>
    <AuthRoute path="/signup" component={SignupFormContainer}/>
  </div>
);

export default App;