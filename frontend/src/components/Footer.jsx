import React from 'react';
import "./footer.css";
import sirpamLogo from '../assets/sirpam-logo.svg';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
     return (
          <div className='footer-wrapper'>
               <div className="footer-content">
                    <div className="footer-info">
                         <div>
                              <img src={sirpamLogo} alt="" className='sirpam-logo' />
                              <Link to='/' className='nav-heading'>Sirpam</Link>
                         </div>
                         <p>Empowering developers to build custom UI without writing code.</p>
                         <div>
                              <Twitter className='footer-icon' size={45} fill='#fee2e2' color='red' strokeWidth={1} />
                              <Github className='footer-icon' size={45} fill='#fee2e2' color='red' strokeWidth={1} />
                              <Linkedin className='footer-icon' size={45} fill='#fee2e2' color='red' strokeWidth={1} />
                         </div>
                    </div>
                    <div className="footer-product">
                         <h3>Product</h3>
                         <Link to='/docs'>Docs</Link>
                         <Link to='/features'>Features</Link>
                         <Link to='/dashboard'>Dashboard</Link>
                         <Link to='/templates'>Templates</Link>
                    </div>
                    <div className="footer-legal">
                         <h3>Legal</h3>
                         <Link to='/privacy'>Privacy</Link>
                         <Link to='/terms'>Terms</Link>
                         <Link to='/security'>Security</Link>
                    </div>
               </div>

               <div className='footer-line'></div>

               <div className="footer-copyright">
                    <p>© 2026 Sirpam. All rights reserved.</p>
               </div>
          </div>
     )
}

export default Footer