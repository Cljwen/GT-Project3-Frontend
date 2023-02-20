// welcome page with short intro, login and sign up buttons

import React from "react";
import { Layout, Space, Menu, Button, Card, Col, Row, Avatar } from "antd";
import intropage from "../../assets/images/intropage.jpg";
import logo from "../../assets/images/logo.png";

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
            style={{ backgroundColor: "#eeeeee", color: "#ff7e55" }}
            mode="horizontal"
            defaultSelectedKeys={["0"]}
          >
            <img height={60} src={logo} alt="logo" />
            <Menu.Item key="0">About</Menu.Item>
            <Menu.Item key="1">Press</Menu.Item>
            <Menu.Item key="2">Contact Us</Menu.Item>
            <Space wrap>
              <Button
                type="primary"
                style={{ backgroundColor: "#ff7e55", color: "white" }}
                onClick={loginWithRedirect}
              >
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
            <div class="top-left">
              <h3>Give and Take</h3>
              <p>Your local app for giving and requesting things.</p>
            </div>
          </div>
          <h2>Here's how it works: </h2>

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
              style={{ backgroundColor: "#ff7e55", color: "white" }}
              onClick={loginWithRedirect}
            >
              Sign Up / Login
            </Button>
          </Space>
        </Content>
        <Footer style={footerStyle}>Copyright(c) Give and Take 2023. </Footer>
      </Layout>
    </Space>
  );
}
