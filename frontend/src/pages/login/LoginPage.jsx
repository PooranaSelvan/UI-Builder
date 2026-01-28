import React, { useState } from 'react'
import './LoginPage.css'
import Button from '../../components/Button'
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';

const buttonStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: 'var(--primary)',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '15px'
}

const googleStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: 'var(--bg-main)',
    fontSize: '16px',
    fontWeight: '400',
    color: 'black',
    border: '2px solid var(--red-200)',
    borderRadius: '15px'
}

const eyeStyle = {

}

const LoginPage = () => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <>
            <div className='login-container'>
                <div className='main-container'>
                    <div className="bottom-content">
                        <div className="welcome-text">
                            <h2>Sign in to your account</h2>
                            <h5>Welcome back! Please enter your details.</h5>
                        </div>
                        <form action="">
                            <div className="usermail-container">
                                <label htmlFor="">Email address</label>
                                <input type="email" placeholder='youremail@gmail.com' />
                            </div>
                            <div className="password-container">
                                <div className="label-flex">
                                    <label htmlFor="">Password</label>
                                    <a href="#">Forgot password?</a>
                                </div>
                                <div className="input-div">
                                    <input type={showPassword ? 'text' : 'password'} placeholder='••••••••' />
                                    <button type='button' style={eyeStyle} className='eye-button' onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <Eye /> : <EyeOff />} </button>
                                </div>
                            </div>
                            <div className="check-box">
                                <label htmlFor="">
                                    <input type="checkbox" />
                                    <span>Keep me signed in</span>
                                </label>
                            </div>
                            <Button style={buttonStyle} className='btn-login' >Sign In</Button>
                            <div className='option'>
                                <div className="red-line">

                                </div>
                                <span>or</span>
                                <div className="red-line">

                                </div>
                            </div>
                            <Button style={googleStyle} className='google-btn'>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>Continue With Google</Button>
                        </form>
                    </div>
                </div>
                <p>Dont have account? <a href="">Create an account</a></p>
            </div>
        </>
    )
}

export default LoginPage