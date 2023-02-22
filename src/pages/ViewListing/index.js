// specific listing
import React from "react";
import { useState, useEffect } from "react";
import { Card, Carousel, Image, Avatar } from "antd";
import { Layout, Button, Input, Row, Col, ConfigProvider } from "antd";
import {
  LikeOutlined,
  WhatsAppOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import "./viewlisting.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Sider,
  Footer,
  Content,
  siderStyle,
  contentStyle,
} from "../globalstyles.js";
import { useAuth0 } from "@auth0/auth0-react";

export default function ViewListing() {
  const { Meta } = Card;
  const navigate = useNavigate();

  const [listingReturned, setListingReturned] = useState({});
  const [userReturned, setUserReturned] = useState({});
  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  let { user_id, listing_id } = useParams();

  const handleBackButtonClick = () => {
    navigate(-1);
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

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#303841",
    position: "fixed",
    bottom: 0,
    width: "100%",
  };

  const replicateFooterStyle = {
    left: 0,
    bottom: 0,
    width: "100%",
    // position: 'absolute',
    backgroundColor: "#303841",
    position: "fixed",
  };

  return (
    <div>
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
            <Footer style={replicateFooterStyle}></Footer>
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <Button
                type="link"
                style={{ marginLeft: 50, marginTop: 50 }}
                onClick={handleBackButtonClick}
              >
                {"< "}Back
              </Button>
              <div className="listing-right">
                <Image.PreviewGroup>
                  <Carousel
                    dotPosition="bottom"
                    infinite={false}
                    slidesToShow={1}
                  >
                    <Image src={listingReturned.photo_url} height={300} />
                  </Carousel>
                </Image.PreviewGroup>

                <Row gutter={10}>
                  <Col span={18}>
                    <h1>{listingReturned.item_name}</h1>
                    <p>{listingReturned.description}</p>
                    <p>{listingReturned.condition}</p>
                  </Col>

                  <Col span={6}>
                    <Card>
                      <Meta
                        avatar={
                          <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
                        }
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
                                href={`https://wa.me/65${userReturned.phone_number}`}
                              >
                                <WhatsAppOutlined />
                                Chat Now
                              </a>
                            </Button>
                            <Button type="default">
                              <LikeOutlined />
                              Like Listing
                            </Button>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
            </Content>
            <Footer style={footerStyle}></Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
