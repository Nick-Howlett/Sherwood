import React from 'react';


export default props => {
  return (
    <div id="navbar-right">
      <button id="logout" className="rh-button" onClick={props.logout}>Log Out</button>
    </div>
  )
}

