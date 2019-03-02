import React from 'react';
import NavbarRightContainer from "./navbar_right_container";

export default (props) => {
  return (
    <nav id="login-nav">
      <a className="logo" href="/">
        <div id="rh-logo-nav"></div>
      </a>
      <NavbarRightContainer/>
    </nav>
  )
}