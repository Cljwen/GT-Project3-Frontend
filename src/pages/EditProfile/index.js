// users can edit the details of their profile on this page
import { React, useState, useEffect } from "react";
import styles from "./editprofile.module.css";
import { Navbar } from "../../commoncomponents/Navbar/Navbar";
import {
  Button,
  Form,
  Input,
  Layout,
  notification,
  ConfigProvider,
  Select,
  Space,
} from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import MRT from "./MRT";

import {
  Footer,
  Sider,
  Content,
  siderStyle,
  contentStyle,
  footerStyle,
  replicateFooterStyle,
} from "../globalstyles";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UploadWidget } from "./UploadWidget";
import {
  SmileOutlined,
  FrownOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

export function EditProfile() {
  const navigate = useNavigate();

  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [formValues, setFormValues] = useState(null);
  let { original_id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const openSuccessNotification = (placement) => {
    api.info({
      message: `Yippee!`,
      description: "Edit profile successful!",
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
  const openFailureNotification = (placement) => {
    api.info({
      message: `Oh no!`,
      description: "Edit profile unsuccessful!",
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

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    console.log(formValues);
  };

  const handleMRTChange = (e) => {
    setFormValues({ ...formValues, mrt: e });
    console.log(formValues);
  };

  const onSearch = (value) => {
    console.log("search:", value);
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
        setFormValues(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/${original_id}/settings`, formValues, configs)
      .then(function (response) {
        console.log(response);
        openSuccessNotification("top");
      })
      .catch(function (error) {
        console.log(error);
        openFailureNotification("top");
      });
  };

  const handleBackButtonClick = () => {
    navigate(-1);
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
        {contextHolder}

        <Layout>
          <Sider width={300} style={siderStyle}>
            <Navbar />
            <Footer style={replicateFooterStyle}> -- </Footer>
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <div className={styles.listingRight}>
                <div className={styles.content}>
                  <Form
                    labelCol={{
                      span: 12,
                    }}
                    wrapperCol={{
                      span: 20,
                    }}
                    layout="horizontal"
                    style={{
                      maxWidth: 1000,
                    }}
                  >
                    {formValues === null ? (
                      <>
                        <div className={styles.loading}></div>
                        <div className={styles.loadingText}>Loading...</div>
                      </>
                    ) : (
                      <div className={styles.text}>
                        <Form.Item
                          label="Current Profile Photo"
                          name="profile_photo"
                        >
                          <img
                            alt=""
                            src={formValues.profile_photo}
                            width="200"
                          />
                          <br></br>
                          <UploadWidget
                            setFormValues={setFormValues}
                            formValues={formValues}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Email"
                          name="email"
                          onChange={handleInputChange}
                        >
                          <Input disabled placeholder={formValues.email} />
                        </Form.Item>
                        <Form.Item
                          label="Username"
                          name="username"
                          onChange={handleInputChange}
                        >
                          <Input placeholder={formValues.username} />
                        </Form.Item>
                        <Form.Item
                          label="First Name"
                          name="first_name"
                          onChange={handleInputChange}
                        >
                          <Input placeholder={formValues.first_name} />
                        </Form.Item>
                        <Form.Item
                          label="Last Name"
                          name="last_name"
                          onChange={handleInputChange}
                        >
                          <Input placeholder={formValues.last_name} />
                        </Form.Item>

                        <Form.Item
                          name="phone_number"
                          label="Phone Number"
                          rules={[
                            {
                              required: true,
                              message: "Please input your phone number!",
                            },
                          ]}
                          onChange={handleInputChange}
                        >
                          <Input
                            addonBefore="+65"
                            placeholder={formValues.phone_number}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Address"
                          name="address"
                          onChange={handleInputChange}
                        >
                          <Input placeholder={formValues.address} />
                        </Form.Item>
                        <Form.Item
                          label="Postal Code"
                          name="postal_code"
                          onChange={handleInputChange}
                        >
                          <Input placeholder={formValues.postal_code} />
                        </Form.Item>
                        <Form.Item label="Nearest MRT" name="mrt">
                          <Select
                            showSearch
                            onSearch={onSearch}
                            onChange={handleMRTChange}
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            placeholder={formValues.mrt}
                            options={MRT}
                          />
                          {/* <Input placeholder={formValues.mrt} /> */}
                        </Form.Item>

                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleSubmit}
                            style={{
                              marginLeft: "180px",
                            }}
                          >
                            Save Changes
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </Content>
            <Footer style={footerStyle}>Copyright © Give & Take 2023</Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default EditProfile;
