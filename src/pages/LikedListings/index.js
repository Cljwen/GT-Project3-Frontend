import React from "react";
import { Layout, ConfigProvider, Row, Col, Card, Avatar, Empty } from "antd";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sider,
  Footer,
  siderStyle,
  contentStyle,
  footerStyle,
  replicateFooterStyle,
  Content,
} from "../globalstyles.js";

import { useAuth0 } from "@auth0/auth0-react";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import { Loading } from "../../commoncomponents/Loading";
import axios from "axios";
import {
  WhatsAppOutlined,
  EyeOutlined,
  EnvironmentOutlined,
  TagOutlined,
} from "@ant-design/icons";
import styles from "./likedlistings.module.css";
const { Meta } = Card;

export default function LikedListings() {
  const { original_id } = useParams();

  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [displayLikedListings, setDisplayLikedListings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${original_id}/likes`, configs)
      .then(function (response) {
        console.log(response.data);
        let likesData = [...response.data];

        axios
          .get(`http://localhost:3000/users`, configs)
          .then(function (response) {
            console.log(response.data);
            let usersData = [...response.data];

            axios
              .get(`http://localhost:3000/listings/`, configs)
              .then(function (response) {
                console.log(response.data);
                let listingsData = [...response.data];
                for (let w = 0; w < usersData.length; w++) {
                  for (let x = 0; x < listingsData.length; x++) {
                    for (let y = 0; y < likesData.length; y++) {
                      if (
                        listingsData[x].id === likesData[y].listing_id &&
                        usersData[w].id === listingsData[x].user_id
                      ) {
                        let tempUserObject = { ...usersData[w] };
                        delete tempUserObject.id;
                        let tempobject = {
                          ...listingsData[x],
                          ...tempUserObject,
                        };
                        setDisplayLikedListings((oldArray) => [
                          ...oldArray,
                          tempobject,
                        ]);
                      }
                    }
                  }
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch({ displayLikedListings })
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);

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

            <Footer style={replicateFooterStyle}>{" _"}</Footer>
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <h3 className={styles.content}>Liked Listings</h3>
              <div className={styles.listingRight}>
                {displayLikedListings.length > 0 ? (
                  displayLikedListings.map(
                    ({
                      photo_url,
                      item_name,
                      mrt,
                      username,
                      id,
                      user_id,
                      phone_number,
                      profile_photo,
                      listing_type,
                    }) => (
                      <Col span={6} key={id}>
                        <Card
                          style={{
                            width: 280,
                            marginRight: 20,
                            marginBottom: 20,
                          }}
                          hoverable
                          cover={
                            <img
                              alt="example"
                              src={photo_url}
                              style={{
                                width: 280,
                                height: 300,
                                objectFit: "contain",
                              }}
                            />
                          }
                          actions={[
                            <Link
                              to={`http://localhost:3001/${original_id}/listings/${user_id}/${id}`}
                            >
                              <EyeOutlined key="view" />
                            </Link>,
                            <a href={`https://wa.me/65${phone_number}`}>
                              <WhatsAppOutlined key="message" />
                            </a>,
                          ]}
                        >
                          <Meta
                            avatar={<Avatar src={profile_photo} />}
                            title={item_name}
                            description={
                              <>
                                <b>
                                  <Row>
                                    <Col span={8}>
                                      {listing_type === "Give" ? (
                                        <div
                                          className={
                                            styles.listingTypeIconColorTag
                                          }
                                        >
                                          <TagOutlined
                                            style={{ color: "#ff7e55" }}
                                          />{" "}
                                          {listing_type}
                                        </div>
                                      ) : (
                                        <div
                                          className={
                                            styles.listingTypeIconColorTag
                                          }
                                        >
                                          <TagOutlined
                                            style={{ color: "green" }}
                                          />{" "}
                                          {listing_type}
                                        </div>
                                      )}
                                    </Col>
                                    <Col span={16}>
                                      <EnvironmentOutlined /> {mrt}
                                    </Col>
                                  </Row>
                                </b>
                                <br />
                                Posted by {username}
                              </>
                            }
                          />
                        </Card>
                      </Col>
                    )
                  )
                ) : (
                  <>
                    {loading && <Loading />}
                    {!displayLikedListings && <Empty />}
                  </>
                )}
              </div>
            </Content>
            <Footer style={footerStyle} className={styles.footermargin}>
              Copyright © Give & Take 2023
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}
