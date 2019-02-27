import React from "react";

export default ({errors}) => {
  return (
    <div id="session-errors">
      <svg width="16" height="18">
        <g fillRule="evenodd" transofrm="translate(0 -2)">
          <circle cx="8" cy="10" r="8"></circle>
        </g>
      </svg>
      <span id="circle-text" x="5" y="14">!</span>
      <div id="error-text">
        {errors}
      </div>
    </div>
  )
}

