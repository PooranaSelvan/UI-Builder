import React from 'react';
import sirpamLogo from '../assets/sirpam-logo.svg';
import "./navbar.css";
import Button from './Button';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-flex'>
        <img src={sirpamLogo} alt="" className='sirpam-logo' />
        <Button className='nav-heading'>Sirpam</Button>
      </div>

      <div>
        <ul className='nav-flex navbar-navigations'>
          <li>
            <Button className='nav-btns' style={{color : "black", fontSize : "14px"}}>Feature</Button>
          </li>
          <li>
            <Button className='nav-btns' style={{color : "black", fontSize : "14px"}}>Docs</Button>
          </li>
          <li>
            <Button className='nav-btns' style={{color : "black", fontSize : "14px"}}>Workspace</Button>
          </li>
          <li>
            <Button className='nav-btns' style={{color : "black", fontSize : "14px"}}>Templates</Button>
          </li>
        </ul>
      </div>
      <div className='nav-flex'>
        <Button className='nav-btn nav-btn-primary'>Login</Button>
        <Button className='nav-btn primary-button'>Get Started</Button>
      </div>
    </div>
  )
}

export default Navbar;