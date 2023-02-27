import React from "react";
import {
  Layout,
  Button,
  Input,
  ConfigProvider,
  Row,
  Col,
  Menu,
  Typography,
} from "antd";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../HomePage/SearchBar";
import SearchedListingCards from "./SearchedListingCards";

import {
  Sider,
  Footer,
  Content,
  siderStyle,
  contentStyle,
  footerStyle,
  replicateFooterStyle,
} from "../globalstyles.js";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { left } from "@cloudinary/url-gen/qualifiers/textAlignment";

const { Header } = Layout;
const { Title } = Typography;

export default function SearchResultsPage() {
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

  const [searchParams, setSearchParams] = useSearchParams();
  const [numberOfResults, setNumberOfResults] = useState("");

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

            <Footer style={replicateFooterStyle}>{" _"}</Footer>
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <SearchBar
                searchParams={searchParams}
                handleSearchParams={(value) => setSearchParams(value)}
              />
              <Title level={2} style={{ marginLeft: 50 }}>
                {numberOfResults
                  ? `${numberOfResults} ` +
                    "result(s) found for `" +
                    searchParams.get("search") +
                    "`"
                  : "results found for `" + searchParams.get("search") + "`"}
              </Title>
              <SearchedListingCards
                configs={configs}
                searchParams={searchParams}
                liftNumberOfResults={(value) => setNumberOfResults(value)}
              />
            </Content>
            <Footer style={footerStyle}>Copyright © Give & Take 2023</Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
