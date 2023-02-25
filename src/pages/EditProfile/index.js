// users can edit the details of their profile on this page
import { React, useState, useEffect } from 'react';
import styles from './editprofile.module.css';
import { Navbar } from '../../commoncomponents/Navbar/Navbar';
// import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  // TreeSelect,
  // Upload,
  // Select,
  Layout,
  notification,
  // Space,
  // Spin,
  // Alert,
  ConfigProvider
} from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

import {
  Footer,
  Sider,
  Content,
  siderStyle,
  contentStyle,
  footerStyle,
  replicateFooterStyle
} from '../globalstyles';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { UploadWidget } from './UploadWidget';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

export function EditProfile() {
  // const { TextArea } = Input;
  // const { Option } = Select;
  const navigate = useNavigate();

  const { getAccessTokenSilently, user } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [formValues, setFormValues] = useState(null);
  let { original_id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const openSuccessNotification = (placement) => {
    api.info({
      message: `Yippee!`,
      description: 'Edit profile successful!',
      placement,
      icon: (
        <SmileOutlined
          style={{
            color: 'green'
          }}
        />
      )
    });
  };
  const openFailureNotification = (placement) => {
    api.info({
      message: `Oh no!`,
      description: 'Edit profile unsuccessful!',
      placement,
      icon: (
        <FrownOutlined
          style={{
            color: 'red'
          }}
        />
      )
    });
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    console.log(formValues);
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
    navigate(`/${original_id}/profile`);
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff7e55'
          }
        }}>
        {contextHolder}
        <br></br>
        <Layout>
          <Sider width={300} style={siderStyle}>
            <Navbar />
            <Footer style={replicateFooterStyle}> -- </Footer>
          </Sider>
          <Layout>
            <Content style={contentStyle}>
              <div className={styles.container}>
                <div className={styles.content}>
                  <Form
                    labelCol={{
                      span: 8
                    }}
                    wrapperCol={{
                      span: 20
                    }}
                    layout="horizontal"
                    style={{
                      maxWidth: 800
                    }}>
                    {formValues === null ? (
                      <>
                        <div className={styles.loading}></div>
                        <div className={styles.loadingText}>Loading...</div>
                      </>
                    ) : (
                      // <Spin tip="Loading...">
                      //   <Alert
                      //     message="Please wait..."
                      //     description="Loading user profile..."
                      //     type="info"
                      //     style={{ backgroundColor: 'white' }}
                      //   />
                      // </Spin>
                      <>
                        <Form.Item label="Current Profile Photo" name="profile_photo">
                          <img alt="" src={formValues.profile_photo} width="200" />
                          <br></br>
                          <UploadWidget setFormValues={setFormValues} formValues={formValues} />
                        </Form.Item>
                        <Form.Item label="Username" name="username" onChange={handleInputChange}>
                          <Input placeholder={formValues.username} />
                        </Form.Item>
                        <Form.Item
                          label="First Name"
                          name="first_name"
                          onChange={handleInputChange}>
                          <Input placeholder={formValues.first_name} />
                        </Form.Item>
                        <Form.Item label="Last Name" name="last_name" onChange={handleInputChange}>
                          <Input placeholder={formValues.last_name} />
                        </Form.Item>
                        <Form.Item label="Email" name="email" onChange={handleInputChange}>
                          <Input disabled placeholder={formValues.email} />
                        </Form.Item>

                        <Form.Item
                          name="phone_number"
                          label="Phone Number"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your phone number!'
                            }
                          ]}
                          onChange={handleInputChange}>
                          <Input addonBefore="+65" placeholder={formValues.phone_number} />
                        </Form.Item>
                        <Form.Item label="Address" name="address" onChange={handleInputChange}>
                          <Input placeholder={formValues.address} />
                        </Form.Item>
                        <Form.Item
                          label="Postal Code"
                          name="postal_code"
                          onChange={handleInputChange}>
                          <Input placeholder={formValues.postal_code} />
                        </Form.Item>
                        <Form.Item label="Nearest MRT" name="mrt" onChange={handleInputChange}>
                          <Input placeholder={formValues.mrt} />
                        </Form.Item>

                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            onClick={handleSubmit}
                            style={{
                              backgroundColor: 'white',
                              color: '#ff7e55',
                              marginRight: '20px'
                            }}
                            // style={{ marginLeft: 266 }}
                          >
                            Save Changes
                          </Button>
                        </Form.Item>
                      </>
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
