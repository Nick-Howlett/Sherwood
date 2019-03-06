import React from 'react';
import NavbarRightContainer from "./navbar_right_container";
import SearchContainer from './search_container';

export default (props) => {
  return (
    <nav id="login-nav">
      <a className="logo" href="/">
        <div id="rh-logo-nav"></div>
      </a>
      <div id="nav-middle">
        <SearchContainer/>
      </div>
      <NavbarRightContainer/>
    </nav>
  )
}