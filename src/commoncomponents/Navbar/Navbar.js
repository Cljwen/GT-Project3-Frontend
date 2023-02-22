// user profile page
import React from "react";
// import styles from "../pages/ProfilePage/profile.module.css";
import logo from "../../assets/images/logo.png";
import styles from "./navbar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import HomePage from "../../pages/HomePage";
import { Link, useParams } from "react-router-dom";

export function Navbar() {
  let { user_id } = useParams();
  const { logout } = useAuth0();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <ul>
            <div className={styles.profile}>
              <a href="homepage">
                <div className={styles.logo}>
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
              <a href="/">
                <div onClick={logout}>Logout</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
