import React from 'react';
import sirpamLogo from '../assets/sirpam-logo.svg';
import "./navbar.css";
import Button from './Button';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-flex'>
        <img src={sirpamLogo} alt="" className='sirpam-logo' />
        <h2 className='nav-heading'>Sirpam</h2>
      </div>

      <div>
        <ul className='nav-flex navbar-navigations'>
          <li>Feature</li>
          <li>Docs</li>
          <li>Workspace</li>
          <li>Templates</li>
        </ul>
      </div>
      <div className='nav-flex'>
        <Button className='nav-btn nav-btn-primary'>Login</Button>
        <Button className='nav-btn nav-btn-secondary'>Get Started</Button>
      </div>
    </div>
  )
}

export default Navbar;