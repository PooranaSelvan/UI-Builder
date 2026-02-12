import React from 'react';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { Eye, EyeOff, User, Mail, Lock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import axios from "axios";
import ZohoLogo from "../../assets/zohologo.ico";

const SignUp = () => {
  const [showPassword, setPassword] = useState(false);
  const [confirmPassword, setConfirm] = useState(false);
  const baseUrl = import.meta.env.VITE_SITE_TYPE === "development" ? import.meta.env.VITE_BACKEND_LOCAL : import.meta.env.VITE_BACKEND_PROD;

  const handleZohoLogin = () => {
    window.location.href = `${baseUrl}auth/zoho/login?redirect=${encodeURIComponent(window.location.pathname)}`;
  }

  return (

    <>
      <div className="signup-page">
        <div className="signup-card">

          <h2 className="signup-title">Create your account</h2>
          <p className="signup-subtitle">Build powerful Websites.</p>

          <form className="signup-form">

            <label className="input-label">Full Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter your name"
                className="signup-input"
              />
              <User className="icon" size={20} />
            </div>


            <label className="input-label">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="yourname@gmail.com"
                className="signup-input"
              />
              <Mail className="icon" size={20} />
            </div>

            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="signup-input"
              />
              <Lock size={20} className='icon' />
              <span className='eye-icon' onClick={() => setPassword(!showPassword)}>
                {showPassword ? <Eye size={15} /> : < EyeOff size={15} />}
              </span>
            </div>
            <p className="password-hint">
              Must be at least 8 characters long.
            </p>


            <label className="input-label">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={confirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="signup-input"
              />
              <ShieldCheck size={20} className='icon' />

              <span className='eye-icon' onClick={() => setConfirm(!confirmPassword)}>
                {confirmPassword ? <Eye size={15} /> : < EyeOff size={15} />}
              </span>

            </div>

            <div className="terms-container">
              <input type="checkbox" />
              <span>
                I agree to the <span className="link-text">Terms of Service</span> and &nbsp;
                <span className="link-text">Privacy Policy</span>
              </span>
            </div>

            <Button className="primary-button signup-btn">
              Create Account
            </Button>

            <div className="or-divider">
              <span>OR</span>
            </div>


            <Button type="button" className="google-btn" onClick={handleZohoLogin}>
              <img src={ZohoLogo} alt="" />
              Sign up with Zoho
            </Button>

            <p className="login-text">
              Already have an account? &nbsp;
              <Link to="/login" className="link-text">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
