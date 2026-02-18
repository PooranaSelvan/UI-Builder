import React, { useEffect, useState } from 'react';
import './profile.css'
import { User, TriangleAlert } from 'lucide-react';
import Button from '../../components/Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from "../../components/Loading";

const Profile = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const baseUrl = import.meta.env.VITE_SITE_TYPE === "development" ? import.meta.env.VITE_BACKEND_LOCAL : import.meta.env.VITE_BACKEND_PROD;
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser(params) {
      setLoading(true);
      try {
        let res = await axios.get(`${baseUrl}checkme`, {
          withCredentials: true
        });

        if (res.data?.user) {
          setUser(res.data.user);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Something Went Wrong! Please Try again Later!");
      }
    }

    fetchUser();
  }, []);

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure want to delete your account?")) {
      setLoading(true);
      try {
        let res = await axios.delete(`${baseUrl}users/del`, {
          withCredentials: true,
          data: {
            userId: user?.userId
          }
        });

        toast.success(res.data.message);
        setLoading(false);
        setIsAuthenticated(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Something Went Wrong! Please Try again Later!");
      }
    }
  }

  if (loading) {
    return (
      <div className="profile-container">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            <div>
              <h1>{user?.name.split(" ").length === 2 ? user?.name.split(" ")[0][0] + user?.name.split(" ")[1][0] : user?.name.split(" ")[0][0]}</h1>
            </div>
            <h3>{user?.name || "NaN"}</h3>
          </div>
          <div className="profile-details">
            <h2>
              <User size={18} />
              Personal Details
            </h2>
            <div className="profile-form">
              <label htmlFor="">Name</label>
              <input type="text" readOnly value={user?.name || "NaN"} />
              <label htmlFor="">Email</label>
              <div className='mail'>
                <input id='personal-mail' type="email" readOnly value={user?.email || "NaN"} />
              </div>
              <div className='hr'></div>
              <div className="delete-account">
                <div className="delete-account-wrapper">
                  <span className='alert-icon' ><TriangleAlert size={18} /></span>
                  <div className="delete-description">
                    <span>Danger Zone</span>
                    <p>Permanently delete your account and all projects.</p>
                  </div>
                </div>
                <Button className='profile-delete-btn' onClick={handleDeleteAccount}>Delete Account</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile