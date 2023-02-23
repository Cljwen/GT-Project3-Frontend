// user profile page
import React from 'react';
// import styles from "../pages/ProfilePage/profile.module.css";
import logo from '../../assets/images/logo.png';
import './navbar.css';
import { useAuth0 } from '@auth0/auth0-react';
import HomePage from '../../pages/HomePage';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';

export function Navbar() {
  let { user_id } = useParams();
  const { logout } = useAuth0();

  return (
    <>
      <div className="container">
        <div className="menu">
          <ul>
            <div className="profile">
              <a href="homepage">
                <div className="logo">
                  <img src={logo} alt="logo" />
                </div>
              </a>
            </div>
            <li>
              <Link to={`../../${user_id}/homepage`}>Home</Link>
              {/* <a href="homepage">Home</a> */}
            </li>
            <li>
              {/* <a href="profile">Profile</a> */}
              <Link to={`../../${user_id}/profile`}>Profile</Link>
            </li>
            <li>
              {/* <a href="createlisting">Create Listing</a> */}
              <Link to={`../../${user_id}/createlisting`}>Create Listing</Link>
            </li>
            <li>
              {/* <a href="/"> */}
              <button className="logout" onClick={logout}>
                Logout
              </button>
              {/* </a> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
