import React from 'react';
import Navbar from './navbar/navbar';
import {AuthRoute} from '../utils/route_util';
import LoginFormContainer from "./session_form/login_form_container";
import SignupFormContainer from "./session_form/signup_form_container";

const App = () => (
  <div>
    <Navbar/>
    <AuthRoute path="/login" component={LoginFormContainer}/>
    <AuthRoute path="/signup" component={SignupFormContainer}/>
  </div>
);

export default App;