import React from 'react'
import './LoginPage.css'
import logo from '../../assets/sirpam-logo.svg'
import Button from '../../components/Button'

const buttonStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: 'var(--primary)',
    fontSize: 'small',
    fontWeight: 'bold'
}

const googleStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: 'var(--bg-main)',
    fontSize: 'small',
    fontWeight: 'bold',
    color: 'black',
    border: '2px solid var(--red-200)',
    borderRadius: '15px'
}

const LoginPage = () => {
    return (
        <>
            <div className='login-container'>
                <div className='main-container'>
                    <div className="top-content">
                        <img src={logo} alt="sirpam-logo" />
                        <h1>Sirpam</h1>
                    </div>
                    <div className="bottom-content">
                        <div className="welcome-text">
                            <h2>Sign in to your account</h2>
                            <h5>Welcome back! Please enter your details.</h5>
                        </div>
                        <form action="">
                            <div className="usermail-container">
                                <label htmlFor="">Email address</label>
                                <input type="email" placeholder='youremail@gmail.com'/>
                            </div>
                            <div className="password-container">
                                <div className="label-flex">
                                    <label htmlFor="">Password</label>
                                    <a href="#">Forgot password?</a>
                                </div>
                                <input type="password" placeholder='••••••••'/>
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
                            <Button style={googleStyle} className='google-btn'>Continue With Google</Button>
                        </form>
                    </div>
                </div>
                <p>Dont have account? <a href="">Create an account</a></p>
            </div>
        </>
    )
}

export default LoginPage