import React from 'react';
import './profile.css'
import { User, Mail, Settings, TriangleAlert, Check } from 'lucide-react';
import Button from '../../components/Button';
import Footer from '../../components/Footer'

const Profile = () => {
  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            <div>
              <h1>JD</h1>
            </div>
            <h3>John Doe</h3>
          </div>
          <div className="profile-details">
            <h2><span><User size={18} /></span> Personal Details</h2>
            <div className="profile-form">
              <label htmlFor="">Name</label>
              <input type="text" value={'John'} />
              <label htmlFor="">Email Address</label>
              <div className='mail'>
                <span><Mail size={18}/></span>
                <input id='personal-mail' type="text" />
              </div>
              <div className='hr'></div>
              <h2><span><Settings size={18} /></span> Manage Account</h2>
              <div className="delete-account">
                <span className='alert-icon' ><TriangleAlert size={18} /></span>
                <div className="delete-description">
                  <span>Danger Zone</span>
                  <p>Permanently delete your account and all projects.</p>
                </div>
                <Button className='profile-delete-btn' >Delete Account</Button>
              </div>
              <div className='hr'></div>
              <div className="save-changes">
                <Button className='cancel-btn'>Cancel</Button>
                <Button className='save-changes-btn'><Check size={16}/>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile