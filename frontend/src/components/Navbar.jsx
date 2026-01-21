import React from 'react';
import sirpamLogo from '../assets/sirpam-logo.svg';
import "./navbar.css";
import Button from './Button';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div style={{display : "flex", flexWrap : "wrap", gap : "10px"}}>
        <img src={sirpamLogo} alt="" className='sirpam-logo' />
        <h1>Navbar</h1>
      </div>

      <div>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div>
        <Button>Login</Button>
        <Button>SignUp</Button>
      </div>
    </div>
  )
}

export default Navbar;