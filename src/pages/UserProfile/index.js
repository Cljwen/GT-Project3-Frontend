// user profile page
import React from 'react';
import './userprofile.css';
// import profilepic from '../../assets/images/profilepic.jpeg';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import bike from '../assets//images/bike.jpg';

import { Card, Button, Tag } from 'antd';

const { Meta } = Card;

export function UserProfile() {
  return (
    <>
      <div className="container">
        <div className="menu">
          <ul>
            <div className="profile">
              <div className="logo">
                {/* <img src={logo} alt="logo" /> */}
              </div>
            </div>
            <li>
              <a href="homepage">Home</a>
            </li>
            <li>
              <a href="profile">Profile</a>
            </li>
            <li>
              <a href="createlisting">Create Listing</a>
            </li>
            <li>
              <a href="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="content">
        {/* {UsersProfile.map((item, index) => {
          return (
            <div className="userName" key={index}>
              <div className="userDescription">
                <div className="profile">
                  <div className="photo">
                    <img src={item.photo} alt={item.alt} />
                    <img src={profilepic} alt={item.alt} />
                  </div>
                  <h1>{item.username}</h1>
                </div>
                <h2>Joined on {item.dateJoined}</h2>
                <h2>Nearest MRT station:</h2>
                <div>{item.mrtStation}</div>
                <h2>Bio:</h2> <div>{item.bio}</div>
              </div>
              <Button className="btn">
                <a href="settings">Update Profile</a>
              </Button>
            </div>
          );
        })} */}
        {/* original code */}
        {/* <div className={styles.userName}>
          <div className={styles.userDescription}>
            <div className={styles.profile}>
              <div className={styles.photo}>
                <img src={profilepic} alt="profilepic" />
              </div>
              <h1>Username</h1>
            </div>
            <h2>Nearest MRT station: Tiong Bahru</h2>
            <h2>Joined 1 month ago</h2>
            <p>Bio</p>
          </div>
        </div> */}

        <h3>Listings</h3>
        <div className="listingFilters">
          {/* <Space wrap> */}
          <Button className="btn">
            <a href="/">Free</a>
          </Button>
          {/* </Space> */}
          {/* <Space wrap> */}
          <Button className="btn">
            <a href="/">Wanted</a>
          </Button>
          {/* </Space> */}
          {/* <div className={styles.filter}>Free</div>
          <div className={styles.filter}>Wanted</div> */}
        </div>
        <div className="listings">
          {/* {UserListings.map((listing, index) => {
            return (
              <Card
                key={index}
                hoverable
                style={{
                  width: 300,
                  marginRight: 10,
                  marginBottom: 20,
                  display: 'inline-block',
                  wordWrap: 'break-word'
                }}
                // cover={<img alt={listing.alt} src={listing.photo} />}
                cover={<img alt={listing.alt} src={book} />}
                actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}>
                <Meta
                  style={{ wordWrap: 'break-word' }}
                  title={listing.title}
                  description={listing.description}
                />
                <br></br>
                <Tag color={listing.color}>{listing.condition}</Tag>
              </Card>
            );
          })} */}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
