import React from 'react';
import {Link} from 'react-router-dom';


export default props => {
  if(!props.currentUser)
    return (
        <>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
    )
  else{
    return (
      <>
        <button onClick={props.logout}>Log Out</button>
      </>
    )
  }
}