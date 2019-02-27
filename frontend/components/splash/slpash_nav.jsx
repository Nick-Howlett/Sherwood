import React from "react";
import {Link} from "react-router-dom";



export default props => {
  return (
    <nav className="splash-nav">
      <div className="splash-left">
        <div className="splash-logo"></div>
        <span>robinhood</span>
      </div>
      <div className="splash-right">
        <Link className="login" to="/login">Log In</Link>
        <Link className="signup" to="/signup">Sign Up</Link>
      </div>
    </nav>
  )
}