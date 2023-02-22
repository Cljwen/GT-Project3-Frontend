import React from "react";
import { Layout, Button, Input, ConfigProvider, Row, Col, Menu } from "antd";
import CarouselBanner from "./CarouselBanner";
import ListingCards from "./ListingCards";
import CategorySlider from "./CategorySlider";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

import {
  Sider,
  Footer,
  Content,
  siderStyle,
  contentStyle,
  footerStyle,
  replicateFooterStyle,
} from "../globalstyles.js";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const { Header } = Layout;

export default function HomePage() {
  const navigate = useNavigate();
  const { getAccessTokenSilently, user, loginWithRedirect, logout } =
    useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (user && !accessToken) {
      getAccessTokenSilently().then((jwt) => {
        setAccessToken(jwt);
      });
    }
  }, [user, accessToken]);
  console.log(accessToken);

  const configs = {};
  if (accessToken) configs.headers = { Authorization: `Bearer ${accessToken}` };

  return (
    <div>
      {/* Change theme primary */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff7e55",
          },
        }}
      >
        <Layout>
          <Sider width={250} style={siderStyle}>
            <Navbar />
            <Button
              type="primary"
              style={{ backgroundColor: "#ff7e55", color: "white" }}
              onClick={logout}
            >
              Logout
            </Button>
            <Footer style={replicateFooterStyle}>{" _"}</Footer>
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <CarouselBanner />
              <SearchBar />
              {/* <CategorySlider /> */}
              <ListingCards configs={configs} />
            </Content>
            <Footer style={footerStyle}> Copyright G&T 2023</Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
