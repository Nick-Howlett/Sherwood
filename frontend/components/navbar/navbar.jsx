import React from 'react';
import NavbarRightContainer from "./navbar_right_container";
import NavbarLogo from "./navbar_logo";

export default (props) => {
  return (
    <>
      <NavbarLogo currentUser = {props.currentUser}/>
      <NavbarRightContainer/>
    </>
  )
}