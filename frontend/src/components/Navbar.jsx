import React, { useEffect, useRef, useState } from 'react';
import sirpamLogo from '../assets/sirpam-logo.svg';
import "./navbar.css";
import Button from './Button';
import { NavLink } from 'react-router-dom';
import { Menu, X, Settings, User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from "axios";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [open, setOpen] = useState(false);
  const [openDropDown, setDropDown] = useState(false);
  let dropDownRef = useRef(null);


  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setDropDown(false);
      }
    }

    document.addEventListener("mousedown", handleOutSideClick);
    return () => document.removeEventListener("mousedown", handleOutSideClick);
  }, []);


  const handleLogin = () => {
    window.location.href = `http://localhost:5000/auth/zoho/login?redirect=${encodeURIComponent(window.location.pathname)}`;
  }


  const logoutHandler = async () => {
    try {
      let res = await axios.get("http://localhost:5000/auth/zoho/logout", { withCredentials: true });

      console.log(res);

      setIsAuthenticated(false);
      toast.success(res.data.message);
    } catch (err) {
      setIsAuthenticated(true);
      toast.error("Login Failed");
    }
  }

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
        {isAuthenticated ? (
          <>
            <button className='nav-btn nav-btn-profile' onClick={(e) => { e.preventDefault(); setDropDown(!openDropDown) }}>
              <Settings size={20} />
              Settings
            </button>

            <div id="nav-dropdown" style={{ display: openDropDown ? "flex" : "none", cursor: "pointer" }} ref={dropDownRef}>
              <div id="nav-dropdown-wrapper">
                <X id='nav-dropdown-close' onClick={() => setDropDown(!openDropDown)} />
                <Button>
                  <User />
                  Profile
                </Button>
                <Button onClick={logoutHandler}>
                  <LogOut />
                  Logout
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Button className='nav-btn nav-btn-primary' onClick={handleLogin}>Login</Button>
            <Button className='nav-btn primary-button' onClick={handleLogin}>Get Started</Button>
          </>
        )}
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
            <Button className='nav-btn nav-btn-primary' onClick={handleLogin}>Login</Button>
            <Button className='nav-btn primary-button' onClick={handleLogin}>Get Started</Button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
