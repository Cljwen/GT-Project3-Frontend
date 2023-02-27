// user profile page
import React, { useState, useEffect } from "react";
import styles from "./userprofile.module.css";
import {
  Card,
  Button,
  Tag,
  Layout,
  notification,
  Space,
  Empty,
  Row,
  Col,
  Avatar,
  ConfigProvider,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  WarningOutlined,
  SmileOutlined,
  FrownOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import {
  Sider,
  Footer,
  Content,
  siderStyle,
  contentStyle,
  footerStyle,
  replicateFooterStyle,
} from "../globalstyles.js";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";

const { Meta } = Card;

export function UserProfile() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [userListings, setUserListings] = useState([]);
  const [dateSlicer, setDateSlicer] = useState("");
  const [api, contextHolder] = notification.useNotification();
  let { original_id } = useParams();

  const openNotificationWithIcon = (placement, listingIdToBeDeleted) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button
          type="primary"
          size="small"
          style={{ backgroundColor: "#ff7e55" }}
          onClick={() => {
            axios
              .delete(
                `http://localhost:3000/delete/${listingIdToBeDeleted}`,
                configs
              )
              .then(function (response) {
                console.log(response.data);
                if (response.data === 1) {
                  openDeleteSuccessNotification("top");
                } else {
                  openDeleteFailureNotification("top");
                }
              })
              .catch(function (error) {
                console.log(error);
                openDeleteFailureNotification("top");
              });
            api.destroy();
          }}
        >
          Confirm
        </Button>
        <Button
          type="primary"
          size="small"
          style={{ backgroundColor: "#ff7e55" }}
          onClick={() => api.destroy(key)}
        >
          Cancel
        </Button>
      </Space>
    );
    api.open({
      message: "Are you sure?",
      description: "Clicking 'Confirm' will delete this listing permanently!",
      placement,
      icon: <WarningOutlined style={{ color: "red" }} />,
      duration: 0,
      btn,
      key,
    });
  };
  const openDeleteSuccessNotification = (placement) => {
    axios
      .get(`http://localhost:3000/${original_id}/editprofile`, configs)
      .then(function (response) {
        setUserProfile(response.data);
        setDateSlicer(response.data.createdAt.slice(0, 10));
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/${original_id}/profile`, configs)
      .then(function (response) {
        setUserListings(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    api.info({
      message: `Yippee!`,
      description: "Delete listing successful!",
      placement,
      icon: (
        <SmileOutlined
          style={{
            color: "green",
          }}
        />
      ),
    });
  };
  const openDeleteFailureNotification = (placement) => {
    api.info({
      message: `Oh no!`,
      description: "Delete listing unsuccessful!",
      placement,
      icon: (
        <FrownOutlined
          style={{
            color: "red",
          }}
        />
      ),
    });
  };

  useEffect(() => {
    if (user && !accessToken) {
      getAccessTokenSilently().then((jwt) => setAccessToken(jwt));
    }
  }, [user]);

  const configs = {};
  if (accessToken) configs.headers = { Authorization: `Bearer ${accessToken}` };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${original_id}/editprofile`, configs)
      .then(function (response) {
        setUserProfile(response.data);
        setDateSlicer(response.data.createdAt.slice(0, 10));
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/${original_id}/profile`, configs)
      .then(function (response) {
        setUserListings(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff7e55",
          },
        }}
      >
        {contextHolder}
        <Layout>
          <Sider width={250} style={siderStyle}>
            <Navbar />
            {userListings.length > 0 ? (
              <Footer style={replicateFooterStyle}>{" _"}</Footer>
            ) : (
              <Footer
                style={{
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  position: "absolute",
                  backgroundColor: "#303841",
                }}
              >
                {" _"}
              </Footer>
            )}
          </Sider>

          <Layout>
            <Content style={contentStyle}>
              <div className={styles.content}>
                {Object.keys(userProfile).length === 0 ? (
                  <>
                    <div className={styles.loading}></div>
                    <div className={styles.loadingText}>Loading...</div>
                  </>
                ) : (
                  <div className={styles.listingRight}>
                    <Row gutter={10}>
                      <div className={styles.card}>
                        <Col span={6}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Avatar
                              shape="round"
                              size={100}
                              src={userProfile.profile_photo}
                            />
                          </div>
                          <h1>{userProfile.username}</h1>
                          <p
                            className={styles.joineddate}
                            style={{ margin: 0 }}
                          >
                            Joined since {dateSlicer}
                          </p>
                        </Col>
                        <Col span={8}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: "40px",
                            }}
                          >
                            <h2 className={styles.fullname}>Full Name:</h2>
                            <div>
                              {userProfile.first_name} {userProfile.last_name}
                            </div>
                            <h2>Email:</h2>
                            <div>{userProfile.email}</div>
                            <h2>Address:</h2>
                            <div>
                              {userProfile.address} {userProfile.postal_code}
                            </div>
                            <h2>Nearest MRT station:</h2>
                            <div>{userProfile.mrt}</div>
                          </div>
                        </Col>
                        <Col span={6}>
                          {userProfile.email === user.email && (
                            <>
                              <Button className={styles.btn}>
                                <a href="settings">Update Profile</a>
                              </Button>
                              <Button className={styles.btn}>
                                <a href="liked">
                                  <HeartOutlined /> <></>
                                  Liked Listings
                                </a>
                              </Button>
                            </>
                          )}
                        </Col>
                      </div>
                    </Row>
                  </div>
                )}
              </div>
              <h3 className={styles.listingHeader}>Personal Listings</h3>
              <div className={styles.listings}>
                {userListings.length > 0 ? (
                  userListings.map(
                    ({ item_name, photo_url, description, condition, id }) => {
                      return (
                        <Card
                          key={description}
                          hoverable
                          style={{
                            width: 300,
                            marginRight: 10,
                            marginBottom: 20,
                            display: "inline-block",
                            wordWrap: "break-word",
                          }}
                          cover={<img alt="" src={photo_url} />}
                          actions={[
                            <Link
                              to={`http://localhost:3001/${original_id}/userlistings/${id}`}
                            >
                              <EyeOutlined key="view" />
                            </Link>,
                            <Link
                              to={`http://localhost:3001/${original_id}/editlisting/${id}`}
                            >
                              <EditOutlined key="edit" />
                            </Link>,
                            <DeleteOutlined
                              key="delete"
                              onClick={() => {
                                openNotificationWithIcon("top", id);
                              }}
                            />,
                          ]}
                        >
                          <Meta
                            style={{ wordWrap: "break-word" }}
                            title={item_name}
                            description={description}
                          />
                          <br></br>
                          <Tag color="orange">{condition}</Tag>
                        </Card>
                      );
                    }
                  )
                ) : (
                  <div>
                    <br></br>
                    {!userProfile && <Empty />}

                    <br></br>
                  </div>
                )}
              </div>

              {userListings.length > 0 ? (
                <Footer style={footerStyle}>
                  Copyright © Give & Take 2023
                </Footer>
              ) : (
                <Footer
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    backgroundColor: "#303841",
                    marginTop: 210,
                  }}
                >
                  Copyright © Give & Take 2023
                </Footer>
              )}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default UserProfile;
