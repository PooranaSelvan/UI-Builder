import React, { useState } from 'react';
import sirpamLogo from '../assets/sirpam-logo.svg';
import "./navbar.css";
import Button from './Button';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='navbar'>

      {/* Logo */}
      <div className='nav-logo'>
        <img src={sirpamLogo} alt="" className='sirpam-logo' />
        <NavLink to='/' className='nav-heading'>Sirpam</NavLink>
      </div>

      {/* Desktop */}
      <ul className='nav-flex desktop-navbar'>
        <li><NavLink to='/features' className='nav-btns'>Features</NavLink></li>
        <li><NavLink to='/docs' className='nav-btns'>Docs</NavLink></li>
        <li><NavLink to='/workspace' className='nav-btns'>Workspace</NavLink></li>
        <li><NavLink to='/templates' className='nav-btns'>Templates</NavLink></li>
      </ul>
      <div className='nav-flex desktop-navbar'>
        <NavLink to='/login' className='nav-btn nav-btn-primary'>Login</NavLink>
        <NavLink to='/signup' className='nav-btn primary-button'>Get Started</NavLink>
      </div>


      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <NavLink to="/features" onClick={() => setOpen(false)}>Features</NavLink>
          <NavLink to="/docs" onClick={() => setOpen(false)}>Docs</NavLink>
          <NavLink to="/workspace" onClick={() => setOpen(false)}>Workspace</NavLink>
          <NavLink to="/templates" onClick={() => setOpen(false)}>Templates</NavLink>

          <div className="mobile-actions">
            <NavLink to='/login' className='nav-btn nav-btn-primary'>Login</NavLink>
            <NavLink to='/signup' className='nav-btn primary-button'>Get Started</NavLink>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
