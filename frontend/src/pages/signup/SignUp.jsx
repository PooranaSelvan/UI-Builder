import React from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import './SignUp.css';



const SignUp = () => {
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
            </div>

         
            <label className="input-label">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="yourname@gmail.com"
                className="signup-input"
              />
            </div>

        
            <label className="input-label">Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="••••••••"
                className="signup-input"
              />
            </div>
            <p className="password-hint">
              Must be at least 8 characters long.
            </p>

         
            <label className="input-label">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                placeholder="••••••••"
                className="signup-input"
              />
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

            <div className="divider">
              <span>OR</span>
            </div>

            <button type="button" className="google-btn">             
              Sign up with Google
            </button>

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
