// user profile page
import React from 'react';
import logo from '../../assets/images/logo.png';
import styles from './navbar.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';

export function Navbar() {
  let { user_id } = useParams();
  const { logout } = useAuth0();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <ul>
            <div className={styles.profile}>
              <div className={styles.logo}>
                <Link to={`../../${user_id}/homepage`}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            <li>
              <Link to={`../../${user_id}/homepage`}>Home</Link>
            </li>
            <li>
              <Link to={`../../${user_id}/profile`}>Profile</Link>
            </li>
            <li>
              <Link to={`../../${user_id}/createlisting`}>Create Listing</Link>
            </li>
            <li>
              <button className={styles.logout} onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
