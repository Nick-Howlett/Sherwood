import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
  return (
    <div className="center">
      <div className="splash-body">
        <div className="welcome">
          <h1>Invest for Free</h1>
          <span>Invest in stocks, ETFs, options, and cryptocurrencies, all commission-free, right from your phone or desktop.</span>
          <Link className="signup" to="/signup">Sign Up</Link>
        </div>
        <div className="splash-img">
          <img src="images/splash_phones.png" />
        </div>
      </div>
    </div>
 )
}