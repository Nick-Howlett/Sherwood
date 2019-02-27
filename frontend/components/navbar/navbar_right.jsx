import React from 'react';
import {Link} from 'react-router-dom';


export default props => {
  return (
    <div id="navbar-right">
      <button className="rh-button" onClick={props.logout}>Log Out</button>
    </div>
  )
}

