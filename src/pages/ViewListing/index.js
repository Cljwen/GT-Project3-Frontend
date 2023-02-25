// specific listing
import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Carousel, Image, Avatar } from 'antd';
import { Layout, Button, Input, Row, Col, ConfigProvider, Tag } from 'antd';
import {
  LikeOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
  RollbackOutlined,
  TagOutlined
} from '@ant-design/icons';
import { Navbar } from '../../commoncomponents/Navbar/Navbar';
import { Loading } from '../../commoncomponents/Loading';
import styles from './viewlisting.module.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Sider,
  Footer,
  Content,
  siderStyle,
  contentStyle,
  footerStyle,
  replicateFooterStyle
} from '../globalstyles.js';
import { useAuth0 } from '@auth0/auth0-react';

export default function ViewListing() {
  const { Meta } = Card;
  const navigate = useNavigate();

  const [listingReturned, setListingReturned] = useState({});
  const [userReturned, setUserReturned] = useState({});
  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [listingLiked, setListingLiked] = useState(false);
  const [dateSlicer, setDateSlicer] = useState('');
  let { user_id, listing_id } = useParams();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleLike = () => {
    setListingLiked(!listingLiked);
  };

  useEffect(() => {
    if (user && !accessToken) {
      getAccessTokenSilently().then((jwt) => setAccessToken(jwt));
    }
  }, [user]);
  console.log(accessToken);

  const configs = {};
  if (accessToken) configs.headers = { Authorization: `Bearer ${accessToken}` };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${user_id}/listings/${listing_id}`, configs)
      .then(function (response) {
        console.log(response.data);
        setListingReturned(response.data);
        setDateSlicer(response.data.createdAt.slice(0, 10));
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/users`, configs)
      .then(function (response) {
        console.log(response.data);
        setUserReturned(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken]);

  useEffect(() => {
    for (let i = 0; i < userReturned.length; i++) {
      if (listingReturned.user_id === userReturned[i].id) {
        setUserReturned(userReturned[i]);
      }
    }
  }, [listingReturned, userReturned]);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff7e55'
          }
        }}>
        <Layout>
          <Sider width={250} style={siderStyle}>
            <Navbar />
            <Footer style={replicateFooterStyle}>{' _'}</Footer>
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              {user ? (
                <div className={styles.listingRight}>
                  <Row gutter={10}>
                    <Col span={17}>
                      <div className={styles.card}>
                        <Image.PreviewGroup>
                          <Image
                            src={listingReturned.photo_url}
                            style={{
                              width: 400,
                              height: 480,
                              objectFit: 'contain'
                            }}
                          />
                        </Image.PreviewGroup>
                        <div className={styles.text}>
                          <p className={styles.listingName}>{listingReturned.item_name}</p>
                          <p>{listingReturned.description}</p>
                          <Tag color="cyan">{listingReturned.condition}</Tag>
                          <Tag color="volcano">{listingReturned.category}</Tag>
                          <p className={styles.tag}>
                            <TagOutlined style={{ color: '#ff7e55', marginRight: '10px' }} />

                            {listingReturned.listing_type}
                          </p>
                          <p className={styles.created}>Listing created on:</p>
                          <p className={styles.tag}>{dateSlicer}</p>
                        </div>
                      </div>
                    </Col>

                    <Col span={6}>
                      <Card>
                        <Meta
                          avatar={<Avatar src={userReturned.profile_photo} />}
                          title={userReturned.username}
                          description={
                            <>
                              <b>
                                <EnvironmentOutlined /> {userReturned.mrt}
                              </b>
                              <br />
                              <Button type="primary">
                                <a
                                  aria-label="Chat on Whatsapp"
                                  href={`https://wa.me/65${userReturned.phone_number}`}>
                                  <WhatsAppOutlined style={{ marginRight: '10px' }} />
                                  Chat Now
                                </a>
                              </Button>
                              <Button
                                onClick={handleLike}
                                type="default"
                                className={listingLiked ? 'clickedBtn' : ''}>
                                {listingLiked ? (
                                  <>
                                    <LikeOutlined style={{ marginRight: '10px' }} /> Liked
                                  </>
                                ) : (
                                  <>
                                    <LikeOutlined style={{ marginRight: '10px' }} />
                                    Like
                                  </>
                                )}
                              </Button>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  </Row>
                  <Button
                    type="link"
                    style={{
                      marginLeft: 590,
                      marginTop: 20,
                      marginBottom: 20,
                      backgroundColor: '#ff7e55',
                      color: 'white'
                    }}
                    onClick={handleBackButtonClick}>
                    <RollbackOutlined />
                    Back to more listings
                  </Button>
                </div>
              ) : (
                <Loading />
              )}
            </Content>
            <Footer style={footerStyle}>Copyright © Give & Take 2023</Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
