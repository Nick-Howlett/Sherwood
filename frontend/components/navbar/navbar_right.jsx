import React from 'react';
import {Link} from 'react-router-dom';

export default props => {
  if(props.currentUser){
    return (
      <div id="navbar-right">
        <button id="logout" onClick={props.logout}>Log Out</button>
      </div>
    )
  }
  else{
    return (
      <div id="navbar-right">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    )
  }
}

