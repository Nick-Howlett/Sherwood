import React from "react";
import {Link} from "react-router-dom";
import Logo from "../logo";



export default props => {
  return (
    <nav className="splash-nav">
      <a href="/" className="splash-left">
        <div className="splash-logo">
          <Logo/>
        </div>
        <span>sherwood</span>
      </a>
      <div className="splash-right">
        <Link className="login" to="/login">Log In</Link>
        <div>
          <Link className="rh-button" id="demo-login" to="/demologin">Demo Login</Link>
          <Link className="signup rh-button" to="/signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}