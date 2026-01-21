import React from 'react';
import sirpamLogo from '../assets/sirpam-logo.svg';
import "./navbar.css";
import Button from './Button';
import { Link } from 'react-router-dom';

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
            <Link to='/features' className='nav-btns' style={{color : "black", fontSize : "14px"}}>Features</Link>
          </li>
          <li>
            <Link to='/docs' className='nav-btns' style={{color : "black", fontSize : "14px"}}>Docs</Link>
          </li>
          <li>
            <Link to='workspace' className='nav-btns' style={{color : "black", fontSize : "14px"}}>Workspace</Link>
          </li>
          <li>
            <Link to='templates' className='nav-btns' style={{color : "black", fontSize : "14px"}}>Templates</Link>
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