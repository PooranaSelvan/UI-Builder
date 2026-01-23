import React, { useState } from 'react';
import sirpamLogo from '../assets/sirpam-logo.svg';
import "./navbar.css";
import Button from './Button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='navbar'>

      {/* Logo */}
      <div className='nav-logo'>
        <img src={sirpamLogo} alt="" className='sirpam-logo' />
        <Link to='/' className='nav-heading'>Sirpam</Link>
      </div>

      {/* Desktop */}
      <ul className='nav-flex desktop-navbar'>
        <li><Link to='/features' className='nav-btns'>Features</Link></li>
        <li><Link to='/docs' className='nav-btns'>Docs</Link></li>
        <li><Link to='/workspace' className='nav-btns'>Workspace</Link></li>
        <li><Link to='/templates' className='nav-btns'>Templates</Link></li>
      </ul>
      <div className='nav-flex desktop-navbar'>
        <Button className='nav-btn nav-btn-primary'>Login</Button>
        <Button className='nav-btn primary-button'>Get Started</Button>
      </div>


      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <Link to="/features" onClick={() => setOpen(false)}>Features</Link>
          <Link to="/docs" onClick={() => setOpen(false)}>Docs</Link>
          <Link to="/workspace" onClick={() => setOpen(false)}>Workspace</Link>
          <Link to="/templates" onClick={() => setOpen(false)}>Templates</Link>

          <div className="mobile-actions">
            <Button className='nav-btn nav-btn-primary'>Login</Button>
            <Button className='nav-btn primary-button'>Get Started</Button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
