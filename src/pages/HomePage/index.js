import React from "react";
import { Layout, Button, Input, ConfigProvider, Row, Col, Menu } from "antd";
import CarouselBanner from "./CarouselBanner";
import ListingCards from "./ListingCards";
import CategorySlider from "./CategorySlider";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";

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

const { Header } = Layout;

export default function HomePage() {
  const { getAccessTokenSilently, user, loginWithRedirect, logout } = useAuth0();
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
          <Header>
            <Row>
              <Col span={24}>
                <Search
                  placeholder="What are you looking for?"
                  allowClear
                  enterButton="Search"
                  size="large"
                  style={{ margin: "20px 0px" }}
                  // onSearch={onSearch}
                />
              </Col>
            </Row>
          </Header>
          <Content>
            {/* banner  */}
            <CarouselBanner />
            <CategorySlider />
            <ListingCards configs={configs} />

  
            <Button
              type="primary"
              style={{ backgroundColor: "#ff7e55", color: "white" }}
              onClick={logout}
            >
              Logout
            </Button>
          </Content>
          <Footer style={footerStyle}> Copyright G&T 2023</Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
