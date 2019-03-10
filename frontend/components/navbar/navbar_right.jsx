import React from 'react';
import {Link} from 'react-router-dom';

export default props => {
  if(props.currentUser){
    return (
      <div id="navbar-right">
        <Link to="/">Home</Link>
        <button id="logout" onClick={props.logout}>Log Out</button>
      </div>
    )
  }
  else{
    return (
      <div id="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        <Link to="/demologin">Demo Login</Link>
      </div>
    )
  }
}

