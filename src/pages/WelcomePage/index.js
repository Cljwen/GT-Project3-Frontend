// welcome page with short intro, login and sign up buttons

import React from 'react';
import { Layout, Space, Menu, Button, Card, Col, Row, Avatar, Carousel } from 'antd';
import intropage from '../../assets/images/intropage.jpg';
import logo from '../../assets/images/logo.png';
import banner from '../../assets/images/banner.png';
import rocket from '../../assets/images/rocket.png';
import cloudinary from '../../assets/images/cloudinary.png';
import postgres from '../../assets/images/postgres.png';
import sendgrid from '../../assets/images/sendgrid.png';
import react from '../../assets/images/react.png';
import antdesign from '../../assets/images/ant-design.png';

import styles from './welcomepage.module.css';
import { MessageOutlined, LikeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const { Meta } = Card;
const { Header, Footer, Content } = Layout;
const menuHeaders = ['About', 'Press', 'Contact'];

const headerStyle = {
  textAlign: 'center',
  color: '#ff7e55',
  height: 80,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#eeeeee',
  width: '100%'
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 350,
  lineHeight: '120px',
  color: '#303841',
  backgroundColor: '#eeeeee',
  paddingTop: '40px'
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#303841'
};
export default function WelcomePage() {
  const [listingsReturned, setListingsReturned] = useState([]);
  const { getAccessTokenSilently, user, loginWithRedirect, logout } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/')
      .then(function (response) {
        setListingsReturned(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (user && !accessToken) {
      getAccessTokenSilently().then((jwt) => {
        setAccessToken(jwt);
      });
    }
  }, [user, accessToken]);
  console.log(accessToken);

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%'
      }}
      size={[0, 48]}>
      <Layout>
        <Header className={styles.header} style={headerStyle}>
          <Menu
            className={styles.navbar}
            style={{ backgroundColor: '#eeeeee', color: '#ff7e55' }}
            mode="horizontal"
            defaultSelectedKeys={['0']}>
            <a href="/">
              <img height={60} src={logo} alt="logo" />
            </a>
            <Menu.Item key="0">
              <a href="#about">How it works</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a href="#press">Press</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="#contact">Contact Us</a>
            </Menu.Item>
            <Space wrap>
              <Button
                type="primary"
                
                style={{ backgroundColor: '#ff7e55', color: 'white' }}
                onClick={loginWithRedirect}>
                Sign Up / Login
              </Button>
            </Space>
          </Menu>
        </Header>

        <Content style={contentStyle}>
          <div className={styles.container}>
            <img width="100%" src={intropage} alt="intropage" />
            <div className={styles.topLeft}>
              <h3>Give & Take</h3>
              <p>Your local app for giving and requesting things.</p>
            </div>
          </div>
          <div className={styles.press}>
            <h2>Here are some listings you might be interested in:</h2>

            <Row gutter={16}>
              {listingsReturned.map(({ category, item_name, photo_url }) => (
                <Col span={6}>
                  <Card
                    hoverable
                    onClick={loginWithRedirect}
                    style={{ width: 300, margin: 20 }}
                    cover={
                      <img
                        alt=""
                        src={photo_url}
                        style={{
                          width: 300,
                          height: 300,
                          objectFit: 'contain'
                        }}
                      />
                    }
                    actions={[<MessageOutlined key="message" />, <LikeOutlined key="like" />]}>
                    <Meta title={item_name} description={category} />
                  </Card>
                </Col>
              ))}
            </Row>

            <Space wrap>
              <Button
                className={styles.button}
                type="primary"
                style={{ backgroundColor: '#ff7e55', color: 'white' }}
                onClick={loginWithRedirect}>
                Sign Up / Login
              </Button>
            </Space>
          </div>
          <div id="about">
            <h2>Here's how it works: </h2>
            <img className={styles.banner} src={banner} alt="banner" />
          </div>
          <div id="press" className={styles.press}>
            <h2>We are supported by:</h2>
            <Carousel
              slidesToShow={3}
              style={{ margin: '20px 50px' }}
              autoplay
              autoplaySpeed={2000}
              speed={500}>
              <div className={styles.slide}>
                <img src={rocket} alt="rocket" />
              </div>
              <div className={styles.slide}>
                <img src={react} alt="react" />
              </div>
              <div className={styles.slide}>
                <img src={cloudinary} alt="cloudinary" />
              </div>
              <div className={styles.slide}>
                <img src={postgres} alt="postgres" />
              </div>
              <div className={styles.slide}>
                <img src={sendgrid} alt="sendgrid" />
              </div>
              <div className={styles.slide}>
                <img src={antdesign} alt="antdesign" />
              </div>
            </Carousel>
          </div>
          <div className={styles.contact} id="contact">
            <h2>Contact us</h2>
            <p>Have any questions? Get in touch with us!</p>
            <p className={styles.email}>hello@giveandtake.sg</p>
          </div>
        </Content>
        <Footer style={footerStyle}>Copyright(c) Give and Take 2023. </Footer>
      </Layout>
    </Space>
  );
}
