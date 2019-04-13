import React from 'react';
import NavbarRightContainer from "./navbar_right_container";
import SearchContainer from './search_container';
import Logo from "../logo";


export default (props) => {
  return (
    <nav id="login-nav">
      <a className="logo" href="/">
        <Logo/>
      </a>
      <div id="nav-middle">
        <SearchContainer />
      </div>
      <NavbarRightContainer />
    </nav>
  )
}