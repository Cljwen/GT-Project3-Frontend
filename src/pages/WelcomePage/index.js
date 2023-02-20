// welcome page with short intro, login and sign up buttons

import React from 'react';
import { Layout, Space, Menu, Button, Card, Col, Row, Avatar } from 'antd';
import intropage from '../../assets/images/intropage.jpg';
import logo from '../../assets/images/logo.png';
import banner from '../../assets/images/banner.png';

import "./welcomepage.css";
import { MessageOutlined, LikeOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const { Meta } = Card;
const { Header, Footer, Content } = Layout;
const menuHeaders = ["About", "Press", "Contact"];

const headerStyle = {
  textAlign: "center",
  color: "#ff7e55",
  height: 70,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#eeeeee",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 400,
  lineHeight: "120px",
  color: "#303841",
  backgroundColor: "#eeeeee",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#303841",
};
export default function WelcomePage() {
  const [listingsReturned, setListingsReturned] = useState([]);
  const { getAccessTokenSilently, user, loginWithRedirect, logout } = useAuth0();
  const [ accessToken, setAccessToken ] = useState(null);


  useEffect(() => {
    axios
      .get("http://localhost:3000/")
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

  const handleSignUp = () => {
    const redirectUri = 'http://localhost:3001/*/homepage';
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const queryParams = {
      client_id: clientId,
      redirect_uri: redirectUri,
      // response_type: 'code',
      scope: 'openid profile email',
      screen_hint: 'signup'
    };
  };

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={[0, 48]}
    >
      <Layout>
        <Header style={headerStyle}>
          <Menu
            className="navbar"
            style={{ backgroundColor: "#eeeeee", color: "#ff7e55" }}
            mode="horizontal"
            defaultSelectedKeys={["0"]}
          >
            <img height={60} src={logo} alt="logo" />

            <Menu.Item key="0">
              <a href="#about">How it works</a>
            </Menu.Item>
            <Menu.Item key="1">Press</Menu.Item>
            <Menu.Item key="2">
              <a href="#contact">Contact Us</a>
            </Menu.Item>
            <Space wrap>
              <Button
                type="primary"
                style={{ backgroundColor: '#ff7e55', color: 'white' }}
                onClick={handleSignUp}>
                Sign Up
              </Button>
              <Button
                type="primary"
                style={{ backgroundColor: '#ff7e55', color: 'white' }}
                onClick={loginWithRedirect}>
                Sign Up / Login
              </Button>
              <Button
                type="primary"
                style={{ backgroundColor: "#ff7e55", color: "white" }}
                onClick={logout}
              >
                Logout
              </Button>
            </Space>
          </Menu>
        </Header>

        <Content style={contentStyle}>
          <div className="container">
            <img width="100%" src={intropage} alt="intropage" />
            <div className="top-left">
              <h3>Give and Take</h3>
              <p>Your local app for giving and requesting things.</p>
            </div>
          </div>
          <h2 id="about">Here's how it works: </h2>
          <img className="banner" src={banner} alt="banner" />
          <h2>These are some listings you might be interested in:</h2>

          <Row gutter={16}>
            {listingsReturned.map(({ category, item_name, photo_url }) => (
              <Col span={6}>
                <Card
                  hoverable
                  style={{ width: 300, margin: 20 }}
                  cover={
                    <img
                      alt=""
                      src={photo_url}
                      style={{ width: 300, height: 300, objectFit: "contain" }}
                    />
                  }
                  actions={[
                    <MessageOutlined key="message" />,
                    <LikeOutlined key="like" />,
                  ]}
                >
                  <Meta title={item_name} description={category} />
                </Card>
              </Col>
            ))}
          </Row>

          <Space wrap>
            <Button
              type="primary"
              style={{ backgroundColor: '#ff7e55', color: 'white' }}
              onClick={handleSignUp}>
              Sign Up
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: '#ff7e55', color: 'white' }}
              onClick={loginWithRedirect}>
              Login
            </Button>
          </Space>

          <h1 id="contact">Contact us</h1>
          <h3>Have any questions? Get in touch with us!</h3>
        </Content>
        <Footer style={footerStyle}>Copyright(c) Give and Take 2023. </Footer>
      </Layout>
    </Space>
  );
}
